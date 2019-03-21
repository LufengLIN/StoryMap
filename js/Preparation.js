/* =====================
Leaflet Configuration
===================== */
//Set the base map
var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11,
  setZoom: true
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//SLIDE1: WHERE ARE THE STATIONS?
//the city limit map
function style0(feature) {
    return {
        fillColor: "#EAEAE9",
        weight: 2,
        opacity: 1,
        color: '#575757',
        dashArray: '4',
        fillOpacity: 0.2
    };
}
var url2 = 'https://raw.githubusercontent.com/LufengLIN/StoryMap/master/City_Limits.geojson';
$.ajax(url2).done(function(res) {
  console.log("done");
  L.geoJSON(JSON.parse(res),{style: style0}).addTo(map);
  });

//the census tract near the BSL and MFL stations
function style0_2(feature) {
    return {
        fillColor: "#EAEAE9",
        weight: 0.5,
        opacity: 1,
        color: '#575757',
        fillOpacity: 0.2
    };
}
var url = 'https://raw.githubusercontent.com/LufengLIN/StoryMap/master/2010TOD_Tracts.geojson';
var jsondata;
var slide;
$.ajax('https://raw.githubusercontent.com/LufengLIN/StoryMap/master/2010TOD_Tracts.geojson').done(function(res) {
  jsondata = JSON.parse(res);
  slide = L.geoJSON(
    jsondata,
    {style: style0_2,
    onEachFeature: function(feature,layer){
      layer.bindPopup(`GEOID: ${feature.properties.GEOID10}`);
    }}).addTo(map);
  });

//The SEPTA BSL and MFL stations
var style0_3 = function(feature) {
    if (feature.properties.RTS_SRVD == 'BROAD STREET LINE') {
    return {color: '#FF8000'};
  }
    else if (feature.properties.RTS_SRVD == 'MARKET-FRANKFORD LINE'){
    return {color: '#08298A'};
  }
};

var slide_;
var jsondata3;
$.ajax('https://raw.githubusercontent.com/LufengLIN/StoryMap/master/stations.geojson').done(function(res) {
  jsondata3 = JSON.parse(res);
  slide_ = L.geoJSON(
    jsondata3,{
      style:style0_3,
      pointToLayer:function(feature,latlng){
        return L.circleMarker(latlng,jsondata3)
        .setRadius(1)
        .bindPopup(`Station: ${feature.properties.RTS_SRVD}`);
      }
    }
    ).addTo(map);
  });

//SLIDE2: WHO LIVES NEAR THE SEPTA STATION
//Set the color style
//MdHHInc
function getColor(a) {
    return a > 49430   ? '#FC4E2A' :
           a > 35046   ? '#FD8D3C' :
           a > 25038   ? '#FEB24C' :
           a > 19516   ? '#FED976' :
                         '#FFEDA0';
}
//Pctwhite
function getColor2(b) {
    return b > 73   ? '#FC4E2A' :
           b > 55   ? '#FD8D3C' :
           b > 33   ? '#FEB24C' :
           b > 6    ? '#FED976' :
                      '#FFEDA0';
}
//inf_prc_ft
function getColor3(c) {
    return c > 181.8   ? '#FC4E2A' :
           c > 124.7   ? '#FD8D3C' :
           c > 77.3    ? '#FEB24C' :
           c > 37.5    ? '#FED976' :
                         '#FFEDA0';
}
//Within or Outside the buffer
function getColor4(d) {
    return d >0    ? '#04B4AE' :
                     '#DF7401';
}
//MdHHInc
function style1(feature) {
    return {
        fillColor: getColor(feature.properties.MdHHInc),
        weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//Pctwhite
function style2(feature) {
    return {
        fillColor: getColor2(feature.properties.PctWhite),
        weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//inf_prc_ft
function style3(feature) {
    return {
        color: getColor3(feature.properties.inf_prc_ft),
        opacity: 1
    };
}
//Within or Outside the buffer
function style4(feature) {
    return {
        color: getColor4(feature.properties.difference),
        opacity: 1
    };
}


//Prepare for the legends
function getColorX(x) {
    return x > 0 ? '#08298A' :
                    '#FF8000';
}

var legend0 = L.control({position: 'topright'});
legend0.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = ["Broad Street Line (BSL)","Market-Frankford Line (MFL)"];
        var grades = [-1,0];
        div.innerHTML = '<h4>SEPTA Station</h4>';
        //  loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColorX(grades[i] + 1) + '"></i> ' +
                (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'+labels[i]+'<br/>');
        }
      return div;
    };

//The second slide-MdHHInc
var legend1 = L.control({position: 'topright'});
legend1.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [0,19516, 25038,35046,49430];
        div.innerHTML = '<h4>MdHHInc</h4>';
        //  loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
      return div;
    };
var legend2 = L.control({position: 'topright'});
legend2.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [0,6,33,55,73];
        div.innerHTML = '<h4>Percent of White</h4>';
        //  loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
      return div;
    };
var legend3 = L.control({position: 'topright'});
legend3.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [0,37.5,77.3,124.7,181.8];
        div.innerHTML = '<h4>Price per Sqft</h4>';
        //  loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor3(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
      return div;
    };
var legend4 = L.control({position: 'topright'});
legend4.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [0,37.5,77.3,124.7,181.8];
        div.innerHTML = '<h4>Price per Sqft</h4>';
        //  loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor3(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
      return div;
    };
function bufferfilter(feature) {
  if (feature.properties.lt_qrtMi === 1) return true;
}
