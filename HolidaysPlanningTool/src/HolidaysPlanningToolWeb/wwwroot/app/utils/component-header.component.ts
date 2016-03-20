import {Component, OnInit } from 'angular2/core';

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'header-component',
    // Location of the template for this component
    templateUrl: './app/utils/component-header.component.html',
    directives: []
})
export class HeaderComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {

    }
}