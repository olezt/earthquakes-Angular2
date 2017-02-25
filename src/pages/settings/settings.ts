import { Component } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular2-localstorage";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  @LocalStorage() public minMag:number = 0;
  @LocalStorage() public lastHours:number = 48;  
}
