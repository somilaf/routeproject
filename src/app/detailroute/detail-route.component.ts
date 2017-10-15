import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SearchRoute } from '../shared/gmap/marker';
import { SearchRouteService } from '../shared/route-search.service';
import { StoreRouteService } from '../shared/route-store.service';
@Component({
    selector: 'rt-detailroute',
    templateUrl: './detail-route.component.html',
    styleUrls: ['./detail-route.component.css']
})
export class DetailRoute implements OnInit {
    private selectedRouteIndex: number;
    constructor(private searchRouteService: SearchRouteService,
                private storeRouterService:StoreRouteService,
                private activatedRoute:ActivatedRoute) { }
   
   
    ngOnInit() {
        this.activatedRoute.params.subscribe((params:Params)=>{
            if (params['index']!==undefined){
            this.selectedRouteIndex=parseInt(params['index']);
            this.searchRouteService.setRoute(this.storeRouterService.routeColllection[this.selectedRouteIndex]);
            }
        });
    }
}