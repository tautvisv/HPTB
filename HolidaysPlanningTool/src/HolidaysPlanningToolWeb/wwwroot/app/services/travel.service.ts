import {Component, Injectable } from 'angular2/core';
import {Constants} from '../utils/Constants';
import {Http, HTTP_PROVIDERS, Headers } from 'angular2/http';
import { FullTravel, TravelClass, TravelDayPlan, Point, Comment, Author } from '../travel/TravelClass';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from './angular2-jwt';
import {httpAuthorized} from './http-authorized';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

class TravelDayPlanMock extends TravelDayPlan {
    constructor() {
        var randomStuff = Math.random();
        super(new Point(54.5 + randomStuff, 24 + randomStuff));
        this.Date = new Date("2016-01-25");
        this.Description = "Trumpas čia toks yra";
        this.Duration = "22:31";
        this.Name = "Testinis taškas";
    }
}

class TravelClassMock extends TravelClass {
    constructor() {
        super();
        var randomStuff = Math.random();
        this.Date = new Date("2016-01-25");
        this.Description = "trumpas aprasymas";
        this.Name = "Kelione";
        this.Point = new Point(54.5 + randomStuff, 24 + randomStuff);
        this.TravelDays = [new TravelDayPlanMock(), new TravelDayPlanMock(), new TravelDayPlanMock()];
        this.ImageUrl = `/images/Banner-01-Azure.png`;
        this.OrderIndex = -1;
       // this.Point.Address = `Taikos pr. ${}, Kaunas 51297, Lietuva`
    }

}
class AuthorMock extends Author {
    constructor() {
        super();
        this.ImageUrl = "http://localhost:37096/nuotraukosjega/min/wisp_wallpaper__dota_2__by_murr3-d5qjkfc.png";
        this.Name = "Vardenis Pavardenis";
    }
}
class FullTravelMock extends FullTravel {
    constructor() {
        super();
        this.StartDay = new TravelClassMock();
        this.EndDay = new TravelClassMock();
        this.EndDay.Date = new Date("2016-04-10")
        this.StartDay.Date = new Date("2016-04-05")
        this.WayPoints = [new TravelClassMock(), new TravelClassMock()];
        this.Descrription = "Sistemos Apra6ymas;";
        this.ImageUrl = `https://dn1w8s6xszn0j.cloudfront.net/media/image/p24/itinerary_images/5113b6bd408698fb70000000/new697d0560ea5234e35fed58670d590613.jpg`;
        this.Id = 135452;
        this.Likes = parseInt("" + Math.random() * 30);
        this.Views = parseInt("" + Math.random() * 30);
        this.CommentsCount = parseInt("" + Math.random() * 30);
        this.Comments = [new Comment(), new Comment(), new Comment()];
        this.Name = "Test PAvadinamas";
        this.Author = new AuthorMock();
    }
}

//http://localhost:2922/api/Mock/5
@Injectable()
export class TravelService {
    private _controllerName = "Travel/";
    constructor(private http: httpAuthorized) {
        console.warn("constructor UserSettingsService");
    }

    getTravel(travelId: number | string): Observable<FullTravel> { //UserSettingsMock
        console.log("service gettings data from", Constants.WebAPIUrl);
        return this.http.get(Constants.WebAPIUrl + this._controllerName + travelId, {})
            .map(response => response.json()).map((result: number) => {
                console.log("response from API:", result);
                //TODO return result
                return new FullTravelMock();
            });
    }
    getTravels(filter: string): Observable<FullTravel[]>  { //UserSettingsMock
        console.log("service gettings data from", Constants.WebAPIUrl);
        return this.http.get(Constants.WebAPIUrl + this._controllerName + filter, {})
            .map(response => response.json()).map((result: number) => {
                console.log("response from API:", result);
                //TODO return result
                return [new FullTravelMock(), new FullTravelMock(), new FullTravelMock(), new FullTravelMock(), new FullTravelMock()];
            });
    }

    getRecentTravels(filter: string): Observable<FullTravel[]> { //UserSettingsMock
        console.log("service gettings data from", Constants.WebAPIUrl);
        return this.http.get(Constants.WebAPIUrl + this._controllerName + filter, {})
            .map(response => response.json()).map((result: number) => {
                console.log("response from API:", result);
                //TODO return result
                return [new FullTravelMock(), new FullTravelMock(), new FullTravelMock(), new FullTravelMock()];
            });
    }
    saveTravel(travel: FullTravel) {
        return this.http.post(Constants.WebAPIUrl + this._controllerName,
            JSON.stringify(travel), { })
            .map(response => response.json());
    }
}
