import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the Addhospital page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addhospital',
  templateUrl: 'addhospital.html'
})
export class AddhospitalPage {

  constructor(public navCtrl: NavController, public loadCtrl: LoadingController, public toastCtrl: ToastController) { }

  ionViewDidLoad() {
    console.log('Hello Addhospital Page');
  }
  addHospital() {

  }

}
