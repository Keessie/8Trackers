/* global Tracker, google */
/* exported TRACKERS */

var TRACKERS = {
    collection: [
        new Tracker(0, 13, '8E67FD'),
        new Tracker(1, 14, 'FD7567'),
        new Tracker(2, 15, '6991FD'),
        new Tracker(3, 16, '00E64D'),
        new Tracker(4, 17, '65DBDB'),
        new Tracker(5, 18, 'FF9900'),
        new Tracker(6, 19, 'E661AC'),
        new Tracker(7, 20, 'FDF569')
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
            var infoWindow = createInfoWindow(tracker.mapIndex, batPercent, speed);
            var googleLatLng = createGoogleLatLng(lat, lng);
            var marker = createMarker(tracker.mapIndex, tracker.colorHex, googleLatLng, map);

            // Event handling
            marker.addListener('click', function() {
                infoWindow.open(map, this);
            });

            // Update Map Polygon
            tracker.path.getPath().push(new google.maps.LatLng(lat, lng));
            tracker.path.setMap(map);

            // Return some tracker data
            var newTracker = Object.assign({}, tracker, {
                googleLatLng: googleLatLng,
                marker: marker
            });

            return newTracker;
        });

        return this;
    },


    setMapOnMarkers: function(map) {
        this.collection.forEach(function(TRACKER) {
            if (TRACKER.marker) TRACKER.marker.setMap(map);
        });

        return this;
    }

};

function createInfoWindow(number, batPercent, speed) {
    var infoWindowText = [
        'Tracker ', number, '.</p>',
        'Bat: ', batPercent, '%',
        '</br>',
        'Speed: ', speed, ' km/h'
    ].join('');

    var infoWindow = new google.maps.InfoWindow({ content: infoWindowText });
    return infoWindow;
}

function createGoogleLatLng(lat, lng) {
    var googleLatLng = new google.maps.LatLng(lat, lng);
    return googleLatLng;
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
