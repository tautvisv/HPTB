"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var travel_view_days_item_component_1 = require('./travel-view-days-item.component');
var TravelViewDaysContainerComponent = (function () {
    function TravelViewDaysContainerComponent() {
        this.showRouteFunction = new core_1.EventEmitter();
    }
    TravelViewDaysContainerComponent.prototype.findRoute = function (travel) {
        this.showRouteFunction.emit(travel.TravelDays);
    };
    TravelViewDaysContainerComponent.prototype.scrollDetails = function (right) {
        var scroll = right ? 300 : -300;
        this.itemsContainer.scrollLeft += scroll;
    };
    TravelViewDaysContainerComponent.prototype.ngOnInit = function () {
        this.itemsContainer = document.getElementById("travel_days_details");
    };
    __decorate([
        core_1.Output("show-route")
    ], TravelViewDaysContainerComponent.prototype, "showRouteFunction", void 0);
    __decorate([
        core_1.Input("days")
    ], TravelViewDaysContainerComponent.prototype, "days", void 0);
    TravelViewDaysContainerComponent = __decorate([
        core_1.Component({
            selector: 'travel-days-container',
            templateUrl: './app/travel/travel-view-days-container.component.html',
            providers: [],
            directives: [travel_view_days_item_component_1.TravelViewDaysItemComponent]
        })
    ], TravelViewDaysContainerComponent);
    return TravelViewDaysContainerComponent;
}());
exports.TravelViewDaysContainerComponent = TravelViewDaysContainerComponent;
//# sourceMappingURL=travel-view-days-container.component.js.map