import { MessageListPage } from './../message/message';
import { PulsePage } from './../pulse/pulse';
import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SpeakerListPage } from '../speaker-list/speaker-list';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = PulsePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MessageListPage;
  tab4Root: any = MapPage;
  tab5Root: any = AboutPage; 
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 2;
  }

}
