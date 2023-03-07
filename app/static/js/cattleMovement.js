// =========================================== //
// Cattle Movement Leaflet Map
//
// Code: JavaScript
// Author: Tom Jenkins (Tom.Jenkins@apha.gov.uk)
// =========================================== //

"use strict";


// ------------------------ //
//
// DUMMY DATA (TESTING ONLY)
//
// ------------------------ //

// const mov1 = [
//   [51.81296, -1.738453, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/01", "Farm", "Norfolk", "LRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
//   [52.32055, -1.871136, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/02", "Farm", "Norfolk", "LRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
//   [51.84591, -2.314109, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/03", "Farm", "Norfolk", "LRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
//   [52.89763, -1.719953, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/04", "Farm", "Norfolk", "LRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
//   [52.9762, -1.038638, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/05", "Farm", "Norfolk", "LRA", "B2-11", "Yes", "North Devon", "2014-01-03"],
//   [52.86099, -0.8604088, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/06", "Farm", "Norfolk", "HRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
//   [52.54504, -1.982333, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/07", "Farm", "Norfolk", "HRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
//   [52.42978, -1.132525, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/08", "Farm", "Norfolk", "HRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
//   [52.93212, -0.930516, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/09", "Farm", "Norfolk", "HRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
//   [52.70011, -2.2853, "AF-12-00001-22", "B1-11", "UK000000000001", "Bovine", "2022-01-01", "12/345/67/10", "Slaughterhouse", "Norfolk", "HRA", "B2-11", "Yes", "North Devon", "2014-01-03", "Female"],
// ];



// ------------------------ //
//
// BASEMAP PARAMETERS
//
// ------------------------ //

// Coordinates and zoom level of map on first render
const defaultCoords = [52.56555275762325, -1.4667093894864072];
const defaultZoom = 6;

// Tiles
// https://leaflet-extras.github.io/leaflet-providers/preview/

// OpenStreetMap tiles
const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// Esri grey canvas
const Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16,
});
// Esri world imagery
const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Initiate map and set bounding box to the centre of England
// const map = L.map("map").setView(defaultCoords, defaultZoom);
const map = L.map("map", {
  center: defaultCoords,
  zoom: defaultZoom,
  layers: [osm, Esri_WorldGrayCanvas, Esri_WorldImagery],
  zoomControl: false,
});



// ------------------------ //
//
// DYNAMICALLY SET HEIGHT OF MAP
//
// ------------------------ //

// Calculate maximum height of the container where the map will render based on the users screen height
const navbarHeight = document.querySelector(".navbar").offsetHeight;
const navbarHeightMargin = parseInt(window.getComputedStyle(document.querySelector(".navbar")).getPropertyValue("margin-bottom"));
const mapHeight = window.innerHeight - navbarHeight - navbarHeightMargin;

// Set the height of map and sidebar containers
document.getElementById("map").style.height = `${mapHeight}px`;
document.getElementById("map-sidebar-container").style.height = `${mapHeight}px`;
map.invalidateSize();

// Change the height of the map when the window is resized
// For example, when the user drags the browser from a laptop screen to a desktop screen (or vice versa)
window.addEventListener("resize", () => {
  document.getElementById("map").style.height = `${window.innerHeight - navbarHeight - navbarHeightMargin}px`;
  document.getElementById("map-sidebar-container").style.height = `${window.innerHeight - navbarHeight - navbarHeightMargin}px`;
  map.invalidateSize();
});



// ------------------------ //
//
//  TOGGLE FULL SCREEN AND HIDING SIDEBAR
//
// ------------------------ //

// Add a full screen button to the top-left corner of the map
// Collapse the sidebar when this button is clicked
// [Detail: this code creates and adds a custom control using the leaflet library]
// [Detail: this code adds a collapse data-bs-toggle collapse property using the bootstrap library]
const btnFullScreen = L.Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function(map) {
    const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar");
    divContainer.setAttribute("id", "btn__map-fullscreen");

    divContainer.insertAdjacentHTML("afterbegin", `
      <a title="Full screen" data-bs-toggle="collapse" href="#content2-column1-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
        </svg>
      </a>
    `);
    return divContainer;
  }
});
map.addControl(new btnFullScreen());

// Add a right arrow button to the top-left corner of the map (hidden by default)
// Expand the sidebar when this button is clicked
const btnRightArrow = L.Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function(map) {
    const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar hidden");
    divContainer.setAttribute("id", "btn__map-exitfullscreen");

    divContainer.insertAdjacentHTML("afterbegin", `
      <a title="Exit full screen and show sidebar" data-bs-toggle="collapse" href="#content2-column1-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
      </a>
    `);
    return divContainer;
  }
});
map.addControl(new btnRightArrow());

// Change button and refresh map size after sidebar has completed collapse 
document.getElementById("content2-column1-container").addEventListener("hidden.bs.collapse", () => {
  document.getElementById("btn__map-exitfullscreen").classList.remove("hidden");
  document.getElementById("btn__map-fullscreen").classList.add("hidden");
  map.invalidateSize();
})

// Change button and refresh map size after sidebar has completed expansion
document.getElementById("content2-column1-container").addEventListener("shown.bs.collapse", () => {
  document.getElementById("btn__map-fullscreen").classList.remove("hidden");
  document.getElementById("btn__map-exitfullscreen").classList.add("hidden");
  map.invalidateSize();
})



// ------------------------ //
//
//  ADDITIONAL MAP FEATURES
//
// ------------------------ //

// Add a zoom control to the top-left corner of the map
L.control.zoom({
  position: "topleft",
}).addTo(map);


// Add a repeat arrow button to the top-left corner of the map
// [Detail: this code creates and adds a custom control using the leaflet library]
const resetView = L.Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function(map) {
    const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar");
    divContainer.setAttribute("id", "btn__map-resetview");

    divContainer.insertAdjacentHTML("afterbegin", `
      <a title="Reset view">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
          <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
        </svg>
      </a>
    `);
    return divContainer;
  }
});
map.addControl(new resetView());

// Reset view to default coordinates when repeat arrow button is clicked
document.getElementById("btn__map-resetview").addEventListener("click", () => {
  map.setView(defaultCoords, defaultZoom);
});


// Add a measurement tool to the top-left corner of the map
// Leaflet plugin: https://github.com/NLTGit/Leaflet.LinearMeasurement
map.addControl(
  new L.Control.LinearMeasurement({
    unitSystem: "imperial",
    position: "topleft",
    color: "#FF0080",
    type: "line",
  })
);


// Add a control layer for basemaps in the top-right to allow user to change the basemap tiles
const baseMaps = {
  "Open Street Map": osm,
  "Esri Grey Canvas": Esri_WorldGrayCanvas,
  "Esri World Imagery": Esri_WorldImagery,
};
let layerControl = L.control.layers(baseMaps, null, {collapsed: false}).addTo(map);

// Add a title to the basemap control
document.querySelector(".leaflet-control-layers-base").insertAdjacentHTML("beforebegin", "<strong style='font-size: 15px; margin-bottom: 15px;'>Basemaps</strong>");
document.querySelector('.leaflet-control-layers-selector').click() // ensure OSM is the default basemap

// Add scalebar to the map
L.control.scale({imperial: false}).addTo(map);



// ------------------------ //
//
// TOGGLE SHAPEFILE LAYERS IN SIDEBAR
//
// ------------------------ //

// Initiate variables to store shapefile data
let countyPoly, riskAreaPoly, homeRangePoly;

// Function to toggle layers on or off
const toggleLayers = function(layer){

  // When checkbox is ticked, add layer to map
  if(this.checked === true){
    layer.addTo(map) 
  };

  // When checkbox is unticked, remove layer from map
  if(this.checked === false) map.removeLayer(layer);
};

// Leaflet plugin URL for adding shapefiles
// https://github.com/calvinmetcalf/leaflet.shapefile

// Function to highlight borders of each polygon on mouseover (when mouse hovers over them)
const highlightFeature = function(e) {
  const layer = e.target;

  layer.setStyle({
    weight: 3,
    color: "#252525",
  });

  layer.bringToFront();
};

// Function to reset border to original style on mouseout (when mouse is not hovering over a polygon)
const resetHighlight = function(e) {
  countyPoly.resetStyle(e.target);
  console.log(e.target);
};

// Function to zoom to a polygon when it is clicked
const zoomToPoly = function(e) {
  map.fitBounds(e.target.getBounds());
};

// Function to add highlighting parameters to a layer
const onEachFeature = function(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToPoly,
  });
};

// Function to set a range of polygon colours for Risk Areas
const riskAreaCols = function(area) {
  switch (area) {
    case "High Risk Area": return "#C62828";
    case "High TB Area": return "#C62828";
    case "Intermediate TB Area": return "orange";
    case "Edge Area": return "orange";
    case "Low Risk Area" : return "#00C853";
    case "Low TB Area": return "#00C853";
    case "TB Free Area": return "#CFD8DC";
  };
};

// Function to set custom styles for Risk Area polygons
const styleRiskAreaPoly = function(feature){
    return {
      fillColor: riskAreaCols(feature.properties.TB_Area),
      weight: 1.5,  
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.50,
  };
};

// Function to set custom styles for other polygons
const stylePoly = function(color = "blue"){
    return {
      fillColor: color,
      weight: 1.5,  
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.50,
  };
};

// Toggle county polygons when checkbox is ticked or unticked
countyPoly = new L.Shapefile("/static/data/AHVLACounties20120315.zip", {style: stylePoly("royalblue"), onEachFeature: onEachFeature});
const countyBox = document.getElementById("countyBox"); // select element from DOM
countyBox.addEventListener("change", toggleLayers.bind(countyBox, countyPoly)); // event listener on the county checkbox

// Toggle risk area polygons when checkbox is ticked or unticked
riskAreaPoly = new L.Shapefile("/static/data/RiskAreas.zip", {style: styleRiskAreaPoly});
const riskAreaBox = document.getElementById("riskAreasBox");
riskAreaBox.addEventListener("change", toggleLayers.bind(riskAreaBox, riskAreaPoly));

// Toggle risk area polygons when checkbox is ticked or unticked
homeRangePoly = new L.Shapefile("/static/data/HR2021.zip", stylePoly("purple"));
const homeRangeBox = document.getElementById("homeRangesBox");
homeRangeBox.addEventListener("change", toggleLayers.bind(homeRangeBox, homeRangePoly));

// Legend for Risk Areas
// https://leafletjs.com/examples/choropleth/
// TODO
let legend = L.control({position: "bottomright"});
legend.onAdd = function (map) {

    let div = L.DomUtil.create('div', 'info legend');
    const levels = ["High Risk Area", "Edge Area", "Low Risk Area", "High TB Area", "Intermediate TB Area", "Low TB Area", "TB Free Area"];
    const colours = ["#C62828", "orange", "#00C853", "#C62828", "orange","#00C853", "#CFD8DC"];
    const country = ["ENG", "ENG", "ENG", "WAL", "WAL", "WAL", "SCO"];

    // Build legend: loop through levels and generate a label with a colored square

    // England
    div.insertAdjacentHTML("afterbegin", "<strong>England</strong><br>");
    for (let i = 0; i < levels.length; i++) 
      if (country[i] === "ENG") div.insertAdjacentHTML("beforeend", `<i style="background: ${colours[i]};"></i> ${levels[i]} <br>`);
    
    div.insertAdjacentHTML("beforeend", "<br>");

    // Wales
    div.insertAdjacentHTML("beforeend", "<strong>Wales</strong><br>");
    for (let i = 0; i < levels.length; i++) 
      if (country[i] === "WAL") div.insertAdjacentHTML("beforeend", `<i style="background: ${colours[i]};"></i> ${levels[i]} <br>`);

    div.insertAdjacentHTML("beforeend", "<br>");

    // Scotland
    div.insertAdjacentHTML("beforeend", "<strong>Scotland</strong><br>");
    for (let i = 0; i < levels.length; i++) 
      if (country[i] === "SCO") div.insertAdjacentHTML("beforeend", `<i style="background: ${colours[i]};"></i> ${levels[i]} <br>`);

    return div;
};

// Toggle legend when checkbox is (un)ticked
riskAreaBox.addEventListener("change", function() {

    // When checkbox is ticked
    if(this.checked === true) legend.addTo(map);
  
    // When checkbox is unticked
    if(this.checked === false) legend.remove();
});


// ------------------------ //
//
// PLOT MAIN CATTLE MOVEMENT
//
// ------------------------ //

// Cow icons
const cowIcon = L.icon({
    iconUrl: "/static/img/Cow_GIS_Team.svg",
    // iconUrl: "file:///C:/Users/m1004795/OneDrive%20-%20Defra/bTB/ViewBovis/ViewBovis%20Design%20A/images/Cow_GIS_Team.svg",
    iconSize: [50, 50],
    iconAnchor: [25, 35], // horizontal and vertical adjustment so that the cow head exactly matches marker coordinate
});

// Initiate variables to store spatial data for cow markers and cattle movement lines
let cowMarker, cattleMovLine, linePts;

// Custom popup options
// https://leafletjs.com/reference.html#popup
const customOptions = {
    maxWidth: 400, // in pixels
    className: "popupCustom" // must match a css class in styles.css
};

// Function to add cattle movement points and popups to map
const addPtsPopupsToMap = function() {

  // Add all cattle movement points to the map
  for (let i = 0; i < mov1.length; i++){
    cowMarker = new L.marker([mov1[i][0], mov1[i][1]], {icon: cowIcon}); // leaflet marker object to store coordinates

    // Store data for each movement point in an array
    const movData = mov1[i].slice(2, i.length); // extract data from third to last element in array (first two elements are lat and lon)

    // Create HTML popup content using template literal
    // The first number in movData[x-x] corresponds to the column number in the MDWH csv file (subtracting 1 as JS indexing starts at 0)
    const popupContent = `
    <div class="fs-5 fw-bold">${movData[2]}</div><br>
    <div>
      <nav>
        <div class="nav nav-tabs" id="popupNav" role="tablist">
          <button class="nav-link active" id="navSummary" data-bs-toggle="tab" data-bs-target="#navSummaryContent" type="button" role="tab" aria-controls="navSummaryContent" aria-selected="true">Summary</button>
          <button class="nav-link" id="navInfo" data-bs-toggle="tab" data-bs-target="#navInfoContent" type="button" role="tab" aria-controls="navInfoContent" aria-selected="false">Animal</button>
        </div>
      </nav>
      <div class="tab-content" id="popTabContent">     
        <div class="tab-pane fade show active" id="navSummaryContent" role="tabpanel" aria-labelledby="navSummary" tabindex="0">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td><strong>Movement:</strong></td>
                <td>${i+1} ${i===0 ? "(Origin)" : ""}${i===mov1.length-1 ? "(Death)" : ""}</td>
              </tr>
              <tr>
                <td><strong>Lat Lon:</strong></td>
                <td>${mov1[i][0].toFixed(3)} ${mov1[i][1].toFixed(3)}</td>
              </tr>  
              <tr>
                <td><strong>AF Number:</strong></td>
                <td>${movData[1-1]}</td> 
              </tr>
              <tr>
                <td><strong>Clade:</strong></td>
                <td>${movData[2-1]}</td>
              </tr>
              <tr>
                <td><strong>Slaughter Date:</strong></td>
                <td>${movData[5-1]}</td>
              </tr>
              <tr>
                <td><strong>CPH:</strong></td>
                <td>${movData[6-1]}</td>
              </tr>
              <tr>
                <td><strong>CPH Type:</strong></td>
                <td>${movData[7-1]}</td>
              </tr>
              <tr>
                <td><strong>County:</strong></td>
                <td>${movData[8-1]}</td>
              </tr>
              <tr>
                <td><strong>Risk Area:</strong></td>
                <td>${movData[9-1]}</td>
              </tr>
              <tr>
                <td><strong>CPH Home Range:</strong></td>
                <td>${movData[10-1]}</td>
              </tr>
              <tr>
                <td><strong>Out of Home Range:</strong></td>
                <td>${movData[11-1]}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="tab-pane fade show" id="navInfoContent" role="tabpanel" aria-labelledby="navInfo" tabindex="0">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td><strong>Host:</strong></td>
                <td>${movData[4-1]}</td>
              </tr>
              <tr>
                <td><strong>Breed:</strong></td>
                <td>${movData[12-1]}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>${movData[13-1]}</td>
              </tr>
              <tr>
                <td><strong>Sex:</strong></td>
                <td>${movData[14-1]}</td>
              </tr> 
            </tbody>
          </table>
          <img src="/static/img/peter-lloyd-qeABAF-3bEs-unsplash-min.jpg" alt="A photo of a cow" width="100%">
        </div>
      </div>           
    `;
    
    // Add points to map as a layer
    map.addLayer(cowMarker);

    // Add popup to points
    cowMarker.bindPopup(popupContent, customOptions);
  };

  // Connect the points with a blue line
  linePts = mov1.map(x => x.slice(0,2)); // extract lat and lon and store in a new array
  cattleMovLine = L.polyline(linePts, {color: "#0096FF"}).addTo(map); // create polyline object and plot on map

  // Add arrows to the line
  // Leaflet plugin: https://github.com/slutske22/leaflet-arrowheads
  cattleMovLine.arrowheads({
    yawn: 40,
    size: "5%",
    fill: true,
    fillColor: "#0096FF",
    // color: "black",
    frequency: "20000m", // options: 10, "500m", "50px", "allvertices", "endonly"
  }).addTo(map);
};


// Async function that executes when the main 'Show Cattle Movement' button is clicked
const showMovements = async function () {

  // Fetch data for sample
  const response = await fetch(`/sample?sample_name=${document.getElementById("input__sampleID--1").value}`);
  const json = await response.json();

  // Log json data to the console
  console.log("Output data from async function");
  delete json.sample;
  console.log(json, typeof json); 


  const arr1 = [...Object.entries(json)];
  console.log(arr1);

  // Store data in variables using destructuring
  // const { lat, lon } = json;
  // console.log(Object.values(lat), lon);


  // Add points and popups to map
  addPtsPopupsToMap();

  // Zoom in to the bounds of all markers and allow some padding (buffer) to ensure all points are in view
  const bounds = L.latLngBounds(linePts).pad(0.10);
  map.fitBounds(bounds);

  // Allow user access to other elements by removing the disabled class
  document.getElementById("toggle__movement-lines--1").disabled = false;
  document.getElementById("input__sampleID--2").disabled = false;
  document.getElementById("btn__cattle-movement--2").disabled = false;
  document.getElementById("slider__snp-threshold").disabled = false;
  document.getElementById("btn__related-isolates").disabled = false;
};

// Add event listener to the main 'Show Cattle Movement' button
document.getElementById("btn_show-movements").addEventListener("click", showMovements);


// BUG
// Function does not work when user select A or B
// Toggle lines and arrows from map when 'Movement Lines' checkbox ticked or unticked
const toggleMovementLines = document.getElementById("toggle__movement-lines--1");
toggleMovementLines.addEventListener("change", function(){

  // When checkbox is ticked, add layer to map
  if(this.checked === true) cattleMovLine.addTo(map);

  // When checkbox is unticked, remove layer from map
  if(this.checked === false) cattleMovLine.remove();
});



// ------------------------ //
//
// PLOT SECOND CATTLE MOVEMENT
//
// ------------------------ //

// TODO


// ------------------------ //
//
// SNP DISTANCE SLIDER
//
// ------------------------ //

// TODO

