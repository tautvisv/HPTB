"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var account_service_1 = require('../services/account.service');
var RegisterComponent = (function () {
    function RegisterComponent(accountService, notificationsService, router) {
        this.accountService = accountService;
        this.notificationsService = notificationsService;
        this.router = router;
        this.user = new account_service_1.UserRegisterModel();
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.Register = function () {
        var _this = this;
        var valid = this.user.isValid();
        switch (valid) {
            case (-32):
                this.notificationsService.error("Slaptažodis privalo turėti bent vieną skaitmenį ir raidę");
                break;
            case (-31):
                this.notificationsService.error("Slaptažodis turi būti bent 6 simbolių ilgio");
                break;
            case (-30):
                this.notificationsService.error("Slaptažodis yra privalomas ir pakartotas slaptažodis privalo sutapti");
                break;
            case (-20):
                this.notificationsService.error("El. paštas yra privalomas");
                break;
            case (-21):
                this.notificationsService.error("El. pašto blogas formatas");
                break;
            case (-10):
                this.notificationsService.error("Vartotojo vardas ir prisijungimo vardas yra privalomas");
                break;
            case (1):
                this.accountService.register(this.user).subscribe(function (result) {
                    _this.notificationsService.success("Jūs sėkmingai susikūrėti savo paskyrą");
                    _this.router.navigate(["ToursList"]);
                }, function (err) {
                    var message = "";
                    if (err) {
                        var response = err.json();
                        message = (response && response.Message) ? ". " + response.Message : "";
                    }
                    _this.notificationsService.error("Sukurti paskyros nepaviko" + message);
                });
                break;
            default:
                this.notificationsService.error("Nenumatyta klaida, praneškite sistemos administratoriui");
                break;
        }
    };
    RegisterComponent.prototype.back = function () {
        this.router.navigate(["ToursList"]);
    };
    RegisterComponent.prototype.ngAfterViewInit = function () {
        $("input").change();
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'account-register',
            templateUrl: './app/account/account-register.component.html'
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=account-register.component.js.map