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
    public ImageUrl: string;
    constructor(point?: Point) {
        this.TravelDays = [];
        this.Point = point;
    }
}
export class FullTravel {
    public Id: number;
    public Name: string;
    public startDay: TravelClass;
    public endDay: TravelClass;
    public wayPoints: TravelClass[];
    public ImageUrl: string;
    public Descrription: string;
    public Likes: number;
    public Views: number;
    public CommentsCount: number;
    public Comments: Comment[];
}

export class Comment {
    constructor(comment: Comment = null) {
        if (comment != null) {
            this.Text = comment.Text;
            this.Date = comment.Date;
            this.Author = comment.Author;
        } else {
            this.Text = "Testinis komentaras kurio tekstas yra labai ilgas";
            this.Date = new Date();
            this.Author = new Author();
            this.Author.Name = "TestinisAutorius";
            this.Author.ImageUrl = "https://dn1w8s6xszn0j.cloudfront.net/resources_version/desktop/img/default/user/t1/default_3.jpg";
        }
    }
    public Date: Date;
    public Author: Author;
    public Text: string;
}
export class Author {
    public Name: string;
    public ImageUrl: string;
}