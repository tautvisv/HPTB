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
var user_settings_1 = require('./user-settings');
require('rxjs/add/operator/map');
require('rxjs/operator/delay');
require('rxjs/operator/mergeMap');
require('rxjs/operator/switchMap');
var UserSettingsMock = (function (_super) {
    __extends(UserSettingsMock, _super);
    function UserSettingsMock() {
        _super.call(this);
        this.name = "Tautvydas";
        this.surname = "Vaitiekūnas";
        this.address = "Tauro g. 13";
        this.phone = "+37068559976";
        this.description = "Aš šiuo metu programuoju";
        this.extra_info = "Papildoma informacija";
        this.email = "tautvisv@gmail.com";
    }
    return UserSettingsMock;
}(user_settings_1.UserSettings));
//http://localhost:2922/api/Mock/5
var UserSettingsService = (function () {
    function UserSettingsService(http) {
        this.http = http;
        this._controllerName = "Mock/";
        console.warn("constructor UserSettingsService");
    }
    UserSettingsService.prototype.getUserSettingsData = function (userId) {
        console.log("service gettings data from", Constants_1.Constants.WebAPIUrl);
        return this.http.get(Constants_1.Constants.WebAPIUrl + this._controllerName + userId)
            .map(function (response) { return response.json(); }).map(function (result) {
            console.log("response from API:", result);
            //TODO return result
            return new UserSettingsMock();
        });
        //return new UserSettingsMock();
    };
    UserSettingsService.prototype.saveUserSettings = function (userSettings) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants_1.Constants.WebAPIUrl + this._controllerName + 5, JSON.stringify(new UserSettingsMock()), {
            headers: headers
        })
            .map(function (response) { return response.json(); });
    };
    UserSettingsService = __decorate([
        core_1.Injectable()
    ], UserSettingsService);
    return UserSettingsService;
}());
exports.UserSettingsService = UserSettingsService;
//# sourceMappingURL=user-settings.service.js.map