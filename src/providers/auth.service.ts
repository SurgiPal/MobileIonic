import { Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { Auth0Vars, CONFIGURATION } from './app.constants';
import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;

@Injectable()
export class AuthService
{

  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0({ clientID: Auth0Vars.AUTH0_CLIENT_ID, domain: Auth0Vars.AUTH0_DOMAIN });
  lock = new Auth0Lock(Auth0Vars.AUTH0_CLIENT_ID, Auth0Vars.AUTH0_DOMAIN, {
//https://github.com/auth0/lock#theming-options
    languageDictionary: {
      title: 'Welcome!'
    },
    allowSignUp:true,
    signUpLink:'https://surgipal.com/register/',
    rememberLastLogin:true,
    socialButtonStyle: 'small',
    allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
    theme: {
      primaryColor: '#90a4ae',
      logo: '/assets/img/SurgiPalLogoName.png'
    },
    auth: {
      responseType: 'token',
      redirect: false,
      params: {
        scope: 'openid offline_access roles permissions email picture',
      },
      sso: false
    }
  });

  refreshToken:any;
  storage: Storage = new Storage();
  refreshSubscription: any;
  user: any;
  globalId: any;
  surgipalId: any;
  roles: string[] = [];
  zoneImpl: NgZone;
  idToken: string;
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  constructor(private authHttp: AuthHttp, zone: NgZone, public http: Http, public events: Events )
  {
    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile =>
    {
      this.user = JSON.parse(profile);
      console.log('name', profile.name);
      console.log('user', this.user);
    }).catch(error =>
    {
      console.log(error);
    });
    this.storage.get('id_token').then(token =>
    {
      this.idToken = token;
    });
    this.storage.get('surgipal_id').then(spid =>
    {
      this.surgipalId = spid;
    });




    this.lock.on('authenticated', authResult =>
    {
      this.storage.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;
      this.storage.set(this.HAS_LOGGED_IN, true);

      this.events.publish('user:login');
      console.log("authResult", authResult);
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) =>
      {
        console.log("profile", profile);
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        profile.app_metadata = profile.app_metadata || {};
        //localStorage.setItem('profile', JSON.stringify(profile));
        this.storage.set('profile', JSON.stringify(profile));
        this.user = profile;
        this.globalId = this.user.global_user_id;

        this.getSurgiPalId();
        this.storage.set('surgipal_id', this.surgipalId);
        this.roles = this.user.app_metadata.authorization.roles;
          console.log('Roels',this.roles)
        this.setUsername(this.user.name);

      });
      this.lock.hide();

      this.storage.set('refresh_token', authResult.refreshToken);
      this.zoneImpl.run(() => this.user = authResult.profile);
      // Schedule a token refresh
      this.scheduleRefresh();

    });
  }
  getSurgiPalId()
  {
    let url = CONFIGURATION.baseUrls.apiUrl+ 'security/' + this.user.email;
    this.authHttp.get(url)
      .subscribe(
      data => { this.surgipalId = data.text(); this.storage.set('surgipal_id', data.text());},
      err => console.error(err),
      () => console.log('Got Surgipal Id:' + this.surgipalId)
      );
  }

  public getRefreshToken()
  {
    return new Promise((resolve) =>
    {
      console.log('getting a new on startup Jwt');
      this.storage.get('refresh_token').then(refresh_token =>
      {
        this.refreshToken = refresh_token;
        console.log('found refresh_token', refresh_token)
        resolve(refresh_token);
      })
    })
  }

  // called on first load from app.component.ts
  public refreshJwt(refresh_token)
  {
    return new Promise((resolve) =>
    {
      if (!refresh_token) {
        resolve(false);
      } else {
        this.auth0.refreshToken(refresh_token, (err, delegationRequest) =>
        {
          if (err) {
            alert(err);
          }
          console.log('got new Jwt, set token');
          this.storage.set('id_token', delegationRequest.id_token);
          this.idToken = delegationRequest.id_token;

          var authenticated: boolean = this.authenticated();
          // returns a promise<boolean> that finally
          // determines if user is truly authenticated
          resolve(authenticated);
        });
      }
    })
  }
  // public authenticated()
  // {
  //   return tokenNotExpired('id_token', this.idToken);
  // }
  public authenticated()
  {
  //  console.log('checking authenticated from:', source, tokenNotExpired('id_token', this.idToken))
    return tokenNotExpired('id_token', this.idToken);
  }
  public login()
  {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public logout()
  {
    this.storage.remove('profile');
    this.storage.remove('surgipal_id');
    this.storage.remove('id_token');
    this.storage.remove('refresh_token');
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
    this.idToken = null;
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
     this.lock.show();
  }


  public scheduleRefresh()
  {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    console.log('schedule a refresh');
    let source = Observable.of(this.idToken).flatMap(
      token =>
      {
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);

        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
        // let delay = 10000;
        console.log('set delay to ' + delay);
        return Observable.interval(delay);
      });

    this.refreshSubscription = source.subscribe(() =>
    {
      console.log('refresh subscription, getNewJwt');
      this.getNewJwt();
    });
  }
  public startupTokenRefresh()
  {
    console.log('startup token refresh');
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      console.log('user is authenticated on startup');
      this.storage.get('refresh_token').then(refresh_token =>
      {
        this.refreshToken = refresh_token;
        // get auth cookie from rivals
        // this.authWithRivals();
      }).catch(error =>
      {
        console.log(error);
      });
      let source = Observable.of(this.idToken).flatMap(
        token =>
        {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;
          // let delay = 10000;

          console.log('set delay to ' + delay);
          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });

      // Once the delay time from above is
      // reached, get a new JWT and schedule
      // additional refreshes
      source.subscribe(() =>
      {
        console.log('get a new token and schedule a refresh');
        this.getNewJwt();
       // this.navCtrl.push(TabsPage);
        this.scheduleRefresh();
      });
    }
  }
  public unscheduleRefresh()
  {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public getNewJwt()
  {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    console.log('getting a new Jwt');
    this.storage.get('refresh_token').then(token =>
    {
      this.auth0.refreshToken(token, (err, delegationRequest) =>
      {
        if (err) {
          alert(err);
        }
        console.log('got new Jwt, set token');
        this.storage.set('id_token', delegationRequest.id_token);
        this.idToken = delegationRequest.id_token;
        // return promise?  to be used by app.component?
      });
    })
      .catch(error =>
      {
        console.log(error);
      });

  }


  hasFavorite(sessionName: string): boolean
  {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void
  {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void
  {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };



  setUsername(username: string): void
  {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string>
  {
    return this.storage.get('username').then((value) =>
    {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean>
  {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) =>
    {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string>
  {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) =>
    {
      return value;
    });
  };

  public isAdmin()
  {

    return this.user && this.user.app_metadata
      && this.user.authorization.roles.indexOf('admin') > -1;
  }
  public isVendor()
  {
    return this.user && this.user.app_metadata
      && this.user.authorization.roles.indexOf('vendor') > -1;
  }
  public isHospital()
  {
    return this.user && this.user.app_metadata
      && this.user.authorization.roles.indexOf('hospital') > -1;

  }

  public isDoctor()
  {
    return this.user && this.user.app_metadata
      && this.user.authorization.roles.indexOf('physician') > -1;

  }
}
