import { Component, OnInit, OnChanges } from '@angular/core';
import { NgClass } from '@angular/common';

import { MapsAPILoader } from '@agm/core';

import { SearchRouteService } from '../route-search.service';
import { SearchRoute, Marker } from './marker';

@Component({
    selector: 'rt-mygmap',
    templateUrl: './gmap.component.html',
    styleUrls: ['./gmap.component.css']
})
export class MyGmap implements OnInit {

    private zoom: number;//Initial Map Zoom
    private lat: number;//Initial Latitude Cordinate
    private lng: number;//Initail Longitude Cordinate
    private route: SearchRoute;
    private startMarker: Marker;
    private destMarker: Marker;
    private distance:string;
    private duration:string;

    constructor(private mapsAPILoader: MapsAPILoader, private searchRouteService: SearchRouteService) { }

    ngOnInit() {
        this.initMap();
        this.searchRouteService.routeChanged.subscribe((data: any) => {
            console.log(data);
            this.setMapMarkers(this.searchRouteService.route);
            this.setMapParams(this.startMarker)
        });

    }
    private initMap(): void {
        console.log(this.searchRouteService.route);
        if (this.searchRouteService.route !== null) {
            this.setMapMarkers(this.searchRouteService.route);
            this.setMapParams(this.startMarker)
        }
        else {
            this.setMapParams();
        }
    }

    setMapParams(targetArea?: Marker) {
        if (targetArea !== null && targetArea !== undefined) {
            this.zoom = 8;
            this.lat = targetArea.latitude
            this.lng = targetArea.longitude
        }
        else {
            this.zoom = 10;
            this.lat = 51.678418;
            this.lng = 7.809007;
        }
    }

    setMapMarkers(route: SearchRoute) {
        if (route===undefined||route===null){return}
        this.route = route;
        this.startMarker = this.route.getStartLocation();
        this.destMarker = this.route.getDestLocation();
        console.log(this.startMarker);
        console.log(this.destMarker);
        this.getMatrixData();
    }

    getMatrixData() {
        let matrixData = new google.maps.DistanceMatrixService();
        console.log("Tu sam");
        matrixData.getDistanceMatrix(
            {
                origins: [this.createOrign(this.startMarker)],
                destinations: [this.destMarker.title],
                travelMode: google.maps.TravelMode.DRIVING
            }, (response, status) => { this.storeMatrixData(response, status); }
        )
    }
    createOrign(marker: Marker): google.maps.LatLng {
        return new google.maps.LatLng(marker.latitude, marker.longitude);
    }
    storeMatrixData(response?: any, status?:any) {
        if (status === 'OK') {
            console.log(response);
            let origins = response.originAddresses;
             for (var i = 0; i < origins.length; i++) {
                let results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    let element = results[j];
                    this.distance = element.distance.text;
                    this.duration = element.duration.text;
                    }
                    if(parseFloat(this.distance)>200){this.zoom=6;}else{this.zoom=10;}
            }
        }
    }


}