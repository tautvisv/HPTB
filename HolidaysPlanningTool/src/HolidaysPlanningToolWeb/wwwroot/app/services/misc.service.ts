import {Component, Injectable } from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers } from 'angular2/http';
import {Constants} from '../utils/Constants';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

//http://localhost:2922/api/Mock/5
@Injectable()
export class MiscService {
    private _controllerName = "Mock/";
    constructor(private http: Http) {
        console.warn("constructor UserSettingsService");
    }

    getTravel(travelId: number | string): Observable<any> { //UserSettingsMock
        console.log("service gettings data from", Constants.WebAPIUrl);
        return this.http.get(Constants.WebAPIUrl + this._controllerName + travelId)
            .map(response => response.json()).map((result: number) => {
                console.log("response from API:", result);
                //TODO return result
                return {};
            });
    }
    saveComment(comment: any) {
    //Padaryti užklausos atšaukimą
    /*
        if (!comment || !comment.Text) {
            console.warn("komentaras privalo tur4ti tekstą, užklausa neišsiųsta");
            return Observable.of({ }).map(o => JSON.stringify(o));
        }*/
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants.WebAPIUrl + this._controllerName + 5,
            JSON.stringify({}), {
                headers: headers
            })
            .map(response => response.json());
    }
    like(travelId: number, status: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants.WebAPIUrl + this._controllerName + 5,
            JSON.stringify({ travelId: travelId, status: status }), {
                headers: headers
            })
            .map(response => response.json()).map((result: number) => {
                return status;
            });
    }
    addView(object: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants.WebAPIUrl + this._controllerName + 5,
            JSON.stringify({}), {
                headers: headers
            })
            .map(response => response.json());
    }
}
