import {Component, OnInit, ViewChild,  NgZone, ChangeDetectionStrategy } from 'angular2/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TravelMapComponent } from './travel-map.component';
import { TravelDayComponent } from './travel-day-item.component';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";
import { FullTravel, Point, TravelClass, TravelDayPlan, UserLocation } from "./TravelClass";
import { TravelService } from './travel.service';
//import {Accordion} from 'primeng/primeng';

@Component({
    selector: 'travel',
    templateUrl: './app/travel/travel-create.component.html',
    directives: [TravelMapComponent, TravelDayComponent],
    providers: [TravelService]
})
export class TravelComponent implements OnInit {
    @ViewChild(TravelMapComponent) mapComponent: TravelMapComponent;
   // private travels: TravelClass[];
  //  private travelHome: TravelClass;
    private travel: FullTravel = new FullTravel();;
    zone: NgZone;

    constructor(private _notificationService: ToastsManager, private router: Router, public travelService: TravelService) {
        var p = new TravelClass(new Point());
            this.travel.startDay = p;
        this.travel.endDay = p;
        this.zone = new NgZone({ enableLongStackTrace: false });
    }
    public setNewTravel(travel: FullTravel) {
        this.travel = travel;
        this.mapComponent.setWaypoints(travel);
    }
    onChanges(changes) {
        console.log("pasikeit4 compoennt create", changes);
    }
    saveTravel(): void {
        this.travelService.saveTravel(this.travel).subscribe(() => {
            this._notificationService.success("kelionė sėkmingai išsaugota");
        }, () => {
            this._notificationService.error("nenumatyta klaida, prane6kite administratoriui");
        });
    }
    cancelTravel(): void {
        this._notificationService.info("nustatymai neišsaugoti");
    }
    ngOnInit() {

      //  this.travels = [];
       // this.travelHome.Name = "Namai";
        this.travelService.getTravel(20).subscribe((response) => {
            this.setNewTravel(response);
        }, () => {
            this._notificationService.error("nepavyko gauti duomenų");
        });
    }
    ngAfterViewInit() {
        this._notificationService.warning("vaikas sukurtas");
        var clicks = {
            click: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => {
                if (index === -2) {
                    this.travel.startDay.Point = new Point(coords.lat(), coords.lng());
                    this.travel.startDay.Point.Address = address;
                } else if (index === -3) {
                    this.travel.endDay.Point = new Point(coords.lat(), coords.lng());
                    this.travel.endDay.Point.Address = address;
                } else {
                    var travelDay = new TravelClass(new Point(coords.lat(), coords.lng()));
                    travelDay.Point.Address = address;
                    this.travel.wayPoints.push(travelDay);
                }
                this._notificationService.warning("click" + this.travel.wayPoints.length);
                this.zone.run(() => {
                    console.log('Updated List: ');
                });
            },
            dragged: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => {
                var newPoint = new Point(coords.lat(), coords.lng());
                newPoint.Address = address;
                if (index === -2) {
                    this.travel.startDay.Point = newPoint;
                } else if (index === -3) {
                    this.travel.endDay.Point = newPoint;
                }else{
                    this.travel.wayPoints[index].Point = newPoint;
                }
                this.zone.run(() => {
                    console.log('Updated List: ');
                });
            },
            rightClick: (index: number) => {
                this.travel.wayPoints.splice(index, 1);
                this._notificationService.warning("right");
                this.zone.run(() => {
                    console.log('Updated List: ');
                }); }
        };
        this.mapComponent.setMapClicks(clicks);
    }
}