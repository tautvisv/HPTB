"use strict";
/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="main-app.component.ts" />
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var Constants_1 = require('./utils/Constants');
var http_1 = require('angular2/http');
//import {MyNumber} from './utils/mock-data.service';
//import {NotificationService, Alerts} from './utils/notification.service';
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_toastr_2 = require("ng2-toastr/ng2-toastr");
var main_app_component_1 = require('./main-app.component');
var notificationOptions = {
    autoDismiss: false,
    positionClass: 'toast-top-right',
};
browser_1.bootstrap(main_app_component_1.MainApp, [ng2_toastr_1.ToastsManager, core_1.provide(ng2_toastr_2.ToastOptions, { useValue: new ng2_toastr_2.ToastOptions(notificationOptions) }), Constants_1.Constants, http_1.HTTP_PROVIDERS]); //
//# sourceMappingURL=main.js.map