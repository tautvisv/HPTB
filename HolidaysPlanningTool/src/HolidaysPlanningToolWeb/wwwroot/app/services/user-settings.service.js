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
var UserSettingsService = (function () {
    function UserSettingsService(http) {
        this.http = http;
        this._controllerName = "UserSettings/";
        console.warn("constructor UserSettingsService");
    }
    UserSettingsService.prototype.getUserSettingsData = function () {
        console.log("service gettings data from", Constants_1.Constants.WebAPIUrl);
        return this.http.get(Constants_1.Constants.WebAPIUrl + this._controllerName, {})
            .map(function (response) { return response.json(); }).map(function (result) {
            //TODO return result
            return result;
        });
        //return new UserSettingsMock();
    };
    UserSettingsService.prototype.saveUserSettings = function (userSettings) {
        return this.http.post(Constants_1.Constants.WebAPIUrl + this._controllerName, JSON.stringify(userSettings), {})
            .map(function (response) { return response.json(); });
    };
    UserSettingsService = __decorate([
        core_1.Injectable()
    ], UserSettingsService);
    return UserSettingsService;
}());
exports.UserSettingsService = UserSettingsService;
//# sourceMappingURL=user-settings.service.js.map