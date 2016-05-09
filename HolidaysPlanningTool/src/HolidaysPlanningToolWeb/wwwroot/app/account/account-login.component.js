"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var LoginComponent = (function () {
    function LoginComponent(accountService, notificationsService, router) {
        this.accountService = accountService;
        this.notificationsService = notificationsService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.accountService.login(this.name, this.password).subscribe(function (result) {
            _this.notificationsService.success("Jūs sėkmingai prisijungėte");
            _this.router.navigate(["ToursList"]);
        }, function () {
            _this.notificationsService.error("Prisijungti nepavyko");
        });
    };
    LoginComponent.prototype.back = function () {
        this.router.navigate(["ToursList"]);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'account-login',
            templateUrl: './app/account/account-login.component.html'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=account-login.component.js.map