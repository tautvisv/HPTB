import {Component, OnInit } from 'angular2/core';
import { FullTravel, TravelClass, TravelDayPlan, Comment, TravelMethodsHelper, ILocationPoint } from "./TravelClass";
import { TravelService } from '../services/travel.service';
import { Router, RouteParams } from 'angular2/router';
import { CommentsComponent } from './comments/comments.component';
import { CommentCreateComponent } from './comments/comment-create.component';
import { LikeDirectiveComponent } from './like-directive.component';
import { GoogleMaps } from './maps/GoogleMap';
import { TravelViewDaysContainerComponent } from './travel-view-days-container.component';

class MyTime {
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
}

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
    private durationString: MyTime;
    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private map: GoogleMaps,
        private travelHelper: TravelMethodsHelper,
        private travelService: TravelService) {
        this.travel = new FullTravel();
    }

    msToTime(s): MyTime {
        var newTime = new MyTime();
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60 % 24;
        var d = (s - mins) / 60 / 24;
        //return d + 'dienos' + hrs + 'valandos' + mins + 'minutės';
        newTime.days = d;
        newTime.hours = hrs;
        newTime.minutes = mins;
        newTime.seconds = s;
        return newTime;
    }
    translateDays(days: number): string {
        var modItem = days % 10;
        if (modItem === 0 || days > 9 && days < 20) {
            return "dienų";
        }
        if (modItem === 1) {
            return "diena";
        }
        return "dienos"
    }
    translateHours(hours: number): string {
        var modItem = hours % 10;
        if (modItem === 0 || hours > 9 && hours < 20) {
            return "valandų";
        }
        if (modItem === 1) {
            return "valanda";
        }
        return "valandos";
    }
    translateMinutes(minutes: number): string {
        var modItem = minutes % 10;
        if (modItem === 0 || minutes > 9 && minutes < 20) {
            return "minučių";
        }
        if (modItem === 1) {
            return "minutė";
        }
        return "minutės"
    }
    translateSeconds(seconds: number): string  {
        var modItem = seconds % 10;
        if (modItem === 0 || seconds > 9 && seconds < 20) {
            return "sekundžių";
        }
        if (modItem === 1) {
            return "sekundė";
        }
        return "sekundės";
    }

    addComment(comment: Comment) {
        console.log("coment was dadded to view", comment);
        this.travel.Comments.push(comment);
    }
    showRoute(waypoints: ILocationPoint[]) {
        var first = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[0].Point);
        var last = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[waypoints.length - 1].Point);
        var middles = this.travelHelper.convertILocationPointsToDirectionsWaypoint(waypoints);
        this.map.setOptimizeRoute(true);
        this.map.setWayPoints(first, last, middles);
    }
    showMainRoute() {
        this.map.setOptimizeRoute(false);
        this.map.setWayPoints(this.travelHelper.convertPointToDirectionsWaypoint(this.travel.StartDay.Point), this.travelHelper.convertPointToDirectionsWaypoint(this.travel.EndDay.Point), this.travelHelper.convertAllILocationPointsToDirectionsWaypoint(this.travel.WayPoints));
        //this.map.findRoute();
    }

    duration(): MyTime {
        if (!this.travel.EndDay || !this.travel.StartDay) return new MyTime();
        return this.msToTime(this.travel.EndDay.Date.getTime() - this.travel.StartDay.Date.getTime());
    }

    ngOnInit() {
        this.travelService.getTravel(this._routeParams.get('id')).subscribe(travel => {
            this.travel = travel;
            this.durationString = this.duration();
            this.showMainRoute();
        });
        this.map.initialise("the_view_map");
        this.map.setMapDisableClicks(true);
    }
}



