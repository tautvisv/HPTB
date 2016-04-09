import {Component, OnInit, Input } from 'angular2/core';
import { CommentAuthorComponent } from './comment-author.component';
import { Comment } from '../TravelClass';

@Component({
    selector: 'comment-item',
    templateUrl: './app/travel/comments/comment.component.html',
    directives: [CommentAuthorComponent]
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;
    constructor() {
    }

    ngOnInit() {

    }
}