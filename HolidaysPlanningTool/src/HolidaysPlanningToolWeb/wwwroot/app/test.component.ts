import {Component} from 'angular2/core';
import {NotificationService} from './utils/notification.service';

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'test-comp',
    // Location of the template for this component
    template: '<div>I am testing you</div>',
})
export class TestComponent {
    // Declaring the variable for binding with initial value
    constructor(private _alerService: NotificationService) {
        this.init();
    }   
    init() {
        this._alerService.success("module test is injected");
    }
}