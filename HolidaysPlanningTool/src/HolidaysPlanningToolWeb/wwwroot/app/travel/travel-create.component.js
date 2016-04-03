"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var travel_map_component_1 = require('./travel-map.component');
var travel_day_item_component_1 = require('./travel-day-item.component');
var TravelClass_1 = require("./TravelClass");
//import {Accordion} from 'primeng/primeng';
var TravelComponent = (function () {
    function TravelComponent(_notificationService, router) {
        this._notificationService = _notificationService;
        this.router = router;
        this.travelHome = new TravelClass_1.TravelClass(new TravelClass_1.Point());
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    TravelComponent.prototype.onChanges = function (changes) {
        console.log("pasikeit4 compoennt create", changes);
    };
    TravelComponent.prototype.saveTravel = function () {
        this._notificationService.success("Kelionė išsaugota");
    };
    TravelComponent.prototype.cancelTravel = function () {
        this._notificationService.info("nustatymai neišsaugoti");
    };
    TravelComponent.prototype.ngOnInit = function () {
        this.travels = [];
        this.travelHome.Name = "Namai";
    };
    TravelComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._notificationService.warning("vaikas sukurtas");
        var clicks = {
            click: function (homePoint, endPoint, waypoints, index, coords, address) {
                if (index === -2) {
                    _this.travelHome.Point = new TravelClass_1.Point(coords.lat(), coords.lng());
                    _this.travelHome.Point.Address = address;
                }
                else {
                    var travelDay = new TravelClass_1.TravelClass(new TravelClass_1.Point(coords.lat(), coords.lng()));
                    travelDay.Point.Address = address;
                    _this.travels.push(travelDay);
                }
                _this._notificationService.warning("click" + _this.travels.length);
                _this.zone.run(function () {
                    console.log('Updated List: ');
                });
            },
            dragged: function (coords, index) { _this._notificationService.warning("drag"); },
            rightClick: function (index) { _this._notificationService.warning("right"); }
        };
        this.mapComponent.setMapClicks(clicks);
    };
    __decorate([
        core_1.ViewChild(travel_map_component_1.TravelMapComponent)
    ], TravelComponent.prototype, "mapComponent", void 0);
    TravelComponent = __decorate([
        core_1.Component({
            selector: 'travel',
            templateUrl: './app/travel/travel-create.component.html',
            directives: [travel_map_component_1.TravelMapComponent, travel_day_item_component_1.TravelDayComponent],
            providers: []
        })
    ], TravelComponent);
    return TravelComponent;
}());
exports.TravelComponent = TravelComponent;
//# sourceMappingURL=travel-create.component.js.map