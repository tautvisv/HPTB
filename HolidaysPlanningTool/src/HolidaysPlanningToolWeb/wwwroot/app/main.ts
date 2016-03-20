/// <reference path="main-app.component.ts" />
import {bootstrap}  from 'angular2/platform/browser';
import {MainApp} from './main-app.component';
import {NotificationService, Alerts} from './utils/notification.service';
import {MyNumber} from './utils/mock-data.service';

bootstrap(MainApp, [NotificationService, Alerts ]);