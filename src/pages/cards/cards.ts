import { AuthService } from './../../providers/auth.service';
import { Question } from './../../models/Question';

import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  private hospitals: Array<{ id: number, name: string }>;
  private templates: Array<{ id: number, name: string }>;
hospitalId:number;
templateId:number;

  profileSegment: any = 'create';
  constructor(public navCtrl: NavController, public auth: AuthService, public toastCtrl : ToastController) {
    this.hospitals = [
      { id: 1, name: "All" },
      { id: 2, name: "Medstar Georgetown University Hospital" },
      { id: 3, name: "Clinton Hospital" }
    ];
    this.templates = [
      { id: 1, name: "Cardiology" },
      { id: 2, name: "Cardiovascular Surgery" },
      { id: 3, name: "Ear, Nose, and Throat Surgery" },
      { id: 4, name: "Gastroenterology" },
      { id: 5, name: "General Surgery" },
      { id: 6, name: "Interventional Pain Management" },
      { id: 7, name: "Neurosurgery" },
      { id: 8, name: "Orthopedic Surgery" }
    ];
  }

  ionViewDidLoad() {

    console.log('Hello Cards Page');
  }
  getQuestion(question: Question) {
    console.log('getQuestion fired from CardsPage');
  }
  createCard(){
    this.showToast('Hospital Id' + this.hospitalId);
    console.log('hospitalId',this.hospitalId);
    console.log('templateId',this.templateId)
  }
   showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      cssClass: 'positive'
    });
    toast.present(toast);
  }
}
