/* =====================
Change the slides
===================== */

var addTitle = (title) => {
  $('.sidebar').append(`<h3 id='title'>${title}</h3>`);
};

var addText = (text) => {
  $('.sidebar').append(`<p id='text'>${text}</p>`);
};

var setColor = (color) => {
  $('#map').css('background-color', color);
};

var cleanup = () => {
  $('#title').remove();
  $('#text').remove();
  $( ".main" ).remove();
  $( ".slide" ).remove();
  map.removeLayer(slide);
  map.removeLayer(slide_);
  map.removeControl(legend0);
  map.removeControl(legend1);
  map.removeControl(legend2);
  map.removeControl(legend3);
  map.removeControl(legend4);
};

//Build the slides
slides = [{
  legend: legend0,
  id: 0,
  url: 'https://raw.githubusercontent.com/LufengLIN/StoryMap/master/stations.geojson',
  style: style0_3,
  property: 'RTS_SRVD',
  zoom: 11,
  title: "1.BSL and MFL at a Glance",
  text: "SEPTA BSL and MFL have 45 stations in total, which include 21 BSL stations of the North-South direction, and 24 MFL stations of the East-West direction."
},{
  id: 1,
  legend: legend1,
  url: 'https://raw.githubusercontent.com/LufengLIN/StoryMap/master/2010TOD_Tracts.geojson',
  style: style1,
  property: 'MdHHInc',
  zoom: 11.5,
  title: "2.Median Household Income of SEPTA Nearby Tracts",
  text:"The mean MdHHInc of the tracts near the SEPTA station is $34171.4. Center City and South Philadelphia tracts are of high MdHHInc. Tracts nearby the North BSL are generally of relatively low income."
},{
  id: 2,
  legend: legend2,
  url: 'https://raw.githubusercontent.com/LufengLIN/StoryMap/master/2010TOD_Tracts.geojson',
  style: style2,
  property: 'PctWhite',
  zoom: 11.5,
  title: "3.White Percentage of SEPTA Nearby Tracts",
  text: "The mean MdHHInc of the tracts near the SEPTA station is 44%. Center City and South BSL are of high Percentage of White population. West MFL and North BSL are generally of low White percentage. The MdHHInc map is greatly overlapped with the White percentage map."
},{
  id: 3,
  legend: legend3,
  url: 'https://raw.githubusercontent.com/LufengLIN/StoryMap/master/property_Phila.geojson',
  style: style3,
  property: 'inf_prc_ft',
  zoom: 11,
  title: "4.Property Price across the City",
  text:"The Property value across the City is not evenly distributed. Highly-priced property is clustered in the Center City, Northwest Philadelphia, and South Philadelphia. Middle Philadelphia and West Philadelphia' property values are generally low."
},{
  id: 4,
  legend: legend3,
  url: 'https://raw.githubusercontent.com/LufengLIN/StoryMap/master/property_Phila.geojson',
  style: style3,
  filter: bufferfilter,
  property: 'inf_prc_ft',
  zoom: 11,
  title:"5.Property Price near the SEPTA Station",
  text:"In the Center City and South BSL, people are most willing to pay for the transit accessibility, since the house price within the ¼  buffer is much higher than those outside of the buffer. However, there are some places whose house price outside the buffer are higher than those inside buffer. Those places have low willingness to pay for transit such as areas along the North BSL along the West MFL."
}];
var currentSlide = -1;

var addmap = function (slides) {
  let legend = slides.legend,
      url = slides.url,
      p = slides.property,
      filter = slides.filter,
      style = slides.style,
      zoom = slides.zoom;
  map.setZoom(zoom);
  legend.addTo(map);
  $.ajax(url).done(function(data){
    jsondata = JSON.parse(data);
    slide = L.geoJSON(jsondata,
      {filter: filter,
       style: style,
       onEachFeature:function (feature, layer){
         layer.bindPopup(`${p}: ${feature.properties[p]}`);
       },
       pointToLayer:function(feature,latlng){
         return L.circleMarker(latlng,jsondata)
         .setRadius(0.01);
     }
    }).addTo(map);
  });
};
var buildSlide = (slideObject) => {
  cleanup();
  addTitle(slideObject.title);
  addText(slideObject.text);
  addmap(slideObject);
  $('#previous').css('visibility','initial');
  $('#next').css('visibility','initial');

  if(currentSlide <= 0){
    $('#previous').css('visibility','hidden');
   }
  if(currentSlide >= slides.length-1){
    $('#next').css('visibility','hidden');
  }
};
//The button
$("#next,#previous").click((event) => {
  console.log(event);
  let id = event.target.id;
  if (id === "next") {currentSlide = currentSlide + 1;}
  else if (id === "previous") {currentSlide = currentSlide - 1;}
  buildSlide(slides[currentSlide]);
});
