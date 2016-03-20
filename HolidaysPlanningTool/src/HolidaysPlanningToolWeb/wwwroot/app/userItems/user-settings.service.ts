import {Component, Injectable } from 'angular2/core';
import {Constants} from '../utils/Constants';
import {Http, HTTP_PROVIDERS, Headers } from 'angular2/http';
import {UserSettings } from './user-settings';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

class UserSettingsMock extends UserSettings {
    constructor() {
        super();
    }
    public name: string = "Tautvydas";
    public surname: string = "Vaitiekūnas";
    public address: string = "Tauro g. 13";
    public phone: string = "+37068559976";
    public description: string = "Aš šiuo metu programuoju";
    public extra_info: string = "Papildoma informacija";
    public email: string = "tautvisv@gmail.com";
}

//http://localhost:2922/api/Mock/5
@Injectable()
export class UserSettingsService {
    private _controllerName = "Mock/";
    constructor(private http: Http) {
        console.warn("constructor UserSettingsService");
    }

    getUserSettingsData(userId: number | string) { //UserSettingsMock
        console.log("service gettings data from", Constants.WebAPIUrl);
        return this.http.get(Constants.WebAPIUrl + this._controllerName + userId)
            .map(response => response.json()).map((result: number) => {
            console.log("response from API:", result);
            //TODO return result
            return new UserSettingsMock();
        });
        //return new UserSettingsMock();
    }
    saveUserSettings(userSettings: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants.WebAPIUrl + this._controllerName + 5,
            JSON.stringify(new UserSettingsMock()), {
                headers: headers
            })
            .map(response => response.json());
    }
}
