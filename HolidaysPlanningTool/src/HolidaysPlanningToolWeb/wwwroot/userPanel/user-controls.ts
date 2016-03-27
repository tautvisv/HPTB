import {bootstrap}  from 'angular2/platform/browser';
import {UserPanel} from './user-panel.component';
import {MyNumber} from './../app/utils/mock-data.service';

bootstrap(UserPanel, [NotificationService, MyNumber]);