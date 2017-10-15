import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SearchRoute, Marker } from './gmap/marker';

@Injectable()
export class StoreRouteService {
    routeCollectionChanged = new Subject<SearchRoute[]>();
    routeColllection: SearchRoute[] = [];
    readStorage() {
        if (localStorage.getItem("routes") === null || localStorage.getItem("routes") === undefined) {
            console.log("There is no history");
        }
    }
    initRouteCollection(): SearchRoute[] {
         if (localStorage !== undefined && localStorage.getItem('routes') !== null) {
            if ( localStorage.getItem('routes').length === 0 ) return [];
            this.routeColllection=[];
            let tmpRoutes = localStorage.getItem('routes');
            for (let route of JSON.parse(tmpRoutes)) {
                this.routeColllection.push(
                    new SearchRoute(
                        new Marker(route['startLocation']['latitude'], route['startLocation']['longitude'],route['startLocation']['title']),
                        new Marker(route['destLocation']['latitude'], route['destLocation']['longitude'],route['startLocation']['title'])
                    ));
            }
        }
        return this.routeColllection;
    }

    addRouteToStorage(route: SearchRoute) {
       this.routeColllection.push(route);
       this.updateStorageInfo(this.routeColllection);
    }

    updateStorageInfo(routes:SearchRoute[]){
        if (localStorage !== undefined) {
            localStorage.removeItem('routes');
            localStorage.setItem('routes', JSON.stringify(this.routeColllection));
        }
    }

    removeRouteFromStorage(index: number) {
        this.routeColllection.splice(index, 1);
        this.updateStorageInfo(this.routeColllection);
        this.routeCollectionChanged.next(
            this.routeColllection
        );
    }

}