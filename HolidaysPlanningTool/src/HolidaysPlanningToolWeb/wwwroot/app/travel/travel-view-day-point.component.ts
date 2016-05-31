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

    ngOnInit() {
        if (this.point.Duration) {
            var date = new Date(this.point.Duration.toString());
            this.point.Duration = date.getHours() + ":" + date.getMinutes();
        }
    }
}