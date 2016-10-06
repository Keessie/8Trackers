/* global Tracker, currentLocation, google */
/* exported TRACKERS */

var TRACKERS = {
    collection: [
        new Tracker(0, 13, 'AE67FD'),
        new Tracker(1, 14, 'FD7567'),
        new Tracker(2, 15, '79A1FD'),
        new Tracker(3, 16, '20E67D'),
        new Tracker(4, 17, '65DBDB'),
        new Tracker(5, 18, 'EE6600'),
        new Tracker(6, 19, 'B681DC'),
        new Tracker(7, 20, 'CDC549')
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
            var userLatLng = currentLocation.latestCoordinates();
            if (userLatLng) {
                distanceFromUser = Math.round(google.maps.geometry.spherical.computeDistanceBetween(
                    trackerGoogleLatLng,
                    userLatLng
                ));
            }

            var infoWindow = createInfoWindow(tracker.mapIndex, batPercent, speed, distanceFromUser);
            var marker = createMarker(tracker.mapIndex, tracker.colorHex, trackerGoogleLatLng, map);

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
    var displayInKM = displacement > 9999;
    var displacementText = displayInKM ? Math.round(displacement / 1000) + ' km' :  displacement + ' m' ;

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
