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
var http_1 = require('angular2/http');
var TravelClass_1 = require('./TravelClass');
require('rxjs/add/operator/map');
require('rxjs/operator/delay');
require('rxjs/operator/mergeMap');
require('rxjs/operator/switchMap');
var TravelClassMock = (function (_super) {
    __extends(TravelClassMock, _super);
    function TravelClassMock() {
        _super.call(this);
        var randomStuff = Math.random();
        this.Date = new Date("2016-01-25");
        this.Description = "trumpas aprasymas";
        this.Name = "Kelione";
        this.Point = new TravelClass_1.Point(54.5 + randomStuff, 24 + randomStuff);
        this.TravelDays = null;
        // this.Point.Address = `Taikos pr. ${}, Kaunas 51297, Lietuva`
    }
    return TravelClassMock;
}(TravelClass_1.TravelClass));
var FullTravelMock = (function (_super) {
    __extends(FullTravelMock, _super);
    function FullTravelMock() {
        _super.call(this);
        this.startDay = new TravelClassMock();
        this.endDay = new TravelClassMock();
        this.wayPoints = [new TravelClassMock(), new TravelClassMock()];
    }
    return FullTravelMock;
}(TravelClass_1.FullTravel));
//http://localhost:2922/api/Mock/5
var TravelService = (function () {
    function TravelService(http) {
        this.http = http;
        this._controllerName = "Mock/";
        console.warn("constructor UserSettingsService");
    }
    TravelService.prototype.getTravel = function (travelId) {
        console.log("service gettings data from", Constants_1.Constants.WebAPIUrl);
        return this.http.get(Constants_1.Constants.WebAPIUrl + this._controllerName + travelId)
            .map(function (response) { return response.json(); }).map(function (result) {
            console.log("response from API:", result);
            //TODO return result
            return new FullTravelMock();
        });
    };
    TravelService.prototype.getTravels = function (filter) {
        console.log("service gettings data from", Constants_1.Constants.WebAPIUrl);
        return this.http.get(Constants_1.Constants.WebAPIUrl + this._controllerName + filter)
            .map(function (response) { return response.json(); }).map(function (result) {
            console.log("response from API:", result);
            //TODO return result
            return [new FullTravelMock(), new FullTravelMock()];
        });
    };
    TravelService.prototype.saveTravel = function (travel) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants_1.Constants.WebAPIUrl + this._controllerName + 5, JSON.stringify(new TravelClassMock()), {
            headers: headers
        })
            .map(function (response) { return response.json(); });
    };
    TravelService = __decorate([
        core_1.Injectable()
    ], TravelService);
    return TravelService;
}());
exports.TravelService = TravelService;
//# sourceMappingURL=travel.service.js.map