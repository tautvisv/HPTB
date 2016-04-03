import {provide} from 'angular2/core';
import {Component, OnInit } from 'angular2/core';
import {GoogleMaps, RouteService, MapClickCallbacks} from "./maps/GoogleMap";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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