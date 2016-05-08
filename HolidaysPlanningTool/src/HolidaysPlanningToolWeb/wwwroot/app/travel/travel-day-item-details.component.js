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
var TravelDayDetailsEditComponent = (function () {
    function TravelDayDetailsEditComponent(myElement) {
        this.myElement = myElement;
        this.pointChanged = new core_1.EventEmitter();
        this.isVisible = true;
    }
    TravelDayDetailsEditComponent.prototype.ngOnChanges = function (changeRecord) {
        if (!changeRecord.selectedDay.currentValue) {
            this.selectedDay = new TravelClass_1.TravelDayPlan(null);
            this.isVisible = false;
            return;
        }
        this.isVisible = true;
    };
    TravelDayDetailsEditComponent.prototype.ngAfterViewInit = function () {
        var input = $(this.myElement.nativeElement).find("#day_point_address")[0]; // < HTMLInputElement > document.getElementById('point_address');
        this.autocomplete = new google.maps.places.Autocomplete(input);
        var that = this;
        this.autocomplete.addListener('place_changed', function () {
            var place = that.autocomplete.getPlace();
            console.log("pasirinkta vieta modale", input.value);
            if (!place.geometry) {
                console.error("vietove nerasta: ", input.value);
                return;
            }
            that.selectedDay.Point.Address = input.value;
            that.selectedDay.Point.Latitude = place.geometry.location.lat();
            that.selectedDay.Point.Longitude = place.geometry.location.lng();
            that.pointChanged.emit(null);
            //that.todoService.itemAdded$.emit(that.travel.Point);
            // this.itemAdded$.emit(item);
        });
    };
    TravelDayDetailsEditComponent.prototype.ngOnDestroy = function () {
        google.maps.event.trigger(this.autocomplete, 'remove', true);
    };
    __decorate([
        core_1.Output()
    ], TravelDayDetailsEditComponent.prototype, "pointChanged", void 0);
    __decorate([
        core_1.Input("selectedDay")
    ], TravelDayDetailsEditComponent.prototype, "selectedDay", void 0);
    TravelDayDetailsEditComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-day-details-edit-modal',
            // Location of the template for this component
            //templateUrl: './app/travel/travel-day-item-details.component.html',
            template: "<div *ngIf=\"isVisible\">\n                <div class=\"form-group label-floating col-md-4\">\n                    <label for=\"travel_day_name\" class=\"control-label\">Pavadinimas</label>\n                    <input type=\"text\" [(ngModel)]=\"selectedDay.Name\" id=\"travel_day_name\" class=\"form-control\" />\n                </div>\n                <div class=\"form-group label-floating col-md-4\">\n                    <label for=\"duration\" class=\"control-label\">Trukm\u0117:</label>\n                    <input type=\"time\" [(ngModel)]=\"selectedDay.Duration\" id=\"duration\" class=\"form-control\" />\n                </div>\n                <div class=\"form-group label-floating col-md-4\">\n                    <label for=\"date_s\" class=\"control-label\">Data:</label>\n                    <input type=\"datetime-local\" [(ngModel)]=\"selectedDay.Date\" id=\"date_s\" class=\"form-control\" />\n                </div>\n                <div class=\"form-group label-floating col-md-4\" *ngIf=\"selectedDay.Point\">\n                    <label for=\"day_point_address\" class=\"control-label\">Adresas:</label>\n                    <input type=\"text\" [(ngModel)]=\"selectedDay.Point.Address\" id=\"day_point_address\" class=\"form-control\" />\n                </div>\n                <div class=\"form-group label-floating col-md-12\">\n                    <label for=\"desc_i\" class=\"control-label\">Apra\u0161ymas:</label>\n                    <textarea rows=\"3\" type=\"text\" [(ngModel)]=\"selectedDay.Description\" id=\"desc_i\" class=\"form-control\"></textarea>\n                </div>\n            </div>",
            providers: [],
            directives: []
        })
    ], TravelDayDetailsEditComponent);
    return TravelDayDetailsEditComponent;
}());
exports.TravelDayDetailsEditComponent = TravelDayDetailsEditComponent;
var TravelDayDetailsComponent = (function () {
    function TravelDayDetailsComponent(map, travelMethods) {
        this.map = map;
        this.travelMethods = travelMethods;
        this.travel = new TravelClass_1.TravelClass();
    }
    TravelDayDetailsComponent.prototype.abc = function (selectedDay) {
        console.log(selectedDay);
    };
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
        this.map.setOptimizeRoute(true);
        var clicks = {
            click: function (homePoint, endPoint, waypoints, index, coords, address) {
                var point = new TravelClass_1.Point(coords.lat(), coords.lng());
                point.Address = address;
                _this.travel.TravelDays.push(new TravelClass_1.TravelDayPlan(point));
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
                    _this.travel.TravelDays[0].Point.Address = address;
                    _this.travel.TravelDays[0].Point.Latitude = newPoint.Latitude;
                    _this.travel.TravelDays[0].Point.Longitude = newPoint.Longitude;
                }
                else if (index === -3) {
                    _this.travel.TravelDays[_this.travel.TravelDays.length - 1].Point.Address = address;
                    _this.travel.TravelDays[_this.travel.TravelDays.length - 1].Point.Latitude = newPoint.Latitude;
                    _this.travel.TravelDays[_this.travel.TravelDays.length - 1].Point.Longitude = newPoint.Longitude;
                }
                else {
                    _this.travel.TravelDays[index + 1].Point.Address = address;
                    _this.travel.TravelDays[index + 1].Point.Latitude = newPoint.Latitude;
                    _this.travel.TravelDays[index + 1].Point.Longitude = newPoint.Longitude;
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
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES, TravelDayDetailsEditComponent]
        })
    ], TravelDayDetailsComponent);
    return TravelDayDetailsComponent;
}());
exports.TravelDayDetailsComponent = TravelDayDetailsComponent;
//# sourceMappingURL=travel-day-item-details.component.js.map