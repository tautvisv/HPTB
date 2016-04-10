import {Component, OnInit, Input } from 'angular2/core';
import { Point, TravelClass, TravelDayPlan, UserLocation } from "./TravelClass";
import {RouterLink} from "angular2/router";

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-item',
    // Location of the template for this component
    templateUrl: './app/travel/travel-item.component.html',
    directives: [RouterLink]
})
export class TravelItemComponent implements OnInit {
    @Input() travel: TravelClass;

    constructor() {

    }

    ngOnInit() {

    }
}