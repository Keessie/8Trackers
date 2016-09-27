/* global google */
/* exported currentLocation */

var CURRENT_LOCATION_HISTORY_LENGTH = 6;

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

        if (!this.path) {
            var pathOptions = {
                map: map,
                path: [],
                strokeColor: '#FFFFFF',
                strokeWeight: 2
            };

            this.path = new google.maps.Polyline(pathOptions);
        }

        this.path.setPaths(this.coordinateHistory);
        this.path.setMap(map);

    }
};