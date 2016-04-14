import {Component, OnInit } from 'angular2/core';
import { FullTravel, TravelClass, TravelDayPlan, Comment, TravelMethodsHelper, ILocationPoint } from "./TravelClass";
import { TravelService } from './travel.service';
import { Router, RouteParams } from 'angular2/router';
import { CommentsComponent } from './comments/comments.component';
import { CommentCreateComponent } from './comments/comment-create.component';
import { LikeDirectiveComponent } from './like-directive.component';
import { GoogleMaps } from './maps/GoogleMap';
import { TravelViewDaysContainerComponent } from './travel-view-days-container.component';

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-view',
    // Location of the template for this component
    templateUrl: './app/travel/travel-view.component.html',
    providers: [GoogleMaps, TravelMethodsHelper],
    directives: [CommentsComponent, CommentCreateComponent, LikeDirectiveComponent, TravelViewDaysContainerComponent]
})
export class TravelViewComponent implements OnInit {
    private travel: FullTravel;
    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private map: GoogleMaps,
        private travelHelper: TravelMethodsHelper,
        private travelService: TravelService) {
        this.travel = new FullTravel();
    }

    msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60 % 24;
        var d = (s - mins) / 60 / 24;
        return d + 'dienos' + hrs + 'valandos' + mins + 'minutės';
    }

    addComment(comment: Comment) {
        console.log("coment was dadded to view", comment);
        this.travel.Comments.push(comment);
    }
    showRoute(waypoints: ILocationPoint[]) {
        var first = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[0].Point);
        var last = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[waypoints.length - 1].Point);
        var middles = this.travelHelper.convertILocationPointsToDirectionsWaypoint(waypoints);
        this.map.setWayPoints(first, last, middles);
    }
    showMainRoute() {
        this.map.setWayPoints(this.travelHelper.convertPointToDirectionsWaypoint(this.travel.startDay.Point), this.travelHelper.convertPointToDirectionsWaypoint(this.travel.endDay.Point), this.travelHelper.convertAllILocationPointsToDirectionsWaypoint(this.travel.wayPoints));
        //this.map.findRoute();
    }

    duration() {
        if (!this.travel.endDay || !this.travel.startDay) return "datos nenurodytos";
        return this.msToTime(this.travel.endDay.Date.getTime() - this.travel.startDay.Date.getTime());
    }

    ngOnInit() {
        this.travelService.getTravel(this._routeParams.get('id')).subscribe(travel => {
            this.travel = travel;
            this.showMainRoute();
        });
        this.map.initialise("the_view_map");
        this.map.setMapDisableClicks(true);
    }
}



