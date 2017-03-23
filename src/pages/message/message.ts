import { MessageReplyModal } from './message-reply';

import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { ActionSheet, ActionSheetController, Config, NavController, LoadingController, App, ModalController, ToastController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { MessageDetailPage } from '../message-detail/message-detail';
import { MessageService } from "./message.service";


@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessageListPage {
  actionSheet: ActionSheet;
  messages: any = [];

  constructor(
    public app: App,
    private auth : AuthService,
    public loadingCtrl: LoadingController,
    private _service : MessageService,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl:ModalController,
    public config: Config
  ) {
    this.app.setTitle('Messages');
   }

  ionViewDidLoad() {
    this.presentLoading();
    this.refreshData();
  }
 
 refreshData(){
   this._service.getAll().then(data =>
   {
     console.log('Got messages from service:', data)
     this.messages = data;
   });
 }
  reply(msg?)
  {
    let modal = this.modalCtrl.create(MessageReplyModal, msg);
    modal.present();

    modal.onWillDismiss((data: string) =>
    {
      if (data) {
        this.presentToast(data);
        this.refreshData();
      }
    });
  }






  showDetails(msg: any) {
    this.navCtrl.push(MessageDetailPage, msg);
  } 
  showContactInfo(msg: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + msg.name,
      buttons: [
        {
          text: `Email ( ${msg.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + msg.email);
          }
        },
        {
          text: `Call ( ${msg.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + msg.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Getting Messages...",
      duration: 5000,
      dismissOnPageChange: true
    });
    loader.present();
  }
  presentToast(message: string)
  {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true
    });
    toast.present();
  } 


}
