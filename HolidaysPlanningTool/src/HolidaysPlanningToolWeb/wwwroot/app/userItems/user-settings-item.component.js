"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var UserSettingsItemComponent = (function () {
    function UserSettingsItemComponent(element) {
        var _this = this;
        this.element = element;
        this.isInEditMode = false;
        this.setEditMode = function () {
            _this.readonly = false;
        };
        this.setViewMode = function () {
            _this.readonly = true;
        };
        this.readonly = true;
    }
    UserSettingsItemComponent.prototype.saveChanges = function (item) {
    };
    UserSettingsItemComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'user-settings-item',
            templateUrl: './app/userItems/user-settings-item.component.html',
            directives: [],
            inputs: ['item']
        })
    ], UserSettingsItemComponent);
    return UserSettingsItemComponent;
}());
exports.UserSettingsItemComponent = UserSettingsItemComponent;
//# sourceMappingURL=user-settings-item.component.js.map