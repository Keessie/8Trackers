/*
    eslint-disable no-unused-vars
*/

/*
    global Tracker
*/
var MAP;

var MARKERS = [];
var TRACKERS_GET_URL = 'https://io.adafruit.com/api/groups/JWDamsteeg/receive.json?x-aio-key=1aae3c9c6cff44fda53335a156f30f04';

var MAP_CENTER = {
    lat: 51.998276,
    lng: 4.353702
};

var TRACKERS = [
    new Tracker(0, 13, '8E67FD'),
    new Tracker(1, 14, 'FD7567'),
    new Tracker(2, 15, '6991FD'),
    new Tracker(3, 16, '00E64D'),
    new Tracker(4, 17, '65DBDB'),
    new Tracker(5, 18, 'FF9900'),
    new Tracker(6, 19, 'E661AC'),
    new Tracker(7, 20, 'FDF569')
];
