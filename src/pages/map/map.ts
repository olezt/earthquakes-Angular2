import { Component, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Ng2MapComponent } from 'ng2-map';
import { NavController } from 'ionic-angular';
import {Constants} from '../../app/constants';
import {LocalStorage} from "angular2-localstorage";
//import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  
  public static recent = [];
  public static rectangle;
  public static firstLoadSuccess = false;
  public static fillOpacity = 0.5;
  public static currentBounds;
  public static fittingBounds;
  public static isOnline;
  public mapHeight = window.innerHeight -55.99 + "px";
  public static blinkInterval;
  public static refreshDiv;
  @LocalStorage() public static minMag:number = 0;
  @LocalStorage() public static lastHours:number = 48; 
  
  //Declare Greece bounds constants
  public static NORTH = 42.927336;
  public static EAST = 28.726044;
  public static SOUTH = 34.284733;
  public static WEST = 18.748591;
  
  
  constructor(public navCtrl: NavController) {//, public router: Router
    Ng2MapComponent['apiUrl'] = 'https://maps.google.com/maps/api/js?key=AIzaSyC1RlpsPiVY1X4AR5l2xPKD3A9bRkf3oq4';

      Observable.merge(
                 navCtrl.viewDidLoad,
                 navCtrl.viewWillEnter, 
                 navCtrl.viewDidEnter, 
                 navCtrl.viewWillLeave, 
                 navCtrl.viewDidLeave, 
                 navCtrl.viewWillUnload);

//     router.events.subscribe((val) => {
//        // see also 
//        console.log("yeeei");
//    });
  }

  @ViewChild(Ng2MapComponent) ng2MapComponent: Ng2MapComponent;
  public static map: google.maps.Map;
  
  ngOnInit() {
      this.ng2MapComponent.mapReady$.subscribe(map => {
      MapPage.map = map;
      MapPage.initMap();
      
      MapPage.refreshDiv = document.createElement('div');
      new MapPage.CenterControl(MapPage.refreshDiv, map);
      MapPage.refreshDiv.index = 1;
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(MapPage.refreshDiv);
    })
  }

    private static initMap() {
      MapPage.addBoundsListener();
      MapPage.fitBounds();
      MapPage.refreshData(true);
  }
  
  private static refreshData(init:boolean){
    MapPage.clearData();
    MapPage.loadData(init);
  }
  
  private static loadData(init: boolean) {
    var bounceDate = new Date();
    bounceDate.setHours(bounceDate.getHours() + 2 - 4);

    MapPage.map.data.loadGeoJson(MapPage.calculateApiUrl(init), null, ()=> {
      MapPage.createInfoWindows();
      MapPage.setIconStyle(bounceDate);
      MapPage.blinkRecent();
    });
    
  }

  private static clearData() {
      MapPage.map.data.forEach(function(feature) {
      MapPage.map.data.remove(feature);
    });
    MapPage.recent = [];
    //$interval.cancel(blinkInterval);
    MapPage.blinkInterval = undefined;
    google.maps.event.clearListeners(MapPage.map.data, 'click');
  }
  
  public static calculateApiUrl(init: boolean) {
    var startTime = MapPage.calculateTimeRequest();
    var apiUrl;
    if(!init && MapPage.currentBounds){
      var dynamicBounds = JSON.stringify(MapPage.currentBounds);
      MapPage.fittingBounds =JSON.parse(dynamicBounds);
      apiUrl = 'http://www.seismicportal.eu/fdsnws/event/1/query?limit=100&start=' + startTime+'&minlat='+MapPage.fittingBounds.south+'&maxlat='+MapPage.fittingBounds.north+'&minlon='+MapPage.fittingBounds.west+'&maxlon='+MapPage.fittingBounds.east+'&minmag=' + MapPage.minMag +'&format=json';
        console.log("not static "+apiUrl);
    
    }else{
      apiUrl = 'http://www.seismicportal.eu/fdsnws/event/1/query?limit=1000&start=' + startTime+'&minlat='+Constants.STATIC_BOUNDS_SOUTH+'&maxlat='+Constants.STATIC_BOUNDS_NORTH+'&minlon='+Constants.STATIC_BOUNDS_WEST+'&maxlon='+Constants.STATIC_BOUNDS_EAST+'&minmag=' + MapPage.minMag +'&format=json';
        console.log("static"+apiUrl);
    
    }
    return apiUrl;
  }

  public static calculateTimeRequest() {
    var date = new Date();
    date.setHours(date.getHours() - MapPage.lastHours + 2);
    return date.toJSON();
  }

  private static createInfoWindows() {
    var infowindow = new google.maps.InfoWindow();
//    var magTranslation;
//    $translate('magnitude_msg').then(function(mag) {
//      magTranslation = mag;
//    }, function(translationId) {});
//    $translate('depth_msg').then(function(depth) {
//      depthTranslation = depth;
//    }, function(translationId) {});
    var listenerHandle = MapPage.map.data.addListener('click', function(event) {
      var date = new Date(event.feature.getProperty("time"));
      var mag = event.feature.getProperty("mag");
      var depth = event.feature.getProperty("depth");
      infowindow.setContent("<div style='width:160px; text-align: left;'>"+date.toDateString() +", "+ date.toLocaleTimeString('en-US',{ hour12: false }) +"<br><b>Magnitude:</b> " + mag + " M<br><b>Depth</b>: "+depth+" km</div>");
      infowindow.setPosition(event.feature.getGeometry().get());
      infowindow.setOptions({
        pixelOffset : new google.maps.Size(0, -5)
      });
      infowindow.open(MapPage.map);
    });
  }
  
  private static blinkRecent(){
    MapPage.blinkInterval = setInterval(function() {
      if(MapPage.recent && MapPage.recent.length > 0){
      MapPage.recent.forEach(function(feature) {
        MapPage.map.data.overrideStyle(feature, {
          icon : {
            path: google.maps.SymbolPath.CIRCLE,
                fillColor: (feature.getProperty('mag')<3?'#0004FF':(feature.getProperty('mag')<4?'#FFF300':(feature.getProperty('mag')<6?'#FF0000':'#A20404'))),
                fillOpacity: MapPage.fillOpacity,
                scale: 1.7*feature.getProperty('mag'),
                strokeColor: 'black',
                strokeWeight: MapPage.fillOpacity
          }
        });
      });
      }
      if(MapPage.fillOpacity == 0.5){
        MapPage.fillOpacity = 0;
      }else{
        MapPage.fillOpacity = 0.5;
      }
    }, 500);
  }
  
  
  private static setIconStyle(bounceDate: any) {
    MapPage.map.data.setStyle(function(feature) {
      var magnitude = feature.getProperty('mag');
      var featureDate = new Date(feature.getProperty("time"));
      var strokeColor = 'white';
      var color;
      if(magnitude<3){
        color = '#0004FF'; //blue
      }else if(magnitude < 4){
        color = '#FFF300'; //yellow
      }else if(magnitude < 6){
        color = '#FF0000'; //red
      }else{
        color = '#A20404'; //dark red
      }
      
      if(featureDate > bounceDate){
        MapPage.recent.push(feature);
        strokeColor = 'black';
      }

      return {
        icon : {
          path: google.maps.SymbolPath.CIRCLE,
              fillColor: color,
              fillOpacity: .5,
              scale: 1.7*magnitude,
              strokeColor: strokeColor,
              strokeWeight: .5
        },
        visible: true
      };
    });
  }
  
  private static addBoundsListener () {
      google.maps.event.addListener(MapPage.map, 'bounds_changed', function() {
          try {
              MapPage.currentBounds = MapPage.map.getBounds();
              console.log(MapPage.currentBounds);
          } catch( err ) {
              alert( err );
          }
      });
  }
    
  private static createDynamicLatLngBounds(){
    var dynamicBounds = JSON.stringify(MapPage.currentBounds);
    MapPage.fittingBounds =JSON.parse(dynamicBounds);
    var ne = new google.maps.LatLng(MapPage.fittingBounds.north, MapPage.fittingBounds.east);
    var sw = new google.maps.LatLng(MapPage.fittingBounds.south, MapPage.fittingBounds.west);
    return new google.maps.LatLngBounds(sw, ne);
  }
  
  private static fitBounds(){
      var ne = new google.maps.LatLng(MapPage.NORTH, MapPage.EAST);
      var sw = new google.maps.LatLng(MapPage.SOUTH, MapPage.WEST);
      var bounds = new google.maps.LatLngBounds(sw, ne);
      MapPage.map.fitBounds(bounds);
      MapPage.map.setZoom(MapPage.map.getZoom()+1);
      MapPage.drawRectangle(bounds);
  }
  
  private static drawRectangle(bounds:any){
    if(!MapPage.rectangle){
      MapPage.rectangle = new google.maps.Rectangle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.4,
            strokeWeight: 1,
            fillOpacity: 0,
            map: MapPage.map,
            bounds: bounds
          });
    }else{
      MapPage.rectangle.setBounds(bounds);
    }
  }

    private static setBounds(){
      if(MapPage.currentBounds){
        MapPage.drawRectangle(MapPage.createDynamicLatLngBounds());
      }
      MapPage.refreshData(false);
    }
  
      private static CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.style.marginRight = '10px';
        controlUI.style.marginBottom = '0px';
        controlUI.style.width = '28px';
        controlUI.style.height = '28px';
        controlUI.style.opacity = '0.9'
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '25px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = '<ion-icon name="refresh-circle"></ion-icon>';
        controlUI.appendChild(controlText);

        controlUI.addEventListener('click', function() {
          MapPage.setBounds();
          MapPage.refreshData(false);
        });

      }
  
}
