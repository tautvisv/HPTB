"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var router_1 = require("angular2/router");
var TravelItemComponent = (function () {
    function TravelItemComponent() {
    }
    TravelItemComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], TravelItemComponent.prototype, "travel", void 0);
    TravelItemComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-item',
            // Location of the template for this component
            templateUrl: './app/travel/travel-item.component.html',
            directives: [router_1.RouterLink]
        })
    ], TravelItemComponent);
    return TravelItemComponent;
}());
exports.TravelItemComponent = TravelItemComponent;
//# sourceMappingURL=travel-item.component.js.map