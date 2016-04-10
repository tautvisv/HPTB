import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {Component, OnInit } from 'angular2/core';
import {UserSettingsComponent} from './userItems/user-settings.component';
import {TravelCreateComponent} from './travel/travel-create.component';
import {TravelViewComponent} from './travel/travel-view.component';
import {TravelHomePageComponent} from './travel/travel-home-page.component';
import {LoginComponent} from './account/account-login.component';
import {LogoutComponent} from './account/account-logout.component';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {LocationStrategy, HashLocationStrategy} from 'angular2/router';
import { provide } from 'angular2/core';

@RouteConfig([
    {
        path: '/Login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/Logout',
        name: 'Logout',
        component: LogoutComponent
    },
    {
        path: '/Tour/:id',
        name: 'Tour',
        component: TravelViewComponent
    },
    {
        path: '/ToursList',
        name: 'ToursList',
        component: TravelHomePageComponent
    },
    {
        path: '/CreateTour',
        name: 'CreateTour',
        component: TravelCreateComponent
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
