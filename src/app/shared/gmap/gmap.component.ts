import { Component, OnInit, OnChanges } from '@angular/core';

import { MapsAPILoader } from '@agm/core';



@Component({
    selector: 'rt-mygmap',
    templateUrl: './gmap.component.html',
    styleUrls: ['./gmap.component.css']
})
export class MyGmap implements OnInit {
    private zoom: number;//Initial Map Zoom
    private lat: number;//Initial Latitude Cordinate
    private lng: number;//Initail Longitude Cordinate
    constructor(private mapsAPILoader: MapsAPILoader) { }

    ngOnInit() {
        this.initMap();

    }
    private initMap(): void {
        this.zoom = 10;
        this.lat = 51.678418;
        this.lng = 7.809007;
    }
}