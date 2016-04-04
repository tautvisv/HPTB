import {provide} from 'angular2/core';
import {Component, OnInit } from 'angular2/core';
import {GoogleMaps, RouteService, MapClickCallbacks} from "./maps/GoogleMap";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FullTravel, TravelClass } from "./TravelClass";

//, provide(google.maps.MapOptions, { useValue: {} })
@Component({
    selector: 'travel-map',
    templateUrl: './app/travel/travel-map.component.html',
    directives: [],
    providers: [GoogleMaps],//, GoogleMaps, RouteService, provide(google.maps.Map, { useValue: new A().mapObj })],
    styles: []
})
export class TravelMapComponent implements OnInit {
    // google maps zoom level
    zoom: number = 8;
   // public map: GoogleMaps;
    constructor(private notificationService: ToastsManager, public map: GoogleMaps) {
    }
    public setMapClicks(clicks: MapClickCallbacks) {
       this. map.setCallBacks(clicks);
    }
    public setWaypoints(travel: FullTravel) {
        var list: google.maps.DirectionsWaypoint[] = [];
        travel.wayPoints.forEach( (day) => {
            list.push(this.travelToWaypoint(day));
        });
        this.map.setWayPoints(this.travelToWaypoint(travel.startDay), this.travelToWaypoint(travel.endDay), list); //, travel.endDay, []);
    }
    private travelToWaypoint(travel: TravelClass, stopover: boolean = false): google.maps.DirectionsWaypoint {
        return {
            location: new google.maps.LatLng(travel.Point.Latitude, travel.Point.Longitude),
            stopover: stopover
        }
    }
    ngOnInit() {

        this.map.initialise();
        //var mapContainer = document.getElementById("the_map");
        //var mapObj = new google.maps.Map(mapContainer, {
        //    zoom: 8,
        //    center: new google.maps.LatLng(54.8985049, 23.9578067),
        //});

        //this.map = new GoogleMaps(mapObj, new RouteService(mapObj), this.notificationService);

        //var clicks = {
        //    click: (coords: google.maps.LatLng) => { },
        //    dragged: (coords: google.maps.LatLng, index: number) => { },
        //    rightClick: (index: number) => { }
        //};
        //map.setWayPoints([null, null, null, null])
    }
    
}