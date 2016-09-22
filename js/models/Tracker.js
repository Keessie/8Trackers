/* eslint-disable no-unused-vars */

function Tracker (dataIndex, mapIndex, colorHex) {
    return {
        dataIndex: dataIndex,
        mapIndex: mapIndex,
        colorHex: colorHex,
        googleLatLng: null,
        batPercent: null,
        marker: null,
        poly: null
    };
}
