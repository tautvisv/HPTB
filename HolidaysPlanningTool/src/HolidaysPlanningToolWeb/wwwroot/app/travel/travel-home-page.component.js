"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var travel_list_component_1 = require('./travel-list.component');
var TravelsInformation = (function () {
    function TravelsInformation() {
    }
    return TravelsInformation;
}());
var TravelHomePageComponent = (function () {
    function TravelHomePageComponent(notificationManager, travelService) {
        this.notificationManager = notificationManager;
        this.travelService = travelService;
        this.TravelInformation = new TravelsInformation();
    }
    TravelHomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.travelService.getRecentTravels(5).subscribe(function (travels) {
            _this.TravelInformation.NewTravels = travels;
        }, function () {
            _this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
        });
        this.travelService.getTravels("test").subscribe(function (travels) {
            _this.TravelInformation.TravelList = travels;
        }, function () {
            _this.notificationManager.error("Nepavyko užkrauti kelionių sąrašo");
        });
    };
    TravelHomePageComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-main-component',
            // Location of the template for this component
            templateUrl: './app/travel/travel-home-page.component.html',
            directives: [travel_list_component_1.TravelListComponent]
        })
    ], TravelHomePageComponent);
    return TravelHomePageComponent;
}());
exports.TravelHomePageComponent = TravelHomePageComponent;
//# sourceMappingURL=travel-home-page.component.js.map