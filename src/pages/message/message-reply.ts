import { DoctorMessage } from './../../models/doctor-message';
import { Message } from './../admin/glove-size/index';
import { MessageService } from './message.service';
import { GloveSizeService } from './glove-size.service';
import { Param } from './../../../models/param';
import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  templateUrl: './message-reply.html'
})
export class MessageReplyModal
{
  private mailForm: FormGroup;
  message: DoctorMessage;
  //surgery?:Surgery;
  constructor(private formBuilder: FormBuilder,
    private _service: MessageService,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  )
  {
    this.message = this.params.get('m');



    //this.surgery = this.params.get('s');
    if (this.message === undefined) {
      // this.message = new DoctorMessage(-1, '');
      this.message = "Add Message";
    }
    this.mailForm = this.formBuilder.group({
      to: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(255), Validators.required])],
      from: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(255), Validators.required])],
      subject: ['RE' + this.message.subject, Validators.compose([Validators.minLength(5), Validators.maxLength(255), Validators.required])],
      message: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(1000), Validators.required])]
    });
  }

  sendEmail()
  {
    if (this.mailForm.get('subject').value !== null) {
      this._service.sendEmail(this.mailForm).then(data =>
      {
        this.dismiss('Sent reply email:' + this.mailForm.get('subject').value);
      })
        .catch(error =>
        {
          this.dismiss('Error: ' + error.toString());
        });
    }
    else {
      this.dismiss('Dint send it...');
    }

  }

  dismiss(msg: string)
  {
    this.viewCtrl.dismiss(msg);
  }
}
