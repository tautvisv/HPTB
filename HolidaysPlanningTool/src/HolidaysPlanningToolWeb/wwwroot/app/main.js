/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="main-app.component.ts" />
/// <reference path="jquery.d.ts" />
"use strict";
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var Constants_1 = require('./utils/Constants');
var http_1 = require('angular2/http');
//import {MyNumber} from './utils/mock-data.service';
//import {NotificationService, Alerts} from './utils/notification.service';
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_toastr_2 = require("ng2-toastr/ng2-toastr");
var travel_service_1 = require('./services/travel.service');
var misc_service_1 = require('./services/misc.service');
var account_service_1 = require('./services/account.service');
var http_authorized_1 = require('./services/http-authorized');
var global_emmiter_1 = require('./services/global-emmiter');
var main_app_component_1 = require('./main-app.component');
var notificationOptions = {
    autoDismiss: true,
    positionClass: 'toast-top-right',
};
browser_1.bootstrap(main_app_component_1.MainApp, [ng2_toastr_1.ToastsManager, travel_service_1.TravelService, misc_service_1.MiscService, account_service_1.AccountService, http_authorized_1.httpAuthorized, global_emmiter_1.TodoService,
    core_1.provide(ng2_toastr_2.ToastOptions, { useValue: new ng2_toastr_2.ToastOptions(notificationOptions) }), Constants_1.Constants, http_1.HTTP_PROVIDERS]); //
//# sourceMappingURL=main.js.map