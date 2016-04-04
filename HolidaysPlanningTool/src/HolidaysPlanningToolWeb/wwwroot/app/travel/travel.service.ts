import {Component, Injectable } from 'angular2/core';
import {Constants} from '../utils/Constants';
import {Http, HTTP_PROVIDERS, Headers } from 'angular2/http';
import { FullTravel, TravelClass, Point } from './TravelClass';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

class TravelClassMock extends TravelClass {
    constructor() {
        super();
        var randomStuff = Math.random();
        this.Date = new Date("2016-01-25");
        this.Description = "trumpas aprasymas";
        this.Name = "Kelione";
        this.Point = new Point(54.5 + randomStuff, 24 + randomStuff);
        this.TravelDays = null;
       // this.Point.Address = `Taikos pr. ${}, Kaunas 51297, Lietuva`
    }

}
class FullTravelMock extends FullTravel {
    constructor() {
        super();
        this.startDay = new TravelClassMock();
        this.endDay = new TravelClassMock();
        this.wayPoints = [new TravelClassMock(), new TravelClassMock()];
    }
}

//http://localhost:2922/api/Mock/5
@Injectable()
export class TravelService {
    private _controllerName = "Mock/";
    constructor(private http: Http) {
        console.warn("constructor UserSettingsService");
    }

    getTravel(travelId: number | string): Observable<FullTravel> { //UserSettingsMock
        console.log("service gettings data from", Constants.WebAPIUrl);
        return this.http.get(Constants.WebAPIUrl + this._controllerName + travelId)
            .map(response => response.json()).map((result: number) => {
                console.log("response from API:", result);
                //TODO return result
                return new FullTravelMock();
            });
    }
    getTravels(filter: string): Observable<FullTravel[]>  { //UserSettingsMock
        console.log("service gettings data from", Constants.WebAPIUrl);
        return this.http.get(Constants.WebAPIUrl + this._controllerName + filter)
            .map(response => response.json()).map((result: number) => {
                console.log("response from API:", result);
                //TODO return result
                return [new FullTravelMock(), new FullTravelMock()];
            });
    }
    saveTravel(travel: FullTravel) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants.WebAPIUrl + this._controllerName + 5,
            JSON.stringify(new TravelClassMock()), {
                headers: headers
            })
            .map(response => response.json());
    }
}
