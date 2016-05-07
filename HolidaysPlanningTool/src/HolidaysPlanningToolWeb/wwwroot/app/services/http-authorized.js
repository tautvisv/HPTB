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
var httpAuthorized = (function () {
    function httpAuthorized(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        var token = localStorage.getItem(Constants_1.Constants.TokenName);
        if (token) {
            this.setToken(token);
        }
    }
    httpAuthorized.prototype.setToken = function (token) {
        this.removeToken();
        this.headers.append(Constants_1.Constants.TokenHeaderName, Constants_1.Constants.TokenType + token);
        localStorage.setItem(Constants_1.Constants.TokenName, token);
    };
    httpAuthorized.prototype.removeToken = function () {
        this.headers.delete("Authorization");
        localStorage.removeItem(Constants_1.Constants.TokenName);
    };
    httpAuthorized.prototype.isAuth = function () {
        return !!localStorage.getItem(Constants_1.Constants.TokenName);
    };
    httpAuthorized.prototype.setGlobalHeaders = function (headers, request) {
        headers.forEach(function (header) {
            var key = Object.keys(header)[0];
            var headerValue = header[key];
            request.headers.set(key, headerValue);
        });
    };
    httpAuthorized.prototype.request = function (url, options) {
        var request;
        var globalHeaders = this._config.globalHeaders;
        if (typeof url === 'string') {
            var reqOpts = options || {};
            if (!reqOpts.headers) {
                reqOpts.headers = new http_1.Headers();
            }
            if (globalHeaders) {
                this.setGlobalHeaders(globalHeaders, reqOpts);
            }
            reqOpts.headers.set(this._config.headerName, this._config.headerPrefix + this._config.tokenGetter());
            request = this.http.request(url, reqOpts);
        }
        else {
            var req = url;
            if (!req.headers) {
                req.headers = new http_1.Headers();
            }
            if (globalHeaders) {
                this.setGlobalHeaders(globalHeaders, req);
            }
            req.headers.set(this._config.headerName, this._config.headerPrefix + this._config.tokenGetter());
            request = this.http.request(req);
        }
        return request;
    };
    httpAuthorized.prototype.requestHelper = function (requestArgs, additionalOptions) {
        var options = new http_1.RequestOptions(requestArgs);
        if (additionalOptions) {
            options = options.merge(additionalOptions);
        }
        return this.request(new http_1.Request(options));
    };
    httpAuthorized.prototype.createHeader = function (headers) {
        if (headers) {
            this.headers.forEach(function (header, key) {
                var headerValue = header[0];
                headers.set(key, headerValue);
            });
            return headers;
        }
        return this.headers;
    };
    httpAuthorized.prototype.get = function (url, options) {
        options.headers = this.createHeader(options.headers);
        return this.http.get(url, options);
    };
    httpAuthorized.prototype.post = function (url, body, options) {
        options.headers = this.createHeader(options.headers);
        return this.http.post(url, body, options);
    };
    httpAuthorized.prototype.put = function (url, body, options) {
        return this.requestHelper({ url: url, body: body, method: http_1.RequestMethod.Put }, options);
    };
    httpAuthorized.prototype.delete = function (url, options) {
        return this.requestHelper({ url: url, method: http_1.RequestMethod.Delete }, options);
    };
    httpAuthorized.prototype.patch = function (url, body, options) {
        return this.requestHelper({ url: url, body: body, method: http_1.RequestMethod.Patch }, options);
    };
    httpAuthorized.prototype.head = function (url, options) {
        return this.requestHelper({ url: url, method: http_1.RequestMethod.Head }, options);
    };
    httpAuthorized = __decorate([
        core_1.Injectable()
    ], httpAuthorized);
    return httpAuthorized;
}());
exports.httpAuthorized = httpAuthorized;
//# sourceMappingURL=http-authorized.js.map