import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Marker,SearchRoute } from './gmap/marker';

@Injectable()
export class SearchRouteService {
   readonly routeType={start:"START",dest:"DEST"}
    routeChanged = new Subject<SearchRoute>();
    route: SearchRoute=null;


    setRoute(route:SearchRoute){
        this.route=route;
        this.routeChanged.next(this.route);
    }

    emitRoute(){
        this.routeChanged.next(this.route);
    }

    goToNewRoute(lat: number, lng: number,title:string, type:string) {
        this.route===null||this.route===undefined?this.route=new SearchRoute():false;
        if(type===this.routeType.start){
            this.route.startLocationSet(new Marker(lat,lng,title));
        }
        if (type === this.routeType.dest){
            this.route.destLocationSet(new Marker(lat,lng,title));
        }
        console.log(this.route);
    }
}