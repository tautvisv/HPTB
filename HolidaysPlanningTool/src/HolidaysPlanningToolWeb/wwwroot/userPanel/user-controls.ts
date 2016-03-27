import {bootstrap}  from 'angular2/platform/browser';
import {UserPanel} from './user-panel.component';
//import {NotificationService} from '../app/utils/notification.service';
import {MyNumber} from './../app/utils/mock-data.service';

bootstrap(UserPanel, [ MyNumber]);