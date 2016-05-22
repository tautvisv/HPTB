"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Constants_1 = require('../utils/Constants');
require('rxjs/add/operator/map');
require('rxjs/operator/delay');
require('rxjs/operator/mergeMap');
require('rxjs/operator/switchMap');
var MiscService = (function () {
    //private _controllerName = "PhotoUpload/testf";
    function MiscService(http) {
        this.http = http;
        console.warn("constructor UserSettingsService");
    }
    //getTravel(travelId: number | string): Observable<any> { //UserSettingsMock
    //    console.log("service gettings data from", Constants.WebAPIUrl);
    //    return this.http.get(Constants.WebAPIUrl + this._controllerName + travelId, {})
    //        .map(response => response.json()).map((result: number) => {
    //            console.log("response from API:", result);
    //            //TODO return result
    //            return {};
    //        });
    //}
    MiscService.prototype.saveComment = function (comment) {
        //Padaryti užklausos atšaukimą
        /*
            if (!comment || !comment.Text) {
                console.warn("komentaras privalo tur4ti tekstą, užklausa neišsiųsta");
                return Observable.of({ }).map(o => JSON.stringify(o));
            }*/
        return this.http.post(Constants_1.Constants.WebAPIUrl + "Comments/", JSON.stringify(comment), {})
            .map(function (response) { return response.json(); }).map(function (result) {
            return result;
        });
    };
    MiscService.prototype.like = function (travelId, status) {
        return this.http.post(Constants_1.Constants.WebAPIUrl + "Likes/", JSON.stringify({ TravelId: travelId, Status: status }), {})
            .map(function (response) { return response.json(); }).map(function (result) {
            console.log("status");
            return status;
        });
    };
    MiscService.prototype.addView = function (travelId) {
        if (!this.http.isAuth())
            return;
        return this.http.post(Constants_1.Constants.WebAPIUrl + "Views", JSON.stringify({ TravelId: travelId }), {})
            .map(function (response) { return response.json(); }).subscribe(function (s) { console.log("View added"); }, function (e) { console.error("view was not added"); });
    };
    MiscService.prototype.getTravelInformation = function (travelId) {
        return this.http.get(Constants_1.Constants.WebAPIUrl + "Likes/TravelInformation/" + travelId, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            console.log("travel Staustus: " + result);
            return result;
        });
    };
    MiscService = __decorate([
        core_1.Injectable()
    ], MiscService);
    return MiscService;
}());
exports.MiscService = MiscService;
//# sourceMappingURL=misc.service.js.map