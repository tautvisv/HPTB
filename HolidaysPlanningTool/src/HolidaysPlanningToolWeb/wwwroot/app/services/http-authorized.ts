import {Component, Injectable } from 'angular2/core';
import {Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response} from 'angular2/http';
import { CONFIG } from "../config/app-config";
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';


export interface IAuthConfig {
    headerName: string;
    headerPrefix: string;
    tokenName: string;
    tokenGetter: any;
    noJwtError: boolean;
    globalHeaders: Array<Object>;
}

@Injectable()
export class httpAuthorized {

    private _config: IAuthConfig;
    private headers: Headers;
    constructor(private http: Http) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        var token = localStorage.getItem(CONFIG.token);
        if (token) {
            this.setToken(token);
        }
    }
    setToken(token: string) {
        this.removeToken();
        this.headers.append("Authorization", "Bearer " + token);
        localStorage.setItem(CONFIG.token, token);
    }
    removeToken() {
        this.headers.delete("Authorization");
        localStorage.removeItem(CONFIG.token);
    }
    setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
        headers.forEach((header: Object) => {
            let key: string = Object.keys(header)[0];
            let headerValue: string = (<any>header)[key];
            request.headers.set(key, headerValue);
        });
    }


    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

        let request: any;
        let globalHeaders = this._config.globalHeaders;

        if (typeof url === 'string') {
            let reqOpts: RequestOptionsArgs = options || {};

            if (!reqOpts.headers) {
                reqOpts.headers = new Headers();
            }

            if (globalHeaders) {
                this.setGlobalHeaders(globalHeaders, reqOpts);
            }

            reqOpts.headers.set(this._config.headerName, this._config.headerPrefix + this._config.tokenGetter());
            request = this.http.request(url, reqOpts);

        } else {
            let req: Request = <Request>url;

            if (!req.headers) {
                req.headers = new Headers();
            }

            if (globalHeaders) {
                this.setGlobalHeaders(globalHeaders, req);
            }

            req.headers.set(this._config.headerName, this._config.headerPrefix + this._config.tokenGetter());
            request = this.http.request(req);
        }

        return request;
    }

    private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions: RequestOptionsArgs): Observable<Response> {
        let options: RequestOptions = new RequestOptions(requestArgs);

        if (additionalOptions) {
            options = options.merge(additionalOptions)
        }

        return this.request(new Request(options))
    }
    private createHeader(headers?:Headers) {
        if (headers) {
            this.headers.forEach((header: Object, key: string) => {
                let headerValue: string = (<any>header)[0];
                headers.set(key, headerValue);
            });
            return headers;
        }
        return this.headers;
    }

    get(url: string, options: RequestOptionsArgs): Observable<Response> {
        options.headers = this.createHeader(options.headers);
        return this.http.get(url, options);
    }

    post(url: string, body: string, options: RequestOptionsArgs): Observable<Response> {
        options.headers = this.createHeader(options.headers);
        return this.http.post(url, body, options);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ url: url, body: body, method: RequestMethod.Put }, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ url: url, method: RequestMethod.Delete }, options);
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ url: url, body: body, method: RequestMethod.Patch }, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ url: url, method: RequestMethod.Head }, options);
    }

}