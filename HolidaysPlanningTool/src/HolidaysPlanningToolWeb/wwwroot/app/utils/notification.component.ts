import {Component, Input, OnInit } from 'angular2/core'
import { Alerts } from './notification.service';
import { ProgressBar } from './progress/progress-bar.component';

@Component({
    selector: 'notification-el',
    template: `
    <div class="bs-component">
        <progress-bar duration="10000" (callback)="removeItem(alerdata)"></progress-bar>
        <div class="my-alert my-alert-dismissible" ngClass="{{alerdata.type}}">
            <button type="button" class="close" data-dismiss="alert" (click)="removeItem(alerdata)">×</button>
            {{alerdata.notification}}
        </div>
    </div>
    `,
    directives: [ProgressBar]
})
class NotificationEl implements OnInit {
    constructor(private notifications: Alerts) {
        console.warn("init NotificationComponent");
    }
    @Input() alerdata;
    duration: number = 25;
    removeItem(item): void {
        var result = this.notifications.removeItem(item);
    }
    ngOnInit() {
    }
}

@Component({
    selector: 'notification',
    templateUrl: "./app/utils/notification.component.html",
    directives: [NotificationEl]
})
export class NotificationComponent {
    constructor(private notifications: Alerts) {
    }
}