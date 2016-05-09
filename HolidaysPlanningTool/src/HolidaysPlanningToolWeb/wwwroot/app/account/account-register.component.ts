import {Component, OnInit, AfterViewInit } from 'angular2/core';
import { AccountService, UserRegisterModel } from '../services/account.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Router } from "angular2/router";

@Component({
    selector: 'account-register',
    templateUrl: './app/account/account-register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {
    private user: UserRegisterModel = new UserRegisterModel();
    constructor(private accountService: AccountService, private notificationsService: ToastsManager, private router: Router) {
    }
    ngOnInit() {

    }
    Register() {
        var valid = this.user.isValid();
        switch (valid) {
            case (-32):
                this.notificationsService.error("Slaptažodis privalo turėti bent vieną skaitmenį ir raidę");
                break;
            case (-31):
                this.notificationsService.error("Slaptažodis turi būti bent 6 simbolių ilgio");
                break;
            case (-30):
                this.notificationsService.error("Slaptažodis yra privalomas ir pakartotas slaptažodis privalo sutapti");
                break;
            case (-20):
                this.notificationsService.error("El. paštas yra privalomas");
                break;
            case (-21):
                this.notificationsService.error("El. pašto blogas formatas");
                break;
            case (-10):
                this.notificationsService.error("Vartotojo vardas ir prisijungimo vardas yra privalomas");
                break;
            case (1):
                this.accountService.register(this.user).subscribe((result: any) => {
                    this.notificationsService.success("Jūs sėkmingai susikūrėti savo paskyrą");
                    this.router.navigate(["ToursList"]);
                },
                    (err) => {
                        var message = "";
                        if (err) {
                            var response = err.json();
                            message = (response && response.Message) ? ". " + response.Message : "";
                        }
                        this.notificationsService.error("Sukurti paskyros nepaviko" + message);
                    });
                break;
            default:
                this.notificationsService.error("Nenumatyta klaida, praneškite sistemos administratoriui");
                break;
        }
    }
    back() {
        this.router.navigate(["ToursList"]);
    }
    ngAfterViewInit() {
        $("input").change();
    }
}