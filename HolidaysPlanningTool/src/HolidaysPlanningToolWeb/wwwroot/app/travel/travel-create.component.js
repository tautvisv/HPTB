"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var travel_map_component_1 = require('./travel-map.component');
var TravelComponent = (function () {
    function TravelComponent(_notificationService, router) {
        this._notificationService = _notificationService;
        this.router = router;
    }
    TravelComponent.prototype.saveSettings = function () {
    };
    TravelComponent.prototype.cancelSettings = function () {
        this._notificationService.info("nustatymai neišsaugoti");
    };
    TravelComponent.prototype.ngOnInit = function () {
    };
    TravelComponent = __decorate([
        core_1.Component({
            selector: 'travel',
            templateUrl: './app/travel/travel-create.component.html',
            directives: [travel_map_component_1.TravelMapComponent],
            providers: []
        })
    ], TravelComponent);
    return TravelComponent;
}());
exports.TravelComponent = TravelComponent;
//# sourceMappingURL=travel-create.component.js.map