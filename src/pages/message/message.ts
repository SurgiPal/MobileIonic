
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { ActionSheet, ActionSheetController, Config, NavController, LoadingController, App } from 'ionic-angular';
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
    public config: Config
  ) {
    this.app.setTitle('Messages');
   }

  ionViewDidLoad() {
    this.presentLoading();
    this._service.getAll().then(data => {
      console.log('Got messages from service:', data)
      this.messages = data;
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(MessageDetailPage, session);
  }

  goToSpeakerDetail(speakerName: any) {
    this.navCtrl.push(MessageDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker: any) {
    new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
  }

  openSpeakerShare(speaker: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: ($event: Event) => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if ((window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
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
      duration: 2000,
      dismissOnPageChange: true
    });
    loader.present();
  }



}
