import { Pulse } from './../../models/pulse';
import { Component   } from '@angular/core';
import {  NavParams,ViewController } from 'ionic-angular';
@Component({
  templateUrl: 'code-details.html'
})
export class CodeDetails {
 pulseItem:Pulse;
 codes: string[];
 constructor(params: NavParams, public viewCtrl: ViewController) {
this.pulseItem= params.get('pulseItem');
this.codes = this.pulseItem.cpt.split(',');
 }
 dismiss(){
     this.viewCtrl.dismiss();
 }

  delete(chip: Element) {
    console.log('chip', this.pulseItem.cpt);
          console.log(chip.textContent.trim()+',')
          this.pulseItem.cpt.replace(chip.textContent.trim()+',','');

          console.log('chip2', this.pulseItem.cpt);
    chip.remove();
  }
}
