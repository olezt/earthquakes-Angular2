import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RecentService } from './recent.service';
import { Earthquake } from './earthquake';

@Component({
    selector: 'page-recent',
    templateUrl: 'recent.html',
    providers: [RecentService]
})
    
export class RecentPage{
        
    recentEarthquakes: Earthquake[];
    
    constructor (public navCtrl: NavController, private recentService: RecentService) {}
    
    ngOnInit() { 
        this.getRecent(); 
    }

    getRecent() {
        this.recentService.getRecent()
            .subscribe(
                recentEarthquakes => this.recentEarthquakes = recentEarthquakes);
  }
    
}
