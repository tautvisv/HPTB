"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var progress_bar_component_1 = require('./progress/progress-bar.component');
var NotificationEl = (function () {
    function NotificationEl(notifications) {
        this.notifications = notifications;
        this.duration = 25;
        console.warn("init NotificationComponent");
    }
    NotificationEl.prototype.removeItem = function (item) {
        var result = this.notifications.removeItem(item);
    };
    NotificationEl.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], NotificationEl.prototype, "alerdata", void 0);
    NotificationEl = __decorate([
        core_1.Component({
            selector: 'notification-el',
            template: "\n    <div class=\"bs-component\">\n        <progress-bar duration=\"10000\" (callback)=\"removeItem(alerdata)\"></progress-bar>\n        <div class=\"my-alert my-alert-dismissible\" ngClass=\"{{alerdata.type}}\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" (click)=\"removeItem(alerdata)\">\u00D7</button>\n            {{alerdata.notification}}\n        </div>\n    </div>\n    ",
            directives: [progress_bar_component_1.ProgressBar]
        })
    ], NotificationEl);
    return NotificationEl;
}());
var NotificationComponent = (function () {
    function NotificationComponent(notifications) {
        this.notifications = notifications;
    }
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'notification',
            templateUrl: "./app/utils/notification.component.html",
            directives: [NotificationEl]
        })
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification.component.js.map