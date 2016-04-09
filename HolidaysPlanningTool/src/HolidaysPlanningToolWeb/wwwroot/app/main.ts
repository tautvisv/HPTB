/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="main-app.component.ts" />
import {bootstrap}  from 'angular2/platform/browser';
import {provide} from 'angular2/core';

import {Constants} from './utils/Constants';
import {HTTP_PROVIDERS} from 'angular2/http';

//import {MyNumber} from './utils/mock-data.service';
//import {NotificationService, Alerts} from './utils/notification.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from "ng2-toastr/ng2-toastr";
import { TravelService } from './travel/travel.service';
import { MiscService } from './services/misc.service';

import {MainApp} from './main-app.component';

let notificationOptions = {
    autoDismiss: true,
    positionClass: 'toast-top-right',

};

bootstrap(MainApp, [ToastsManager, TravelService, MiscService, provide(ToastOptions, { useValue: new ToastOptions(notificationOptions) }), Constants, HTTP_PROVIDERS]); //