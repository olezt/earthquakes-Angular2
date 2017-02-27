import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

export class Earthquake{
        
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
