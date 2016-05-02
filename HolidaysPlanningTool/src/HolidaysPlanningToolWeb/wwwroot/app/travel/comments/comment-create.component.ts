import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import { MiscService } from '../../services/misc.service';
import { Comment } from '../TravelClass';

@Component({
    selector: 'comment-create',
    templateUrl: './app/travel/comments/comment-create.component.html',
    directives: []
})
export class CommentCreateComponent implements OnInit {
    @Output() addComment = new EventEmitter<Comment>();
    @Input() travelId: number;

    private comment: Comment;
    constructor(private service: MiscService) {
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
            function() { console.error("komentaras neisaugotas", arguments) });
    }
}