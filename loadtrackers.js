
var mapcenter = {lat: 51.998276, lng: 4.353702};
   var map;
    var poly;
   var markers = [];

function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map on T14';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
          map.setCenter(window.mapcenter);
        });

      }
 

    
      function initMap() {
        // var myLatLng = {lat: window.lattitude, lng: window.lattitude}; // Number(window.lattitude)
        //var myLatLng = new google.maps.LatLng(51.99704,4.35392);
 
map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat1, lng: lon1},
          zoom: 16
        });
      
        poly = new google.maps.Polyline({
         map: map,
         path: [],
         strokeColor: '#8E67FD',
         strokeWeight: 2
      });
      
      poly14 = new google.maps.Polyline({
         map: map,
         path: [],
         strokeColor: '#FD7567',
         strokeWeight: 2
      });
           poly15 = new google.maps.Polyline({
         map: map,
         path: [],
         strokeColor: '#6991FD',
         strokeWeight: 2
      });
           poly16 = new google.maps.Polyline({
         map: map,
         path: [],
         strokeColor: '#00E64D',
         strokeWeight: 2
      });
            poly17 = new google.maps.Polyline({
         map: map,
         path: [],
         strokeColor: '#65DBDB',
         strokeWeight: 2
      });
                 poly18 = new google.maps.Polyline({
         map: map,
         path: [],
         strokeColor: '#FF9900',
         strokeWeight: 2
      });
                 poly19 = new google.maps.Polyline({
         map: map,
         path: [],
         strokeColor: '#E661AC',
         strokeWeight: 2
      });
                 poly20 = new google.maps.Polyline({
         map: map,
         path: [],
         strokeColor: '#FDF569',
         strokeWeight: 2
      });
      
      
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

 
        

      };    

(function() {
 var T1URL = "https://io.adafruit.com/api/groups/JWDamsteeg/receive.json?x-aio-key=1aae3c9c6cff44fda53335a156f30f04";
 $.getJSON(T1URL, function(json) {
var T13 = json.feeds[0].last_value.split(',');  
var T14 = json.feeds[1].last_value.split(',');
var T15 = json.feeds[2].last_value.split(',');  
var T16 = json.feeds[3].last_value.split(',');  
var T17 = json.feeds[4].last_value.split(',');  
var T18 = json.feeds[5].last_value.split(',');
var T19 = json.feeds[6].last_value.split(',');  
var T20 = json.feeds[7].last_value.split(',');  

var lat13 = T13[0];
var lon13 = T13[1];
var speed13 = T13[2];
var batPercent13 = T13[3];

var lat14 = T14[0];
var lon14 = T14[1];
var speed14 = T14[2];
var batPercent14 = T14[3];

var lat15 = T15[0];
var lon15 = T15[1];
var speed15 = T15[2];
var batPercent15 = T15[3];

var lat16 = T16[0];
var lon16 = T16[1];
var speed16 = T16[2];
var batPercent16 = T16[3];

var lat17 = T17[0];
var lon17 = T17[1];
var speed17 = T17[2];
var batPercent17 = T17[3];

var lat18 = T18[0];
var lon18 = T18[1];
var speed18 = T18[2];
var batPercent18 = T18[3];

var lat19 = T19[0];
var lon19 = T19[1];
var speed19 = T19[2];
var batPercent19 = T19[3];

var lat20 = T20[0];
var lon20 = T20[1];
var speed20 = T20[2];
var batPercent20 = T20[3];

// console.log( "JSON Data: " + batPercent13  );

var infowindow13 = new google.maps.InfoWindow({content:  "Tracker 13.</p>" + "Bat: " + batPercent13 + "%"});
var infowindow14 = new google.maps.InfoWindow({content:  "Tracker 14.</p>" + "Bat: " + batPercent14 + "%"});
var infowindow15 = new google.maps.InfoWindow({content:  "Tracker 15.</p>" +  "Bat: " + batPercent15 + "%"});
var infowindow16 = new google.maps.InfoWindow({content:  "Tracker 16.</p>" +  "Bat: " + batPercent16 + "%"}); 
var infowindow17 = new google.maps.InfoWindow({content:  "Tracker 17.</p>" + "Bat: " + batPercent17 + "%"});
var infowindow18 = new google.maps.InfoWindow({content:  "Tracker 18.</p>" + "Bat: " + batPercent18 + "%"});
var infowindow19 = new google.maps.InfoWindow({content:  "Tracker 19.</p>" +  "Bat: " + batPercent19 + "%"});
var infowindow20 = new google.maps.InfoWindow({content:  "Tracker 20.</p>" +  "Bat: " + batPercent20 + "%"}); 
 
var myLL13 = new google.maps.LatLng(lat13, lon13);
var myLL14 = new google.maps.LatLng(lat14, lon14);
var myLL15 = new google.maps.LatLng(lat15, lon15);
var myLL16 = new google.maps.LatLng(lat16, lon16);
var myLL17 = new google.maps.LatLng(lat17, lon17);
var myLL18 = new google.maps.LatLng(lat18, lon18);
var myLL19 = new google.maps.LatLng(lat19, lon19);
var myLL20 = new google.maps.LatLng(lat20, lon20);

window.mapcenter = myLL14; 
clearMarkers();

var marker13 = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
            position: myLL13,
            map: map,
              });
 markers.push(marker13);
  
  marker13.addListener('click', function() {
        infowindow13.open(map, this);
         });
        
 
 
 var marker14 = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            position: myLL14,
            map: map,
        });
markers.push(marker14);
 
marker14.addListener('click', function() {
        infowindow14.open(map, this);
        });
        

 var marker15 = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            position: myLL15,
            map: map,
        });
markers.push(marker15);
marker15.addListener('click', function() {
        infowindow15.open(map, this);
        });

        
 var marker16 = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: myLL16,
            map: map,
        });
markers.push(marker16);     
marker16.addListener('click', function() {
        infowindow16.open(map, this);
        });
  
 var marker17 = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
            position: myLL17,
            map: map,
        });
markers.push(marker17);     
marker17.addListener('click', function() {
        infowindow17.open(map, this);
        });
 
  var marker18 = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
            position: myLL18,
            map: map,
        });
markers.push(marker18);     
marker18.addListener('click', function() {
        infowindow18.open(map, this);
        });  
 
   var marker19 = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png',
            position: myLL19,
            map: map,
        });
markers.push(marker19);     
marker19.addListener('click', function() {
        infowindow19.open(map, this);
        });         

   var marker20 = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            position: myLL20,
            map: map,
        });
markers.push(marker20);     
marker20.addListener('click', function() {
        infowindow20.open(map, this);
        });         
    
var path = poly.getPath();
path.push(new google.maps.LatLng(lat13, lon13));
poly.setMap(map);

var path14 = poly14.getPath();
path14.push(new google.maps.LatLng(lat14, lon14));
poly14.setMap(map);

var path15 = poly15.getPath();
path15.push(new google.maps.LatLng(lat15, lon15));
poly15.setMap(map);

var path16 = poly16.getPath();
path16.push(new google.maps.LatLng(lat16, lon16));
poly16.setMap(map);

var path17 = poly17.getPath();
path17.push(myLL17);
poly17.setMap(map);

var path18 = poly18.getPath();
path18.push(myLL18);
poly18.setMap(map);

var path19 = poly19.getPath();
path19.push(myLL19);
poly19.setMap(map);

var path20 = poly20.getPath();
path20.push(myLL20);
poly20.setMap(map);

});
setTimeout(arguments.callee, 10000);
})();

 function clearMarkers() {
        setMapOnAll(null);
      }
  function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }


(function() {
 var T1URL = "https://io.adafruit.com/api/groups/JWDamsteeg/receive.json?x-aio-key=1aae3c9c6cff44fda53335a156f30f04";
 $.getJSON(T1URL, function(json) {
var T = json.feeds[0].last_value.split(',');
var lat1 = T[0];
var lon1 = T[1];
map.setCenter(new google.maps.LatLng(lat1, lon1););
 })});