import {Component, Injectable } from 'angular2/core';
//import {Http, HTTP_PROVIDERS, Headers } from 'angular2/http';
import {Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response} from 'angular2/http';
import {Constants} from '../utils/Constants';
import {Observable} from 'rxjs/Observable';
import { Comment } from '../travel/TravelClass';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from './angular2-jwt';
import {httpAuthorized} from './http-authorized';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';


export class UserRegisterModel {
    public Username: string; 
    public Name: string; 
    public Surname: string; 
    public Email: string; 
    public Password: string; 
    public ConfirmPassword: string;
    public isValid(): number {
        if (!this.Username || !this.Name) {
            return -10;
        }
        if (!this.Email) {
            return -20;
        }
        if (!/^(.+@.+)$/.test(this.Email)) {
            return -21;
        }
        if (!this.Password || this.Password != this.ConfirmPassword) {
            return -30;
        }
        if (this.Password.length < 6) {
            return -31;
        }
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/.test(this.Password)) {
            return -32;
        }
        return 1;
    }
}

@Injectable()
export class AccountService {
    private _controllerName = "User/";
    constructor(private myHttp: httpAuthorized) {
        console.warn("constructor UserService");
    }

    login(userName: string, userPassword: string) {
       // var headers = new Headers();
        //this.authHttp.tokenStream.
        //localStorage
        return this.myHttp.post(Constants.WebAPIUrl + this._controllerName + "/LoginAts",
            JSON.stringify({ userName: userName, password: userPassword, grant_type: 'password' }), {
                //headers: headers
            })
            .map(response => response.json()).map((result: any) => {
                console.log(result);
                this.myHttp.setToken(result.access_token);
                //localStorage.setItem("auth-token", result.access_token);
                return status;
            });
    }
    logout() {
        //var headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        return this.myHttp.post(Constants.WebAPIUrl + this._controllerName + "Logout",
            JSON.stringify({ }), {
            })
            .map(response => response.json()).map((result: number) => {
                this.myHttp.removeToken();
                return status;
            });
    }
    register(user: UserRegisterModel) {
        //var headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        return this.myHttp.post(Constants.WebAPIUrl + this._controllerName + "Register",
            JSON.stringify(user), {
            })
            .map(response => response.json()).map((result: any) => {
                // this.myHttp.removeToken();
                return result;
            });
    }
}

/*
import {Injectable} from "angular2/core";
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {tokenNotExpired} from "angular2-jwt/angular2-jwt";
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

@Injectable()
export class Auth0Service {
    lock: Auth0Lock = new Auth0Lock('myclientid', 'my domain');
    //jwtHelper: JwtHelper = new JwtHelper();

    login() {
        this.lock.show((err: string, profile: string, id_token: string) => {

            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        return tokenNotExpired();
    }
} */