import { Component, OnInit, Input } from 'angular2/core';
import { MiscService } from '../../services/misc.service';
import { Comment } from '../TravelClass';

@Component({
    selector: 'comment-create',
    templateUrl: './app/travel/comments/comment-create.component.html',
    directives: []
})
export class CommentCreateComponent implements OnInit {
    private comment: Comment;
    constructor(private service: MiscService) {
        this.comment = new Comment();
    }

    ngOnInit() {

    }

    saveComment() {
        this.service.saveComment(this.comment).subscribe(() => { console.log("komentaras isaugotas") },
            function() { console.error("komentaras neisaugotas", arguments) });
    }
}