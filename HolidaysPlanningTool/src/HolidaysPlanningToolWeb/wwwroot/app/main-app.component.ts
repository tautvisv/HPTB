import { RouteConfig, Router,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {Component, OnInit } from 'angular2/core';
import {UserSettingsComponent} from './userItems/user-settings.component';
import {TravelCreateComponent} from './travel/travel-create.component';
import {TravelViewComponent} from './travel/travel-view.component';
import {TravelHomePageComponent, TravelsSearchedComponent, TravelsViewedComponent, TravelsLikedComponent} from './travel/travel-home-page.component';
import {LoginComponent} from './account/account-login.component';
import {LogoutComponent} from './account/account-logout.component';
import {RegisterComponent} from './account/account-register.component';
import { Auth } from './services/is-auth';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {LocationStrategy, HashLocationStrategy} from 'angular2/router';
import { provide } from 'angular2/core';

@RouteConfig([
    {
        path: '/Register',
        name: 'Register',
        component: RegisterComponent
    },
    {
        path: '/Login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/Logout',
        name: 'Logout',
        data: { roles:[ "all" ] },
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
        path: '/ToursList/:type/Page/:page/Count/:count',
        name: 'ToursListFilter',
        component: TravelHomePageComponent
    },
    {
        path: '/Travels/Like/Page/:page/Count/:count',
        name: 'ToursListLiked',
        component: TravelsLikedComponent
    },
    {
        path: '/Travels/Viewed/Page/:page/Count/:count',
        name: 'ToursListViewed',
        component: TravelsViewedComponent
    },
    {
        path: '/Travels/Page/:page/Count/:count/Search/:phrase',
        name: 'ToursListSearch',
        component: TravelsSearchedComponent
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
    private isAuth: boolean;
    constructor(private router: Router) {
        this.isAuth = Auth.isAuth();
    }
    ngOnInit() {
        //var sticyNavbar = $('#navbar_container');
        var slider = $("#slider_u12");
        var body = $("body");
        var sticyNavbar = $('#navbar_container');
        var startingOffset = slider.height();

        var stickyNav = function () {
            var scrollTop = $(window).scrollTop();

            var stickyNavTop = sticyNavbar.offset().top;
            if (scrollTop >= startingOffset) {
                sticyNavbar.addClass('sticky');
                body.addClass("sticky-body");
            } else {
                sticyNavbar.removeClass('sticky');
                body.removeClass("sticky-body");
            }
        };
        function setNavLayout() {
            $(document).ready(function () {
                stickyNav();
                $(window).scroll(function () {
                    stickyNav();
                });
            });
        }
        setNavLayout();
        this.router.subscribe((val: string) => {
            if (val.indexOf("ToursList") > -1 ) {
                startingOffset = slider.height();
                slider.show();
                stickyNav();
            } else {
                startingOffset = 1;
                slider.hide();
            }
            this.isAuth = Auth.isAuth();
        });

    }

}