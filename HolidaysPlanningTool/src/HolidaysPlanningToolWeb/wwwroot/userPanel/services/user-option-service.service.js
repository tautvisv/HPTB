"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var user_items_mock_1 = require("./user-items-mock");
var core_1 = require('angular2/core');
var UserOptionService = (function () {
    function UserOptionService() {
    }
    UserOptionService.prototype.GetAllUserOptions = function () {
        return user_items_mock_1.USERITEM;
    };
    UserOptionService.prototype.testOptions = function () {
        for (var i = 0; i < user_items_mock_1.USERITEM.items.length; i++) {
            console.log("testing users:", user_items_mock_1.USERITEM.items[i].title);
        }
    };
    UserOptionService = __decorate([
        core_1.Injectable()
    ], UserOptionService);
    return UserOptionService;
}());
exports.UserOptionService = UserOptionService;
//# sourceMappingURL=user-option-service.service.js.map