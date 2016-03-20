import {Component } from 'angular2/core';
import { UserSettingsItem } from './user-settings';


@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'editable-item',
    templateUrl: './app/userItems/editable-item.component.html',
    directives: [],
    inputs: ['item']
})
export class EditableItemComponent {
    private readonly: boolean;
    constructor() {
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