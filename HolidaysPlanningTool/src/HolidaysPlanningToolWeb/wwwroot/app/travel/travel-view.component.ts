import {Component, OnInit, Input } from 'angular2/core';
import { FullTravel } from "./TravelClass";
import { TravelService } from './travel.service';
import { Router, RouteParams } from 'angular2/router';
import { CommentsComponent } from './comments/comments.component';
import { CommentCreateComponent } from './comments/comment-create.component';
import { LikeDirectiveComponent } from './like-directive.component';

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-view',
    // Location of the template for this component
    templateUrl: './app/travel/travel-view.component.html',
    directives: [CommentsComponent, CommentCreateComponent, LikeDirectiveComponent]
})
export class TravelViewComponent implements OnInit {
    private travel: FullTravel;
    
    constructor(private _router: Router,
        private _routeParams: RouteParams,
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


    duration() {
        if (!this.travel.endDay || !this.travel.startDay) return "datos nenurodytos";
        return this.msToTime(this.travel.endDay.Date.getTime() - this.travel.startDay.Date.getTime());
    }

    ngOnInit() {
        this.travelService.getTravel(this._routeParams.get('id')).subscribe(travel => {
            this.travel = travel;
        });
    }
}