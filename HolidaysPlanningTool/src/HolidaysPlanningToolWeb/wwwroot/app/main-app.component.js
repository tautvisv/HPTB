"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var router_1 = require('angular2/router');
var core_1 = require('angular2/core');
var user_settings_component_1 = require('./userItems/user-settings.component');
var travel_create_component_1 = require('./travel/travel-create.component');
var travel_view_component_1 = require('./travel/travel-view.component');
var travel_home_page_component_1 = require('./travel/travel-home-page.component');
var account_login_component_1 = require('./account/account-login.component');
var account_logout_component_1 = require('./account/account-logout.component');
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
var router_2 = require('angular2/router');
var core_2 = require('angular2/core');
var MainApp = (function () {
    function MainApp() {
        this.title = 'Tour of Heroes';
    }
    MainApp.prototype.ngOnInit = function () {
    };
    MainApp = __decorate([
        router_1.RouteConfig([
            {
                path: '/Login',
                name: 'Login',
                component: account_login_component_1.LoginComponent
            },
            {
                path: '/Logout',
                name: 'Logout',
                component: account_logout_component_1.LogoutComponent
            },
            {
                path: '/Tour/:id',
                name: 'Tour',
                component: travel_view_component_1.TravelViewComponent
            },
            {
                path: '/ToursList',
                name: 'ToursList',
                component: travel_home_page_component_1.TravelHomePageComponent
            },
            {
                path: '/CreateTour',
                name: 'CreateTour',
                component: travel_create_component_1.TravelCreateComponent
            },
            {
                path: '/Settings',
                name: 'Settings',
                component: user_settings_component_1.UserSettingsComponent
            },
            { path: '/**', redirectTo: ['ToursList'] }
        ]),
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'main-app',
            // Location of the template for this component
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: './app/main-app.component.html',
            providers: [router_1.ROUTER_PROVIDERS, core_2.provide(router_2.LocationStrategy, { useClass: router_2.HashLocationStrategy })]
        })
    ], MainApp);
    return MainApp;
}());
exports.MainApp = MainApp;
console.log("init panel");
//# sourceMappingURL=main-app.component.js.map