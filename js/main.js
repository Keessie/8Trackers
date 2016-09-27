/* global TRACKERS, renderMapControls, getTrackers, renderMap, currentLocation, Vue */
/* exported initMap */

var TRACKER_UPDATE_INTERVAL = 5000;

function initMap() {
    var map = renderMap();
    TRACKERS.appendPaths(map);
    renderMapControls(map);

    getTrackers().then(function(response1) {
        renderMarkers(response1.data.feeds, map);
        map.setCenter(TRACKERS.collection[0].googleLatLng);

        // Create listView
        var listView = new Vue({
            el: '#page-trackers',
            data: {
                trackers: TRACKERS.collection,
                currentLocation: currentLocation
            },
            methods: {
                viewMap: function() {
                    this.$el.style.zIndex = -1;
                },
                centerMapOnTracker: function(tracker) {
                    map.setCenter(tracker.googleLatLng);
                    this.viewMap();
                }
            }
        });

        // Allow map tiles to load with this setTimout.
        window.setTimeout(function() {
            document.getElementById('page-loading').className = 'loading-completed';
        }, 500);

        // We only want to refresh trackers if the initial `getTrackers()` call succeeds.
        window.setInterval(function() {
            getTrackers().then(function(response2) {
                renderMarkers(response2.data.feeds, map, function() {
                    listView.currentLocation = currentLocation;
                });
                listView.trackers = TRACKERS.collection;
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
