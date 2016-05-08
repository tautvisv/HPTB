import {Component, OnInit, Input } from 'angular2/core';
import { RouteParams, Route, Router } from 'angular2/router';
import { FullTravel, Pager } from "./TravelClass";
import { TravelService } from '../services/travel.service';
import { TravelListComponent } from './travel-list.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

class TravelsInformation {
    public NewTravels: Pager<FullTravel>;
    public TravelList: Pager<FullTravel>;
    public RecommendedTravels: Pager<FullTravel>;
    public LikedTravels: Pager<FullTravel>;
    public ViewedTravels: Pager<FullTravel>; 
    public SearchedTravels: Pager<FullTravel>; 
    public UserTravels: Pager<FullTravel>; 
}

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travels-liked-by-user',
    // Location of the template for this component
    //templateUrl: './app/travel/travel-home-page.component.html',
    template: `<div class="travel-container"><travel-list *ngIf="pagedTravels" [travels]="pagedTravels" [title]="'Patinkačios kelionės'" (pagerEvent)="pagerEvent($event)"></travel-list></div>`,
    directives: [TravelListComponent]
})
export class TravelsLikedComponent implements OnInit {
    private pagedTravels = new Pager<FullTravel>();
    constructor(private notificationManager: ToastsManager, private travelService: TravelService, private routeParams: RouteParams, private router: Router) {

    }

    ngOnInit() {
        var page = parseInt(this.routeParams.get("page"));
        var count = parseInt(this.routeParams.get("count"));

        this.travelService.getLikedTravels(page, count).subscribe((travels) => {
            this.pagedTravels = travels;
        },
            () => {
                this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            });
    }

    pagerEvent(currentPage: number) {
        var count = parseInt(this.routeParams.get("count"));
        this.router.navigate(['ToursListLiked', { page: currentPage, count: count }]);
    }
}
@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travels-recent-viewed-by-user',
    // Location of the template for this component
    //templateUrl: './app/travel/travel-home-page.component.html',
    template: `<div class="travel-container"><travel-list *ngIf="pagedTravels" [travels]="pagedTravels" [title]="'Neseniai peržiūrėtos kelionės'" (pagerEvent)="pagerEvent($event)"></travel-list></div>`,
    directives: [TravelListComponent]
})
export class TravelsViewedComponent implements OnInit {
    private pagedTravels = new Pager<FullTravel>();
    constructor(private notificationManager: ToastsManager, private travelService: TravelService, private routeParams: RouteParams, private router: Router) {

    }

    ngOnInit() {
        var page = parseInt(this.routeParams.get("page"));
        var count = parseInt(this.routeParams.get("count"));

        this.travelService.getViewedTravels(page, count).subscribe((travels) => {
            this.pagedTravels = travels;
        },
            () => {
                this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            });
    }

    pagerEvent(currentPage: number) {
        var count = parseInt(this.routeParams.get("count"));
        this.router.navigate(['ToursListViewed', { page: currentPage, count: count }]);
    }
}
@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travels-search',
    // Location of the template for this component
    //templateUrl: './app/travel/travel-home-page.component.html',
    template: `<div class="travel-container"><travel-list *ngIf="pagedTravels" [travels]="pagedTravels" [title]="'Kelionės pagal paiešką'" (pagerEvent)="pagerEvent($event)"></travel-list></div>`,
    directives: [TravelListComponent]
})
export class TravelsSearchedComponent implements OnInit {
    private pagedTravels = new Pager<FullTravel>();
    constructor(private notificationManager: ToastsManager, private travelService: TravelService, private routeParams: RouteParams, private router: Router) {

    }

    ngOnInit() {
        var page = parseInt(this.routeParams.get("page"));
        var count = parseInt(this.routeParams.get("count"));
        var searchPhrase = this.routeParams.get("phrase");

        this.travelService.search(searchPhrase, page, count).subscribe((travels) => {
            this.pagedTravels = travels;
        },
            () => {
                this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            });
    }

    pagerEvent(currentPage: number) {
        var count = parseInt(this.routeParams.get("count"));
        var searchPhrase = this.routeParams.get("phrase");
        this.router.navigate(['ToursListSearch', { page: currentPage, count: count, phrase: searchPhrase }]);
    }
}


@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-main-component',
    // Location of the template for this component
    templateUrl: './app/travel/travel-home-page.component.html',
    directives: [TravelListComponent, TravelsLikedComponent]
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
        var page = parseInt(this.router.get("page"));
        var count = parseInt(this.router.get("count"));
        switch (type) {
            //case "viewed":
            //    this.travelService.getViewedTravels(page,count).subscribe((travels) => {
            //        this.TravelInformation.ViewedTravels = travels;
            //    },
            //        () => {
            //            this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            //        });
            //    break;
            //case "liked":
            //    this.travelService.getLikedTravels(page, count).subscribe((travels) => {
            //        this.TravelInformation.LikedTravels = travels;
            //    },
            //        () => {
            //            this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            //        });
            //    break;
            //case "search":
            //    var searchPhrase = this.router.get("phrase");
            //    this.travelService.search(searchPhrase, page, count).subscribe((travels) => {
            //        this.TravelInformation.SearchedTravels = travels;
            //    },
            //        () => {
            //            this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            //        });
            //    break;
            //case "top":
            //    break;
            default:
                this.travelService.getRecentTravels(5).subscribe((travels) => {
                    var result = new Pager<FullTravel>();
                    result.Results = travels;
                    result.Count = 0;
                    result.CurrentPage = 1;
                    this.TravelInformation.NewTravels = result;
                },
                    () => {
                        this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
                    });
                this.getUserTravelsByPage(1);
        }

        //this.travelService.getTravels("test").subscribe((travels) => {
        //    this.TravelInformation.TravelList = travels;
        //},
        //    () => {
        //        this.notificationManager.error("Nepavyko užkrauti kelionių sąrašo");
        //    });
    }

    getUserTravelsByPage(currentPage: number) {
        this.travelService.getUserTravels(currentPage, 9).subscribe((travels) => {
            this.TravelInformation.UserTravels = travels;
        },
            () => {
                this.notificationManager.error("Nepavyko užkrauti naujausių kelionių");
            });
    }
}