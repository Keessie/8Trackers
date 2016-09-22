/*
    global
        TRACKERS, MAP_CENTER, renderMapControls, getTrackers
        google
*/
/* exported initMap, MAP_CENTER */

function createMap() {
    var mapOptions = {
        center: {
            lat: 51.998276,
            lng: 4.353702
        },
        zoom: 16
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    return map;
}

function initMap() {
    var map = createMap();

    TRACKERS.appendPaths(map);
    renderMapControls(map);

    getTrackers().then(function(json) {
        renderMarkers(json, map);
        map.setCenter(TRACKERS.collection[0].googleLatLng);

        // We only want to refresh trackers if the initial `getTrackers()` call succeeds.
        window.setInterval(function() {
            getTrackers().then(function(json) {
                renderMarkers(json, map);
            });
        }, 5000);
    });
}

function renderMarkers(json, map) {
    MAP_CENTER = TRACKERS.collection[1].googleLatLng;
    clearMarkers();
    TRACKERS.updateFromJSON(json, map);
}

function clearMarkers() {
    TRACKERS.setMapOnMarkers(null);
}

