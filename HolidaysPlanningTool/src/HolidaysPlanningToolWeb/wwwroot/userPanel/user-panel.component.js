"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var component_header_component_1 = require('../app/utils/component-header.component');
var user_option_service_service_1 = require('./services/user-option-service.service');
var user_options_component_1 = require('./userOptionsItem/user-options.component');
var UserPanel = (function () {
    function UserPanel(_userOptionService) {
        this._userOptionService = _userOptionService;
        this.title = '';
    }
    UserPanel.prototype.ngOnInit = function () {
        this.optionsList = this._userOptionService.GetAllUserOptions();
        this.title = 'User Panel';
    };
    UserPanel = __decorate([
        core_1.Component({
            selector: 'user-panel',
            directives: [component_header_component_1.HeaderComponent, user_options_component_1.UserOptionsItem, common_1.NgClass],
            templateUrl: "./userPanel/user-panel.component.html",
            providers: [user_option_service_service_1.UserOptionService]
        })
    ], UserPanel);
    return UserPanel;
}());
exports.UserPanel = UserPanel;
//# sourceMappingURL=user-panel.component.js.map