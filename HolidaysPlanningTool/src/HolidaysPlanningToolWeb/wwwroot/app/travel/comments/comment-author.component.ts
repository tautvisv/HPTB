import {Component, OnInit, Input } from 'angular2/core';
import { Author } from '../TravelClass';

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'comment-authror',
    // Location of the template for this component
    templateUrl: './app/travel/comments/comment-author.component.html',
    directives: []
})
export class CommentAuthorComponent implements OnInit {
    @Input() author: Author;

    constructor() {
    }
    testText: string = "not Loaded";
    ngOnInit() {
        this.testText = "Test angular 2 From init";
    }
}
