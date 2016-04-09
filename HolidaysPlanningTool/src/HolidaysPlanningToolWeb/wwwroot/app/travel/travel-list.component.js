"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var travel_item_component_1 = require('./travel-item.component');
var TravelListComponent = (function () {
    function TravelListComponent() {
    }
    TravelListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], TravelListComponent.prototype, "travels", void 0);
    __decorate([
        core_1.Input()
    ], TravelListComponent.prototype, "title", void 0);
    TravelListComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-list',
            // Location of the template for this component
            templateUrl: './app/travel/travel-list.component.html',
            directives: [travel_item_component_1.TravelItemComponent]
        })
    ], TravelListComponent);
    return TravelListComponent;
}());
exports.TravelListComponent = TravelListComponent;
//# sourceMappingURL=travel-list.component.js.map