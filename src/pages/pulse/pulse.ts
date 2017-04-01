import { CodeDetails } from './code-details';
import { CONFIGURATION } from './../../providers/app.constants';
import { AuthHttp } from 'angular2-jwt';
import { Pulse } from './../../models/pulse';
import { AuthService } from './../../providers/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Headers } from '@angular/http';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';


import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SessionDetailPage } from '../session-detail/session-detail';
import { PulseService } from "./pulse.services";
import { Surgery } from "../../models/Surgery";
import { SurgeryDetailPage } from "../surgery-detail/surgery-detail";


@Component({
  selector: 'page-schedule',
  templateUrl: 'pulse.html'
})
export class PulsePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('surgeryList', { read: List }) surgeryList: List;
  selectedPulse: Pulse;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  surgeries: any = [];
  groups: any = [];
  confDate: string;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(
    private authHttp:AuthHttp,
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public auth: AuthService,
    private _service: PulseService
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Todays Pulse');
    if (this.auth.surgipalId !== undefined)
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.surgeryList && this.surgeryList.closeSlidingItems();


this.presentLoading();
    this._service.getAll().then(data =>
    {
      console.log('Pulse Data:', data);
      this.surgeries = data;

    })
     .catch(this.handleError);
      // .catch(error =>
      // {

      // });

    // this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) =>
    // {
    //   this.shownSessions = data.shownSessions;
    //   this.groups = data.groups;
    // });


    // this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
    //   this.shownSessions = data.shownSessions;
    //   this.groups = data.groups;
    // });
  }



  doRefresh(refresher)
  {
    let url = CONFIGURATION.baseUrls.apiUrl + 'pulse/' + this.auth.surgipalId;
    return this.authHttp.get(url, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Surgery[])
      .then(refresher.complete())
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any>
  {
    console.log(error.message || error);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error.message || error,
      buttons: ['OK']
    });
    alert.present();
    console.log('SERVICE ERROR', error.message || error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });
  }

  showDetail(s: any) {
    // go to the session detail page
    // and pass in the session data
    this.presentAlert('goto ');
    this.navCtrl.push(SurgeryDetailPage, s);
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    // if (this.user.hasFavorite(sessionData.name)) {
    //   // woops, they already favorited it! What shall we do!?
    //   // prompt them to remove it
    //   this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    // } else {
    //   // remember this session as a user favorite
    //   this.user.addFavorite(sessionData.name);

    //   // create an alert instance
    //   let alert = this.alertCtrl.create({
    //     title: 'Favorite Added',
    //     buttons: [{
    //       text: 'OK',
    //       handler: () => {
    //         // close the sliding item
    //         slidingItem.close();
    //       }
    //     }]
    //   });
    //   // now present the alert on top of all other content
    //   alert.present();
    // }
  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    // let alert = this.alertCtrl.create({
    //   title: title,
    //   message: 'Would you like to remove this session from your favorites?',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: () => {
    //         // they clicked the cancel button, do not remove the session
    //         // close the sliding item and hide the option buttons
    //         slidingItem.close();
    //       }
    //     },
    //     {
    //       text: 'Remove',
    //       handler: () => {
    //         // they want to remove this session from their favorites
    //         this.user.removeFavorite(sessionData.name);
    //         this.updateSchedule();

    //         // close the sliding item and hide the option buttons
    //         slidingItem.close();
    //       }
    //     }
    //   ]
    // });
    // // now present the alert on top of all other content
    // alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }
  loadDetail(p: Pulse)
  {
    this.selectedPulse = p;
    console.log('loadDetail', p.patient.toString());
  }
  billSurgery(p: Pulse)
  {
    this.selectedPulse = p;
   // this.pulses.find(o => o.id == p.id).isBilled = true;
    console.log('billSurgery', p.patient.toString());
  }
  cancelSurgery(pulse: Pulse, p: Element)
  {
    this.selectedPulse = pulse;
    console.log('cancelling', pulse.patient.toString());
    p.remove();
  }

  presentCodeModal(codeType:string)
  {
    console.log('Selected Pulse Id ', this.selectedPulse.id);
    //  var codes = this.selectedPulse.cptCodes.split(',');
    //  console.log('codes',codes);
    //  debugger;
    let profileModal = this.modalCtrl.create(CodeDetails, { pulseItem: this.selectedPulse, type:codeType }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    profileModal.present();
  }
  showEditCodes(p: Pulse, codeType:string)
  {
    this.selectedPulse = p;
    this.presentCodeModal(codeType);
    console.log('showEditCPTCodes', p.patient.toString());
  }

  // addHospital()
  // {
  //   console.log('Add Hospital Clicked');
  //   this.navCtrl.push(AddhospitalPage);
  // }
  // addStaff()
  // {
  //   console.log('Add Staff Clicked');
  //   this.navCtrl.push(StaffPage);
  // }
  // addSurgery()
  // {
  //   this.navCtrl.push(AddsurgeryPage);
  // }

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Checking pulse...",
      duration: 5000,
      dismissOnPageChange: true
    });
    loader.present();
  }

  presentAlert(message:string){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      buttons: [{
        text: 'OK',
        handler: () =>
        {
          // close the sliding item
         // slidingItem.close();
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}




///OLD

// import { CONFIGURATION } from './../../providers/app.constants';
// import { AuthHttp } from 'angular2-jwt';
// import { Pulse } from './../../models/pulse';
// import { AuthService } from './../../providers/auth.service';
// import { Component, ViewChild } from '@angular/core';
// import { Headers } from '@angular/http';
// import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';

// /*
//   To learn how to use third party libs in an
//   Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
// */
// // import moment from 'moment';

// import { ConferenceData } from '../../providers/conference-data';
// import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
// import { SessionDetailPage } from '../session-detail/session-detail';


// @Component({
//   selector: 'page-schedule',
//   templateUrl: 'schedule.html'
// })
// export class SchedulePage
// {
//   // the list is a child of the schedule page
//   // @ViewChild('scheduleList') gets a reference to the list
//   // with the variable #scheduleList, `read: List` tells it to return
//   // the List and not a reference to the element
//   @ViewChild('scheduleList', { read: List }) scheduleList: List;

//   dayIndex = 0;
//   queryText = '';
//   segment = 'all';
//   excludeTracks: any = [];
//   shownSessions: any = [];
//   groups: any = [];
//   confDate: string;
//   private headers = new Headers({ 'Content-Type': 'application/json' });
//   constructor(
//     private authHttp: AuthHttp,
//     public alertCtrl: AlertController,
//     public app: App,
//     public loadingCtrl: LoadingController,
//     public modalCtrl: ModalController,
//     public navCtrl: NavController,
//     public auth: AuthService,
//   ) { }

//   ionViewDidLoad()
//   {
//     this.app.setTitle('Schedule');
//     this.updateSchedule();
//   }

//   updateSchedule()
//   {
//     // Close any open sliding items when the schedule updates
//     this.scheduleList && this.scheduleList.closeSlidingItems();


//     this.presentLoading();
//     this.getAll().then(data =>
//     {
//       debugger;
//       console.log(data);
//       this.shownSessions = data;

//     })
//       .catch(error =>
//       {

//       });

//     // this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) =>
//     // {
//     //   this.shownSessions = data.shownSessions;
//     //   this.groups = data.groups;
//     // });


//     // this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
//     //   this.shownSessions = data.shownSessions;
//     //   this.groups = data.groups;
//     // });
//   }


//   getAll(): Promise<Pulse[]>
//   {
//     console.log('getAll()');
//     return this.authHttp.get('http://localhost:32799/api/pulse/12', { headers: this.headers })
//       .toPromise()
//       .then(response => response.json() as Pulse[])
//       .catch(this.handleError);
//   }
//   doRefresh(refresher)
//   {
//     let url = CONFIGURATION.baseUrls.apiUrl + 'pulse/' + this.auth.surgipalId;
//     return this.authHttp.get(url, { headers: this.headers })
//       .toPromise()
//       .then(response => response.json() as Pulse[])
//       .then(refresher.complete())
//       .catch(this.handleError);
//   }
//   private handleError(error: any): Promise<any>
//   {
//     console.log(error.message || error);
//     let alert = this.alertCtrl.create({
//       title: 'Error',
//       subTitle: error.message || error,
//       buttons: ['OK']
//     });
//     alert.present();
//     console.log('SERVICE ERROR', error.message || error); // for demo purposes only
//     return Promise.reject(error.message || error);
//   }

//   presentFilter()
//   {
//     let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
//     modal.present();

//     modal.onWillDismiss((data: any[]) =>
//     {
//       if (data) {
//         this.excludeTracks = data;
//         this.updateSchedule();
//       }
//     });

//   }

//   goToSessionDetail(sessionData: any)
//   {
//     // go to the session detail page
//     // and pass in the session data
//     this.presentAlert('goto ');
//     this.navCtrl.push(SessionDetailPage, sessionData);
//   }

//   addFavorite(slidingItem: ItemSliding, sessionData: any)
//   {

//     if (this.user.hasFavorite(sessionData.name)) {
//       // woops, they already favorited it! What shall we do!?
//       // prompt them to remove it
//       this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
//     } else {
//       // remember this session as a user favorite
//       this.user.addFavorite(sessionData.name);

//       // create an alert instance
//       let alert = this.alertCtrl.create({
//         title: 'Favorite Added',
//         buttons: [{
//           text: 'OK',
//           handler: () =>
//           {
//             // close the sliding item
//             slidingItem.close();
//           }
//         }]
//       });
//       // now present the alert on top of all other content
//       alert.present();
//     }

//   }

//   removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string)
//   {
//     let alert = this.alertCtrl.create({
//       title: title,
//       message: 'Would you like to remove this session from your favorites?',
//       buttons: [
//         {
//           text: 'Cancel',
//           handler: () =>
//           {
//             // they clicked the cancel button, do not remove the session
//             // close the sliding item and hide the option buttons
//             slidingItem.close();
//           }
//         },
//         {
//           text: 'Remove',
//           handler: () =>
//           {
//             // they want to remove this session from their favorites
//             this.user.removeFavorite(sessionData.name);
//             this.updateSchedule();

//             // close the sliding item and hide the option buttons
//             slidingItem.close();
//           }
//         }
//       ]
//     });
//     // now present the alert on top of all other content
//     alert.present();
//   }

//   openSocial(network: string, fab: FabContainer)
//   {
//     let loading = this.loadingCtrl.create({
//       content: `Posting to ${network}`,
//       duration: (Math.random() * 1000) + 500
//     });
//     loading.onWillDismiss(() =>
//     {
//       fab.close();
//     });
//     loading.present();
//   }


//   presentLoading()
//   {
//     let loader = this.loadingCtrl.create({
//       content: "Please wait...",
//       duration: 5000,
//       dismissOnPageChange: true
//     });
//     loader.present();
//   }

//   presentAlert(message: string)
//   {
//     let alert = this.alertCtrl.create({
//       title: 'Alert',
//       buttons: [{
//         text: 'OK',
//         handler: () =>
//         {
//           // close the sliding item
//           // slidingItem.close();
//         }
//       }]
//     });
//     // now present the alert on top of all other content
//     alert.present();
//   }
// }
