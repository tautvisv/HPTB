import {Component, OnInit, ViewChild,  NgZone, ChangeDetectionStrategy } from 'angular2/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TravelMapComponent } from './travel-map.component';
import { TravelDayComponent } from './travel-day-item.component';
import { TravelDayDetailsComponent } from './travel-day-item-details.component';
import { Router, Location} from "angular2/router";
import { FullTravel, Point, TravelClass, TravelDayPlan, UserLocation } from "./TravelClass";
import { TravelService } from '../services/travel.service';

//import {Accordion} from 'primeng/primeng';

@Component({
    selector: 'travel',
    templateUrl: './app/travel/travel-create.component.html',
    directives: [TravelMapComponent, TravelDayComponent, TravelDayDetailsComponent],
    providers: []
})
export class TravelCreateComponent implements OnInit {
    @ViewChild(TravelMapComponent)
    mapComponent: TravelMapComponent;

    @ViewChild(TravelDayDetailsComponent)
    travelDayModal: TravelDayDetailsComponent;

   // private travels: TravelClass[];
  //  private travelHome: TravelClass;

    private travel: FullTravel = new FullTravel();
    zone: NgZone;

    constructor(private _notificationService: ToastsManager, private router: Router, public travelService: TravelService) {
        var p = new TravelClass(new Point());
            this.travel.StartDay = p;
        this.travel.EndDay = p;
        this.zone = new NgZone({ enableLongStackTrace: false });
    }
    public setNewTravel(travel: FullTravel) {
        this.travel = travel;
        this.mapComponent.setWaypoints(travel);
    }
    openTravelDayModal(travelDay: TravelClass) {
        this.travelDayModal.openModal(travelDay, travelDay.Point);
    }
    onChanges(changes) {
        console.log("pasikeit4 compoennt create", changes);
    }
    saveTravel(): void {
        this.travelService.saveTravel(this.travel).subscribe((response) => {
            console.log("great success saving travel", response);
            this._notificationService.success("kelionė sėkmingai išsaugota");
            this.router.navigate(["Tour", { id: this.travel.Id }]);
        }, () => {
            this._notificationService.error("nenumatyta klaida, praneškite administratoriui");
        });
    }
    cancelTravel(): void {
        this._notificationService.info("nustatymai neišsaugoti");
        this.router.navigate(["ToursList"]);
    }
    ngOnInit() {

      //  this.travels = [];
       // this.travelHome.Name = "Namai";
       //TODO move to travel edit component
        //this.travelService.getTravel(20).subscribe((response) => {
        //    this.setNewTravel(response);
        //}, () => {
        //    this._notificationService.error("nepavyko gauti duomenų");
        //});
    }
    ngAfterViewInit() {
        var clicks = {
            click: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => {
                if (index === -2) {
                    this.travel.StartDay.Point = new Point(coords.lat(), coords.lng());
                    this.travel.StartDay.Point.Address = address;
                } else if (index === -3) {
                    this.travel.EndDay.Point = new Point(coords.lat(), coords.lng());
                    this.travel.EndDay.Point.Address = address;
                } else {
                    var travelDay = new TravelClass(new Point(coords.lat(), coords.lng()));
                    travelDay.Point.Address = address;
                    travelDay.OrderIndex = index + 2;
                    this.travel.WayPoints.push(travelDay);
                }
                this._notificationService.warning("click" + this.travel.WayPoints.length);
                this.zone.run(() => {
                    console.log('Updated List: ');
                });
            },
            dragged: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => {
                var newPoint = new Point(coords.lat(), coords.lng());
                newPoint.Address = address;
                if (index === -2) {
                    this.travel.StartDay.Point = newPoint;
                } else if (index === -3) {
                    this.travel.EndDay.Point = newPoint;
                }else{
                    this.travel.WayPoints[index].Point = newPoint;
                }
                this.zone.run(() => {
                    console.log('Updated List: ');
                });
            },
            rightClick: (index: number) => {
                if (index < 0) {
                    this._notificationService.warning("Pašalinti pradžios ir pabaigos taškų negalima");
                    return;
                }
                this.travel.WayPoints.splice(index, 1);
                this._notificationService.warning("right");
                this.zone.run(() => {
                    console.log('Updated List: ');
                }); }
        };
        this.mapComponent.setMapClicks(clicks);
    }
}