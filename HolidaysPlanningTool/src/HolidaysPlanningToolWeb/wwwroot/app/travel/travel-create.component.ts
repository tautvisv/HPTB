import {Component, OnInit } from 'angular2/core';
import { NotificationService } from '../utils/notification.service';
import { TravelMapComponent } from './travel-map.component';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

@Component({
    selector: 'travel',
    templateUrl: './app/travel/travel-create.component.html',
    directives: [TravelMapComponent],
    providers: []
})
export class TravelComponent implements OnInit {

    constructor(private _notificationService: NotificationService, private router: Router) {
        
    }
    saveSettings(): void {
        
    }
    cancelSettings(): void {
        this._notificationService.info("nustatymai neišsaugoti");
    }
    ngOnInit() {

    }
}