import {Component, OnInit, ViewChild,  NgZone, ChangeDetectionStrategy } from 'angular2/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TravelMapComponent } from './travel-map.component';
import { TravelDayComponent } from './travel-day-item.component';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";
import { Point, TravelClass, TravelDayPlan, UserLocation } from "./TravelClass";

@Component({
    selector: 'travel',
    templateUrl: './app/travel/travel-create.component.html',
    directives: [TravelMapComponent, TravelDayComponent],
    providers: []
})
export class TravelComponent implements OnInit {
    @ViewChild(TravelMapComponent) mapComponent: TravelMapComponent;
    private travels: TravelClass[];
    private travelHome: TravelClass;
    zone: NgZone;
    constructor(private _notificationService: ToastsManager, private router: Router) {
        this.travelHome = new TravelClass();
        this.zone = new NgZone({ enableLongStackTrace: false });
    }
    onChanges(changes) {
        console.log("pasikeit4 compoennt create", changes);
    }
    saveTravel(): void {
        this._notificationService.success("Kelionė išsaugota");
    }
    cancelTravel(): void {
        this._notificationService.info("nustatymai neišsaugoti");
    }
    ngOnInit() {

        this.travels = [];
        this.travelHome.Name = "Namai";
    }
    ngAfterViewInit() {
        this._notificationService.warning("vaikas sukurtas");
        var clicks = {
            click: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => {
                if (index === -2) {
                    this.travelHome = new TravelClass();
                    this.travelHome.Point = new Point(coords.lat(), coords.lng());
                    this.travelHome.Point.Address = address;
                } else {
                    var travelDay = new TravelClass(new Point(coords.lat(), coords.lng()));
                    travelDay.Point.Address = address;
                    this.travels.push(travelDay);
                }
                this._notificationService.warning("click" + this.travels.length);
                //this.zone.run(() => {
                //    console.log('Updated List: ');
                //});
            },
            dragged: (coords: google.maps.LatLng, index: number) => { this._notificationService.warning("drag") },
            rightClick: (index: number) => { this._notificationService.warning("right") }
        };
        this.mapComponent.setMapClicks(clicks);
    }
}