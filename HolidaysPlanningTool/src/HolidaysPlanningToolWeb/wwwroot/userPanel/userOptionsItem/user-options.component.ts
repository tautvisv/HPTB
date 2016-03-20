import {Component } from 'angular2/core';
import {UserOptions} from '../services/user-options';
import {HeaderComponent} from '../../app/utils/component-header.component';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'user-options-item',
    directives: [HeaderComponent, ROUTER_DIRECTIVES],
    templateUrl: "./userPanel/userOptionsItem/user-options.component.html",
    providers: [ROUTER_PROVIDERS],
    inputs: ['option']
})
export class UserOptionsItem {
    public option: UserOptions;
    constructor() {  }
   
}
