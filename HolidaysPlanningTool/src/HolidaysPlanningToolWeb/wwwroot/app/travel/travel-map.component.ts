import {Component, OnInit } from 'angular2/core';
import {GoogleMaps, RouteService} from "./maps/GoogleMap";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'travel-map',
    templateUrl: './app/travel/travel-map.component.html',
    directives: [],
    providers: [],
    styles: []
})
export class TravelMapComponent implements OnInit {
    // google maps zoom level
    zoom: number = 8;
    constructor(private notificationService: ToastsManager) {
    }
    ngOnInit() {

        var mapContainer = document.getElementById("the_map");
        var mapObj = new google.maps.Map(mapContainer, {
            zoom: 8,
            center: new google.maps.LatLng(54.8985049, 23.9578067),
        });

        var map = new GoogleMaps(mapObj, new RouteService(mapObj), this.notificationService);
    }
    
}