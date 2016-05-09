import {Component, Injectable } from 'angular2/core';
import {Constants} from '../utils/Constants';
import {Http, HTTP_PROVIDERS, Headers } from 'angular2/http';
import {UserSettings } from '../userItems/user-settings';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from './angular2-jwt';
import {httpAuthorized} from './http-authorized';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

@Injectable()
export class UserSettingsService {
    private _controllerName = "UserSettings/";
    constructor(private http: httpAuthorized) {
        console.warn("constructor UserSettingsService");
    }

    getUserSettingsData() { //UserSettingsMock
        console.log("service gettings data from", Constants.WebAPIUrl);
        return this.http.get(Constants.WebAPIUrl + this._controllerName, {})
            .map(response => response.json()).map((result: UserSettings) => {
            //TODO return result
                return result;
        });
        //return new UserSettingsMock();
    }
    saveUserSettings(userSettings: UserSettings) {
        return this.http.post(Constants.WebAPIUrl + this._controllerName,
            JSON.stringify(userSettings), {})
            .map(response => response.json());
    }
}
