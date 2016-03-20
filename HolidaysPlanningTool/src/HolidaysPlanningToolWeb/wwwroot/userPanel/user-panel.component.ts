import {Component, OnInit  } from 'angular2/core';
import {UserOptions} from './services/user-options';
import { NgClass } from 'angular2/common';
import {HeaderComponent} from '../app/utils/component-header.component';
import {UserOptionService} from './services/user-option-service.service';
import {UserOptionsItem} from './userOptionsItem/user-options.component';

@Component({
    selector: 'user-panel',
    directives: [HeaderComponent, UserOptionsItem, NgClass],
    templateUrl: "./userPanel/user-panel.component.html",
    providers: [UserOptionService]
})
export class UserPanel implements OnInit {
    constructor(private _userOptionService: UserOptionService) { }
    private title = '';
    private optionsList: UserOptions;
    ngOnInit() {
        this.optionsList = this._userOptionService.GetAllUserOptions();
        this.title = 'User Panel';
    }
}
