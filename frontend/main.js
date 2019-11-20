
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import markers from '../data/markers.json'

var mymap = L.map('map').setView([50.7205, 7.0800], 10);


L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'wikimedia.streets'
}).addTo(mymap);

// L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
// 	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	id: 'stamen'
// }).addTo(mymap);


markers.filter(u=>u.coords&&u.coords[0]&&u.coords[1])
.forEach(marker=>{
    L.marker(marker.coords).on('click', function() {
        window.location = marker.link;
    }).addTo(mymap);
});

