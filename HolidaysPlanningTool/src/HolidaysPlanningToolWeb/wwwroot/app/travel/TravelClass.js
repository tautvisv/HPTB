"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelMethodsHelper = (function () {
    function TravelMethodsHelper() {
    }
    TravelMethodsHelper.prototype.convertPointToGooglePoint = function (point) {
        return new google.maps.LatLng(point.Latitude, point.Longitude);
    };
    TravelMethodsHelper.prototype.convertPointToDirectionsWaypoint = function (point, stopover) {
        if (stopover === void 0) { stopover = true; }
        return { location: new google.maps.LatLng(point.Latitude, point.Longitude), stopover: stopover };
    };
    TravelMethodsHelper.prototype.convertILocationPointsToDirectionsWaypoint = function (points) {
        var newList = [];
        //points.forEach(function (pointableObject: ILocationPoint) {
        //});
        for (var i = 1; i < points.length - 1; i++) {
            newList.push(this.convertPointToDirectionsWaypoint(points[i].Point));
        }
        return newList;
    };
    TravelMethodsHelper.prototype.convertAllILocationPointsToDirectionsWaypoint = function (points) {
        var newList = [];
        //points.forEach(function (pointableObject: ILocationPoint) {
        //});
        for (var i = 0; i < points.length; i++) {
            newList.push(this.convertPointToDirectionsWaypoint(points[i].Point));
        }
        return newList;
    };
    TravelMethodsHelper = __decorate([
        core_1.Injectable()
    ], TravelMethodsHelper);
    return TravelMethodsHelper;
}());
exports.TravelMethodsHelper = TravelMethodsHelper;
var Point = (function () {
    function Point(latitude, longitude) {
        this.Latitude = latitude;
        this.Longitude = longitude;
    }
    Point.prototype.ToGooglePoint = function () {
        return new google.maps.LatLng(this.Latitude, this.Longitude);
    };
    return Point;
}());
exports.Point = Point;
var UserLocation = (function () {
    function UserLocation() {
    }
    return UserLocation;
}());
exports.UserLocation = UserLocation;
var TravelDayPlan = (function () {
    function TravelDayPlan(point) {
        this.Point = point;
    }
    return TravelDayPlan;
}());
exports.TravelDayPlan = TravelDayPlan;
var TravelClass = (function () {
    function TravelClass(point) {
        this.TravelDays = [];
        this.Point = point;
    }
    return TravelClass;
}());
exports.TravelClass = TravelClass;
var FullTravel = (function () {
    function FullTravel() {
        this.WayPoints = [];
        this.Comments = [];
    }
    return FullTravel;
}());
exports.FullTravel = FullTravel;
var Comment = (function () {
    function Comment(comment) {
        if (comment === void 0) { comment = null; }
        if (comment != null) {
            this.Text = comment.Text;
            this.Date = comment.Date;
            this.Author = comment.Author;
        }
        else {
            this.Text = "Testinis komentaras kurio tekstas yra labai ilgas";
            this.Date = new Date();
            this.Author = new Author();
            this.Author.Name = "TestinisAutorius";
            this.Author.ImageUrl = "https://dn1w8s6xszn0j.cloudfront.net/resources_version/desktop/img/default/user/t1/default_3.jpg";
        }
    }
    return Comment;
}());
exports.Comment = Comment;
var Author = (function () {
    function Author() {
    }
    return Author;
}());
exports.Author = Author;
//# sourceMappingURL=TravelClass.js.map