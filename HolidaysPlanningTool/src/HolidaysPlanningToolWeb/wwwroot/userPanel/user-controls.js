"use strict";
var browser_1 = require('angular2/platform/browser');
var user_panel_component_1 = require('./user-panel.component');
//import {NotificationService} from '../app/utils/notification.service';
var mock_data_service_1 = require('./../app/utils/mock-data.service');
browser_1.bootstrap(user_panel_component_1.UserPanel, [mock_data_service_1.MyNumber]);
//# sourceMappingURL=user-controls.js.map