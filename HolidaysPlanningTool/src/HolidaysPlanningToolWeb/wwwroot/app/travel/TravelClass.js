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
var FullTravel = (function () {
    function FullTravel() {
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