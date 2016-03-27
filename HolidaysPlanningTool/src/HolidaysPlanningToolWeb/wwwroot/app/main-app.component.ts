﻿import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {Component, OnInit } from 'angular2/core';
import {UserSettingsComponent} from './userItems/user-settings.component';
import {TravelComponent} from './travel/travel-create.component';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {LocationStrategy, HashLocationStrategy} from 'angular2/router';
import { provide } from 'angular2/core';

@RouteConfig([
    {
        path: '/ToursList',
        name: 'ToursList',
        component: TravelComponent
    },
    {
        path: '/List/:id',
        name: 'List',
        component: TravelComponent
    },
    {
        path: '/Settings',
        name: 'Settings',
        component: UserSettingsComponent
    },
    { path: '/**', redirectTo: ['ToursList'] }
])
@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'main-app',
    // Location of the template for this component
    directives: [ROUTER_DIRECTIVES],
    templateUrl: './app/main-app.component.html',
    providers: [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]
})
export class MainApp implements OnInit {
    title = 'Tour of Heroes';
    constructor() {
    }
    ngOnInit() {
        

    }
}

console.log("init panel");
