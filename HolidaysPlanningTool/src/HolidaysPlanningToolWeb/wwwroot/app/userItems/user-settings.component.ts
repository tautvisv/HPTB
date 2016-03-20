import {Component, OnInit } from 'angular2/core';
import { UserSettingsItemComponent } from './user-settings-item.component';
import { UserSettingsItem } from './user-settings';
import { NotificationService } from '../utils/notification.service';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsViewItem } from './user-settings';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

@Component({
    selector: 'user-settings',
    templateUrl: './app/userItems/user-settings.component.html',
    directives: [UserSettingsItemComponent],
    providers: [UserSettingsService]
})
export class UserSettingsComponent implements OnInit {
    private userInfo: UserSettingsViewItem;
    constructor(public _settingsService: UserSettingsService, private _notificationService: NotificationService, private router: Router) {
        this.userInfo = new UserSettingsViewItem();
    }
    saveSettings(): void {
        this._settingsService.saveUserSettings({ test: "yra test"}).subscribe(
            res => {
                this._notificationService.success("Vartotojo informacija atnaujinta, atsakas iš serverio: " + JSON.stringify(res));
                this.router.navigate(["List", { id: 1120 }])
            },
            (err: any) => this._notificationService.error("Atnaujinti vartotojo duomenų nepavyko: kodas: " + err.status)
        );
    }
    cancelSettings(): void {
        this._notificationService.info("nustatymai neišsaugoti");
    }
    ngOnInit() {
        this._settingsService.getUserSettingsData(51).subscribe(
            res => {
                this.userInfo.createFromUserSettings(res);
                this._notificationService.success("Vartotojo informacija užkrauta, atsakas iš serverio: " + JSON.stringify(res));
            },
            (err: any) => this._notificationService.error("Gauti vartotojo duomenų nepavyko: kodas: " + err.status));
    }
}