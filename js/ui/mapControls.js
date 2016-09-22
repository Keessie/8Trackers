/* global google, TRACKERS */
/* exported renderMap, renderMapControls, MAP_CENTER */

var DEFAULT_CENTER_COORDS = {
    lat: 51.998276,
    lng: 4.353702
};

function renderMap() {
    var map = new google.maps.Map(document.getElementById('page-map'), {
        center: DEFAULT_CENTER_COORDS,
        zoom: 16
    });

    return map;
}

function renderMapControls(map) {
    var centerControlDiv = renderMapControlCenter(map);
    var clearPathsControlDiv = renderMapControlClearPaths();
    var listViewControlDiv = renderMapControlListView();

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    clearPathsControlDiv.index = 2;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearPathsControlDiv);

    clearPathsControlDiv.index = 3;
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(listViewControlDiv);
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
        var centeringCoords = TRACKERS.getByMapIndex(18).googleLatLng || DEFAULT_CENTER_COORDS;
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
        TRACKERS.collection.forEach(function(TRACKER) {
            TRACKER.path.setMap(null);
            var path = TRACKER.path.getPath();
            path.clear();
        });
    });

    return controlDiv;
}

function renderMapControlListView() {
    var controlDiv = document.createElement('div');

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.className = 'map-control-button';
    controlUI.title = 'show trackers list';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.className = 'map-control-button-text';
    controlText.innerHTML = 'T List';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        console.log('foo');
    });

    return controlDiv;
}
