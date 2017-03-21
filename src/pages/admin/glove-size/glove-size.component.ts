
import { Component } from '@angular/core';
import { App, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { ParamModalComponent } from './glove-modal';
import { CONFIGURATION } from './../../../providers/app.constants';


// Sevices
import { GloveSizeService, } from './glove-size.service';
// Models
import { GloveSize } from './../../../models/glove-size';
// Settings 
// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-glove-size',
  templateUrl: './../param.component.html'
})


export class GloveSizeComponent
{

  params: GloveSize[] = [];

  error: any;

  paramTitle = 'Glove Sizes';
  paramLabel = 'Enter Glove size';
  paramPattern = '-?[0-9]*(\.[0-9]+)?';

  fields: any[];
  constructor(private _service: GloveSizeService, public alertCtrl: AlertController,
    public app: App,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController)
  {
    this.app.setTitle(this.paramTitle + ' Editor');
  }

  ionViewDidLoad()
  {
    this.getAll();
  }

  getAll()
  {
    this.presentLoading();
    this._service.getAll().then(data =>
    {
      this.params = data;
    })
      .catch(error =>
      {
        this.error = error;
        this.presentAlert(error.messsage || error);
      });
  }
  editParam(characterNum?)  {
    let modal = this.modalCtrl.create(ParamModalComponent, characterNum);
    modal.present();

    modal.onWillDismiss((data: string) =>
    {
      if (data) {
        this.presentToast(data);
        this.getAll();
      }
    });
  }

  deleteParam(param: GloveSize): void  {
    event.stopImmediatePropagation();
    this._service.delete(param.id)
      .then(res =>
      {
        this.params = this.params.filter(h => h !== param);
        this.presentToast('Deleted Parameter ' + param.name);
      })
      .catch(error =>
      {
        this.error = error;
        this.presentAlert(error.messsage || error);
      });
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
  presentAlert(message: string)
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
