import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StoreRouteService } from '../shared/route-store.service';
import { SearchRoute } from '../shared/gmap/marker';

@Component({
    selector: 'rt-historyroutes',
    templateUrl: './history-route.component.html',
    styleUrls: ['./history-route.component.css']
})
export class HistoryRoutes implements OnInit, OnDestroy {
    
    private historyRoutes: SearchRoute[] = [];
    private routesSubscription: Subscription;
    
    constructor(private storeRouteService: StoreRouteService) { }
    
    ngOnInit() {
        this.historyRoutes = this.storeRouteService.initRouteCollection();
        this.routesSubscription = this.storeRouteService.routeCollectionChanged.subscribe((data: SearchRoute[]) => {
        this.historyRoutes = data;
        });
    }

    private removeRoute(index: number): void {
        this.storeRouteService.removeRouteFromStorage(index);
    }

    ngOnDestroy() {
        this.routesSubscription.unsubscribe();0
    }


}