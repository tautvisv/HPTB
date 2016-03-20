import {Component } from 'angular2/core';
import { EditableItemComponent } from './editable-item.component';
import { UserSettingsItem } from './user-settings';
import { UserSettingsMock } from './user-settings-mock';
import { NotificationService } from '../utils/notification.service';


@Component({
    selector: 'user-settings',
    templateUrl: './app/userItems/user-settings.component.html',
    directives: [EditableItemComponent],
    providers: [UserSettingsMock]
})
export class UserSettingsComponent {

    constructor(public userInfo: UserSettingsMock, private _notificationService: NotificationService) {
    }
    saveSettings(): void {
         this._notificationService.success("nustatymai išsaugoti");
        console.log("saving")
    }
    cancelSettings(): void {
        this._notificationService.error("nustatymai neišsaugoti");
    }
}