import {Component, OnInit, Input } from 'angular2/core';
import { Point, TravelClass, TravelDayPlan, UserLocation, ILocationPoint } from "./TravelClass";
import {RouterLink} from "angular2/router";

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-cities-item',
    // Location of the template for this component
    template: `<div class="travel-item-cities"></div>`,
    directives: []
})
export class TravelCitiesItemComponent implements OnInit {
    @Input() travel: ILocationPoint;
    private cities: string[];
    private couneter = 0;
    constructor() {
        this.cities = [];
    }

    ngOnInit() {

    }
}

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-item',
    // Location of the template for this component
    templateUrl: './app/travel/travel-item.component.html',
    directives: [RouterLink, TravelCitiesItemComponent]
})
export class TravelItemComponent implements OnInit {
    @Input() travel: TravelClass;

    constructor() {
    }

    ngOnInit() {

    }
}
