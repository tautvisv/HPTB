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
var AccountService = (function () {
    function AccountService(myHttp) {
        this.myHttp = myHttp;
        this._controllerName = "User/";
        console.warn("constructor UserService");
    }
    AccountService.prototype.login = function (userName, userPassword) {
        var _this = this;
        // var headers = new Headers();
        //this.authHttp.tokenStream.
        //localStorage
        return this.myHttp.post(Constants_1.Constants.WebAPIUrl + this._controllerName + "/LoginAts", JSON.stringify({ userName: userName, password: userPassword, grant_type: 'password' }), {})
            .map(function (response) { return response.json(); }).map(function (result) {
            console.log(result);
            _this.myHttp.setToken(result.access_token);
            //localStorage.setItem("auth-token", result.access_token);
            return status;
        });
    };
    AccountService.prototype.logout = function () {
        var _this = this;
        //var headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        return this.myHttp.post(Constants_1.Constants.WebAPIUrl + this._controllerName + "Logout", JSON.stringify({}), {})
            .map(function (response) { return response.json(); }).map(function (result) {
            _this.myHttp.removeToken();
            return status;
        });
    };
    AccountService = __decorate([
        core_1.Injectable()
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
/*
import {Injectable} from "angular2/core";
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {tokenNotExpired} from "angular2-jwt/angular2-jwt";
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

@Injectable()
export class Auth0Service {
    lock: Auth0Lock = new Auth0Lock('myclientid', 'my domain');
    //jwtHelper: JwtHelper = new JwtHelper();

    login() {
        this.lock.show((err: string, profile: string, id_token: string) => {

            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        return tokenNotExpired();
    }
} */ 
//# sourceMappingURL=account.service.js.map