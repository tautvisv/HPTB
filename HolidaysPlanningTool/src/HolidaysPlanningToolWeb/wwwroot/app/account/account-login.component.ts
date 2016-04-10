import {Component, OnInit } from 'angular2/core';
import { AccountService } from '../services/account.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Router} from "angular2/router";

@Component({
    selector: 'account-login',
    templateUrl: './app/account/account-login.component.html',
    directives: []
})
export class LoginComponent implements OnInit {
    private name: string;
    private password: string;
    constructor(private accountService: AccountService, private notificationsService: ToastsManager, private router: Router) {
    }
    ngOnInit() {

    }
    login() {
        this.accountService.login(this.name, this.password).subscribe(() => {
            this.notificationsService.success("Jūs sėkmingai prisijungėte");
            this.router.navigate(["ToursList"]);
        },
            () => {
                this.notificationsService.error("Prisijungti nepavyko");
            });
    }
}