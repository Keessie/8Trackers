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
    renderBrowserMarker();

    TRACKERS
        .setMapOnMarkers(null)
        .updateFromJSON(json, map);
}

function fuck(map) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');

        var googleLatLng = createGoogleLatLng(lat, lng);
        var marker = createMarker(tracker.mapIndex, tracker.colorHex, googleLatLng, map);
        var markerIcon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=""|' + colorHex + '|000000';
        var marker = new google.maps.Marker({
            icon: markerIcon,
            position: googleLatLng,
            map: map,
        });
    };

    function error(err) {
        console.warn('Geolocation error: ' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
}

function renderBrowserMarker(map) {
    var myloc = new google.maps.Marker({
        clickable: false,
        icon: new google.maps.MarkerImage(
            '//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22,22),
            new google.maps.Point(0,18),
            new google.maps.Point(11,11)
        ),
        shadow: null,
        zIndex: 999,
        map: map
    });

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(function(pos) {
        var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log(me);
        myloc.setPosition(me);
    }, function(error) {
        // ...
    });
}
