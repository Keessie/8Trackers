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
        var centeringCoords = TRACKERS.collection[1].googleLatLng || DEFAULT_CENTER_COORDS;
        map.setCenter(centeringCoords);
    });

    return controlDiv;
}

function renderMapControlClearPaths() {
    var controlDiv = document.createElement('div');

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
    controlDiv.appendChild(controlUI2);

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

    return controlDiv;
}
