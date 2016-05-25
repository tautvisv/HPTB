"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var user_settings_item_component_1 = require('./user-settings-item.component');
var user_settings_service_1 = require('../services/user-settings.service');
var user_settings_1 = require('./user-settings');
var Constants_1 = require('../utils/Constants');
var file_upload_service_1 = require('../services/file-upload.service');
var UserSettingsComponent = (function () {
    function UserSettingsComponent(_settingsService, _notificationService, router) {
        this._settingsService = _settingsService;
        this._notificationService = _notificationService;
        this.router = router;
        this.userInfo = new user_settings_1.UserSettingsViewItem();
        this.uploadService = new file_upload_service_1.UploadService();
        this.uploadService.progress$.subscribe(function (data) {
            console.log('progress = ' + data);
        });
    }
    UserSettingsComponent.prototype.onChange = function (event) {
        var _this = this;
        console.log('onChange');
        var files = event.srcElement.files;
        if (!files.length) {
            return;
        }
        console.log(files);
        this.uploadService.makeFileRequest('/api/PhotoUpload/UploadUserPhoto', [], files).subscribe(function (photoUrl) {
            console.log('sent', photoUrl);
            _this.userInfo.image.fullUrl = Constants_1.Constants.WebAPI + photoUrl;
            _this.userInfo.image.url = photoUrl;
        });
    };
    UserSettingsComponent.prototype.validateUserSettings = function (userSettings) {
        if (!userSettings.Email) {
            this._notificationService.error("Elektroninis paštas yra privalomas laukas");
            return false;
        }
        return true;
    };
    UserSettingsComponent.prototype.saveSettings = function () {
        var _this = this;
        //TODO createuserSettings
        var userSettings = this.userInfo.getUserSettings();
        if (!this.validateUserSettings(userSettings)) {
            return;
        }
        this._settingsService.saveUserSettings(userSettings).subscribe(function (res) {
            _this._notificationService.success("Vartotojo informacija atnaujinta, atsakas iš serverio.");
            _this.router.navigate(["ToursList"]);
        }, function (err) {
            var message = "";
            if (err) {
                var response = err.json();
                message = (response && response.Message) ? response.Message : "";
            }
            _this._notificationService.error("Atnaujinti vartotojo duomenų nepavyko. " + message);
        });
    };
    UserSettingsComponent.prototype.cancelSettings = function () {
        this._notificationService.info("nustatymai neišsaugoti");
        this.router.navigate(["ToursList"]);
    };
    UserSettingsComponent.prototype.refreshFields = function () {
        $(".component").find("input").change();
    };
    UserSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._settingsService.getUserSettingsData().subscribe(function (res) {
            _this.userInfo.createFromUserSettings(res);
            //TODO fix it
            setTimeout(_this.refreshFields, 200);
        }, function (err) { return _this._notificationService.error("Gauti vartotojo duomenų nepavyko: kodas: " + err.status); });
    };
    UserSettingsComponent = __decorate([
        core_1.Component({
            selector: 'user-settings',
            templateUrl: './app/userItems/user-settings.component.html',
            directives: [user_settings_item_component_1.UserSettingsItemComponent],
            providers: [user_settings_service_1.UserSettingsService]
        })
    ], UserSettingsComponent);
    return UserSettingsComponent;
}());
exports.UserSettingsComponent = UserSettingsComponent;
//# sourceMappingURL=user-settings.component.js.map