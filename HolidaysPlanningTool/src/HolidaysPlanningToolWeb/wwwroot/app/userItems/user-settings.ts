export class UserSettingsItem {
    constructor(public title: string, public value: string, public valueName: string, public hint: string,  public pattern) {
    }
}

export class UserSettings {
    constructor() {
    }
    public name: string;
    public surname: string;
    public address: string;
    public phone: string;
    public description: string;
    public extra_info: string;
    public email: string;
}

export class UserSettingsViewItem {
    constructor() {
    }
    public name: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public surname: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public address: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public phone: UserSettingsItem = new UserSettingsItem("", "", "", "", "[\\+]?\\d{5,15}");
    public description: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public extra_info: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public email: UserSettingsItem = new UserSettingsItem("", "", "", "", "[a-zA-Z0-9]*@[a-zA-Z0-9]*");

    public createFromUserSettings(userSettings: UserSettings): void {
        this.name = new UserSettingsItem("Vardas", userSettings.name, "name", "vartotojo vardas", ".*");
        this.surname = new UserSettingsItem("Pavardė", userSettings.surname, "surname", "vartotojo pavardė", ".*");
        this.address = new UserSettingsItem("Adresas", userSettings.address, "address", "Vartotojo adresas", ".*");
        this.phone = new UserSettingsItem("Telefonas", userSettings.phone, "phone", "Vartotojo numeris", "[\\+]?\\d{5,15}");
        this.description = new UserSettingsItem("Apie", userSettings.description, "description", "Vartotojo trumpas aprašymas", ".*");
        this.extra_info = new UserSettingsItem("Informacija", userSettings.extra_info, "extra_info", "Papildoma informacija apie vartotoją", ".*");
        this.email = new UserSettingsItem("El. paštas", userSettings.email, "email", "vartotojo paštas", "[a-zA-Z0-9]*@[a-zA-Z0-9]*");
    }

}