"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var user_settings_1 = require('./user-settings');
var core_1 = require('angular2/core');
var UserSettingsMock = (function () {
    function UserSettingsMock() {
        this.name = new user_settings_1.UserSettingsItem("Vardas", "Tautvydas", "name", "vartotojo vardas", ".*");
        this.surname = new user_settings_1.UserSettingsItem("Pavardė", "Vaitiekūnas", "surname", "vartotojo pavardė", ".*");
        this.address = new user_settings_1.UserSettingsItem("Adresas", "Tauro g. 13", "address", "Vartotojo adresas", ".*");
        this.phone = new user_settings_1.UserSettingsItem("Telefonas", "+37069958876", "phone", "Vartotojo numeris", "[\\+]?\\d{5,15}");
        this.description = new user_settings_1.UserSettingsItem("Apie", "Programuotojas", "description", "Vartotojo trumpas aprašymas", ".*");
        this.extra_info = new user_settings_1.UserSettingsItem("Informacija", "Kuriu programą", "extra_info", "Papildoma informacija apie vartotoją", ".*");
        this.email = new user_settings_1.UserSettingsItem("El. paštas", "tautvisv@gmail.com", "email", "vartotojo paštas", "[a-zA-Z0-9]*@[a-zA-Z0-9]*");
    }
    UserSettingsMock = __decorate([
        core_1.Injectable()
    ], UserSettingsMock);
    return UserSettingsMock;
}());
exports.UserSettingsMock = UserSettingsMock;
//# sourceMappingURL=user-settings-mock.js.map