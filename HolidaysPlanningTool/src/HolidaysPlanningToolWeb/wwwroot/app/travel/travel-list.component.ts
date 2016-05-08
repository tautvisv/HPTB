import {Component, OnInit, Input, Output, OnChanges, ViewChild, EventEmitter } from 'angular2/core';
import { Pager, Point, FullTravel, TravelDayPlan, UserLocation } from "./TravelClass";
import { PaggingComponent } from "../utils/pagging.component";
import { TravelItemComponent } from './travel-item.component';


@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-list',
    // Location of the template for this component
    templateUrl: './app/travel/travel-list.component.html',
    directives: [TravelItemComponent, PaggingComponent]
})
export class TravelListComponent implements OnInit {
    @Input() travels: Pager<FullTravel>;
    @Input() title: string;
    @Output() pagerEvent = new EventEmitter();

    constructor() {

    }
    changePage(event) {
        console.log("pageIschangeing", event);
        this.pagerEvent.emit(event);
    }
    ngOnInit() {
        
    }
}