/* exported getTrackers */
/* global $ */

function getTrackers() {
    var url = 'https://io.adafruit.com/api/groups/JWDamsteeg/receive.json?x-aio-key=1aae3c9c6cff44fda53335a156f30f04';
    return $.getJSON(url);
}
