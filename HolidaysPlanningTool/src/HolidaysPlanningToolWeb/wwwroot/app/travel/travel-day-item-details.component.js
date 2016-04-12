"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelClass_1 = require("./TravelClass");
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var GoogleMap_1 = require("./maps/GoogleMap");
var TravelDayDetailsComponent = (function () {
    function TravelDayDetailsComponent(map, travelMethods) {
        this.map = map;
        this.travelMethods = travelMethods;
        this.travel = new TravelClass_1.TravelClass();
    }
    TravelDayDetailsComponent.prototype.reinitialise = function () {
        google.maps.event.trigger(this.map.getMap(), 'resize');
        this.recalculateRoute();
    };
    TravelDayDetailsComponent.prototype.recalculateRoute = function () {
        if (this.travel && this.travel.Point)
            this.map.setView(this.centerPoint);
        else
            console.error("Nėra taško!!!");
        if (this.travel.TravelDays.length)
            var first = this.travelMethods.convertPointToDirectionsWaypoint(this.travel.TravelDays[0].Point);
        if (this.travel.TravelDays.length > 1)
            var last = this.travelMethods.convertPointToDirectionsWaypoint(this.travel.TravelDays[this.travel.TravelDays.length - 1].Point);
        var waypoints = this.travelMethods.convertILocationPointsToDirectionsWaypoint(this.travel.TravelDays);
        this.map.setWayPoints(first, last, waypoints);
    };
    TravelDayDetailsComponent.prototype.openModal = function (travel, point) {
        if (!point)
            throw "travel-day-item.component point must be set!";
        this.centerPoint = new google.maps.LatLng(point.Latitude, point.Longitude);
        this.travel = travel;
        console.log("new travel:", this.travel);
        this.selectedDay = null;
        this.modal.open('lg');
        //
        setTimeout(this.reinitialise.bind(this), 1000);
    };
    TravelDayDetailsComponent.prototype.closeModal = function () {
    };
    TravelDayDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.map.initialise("travel_day_map");
        var clicks = {
            click: function (homePoint, endPoint, waypoints, index, coords, address) {
                _this.travel.TravelDays.push(new TravelClass_1.TravelDayPlan(new TravelClass_1.Point(coords.lat(), coords.lng())));
                _this.recalculateRoute();
                /*this._notificationService.warning("click" + this.travel.wayPoints.length);
                this.zone.run(() => {
                    console.log('Updated List: ');
                });*/
            },
            dragged: function (homePoint, endPoint, waypoints, index, coords, address) {
                var newPoint = new TravelClass_1.Point(coords.lat(), coords.lng());
                newPoint.Address = address;
                if (index === -2) {
                    _this.travel.TravelDays[0].Point = newPoint;
                }
                else if (index === -3) {
                    _this.travel.TravelDays[_this.travel.TravelDays.length - 1].Point = newPoint;
                }
                else {
                    _this.travel.TravelDays[index + 1].Point = newPoint;
                }
            },
            rightClick: function (index) {
                if (index === -2) {
                    _this.travel.TravelDays.shift();
                }
                else if (index === -3) {
                    _this.travel.TravelDays.pop();
                }
                else {
                    _this.travel.TravelDays.splice(index + 1, 1);
                }
            }
        };
        this.map.setCallBacks(clicks);
    };
    __decorate([
        core_1.ViewChild('myModal')
    ], TravelDayDetailsComponent.prototype, "modal", void 0);
    TravelDayDetailsComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-day-details-modal',
            // Location of the template for this component
            templateUrl: './app/travel/travel-day-item-details.component.html',
            providers: [GoogleMap_1.GoogleMaps, TravelClass_1.TravelMethodsHelper],
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES]
        })
    ], TravelDayDetailsComponent);
    return TravelDayDetailsComponent;
}());
exports.TravelDayDetailsComponent = TravelDayDetailsComponent;
//# sourceMappingURL=travel-day-item-details.component.js.map