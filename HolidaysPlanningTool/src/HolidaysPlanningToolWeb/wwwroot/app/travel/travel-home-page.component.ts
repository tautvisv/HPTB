import {Component, OnInit, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { FullTravel } from "./TravelClass";
import { TravelService } from '../services/travel.service';
import { TravelListComponent } from './travel-list.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

class TravelsInformation {
    public NewTravels: FullTravel[];
    public TravelList: FullTravel[];
    public RecommendedTravels: FullTravel[];
    public LikedTravels: FullTravel[];
    public ViewedTravels: FullTravel[]; 
    public SearchedTravels: FullTravel[]; 
    public UserTravels: FullTravel[]; 
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
    constructor(private notificationManager: ToastsManager, private travelService: TravelService, private router: RouteParams) {
        this.TravelInformation = new TravelsInformation();
    }

    ngOnInit() {

        //this.router.get
        var type = this.router.get("type");
        if (type) type = type.toLocaleLowerCase();
        console.log("type yra: ", type, " toks");
        var count = parseInt(this.router.get("count"));
        switch (type) {
            case "viewed":
                this.travelService.getViewedTravels(count).subscribe((travels) => {
                    this.TravelInformation.ViewedTravels = travels;
                },
                    () => {
                        this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
                    });
                break;
            case "liked":
                this.travelService.getLikedTravels(count).subscribe((travels) => {
                    this.TravelInformation.LikedTravels = travels;
                },
                    () => {
                        this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
                    });
                break;
            case "search":
                var searchPhrase = this.router.get("count");
                this.travelService.search(searchPhrase).subscribe((travels) => {
                    this.TravelInformation.SearchedTravels = travels;
                },
                    () => {
                        this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
                    });
                break;
            case "top":
                break;
            default:
                this.travelService.getRecentTravels(5).subscribe((travels) => {
                    this.TravelInformation.NewTravels = travels;
                },
                    () => {
                        this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
                    });
                this.travelService.getUserTravels(5).subscribe((travels) => {
                    this.TravelInformation.UserTravels = travels;
                },
                    () => {
                        this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
                    });
        }

        //this.travelService.getTravels("test").subscribe((travels) => {
        //    this.TravelInformation.TravelList = travels;
        //},
        //    () => {
        //        this.notificationManager.error("Nepavyko užkrauti kelionių sąrašo");
        //    });
    }
}