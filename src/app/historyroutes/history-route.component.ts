import { Component, OnInit,} from '@angular/core';

import {StoreRouteService} from '../shared/route-store.service';
import {SearchRoute} from '../shared/gmap/marker';

@Component({
    selector: 'rt-historyroutes',
    templateUrl: './history-route.component.html',
    styleUrls: ['./history-route.component.css']
})
export class HistoryRoutes implements OnInit {
    private historyRoutes:SearchRoute[]=[];
    constructor (private storeRouteService:StoreRouteService){}
    ngOnInit(){
    this.historyRoutes=this.storeRouteService.initRouteCollection();
      this.storeRouteService.routeCollectionChanged.subscribe((data:SearchRoute[])=>{
          console.log(data);
          this.historyRoutes=data;
      });
    }
    private removeRoute(index:number):void{
         this.storeRouteService.removeRouteFromStorage(index);
    }

    
}