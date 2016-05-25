"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var TravelDayComponent = (function () {
    function TravelDayComponent(myElement, todoService) {
        this.myElement = myElement;
        this.todoService = todoService;
    }
    TravelDayComponent.prototype.onChangeHotel = function (address) {
        console.log(address);
        this.travel.Point.Address = address;
        this.input.value = address;
        google.maps.event.trigger(this.autocomplete, 'place_changed');
    };
    TravelDayComponent.prototype.ngOnInit = function () {
    };
    TravelDayComponent.prototype.ngAfterViewInit = function () {
        this.input = $(this.myElement.nativeElement).find("#point_address")[0]; // < HTMLInputElement > document.getElementById('point_address');
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
            that.travel.Point.Latitude = place.geometry.location.lat();
            that.travel.Point.Longitude = place.geometry.location.lng();
            that.todoService.itemAdded$.emit(that.travel.Point);
            // this.itemAdded$.emit(item);
        });
        this.autocomplete = autocomplete;
    };
    TravelDayComponent.prototype.ngOnDestroy = function () {
        //  google.maps.event.removeListener(this.autocompleteLsr);
        // google.maps.event.clearInstanceListeners(this.autocomplete);
        google.maps.event.trigger(this.autocomplete, 'remove', true);
        google.maps.event.clearInstanceListeners(this.autocomplete);
        //this.autocomplete.unbindAll();
    };
    __decorate([
        core_1.Input()
    ], TravelDayComponent.prototype, "travel", void 0);
    __decorate([
        core_1.Input()
    ], TravelDayComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], TravelDayComponent.prototype, "hotelsList", void 0);
    TravelDayComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'travel-day-item-component',
            // Location of the template for this component
            templateUrl: './app/travel/travel-day-item component.html',
            directives: []
        })
    ], TravelDayComponent);
    return TravelDayComponent;
}());
exports.TravelDayComponent = TravelDayComponent;
//# sourceMappingURL=travel-day-item.component.js.map