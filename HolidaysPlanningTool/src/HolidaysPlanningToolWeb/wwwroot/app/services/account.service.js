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
var AccountService = (function () {
    function AccountService(http) {
        this.http = http;
        this._controllerName = "Mock/";
        console.warn("constructor UserService");
    }
    AccountService.prototype.login = function (userName, userPassword) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants_1.Constants.WebAPIUrl + this._controllerName + 5, JSON.stringify({ userName: userName, password: userPassword }), {
            headers: headers
        })
            .map(function (response) { return response.json(); }).map(function (result) {
            return status;
        });
    };
    AccountService.prototype.logout = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants_1.Constants.WebAPIUrl + this._controllerName + 5, JSON.stringify({}), {
            headers: headers
        })
            .map(function (response) { return response.json(); }).map(function (result) {
            return status;
        });
    };
    AccountService = __decorate([
        core_1.Injectable()
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map