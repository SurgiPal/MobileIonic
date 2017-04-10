import { LoggerService } from './../../providers/logger.services';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
// import { Message } from './../../models/message';
import { AuthService } from './../../providers/auth.service';
// import { Headers } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { CONFIGURATION } from './../../providers/app.constants';
import { Injectable } from '@angular/core';
import { Message } from "../../models/message";
import { Http } from "@angular/http";


@Injectable()
export class MessageService
{

  constructor(private http: Http, private authHttp: AuthHttp, private auth: AuthService,private logger : LoggerService)
  {
  }
  getAll(): Promise<Message[]>
  {
 
///    var url = CONFIGURATION.baseUrls.apiUrl + 'messages/doctors/' + this.auth.surgipalId;
 
   // var url = CONFIGURATION.baseUrls.apiUrl + 'messages/doctors/' + this.auth.surgipalId;
   var url =CONFIGURATION.apiUrls.message + '?transform=1&order=created_at,desc&filter[]=user_id,eq,' + this.auth.fosId
 
    console.log('Message URL:', url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().doctor_message as Message[])
      .catch(this.handleError);
  }


  sendEmail(emailForm: FormGroup): Promise<Message>
{
    var url = CONFIGURATION.baseUrls.apiUrl + 'messages';
    console.log(emailForm.value);
    this.logger.console('sendEmail:', emailForm);
  return this.authHttp
    .post(url,  emailForm.value  )
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
}
  // getMessages()
  // {
  //   var url = CONFIGURATION.baseUrls.apiUrl + 'messages/doctors/' + this.auth.surgipalId;

  //   return this.authHttp.get(url).map((data: any) =>
  //   {
  //     return data.speakers.sort((a: any, b: any) =>
  //     {
  //       let aName = a.name.split(' ').pop();
  //       let bName = b.name.split(' ').pop();
  //       return aName.localeCompare(bName);
  //     });
  //   });
  // }



  get(id: number): Promise<Message>
  {
    const url = CONFIGURATION.baseUrls.apiUrl + 'messages/' + id;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as Message)
      .catch(this.handleError);
  }
  private handleError(error: any)
  {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error('handleError in Message Servicess', errMsg); // log to console instead
    return errMsg;
  }
}
