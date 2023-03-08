//Нужно, чтобы карта отображалась целиком, а не только в углу. Using setInterval can help the reloading or refreshing of the map itself. https://stackoverflow.com/questions/42204194/leaflet-only-renders-into-one-corner
  setInterval(function() {
     map.invalidateSize();
  }, 0);

//Map coordinating//
var map = L.map('map').setView([58.149387, 52.732561], 18);

//Задаём зум больше стандартного максимального 18//
map.setMaxZoom(24);

//https://devdocs.io/leaflet~1.8/ Задать уровни появления слоёв, искать на странцие Map Panes//
map.createPane('q');
map.getPane('q').style.zIndex = 310;
map.getPane('q').style.pointerEvents = 'none';					

map.createPane('s');
map.getPane('s').style.zIndex = 315;
map.getPane('s').style.pointerEvents = 'none';	

//Загрузка подложек из интернета//
//Mapbox_Satellite//
var Mapbox_Satellite = L.tileLayer('https://api.mapbox.com/styles/v1/truespearmint/cl8j3je6x002815o59qa0zaeu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidHJ1ZXNwZWFybWludCIsImEiOiJja21xZnRjcG4wN25oMndtcWFoaTgwbHU0In0.MZ_KaXzPzUaXzqGq1sRZRg', {
attribution: '<a href="https://www.mapbox.com/about/maps/">© Mapbox | </a>',
pane: 'q'
});
Mapbox_Satellite.addTo(map);

//Загрузка подложек с компьютера//
//Топоплан Иднакара//
var idnakar = L.tileLayer('tiles/{z}/{x}/{y}.png', {
attribution: '<a href="https://www.mapbox.com/about/maps/">© Mapbox | </a>',
tms: true,
pane: 's'
});

//Layer controller//
var baseMaps = {
"C подложкой": Mapbox_Satellite
};

var overlays = {
"Топоплан": idnakar
};

var ControlLayers = L.control.layers(baseMaps, overlays).addTo(map);
var ControlScale = L.control.scale().addTo(map);

//Найти расположение пользователя
L.control.locate({flyTo: true}).addTo(map);	