import {Component, OnInit, Input, Output, ViewChild, ElementRef, OnDestroy, EventEmitter } from 'angular2/core';
import { Point, TravelClass, TravelDayPlan, UserLocation, TravelMethodsHelper } from "./TravelClass";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {GoogleMaps, MapClickCallbacks} from "./maps/GoogleMap";

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-day-details-edit-modal',
    // Location of the template for this component
    //templateUrl: './app/travel/travel-day-item-details.component.html',
    template: `<div *ngIf="isVisible">
                <div class="form-group label-floating col-md-4">
                    <label for="travel_day_name" class="control-label">Pavadinimas</label>
                    <input type="text" [(ngModel)]="selectedDay.Name" id="travel_day_name" class="form-control" />
                </div>
                <div class="form-group label-floating col-md-4">
                    <label for="duration" class="control-label">Trukmė:</label>
                    <input type="time" [(ngModel)]="selectedDay.Duration" id="duration" class="form-control" />
                </div>
                <div class="form-group label-floating col-md-4">
                    <label for="date_s" class="control-label">Data:</label>
                    <input type="datetime-local" [(ngModel)]="selectedDay.Date" id="date_s" class="form-control" />
                </div>
                <div class="form-group label-floating col-md-4" *ngIf="selectedDay.Point">
                    <label for="day_point_address" class="control-label">Adresas:</label>
                    <input type="text" [(ngModel)]="selectedDay.Point.Address" id="day_point_address" class="form-control" />
                </div>
                <div class="form-group label-floating col-md-12">
                    <label for="desc_i" class="control-label">Aprašymas:</label>
                    <textarea rows="3" type="text" [(ngModel)]="selectedDay.Description" id="desc_i" class="form-control"></textarea>
                </div>
            </div>`,
    providers: [],
    directives: []
})
export class TravelDayDetailsEditComponent implements OnDestroy {
    @Output() private pointChanged = new EventEmitter();
    @Input("selectedDay")
    private selectedDay: TravelDayPlan;
    private isVisible: boolean = true;
    private autocomplete: any;
    constructor(private myElement: ElementRef) {
    }
    ngOnChanges(changeRecord) {
        if (!changeRecord.selectedDay.currentValue) {
            this.selectedDay = new TravelDayPlan(null);
            this.isVisible = false;
            return
        }
        this.isVisible = true;
    }
    ngAfterViewInit() {
        var input = <HTMLInputElement>$(this.myElement.nativeElement).find("#day_point_address")[0];// < HTMLInputElement > document.getElementById('point_address');
        this.autocomplete = new google.maps.places.Autocomplete(input);
        var that = this;
        this.autocomplete.addListener('place_changed', function () {
            var place = that.autocomplete.getPlace();
            console.log("pasirinkta vieta modale", input.value);
            if (!place.geometry) {
                console.error("vietove nerasta: ", input.value);
                return;
            }
            that.selectedDay.Point.Address = input.value;
            that.selectedDay.Point.Latitude = place.geometry.location.lat();
            that.selectedDay.Point.Longitude = place.geometry.location.lng();
            that.pointChanged.emit(null);
            //that.todoService.itemAdded$.emit(that.travel.Point);
            // this.itemAdded$.emit(item);
        });
    }
    ngOnDestroy() {
        google.maps.event.trigger(this.autocomplete, 'remove', true);
    }
}

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-day-details-modal',
    // Location of the template for this component
    templateUrl: './app/travel/travel-day-item-details.component.html',
    providers: [GoogleMaps, TravelMethodsHelper],
    directives: [MODAL_DIRECTIVES, TravelDayDetailsEditComponent]
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
    abc(selectedDay) {
        console.log(selectedDay);
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
        this.map.setOptimizeRoute(true);
        var clicks = {
            click: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => {
                var point = new Point(coords.lat(), coords.lng());
                point.Address = address;
                this.travel.TravelDays.push(new TravelDayPlan(point));
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
                    this.travel.TravelDays[0].Point.Address = address;
                    this.travel.TravelDays[0].Point.Latitude = newPoint.Latitude;
                    this.travel.TravelDays[0].Point.Longitude = newPoint.Longitude;
                } else if (index === -3) {
                    this.travel.TravelDays[this.travel.TravelDays.length - 1].Point.Address = address;
                    this.travel.TravelDays[this.travel.TravelDays.length - 1].Point.Latitude = newPoint.Latitude;
                    this.travel.TravelDays[this.travel.TravelDays.length - 1].Point.Longitude = newPoint.Longitude;
                } else {
                    this.travel.TravelDays[index + 1].Point.Address = address;
                    this.travel.TravelDays[index + 1].Point.Latitude = newPoint.Latitude;
                    this.travel.TravelDays[index + 1].Point.Longitude = newPoint.Longitude;
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