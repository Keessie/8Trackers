/* global google, TRACKERS */
/* exported renderMap, renderMapControls, MAP_CENTER */

var DEFAULT_CENTER_COORDS = {
    lat: 51.998276,
    lng: 4.353702
};

function renderMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: DEFAULT_CENTER_COORDS,
        zoom: 16
    });

    return map;
}

function renderMapControls(map) {
    var centerControlDiv = renderMapControlCenter(map);
    var clearPathsControlDiv = renderMapControlClearPaths();

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    clearPathsControlDiv.index = 2;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearPathsControlDiv);
}

function renderMapControlCenter(map) {
    var controlDiv = document.createElement('div');

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.className = 'map-control-button';
    controlUI.title = 'recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.className = 'map-control-button-text';
    controlText.innerHTML = 'Center T14';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        var centeringCoords = TRACKERS.collection[1].googleLatLng || DEFAULT_CENTER_COORDS;
        map.setCenter(centeringCoords);
    });

    return controlDiv;
}

function renderMapControlClearPaths() {
    var controlDiv = document.createElement('div');

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.className = 'map-control-button';
    controlUI.title = 'Clear paths';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.className = 'map-control-button-text';
    controlText.innerHTML = 'Clear path';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        TRACKERS.forEach(function(TRACKER) {
            TRACKER.poly.setMap(null);
            var path = TRACKER.poly.getPath();
            path.clear();
        });
    });

    return controlDiv;
}
