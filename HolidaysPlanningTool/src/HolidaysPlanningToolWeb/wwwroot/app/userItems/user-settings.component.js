"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var editable_item_component_1 = require('./editable-item.component');
var user_settings_mock_1 = require('./user-settings-mock');
var UserSettingsComponent = (function () {
    function UserSettingsComponent(userInfo, _notificationService) {
        this.userInfo = userInfo;
        this._notificationService = _notificationService;
    }
    UserSettingsComponent.prototype.saveSettings = function () {
        this._notificationService.success("nustatymai išsaugoti");
        console.log("saving");
    };
    UserSettingsComponent.prototype.cancelSettings = function () {
        this._notificationService.error("nustatymai neišsaugoti");
    };
    UserSettingsComponent = __decorate([
        core_1.Component({
            selector: 'user-settings',
            templateUrl: './app/userItems/user-settings.component.html',
            directives: [editable_item_component_1.EditableItemComponent],
            providers: [user_settings_mock_1.UserSettingsMock]
        })
    ], UserSettingsComponent);
    return UserSettingsComponent;
}());
exports.UserSettingsComponent = UserSettingsComponent;
//# sourceMappingURL=user-settings.component.js.map