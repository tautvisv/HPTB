import {Component, OnInit } from 'angular2/core';
import { AccountService } from '../services/account.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Router} from "angular2/router";

@Component({
    selector: 'account-logout',
    templateUrl: './app/account/account-logout.component.html',
    directives: []
})
export class LogoutComponent implements OnInit {
    constructor(private accountService: AccountService, private notificationsService: ToastsManager, private router: Router) {
    }
    ngOnInit() {

    }
    logout() {
        this.accountService.logout().subscribe(() => {
            this.notificationsService.success("Jūs sėkmingai atsijungėte");
            this.router.navigate(["Login"]);
        },
            () => {
                this.notificationsService.error("Atsijungti nepavyko. Praneškite sistemaos administratoriui");
            });
    }
}