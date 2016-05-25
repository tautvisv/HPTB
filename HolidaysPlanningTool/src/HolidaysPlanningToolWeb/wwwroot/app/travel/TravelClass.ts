import {Injectable } from 'angular2/core';
import {Constants} from '../utils/Constants';

@Injectable()
export class TravelMethodsHelper {
    constructor() {
        
    }
    public convertPointToGooglePoint(point: Point): google.maps.LatLng {
        if (!point) return null;
        return new google.maps.LatLng(point.Latitude, point.Longitude);
    }
    public convertPointToDirectionsWaypoint(point: Point, stopover: boolean = true): google.maps.DirectionsWaypoint {
        if (!point) return null;
        return { location: new google.maps.LatLng(point.Latitude, point.Longitude), stopover: stopover };
    }
    public convertILocationPointsToDirectionsWaypoint(points: ILocationPoint[]): google.maps.DirectionsWaypoint[]{
        var newList: google.maps.DirectionsWaypoint[] = [];
        if (!points) return newList;
        //points.forEach(function (pointableObject: ILocationPoint) {
        //});
        for (let i = 1; i < points.length - 1; i++) {
            newList.push(this.convertPointToDirectionsWaypoint(points[i].Point));
        }
        return newList;
    }
    public convertAllILocationPointsToDirectionsWaypoint(points: ILocationPoint[]): google.maps.DirectionsWaypoint[] {
        var newList: google.maps.DirectionsWaypoint[] = [];
        if (!points) return newList;
        //points.forEach(function (pointableObject: ILocationPoint) {
        //});
        for (let i = 0; i < points.length; i++) {
            newList.push(this.convertPointToDirectionsWaypoint(points[i].Point));
        }
        return newList;
    }
    public static processTravelFromServer(travel: FullTravel) {
        if (!travel) return;
        this.travelDayStringateToDate(travel.StartDay);
        this.travelDayStringateToDate(travel.EndDay);
        if (travel.WayPoints) {
            for (let i = 0; i < travel.WayPoints.length; i++) {
                this.travelDayStringateToDate(travel.WayPoints[i]);
            }
        }
    }
    public static processTravels(result: FullTravel[]) {
        console.log("response from API:", result);
        result.forEach(function (travel) {
            if (travel.Author)
            travel.Author.ImageUrl = TravelMethodsHelper.getPhotoUrl(travel.Author.ImageUrl);
            travel.ImageUrl = TravelMethodsHelper.getPhotoUrl(travel.ImageUrl);
        });

    }

    public static processTravelsImages(result: IImage[]) {
        console.log("response from API:", result);
        result.forEach(function (travel) {
            travel.ImageUrl = TravelMethodsHelper.getPhotoUrl(travel.ImageUrl);
        });

    }

    public static getPhotoUrl(photoUrl: string) {
        if (!photoUrl) {
            return "/images/no_img.png";
        }
        return Constants.WebAPI + photoUrl;
    }
    private static travelDayStringateToDate(travelDay: TravelClass) {
        if (travelDay) travelDay.Date = this.stringDateToDate(travelDay.Date);
    }
    private static stringDateToDate(stringDate: any): Date {
        if (!stringDate) return null;
        return new Date(stringDate);
    }
}
export interface ILocationPoint {
    Point: Point;
}
export interface IImage {
    ImageUrl: string;
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
export class TravelClass implements ILocationPoint,IImage  {
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
export class FullTravel implements IImage {
    public Id: number;
    public Name: string;
    public StartDay: TravelClass;
    public EndDay: TravelClass;
    public WayPoints: TravelClass[];
    public ImageUrl: string;
    public ImageUrls: string[];
    public FullImageUrl(): string { return this.ImageUrl? Constants.WebAPI + this.ImageUrl: ""; };
    public Description: string;
    public Author: Author;
    public Likes: number;
    public Views: number;
    public CommentsCount: number;
    public Comments: Comment[];
    constructor() { this.WayPoints = []; this.Comments = []; }
}

export class Comment {
    constructor(comment: Comment = null) {
        //if (comment != null) {
        //    this.Text = comment.Text;
        //    this.Date = comment.Date;
        //    this.Author = comment.Author;
        //} else {
        //    this.Text = "Testinis komentaras kurio tekstas yra labai ilgas";
        //    this.Date = new Date();
        //    this.Author = new Author();
        //    this.Author.Name = "TestinisAutorius";
        //    this.Author.ImageUrl = "https://dn1w8s6xszn0j.cloudfront.net/resources_version/desktop/img/default/user/t1/default_3.jpg";
        //}
    }
    public Date: Date;
    public Author: Author;
    public Text: string;
    public TravelId: number;
}
export class Author {
    public Name: string;
    public ImageUrl: string;
}
export class Pager<T> {

    public Results: T[];
    public CurrentPage: number;
    public PageCount: number;
    public PageSize: number;
    public Count: number;
    
}