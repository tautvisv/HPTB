"use strict";
var Constants_1 = require('../utils/Constants');
var UserSettingsItem = (function () {
    function UserSettingsItem(title, value, valueName, hint, pattern) {
        this.title = title;
        this.value = value;
        this.valueName = valueName;
        this.hint = hint;
        this.pattern = pattern;
    }
    return UserSettingsItem;
}());
exports.UserSettingsItem = UserSettingsItem;
var UserSettings = (function () {
    function UserSettings() {
    }
    return UserSettings;
}());
exports.UserSettings = UserSettings;
//TOOd remove this comment
//http://localhost:37096/
var UserSettingsViewItem = (function () {
    function UserSettingsViewItem() {
        this.name = new UserSettingsItem("", "", "", "", ".*");
        this.surname = new UserSettingsItem("", "", "", "", ".*");
        this.address = new UserSettingsItem("", "", "", "", ".*");
        this.phone = new UserSettingsItem("", "", "", "", "[\\+]?\\d{5,15}");
        this.description = new UserSettingsItem("", "", "", "", ".*");
        this.extra_info = new UserSettingsItem("", "", "", "", ".*");
        this.email = new UserSettingsItem("", "", "", "", "[a-zA-Z0-9]*@[a-zA-Z0-9.]*");
        this.image = { fullUrl: "", url: "" };
    }
    UserSettingsViewItem.prototype.createFromUserSettings = function (userSettings) {
        this.name = new UserSettingsItem("Vardas", userSettings.Name, "name", "vartotojo vardas", ".*");
        this.surname = new UserSettingsItem("Pavardė", userSettings.Surname, "surname", "vartotojo pavardė", ".*");
        this.address = new UserSettingsItem("Adresas", userSettings.Address, "address", "Vartotojo adresas", ".*");
        this.phone = new UserSettingsItem("Telefonas", userSettings.Phone, "phone", "Vartotojo numeris", "[\\+]?\\d{5,15}");
        this.description = new UserSettingsItem("Apie", userSettings.Description, "description", "Vartotojo trumpas aprašymas", ".*");
        this.extra_info = new UserSettingsItem("Informacija", userSettings.ExtraInfo, "extra_info", "Papildoma informacija apie vartotoją", ".*");
        this.email = new UserSettingsItem("El. paštas", userSettings.Email, "email", "vartotojo paštas", "[a-zA-Z0-9]*@[a-zA-Z0-9]*");
        this.image.fullUrl = Constants_1.Constants.WebUrl + userSettings.ImageUrl;
        this.image.url = userSettings.ImageUrl;
    };
    UserSettingsViewItem.prototype.getUserSettings = function () {
        var settings = new UserSettings();
        settings.Address = this.address.value;
        settings.Description = this.description.value;
        settings.Email = this.email.value;
        settings.ExtraInfo = this.extra_info.value;
        settings.ImageUrl = this.image.url;
        settings.Name = this.name.value;
        settings.Phone = this.phone.value;
        settings.Surname = this.surname.value;
        return settings;
    };
    return UserSettingsViewItem;
}());
exports.UserSettingsViewItem = UserSettingsViewItem;
//# sourceMappingURL=user-settings.js.map