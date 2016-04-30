import { CONFIG } from "../config/app-config";

export class Auth {
    public static isAuth(): boolean {
        let token = localStorage.getItem(CONFIG.token);
        return !!token;
    }
}