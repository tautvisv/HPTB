"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var comment_author_component_1 = require('./comment-author.component');
var CommentComponent = (function () {
    function CommentComponent() {
    }
    CommentComponent.prototype.ngOnInit = function () {
        if (this.comment.Date) {
            this.comment.Date = new Date(this.comment.Date.toString());
        }
    };
    __decorate([
        core_1.Input()
    ], CommentComponent.prototype, "comment", void 0);
    CommentComponent = __decorate([
        core_1.Component({
            selector: 'comment-item',
            templateUrl: './app/travel/comments/comment.component.html',
            directives: [comment_author_component_1.CommentAuthorComponent]
        })
    ], CommentComponent);
    return CommentComponent;
}());
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map