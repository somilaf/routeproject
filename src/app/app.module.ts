//Angular Core Components
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { BrowserModule }  from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

//Angular Google Map Module
import { AgmCoreModule } from '@agm/core'; 

//Aplication Modules
import {AppRoutingModule} from './rt-routing.module';

//Aplication Components
import { AppComponent } from './app.component';
import { MyGmap } from './shared/gmap/gmap.component';
import { NewRoute } from './newroute/new-route.component';
import { HistoryRoutes } from './historyroutes/history-route.component';
import { DetailRoute } from './detailroute/detail-route.component';

//Services
import {SearchRouteService} from './shared/route-search.service';
import {StoreRouteService} from './shared/route-store.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAHnlTiwxld7TbsNtEWGBoPtvnlT4Atpwg',
      libraries:["places"]}),
      AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MyGmap,
    NewRoute,
    HistoryRoutes,
    DetailRoute
  ],
  providers:[
    SearchRouteService,
    StoreRouteService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }