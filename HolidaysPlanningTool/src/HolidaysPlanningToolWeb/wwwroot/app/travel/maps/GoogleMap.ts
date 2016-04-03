//google maps api key AIzaSyDSjYCCntbYJDDuF4CLpX61HV4PqlqSuIw
//google palces api key AIzaSyCo94MB8jC7YHjESHmAmelcL3yVJ6HLK-U
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=kaunas&key=AIzaSyCo94MB8jC7YHjESHmAmelcL3yVJ6HLK-U
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Injectable} from 'angular2/core';

export interface MapClickCallbacks {
    rightClick(index: number): any;
    click(homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string): any;
    dragged(coords: google.maps.LatLng, index: number): any;
}
@Injectable()
export class GoogleMaps {
    public wayPoints: google.maps.DirectionsWaypoint[];
    public startPoint: google.maps.DirectionsWaypoint;
    public endPoint: google.maps.DirectionsWaypoint;
    private markers: google.maps.Marker[];
    private homeMarker: google.maps.Marker;
    private clickFunctions: MapClickCallbacks;
    private geocoder = new google.maps.Geocoder;
    protected wayPointsCount = 5;
    private routeService: IRouteService;
    private map: google.maps.Map;

    constructor(private notificationServiceToaster: ToastsManager) {//private map: google.maps.Map, private routeService: IRouteService, 
       // var mapOption = new google.maps.MapOptions();
        this.wayPoints = [];
        this.markers = [];
    }
    setCallBacks(clickFunction: MapClickCallbacks) {
        if (!clickFunction) {
            throw `GoogleMap.ts: clickFunctions must be set`;
        }
        this.clickFunctions = clickFunction;
    }
    public initialise(): void {

        var mapContainer = document.getElementById("the_map");
        var mapObj = new google.maps.Map(mapContainer, {
            zoom: 8,
            maxZoom: 12,
            center: new google.maps.LatLng(54.8985049, 23.9578067),
         });
        this.map = mapObj;
        this.routeService = new RouteService(mapObj);


        for (let i = 0; i < this.wayPointsCount; i++) {
            this.addEmptyMarker(i.toString());
        }
        this.homeMarker = this.createEmptyMarker("H");

        google.maps.event.addListener(this.homeMarker, 'rightclick', ($event) => {
            this.clickFunctions.rightClick(-2);
            this.homeMarker.setMap(null);
            this.resetMarkers();
            this.findRoute();
        })
        google.maps.event.addListener(this.homeMarker, 'dragend', ($event) => {
            var coords = $event.latLng;
            this.startPoint.location = coords;
            this.endPoint.location = coords;
            this.clickFunctions.dragged(coords, -2);
            this.findRoute();
        });

        
        var clicks = {
            click: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => { },
            dragged: (coords: google.maps.LatLng, index: number) => { },
            rightClick: (index: number) => { }
        };
        this.clickFunctions = clicks;
        var that = this;
        google.maps.event.addListener(this.map, 'click', ($event) => {
            if (this.wayPointsCount <= this.wayPoints.length) {
                this.notificationServiceToaster.warning("Pasiektas taškų limitas");
                return;
            }
            var coordinates: google.maps.LatLng = $event.latLng;
            this.geocoder.geocode({ location: coordinates }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var index: number;
                        var waypoint = { location: coordinates, stopover: false };

                        if (!this.startPoint) {
                            this.startPoint = waypoint;
                            this.endPoint = waypoint;
                            this.homeMarker.setMap(this.map);
                            this.homeMarker.setPosition(waypoint.location);
                            index = -2;
                            //this.homeMarker.setMap(this.map);
                        } else {
                            this.wayPoints.push(waypoint);
                            index = this.wayPoints.length - 1;
                            this.markers[index].setMap(this.map);
                            this.markers[index].setPosition(waypoint.location);
                        }
                        this.clickFunctions.click(this.startPoint, this.endPoint, this.wayPoints, index, coordinates, results[0].formatted_address);
                        this.findRoute();
                        //
                        //this.map.setZoom(11);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });


        });
    }
    setWayPoints(newWaypoints: google.maps.DirectionsWaypoint[]) {
        if (newWaypoints.length > this.wayPointsCount) {
            throw `GoogleMaps.ts: maximum waypoints length expected: ${this.wayPointsCount} but found ${newWaypoints.length}`;
        }
        this.wayPoints = newWaypoints;
        this.findRoute();
    }
    private createEmptyMarker(label: string) {
        var marker = new google.maps.Marker({
            map: null,
            draggable: true,
            label: label,
        });
        return marker
    }
    private addEmptyMarker(label: string ) {
        var marker = this.createEmptyMarker(label);
        google.maps.event.addListener(marker, 'rightclick', ($event) => {
            var index = this.markers.lastIndexOf(marker);
            if (index < 0) {
                debugger;
                throw "unexpected marker";
            }
            this.clickFunctions.rightClick(index)
            this.wayPoints.splice(index, 1);
            this.markers[index].setMap(null);
            this.resetMarkers();
            this.findRoute();
        })
        google.maps.event.addListener(marker, 'dragend', ($event) => {
            var index = this.markers.lastIndexOf(marker);
            if (index < 0) {
                debugger;
                throw "unexpected marker";
            }
            var coords = $event.latLng;
            this.geocoder.geocode({ location: coords }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    debugger;
                    if (results[0]) {
                        this.wayPoints[index].location = coords;
                        this.clickFunctions.dragged(coords, index);
                        this.findRoute();
                        //
                        //this.map.setZoom(11);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        });
        this.markers.push(marker);
    }
    private resetMarkers() {
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
    }

    public findRoute() {
        if (this.startPoint && this.endPoint) {
            this.routeService.findRoute(this.startPoint.location, this.endPoint.location, this.wayPoints, false);
        } else {
            this.routeService.removeRoute();
        }
    }


}
export interface IRouteService {
    findRoute(firstPoint: google.maps.LatLng | string, lastPoint: google.maps.LatLng | string, waypoints: google.maps.DirectionsWaypoint[], focus?: boolean): void;
    removeRoute(): void;
}

export class RouteService implements IRouteService {
    private directionsService: google.maps.DirectionsService;
    private directionsDisplay: google.maps.DirectionsRenderer;

    constructor(private _map: google.maps.Map) {
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setOptions({ suppressMarkers: false });
        this.directionsDisplay.setMap(this._map);
    }
    findRoute(firstPoint: google.maps.LatLng | string, lastPoint: google.maps.LatLng | string, waypoints: google.maps.DirectionsWaypoint[], focus?: boolean) {
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
        }, (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.directionsDisplay.setDirections(response);
                this.directionsDisplay.setMap(this._map);
                //if (focus) {
                //    var latlngbounds = new google.maps.LatLngBounds();
                //    waypoints.forEach(function (n) {
                //        latlngbounds.extend(n.location);
                //    });
                //    this._map.setCenter(latlngbounds.getCenter());
                //    this._map.fitBounds(latlngbounds); 
                //}
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    removeRoute() {
        this.directionsDisplay.setMap(null);
    }
}

export class MapService{
    
}