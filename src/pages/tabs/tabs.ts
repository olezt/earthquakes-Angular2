import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';
import { RecentPage } from '../recent/recent';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = SettingsPage;
    tab2Root: any = MapPage;
    tab3Root: any = RecentPage;
    
    constructor() {
    }

}
