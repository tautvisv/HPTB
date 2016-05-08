import {Component, OnInit, ViewChild,  NgZone, ChangeDetectionStrategy } from 'angular2/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TravelMapComponent } from './travel-map.component';
import { TravelDayComponent } from './travel-day-item.component';
import { TravelDayDetailsComponent } from './travel-day-item-details.component';
import { Router, Location} from "angular2/router";
import { FullTravel, Point, TravelClass, TravelDayPlan, UserLocation } from "./TravelClass";
import { TravelService } from '../services/travel.service';
import { UploadService } from '../services/file-upload.service';
import {Constants} from '../utils/Constants'; 
import {TodoService} from '../services/global-emmiter'; 

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
    private fileUploader: UploadService = new UploadService();
    private travel: FullTravel = new FullTravel();
    zone: NgZone;

    constructor(private _notificationService: ToastsManager, private router: Router, public travelService: TravelService, private todoService: TodoService) {
        var p = new TravelClass(new Point());
        this.travel.StartDay = p;
        var p2 = new TravelClass(new Point());
        this.travel.EndDay = p2;
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.todoService.itemAdded$.subscribe((address) => {
            console.log("item added", address);
            this.mapComponent.setWaypoints(this.travel);
        });
    }
    private a = new TravelClass(new Point());
    public setNewTravel(travel: FullTravel) {
        this.travel = travel;
        this.mapComponent.setWaypoints(travel);
    }
    openTravelDayModal(travelDay: TravelClass) {
        this.travelDayModal.openModal(travelDay, travelDay.Point);
    }

    onFileUpload(event) {
        var files = event.srcElement.files;
        if (!files.length) {
            return;
        }
        this.fileUploader.makeFileRequest('/api/PhotoUpload/UploadTravelPhoto', [], files).subscribe((photoUrl: string[]) => {
            console.log('sent', photoUrl);
            this.travel.ImageUrls = photoUrl;
            this.travel.ImageUrl = photoUrl[0];
        });
    }

    saveTravel(): void {
        this.travelService.saveTravel(this.travel).subscribe((response: FullTravel) => {
            this._notificationService.success("kelionė sėkmingai išsaugota");
            this.router.navigate(["Tour", { id: response.Id }]);
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
                if (index == -1) {
                    this._notificationService.warning("Pašalinti pradžios ir pabaigos taškų negalima");
                    return;
                }
                var newStDay: TravelClass;
                if (index == -2) {
                    if (this.travel.WayPoints.length) {
                        newStDay = this.travel.WayPoints.splice(0, 1)[0];
                    } else {
                        newStDay = new TravelClass(new Point());
                    }
                    this.travel.StartDay = newStDay;
                } else if (index == -3) {
                    if (this.travel.WayPoints.length) {
                        newStDay = this.travel.WayPoints.splice(this.travel.WayPoints.length-1, 1)[0];
                    } else {
                        newStDay = new TravelClass(new Point());
                    }
                    this.travel.EndDay = newStDay;
                } else {
                    this.travel.WayPoints.splice(index, 1);
                }
                for (let i = 0; i < this.travel.WayPoints.length; i++) {
                    this.travel.WayPoints[i].OrderIndex = i + 2;
                }
                this.zone.run(() => {
                    console.log('Updated List: ');
                });
            }
        };
        this.mapComponent.setMapClicks(clicks);
    }
}