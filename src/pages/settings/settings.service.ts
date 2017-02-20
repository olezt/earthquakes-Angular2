import {Constants} from '../../app/constants';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
	public static range;// = window.localStorage['range'];
	public static hours;// = window.localStorage['hours'];
	public static lang;// = window.localStorage['lang'] || 'gr';
	//initSettings();

	public static initSettings() {
		//SettingsService.settings = {};
		SettingsService.lang = window.localStorage['lang'] || 'gr';
		SettingsService.range = window.localStorage['range'];
		SettingsService.hours = window.localStorage['hours'];
	}

	public static getSettings() {
		SettingsService.initSettings();
		return SettingsService;
	}

	public static getHours() {
		return window.localStorage['hours'];
	}

	public static setHours(hours) {
		window.localStorage['hours'] = hours;
	}

	public static getRange() {
		return window.localStorage['range'];
	}

	public static setRange(range) {
		window.localStorage['range'] = range;
	}

	public static getLang() {
		return window.localStorage['lang'];
	}

	public static setLang(newLang) {
		window.localStorage['lang'] = newLang;
	}
  
  
}
