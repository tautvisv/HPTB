import {Component, OnInit } from 'angular2/core';
import { UserSettingsItemComponent } from './user-settings-item.component';
import { UserSettingsItem, UserSettings } from './user-settings';
import { UserSettingsService } from '../services/user-settings.service';
import { UserSettingsViewItem } from './user-settings';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";
import {Constants} from '../utils/Constants';
import { UploadService } from '../services/file-upload.service';
import {Injectable} from 'angular2/core';

@Component({
    selector: 'user-settings',
    templateUrl: './app/userItems/user-settings.component.html',
    directives: [UserSettingsItemComponent],
    providers: [UserSettingsService]
})
export class UserSettingsComponent implements OnInit {
    private userInfo: UserSettingsViewItem;
    private uploadService: UploadService;
    constructor(public _settingsService: UserSettingsService, private _notificationService: ToastsManager, private router: Router) {
        this.userInfo = new UserSettingsViewItem();
        this.uploadService = new UploadService();
        this.uploadService.progress$.subscribe(
            data => {
                console.log('progress = ' + data);
            });
    }
    onChange(event) {
        console.log('onChange');
        var files = event.srcElement.files;
        if (!files.length) {
            return;
        }
        console.log(files);
        this.uploadService.makeFileRequest('/api/PhotoUpload/UploadUserPhoto', [], files).subscribe((photoUrl: string) => {
            console.log('sent', photoUrl);
            this.userInfo.image.fullUrl = Constants.WebAPI + photoUrl;
            this.userInfo.image.url = photoUrl;
        });
    }
    saveSettings(): void {
        //TODO createuserSettings
        var userSettings: UserSettings = this.userInfo.getUserSettings();
        this._settingsService.saveUserSettings(userSettings).subscribe(
            res => {
                this._notificationService.success("Vartotojo informacija atnaujinta, atsakas iš serverio." );
                this.router.navigate(["ToursList"])
            },
            (err: any) => {
                var message = "";
                if (err) {
                    var response = err.json();
                    message = (response && response.Message) ? response.Message : "";
                }
                this._notificationService.error("Atnaujinti vartotojo duomenų nepavyko. " + message);
            }
        );
    }
    cancelSettings(): void {
        this._notificationService.info("nustatymai neišsaugoti");
        this.router.navigate(["ToursList"])
    }
    private refreshFields() {
        $(".component").find("input").change();
    }
    ngOnInit() {
        this._settingsService.getUserSettingsData().subscribe(
            res => {
                this.userInfo.createFromUserSettings(res);
                //TODO fix it
                setTimeout(this.refreshFields, 200);
            },
            (err: any) => this._notificationService.error("Gauti vartotojo duomenų nepavyko: kodas: " + err.status));
    }
}