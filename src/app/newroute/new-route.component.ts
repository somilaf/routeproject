import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

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
export class NewRoute implements OnInit, OnDestroy {

    @ViewChild('startingLocationInput') startingLocationInput: ElementRef;
    @ViewChild('destinationLocationInput') destinationLocationInput: ElementRef;
    private autocomplitestart: google.maps.places.Autocomplete;
    private autocomplitedest: google.maps.places.Autocomplete;
    public destenationLocation: string;
    private error: boolean = false;
    private routeSubscription: Subscription;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private searchRouteService: SearchRouteService,
        private storeRouteService: StoreRouteService,
        private router: Router
    ) { }

    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            this.setAutoComplite(this.autocomplitedest, this.destinationLocationInput.nativeElement, this.searchRouteService.routeType.start);
            this.setAutoComplite(this.autocomplitestart, this.startingLocationInput.nativeElement, this.searchRouteService.routeType.dest);
        });
        this.routeSubscription = this.searchRouteService.routeChanged.subscribe(() => {
            this.resetForm()
        });
    }

    private resetForm(){
        this.error = false;
        this.startingLocationInput.nativeElement.value = "";
        this.destinationLocationInput.nativeElement.value = "";
    }

    private setAutoComplite(autocomplite: google.maps.places.Autocomplete, input: HTMLInputElement, locationType: string, options?: any) {
        autocomplite = new google.maps.places.Autocomplete(input,
            { types: [] });
        autocomplite.addListener("place_changed", () => {
            this.ngZone.run(() => {
                this.fillInAddress(autocomplite, locationType);
            });
        });
    }

    private fillInAddress(ac: google.maps.places.Autocomplete, locationType: string): void {
        let place: google.maps.places.PlaceResult = ac.getPlace();
        if (place.geometry === undefined || place.geometry === null) { alert("Unos nije korektan"); return; }
        this.searchRouteService.goToNewRoute(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address, locationType);
    }

    private submitNewRoute() {
        if (this.searchRouteService.route === null || this.searchRouteService.route === undefined) { this.error = true; return; }
        if (!this.searchRouteService.route.checkeRoute()) { this.error = true; return; };
        if (this.startingLocationInput.nativeElement.value === "" || this.destinationLocationInput.nativeElement.value === "") { this.error = true; return; }
        this.error = false;
        this.storeRouteService.addRouteToStorage(this.searchRouteService.route);
        this.resetForm();
        this.router.url !== "/details" ? this.router.navigate(['details']) : this.searchRouteService.emitRoute();

    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}