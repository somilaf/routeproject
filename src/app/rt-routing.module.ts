import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {HistoryRoutes} from "./historyroutes/history-route.component";
import {DetailRoute} from "./detailroute/detail-route.component";

const routes:Routes=[
    {path:'',component:HistoryRoutes},
    {path:'details/:index', component:DetailRoute},
    {path:'details', component:DetailRoute},
    { path: "**", redirectTo:"/", pathMatch: 'full' } 

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