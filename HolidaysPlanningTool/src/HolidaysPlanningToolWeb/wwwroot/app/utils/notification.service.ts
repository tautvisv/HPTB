import {Injectable } from 'angular2/core';
import {Component, EventEmitter, ElementRef } from 'angular2/core'
import {CORE_DIRECTIVES } from 'angular2/common';
import {Injector} from 'angular2/core';

export interface INotify {
    error(message: string): void;
    warning(message: string): void;
    success(message: string): void;
    info(message: string): void
}

@Injectable()
export class Alerts {
    public alerts: any[];
    constructor() {
        console.warn("init Alerts");
        this.alerts = [];
    }
    push(object: any): void {
        this.alerts.push(object);
    }
    removeItem(object: any): boolean {
        var index = this.alerts.indexOf(object);
        if (index > -1) {
            this.alerts.splice(index, 1);
        }
        return index > -1;
    }
}
@Injectable()
export class NotificationService implements INotify {
    constructor(private _alerts: Alerts) {
        console.warn("console creating me, The notification Service is 69");
        this._alerts.push({ notification: "69", type: "alert-info" });
    }

    error(message: string) {
        this._alerts.push({ type: "alert-danger", notification: message });
    }
    warning(message: string) {
        this._alerts.push({ type: "alert-warning", notification: message });
    }
    success(message: string) {
        this._alerts.push({ type: "alert-success", notification: message });
    }
    info(message: string) {
        this._alerts.push({ type: "alert-info", notification: message });
    }
}
