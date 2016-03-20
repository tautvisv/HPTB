interface INotify {
    error(message: string): void;
    warning(message: string): void;
    success(message: string): void;
}
export class NotificationService2 implements INotify {
    error(message: string) { console.error(message); }
    warning(message: string) { console.warn(message); }
    success(message: string) { console.log(message); }
}