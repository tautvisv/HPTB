export interface IConfig {
    apiURL: string,
    title: string,
    token: string
}

export const CONFIG: IConfig = {
    apiURL: 'localhost',
    title: 'Angular 2 learning',
    token: "auth-token"
};