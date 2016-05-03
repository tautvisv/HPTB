"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var Constants_1 = require('../utils/Constants');
require('rxjs/add/operator/map');
require('rxjs/operator/delay');
require('rxjs/operator/mergeMap');
require('rxjs/operator/switchMap');
//http://localhost:2922/api/Mock/5
var MiscService = (function () {
    function MiscService(http) {
        this.http = http;
        this._controllerName = "PhotoUpload/testf";
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
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants_1.Constants.WebAPIUrl + this._controllerName, JSON.stringify({ travelId: travelId, status: status }), {
            headers: headers
        })
            .map(function (response) { return response.json(); }).map(function (result) {
            return status;
        });
    };
    MiscService.prototype.addView = function (object) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants_1.Constants.WebAPIUrl + this._controllerName, JSON.stringify({}), {
            headers: headers
        })
            .map(function (response) { return response.json(); });
    };
    MiscService = __decorate([
        core_1.Injectable()
    ], MiscService);
    return MiscService;
}());
exports.MiscService = MiscService;
//# sourceMappingURL=misc.service.js.map