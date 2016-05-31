//google maps api key AIzaSyDSjYCCntbYJDDuF4CLpX61HV4PqlqSuIw
//google palces api key AIzaSyCo94MB8jC7YHjESHmAmelcL3yVJ6HLK-U
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=kaunas&key=AIzaSyCo94MB8jC7YHjESHmAmelcL3yVJ6HLK-U
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Injectable} from 'angular2/core';

export interface MapClickCallbacks {
    rightClick(index: number): any;
    click(homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string): any;
    dragged(homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string): any;
}
@Injectable()
export class GoogleMaps {
    public wayPoints: google.maps.DirectionsWaypoint[];
    public startPoint: google.maps.DirectionsWaypoint;
    public endPoint: google.maps.DirectionsWaypoint;
    private markers: google.maps.Marker[];
    private homeMarker: google.maps.Marker;
    private endMarker: google.maps.Marker;
    private clickFunctions: MapClickCallbacks;
    private geocoder = new google.maps.Geocoder;
    protected wayPointsCount = 8;
    private routeService: IRouteService;
    private map: google.maps.Map;
    private autoFindRoute: boolean = true;
    private disableClick: boolean = false;
    private places: google.maps.places.PlacesService;

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
    public getMap() {
        return this.map;
    }
    public setView(coords: google.maps.LatLng, zoom: number = 8) {
        console.log("zooming map to", zoom);
        this.map.setCenter(coords);
        this.map.setZoom(zoom);
    }
    public removeRoute() {
        this.routeService.removeRoute();
        this.startPoint = null;
        this.endPoint = null;
        this.wayPoints = [];
        this.resetMarkers();
    }
    private setMarkersListiner(marker: google.maps.Marker, index: number) {

        google.maps.event.addListener(marker, 'rightclick', ($event) => {
        
            if (index === -1) {
                debugger;
                throw "unexpected marker";
            }

            this.clickFunctions.rightClick(index);
            marker.setMap(null);

            if (index === -2) {
                var elem = this.wayPoints.shift();
                this.startPoint = elem;
            } else if (index === -3) {
                var elem = this.wayPoints.pop();
                this.endPoint = elem;
            } else {
                this.wayPoints.splice(index, 1);
            }
            if (this.autoFindRoute) {
                this.resetMarkers();
                this.findRoute();
            }

        })
        google.maps.event.addListener(marker, 'dragend', ($event) => {

            if (index  === -1) {
                debugger;
                throw "unexpected marker";
            }

            var coordinates = $event.latLng;
            this.geocoder.geocode({ location: coordinates }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        if (index === -2) {
                            this.startPoint.location = coordinates;
                        } else if (index === -3) {
                            this.endPoint.location = coordinates;
                        } else this.wayPoints[index].location = coordinates;
                        this.clickFunctions.dragged(this.startPoint, this.endPoint, this.wayPoints, index, coordinates, results[0].formatted_address);
                        if (this.autoFindRoute) this.findRoute();
                    } else {
                        console.warn('No results found');
                    }
                } else {
                    console.warn('Geocoder failed due to: ' + status);
                }
            });
            
        });
    }


    public initialise(mapId: string): void {

        var mapContainer = document.getElementById(mapId);
        var mapObj = new google.maps.Map(mapContainer, {
            zoom: 8,
            center: new google.maps.LatLng(54.8985049, 23.9578067),
            maxZoom: 16
         });
        this.map = mapObj;
        this.routeService = new RouteService(mapObj);


        for (let i = 0; i < this.wayPointsCount; i++) {
            this.addEmptyMarker(i, (i+1).toString());
        }
        this.homeMarker = this.createEmptyMarker("H");
        this.setMarkersListiner(this.homeMarker, -2);

        this.endMarker = this.createEmptyMarker("L");
        this.setMarkersListiner(this.endMarker, -3);
        
        var clicks = {
            click: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => { },
            dragged: (homePoint: google.maps.DirectionsWaypoint, endPoint: google.maps.DirectionsWaypoint, waypoints: google.maps.DirectionsWaypoint[], index: number, coords: google.maps.LatLng, address: string) => { },
            rightClick: (index: number) => { }
        };
        this.clickFunctions = clicks;
        var that = this;
        this.places = new google.maps.places.PlacesService(this.map);
        google.maps.event.addListener(this.map, 'click', ($event) => {
            if (this.disableClick) {
                return;
            }
            if (this.wayPointsCount <= this.wayPoints.length) {
                this.notificationServiceToaster.warning("Pasiektas taškų limitas");
                return;
            }
            var coordinates: google.maps.LatLng = $event.latLng;
            this.geocoder.geocode({ location: coordinates }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var index: number;
                        var waypoint = { location: coordinates, stopover: true };

                        if (!this.startPoint) {
                            this.startPoint = waypoint;
                            this.homeMarker.setMap(this.map);
                            this.homeMarker.setPosition(waypoint.location);
                            index = -2;
                            //this.homeMarker.setMap(this.map);
                        } else if (!this.endPoint) {
                            this.endPoint = waypoint;
                            this.endMarker.setMap(this.map);
                            this.endMarker.setPosition(waypoint.location);
                            index = -3;
                            //this.homeMarker.setMap(this.map);
                        } else {
                            this.wayPoints.push(waypoint);
                            index = this.wayPoints.length - 1;
                            this.markers[index].setMap(this.map);
                            this.markers[index].setPosition(waypoint.location);
                        }
                        this.clickFunctions.click(this.startPoint, this.endPoint, this.wayPoints, index, coordinates, results[0].formatted_address);
                        if (this.autoFindRoute) this.findRoute();
                        //
                        //this.map.setZoom(11);
                    } else {
                        console.warn('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });


        });
    }
    setWayPoints(firstPoint: google.maps.DirectionsWaypoint, lastPoint: google.maps.DirectionsWaypoint, newWaypoints: google.maps.DirectionsWaypoint[]) {
        if (newWaypoints.length > this.wayPointsCount) {
            this.removeRoute();
            throw `GoogleMaps.ts: maximum waypoints length expected: ${this.wayPointsCount} but found ${newWaypoints.length}`;
        }
        this.wayPoints = newWaypoints;
        this.startPoint = firstPoint;
        this.endPoint = lastPoint;
        this.resetMarkers();
        this.findRoute();
    }
    setMapDisableClicks(disable: boolean) {
        this.disableClick = disable;
        this.markers.forEach(function (marker) {
            marker.setDraggable(!disable);
        });
        this.endMarker.setDraggable(!disable);
        this.homeMarker.setDraggable(!disable);
    }
    public setAutoFind(autofind: boolean) {
        this.autoFindRoute = autofind;
    }
    public setOptimizeRoute(optimize: boolean) {
        this.routeService.setOptimizeWaypoints(optimize);
    }
    public setMainMarkersLabels(homeMarker: string, endMarker: string) {
        this.homeMarker.setOptions({ label: homeMarker });
        this.endMarker.setOptions({ label: endMarker });
    }
    private createEmptyMarker(label: string) {
        var marker = new google.maps.Marker({
            map: null,
            draggable: true,
            label: label,
        });
        return marker
    }
    private addEmptyMarker(index: number, label: string) {
        var marker = this.createEmptyMarker(label);
        this.setMarkersListiner(marker, index);
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
        if (this.startPoint) {
            this.homeMarker.setMap(this.map);
            this.homeMarker.setPosition(this.startPoint.location);
        } else {
            this.homeMarker.setMap(null);
        }
        if (this.endPoint) {
            this.endMarker.setMap(this.map);
            this.endMarker.setPosition(this.endPoint.location);
        } else {
            this.endMarker.setMap(null);
        }
    }

    public findRoute() {
        if (this.startPoint && this.endPoint) {
            this.routeService.findRoute(this.startPoint.location, this.endPoint.location, this.wayPoints, false);
        } else {
            this.routeService.removeRoute();
        }
    }
    
    placeSearch(coords: google.maps.LatLng, callback: Function) {
        var search = {
            location: coords,
            types: ['lodging'],
            radius: 5000,
        };

        this.places.nearbySearch(search, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                callback(results);
                // Create a marker for each hotel found, and
                // assign a letter of the alphabetic to each marker icon.
                //for (var i = 0; i < results.length; i++) {
                //    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
                //    var markerIcon = MARKER_PATH + markerLetter + '.png';
                //    // Use marker animation to drop the icons incrementally on the map.
                //    markers[i] = new google.maps.Marker({
                //        position: results[i].geometry.location,
                //        animation: google.maps.Animation.DROP,
                //        icon: markerIcon
                //    });
                //    // If the user clicks a hotel marker, show the details of that hotel
                //    // in an info window.
                //    markers[i].placeResult = results[i];
                //    google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                //    setTimeout(dropMarker(i), i * 100);
                //    addResult(results[i], i);
                //}
            }
        });
    }

}
export interface IRouteService {
    findRoute(firstPoint: google.maps.LatLng | string, lastPoint: google.maps.LatLng | string, waypoints: google.maps.DirectionsWaypoint[], focus?: boolean): void;
    removeRoute(): void;
    setOptimizeWaypoints(isOptimized: boolean);
}

export class RouteService implements IRouteService {
    private directionsService: google.maps.DirectionsService;
    private directionsDisplay: google.maps.DirectionsRenderer;
    private isOptimized: boolean = false;
    constructor(private _map: google.maps.Map) {
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            
        });
        this.directionsDisplay.setOptions({ suppressMarkers: true });
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
            optimizeWaypoints: this.isOptimized,
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
                console.warn('Directions request failed due to ' + status);
            }
        });
    }
    setOptimizeWaypoints(isOptimized: boolean) {
        this.isOptimized = isOptimized;
    }
    removeRoute() {
        this.directionsDisplay.setMap(null);
    }
}

export class MapService{
    
}