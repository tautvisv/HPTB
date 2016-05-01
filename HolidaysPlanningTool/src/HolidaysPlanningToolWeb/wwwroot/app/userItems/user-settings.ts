import {Constants} from '../utils/Constants';

export class UserSettingsItem {
    constructor(public title: string, public value: string, public valueName: string, public hint: string,  public pattern) {
    }
}

export class UserSettings {
    constructor() {
    }
    public Name: string;
    public Surname: string;
    public Address: string;
    public Phone: string;
    public Description: string;
    public ExtraInfo: string;
    public Email: string;
    public ImageUrl: string;
}
//TOOd remove this comment
//http://localhost:37096/
export class UserSettingsViewItem {
    constructor() {
    }
    public name: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public surname: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public address: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public phone: UserSettingsItem = new UserSettingsItem("", "", "", "", "[\\+]?\\d{5,15}");
    public description: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public extra_info: UserSettingsItem = new UserSettingsItem("", "", "", "", ".*");
    public email: UserSettingsItem = new UserSettingsItem("", "", "", "", "[a-zA-Z0-9]*@[a-zA-Z0-9.]*");
    public image = { fullUrl: "", url:""};

    public createFromUserSettings(userSettings: UserSettings): void {
        this.name = new UserSettingsItem("Vardas", userSettings.Name, "name", "vartotojo vardas", ".*");
        this.surname = new UserSettingsItem("Pavardė", userSettings.Surname, "surname", "vartotojo pavardė", ".*");
        this.address = new UserSettingsItem("Adresas", userSettings.Address, "address", "Vartotojo adresas", ".*");
        this.phone = new UserSettingsItem("Telefonas", userSettings.Phone, "phone", "Vartotojo numeris", "[\\+]?\\d{5,15}");
        this.description = new UserSettingsItem("Apie", userSettings.Description, "description", "Vartotojo trumpas aprašymas", ".*");
        this.extra_info = new UserSettingsItem("Informacija", userSettings.ExtraInfo, "extra_info", "Papildoma informacija apie vartotoją", ".*");
        this.email = new UserSettingsItem("El. paštas", userSettings.Email, "email", "vartotojo paštas", "[a-zA-Z0-9]*@[a-zA-Z0-9]*");
        this.image.fullUrl = Constants.WebUrl + userSettings.ImageUrl;
        this.image.url = userSettings.ImageUrl;
    }
    public getUserSettings(): UserSettings {
        var settings = new UserSettings();
        settings.Address = this.address.value;
        settings.Description = this.description.value;
        settings.Email = this.email.value;
        settings.ExtraInfo = this.extra_info.value;
        settings.ImageUrl = this.image.url;
        settings.Name = this.name.value;
        settings.Phone = this.phone.value;
        settings.Surname = this.surname.value;
        return settings;
    }
}