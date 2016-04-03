"use strict";
var Point = (function () {
    function Point(latitude, longitude) {
        this.Latitude = latitude;
        this.Longitude = longitude;
    }
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
        this.Points = [];
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
//# sourceMappingURL=TravelClass.js.map