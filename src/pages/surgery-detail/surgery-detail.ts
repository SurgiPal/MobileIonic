import {Pulse} from '../../models/pulse';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Surgery } from "../../models/index";
@Component({
  selector: 'page-surgery-detail',
  templateUrl: 'surgery-detail.html'
})
export class SurgeryDetailPage {
  surgery: Surgery;
  constructor(public navParams: NavParams) {
    this.surgery = navParams.data;
  }
}
