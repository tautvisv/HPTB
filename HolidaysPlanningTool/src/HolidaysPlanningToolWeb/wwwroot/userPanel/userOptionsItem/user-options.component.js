"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var component_header_component_1 = require('../../app/utils/component-header.component');
var router_1 = require('angular2/router');
var UserOptionsItem = (function () {
    function UserOptionsItem() {
    }
    UserOptionsItem = __decorate([
        core_1.Component({
            selector: 'user-options-item',
            directives: [component_header_component_1.HeaderComponent, router_1.ROUTER_DIRECTIVES],
            templateUrl: "./userPanel/userOptionsItem/user-options.component.html",
            providers: [router_1.ROUTER_PROVIDERS],
            inputs: ['option']
        })
    ], UserOptionsItem);
    return UserOptionsItem;
}());
exports.UserOptionsItem = UserOptionsItem;
//# sourceMappingURL=user-options.component.js.map