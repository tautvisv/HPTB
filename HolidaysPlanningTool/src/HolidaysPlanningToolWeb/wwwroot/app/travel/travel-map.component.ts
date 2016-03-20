import {Component, OnInit } from 'angular2/core';
import { NotificationService } from '../utils/notification.service';


@Component({
    selector: 'travel-map',
    templateUrl: './app/travel/travel-map.component.html',
    directives: [],
    providers: []
})
export class TravelMapComponent implements OnInit {

    constructor(private _notificationService: NotificationService) {

    }
    saveSettings(): void {

    }
    cancelSettings(): void {
        this._notificationService.info("nustatymai neišsaugoti");
    }
    ngOnInit() {

    }
}