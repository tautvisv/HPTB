"use strict";
var browser_1 = require('angular2/platform/browser');
var user_panel_component_1 = require('./user-panel.component');
var notification_service_1 = require('../app/utils/notification.service');
var mock_data_service_1 = require('./../app/utils/mock-data.service');
browser_1.bootstrap(user_panel_component_1.UserPanel, [notification_service_1.NotificationService, mock_data_service_1.MyNumber]);
//# sourceMappingURL=user-controls.js.map