"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelStatus = (function () {
    function TravelStatus() {
    }
    return TravelStatus;
}());
var LikeDirectiveComponent = (function () {
    function LikeDirectiveComponent(notificationManager, service) {
        this.notificationManager = notificationManager;
        this.service = service;
        this.travelLikesData = new TravelStatus();
    }
    LikeDirectiveComponent.prototype.isLiked = function () {
        return this.travelLikesData.UserLikeStatus > 0;
    };
    LikeDirectiveComponent.prototype.isDisliked = function () {
        return this.travelLikesData.UserLikeStatus < 0;
    };
    LikeDirectiveComponent.prototype.like = function () {
        var _this = this;
        this.service.like(this.travelId, 1).subscribe(function (status) {
            if (_this.travelLikesData.UserLikeStatus === -1) {
                _this.travelLikesData.DislikesCount--;
            }
            //switch (this.travelLikesData.UserLikeStatus) {
            //    case -1:
            //        break;
            //    case 0:
            //        break;
            //    case 1:
            //        break;
            //    default:
            //        this.notificationManager.error("Nežinomas statusas: " + this.travelLikesData.UserLikeStatus);
            //}
            _this.travelLikesData.LikesCount++;
            _this.travelLikesData.UserLikeStatus = status;
            _this.notificationManager.info("jums patinka ši kelionė");
        }, this.notAuthMessage.bind(this));
    };
    LikeDirectiveComponent.prototype.notAuthMessage = function (err) {
        if (err.status == 401) {
            this.notificationManager.info("Prisijunkite prie sistemos norėdami vertinti kelionę");
        }
    };
    LikeDirectiveComponent.prototype.dislike = function () {
        var _this = this;
        this.service.like(this.travelId, -1).subscribe(function (status) {
            if (_this.travelLikesData.UserLikeStatus === 1) {
                _this.travelLikesData.LikesCount--;
            }
            _this.travelLikesData.UserLikeStatus = status;
            _this.travelLikesData.DislikesCount++;
            _this.notificationManager.info("jums nepatinka ši kelionė");
        }, this.notAuthMessage.bind(this));
    };
    LikeDirectiveComponent.prototype.removeLike = function () {
        var _this = this;
        this.service.like(this.travelId, 0).subscribe(function (status) {
            if (_this.travelLikesData.UserLikeStatus === 1) {
                _this.travelLikesData.LikesCount--;
            }
            else if (_this.travelLikesData.UserLikeStatus === -1) {
                _this.travelLikesData.DislikesCount--;
            }
            else {
                _this.notificationManager.info("status: " + _this.travelLikesData.UserLikeStatus);
            }
            _this.travelLikesData.UserLikeStatus = status;
            _this.notificationManager.info("Panaikintas statusas");
        }, this.notAuthMessage.bind(this));
    };
    LikeDirectiveComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getTravelInformation(this.travelId).subscribe(function (travelStatus) {
            _this.travelLikesData = travelStatus;
        });
    };
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