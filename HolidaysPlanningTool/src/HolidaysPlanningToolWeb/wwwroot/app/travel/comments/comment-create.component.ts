import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import { MiscService } from '../../services/misc.service';
import { Comment } from '../TravelClass';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'comment-create',
    templateUrl: './app/travel/comments/comment-create.component.html',
    directives: []
})
export class CommentCreateComponent implements OnInit {
    @Output() addComment = new EventEmitter<Comment>();
    @Input() travelId: number;

    private comment: Comment;
    constructor(private _notificationService: ToastsManager, private service: MiscService) {
        this.comment = new Comment();
    }

    ngOnInit() {

    }

    saveComment() {
        this.comment.TravelId = this.travelId;
        this.service.saveComment(this.comment).subscribe((comment: Comment) => {
            this.addComment.next(comment);
            this.comment.Text = "";
        },
            () => { this._notificationService.error("Palikti atsiliepimą apie kelionę gali tik tais registruotas vartotojas"); });
    }
}