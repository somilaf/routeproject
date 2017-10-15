import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {HistoryRoutes} from "./historyroutes/history-route.component";

const routes:Routes=[
    {path:'',component:HistoryRoutes},

];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}