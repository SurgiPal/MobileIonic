import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';


@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html'
})
export class MessageDetailPage {
  message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = this.navParams.data;
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, session);
  }
}
