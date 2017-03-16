import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core'; 
import { AlertController, NavController } from 'ionic-angular'; 
import { LoginPage } from '../login/login';
import { SupportPage } from '../support/support';
 

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public auth: AuthService) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.auth.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.auth.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

  support() {
    this.nav.push(SupportPage);
  }
}
