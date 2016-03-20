"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Alerts = (function () {
    function Alerts() {
        console.warn("init Alerts");
        this.alerts = [];
    }
    Alerts.prototype.push = function (object) {
        this.alerts.push(object);
    };
    Alerts.prototype.removeItem = function (object) {
        var index = this.alerts.indexOf(object);
        if (index > -1) {
            this.alerts.splice(index, 1);
        }
        return index > -1;
    };
    Alerts = __decorate([
        core_1.Injectable()
    ], Alerts);
    return Alerts;
}());
exports.Alerts = Alerts;
var NotificationService = (function () {
    function NotificationService(_alerts) {
        this._alerts = _alerts;
        console.warn("console creating me, The notification Service is 69");
        this._alerts.push({ notification: "69", type: "alert-info" });
    }
    NotificationService.prototype.error = function (message) {
        this._alerts.push({ type: "alert-danger", notification: message });
    };
    NotificationService.prototype.warning = function (message) {
        this._alerts.push({ type: "alert-warning", notification: message });
    };
    NotificationService.prototype.success = function (message) {
        this._alerts.push({ type: "alert-success", notification: message });
    };
    NotificationService.prototype.info = function (message) {
        this._alerts.push({ type: "alert-info", notification: message });
    };
    NotificationService = __decorate([
        core_1.Injectable()
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map