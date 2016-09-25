/* global Tracker, CURRENT_LOCATION_MARKER, google */
/* exported TRACKERS */

var TRACKERS = {
    collection: [
        new Tracker(0, 13, '#8E67FD'),
        new Tracker(1, 14, '#FD7567'),
        new Tracker(2, 15, '#6991FD'),
        new Tracker(3, 16, '#20D64D'),
        new Tracker(4, 17, '#65DBDB'),
        new Tracker(5, 18, '#EE6600'),
        new Tracker(6, 19, '#B681DC'),
        new Tracker(7, 20, '#ADA549')
    ],

    appendPaths: function(map) {
        this.collection = this.collection.map(function(tracker) {
            var pathOptions = {
                map: map,
                path: [],
                strokeColor: '#' + tracker.colorHex,
                strokeWeight: 2
            };

            var path = new google.maps.Polyline(pathOptions);
            var trackerWithPath = Object.assign({}, tracker, { path: path });
            return trackerWithPath;
        });

        return this;
    },

    updateFromJSON: function(jsonFeeds, map) {
        this.collection = this.collection.map(function(tracker) {
            // Data extraction
            var data = jsonFeeds[tracker.dataIndex].last_value.split(',');
            var lat = data[0];
            var lng = data[1];
            var speed = data[2];
            var batPercent = data[3];

            // Processing
            var trackerGoogleLatLng = new google.maps.LatLng(lat, lng);
            var distanceFromUser = null;
            if (CURRENT_LOCATION_MARKER) {
                var userGoogleLatLng = new google.maps.LatLng(
                    CURRENT_LOCATION_MARKER.position.lat(),
                    CURRENT_LOCATION_MARKER.position.lng()
                );

                distanceFromUser = Math.round(google.maps.geometry.spherical.computeDistanceBetween(
                    trackerGoogleLatLng,
                    userGoogleLatLng
                ));
            }

            var infoWindow = createInfoWindow(tracker.mapIndex, batPercent, speed, distanceFromUser);
            var marker = createMarker(tracker.mapIndex, tracker.colorHex, trackerGoogleLatLng, map);

            // Event handling
            marker.addListener('click', function() {
                if (tracker.selected === true) {
                    tracker.selected = false;
                    infoWindow.close();
                } else {
                    tracker.selected = true;
                    infoWindow.open(map, marker);
                }
            });

            infoWindow.addListener('closeclick', function() {
                tracker.selected = false;
            });

            // Reopen infowindow if it was open before refresh occurred.
            if (tracker.selected === true) {
                infoWindow.open(map, marker);
            }

            // Update Map Polygon
            tracker.path.getPath().push(new google.maps.LatLng(lat, lng));
            tracker.path.setMap(map);

            // Return some tracker data
            var updatedTracker = Object.assign(tracker, {
                googleLatLng: trackerGoogleLatLng,
                marker: marker,
                batPercent: batPercent,
                speed: speed,
                lng: lng,
                lat: lat
            });

            return updatedTracker;
        });

        return this;
    },

    getByMapIndex: function(mapIndex) {
        var tracker = null;
        this.collection.forEach(function(item) {
            if (item.mapIndex === mapIndex) tracker = item;
        });
        return tracker;
    },


    setMapOnMarkers: function(map) {
        this.collection.forEach(function(TRACKER) {
            if (TRACKER.marker) TRACKER.marker.setMap(map);
        });

        return this;
    },

    removeMarkers: function() {
        this.setMapOnMarkers(null);
        return this;
    }

};


function createInfoWindow(number, batPercent, speed, displacement) {
    var displacementText = displacement ? displacement + ' m' : 'n/a';
    /* eslint-disable indent */
    var infoWindowText = [
        '<div>Tracker ', number, '</div>',
        '<hr>',
        '<table>',
            '<tr>',
                '<td>Battery</td>',
                '<td>', batPercent , '%</td>',
            '</tr>',
            '<tr>',
                '<td>Speed</td>',
                '<td>', speed , 'km/h</td>',
            '</tr>',
            '<tr>',
                '<td>User ∆</td>',
                '<td>', displacementText , '</td>',
            '</tr>',
        '</table>',
    ].join('');
    /* eslint-enable indent */

    var infoWindow = new google.maps.InfoWindow({ content: infoWindowText });
    return infoWindow;
}

function createMarker(mapIndex, colorHex, googleLatLng, map) {
    var markerIcon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + mapIndex + '|' + colorHex + '|000000';
    var marker = new google.maps.Marker({
        icon: markerIcon,
        position: googleLatLng,
        map: map,
    });

    return marker;
}
