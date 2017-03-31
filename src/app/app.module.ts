import { LoggerService } from './../providers/logger.services';
import { NotifyService } from './../providers/notify.service';
import { MessageDetailPage } from './../pages/message-detail/message-detail';
import { MessageService } from './../pages/message/message.service';
import { CodeDetails } from './../pages/pulse/code-details';
import { PulsePage } from './../pages/pulse/pulse';
import { ParamModal } from './../pages/admin/glove-size/glove-modal';

import { GloveSizeService } from './../pages/admin/glove-size/glove-size.service';
import { GloveSizeComponent } from './../pages/admin/glove-size/glove-size.component';

import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { Storage } from '@ionic/storage';
import { AuthService } from './../providers/auth.service';
import { Http } from '@angular/http';
import { ConferenceData } from '../providers/conference-data';
//import { UserData } from '../providers/user-data';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { PulseService } from "../pages/pulse/pulse.services";
import { MessageListPage } from "../pages/message/message";
let storage: Storage = new Storage();

export function getAuthHttp(http)
{
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    GloveSizeComponent ,
    ParamModal,
    PulsePage,
    CodeDetails,
    MessageListPage,MessageDetailPage
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    PulsePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    GloveSizeComponent ,
    ParamModal,
    CodeDetails, MessageListPage, MessageDetailPage
  ],
  providers: [AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }, { provide: ErrorHandler, useClass: IonicErrorHandler },
    NotifyService,
    ConferenceData,
    GloveSizeService,
    PulseService,
    MessageService,
    LoggerService
  ]

})
export class AppModule { }
