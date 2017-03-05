import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';


import { RecentService } from './recent.service';
import { Earthquake } from './earthquake';
import { MapPage } from '../map/map';

@Component({
    selector: 'page-recent',
    templateUrl: 'recent.html',
    providers: [RecentService]
})
    
export class RecentPage{
        
    recentEarthquakes: Earthquake[];
    public static selectedEarthquake = {};
    constructor (public navCtrl: NavController, private recentService: RecentService) {
    }
    
    ngOnInit() { 
        this.getRecent(); 
    }

    getRecent() {
        this.recentService.getRecent()
            .subscribe(
                recentEarthquakes => this.recentEarthquakes = recentEarthquakes);
    }
    
    showOnMap(selectedEarthquake){
        RecentPage.selectedEarthquake = selectedEarthquake;
        this.navCtrl.parent.select(1);
    }
    
}
