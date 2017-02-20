import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from "@angular/forms";
import { BrowserModule  } from '@angular/platform-browser';
import { Ng2MapModule} from 'ng2-map';
import { MyApp } from './app.component';
import { SettingsPage } from '../pages/settings/settings';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
//import {Globals} from './globals';


@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    MapPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule, 
    FormsModule, 
    Ng2MapModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    MapPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
