/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="main-app.component.ts" />
/// <reference path="jquery.d.ts" />

import {bootstrap}  from 'angular2/platform/browser';
import {provide} from 'angular2/core';

import {Constants} from './utils/Constants';
import {HTTP_PROVIDERS} from 'angular2/http';
    
//import {MyNumber} from './utils/mock-data.service';
//import {NotificationService, Alerts} from './utils/notification.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from "ng2-toastr/ng2-toastr";
import { TravelService } from './services/travel.service';
import { MiscService } from './services/misc.service';
import { AccountService } from './services/account.service';
import {Http } from 'angular2/http';
import {httpAuthorized} from './services/http-authorized';
//import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt/angular2-jwt';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from './services/angular2-jwt';

import {MainApp} from './main-app.component';

let notificationOptions = {
    autoDismiss: true,
    positionClass: 'toast-top-right',

};

bootstrap(MainApp, [ToastsManager, TravelService, MiscService, AccountService, httpAuthorized,
    provide(ToastOptions, { useValue: new ToastOptions(notificationOptions) }), Constants, HTTP_PROVIDERS]); //