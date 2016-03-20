"use strict";
/// <reference path="main-app.component.ts" />
var browser_1 = require('angular2/platform/browser');
var main_app_component_1 = require('./main-app.component');
var notification_service_1 = require('./utils/notification.service');
browser_1.bootstrap(main_app_component_1.MainApp, [notification_service_1.NotificationService, notification_service_1.Alerts]);
//# sourceMappingURL=main.js.map