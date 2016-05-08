"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Constants_1 = require('../utils/Constants');
var TravelClass_1 = require('../travel/TravelClass');
require('rxjs/add/operator/map');
require('rxjs/operator/delay');
require('rxjs/operator/mergeMap');
require('rxjs/operator/switchMap');
var TravelDayPlanMock = (function (_super) {
    __extends(TravelDayPlanMock, _super);
    function TravelDayPlanMock() {
        var randomStuff = Math.random();
        _super.call(this, new TravelClass_1.Point(54.5 + randomStuff, 24 + randomStuff));
        this.Date = new Date("2016-01-25");
        this.Description = "Trumpas čia toks yra";
        this.Duration = "22:31";
        this.Name = "Testinis taškas";
    }
    return TravelDayPlanMock;
}(TravelClass_1.TravelDayPlan));
var TravelClassMock = (function (_super) {
    __extends(TravelClassMock, _super);
    function TravelClassMock() {
        _super.call(this);
        var randomStuff = Math.random();
        this.Date = new Date("2016-01-25");
        this.Description = "trumpas aprasymas";
        this.Name = "Kelione";
        this.Point = new TravelClass_1.Point(54.5 + randomStuff, 24 + randomStuff);
        this.TravelDays = [new TravelDayPlanMock(), new TravelDayPlanMock(), new TravelDayPlanMock()];
        this.ImageUrl = "/images/Banner-01-Azure.png";
        this.OrderIndex = -1;
        // this.Point.Address = `Taikos pr. ${}, Kaunas 51297, Lietuva`
    }
    return TravelClassMock;
}(TravelClass_1.TravelClass));
var AuthorMock = (function (_super) {
    __extends(AuthorMock, _super);
    function AuthorMock() {
        _super.call(this);
        this.ImageUrl = "http://localhost:37096/nuotraukosjega/min/wisp_wallpaper__dota_2__by_murr3-d5qjkfc.png";
        this.Name = "Vardenis Pavardenis";
    }
    return AuthorMock;
}(TravelClass_1.Author));
var FullTravelMock = (function (_super) {
    __extends(FullTravelMock, _super);
    function FullTravelMock() {
        _super.call(this);
        this.StartDay = new TravelClassMock();
        this.EndDay = new TravelClassMock();
        this.EndDay.Date = new Date("2016-04-10");
        this.StartDay.Date = new Date("2016-04-05");
        this.WayPoints = [new TravelClassMock(), new TravelClassMock()];
        this.Descrription = "Sistemos Apra6ymas;";
        this.ImageUrl = "https://dn1w8s6xszn0j.cloudfront.net/media/image/p24/itinerary_images/5113b6bd408698fb70000000/new697d0560ea5234e35fed58670d590613.jpg";
        this.Id = 135452;
        this.Likes = parseInt("" + Math.random() * 30);
        this.Views = parseInt("" + Math.random() * 30);
        this.CommentsCount = parseInt("" + Math.random() * 30);
        this.Comments = [new TravelClass_1.Comment(), new TravelClass_1.Comment(), new TravelClass_1.Comment()];
        this.Name = "Test PAvadinamas";
        this.Author = new AuthorMock();
    }
    return FullTravelMock;
}(TravelClass_1.FullTravel));
//http://localhost:2922/api/Mock/5
var TravelService = (function () {
    function TravelService(http) {
        this.http = http;
        this._controllerName = "Travel/";
        console.warn("constructor UserSettingsService");
    }
    TravelService.prototype.getTravel = function (travelId) {
        console.log("service gettings data from", Constants_1.Constants.WebAPIUrl);
        //this.http.get("https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10", {}).subscribe((par) => {
        //    console.log(par);
        //    console.log("great success");
        //}, (err) => {
        //    console.log(err);
        //    console.log("not great error");
        //    });
        return this.http.get(Constants_1.Constants.WebAPIUrl + this._controllerName + travelId, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            console.log("response from API:", result);
            TravelClass_1.TravelMethodsHelper.processTravelFromServer(result);
            TravelClass_1.TravelMethodsHelper.processTravelsImages([result.StartDay]);
            TravelClass_1.TravelMethodsHelper.processTravelsImages([result.EndDay]);
            TravelClass_1.TravelMethodsHelper.processTravelsImages(result.WayPoints);
            console.log("response from API after change:", result);
            return result;
        });
    };
    TravelService.prototype.getTravels = function (filter) {
        console.log("service gettings data from", Constants_1.Constants.WebAPIUrl);
        return this.http.get(Constants_1.Constants.WebAPIUrl + this._controllerName + 8, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            console.log("response from API:", result);
            //TODO return result
            return [new FullTravelMock(), new FullTravelMock(), new FullTravelMock(), new FullTravelMock(), new FullTravelMock()];
        });
    };
    TravelService.prototype.getRecentTravels = function (count) {
        var url = Constants_1.Constants.WebAPIUrl + this._controllerName + "Recent/" + (count ? count : "");
        console.log("service gettings data from", url);
        return this.http.get(url, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            TravelClass_1.TravelMethodsHelper.processTravels(result);
            return result;
        });
    };
    TravelService.prototype.getViewedTravels = function (page, count) {
        var url = Constants_1.Constants.WebAPIUrl + this._controllerName + "Viewed/" + ("Page/" + page + "/Count/" + count);
        console.log("service gettings data from", url);
        return this.http.get(url, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            TravelClass_1.TravelMethodsHelper.processTravels(result.Results);
            return result;
        });
    };
    TravelService.prototype.getLikedTravels = function (page, count) {
        var url = Constants_1.Constants.WebAPIUrl + this._controllerName + "Liked/" + ("Page/" + page + "/Count/" + count);
        console.log("service gettings data from", url);
        return this.http.get(url, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            TravelClass_1.TravelMethodsHelper.processTravels(result.Results);
            return result;
        });
    };
    TravelService.prototype.getUserTravels = function (page, count) {
        var url = Constants_1.Constants.WebAPIUrl + this._controllerName + "User/" + ("Page/" + page + "/Count/" + count);
        console.log("service gettings data from", url);
        return this.http.get(url, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            TravelClass_1.TravelMethodsHelper.processTravels(result.Results);
            return result;
        });
    };
    TravelService.prototype.search = function (searchPhrase, page, count) {
        var url = Constants_1.Constants.WebAPIUrl + this._controllerName + "Page/" + page + "/Count/" + count + "/Search/" + (searchPhrase || "");
        console.log("service gettings data from", url);
        return this.http.get(url, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            TravelClass_1.TravelMethodsHelper.processTravels(result.Results);
            return result;
        });
    };
    TravelService.prototype.processTravels = function (result) {
        result.forEach(function (travel) {
            travel.Author.ImageUrl = this.getPhotoUrl(travel.Author.ImageUrl);
            travel.ImageUrl = this.getPhotoUrl(travel.ImageUrl);
        });
        console.log("response from API:", result);
    };
    TravelService.prototype.saveTravel = function (travel) {
        //TODO move somewwhere else
        if (!travel.WayPoints) {
            travel.WayPoints = [];
        }
        if (travel.StartDay) {
            travel.WayPoints.unshift(travel.StartDay);
        }
        if (travel.EndDay) {
            travel.WayPoints.push(travel.EndDay);
        }
        return this.http.post(Constants_1.Constants.WebAPIUrl + this._controllerName, JSON.stringify(travel), {})
            .map(function (response) { return response.json(); });
    };
    TravelService = __decorate([
        core_1.Injectable()
    ], TravelService);
    return TravelService;
}());
exports.TravelService = TravelService;
//# sourceMappingURL=travel.service.js.map