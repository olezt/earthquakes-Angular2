import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecentService } from './recent.service';
import { Earthquake } from './earthquake';


@Component({
    selector: 'page-recent',
    templateUrl: 'recent.html'
})
export class RecentPage{
        
    recent: Earthquake[];
    
    constructor (private recentService: RecentService) {}
    
    ngOnInit() { 
        this.getRecent(); 
    }

    getRecent() {
        this.recentService.getRecent()
            .subscribe(
                recent => this.recent = recent);
  }
    
}
