import {Component, OnInit, Input, AfterViewInit, ElementRef, OnDestroy } from 'angular2/core';
import { Point, TravelClass, TravelDayPlan, UserLocation } from "./TravelClass";
import {TodoService} from '../services/global-emmiter'; 
@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'travel-day-item-component',
    // Location of the template for this component
    templateUrl: './app/travel/travel-day-item component.html',
    directives: []
})
export class TravelDayComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() travel: TravelClass;
    @Input() title: string;
    @Input() hotelsList: any[];
    private input: HTMLInputElement;
    private autocomplete: google.maps.places.Autocomplete;
    private selectedHotel: any;
    constructor(private myElement: ElementRef, private todoService: TodoService) {
    }
    private onChangeHotel(address) {
        console.log(address);
        this.travel.Point.Address = address;
        this.input.value = address;
        
        google.maps.event.trigger(this.autocomplete, 'place_changed');
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.input = <HTMLInputElement>$(this.myElement.nativeElement).find("#point_address")[0];// < HTMLInputElement > document.getElementById('point_address');
        var autocomplete = new google.maps.places.Autocomplete(this.input);
        var thisTodo = this.todoService;
        var that = this;
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            console.log("pasirinkta vieta", that.input.value);
            if (!place) {
                console.warn("no place");
                return;
            }
            if (!place.geometry) {
                console.error("vietove nerasta: ", that.input.value);
                return;
            }
            that.travel.Point.Address = that.input.value;
            that.travel.Point.Latitude = place.geometry.location.lat()
            that.travel.Point.Longitude = place.geometry.location.lng()
            that.todoService.itemAdded$.emit(that.travel.Point);
           // this.itemAdded$.emit(item);
        });
        this.autocomplete = autocomplete;
    }
    ngOnDestroy() {
      //  google.maps.event.removeListener(this.autocompleteLsr);
        // google.maps.event.clearInstanceListeners(this.autocomplete);
        google.maps.event.trigger(this.autocomplete, 'remove', true);
        google.maps.event.clearInstanceListeners(this.autocomplete);
        //this.autocomplete.unbindAll();
    }
}