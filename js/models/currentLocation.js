/* global google */
/* exported currentLocation */

var CURRENT_LOCATION_HISTORY_LENGTH = 6;

var CURRENT_LOCATION_PATH_OPTIONS = {
    strokeColor: '#F29357',
    strokeWeight: 2
};

var currentLocation = {
    marker: null,
    coordinateHistory: [],
    path: null,
    setCoordinates: function(googleLatLng) {
        this.coordinateHistory.push(googleLatLng);
        if (this.coordinateHistory.length > CURRENT_LOCATION_HISTORY_LENGTH) this.coordinateHistory.shift();
    },
    latestCoordinates: function() {
        return this.coordinateHistory[0];
    },

    setPath: function(map) {
        if (!this.path) {
            CURRENT_LOCATION_PATH_OPTIONS.map = map;
            CURRENT_LOCATION_PATH_OPTIONS.path = [];
            this.path = new google.maps.Polyline(CURRENT_LOCATION_PATH_OPTIONS);
        }

        this.path.setPath(this.coordinateHistory);
        this.path.setMap(map);
    },

    setMarker: function(lat, lng, map) {
        // `markerIcon` must be declared here because `google` isn't available in the global scope on-app-load
        var markerIcon = new google.maps.MarkerImage(
            '//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22, 22),
            new google.maps.Point(0, 18),
            new google.maps.Point(11, 11)
        );

        if (this.marker) this.marker.setMap(null); // delete old marker

        var googleLatLng = new google.maps.LatLng(lat, lng);
        this.setCoordinates(googleLatLng);

        this.marker = new google.maps.Marker({
            clickable: false,
            icon: markerIcon,
            shadow: null,
            zIndex: 999,
            map: map
        });

        this.marker.setPosition(googleLatLng);
        this.setPath(map);
    }
};