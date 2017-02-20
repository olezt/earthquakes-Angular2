import { Component } from '@angular/core';
import { SettingsService } from './settings.service';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
	  //,
  //providers: [SettingsService]
})
export class SettingsPage {
	public static earthquake: any;
	
	//constructor(private settingsService: SettingsService) { }
	
  ngOnInit() {
//	  SettingsPage.earthquake = this.settingsService.getSettings();
	  SettingsPage.earthquake = SettingsService.getSettings();
	  console.log(SettingsPage.earthquake);
  }
	//public static earthquake = SettingsService.getSettings();
//
//  $scope.$watch('vm.lang', function() {
//      updateLang();
//  });
	
  public static onChange(value){
      //alert(JSON.stringify(value));
      console.log(value);
    }
  
	public static updateRange(earthquakeRange) {
		console.log(earthquakeRange);

		//SettingsService.setRange(earthquakeRange);
	}

	public static updateHours(earthquakeHours) {
		//SettingsService.setHours(earthquakeHours);
	}
	
	public static updateLang (selectedLang) {
		console.log(selectedLang);
  	//$translate.use(vm.lang);
  	//SettingsService.setLang(vm.lang);
  }
  
  public static initLang(){
  	//vm.lang = SettingsService.getLang();
  	//$translate.use(vm.lang);
  }
  
  
}
