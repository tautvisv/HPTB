"use strict";
//google key AIzaSyDSjYCCntbYJDDuF4CLpX61HV4PqlqSuIw
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
var ToastsManager = (function () {
    function ToastsManager() {
    }
    ToastsManager.prototype.error = function (string, stringas) { };
    ToastsManager.prototype.warning = function (string) { };
    return ToastsManager;
}());
var GoogleMaps = (function () {
    function GoogleMaps(map, routeService, notificationServiceToaster) {
        this.map = map;
        this.routeService = routeService;
        this.notificationServiceToaster = notificationServiceToaster;
        this.wayPointsCount = 10;
        // var mapOption = new google.maps.MapOptions();
        this.wayPoints = [];
        this.markers = [];
        this.initialise();
    }
    GoogleMaps.prototype.initialise = function () {
        var _this = this;
        for (var i = 0; i < this.wayPointsCount; i++) {
            this.addEmptyMarker(i.toString());
        }
        this.notificationServiceToaster.error("pranešimas", "su title");
        var that = this;
        google.maps.event.addListener(this.map, 'click', function ($event) {
            if (_this.wayPointsCount <= _this.wayPoints.length) {
                _this.notificationServiceToaster.warning("Pasiektas taškų limitas");
                return;
            }
            var coordinates = $event.latLng;
            var waypoint = { location: coordinates, stopover: false };
            _this.wayPoints.push(waypoint);
            _this.markers[_this.wayPoints.length - 1].setMap(_this.map);
            _this.markers[_this.wayPoints.length - 1].setPosition(waypoint.location);
            _this.findRoute();
        });
    };
    GoogleMaps.prototype.addEmptyMarker = function (label) {
        var _this = this;
        var marker = new google.maps.Marker({
            map: null,
            draggable: true,
            label: label,
        });
        google.maps.event.addListener(marker, 'rightclick', function ($event) {
            var index = _this.markers.lastIndexOf(marker);
            if (index < 0) {
                debugger;
                throw "unexpected marker";
            }
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
            _this.wayPoints[index].location = $event.latLng;
            _this.findRoute();
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
    };
    GoogleMaps.prototype.findRoute = function () {
        if (this.wayPoints.length > 1) {
            this.routeService.findRoute(this.wayPoints[0].location, this.wayPoints[this.wayPoints.length - 1].location, this.wayPoints.slice(1, this.wayPoints.length - 1));
        }
        else {
            this.routeService.removeRoute();
        }
    };
    return GoogleMaps;
}());
exports.GoogleMaps = GoogleMaps;
var RouteService = (function () {
    function RouteService(_map) {
        this._map = _map;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setOptions({ suppressMarkers: true });
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