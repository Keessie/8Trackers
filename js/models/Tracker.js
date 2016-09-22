/* eslint-disable no-unused-vars */

function Tracker (dataIndex, mapIndex, colorHex) {
    return {
        dataIndex: dataIndex,
        mapIndex: mapIndex,
        colorHex: colorHex,
        selected: false,
        googleLatLng: null,
        marker: null,
        path: null
    };
}
