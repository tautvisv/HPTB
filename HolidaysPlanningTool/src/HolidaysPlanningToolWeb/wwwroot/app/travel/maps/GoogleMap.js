"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var GoogleMaps = (function () {
    function GoogleMaps(notificationServiceToaster) {
        this.notificationServiceToaster = notificationServiceToaster;
        this.geocoder = new google.maps.Geocoder;
        this.wayPointsCount = 5;
        // var mapOption = new google.maps.MapOptions();
        this.wayPoints = [];
        this.markers = [];
    }
    GoogleMaps.prototype.setCallBacks = function (clickFunction) {
        if (!clickFunction) {
            throw "GoogleMap.ts: clickFunctions must be set";
        }
        this.clickFunctions = clickFunction;
    };
    GoogleMaps.prototype.initialise = function () {
        var _this = this;
        var mapContainer = document.getElementById("the_map");
        var mapObj = new google.maps.Map(mapContainer, {
            zoom: 8,
            maxZoom: 12,
            center: new google.maps.LatLng(54.8985049, 23.9578067),
        });
        this.map = mapObj;
        this.routeService = new RouteService(mapObj);
        for (var i = 0; i < this.wayPointsCount; i++) {
            this.addEmptyMarker(i.toString());
        }
        this.homeMarker = this.createEmptyMarker("H");
        google.maps.event.addListener(this.homeMarker, 'rightclick', function ($event) {
            _this.clickFunctions.rightClick(-2);
            _this.homeMarker.setMap(null);
            _this.resetMarkers();
            _this.findRoute();
        });
        google.maps.event.addListener(this.homeMarker, 'dragend', function ($event) {
            var coords = $event.latLng;
            _this.startPoint.location = coords;
            _this.endPoint.location = coords;
            _this.clickFunctions.dragged(coords, -2);
            _this.findRoute();
        });
        var clicks = {
            click: function (homePoint, endPoint, waypoints, index, coords, address) { },
            dragged: function (coords, index) { },
            rightClick: function (index) { }
        };
        this.clickFunctions = clicks;
        var that = this;
        google.maps.event.addListener(this.map, 'click', function ($event) {
            if (_this.wayPointsCount <= _this.wayPoints.length) {
                _this.notificationServiceToaster.warning("Pasiektas taškų limitas");
                return;
            }
            var coordinates = $event.latLng;
            _this.geocoder.geocode({ location: coordinates }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var index;
                        var waypoint = { location: coordinates, stopover: false };
                        if (!_this.startPoint) {
                            _this.startPoint = waypoint;
                            _this.endPoint = waypoint;
                            _this.homeMarker.setMap(_this.map);
                            _this.homeMarker.setPosition(waypoint.location);
                            index = -2;
                        }
                        else {
                            _this.wayPoints.push(waypoint);
                            index = _this.wayPoints.length - 1;
                            _this.markers[index].setMap(_this.map);
                            _this.markers[index].setPosition(waypoint.location);
                        }
                        _this.clickFunctions.click(_this.startPoint, _this.endPoint, _this.wayPoints, index, coordinates, results[0].formatted_address);
                        _this.findRoute();
                    }
                    else {
                        window.alert('No results found');
                    }
                }
                else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        });
    };
    GoogleMaps.prototype.setWayPoints = function (newWaypoints) {
        if (newWaypoints.length > this.wayPointsCount) {
            throw "GoogleMaps.ts: maximum waypoints length expected: " + this.wayPointsCount + " but found " + newWaypoints.length;
        }
        this.wayPoints = newWaypoints;
        this.findRoute();
    };
    GoogleMaps.prototype.createEmptyMarker = function (label) {
        var marker = new google.maps.Marker({
            map: null,
            draggable: true,
            label: label,
        });
        return marker;
    };
    GoogleMaps.prototype.addEmptyMarker = function (label) {
        var _this = this;
        var marker = this.createEmptyMarker(label);
        google.maps.event.addListener(marker, 'rightclick', function ($event) {
            var index = _this.markers.lastIndexOf(marker);
            if (index < 0) {
                debugger;
                throw "unexpected marker";
            }
            _this.clickFunctions.rightClick(index);
            _this.wayPoints.splice(index, 1);
            _this.markers[index].setMap(null);
            _this.resetMarkers();
            _this.findRoute();
        });
        google.maps.event.addListener(marker, 'dragend', function ($event) {
            var index = _this.markers.lastIndexOf(marker);
            if (index < 0) {
                debugger;
                throw "unexpected marker";
            }
            var coords = $event.latLng;
            _this.geocoder.geocode({ location: coords }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    debugger;
                    if (results[0]) {
                        _this.wayPoints[index].location = coords;
                        _this.clickFunctions.dragged(coords, index);
                        _this.findRoute();
                    }
                    else {
                        window.alert('No results found');
                    }
                }
                else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        });
        this.markers.push(marker);
    };
    GoogleMaps.prototype.resetMarkers = function () {
        for (var i = 0; i < this.wayPoints.length; i++) {
            this.markers[i].setMap(this.map);
            this.markers[i].setPosition(this.wayPoints[i].location);
        }
        for (var j = i; j < this.wayPointsCount; j++) {
            this.markers[j].setMap(null);
        }
        if (this.startPoint && this.endPoint) {
            this.homeMarker.setMap(this.map);
            this.homeMarker.setPosition(this.startPoint.location);
        }
    };
    GoogleMaps.prototype.findRoute = function () {
        if (this.startPoint && this.endPoint) {
            this.routeService.findRoute(this.startPoint.location, this.endPoint.location, this.wayPoints, false);
        }
        else {
            this.routeService.removeRoute();
        }
    };
    GoogleMaps = __decorate([
        core_1.Injectable()
    ], GoogleMaps);
    return GoogleMaps;
}());
exports.GoogleMaps = GoogleMaps;
var RouteService = (function () {
    function RouteService(_map) {
        this._map = _map;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setOptions({ suppressMarkers: false });
        this.directionsDisplay.setMap(this._map);
    }
    RouteService.prototype.findRoute = function (firstPoint, lastPoint, waypoints, focus) {
        var _this = this;
        if (!firstPoint || !lastPoint) {
            this.removeRoute();
            return;
        }
        this.directionsService.route({
            origin: firstPoint,
            destination: lastPoint,
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                _this.directionsDisplay.setDirections(response);
                _this.directionsDisplay.setMap(_this._map);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    RouteService.prototype.removeRoute = function () {
        this.directionsDisplay.setMap(null);
    };
    return RouteService;
}());
exports.RouteService = RouteService;
var MapService = (function () {
    function MapService() {
    }
    return MapService;
}());
exports.MapService = MapService;
//# sourceMappingURL=GoogleMap.js.map