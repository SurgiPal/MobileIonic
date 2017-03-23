import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
@Injectable()
export class NotifyService
{
  constructor(public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController)
  {
  }
  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000,
      dismissOnPageChange: true
    });
    loader.present();
  }
  presentToast(title: string, message: string)
  {
    let toast = this.toastCtrl.create({ 
      
      message: message,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true
    });

    toast.onDidDismiss(() =>
    {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  presentAlert(title: string, message: string)
  {
    let alert = this.alertCtrl.create({
      title: title || 'Error',
      buttons: [{
        text: 'OK',
        handler: () =>
        {
          // close the sliding item
          // slidingItem.close();
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  }
  presentError(  message: string)
  {
    let alert = this.alertCtrl.create({
      title: 'Error',
      buttons: [{
        text: 'OK',
        handler: () =>
        {
          // close the sliding item
          // slidingItem.close();
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  } 
}
