import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';
import { Message } from "../../models/message";
import { AuthService } from "../../providers/auth.service";


@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html'
})
export class MessageDetailPage {
  message: Message;

  constructor(private auth:AuthService, public navCtrl: NavController, public navParams: NavParams) {
    this.message = this.navParams.data;
      if (!this.message.doctorImage)
      this.message.doctorImage='~/assets/img/flat-avatar.png';
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, session);
  }
}
