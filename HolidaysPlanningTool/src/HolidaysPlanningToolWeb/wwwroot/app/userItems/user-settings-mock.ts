import { UserSettingsItem } from './user-settings';
import {Injectable} from 'angular2/core';

@Injectable()
export class UserSettingsMock {
    constructor() {
    }
    public name: UserSettingsItem = new UserSettingsItem("Vardas", "Tautvydas", "name", "vartotojo vardas", ".*");
    public surname: UserSettingsItem = new UserSettingsItem("Pavardė", "Vaitiekūnas", "surname", "vartotojo pavardė", ".*");
    public address: UserSettingsItem = new UserSettingsItem("Adresas", "Tauro g. 13", "address", "Vartotojo adresas", ".*");
    public phone: UserSettingsItem = new UserSettingsItem("Telefonas", "+37069958876", "phone", "Vartotojo numeris", "[\\+]?\\d{5,15}");
    public description: UserSettingsItem = new UserSettingsItem("Apie", "Programuotojas", "description", "Vartotojo trumpas aprašymas", ".*");
    public extra_info: UserSettingsItem = new UserSettingsItem("Informacija", "Kuriu programą", "extra_info", "Papildoma informacija apie vartotoją", ".*");
    public email: UserSettingsItem = new UserSettingsItem("El. paštas", "tautvisv@gmail.com", "email", "vartotojo paštas", "[a-zA-Z0-9]*@[a-zA-Z0-9]*");
}