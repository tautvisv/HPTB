import {Component, Injectable } from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers } from 'angular2/http';
import {Constants} from '../utils/Constants';
import {Observable} from 'rxjs/Observable';
import { Comment } from '../travel/TravelClass';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from './angular2-jwt';
import {httpAuthorized} from './http-authorized';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

//http://localhost:2922/api/Mock/5
@Injectable()
export class MiscService {
    //private _controllerName = "PhotoUpload/testf";
    constructor(private http: httpAuthorized) {
        console.warn("constructor UserSettingsService");
    }

    //getTravel(travelId: number | string): Observable<any> { //UserSettingsMock
    //    console.log("service gettings data from", Constants.WebAPIUrl);
    //    return this.http.get(Constants.WebAPIUrl + this._controllerName + travelId, {})
    //        .map(response => response.json()).map((result: number) => {
    //            console.log("response from API:", result);
    //            //TODO return result
    //            return {};
    //        });
    //}
    saveComment(comment: Comment) {
    //Padaryti užklausos atšaukimą
    /*
        if (!comment || !comment.Text) {
            console.warn("komentaras privalo tur4ti tekstą, užklausa neišsiųsta");
            return Observable.of({ }).map(o => JSON.stringify(o));
        }*/
        return this.http.post(Constants.WebAPIUrl + "Comments/",
            JSON.stringify(comment), {})
            .map(response => response.json()).map((result: Comment) => {
                return result;
            });
    }
    like(travelId: number, status: number) {
        return this.http.post(Constants.WebAPIUrl + "Likes/",
            JSON.stringify({ TravelId: travelId, Status: status }), { })
            .map(response => response.json()).map((result: number) => {
                console.log("status");
                return status;
            });
    }
    addView(travelId: number) {
        if (!this.http.isAuth()) return;
        return this.http.post(Constants.WebAPIUrl + "Views" ,
            JSON.stringify({ TravelId: travelId }), {})
            .map(response => response.json()).subscribe((s)=> { console.log("View added"); }, (e) => { console.error("view was not added"); });
    }
    getTravelInformation(travelId: number) {
        return this.http.get(Constants.WebAPIUrl + "Likes/TravelInformation/" + travelId, {})
            .map(response => response.json()).map((result: any) => {
                console.log("travel Staustus: " + result);
                return result;
            });
    }
}
