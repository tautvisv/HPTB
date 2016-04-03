export class Point {
    public Latitude: number;
    public Longitude: number;
    public Address: string;
    constructor(latitude?: number, longitude?: number) {
        this.Latitude = latitude;
        this.Longitude = longitude;
    }
}
export class UserLocation {
    public Name: string;
    public Description: string;
    public Point: Point;
}
export class TravelDayPlan {
    public Name: string;
    public Description: string;
    public Date: Date;
    public Duration: number;
    public Points: UserLocation[];
    public Point: Point;
    constructor(point: Point) {
        this.Points = [];
        this.Point = point;
    }
}
export class TravelClass {
    public Name: string;
    public Description: string;
    public TravelDays: TravelDayPlan[];
    public Date: Date;
    public Point: Point;
    constructor(point?: Point) {
        this.TravelDays = [];
        this.Point = point;
    }
}
