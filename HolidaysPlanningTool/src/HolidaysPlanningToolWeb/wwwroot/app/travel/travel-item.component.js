"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var router_1 = require("angular2/router");
var TravelItemAuthorComponent = (function () {
    function TravelItemAuthorComponent() {
    }
    TravelItemAuthorComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], TravelItemAuthorComponent.prototype, "author", void 0);
    __decorate([
        core_1.Input()
    ], TravelItemAuthorComponent.prototype, "title", void 0);
    TravelItemAuthorComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-item-author',
            // Location of the template for this component
            // templateUrl: './app/travel/travel-item.component.html',
            template: "<div class=\"travel-item-details\">\n        <img src=\"{{author.ImageUrl}}\" alt=\"\" class=\"author-icon\">\n        <div class=\"travel-item-details\">\n            <div class=\"travel-item-name\">{{title}}</div>\n            <div>Autorius: {{author.Name}}</div>\n            <!--<travel-cities-item [travel]=\"travel\"></travel-cities-item>-->\n        </div>\n    </div>",
            directives: []
        })
    ], TravelItemAuthorComponent);
    return TravelItemAuthorComponent;
}());
exports.TravelItemAuthorComponent = TravelItemAuthorComponent;
var TravelCitiesItemComponent = (function () {
    function TravelCitiesItemComponent() {
        this.couneter = 0;
        this.cities = [];
    }
    TravelCitiesItemComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], TravelCitiesItemComponent.prototype, "travel", void 0);
    TravelCitiesItemComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-cities-item',
            // Location of the template for this component
            template: "<div class=\"travel-item-cities\"></div>",
            directives: []
        })
    ], TravelCitiesItemComponent);
    return TravelCitiesItemComponent;
}());
exports.TravelCitiesItemComponent = TravelCitiesItemComponent;
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
            directives: [router_1.RouterLink, TravelCitiesItemComponent, TravelItemAuthorComponent]
        })
    ], TravelItemComponent);
    return TravelItemComponent;
}());
exports.TravelItemComponent = TravelItemComponent;
//# sourceMappingURL=travel-item.component.js.map