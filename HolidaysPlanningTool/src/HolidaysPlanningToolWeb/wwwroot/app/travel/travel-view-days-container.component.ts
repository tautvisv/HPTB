import {Component, OnInit, EventEmitter, Input, Output } from 'angular2/core';
import { TravelClass } from "./TravelClass";
import { TravelViewDaysItemComponent } from './travel-view-days-item.component';

@Component({
    selector: 'travel-days-container',
    templateUrl: './app/travel/travel-view-days-container.component.html',
    providers: [],
    directives: [TravelViewDaysItemComponent]
})
export class TravelViewDaysContainerComponent implements OnInit {
    @Output("show-route")
    showRouteFunction = new EventEmitter();

    @Input("days")
    days: TravelClass[];

    private itemsContainer: HTMLElement;
    constructor() {

    }
    public findRoute(travel: TravelClass): void {
        this.showRouteFunction.emit(travel.TravelDays);
    }

    scrollDetails(right: boolean) {
        var scroll = right ? 300 : -300;
        this.itemsContainer.scrollLeft += scroll;
    }
    ngOnInit() {
        this.itemsContainer = document.getElementById("travel_days_details");
    }
}
