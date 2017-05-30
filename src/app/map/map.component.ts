import { Router } from '@angular/router';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';



declare var google: any;

  @Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styles: [`
      .my-map {
        height: 300px;
      }
    `],
    })
  export class MapComponent implements OnInit {

  radioModel: string = 'Info';
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public searchControl: FormControl;
  public autocomplete: any;
  public resultados: any;
  public city : string;
  @ViewChild("search")
  public searchElementRef: ElementRef;


    constructor(
    private router:  Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) { }

      ngOnInit() {
    //set google maps defaults
    this.latitude = 41.3978604;
    this.longitude = 2.1905049;
    this.city = "Barcelona"
    this.zoom = 14;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
    this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["(cities)"],
    });
    this.findGym();
    this.autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.findGym();
        this.city = place.vicinity
        });
      });
    });
  }
  private findGym() {
  let map = new google.maps.Map(this.searchElementRef.nativeElement);
  let places = new google.maps.places.PlacesService(map);
  var pyrmont = new google.maps.LatLng(this.latitude,this.longitude);
  var search = {
  location: pyrmont,
  radius: 1000,
  type:["gym"]
  };
  var that = this
  places.nearbySearch(search, function(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    that.resultados = results ; console.log("HEEEEEYYYYYYYYYYY",results)
  }});
}

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
      });
    }
  }
}
