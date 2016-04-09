"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var LikeDirectiveComponent = (function () {
    function LikeDirectiveComponent(notificationManager, service) {
        this.notificationManager = notificationManager;
        this.service = service;
    }
    LikeDirectiveComponent.prototype.isLiked = function () {
        return this.status > 0;
    };
    LikeDirectiveComponent.prototype.isDisliked = function () {
        return this.status < 0;
    };
    LikeDirectiveComponent.prototype.like = function () {
        var _this = this;
        this.service.like(this.travelId, 1).subscribe(function (status) {
            _this.status = status;
            _this.notificationManager.info("jums patinka ši kelionė");
        }, function () {
        });
    };
    LikeDirectiveComponent.prototype.dislike = function () {
        var _this = this;
        this.service.like(this.travelId, -1).subscribe(function (status) {
            _this.status = status;
            _this.notificationManager.info("jums nepatinka ši kelionė");
        }, function () {
        });
    };
    LikeDirectiveComponent.prototype.removeLike = function () {
        var _this = this;
        this.service.like(this.travelId, 0).subscribe(function (status) {
            _this.status = status;
            _this.notificationManager.info("Panaikintas statusas");
        }, function () {
        });
    };
    LikeDirectiveComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], LikeDirectiveComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input()
    ], LikeDirectiveComponent.prototype, "travelId", void 0);
    LikeDirectiveComponent = __decorate([
        core_1.Component({
            selector: 'like-directive',
            templateUrl: './app/travel/like-directive.component.html',
            directives: []
        })
    ], LikeDirectiveComponent);
    return LikeDirectiveComponent;
}());
exports.LikeDirectiveComponent = LikeDirectiveComponent;
//# sourceMappingURL=like-directive.component.js.map