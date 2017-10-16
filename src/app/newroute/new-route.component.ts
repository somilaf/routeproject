import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from "@angular/router";

import { MapsAPILoader } from '@agm/core';
import { AgmMarker } from '@agm/core';
import { } from 'googlemaps';

import { SearchRouteService } from '../shared/route-search.service';
import { StoreRouteService } from '../shared/route-store.service';
@Component({
    selector: 'rt-newroute',
    templateUrl: './new-route.component.html',
    styleUrls: ['./new-route.component.css']
})
export class NewRoute implements OnInit {
    @ViewChild('startingLocationInput') startingLocationInput: ElementRef;
    @ViewChild('destinationLocationInput') destinationLocationInput: ElementRef;
    private autocomplitestart: google.maps.places.Autocomplete;
    private autocomplitedest: google.maps.places.Autocomplete;
    public destenationLocation: string;
    private error: boolean = false;
    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private searchRouteService: SearchRouteService,
        private storeRouteService: StoreRouteService,
        private router: Router
    ) { }

    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            this.autocomplitestart = new google.maps.places.Autocomplete(this.startingLocationInput.nativeElement,
                { types: [] });
            this.autocomplitedest = new google.maps.places.Autocomplete(this.destinationLocationInput.nativeElement,
                { types: [] });
            this.autocomplitestart.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    this.fillInAddress(this.autocomplitestart, this.searchRouteService.routeType.start);
                });
            })
            this.autocomplitedest.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    this.fillInAddress(this.autocomplitedest, this.searchRouteService.routeType.dest);
                });
            })
        });
    }

    private fillInAddress(ac: google.maps.places.Autocomplete, locationType: string): void {
        let place: google.maps.places.PlaceResult = ac.getPlace();
        //verify result
        if (place.geometry === undefined || place.geometry === null) { alert("Unos nije korektan"); return; }
        this.searchRouteService.goToNewRoute(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address, locationType);
    }

    private submitNewRoute() {
        if (this.searchRouteService.route === null) { this.error = true; return; }
        if (!this.searchRouteService.route.checkeRoute()) { this.error = true; return; };
        this.error = false;
        this.storeRouteService.addRouteToStorage(this.searchRouteService.route);
        this.router.url !== "/details" ? this.router.navigate(['details']) : this.searchRouteService.emitRoute();

    }
}