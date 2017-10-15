//Angular Core Components
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

//Angular Google Map Module
import { AgmCoreModule } from '@agm/core'; 

//Aplication Components
import { AppComponent } from './app.component';
import { MyGmap } from './shared/gmap/gmap.component';
import { NewRoute } from './newroute/new-route.component';

//Services
import {SearchRouteService} from './shared/route-search.service';
import {StoreRouteService} from './shared/route-store.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAHnlTiwxld7TbsNtEWGBoPtvnlT4Atpwg',
      libraries:["places"]}),
  ],
  declarations: [
    AppComponent,
    MyGmap,
    NewRoute,
  ],
  providers:[
    SearchRouteService,
    StoreRouteService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }