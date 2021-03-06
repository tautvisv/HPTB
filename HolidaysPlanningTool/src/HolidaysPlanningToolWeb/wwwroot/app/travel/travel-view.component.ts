﻿import {Component, OnInit } from 'angular2/core';
import { FullTravel, TravelClass, TravelDayPlan, Comment, TravelMethodsHelper, ILocationPoint } from "./TravelClass";
import { TravelService } from '../services/travel.service';
import { Router, RouteParams } from 'angular2/router';
import { CommentsComponent } from './comments/comments.component';
import { CommentCreateComponent } from './comments/comment-create.component';
import { LikeDirectiveComponent } from './like-directive.component';
import { Constants } from '../utils/Constants';
import { FacebookShareComponent } from '../utils/facebook-share.component';
import { GoogleMaps } from './maps/GoogleMap';
import { TravelViewDaysContainerComponent } from './travel-view-days-container.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MiscService } from '../services/misc.service';

class MyTime {
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
    public default: string;
}

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-view',
    // Location of the template for this component
    templateUrl: './app/travel/travel-view.component.html',
    providers: [GoogleMaps, TravelMethodsHelper],
    directives: [CommentsComponent, CommentCreateComponent, LikeDirectiveComponent, TravelViewDaysContainerComponent, FacebookShareComponent]
})
export class TravelViewComponent implements OnInit {
    private travel: FullTravel;
    private durationString: MyTime;
    private pageLink: string;
    private travels: TravelClass[];
    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private _notificationService: ToastsManager,
        private map: GoogleMaps,
        private miscService: MiscService,
        private travelHelper: TravelMethodsHelper,
        private travelService: TravelService) {
        this.travel = new FullTravel();
        this.pageLink = location.href;
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
        d = parseInt(d.toFixed(0));
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
    translateSeconds(seconds: number): string {
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
        if (waypoints.length)
            var first = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[0].Point);
        if (waypoints.length>1)
        var last = this.travelHelper.convertPointToDirectionsWaypoint(waypoints[waypoints.length - 1].Point);
        var middles = this.travelHelper.convertILocationPointsToDirectionsWaypoint(waypoints);
        this.map.setOptimizeRoute(true);
        this.map.setWayPoints(first, last, middles);
    }
    showMainRoute() {
        this.map.setOptimizeRoute(false);
        var startPoint = this.travel.StartDay?this.travel.StartDay.Point:null;
        var endPoint = this.travel.EndDay?this.travel.EndDay.Point:null;
        this.map.setWayPoints(this.travelHelper.convertPointToDirectionsWaypoint(startPoint), this.travelHelper.convertPointToDirectionsWaypoint(endPoint), this.travelHelper.convertAllILocationPointsToDirectionsWaypoint(this.travel.WayPoints));
        //this.map.findRoute();
    }

    duration(): MyTime {
        var result = new MyTime();
        if (!this.travel.EndDay || !this.travel.StartDay) { result.default = "-"; return result };
        return this.msToTime(this.travel.EndDay.Date.getTime() - this.travel.StartDay.Date.getTime());
    }

    ngOnInit() {
        this.travelService.getTravel(parseInt(this._routeParams.get('id'))).subscribe(travel => {
            this.travel = travel;
            //TODO do something here
            if (this.travel.ImageUrl)
                this.travel.ImageUrl = Constants.WebAPI + this.travel.ImageUrl;
            else { this.travel.ImageUrl = "/images/no_img.png"; }
            this.durationString = this.duration();
            this.miscService.addView(this.travel.Id);
            var travels = [];
            travels.push(travel.StartDay);
            travels = travels.concat(travel.WayPoints);
            travels.push(travel.EndDay);
            this.travels = travels;
            this.showMainRoute();
        }, (error) => {
            if (error && error.status === 404) {
                this._router.navigate(["ToursList"]);
                this._notificationService.error("Tokia kelionė neegzistuoja");
                return;
            }
            this._notificationService.error("Nežinoma klaida");
            
        });
        this.map.initialise("the_view_map");
        this.map.setMapDisableClicks(true);
    }
}



