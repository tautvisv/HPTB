import {Component, OnInit, Input } from 'angular2/core';
import { Point, FullTravel, TravelDayPlan, UserLocation, ILocationPoint, Author } from "./TravelClass";
import {RouterLink} from "angular2/router";


@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-item-author',
    // Location of the template for this component
    // templateUrl: './app/travel/travel-item.component.html',
    template: `<div class="travel-item-details">
        <img src="{{author.ImageUrl}}" alt="" class="author-icon">
        <div class="travel-item-details">
            <div class="travel-item-name">{{title}}</div>
            <div>Autorius: {{author.Name}}</div>
            <!--<travel-cities-item [travel]="travel"></travel-cities-item>-->
        </div>
    </div>`,
    directives: []
})
export class TravelItemAuthorComponent implements OnInit {
    @Input() author: Author;
    @Input() title: string;

    constructor() {
    }

    ngOnInit() {

    }
}

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
    directives: [RouterLink, TravelCitiesItemComponent, TravelItemAuthorComponent]
})
export class TravelItemComponent implements OnInit {
    @Input() travel: FullTravel;

    constructor() {
    }

    ngOnInit() {

    }
}