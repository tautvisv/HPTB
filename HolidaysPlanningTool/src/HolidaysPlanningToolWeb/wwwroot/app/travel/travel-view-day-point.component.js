"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelViewDayPointComponent = (function () {
    function TravelViewDayPointComponent() {
    }
    __decorate([
        core_1.Input("point")
    ], TravelViewDayPointComponent.prototype, "point", void 0);
    TravelViewDayPointComponent = __decorate([
        core_1.Component({
            selector: 'travel-day-point',
            templateUrl: './app/travel/travel-view-day-point.component.html',
            providers: [],
            directives: []
        })
    ], TravelViewDayPointComponent);
    return TravelViewDayPointComponent;
}());
exports.TravelViewDayPointComponent = TravelViewDayPointComponent;
//# sourceMappingURL=travel-view-day-point.component.js.map