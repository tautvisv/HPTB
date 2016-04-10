import {Component, Injectable } from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers } from 'angular2/http';
import {Constants} from '../utils/Constants';
import {Observable} from 'rxjs/Observable';
import { Comment } from '../travel/TravelClass';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

//http://localhost:2922/api/Mock/5
@Injectable()
export class AccountService {
    private _controllerName = "Mock/";
    constructor(private http: Http) {
        console.warn("constructor UserService");
    }

    login(userName: string, userPassword: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants.WebAPIUrl + this._controllerName + 5,
            JSON.stringify({ userName: userName, password: userPassword }), {
                headers: headers
            })
            .map(response => response.json()).map((result: number) => {
                return status;
            });
    }
    logout() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(Constants.WebAPIUrl + this._controllerName + 5,
            JSON.stringify({ }), {
                headers: headers
            })
            .map(response => response.json()).map((result: number) => {
                return status;
            });
    }
}
