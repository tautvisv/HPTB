import {Component, Input } from 'angular2/core';
import { TravelDayPlan} from "./TravelClass";


@Component({
    selector: 'travel-day-point',
    templateUrl: './app/travel/travel-view-day-point.component.html',
    providers: [],
    directives: []
})
export class TravelViewDayPointComponent {
    @Input("point")
    point: TravelDayPlan;

    constructor() {

    }
}