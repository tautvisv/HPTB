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
var travel_service_1 = require('./travel/travel.service');
var misc_service_1 = require('./services/misc.service');
var account_service_1 = require('./services/account.service');
var main_app_component_1 = require('./main-app.component');
var notificationOptions = {
    autoDismiss: true,
    positionClass: 'toast-top-right',
};
browser_1.bootstrap(main_app_component_1.MainApp, [ng2_toastr_1.ToastsManager, travel_service_1.TravelService, misc_service_1.MiscService, account_service_1.AccountService, core_1.provide(ng2_toastr_2.ToastOptions, { useValue: new ng2_toastr_2.ToastOptions(notificationOptions) }), Constants_1.Constants, http_1.HTTP_PROVIDERS]); //
//# sourceMappingURL=main.js.map