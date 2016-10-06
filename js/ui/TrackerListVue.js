/* global Vue */
/* exported TrackerListVue */

function TrackerListVue (map, trackers, currentLocation) {
    return new Vue({
        el: '#page-trackers',
        data: {
            trackers: trackers,
            currentLocation: currentLocation
        },
        methods: {
            viewMap: function() {
                this.$el.style.zIndex = -1;
            },
            centerMapOnCoords: function(latLng) {
                map.setCenter(latLng);
                this.viewMap();
            }
        }
    });
}
