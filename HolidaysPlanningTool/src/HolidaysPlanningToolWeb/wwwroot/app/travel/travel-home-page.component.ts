import {Component, OnInit, Input } from 'angular2/core';
import { FullTravel } from "./TravelClass";
import { TravelService } from '../services/travel.service';
import { TravelListComponent } from './travel-list.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

class TravelsInformation {
    public NewTravels: FullTravel[];
    public TravelList: FullTravel[];
    public RecommendedTravels: FullTravel[];
}


@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-main-component',
    // Location of the template for this component
    templateUrl: './app/travel/travel-home-page.component.html',
    directives: [TravelListComponent]
})
export class TravelHomePageComponent implements OnInit {
    private TravelInformation: TravelsInformation;
    constructor(private notificationManager: ToastsManager, private travelService: TravelService) {
        this.TravelInformation = new TravelsInformation();
    }

    ngOnInit() {
        this.travelService.getRecentTravels("test").subscribe((travels) => {
                this.TravelInformation.NewTravels = travels;
            },
            () => {
                this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            });
        this.travelService.getTravels("test").subscribe((travels) => {
            this.TravelInformation.TravelList = travels;
        },
            () => {
                this.notificationManager.error("Nepavyko užkrauti kelionių sąrašo");
            });
    }
}