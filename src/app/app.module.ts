import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

//Angular Google Map Module
import { AgmCoreModule } from '@agm/core'; 

//Aplication Components
import { AppComponent } from './app.component';
import { MyGmap } from './shared/gmap/gmap.component';
 
@NgModule({
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAHnlTiwxld7TbsNtEWGBoPtvnlT4Atpwg',
      libraries:["places"]}),
  ],
  declarations: [
    AppComponent,
    MyGmap
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }