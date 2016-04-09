import {Component, OnInit, Input } from 'angular2/core';
import { Point, TravelClass, TravelDayPlan, UserLocation } from "./TravelClass";
import { TravelItemComponent } from './travel-item.component';

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-list',
    // Location of the template for this component
    templateUrl: './app/travel/travel-list.component.html',
    directives: [TravelItemComponent]
})
export class TravelListComponent implements OnInit {
    @Input() travels: TravelClass[];
    @Input() title: string;
    constructor() {

    }

    ngOnInit() {

    }
}