import { ParamModal } from './glove-modal';
import { NotifyService } from './../../../providers/notify.service';

import { Component } from '@angular/core';
import { App, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
 
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
  constructor(private _service: GloveSizeService, public alertCtrl: AlertController, private _notify: NotifyService,
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
    this._notify.presentLoading();
    this._service.getAll().then(data =>
    {
      this.params = data;
    })
      .catch(error =>
      {
        this.error = error;
        this._notify.presentAlert('Error', error.messsage || error);
      });
  }
  editParam(characterNum?)  {
    let modal = this.modalCtrl.create(ParamModal, characterNum);
    modal.present();

    modal.onWillDismiss((data: string) =>
    {
      if (data) {
        this._notify.presentToast('Success!', modal.name + ' is now in the system.');
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
        this._notify.presentToast('Success!','Deleted Parameter ' + param.name);
      })
      .catch(error =>
      {
        this.error = error;
        this._notify.presentAlert('Error',error.messsage || error);
      });
  } 
}
