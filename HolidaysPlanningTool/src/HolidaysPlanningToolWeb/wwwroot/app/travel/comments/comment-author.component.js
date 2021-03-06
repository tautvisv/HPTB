"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var CommentAuthorComponent = (function () {
    function CommentAuthorComponent() {
        this.testText = "not Loaded";
    }
    CommentAuthorComponent.prototype.ngOnInit = function () {
        this.testText = "Test angular 2 From init";
    };
    __decorate([
        core_1.Input()
    ], CommentAuthorComponent.prototype, "author", void 0);
    CommentAuthorComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'comment-authror',
            // Location of the template for this component
            templateUrl: './app/travel/comments/comment-author.component.html',
            directives: []
        })
    ], CommentAuthorComponent);
    return CommentAuthorComponent;
}());
exports.CommentAuthorComponent = CommentAuthorComponent;
//# sourceMappingURL=comment-author.component.js.map