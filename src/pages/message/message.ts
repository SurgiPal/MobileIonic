import { MessageReplyModal } from './message-reply';

import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { ActionSheet, ActionSheetController, Config, NavController, LoadingController, App, ModalController, ToastController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { MessageDetailPage } from '../message-detail/message-detail';
import { MessageService } from "./message.service";
import { NotifyService } from "../../providers/notify.service";


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
    public _n:NotifyService,
    public config: Config
  ) {
    this.app.setTitle('Messages');
   }

  ionViewDidLoad() {

if (this.auth.surgipalId===undefined) 
{this._n.presentAlert('Unknown User','The current user, '+ this.auth.user.name + ' cannot be found.');
  }
  else
  {
  
    this.presentLoading();
    this.refreshData();{}
  }
  }

 refreshData(){

   try{
    
   this._service.getAll().then(data =>
   {
     console.log('Got messages from service:', data);
     this.messages = data;
   }).catch(error=>{
  let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.log('ERROR',errMsg);
     this._n.presentAlert('Error', errMsg);
   });
  }
  catch(error)
{

   
}
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
    console.log('showing message detail')
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
      duration: 1000,
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
