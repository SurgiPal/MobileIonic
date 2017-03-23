import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html'
})
export class StaffPage {

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    console.log('Hello Staff Page');
  }
}
