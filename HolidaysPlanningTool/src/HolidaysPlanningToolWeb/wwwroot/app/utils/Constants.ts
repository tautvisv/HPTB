export class Constants {
    public static get WebUrl(): string { return "http://localhost:37096/"; }
    public static get WebAPIUrl(): string { return "http://localhost:37096/api/"; }
    public static get WebAPI(): string { return "http://localhost:37096"; }
    public static get TokenName(): string { return "auth-token"; }
    public static get TokenHeaderName(): string { return "Authorization"; }
    public static get TokenType(): string { return "Bearer "; }
}