"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelClass_1 = require('../TravelClass');
var CommentCreateComponent = (function () {
    function CommentCreateComponent(_notificationService, service) {
        this._notificationService = _notificationService;
        this.service = service;
        this.addComment = new core_1.EventEmitter();
        this.comment = new TravelClass_1.Comment();
    }
    CommentCreateComponent.prototype.ngOnInit = function () {
    };
    CommentCreateComponent.prototype.saveComment = function () {
        var _this = this;
        this.comment.TravelId = this.travelId;
        this.service.saveComment(this.comment).subscribe(function (comment) {
            _this.addComment.next(comment);
            _this.comment.Text = "";
        }, function () { _this._notificationService.error("Palikti atsiliepimą apie kelionę gali tik tais registruotas vartotojas"); });
    };
    __decorate([
        core_1.Output()
    ], CommentCreateComponent.prototype, "addComment", void 0);
    __decorate([
        core_1.Input()
    ], CommentCreateComponent.prototype, "travelId", void 0);
    CommentCreateComponent = __decorate([
        core_1.Component({
            selector: 'comment-create',
            templateUrl: './app/travel/comments/comment-create.component.html',
            directives: []
        })
    ], CommentCreateComponent);
    return CommentCreateComponent;
}());
exports.CommentCreateComponent = CommentCreateComponent;
//# sourceMappingURL=comment-create.component.js.map