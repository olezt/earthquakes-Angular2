import { Component } from '@angular/core';
import {LocalStorage} from "angular2-localstorage";

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(public navCtrl: NavController) {
  }

  @LocalStorage() public minMag:number = 0;
  @LocalStorage() public lastHours:number = 48;  
}
