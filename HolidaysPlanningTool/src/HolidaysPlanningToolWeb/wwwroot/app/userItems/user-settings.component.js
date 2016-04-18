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
var Rx_1 = require('rxjs/Rx');
var UploadService = (function () {
    function UploadService() {
        var _this = this;
        this.serverUrl = Constants_1.Constants.WebAPI;
        this.progress$ = Rx_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    UploadService.prototype.makeFileRequest = function (url, params, files) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("file", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                _this.progressObserver.next(_this.progress);
            };
            xhr.open('POST', _this.serverUrl + url, true);
            xhr.send(formData);
        });
    };
    return UploadService;
}());
exports.UploadService = UploadService;
var UserSettingsComponent = (function () {
    function UserSettingsComponent(_settingsService, _notificationService, router) {
        this._settingsService = _settingsService;
        this._notificationService = _notificationService;
        this.router = router;
        this.userInfo = new user_settings_1.UserSettingsViewItem();
        this.uploadService = new UploadService();
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
        this.uploadService.makeFileRequest('/api/Mock/UploadUserPhoto', [], files).subscribe(function (photoUrl) {
            console.log('sent', photoUrl);
            _this.userInfo.image = Constants_1.Constants.WebAPI + photoUrl;
        });
    };
    UserSettingsComponent.prototype.saveSettings = function () {
        var _this = this;
        this._settingsService.saveUserSettings({ test: "yra test" }).subscribe(function (res) {
            _this._notificationService.success("Vartotojo informacija atnaujinta, atsakas iš serverio: ");
            _this.router.navigate(["ToursList"]);
        }, function (err) { _this._notificationService.error("Atnaujinti vartotojo duomenų nepavyko: kodas: " + err.status); });
    };
    UserSettingsComponent.prototype.cancelSettings = function () {
        this._notificationService.info("nustatymai neišsaugoti");
        this.router.navigate(["ToursList"]);
    };
    UserSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._settingsService.getUserSettingsData(51).subscribe(function (res) {
            _this.userInfo.createFromUserSettings(res);
            _this._notificationService.success("Vartotojo informacija užkrauta, atsakas iš serverio: ");
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