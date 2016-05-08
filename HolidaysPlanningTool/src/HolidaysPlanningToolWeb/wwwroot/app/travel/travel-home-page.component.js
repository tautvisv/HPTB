"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelClass_1 = require("./TravelClass");
var travel_list_component_1 = require('./travel-list.component');
var TravelsInformation = (function () {
    function TravelsInformation() {
    }
    return TravelsInformation;
}());
var TravelsLikedComponent = (function () {
    function TravelsLikedComponent(notificationManager, travelService, routeParams, router) {
        this.notificationManager = notificationManager;
        this.travelService = travelService;
        this.routeParams = routeParams;
        this.router = router;
        this.pagedTravels = new TravelClass_1.Pager();
    }
    TravelsLikedComponent.prototype.ngOnInit = function () {
        var _this = this;
        var page = parseInt(this.routeParams.get("page"));
        var count = parseInt(this.routeParams.get("count"));
        this.travelService.getLikedTravels(page, count).subscribe(function (travels) {
            _this.pagedTravels = travels;
        }, function () {
            _this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
        });
    };
    TravelsLikedComponent.prototype.pagerEvent = function (currentPage) {
        var count = parseInt(this.routeParams.get("count"));
        this.router.navigate(['ToursListLiked', { page: currentPage, count: count }]);
    };
    TravelsLikedComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travels-liked-by-user',
            // Location of the template for this component
            //templateUrl: './app/travel/travel-home-page.component.html',
            template: "<div class=\"travel-container\"><travel-list *ngIf=\"pagedTravels\" [travels]=\"pagedTravels\" [title]=\"'Patinka\u010Dios kelion\u0117s'\" (pagerEvent)=\"pagerEvent($event)\"></travel-list></div>",
            directives: [travel_list_component_1.TravelListComponent]
        })
    ], TravelsLikedComponent);
    return TravelsLikedComponent;
}());
exports.TravelsLikedComponent = TravelsLikedComponent;
var TravelsViewedComponent = (function () {
    function TravelsViewedComponent(notificationManager, travelService, routeParams, router) {
        this.notificationManager = notificationManager;
        this.travelService = travelService;
        this.routeParams = routeParams;
        this.router = router;
        this.pagedTravels = new TravelClass_1.Pager();
    }
    TravelsViewedComponent.prototype.ngOnInit = function () {
        var _this = this;
        var page = parseInt(this.routeParams.get("page"));
        var count = parseInt(this.routeParams.get("count"));
        this.travelService.getViewedTravels(page, count).subscribe(function (travels) {
            _this.pagedTravels = travels;
        }, function () {
            _this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
        });
    };
    TravelsViewedComponent.prototype.pagerEvent = function (currentPage) {
        var count = parseInt(this.routeParams.get("count"));
        this.router.navigate(['ToursListViewed', { page: currentPage, count: count }]);
    };
    TravelsViewedComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travels-recent-viewed-by-user',
            // Location of the template for this component
            //templateUrl: './app/travel/travel-home-page.component.html',
            template: "<div class=\"travel-container\"><travel-list *ngIf=\"pagedTravels\" [travels]=\"pagedTravels\" [title]=\"'Neseniai per\u017Ei\u016Br\u0117tos kelion\u0117s'\" (pagerEvent)=\"pagerEvent($event)\"></travel-list></div>",
            directives: [travel_list_component_1.TravelListComponent]
        })
    ], TravelsViewedComponent);
    return TravelsViewedComponent;
}());
exports.TravelsViewedComponent = TravelsViewedComponent;
var TravelsSearchedComponent = (function () {
    function TravelsSearchedComponent(notificationManager, travelService, routeParams, router) {
        this.notificationManager = notificationManager;
        this.travelService = travelService;
        this.routeParams = routeParams;
        this.router = router;
        this.pagedTravels = new TravelClass_1.Pager();
    }
    TravelsSearchedComponent.prototype.ngOnInit = function () {
        var _this = this;
        var page = parseInt(this.routeParams.get("page"));
        var count = parseInt(this.routeParams.get("count"));
        var searchPhrase = this.routeParams.get("phrase");
        this.travelService.search(searchPhrase, page, count).subscribe(function (travels) {
            _this.pagedTravels = travels;
        }, function () {
            _this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
        });
    };
    TravelsSearchedComponent.prototype.pagerEvent = function (currentPage) {
        var count = parseInt(this.routeParams.get("count"));
        var searchPhrase = this.routeParams.get("phrase");
        this.router.navigate(['ToursListSearch', { page: currentPage, count: count, phrase: searchPhrase }]);
    };
    TravelsSearchedComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travels-search',
            // Location of the template for this component
            //templateUrl: './app/travel/travel-home-page.component.html',
            template: "<div class=\"travel-container\"><travel-list *ngIf=\"pagedTravels\" [travels]=\"pagedTravels\" [title]=\"'Kelion\u0117s pagal paie\u0161k\u0105'\" (pagerEvent)=\"pagerEvent($event)\"></travel-list></div>",
            directives: [travel_list_component_1.TravelListComponent]
        })
    ], TravelsSearchedComponent);
    return TravelsSearchedComponent;
}());
exports.TravelsSearchedComponent = TravelsSearchedComponent;
var TravelHomePageComponent = (function () {
    function TravelHomePageComponent(notificationManager, travelService, router) {
        this.notificationManager = notificationManager;
        this.travelService = travelService;
        this.router = router;
        this.TravelInformation = new TravelsInformation();
    }
    TravelHomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.router.get
        var type = this.router.get("type");
        if (type)
            type = type.toLocaleLowerCase();
        console.log("type yra: ", type, " toks");
        var page = parseInt(this.router.get("page"));
        var count = parseInt(this.router.get("count"));
        switch (type) {
            //case "viewed":
            //    this.travelService.getViewedTravels(page,count).subscribe((travels) => {
            //        this.TravelInformation.ViewedTravels = travels;
            //    },
            //        () => {
            //            this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            //        });
            //    break;
            //case "liked":
            //    this.travelService.getLikedTravels(page, count).subscribe((travels) => {
            //        this.TravelInformation.LikedTravels = travels;
            //    },
            //        () => {
            //            this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            //        });
            //    break;
            //case "search":
            //    var searchPhrase = this.router.get("phrase");
            //    this.travelService.search(searchPhrase, page, count).subscribe((travels) => {
            //        this.TravelInformation.SearchedTravels = travels;
            //    },
            //        () => {
            //            this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            //        });
            //    break;
            //case "top":
            //    break;
            default:
                this.travelService.getRecentTravels(5).subscribe(function (travels) {
                    var result = new TravelClass_1.Pager();
                    result.Results = travels;
                    result.Count = 0;
                    result.CurrentPage = 1;
                    _this.TravelInformation.NewTravels = result;
                }, function () {
                    _this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
                });
                this.getUserTravelsByPage(1);
        }
        //this.travelService.getTravels("test").subscribe((travels) => {
        //    this.TravelInformation.TravelList = travels;
        //},
        //    () => {
        //        this.notificationManager.error("Nepavyko užkrauti kelionių sąrašo");
        //    });
    };
    TravelHomePageComponent.prototype.getUserTravelsByPage = function (currentPage) {
        var _this = this;
        this.travelService.getUserTravels(currentPage, 9).subscribe(function (travels) {
            _this.TravelInformation.UserTravels = travels;
        }, function () {
            _this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
        });
    };
    TravelHomePageComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-main-component',
            // Location of the template for this component
            templateUrl: './app/travel/travel-home-page.component.html',
            directives: [travel_list_component_1.TravelListComponent, TravelsLikedComponent]
        })
    ], TravelHomePageComponent);
    return TravelHomePageComponent;
}());
exports.TravelHomePageComponent = TravelHomePageComponent;
//# sourceMappingURL=travel-home-page.component.js.map