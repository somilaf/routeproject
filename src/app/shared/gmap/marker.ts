
export class Marker{
     latitude: number;
     longitude: number;
     title?: string;
     label?: string; 
     constructor(lat:number,long:number,title?:string,label?:string){
         this.latitude=lat;
         this.longitude=long;
         this.label=label;
         this.title=title;
     }
     
}

export class SearchRoute{
    private startLocation:Marker;
    private destLocation:Marker;
    constructor(start?:Marker,dest?:Marker)
    {
        this.startLocation=start;
        this.destLocation=dest;
    }
    public startLocationSet(marker:Marker){
        this.startLocation=marker;
    }
    public destLocationSet(marker:Marker){
        this.destLocation=marker;
    }
    public getStartLocation():Marker{
        return this.startLocation;
    }
    public getDestLocation():Marker{
        return this.destLocation;
    }
}