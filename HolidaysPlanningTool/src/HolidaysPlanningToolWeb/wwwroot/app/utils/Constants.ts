export class Constants {
    public static get WebUrl(): string { return Server.Address.value + "/"; }
    public static get WebAPIUrl(): string { return Server.Address.value + "/api/"; }
    public static get WebAPI(): string { return Server.Address.value; }
    public static get TokenName(): string { return "auth-token"; }
    public static get TokenHeaderName(): string { return "Authorization"; }
    public static get TokenType(): string { return "Bearer "; }
}