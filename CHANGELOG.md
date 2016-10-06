# Changelog

## 0.0.1

- Pages:Map
    - Buttons
        - "Center"
            - Centers map on a tracker, whose index hardcoded

        - "Clear Path"
            - Clears paths on trackers

    - Markers
        - Trackers
            - One marker per tracker.
            - on-click opens a details popup, is closed upon data refresh

        - Current Location
            - One marker is displayed that represents user's geolocation

## 0.0.2

- Pages:Map:Markers:Trackers
    - on-click, opens or closes a details popup
    - popup is no longer closed upon a data refresh


## 0.0.21

- Pages:Map:Buttons:"Clear Path"
    - Fixed bug, it now works as intended.


## 0.0.3

- Pages:Trackers
    - New Page! The info of all trackers can be viewed at a glance.


## 0.0.31

- Pages:Maps:Markers:Trackers
    - Fixed bug where closing an infowindow with the "x" would make the infowindow reappear once the tracker data is reloaded.


## 0.0.4

- Pages:Maps:Markers:Trackers
    - Infowindow now displays the displacement (in meters) between use location and selected tracker.


## 0.0.5

- Pages:Trackers
    - on-click, close trackers page and center map on selected tracker


## 0.0.6

- Pages:Loading
    - added loading page that is removed once map and tracker data has been loaded.


## 0.0.7

- Pages:Trackers
    - added button that focuses map on user location


## 0.0.8

- Pages:Map
    - added historical path for current location


## 0.0.81

-Page:Trackers
    - Added "hover" and "active" effects to table rows
    - Fixed height of tracker list so that it is never larger than screen size


## 0.0.82

-Page:Map
    - Making delta between user and trackers appear in KM if D is > 10km
