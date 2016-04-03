"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelDayComponent = (function () {
    function TravelDayComponent() {
    }
    TravelDayComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], TravelDayComponent.prototype, "travel", void 0);
    __decorate([
        core_1.Input()
    ], TravelDayComponent.prototype, "title", void 0);
    TravelDayComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-day-item-component',
            // Location of the template for this component
            templateUrl: './app/travel/travel-day-item component.html',
            directives: []
        })
    ], TravelDayComponent);
    return TravelDayComponent;
}());
exports.TravelDayComponent = TravelDayComponent;
//# sourceMappingURL=travel-day-item.component.js.map