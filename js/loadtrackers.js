/*
    global
        TRACKERS, MAP_CENTER, renderMapControls, getTrackers
        google
*/
/* exported initMap, MAP_CENTER */

var MAP = null;

function initMap() {
    var mapOptions = {
        center: {
            lat: 51.998276,
            lng: 4.353702
        },
        zoom: 16
    };

    MAP = new google.maps.Map(document.getElementById('map'), mapOptions);

    var pathOptions = {
        map: MAP,
        path: [],
        strokeColor: '#' + TRACKER.colorHex,
        strokeWeight: 2
    };

    TRACKERS = TRACKERS.map(function(TRACKER) {
        var path = new google.maps.Polyline(pathOptions);
        return Object.assign({}, TRACKER, { path: path });
    });

    renderMapControls(MAP);
    renderMarkers();

    getTrackers().then(function(json) {
        renderMarkers(json);
        MAP.setCenter(TRACKERS[0].googleLatLng);
    });

    window.setInterval(function() {
        getTrackers().then(renderMarkers);
    }, 5000);
}

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

function createMarker(mapIndex, colorHex, googleLatLng) {
    var markerIcon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + mapIndex + '|' + colorHex + '|000000';
    var marker = new google.maps.Marker({
        icon: markerIcon,
        position: googleLatLng,
        map: MAP,
    });

    return marker;
}

function extractTrackerFromJSON(tracker, json) {
    // Data extraction
    var data = json.feeds[tracker.dataIndex].last_value.split(',');
    var lat = data[0];
    var lng = data[1];
    var speed = data[2];
    var batPercent = data[3];

    // Processing
    var infoWindow = createInfoWindow(tracker.mapIndex, batPercent, speed);
    var googleLatLng = createGoogleLatLng(lat, lng);
    var marker = createMarker(tracker.mapIndex, tracker.colorHex, googleLatLng);

    // Event handling
    marker.addListener('click', function() {
        infoWindow.open(MAP, this);
    });

    // Update Map Polygon
    tracker.path.getPath().push(new google.maps.LatLng(lat, lng));
    tracker.path.setMap(MAP);

    // Return some tracker data
    var newTracker = Object.assign({}, tracker, {
        googleLatLng: googleLatLng,
        marker: marker
    });

    return newTracker;
}

function renderMarkers(json) {
    MAP_CENTER = TRACKERS[1].googleLatLng;
    clearMarkers();

    TRACKERS = TRACKERS.map(function(TRACKER) {
        var tracker = extractTrackerFromJSON(TRACKER, json);
        return tracker;
    });
}

function clearMarkers() {
    setMapOnMarkers(null);
}

function setMapOnMarkers(map) {
    TRACKERS.forEach(function(TRACKER) {
        if (TRACKER.marker) TRACKER.marker.setMap(map);
    });
}
