/* global google */
/* exported currentLocation */

var markerIcon = new google.maps.MarkerImage(
    '//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
    new google.maps.Size(22, 22),
    new google.maps.Point(0, 18),
    new google.maps.Point(11, 11)
);

var currentLocation = {
    marker: null,
    googleLatLng: null,
    setMarker: function(lat, lng, map) {
        if (this.marker) this.marker.setMap(null); // delete old marker

        this.googleLatLng = new google.maps.LatLng(lat, lng);

        this.marker = new google.maps.Marker({
            clickable: false,
            icon: markerIcon,
            shadow: null,
            zIndex: 999,
            map: map
        });

        this.marker.setPosition(this.googleLatLng);
    }
};