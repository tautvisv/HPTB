"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var GoogleMap_1 = require("./maps/GoogleMap");
var TravelClass_1 = require("./TravelClass");
//, provide(google.maps.MapOptions, { useValue: {} })
var TravelMapComponent = (function () {
    // public map: GoogleMaps;
    function TravelMapComponent(notificationService, travelMethods, map) {
        this.notificationService = notificationService;
        this.travelMethods = travelMethods;
        this.map = map;
        // google maps zoom level
        this.zoom = 8;
    }
    TravelMapComponent.prototype.setMapClicks = function (clicks) {
        this.map.setCallBacks(clicks);
    };
    TravelMapComponent.prototype.setWaypoints = function (travel) {
        var _this = this;
        var list = [];
        travel.WayPoints.forEach(function (day) {
            list.push(_this.travelMethods.convertPointToDirectionsWaypoint(day.Point));
        });
        this.map.setWayPoints(this.travelMethods.convertPointToDirectionsWaypoint(travel.StartDay.Point), this.travelMethods.convertPointToDirectionsWaypoint(travel.EndDay.Point), list); //, travel.endDay, []);
    };
    //private travelToWaypoint(travel: TravelClass, stopover: boolean = false): google.maps.DirectionsWaypoint {
    //    return {
    //        location: new google.maps.LatLng(travel.Point.Latitude, travel.Point.Longitude),
    //        stopover: stopover
    //    }
    //}
    TravelMapComponent.prototype.ngOnInit = function () {
        this.map.initialise("the_map");
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
    };
    TravelMapComponent = __decorate([
        core_1.Component({
            selector: 'travel-map',
            templateUrl: './app/travel/travel-map.component.html',
            directives: [],
            providers: [GoogleMap_1.GoogleMaps, TravelClass_1.TravelMethodsHelper],
            styles: []
        })
    ], TravelMapComponent);
    return TravelMapComponent;
}());
exports.TravelMapComponent = TravelMapComponent;
//# sourceMappingURL=travel-map.component.js.map