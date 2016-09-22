/* global TRACKERS, renderMapControls, getTrackers, renderMap */

/* exported initMap */

var TRACKER_UPDATE_INTERVAL = 5000;

function initMap() {
    var map = renderMap();
    TRACKERS.appendPaths(map);
    renderMapControls(map);

    getTrackers().then(function(response1) {
        renderMarkers(response1.data.feeds, map);
        map.setCenter(TRACKERS.collection[0].googleLatLng);

        // We only want to refresh trackers if the initial `getTrackers()` call succeeds.
        window.setInterval(function() {
            getTrackers().then(function(response2) {
                renderMarkers(response2.data.feeds, map);
            });
        }, TRACKER_UPDATE_INTERVAL);
    });
}

function renderMarkers(json, map) {
    TRACKERS
        .setMapOnMarkers(null)
        .updateFromJSON(json, map);
}
