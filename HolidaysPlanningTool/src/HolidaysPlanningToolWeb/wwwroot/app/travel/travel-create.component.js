"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var travel_map_component_1 = require('./travel-map.component');
var travel_day_item_component_1 = require('./travel-day-item.component');
var travel_day_item_details_component_1 = require('./travel-day-item-details.component');
var TravelClass_1 = require("./TravelClass");
var file_upload_service_1 = require('../services/file-upload.service');
//import {Accordion} from 'primeng/primeng';
var TravelCreateComponent = (function () {
    function TravelCreateComponent(_notificationService, router, travelService) {
        this._notificationService = _notificationService;
        this.router = router;
        this.travelService = travelService;
        // private travels: TravelClass[];
        //  private travelHome: TravelClass;
        this.fileUploader = new file_upload_service_1.UploadService();
        this.travel = new TravelClass_1.FullTravel();
        var p = new TravelClass_1.TravelClass(new TravelClass_1.Point());
        this.travel.StartDay = p;
        var p2 = new TravelClass_1.TravelClass(new TravelClass_1.Point());
        this.travel.EndDay = p2;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    TravelCreateComponent.prototype.setNewTravel = function (travel) {
        this.travel = travel;
        this.mapComponent.setWaypoints(travel);
    };
    TravelCreateComponent.prototype.openTravelDayModal = function (travelDay) {
        this.travelDayModal.openModal(travelDay, travelDay.Point);
    };
    TravelCreateComponent.prototype.onChanges = function (changes) {
        console.log("pasikeit4 compoennt create", changes);
    };
    TravelCreateComponent.prototype.onFileUpload = function (event) {
        var _this = this;
        console.log('fileUplloaded');
        var files = event.srcElement.files;
        if (!files.length) {
            return;
        }
        console.log(files);
        this.fileUploader.makeFileRequest('/api/PhotoUpload/UploadTravelPhoto', [], files).subscribe(function (photoUrl) {
            console.log('sent', photoUrl);
            _this.travel.ImageUrls = photoUrl;
            _this.travel.ImageUrl = photoUrl[0];
        });
    };
    TravelCreateComponent.prototype.saveTravel = function () {
        var _this = this;
        this.travelService.saveTravel(this.travel).subscribe(function (response) {
            console.log("great success saving travel", response);
            _this._notificationService.success("kelionė sėkmingai išsaugota");
            _this.router.navigate(["Tour", { id: response.Id }]);
        }, function () {
            _this._notificationService.error("nenumatyta klaida, praneškite administratoriui");
        });
    };
    TravelCreateComponent.prototype.cancelTravel = function () {
        this._notificationService.info("nustatymai neišsaugoti");
        this.router.navigate(["ToursList"]);
    };
    TravelCreateComponent.prototype.ngOnInit = function () {
        //  this.travels = [];
        // this.travelHome.Name = "Namai";
        //TODO move to travel edit component
        //this.travelService.getTravel(20).subscribe((response) => {
        //    this.setNewTravel(response);
        //}, () => {
        //    this._notificationService.error("nepavyko gauti duomenų");
        //});
    };
    TravelCreateComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var clicks = {
            click: function (homePoint, endPoint, waypoints, index, coords, address) {
                if (index === -2) {
                    _this.travel.StartDay.Point = new TravelClass_1.Point(coords.lat(), coords.lng());
                    _this.travel.StartDay.Point.Address = address;
                }
                else if (index === -3) {
                    _this.travel.EndDay.Point = new TravelClass_1.Point(coords.lat(), coords.lng());
                    _this.travel.EndDay.Point.Address = address;
                }
                else {
                    var travelDay = new TravelClass_1.TravelClass(new TravelClass_1.Point(coords.lat(), coords.lng()));
                    travelDay.Point.Address = address;
                    travelDay.OrderIndex = index + 2;
                    _this.travel.WayPoints.push(travelDay);
                }
                _this._notificationService.warning("click" + _this.travel.WayPoints.length);
                _this.zone.run(function () {
                    console.log('Updated List: ');
                });
            },
            dragged: function (homePoint, endPoint, waypoints, index, coords, address) {
                var newPoint = new TravelClass_1.Point(coords.lat(), coords.lng());
                newPoint.Address = address;
                if (index === -2) {
                    _this.travel.StartDay.Point = newPoint;
                }
                else if (index === -3) {
                    _this.travel.EndDay.Point = newPoint;
                }
                else {
                    _this.travel.WayPoints[index].Point = newPoint;
                }
                _this.zone.run(function () {
                    console.log('Updated List: ');
                });
            },
            rightClick: function (index) {
                if (index < 0) {
                    _this._notificationService.warning("Pašalinti pradžios ir pabaigos taškų negalima");
                    return;
                }
                _this.travel.WayPoints.splice(index, 1);
                _this._notificationService.warning("right");
                _this.zone.run(function () {
                    console.log('Updated List: ');
                });
            }
        };
        this.mapComponent.setMapClicks(clicks);
    };
    __decorate([
        core_1.ViewChild(travel_map_component_1.TravelMapComponent)
    ], TravelCreateComponent.prototype, "mapComponent", void 0);
    __decorate([
        core_1.ViewChild(travel_day_item_details_component_1.TravelDayDetailsComponent)
    ], TravelCreateComponent.prototype, "travelDayModal", void 0);
    TravelCreateComponent = __decorate([
        core_1.Component({
            selector: 'travel',
            templateUrl: './app/travel/travel-create.component.html',
            directives: [travel_map_component_1.TravelMapComponent, travel_day_item_component_1.TravelDayComponent, travel_day_item_details_component_1.TravelDayDetailsComponent],
            providers: []
        })
    ], TravelCreateComponent);
    return TravelCreateComponent;
}());
exports.TravelCreateComponent = TravelCreateComponent;
//# sourceMappingURL=travel-create.component.js.map