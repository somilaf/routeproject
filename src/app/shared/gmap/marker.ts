
export class Marker{
     latitude: number;
     longitude: number;
     title: string;
     label?: string; 
     constructor(lat:number,long:number,title:string,label?:string){
         this.latitude=lat;
         this.longitude=long;
         this.label=label;
         this.title=title;
     }
     checkMarker():boolean{
         if (this.latitude===undefined) return false;
         if (this.longitude===undefined) return false;
         if (this.title===undefined || this.title==="")return false;
         return true;
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

    checkeRoute():boolean{
        if (this.startLocation===undefined||this.startLocation===null||this.destLocation===undefined||this.destLocation===null)
        {return false;}
        if (!this.startLocation.checkMarker()){return false;};
        if (!this.destLocation.checkMarker()){return false;};
        return true;
    }

}