import {Component, OnInit } from 'angular2/core';
import { UserSettingsItemComponent } from './user-settings-item.component';
import { UserSettingsItem, UserSettings } from './user-settings';
import { UserSettingsService } from '../services/user-settings.service';
import { UserSettingsViewItem } from './user-settings';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";
import {Constants} from '../utils/Constants';

import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

export class UploadService {
    public progress$: any;
    public progress: any;
    public progressObserver: any;
    private serverUrl = Constants.WebAPI;
    constructor() {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    public makeFileRequest(url: string, params: string[], files: File[]): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
            
            for (let i = 0; i < files.length; i++) {
                formData.append("file", files[i], files[i].name);
            }
            var token = localStorage.getItem(Constants.TokenName);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);

                this.progressObserver.next(this.progress);
            };

            xhr.open('POST', this.serverUrl + url, true);
            xhr.setRequestHeader(Constants.TokenHeaderName, Constants.TokenType + token);
            xhr.send(formData);
        });
    }
}

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
                this._notificationService.success("Vartotojo informacija atnaujinta, atsakas iš serverio: " );
                this.router.navigate(["ToursList"])
            },
            (err: any) => { this._notificationService.error("Atnaujinti vartotojo duomenų nepavyko: kodas: " + err.status); }
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