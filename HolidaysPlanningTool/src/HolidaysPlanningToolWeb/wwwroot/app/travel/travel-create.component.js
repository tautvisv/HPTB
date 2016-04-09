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
var TravelCreateComponent = (function () {
    function TravelCreateComponent(_notificationService, router, travelService) {
        this._notificationService = _notificationService;
        this.router = router;
        this.travelService = travelService;
        // private travels: TravelClass[];
        //  private travelHome: TravelClass;
        this.travel = new TravelClass_1.FullTravel();
        var p = new TravelClass_1.TravelClass(new TravelClass_1.Point());
        this.travel.startDay = p;
        this.travel.endDay = p;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    ;
    TravelCreateComponent.prototype.setNewTravel = function (travel) {
        this.travel = travel;
        this.mapComponent.setWaypoints(travel);
    };
    TravelCreateComponent.prototype.onChanges = function (changes) {
        console.log("pasikeit4 compoennt create", changes);
    };
    TravelCreateComponent.prototype.saveTravel = function () {
        var _this = this;
        this.travelService.saveTravel(this.travel).subscribe(function () {
            _this._notificationService.success("kelionė sėkmingai išsaugota");
        }, function () {
            _this._notificationService.error("nenumatyta klaida, prane6kite administratoriui");
        });
    };
    TravelCreateComponent.prototype.cancelTravel = function () {
        this._notificationService.info("nustatymai neišsaugoti");
    };
    TravelCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        //  this.travels = [];
        // this.travelHome.Name = "Namai";
        this.travelService.getTravel(20).subscribe(function (response) {
            _this.setNewTravel(response);
        }, function () {
            _this._notificationService.error("nepavyko gauti duomenų");
        });
    };
    TravelCreateComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._notificationService.warning("vaikas sukurtas");
        var clicks = {
            click: function (homePoint, endPoint, waypoints, index, coords, address) {
                if (index === -2) {
                    _this.travel.startDay.Point = new TravelClass_1.Point(coords.lat(), coords.lng());
                    _this.travel.startDay.Point.Address = address;
                }
                else if (index === -3) {
                    _this.travel.endDay.Point = new TravelClass_1.Point(coords.lat(), coords.lng());
                    _this.travel.endDay.Point.Address = address;
                }
                else {
                    var travelDay = new TravelClass_1.TravelClass(new TravelClass_1.Point(coords.lat(), coords.lng()));
                    travelDay.Point.Address = address;
                    _this.travel.wayPoints.push(travelDay);
                }
                _this._notificationService.warning("click" + _this.travel.wayPoints.length);
                _this.zone.run(function () {
                    console.log('Updated List: ');
                });
            },
            dragged: function (homePoint, endPoint, waypoints, index, coords, address) {
                var newPoint = new TravelClass_1.Point(coords.lat(), coords.lng());
                newPoint.Address = address;
                if (index === -2) {
                    _this.travel.startDay.Point = newPoint;
                }
                else if (index === -3) {
                    _this.travel.endDay.Point = newPoint;
                }
                else {
                    _this.travel.wayPoints[index].Point = newPoint;
                }
                _this.zone.run(function () {
                    console.log('Updated List: ');
                });
            },
            rightClick: function (index) {
                _this.travel.wayPoints.splice(index, 1);
                _this._notificationService.warning("right");
                _this.zone.run(function () {
                    console.log('Updated List: ');
                });
            }
        };
        this.mapComponent.setMapClicks(clicks);
    };
    __decorate([
        core_1.ViewChild(travel_map_component_1.TravelMapComponent)
    ], TravelCreateComponent.prototype, "mapComponent", void 0);
    TravelCreateComponent = __decorate([
        core_1.Component({
            selector: 'travel',
            templateUrl: './app/travel/travel-create.component.html',
            directives: [travel_map_component_1.TravelMapComponent, travel_day_item_component_1.TravelDayComponent],
            providers: []
        })
    ], TravelCreateComponent);
    return TravelCreateComponent;
}());
exports.TravelCreateComponent = TravelCreateComponent;
//# sourceMappingURL=travel-create.component.js.map