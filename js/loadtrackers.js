/* global TRACKERS, renderMapControls, getTrackers, renderMap */

/* exported initMap */

var TRACKER_UPDATE_INTERVAL = 5000;

function initMap() {
    var map = renderMap();
    TRACKERS.appendPaths(map);
    renderMapControls(map);

    getTrackers().then(function(json) {
        console.log(json);
        renderMarkers(json, map);
        map.setCenter(TRACKERS.collection[0].googleLatLng);

        // We only want to refresh trackers if the initial `getTrackers()` call succeeds.
        window.setInterval(function() {
            getTrackers().then(function(json) {
                renderMarkers(json, map);
            });
        }, TRACKER_UPDATE_INTERVAL);
    });
}

function renderMarkers(json, map) {
    TRACKERS
        .setMapOnMarkers(null)
        .updateFromJSON(json, map);
}
