import {Component, OnInit, Input } from 'angular2/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MiscService } from '../services/misc.service';

@Component({
    selector: 'like-directive',
    templateUrl: './app/travel/like-directive.component.html',
    directives: []
})
export class LikeDirectiveComponent implements OnInit {
    @Input() status: number;
    @Input() travelId: number;

    constructor(private notificationManager: ToastsManager, private service: MiscService) {
    }

    private isLiked() {
        return this.status > 0;
    }

    private isDisliked() {
        return this.status < 0;
    }

    like() {
        this.service.like(this.travelId, 1).subscribe((status) => {
            this.status = status;
            this.notificationManager.info("jums patinka ši kelionė");
        },
            () => {
        });
    }
    dislike() {
        this.service.like(this.travelId, -1).subscribe((status) => {
            this.status = status;
            this.notificationManager.info("jums nepatinka ši kelionė");
        },
            () => {
            });
    }
    removeLike() {
        this.service.like(this.travelId, 0).subscribe((status) => {
            this.status = status;
            this.notificationManager.info("Panaikintas statusas");
        },
            () => {
            });
    }

    ngOnInit() {

    }
}