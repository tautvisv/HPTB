import {Component, OnInit, Input } from 'angular2/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MiscService } from '../services/misc.service';

class TravelStatus {
    public UserLikeStatus: number;
    public LikesCount: number;
    public DislikesCount: number;
}
@Component({
    selector: 'like-directive',
    templateUrl: './app/travel/like-directive.component.html',
    directives: []
})
export class LikeDirectiveComponent implements OnInit {
    @Input() travelId: number;
    private travelLikesData: TravelStatus;
    constructor(private notificationManager: ToastsManager, private service: MiscService) {
        this.travelLikesData = new TravelStatus();
    }

    private isLiked() {
        return this.travelLikesData.UserLikeStatus > 0;
    }

    private isDisliked() {
        return this.travelLikesData.UserLikeStatus < 0;
    }

    like() {
        this.service.like(this.travelId, 1).subscribe((status) => {
            if (this.travelLikesData.UserLikeStatus === -1) {
                this.travelLikesData.DislikesCount--;
            }
            //switch (this.travelLikesData.UserLikeStatus) {
            //    case -1:
            //        break;
            //    case 0:
            //        break;
            //    case 1:
            //        break;
            //    default:
            //        this.notificationManager.error("Nežinomas statusas: " + this.travelLikesData.UserLikeStatus);
            //}
            this.travelLikesData.LikesCount++;
            this.travelLikesData.UserLikeStatus = status;
            this.notificationManager.info("jums patinka ši kelionė");
        },
            this.notAuthMessage.bind(this)
        );
    }
    private notAuthMessage(err) {
        if (err.status == 401) {
            this.notificationManager.info("Prisijunkite prie sistemos norėdami vertinti kelionę");
        }
    }
    dislike() {
        this.service.like(this.travelId, -1).subscribe((status) => {
            if (this.travelLikesData.UserLikeStatus === 1) {
                this.travelLikesData.LikesCount--;
            }
            this.travelLikesData.UserLikeStatus = status;
            this.travelLikesData.DislikesCount++;
            this.notificationManager.info("jums nepatinka ši kelionė");
        },
            this.notAuthMessage.bind(this));
    }
    removeLike() {
        this.service.like(this.travelId, 0).subscribe((status) => {
            if (this.travelLikesData.UserLikeStatus === 1) {
                this.travelLikesData.LikesCount--;
            } else if (this.travelLikesData.UserLikeStatus === -1) {
                this.travelLikesData.DislikesCount--;
            } else {
                this.notificationManager.info("status: " + this.travelLikesData.UserLikeStatus);
            }
            this.travelLikesData.UserLikeStatus = status;
            this.notificationManager.info("Panaikintas statusas");
        },
            this.notAuthMessage.bind(this));
    }

    ngOnInit() {
        this.service.getTravelInformation(this.travelId).subscribe((travelStatus: TravelStatus) => {
            this.travelLikesData = travelStatus;
        });
    }
}