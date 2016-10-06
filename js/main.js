/* global TRACKERS, renderMapControls, getTrackers, renderMap, currentLocation, TrackerListVue */
/* exported initMap */

var TRACKER_UPDATE_INTERVAL = 5000;

function initMap() {
    var map = renderMap();
    TRACKERS.appendPaths(map);
    renderMapControls(map);

    getTrackers().then(function(response1) {
        renderMarkers(response1.data.feeds, map);
        map.setCenter(TRACKERS.collection[0].googleLatLng);

        var trackerListVue = TrackerListVue(map, TRACKERS.collection, currentLocation);

        // Allow map tiles to load with this setTimout.
        window.setTimeout(function() {
            document.getElementById('page-loading').className = 'loading-completed';
        }, 500);

        // We only want to refresh trackers if the initial `getTrackers()` call succeeds.
        window.setInterval(function() {
            getTrackers().then(function(response2) {
                renderMarkers(response2.data.feeds, map, function() {
                    trackerListVue.currentLocation = currentLocation;
                });
                trackerListVue.trackers = TRACKERS.collection;
            });
        }, TRACKER_UPDATE_INTERVAL);
    });
}

function renderMarkers(json, map, onSuccessCB) {
    TRACKERS
        .removeMarkers(map)
        .updateFromJSON(json, map);

    renderCurrentLocationMarker(map, onSuccessCB);
}

function renderCurrentLocationMarker(map, onSuccessCB) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(function(pos) {
        currentLocation.setMarker(pos.coords.latitude, pos.coords.longitude, map);
        if (onSuccessCB) onSuccessCB();
    }, function(error) {
        console.warn('`navigator.geolocation.getCurrentPosition()` failed: ' + JSON.stringify(error));
    }, options);
}
