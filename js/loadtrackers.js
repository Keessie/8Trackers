/*
    global
        MAP, MAP_CENTER, MARKERS, TRACKERS_GET_URL, TRACKERS,
        google, $
*/

function addCenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Center T14';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        map.setCenter(MAP_CENTER);
    });

}

function addCenterControl2(controlDiv2) {
    // Set CSS for the control border.
    var controlUI2 = document.createElement('div');
    controlUI2.style.backgroundColor = '#fff';
    controlUI2.style.border = '2px solid #fff';
    controlUI2.style.borderRadius = '3px';
    controlUI2.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI2.style.cursor = 'pointer';
    controlUI2.style.marginBottom = '0px';
    controlUI2.style.textAlign = 'center';
    controlUI2.title = 'Clear paths';
    controlDiv2.appendChild(controlUI2);

    // Set CSS for the control interior.
    var controlText2 = document.createElement('div');
    controlText2.style.color = 'rgb(25,25,25)';
    controlText2.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText2.style.fontSize = '16px';
    controlText2.style.lineHeight = '38px';
    controlText2.style.paddingLeft = '5px';
    controlText2.style.paddingRight = '5px';
    controlText2.innerHTML = 'Clear path';
    controlUI2.appendChild(controlText2);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI2.addEventListener('click', function() {
        TRACKERS.forEach(function(TRACKER) {
            TRACKER.poly.setMap(null);
            var path = TRACKER.poly.getPath();
            path.clear();
        });
    });
}

function initMap() {
    MAP = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 51.998276,
            lng: 4.353702
        },
        zoom: 16
    });

    TRACKERS = TRACKERS.map(function(TRACKER) {
        var poly = new google.maps.Polyline({
            map: MAP,
            path: [],
            strokeColor: '#' + TRACKER.colorHex,
            strokeWeight: 2
        });

        return Object.assign(TRACKER, {
            poly: poly
        });
    });

    var centerControlDiv = document.createElement('div');
    addCenterControl(centerControlDiv, MAP);

    var centerControlDiv2 = document.createElement('div');
    addCenterControl2(centerControlDiv2, MAP);

    centerControlDiv.index = 1;
    MAP.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    centerControlDiv2.index = 2;
    MAP.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv2);

    renderMarkers();
    window.setInterval(renderMarkers, 10000);
}

function printTrackerContent(number, batPercent, speed) {
    return [
        'Tracker ', number, '.</p>',
        'Bat: ', batPercent, '%',
        '</br>',
        'Speed: ', speed, ' km/h'
    ].join('');
}

function extractTrackerDataFromJSON(tracker, json) {
    // Data extraction
    var data = json.feeds[tracker.dataIndex].last_value.split(',');
    var lat = data[0];
    var lon = data[1];
    var speed = data[2];
    var batPercent = data[3];

    // Info Window
    var infoWindowText = printTrackerContent(tracker.mapIndex, batPercent, speed);
    var infoWindow = new google.maps.InfoWindow({ content: infoWindowText });

    // Map Marker
    var googleLL = new google.maps.LatLng(tracker.lat, tracker.lon);
    var markerIcon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + tracker.mapIndex + '|' + tracker.colorHex + '|000000';
    var marker = new google.maps.Marker({
        icon: markerIcon,
        position: googleLL,
        map: MAP,
    });

    marker.addListener('click', function() {
        infoWindow.open(MAP, this);
    });

    // Update Map Polygon
    var path = tracker.poly.getPath();
    path.push(new google.maps.LatLng(lat, lon));
    tracker.poly.setMap(MAP);

    // Return some tracker data
    var newTracker = Object.assign(tracker, {
        lat: lat,
        lon: lon,
        speed: speed,
        googleLL: googleLL,
        batPercent: batPercent,
        marker: marker
    });

    return newTracker;
}

function renderMarkers() {
    $.getJSON(TRACKERS_GET_URL, function(json) {
        MAP_CENTER = TRACKERS[1].googleLL;
        clearMarkers();

        TRACKERS = TRACKERS.map(function(TRACKER) {
            var tracker = extractTrackerDataFromJSON(TRACKER, json);
            MARKERS.push(tracker.marker);
            return tracker;
        });

    });
}

function clearMarkers() {
    setMapOnAll(null);
}

function setMapOnAll(map) {
    for (var i = 0; i < MARKERS.length; i++) {
        MARKERS[i].setMap(map);
    }
}

(function() {
    $.getJSON(TRACKERS_GET_URL, function(json) {
        var T = json.feeds[0].last_value.split(',');
        var lat1 = T[0];
        var lon1 = T[1];
        MAP.setCenter(new google.maps.LatLng(lat1, lon1));
    });
})();