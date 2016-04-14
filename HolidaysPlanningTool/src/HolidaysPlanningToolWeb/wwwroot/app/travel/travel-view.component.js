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
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60 % 24;
        var d = (s - mins) / 60 / 24;
        return d + 'dienos' + hrs + 'valandos' + mins + 'minutės';
    };
    TravelViewComponent.prototype.addComment = function (comment) {
        console.log("coment was dadded to view", comment);
        this.travel.Comments.push(comment);
    };
    TravelViewComponent.prototype.showRoute = function (waypoints) {
        var first = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[0].Point);
        var last = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[waypoints.length - 1].Point);
        var middles = this.travelHelper.convertILocationPointsToDirectionsWaypoint(waypoints);
        this.map.setWayPoints(first, last, middles);
    };
    TravelViewComponent.prototype.showMainRoute = function () {
        this.map.setWayPoints(this.travelHelper.convertPointToDirectionsWaypoint(this.travel.startDay.Point), this.travelHelper.convertPointToDirectionsWaypoint(this.travel.endDay.Point), this.travelHelper.convertAllILocationPointsToDirectionsWaypoint(this.travel.wayPoints));
        //this.map.findRoute();
    };
    TravelViewComponent.prototype.duration = function () {
        if (!this.travel.endDay || !this.travel.startDay)
            return "datos nenurodytos";
        return this.msToTime(this.travel.endDay.Date.getTime() - this.travel.startDay.Date.getTime());
    };
    TravelViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.travelService.getTravel(this._routeParams.get('id')).subscribe(function (travel) {
            _this.travel = travel;
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