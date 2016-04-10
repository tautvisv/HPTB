"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var LogoutComponent = (function () {
    function LogoutComponent(accountService, notificationsService, router) {
        this.accountService = accountService;
        this.notificationsService = notificationsService;
        this.router = router;
    }
    LogoutComponent.prototype.ngOnInit = function () {
    };
    LogoutComponent.prototype.logout = function () {
        var _this = this;
        this.accountService.logout().subscribe(function () {
            _this.notificationsService.success("Jūs sėkmingai atsijungėte");
            _this.router.navigate(["Login"]);
        }, function () {
            _this.notificationsService.error("Atsijungti nepavyko. Praneškite sistemaos administratoriui");
        });
    };
    LogoutComponent = __decorate([
        core_1.Component({
            selector: 'account-logout',
            templateUrl: './app/account/account-logout.component.html',
            directives: []
        })
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=account-logout.component.js.map