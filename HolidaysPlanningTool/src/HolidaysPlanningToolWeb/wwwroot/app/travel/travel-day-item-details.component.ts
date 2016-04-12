import {Component, OnInit, Input, ViewChild } from 'angular2/core';
import { Point, TravelClass, TravelDayPlan, UserLocation, TravelMethodsHelper } from "./TravelClass";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {GoogleMaps, MapClickCallbacks} from "./maps/GoogleMap";

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-day-details-modal',
    // Location of the template for this component
    templateUrl: './app/travel/travel-day-item-details.component.html',
    providers: [GoogleMaps, TravelMethodsHelper],
    directives: [MODAL_DIRECTIVES]
})
export class TravelDayDetailsComponent implements OnInit {
    //@Input()
    private travel: TravelClass;

    @ViewChild('myModal')
    modal: ModalComponent;

    private centerPoint: google.maps.LatLng;
    private selectedDay: TravelDayPlan;
    constructor(private map: GoogleMaps, private travelMethods: TravelMethodsHelper) {
        this.travel = new TravelClass();
    }
    reinitialise() {
        google.maps.event.trigger(this.map.getMap(), 'resize');
        this.recalculateRoute();
    }
    private recalculateRoute() {
        if (this.travel && this.travel.Point)
            this.map.setView(this.centerPoint);
        else console.error("Nėra taško!!!");

        if (this.travel.TravelDays.length)
            var first = this.travelMethods.convertPointToDirectionsWaypoint(this.travel.TravelDays[0].Point);

        if (this.travel.TravelDays.length > 1)
            var last = this.travelMethods.convertPointToDirectionsWaypoint(this.travel.TravelDays[this.travel.TravelDays.length - 1].Point);
        var waypoints = this.travelMethods.convertILocationPointsToDirectionsWaypoint(this.travel.TravelDays);
        this.map.setWayPoints(first, last, waypoints);
    }
    public openModal(travel: TravelClass, point: Point) {
        if (!point) throw "travel-day-item.component point must be set!";
        this.centerPoint = new google.maps.LatLng(point.Latitude, point.Longitude)
        this.travel = travel;
        console.log("new travel:", this.travel);
        this.selectedDay = null;
        this.modal.open('lg');
        //
        setTimeout(this.reinitialise.bind(this)
            , 1000)
    }
    closeModal() {
    }

    ngOnInit() {
        this.map.initialise("travel_day_map");

        var clicks = {
            click: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => {
                this.travel.TravelDays.push(new TravelDayPlan(new Point(coords.lat(), coords.lng())));
                this.recalculateRoute();
                /*this._notificationService.warning("click" + this.travel.wayPoints.length);
                this.zone.run(() => {
                    console.log('Updated List: ');
                });*/
            },
            dragged: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => {
                var newPoint = new Point(coords.lat(), coords.lng());
                newPoint.Address = address;
                if (index === -2) {
                    this.travel.TravelDays[0].Point = newPoint;
                } else if (index === -3) {
                    this.travel.TravelDays[this.travel.TravelDays.length - 1].Point = newPoint;
                } else {
                    this.travel.TravelDays[index+1].Point = newPoint;
                }

            },
            rightClick: (index: number) => {
                if (index === -2) {
                    this.travel.TravelDays.shift();
                } else if (index === -3) {
                    this.travel.TravelDays.pop();
                } else {
                    this.travel.TravelDays.splice(index+1, 1);
                }
            }
        };
        this.map.setCallBacks(clicks);
    }
}