
//var mymap = L.map('mapid');
/*
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

console.log('sssssssssss');
*/
    /*
var marker = L.marker([45.815399, 15.966568]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

var marker2 = L.marker([45.815399, 15.99]).addTo(mymap);
marker2.bindPopup("<b>"+obj.users.length+"</b>");
*/


/*
//trenutna lokacija
mymap.locate({setView: true, watch: true}) 
        .on('locationfound', function(e){
            var marker = L.marker([e.latitude, e.longitude]   ).bindPopup('Trenutna lokacija: ' +e.latitude + ' ' + e.longitude);
            var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.15
                
            });
            mymap.addLayer(marker);
            mymap.addLayer(circle);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
*/


function getLocation() {
            var x = document.getElementById("demo");
            console.log(x)
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
          }
        }
        
function showPosition(position) {
          var x = document.getElementById("demo");
          x.innerHTML = "Your current position is:<br>" +"Latitude: " + position.coords.latitude + 
          "<br>Longitude: " + position.coords.longitude;
        }