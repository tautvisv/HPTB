import {Component, Input } from 'angular2/core';
import { TravelClass } from "./TravelClass";
import { TravelViewDayPointComponent } from './travel-view-day-point.component';

@Component({
    selector: 'travel-days-item',
    templateUrl: './app/travel/travel-view-days-item.component.html',
    providers: [],
    directives: [TravelViewDayPointComponent]
})
export class TravelViewDaysItemComponent {
    @Input("travel-day")
    travelDay: TravelClass;

    constructor() {

    }
}