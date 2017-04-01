import { Pulse } from './../../models/pulse';
import { Component   } from '@angular/core';
import {  NavParams,ViewController } from 'ionic-angular';
@Component({
  templateUrl: 'code-details.html'
})
export class CodeDetails {
 pulseItem:Pulse;
 codeType:string;
 codes: string[];
 constructor(params: NavParams, public viewCtrl: ViewController) {
this.pulseItem= params.get('pulseItem');
this.codeType= params.get('type');
if (this.codeType ==='cpt')
this.codes = this.pulseItem.cpt.split(',');
else
this.codes = this.pulseItem.diagnosisCode.split(',');
 }
 dismiss(){
     this.viewCtrl.dismiss();
 }

  delete(chip: Element) {
          console.log(chip.textContent.trim()+',')

          if (this.codeType==='cpt')
          this.pulseItem.cpt.replace(chip.textContent.trim()+',','');
else
  this.pulseItem.diagnosisCode.replace(chip.textContent.trim()+',','');
    chip.remove();
  }
}
