import { Component } from '@angular/core';


import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  templateUrl: 'tabs.html',

  selector: 'page-tabs',
})
export class TabsPage {
  
  tab1Root = 'HomePage';
  tab2Root = 'AboutPage';
  tab3Root = 'ContactPage';

  constructor() {}
}
