import {Component, OnInit, ElementRef } from 'angular2/core';
import { UserSettingsItem } from './user-settings';


@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'user-settings-item',
    templateUrl: './app/userItems/user-settings-item.component.html',
    directives: [],
    inputs: ['item']
})
export class UserSettingsItemComponent   {
    private readonly: boolean;
    constructor(public element: ElementRef) {
        this.readonly = true;
    }
    private isInEditMode: boolean = false;
    setEditMode = (): void  => {
        this.readonly = false;
    }
    setViewMode = (): void  => {
        this.readonly = true;
    }
    saveChanges(item: UserSettingsItem): void {

    }
}