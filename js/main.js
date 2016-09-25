/* global TRACKERS, renderMapControls, getTrackers, renderMap, google, Vue */
/* exported initMap */

var TRACKER_UPDATE_INTERVAL = 5000;
var CURRENT_LOCATION_MARKER = null;

Vue.component('trackerData', {
    props: ['text'],
    template: '<td>{{ text }}</td>'
});

function initMap() {
    var map = renderMap();
    TRACKERS.appendPaths(map);
    renderMapControls(map);

    getTrackers().then(function(response1) {
        renderMarkers(response1.data.feeds, map);
        map.setCenter(TRACKERS.collection[0].googleLatLng);

        // Update ListView
        var listView = new Vue({
            el: '#page-trackers',
            data: {
                trackers: TRACKERS.collection
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
                renderMarkers(response2.data.feeds, map);
                listView.trackers = TRACKERS.collection;
            });
        }, TRACKER_UPDATE_INTERVAL);
    });
}

function renderMarkers(json, map) {
    TRACKERS
        .removeMarkers(map)
        .updateFromJSON(json, map);

    renderCurrentLocationMarker(map);
}

function renderCurrentLocationMarker(map) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    var markerIcon = new google.maps.MarkerImage(
        '//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
        new google.maps.Size(22, 22),
        new google.maps.Point(0, 18),
        new google.maps.Point(11, 11)
    );

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(function(pos) {
        if (CURRENT_LOCATION_MARKER) CURRENT_LOCATION_MARKER.setMap(null);
        CURRENT_LOCATION_MARKER = new google.maps.Marker({
            clickable: false,
            icon: markerIcon,
            shadow: null,
            zIndex: 999,
            map: map
        });
        var googleLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        CURRENT_LOCATION_MARKER.setPosition(googleLatLng);
    }, function(error) {
        console.warn('`navigator.geolocation.getCurrentPosition()` failed: ' + JSON.stringify(error));
    }, options);
}
