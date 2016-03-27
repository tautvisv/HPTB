"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var GoogleMap_1 = require("./maps/GoogleMap");
var TravelMapComponent = (function () {
    function TravelMapComponent(notificationService) {
        this.notificationService = notificationService;
        // google maps zoom level
        this.zoom = 8;
    }
    TravelMapComponent.prototype.ngOnInit = function () {
        var mapContainer = document.getElementById("the_map");
        var mapObj = new google.maps.Map(mapContainer, {
            zoom: 8,
            center: new google.maps.LatLng(54.8985049, 23.9578067),
        });
        var map = new GoogleMap_1.GoogleMaps(mapObj, new GoogleMap_1.RouteService(mapObj), this.notificationService);
    };
    TravelMapComponent = __decorate([
        core_1.Component({
            selector: 'travel-map',
            templateUrl: './app/travel/travel-map.component.html',
            directives: [],
            providers: [],
            styles: []
        })
    ], TravelMapComponent);
    return TravelMapComponent;
}());
exports.TravelMapComponent = TravelMapComponent;
//# sourceMappingURL=travel-map.component.js.map