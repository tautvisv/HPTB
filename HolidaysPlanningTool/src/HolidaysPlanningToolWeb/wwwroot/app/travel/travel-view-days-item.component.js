"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var travel_view_day_point_component_1 = require('./travel-view-day-point.component');
var TravelViewDaysItemComponent = (function () {
    function TravelViewDaysItemComponent() {
    }
    __decorate([
        core_1.Input("travel-day")
    ], TravelViewDaysItemComponent.prototype, "travelDay", void 0);
    TravelViewDaysItemComponent = __decorate([
        core_1.Component({
            selector: 'travel-days-item',
            templateUrl: './app/travel/travel-view-days-item.component.html',
            providers: [],
            directives: [travel_view_day_point_component_1.TravelViewDayPointComponent]
        })
    ], TravelViewDaysItemComponent);
    return TravelViewDaysItemComponent;
}());
exports.TravelViewDaysItemComponent = TravelViewDaysItemComponent;
//# sourceMappingURL=travel-view-days-item.component.js.map