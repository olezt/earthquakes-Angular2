import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Earthquake } from './earthquake';


@Injectable()
export class RecentService {
    private startTime = this.calculateTimeRequest();
    private recentUrl = 'http://www.seismicportal.eu/fdsnws/event/1/query?limit=1000&start=' + this.startTime + '&minlat=' + Constants.STATIC_BOUNDS_SOUTH + '&maxlat=' + Constants.STATIC_BOUNDS_NORTH + '&minlon=' + Constants.STATIC_BOUNDS_WEST + '&maxlon=' + Constants.STATIC_BOUNDS_EAST + '&minmag=3&format=json';
//    private recentUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?limit=30&starttime=' + this.startTime + '&minlatitude=' + Constants.STATIC_BOUNDS_SOUTH + '&maxlatitude=' + Constants.STATIC_BOUNDS_NORTH + '&minlongitude=' + Constants.STATIC_BOUNDS_WEST + '&maxlongitude=' + Constants.STATIC_BOUNDS_EAST + '&minmagnitude=3&format=geojson';
    constructor (private http: Http) {}
    
    getRecent (): Observable<Earthquake[]> {
        console.log(this.recentUrl);
        return this.http.get(this.recentUrl)
                    .map(this.extractData);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.features || { };
    }

    private calculateTimeRequest() {
        var date = new Date();
        date.setHours(date.getHours() - 48);
        return date.toJSON();
    }
}
