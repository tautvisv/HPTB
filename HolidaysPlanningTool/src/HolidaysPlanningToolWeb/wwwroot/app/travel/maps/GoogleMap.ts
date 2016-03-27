//google key AIzaSyDSjYCCntbYJDDuF4CLpX61HV4PqlqSuIw
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
class ToastsManager {
    error(string, stringas) { }
    warning(string) { }
}
export class GoogleMaps {
    public wayPoints: google.maps.DirectionsWaypoint[];
    private markers: google.maps.Marker[];
    protected wayPointsCount = 10;
    constructor(private map: google.maps.Map, private routeService: IRouteService, private notificationServiceToaster: ToastsManager) {
       // var mapOption = new google.maps.MapOptions();
        this.wayPoints = [];
        this.markers = [];
        this.initialise();
    }

    initialise() {
        for (let i = 0; i < this.wayPointsCount; i++) {
            this.addEmptyMarker(i.toString());
        }
        this.notificationServiceToaster.error("pranešimas", "su title");
        var that = this;
        google.maps.event.addListener(this.map, 'click', ($event) => {
            if (this.wayPointsCount <= this.wayPoints.length) {
                this.notificationServiceToaster.warning("Pasiektas taškų limitas");
                return;
            }
            var coordinates: google.maps.LatLng = $event.latLng;
            var waypoint = { location: coordinates, stopover: false };
            this.wayPoints.push(waypoint);
            this.markers[this.wayPoints.length - 1].setMap(this.map);
            this.markers[this.wayPoints.length - 1].setPosition(waypoint.location);
            this.findRoute();
        });
    }

    private addEmptyMarker(label: string ) {
        var marker = new google.maps.Marker({
            map: null,
            draggable: true,
            label: label,
        });
        google.maps.event.addListener(marker, 'rightclick', ($event) => {
            var index = this.markers.lastIndexOf(marker);
            if (index < 0) {
                debugger;
                throw "unexpected marker";
            }
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
            this.wayPoints[index].location = $event.latLng;
            this.findRoute();
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
    }

    private findRoute() {
        if (this.wayPoints.length > 1) {
            this.routeService.findRoute(this.wayPoints[0].location, this.wayPoints[this.wayPoints.length - 1].location, this.wayPoints.slice(1, this.wayPoints.length - 1));
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