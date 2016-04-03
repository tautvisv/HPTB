import {Component, OnInit, Input } from 'angular2/core';
import { Point, TravelClass, TravelDayPlan, UserLocation } from "./TravelClass";

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-day-item-component',
    // Location of the template for this component
    templateUrl: './app/travel/travel-day-item component.html',
    directives: []
})
export class TravelDayComponent implements OnInit {
    @Input() travel: TravelClass;
    constructor() {
        
    }

    ngOnInit() {

    }
}