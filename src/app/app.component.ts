import { MessageListPage } from './../pages/message/message';
import { PulsePage } from './../pages/pulse/pulse';

import { LoginPage } from './../pages/login/login';
import { AuthService } from './../providers/auth.service';
import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SupportPage } from '../pages/support/support';
 import { GloveSizeComponent } from './../pages/admin/glove-size/glove-size.component';

import { ConferenceData } from '../providers/conference-data';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Today', component: TabsPage, tabComponent: PulsePage, icon: 'pulse' },
    { title: 'Speakers', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'person' },
    { title: 'Messages', component: TabsPage, tabComponent: MessageListPage, index: 2, icon: 'mail' },
    { title: 'Stats', component: TabsPage, tabComponent: MapPage, index: 3, icon: 'stats' },
    { title: 'About', component: TabsPage, tabComponent: AboutPage, index: 4, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Support', component: SupportPage, icon: 'help' },
    { title: 'Logout', component: AboutPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    // { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Support', component: SupportPage, icon: 'help' }
     // { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];

adminPages: PageInterface[] = [
    // { title: 'Login', component: LoginPage, icon: 'log-in' },
  { title: 'Glove Size', component: GloveSizeComponent, icon: 'hand' },
  { title: 'Countries', component: GloveSizeComponent, index: 1,  icon: 'globe' }
    // { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
      public auth: AuthService
  ) {
    console.log('hello app');

    platform.ready().then(() =>
    {
      console.log('hello platform');
     // StatusBar.styleDefault();

      this.auth.getRefreshToken()
        .then((refresh_token) =>
        {
          console.log('returned refresh_token:', refresh_token);
          // return false or true for auth status
          return this.auth.refreshJwt(refresh_token);
        })
        .then((authenticated) =>
        {
          if (authenticated) {
            console.log('isAuthenticated in app.component: true');

            // load the conference data  REFACTOR -- INSERT RIVALS QUERY HERE
            confData.load();

            this.rootPage = TabsPage;
            this.enableMenu(true);
            this.auth.startupTokenRefresh();
            // this.auth.authWithRivals();  // now handled in event handler
            this.events.publish('user:authenticated', 'app.component startup');



          } else {
            console.log('isAuthenticated: false');
            // Should FAIL
          //  this.auth.authWithRivals();

            this.auth.login();
            // this.auth.checkHasSeenTutorial().then((hasSeenTutorial) =>
            // {
            //   this.rootPage = LoginPage;
            //   this.auth.login();
            //   // if (hasSeenTutorial === null) {
            //   //   // User has not seen tutorial
            //   //   this.rootPage = AboutPage;
            //   // } else {
            //   //   this.rootPage = AboutPage;
            //   // }
            //   Splashscreen.hide();
            // });
          }
        })
        .catch((err) =>
        {
          console.log('startup auth error:', err);
        })
      Splashscreen.hide();
      this.listenToLoginEvents();

    });
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.auth.logout();
      }, 1000);
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }


  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'secondary';
      }
      return 'primary';
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'secondary';
    }
    return 'primary';
  }
}
