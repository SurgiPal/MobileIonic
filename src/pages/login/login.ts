import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs'; 


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
 

  constructor(public navCtrl: NavController, private auth : AuthService) { }

  onLogin(form: NgForm) {
    
    this.auth.lock.show();
    // if (form.valid) {
    //   this.auth.login(this.login.username);
    //   this.navCtrl.push(TabsPage);
    // }
  }

  onSignup() {
    this.auth.lock.show();
   //this.navCtrl.push(SignupPage);
  }
}
