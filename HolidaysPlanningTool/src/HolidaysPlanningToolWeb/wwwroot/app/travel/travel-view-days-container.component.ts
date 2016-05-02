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

        this.scrollTo(this.itemsContainer, this.itemsContainer.scrollLeft + scroll, 300);
    }
    private scrollTo(element: HTMLElement, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollLeft;
        var perTick = difference / duration * 10;

        setTimeout(function () {
            element.scrollLeft = element.scrollLeft + perTick;
            if (element.scrollLeft === to) return;
            this.scrollTo(element, to, duration - 10);
        }, 10);
    }
    ngOnInit() {
        this.itemsContainer = document.getElementById("travel_days_details");
    }
}
