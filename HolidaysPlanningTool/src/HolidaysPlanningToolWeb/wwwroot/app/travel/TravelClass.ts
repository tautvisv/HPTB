import {Injectable } from 'angular2/core';

@Injectable()
export class TravelMethodsHelper {
    constructor() {
        
    }
    public convertPointToGooglePoint(point: Point): google.maps.LatLng {
        return new google.maps.LatLng(point.Latitude, point.Longitude);
    }
    public convertPointToDirectionsWaypoint(point: Point, stopover: boolean = true): google.maps.DirectionsWaypoint {
        return { location: new google.maps.LatLng(point.Latitude, point.Longitude), stopover: stopover };
    }
    public convertILocationPointsToDirectionsWaypoint(points: ILocationPoint[]): google.maps.DirectionsWaypoint[]{
        var newList: google.maps.DirectionsWaypoint[] = [];
        //points.forEach(function (pointableObject: ILocationPoint) {
        //});
        for (let i = 1; i < points.length - 1; i++) {
            newList.push(this.convertPointToDirectionsWaypoint(points[i].Point));
        }
        return newList;
    }
    public convertAllILocationPointsToDirectionsWaypoint(points: ILocationPoint[]): google.maps.DirectionsWaypoint[] {
        var newList: google.maps.DirectionsWaypoint[] = [];
        //points.forEach(function (pointableObject: ILocationPoint) {
        //});
        for (let i = 0; i < points.length; i++) {
            newList.push(this.convertPointToDirectionsWaypoint(points[i].Point));
        }
        return newList;
    }
}
export interface ILocationPoint {
    Point: Point;
}
export class Point {
    public Latitude: number;
    public Longitude: number;
    public Address: string;
    constructor(latitude?: number, longitude?: number) {
        this.Latitude = latitude;
        this.Longitude = longitude;
    }

    public ToGooglePoint(): google.maps.LatLng {
        return new google.maps.LatLng(this.Latitude, this.Longitude);
    }
}
export class UserLocation {
    public Name: string;
    public Description: string;
    public Point: Point;
}
export class TravelDayPlan implements ILocationPoint {
    public Name: string;
    public Description: string;
    public Date: Date;
    public Duration: string;
    public Point: Point;
    constructor(point: Point) {
        this.Point = point;
    }
}
export class TravelClass implements ILocationPoint  {
    public Name: string;
    public Description: string;
    public TravelDays: TravelDayPlan[];
    public Date: Date;
    public Point: Point;
    public ImageUrl: string;
    public OrderIndex: number;
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