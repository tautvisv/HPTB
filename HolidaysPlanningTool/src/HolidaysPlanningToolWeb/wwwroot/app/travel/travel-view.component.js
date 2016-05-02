"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelClass_1 = require("./TravelClass");
var comments_component_1 = require('./comments/comments.component');
var comment_create_component_1 = require('./comments/comment-create.component');
var like_directive_component_1 = require('./like-directive.component');
var GoogleMap_1 = require('./maps/GoogleMap');
var travel_view_days_container_component_1 = require('./travel-view-days-container.component');
var MyTime = (function () {
    function MyTime() {
    }
    return MyTime;
}());
var TravelViewComponent = (function () {
    function TravelViewComponent(_router, _routeParams, map, travelHelper, travelService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this.map = map;
        this.travelHelper = travelHelper;
        this.travelService = travelService;
        this.travel = new TravelClass_1.FullTravel();
    }
    TravelViewComponent.prototype.msToTime = function (s) {
        var newTime = new MyTime();
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60 % 24;
        var d = (s - mins) / 60 / 24;
        //return d + 'dienos' + hrs + 'valandos' + mins + 'minutės';
        newTime.days = d;
        newTime.hours = hrs;
        newTime.minutes = mins;
        newTime.seconds = s;
        return newTime;
    };
    TravelViewComponent.prototype.translateDays = function (days) {
        var modItem = days % 10;
        if (modItem === 0 || days > 9 && days < 20) {
            return "dienų";
        }
        if (modItem === 1) {
            return "diena";
        }
        return "dienos";
    };
    TravelViewComponent.prototype.translateHours = function (hours) {
        var modItem = hours % 10;
        if (modItem === 0 || hours > 9 && hours < 20) {
            return "valandų";
        }
        if (modItem === 1) {
            return "valanda";
        }
        return "valandos";
    };
    TravelViewComponent.prototype.translateMinutes = function (minutes) {
        var modItem = minutes % 10;
        if (modItem === 0 || minutes > 9 && minutes < 20) {
            return "minučių";
        }
        if (modItem === 1) {
            return "minutė";
        }
        return "minutės";
    };
    TravelViewComponent.prototype.translateSeconds = function (seconds) {
        var modItem = seconds % 10;
        if (modItem === 0 || seconds > 9 && seconds < 20) {
            return "sekundžių";
        }
        if (modItem === 1) {
            return "sekundė";
        }
        return "sekundės";
    };
    TravelViewComponent.prototype.addComment = function (comment) {
        console.log("coment was dadded to view", comment);
        this.travel.Comments.push(comment);
    };
    TravelViewComponent.prototype.showRoute = function (waypoints) {
        if (waypoints.length)
            var first = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[0].Point);
        if (waypoints.length > 1)
            var last = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[waypoints.length - 1].Point);
        var middles = this.travelHelper.convertILocationPointsToDirectionsWaypoint(waypoints);
        this.map.setOptimizeRoute(true);
        this.map.setWayPoints(first, last, middles);
    };
    TravelViewComponent.prototype.showMainRoute = function () {
        this.map.setOptimizeRoute(false);
        var startPoint = this.travel.StartDay ? this.travel.StartDay.Point : null;
        var endPoint = this.travel.EndDay ? this.travel.EndDay.Point : null;
        this.map.setWayPoints(this.travelHelper.convertPointToDirectionsWaypoint(startPoint), this.travelHelper.convertPointToDirectionsWaypoint(endPoint), this.travelHelper.convertAllILocationPointsToDirectionsWaypoint(this.travel.WayPoints));
        //this.map.findRoute();
    };
    TravelViewComponent.prototype.duration = function () {
        var result = new MyTime();
        if (!this.travel.EndDay || !this.travel.StartDay) {
            result.default = "-";
            return result;
        }
        ;
        return this.msToTime(this.travel.EndDay.Date.getTime() - this.travel.StartDay.Date.getTime());
    };
    TravelViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.travelService.getTravel(parseInt(this._routeParams.get('id'))).subscribe(function (travel) {
            _this.travel = travel;
            _this.durationString = _this.duration();
            _this.showMainRoute();
        });
        this.map.initialise("the_view_map");
        this.map.setMapDisableClicks(true);
    };
    TravelViewComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-view',
            // Location of the template for this component
            templateUrl: './app/travel/travel-view.component.html',
            providers: [GoogleMap_1.GoogleMaps, TravelClass_1.TravelMethodsHelper],
            directives: [comments_component_1.CommentsComponent, comment_create_component_1.CommentCreateComponent, like_directive_component_1.LikeDirectiveComponent, travel_view_days_container_component_1.TravelViewDaysContainerComponent]
        })
    ], TravelViewComponent);
    return TravelViewComponent;
}());
exports.TravelViewComponent = TravelViewComponent;
//# sourceMappingURL=travel-view.component.js.map