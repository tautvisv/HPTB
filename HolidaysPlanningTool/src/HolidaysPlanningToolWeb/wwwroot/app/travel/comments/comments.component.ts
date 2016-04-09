import {Component, OnInit, Input } from 'angular2/core';
import { CommentComponent } from './comment.component';
import { CommentCreateComponent } from './comment-create.component';
import { Comment } from '../TravelClass';

@Component({
    selector: 'comments-list',
    templateUrl: './app/travel/comments/comments.component.html',
    directives: [CommentComponent, CommentCreateComponent]
})
export class CommentsComponent implements OnInit {
    @Input() comments: Comment[];
    constructor() {
    }

    ngOnInit() {

    }
}