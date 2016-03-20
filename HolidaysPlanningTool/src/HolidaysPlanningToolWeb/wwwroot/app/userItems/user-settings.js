"use strict";
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
var UserSettingsViewItem = (function () {
    function UserSettingsViewItem() {
        this.name = new UserSettingsItem("", "", "", "", ".*");
        this.surname = new UserSettingsItem("", "", "", "", ".*");
        this.address = new UserSettingsItem("", "", "", "", ".*");
        this.phone = new UserSettingsItem("", "", "", "", "[\\+]?\\d{5,15}");
        this.description = new UserSettingsItem("", "", "", "", ".*");
        this.extra_info = new UserSettingsItem("", "", "", "", ".*");
        this.email = new UserSettingsItem("", "", "", "", "[a-zA-Z0-9]*@[a-zA-Z0-9]*");
    }
    UserSettingsViewItem.prototype.createFromUserSettings = function (userSettings) {
        this.name = new UserSettingsItem("Vardas", userSettings.name, "name", "vartotojo vardas", ".*");
        this.surname = new UserSettingsItem("Pavardė", userSettings.surname, "surname", "vartotojo pavardė", ".*");
        this.address = new UserSettingsItem("Adresas", userSettings.address, "address", "Vartotojo adresas", ".*");
        this.phone = new UserSettingsItem("Telefonas", userSettings.phone, "phone", "Vartotojo numeris", "[\\+]?\\d{5,15}");
        this.description = new UserSettingsItem("Apie", userSettings.description, "description", "Vartotojo trumpas aprašymas", ".*");
        this.extra_info = new UserSettingsItem("Informacija", userSettings.extra_info, "extra_info", "Papildoma informacija apie vartotoją", ".*");
        this.email = new UserSettingsItem("El. paštas", userSettings.email, "email", "vartotojo paštas", "[a-zA-Z0-9]*@[a-zA-Z0-9]*");
    };
    return UserSettingsViewItem;
}());
exports.UserSettingsViewItem = UserSettingsViewItem;
//# sourceMappingURL=user-settings.js.map