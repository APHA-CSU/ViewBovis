// =========================================== //
// SNP Map
//
// Code: JavaScript
// Author: Tom Jenkins (Tom.Jenkins@apha.gov.uk)
// =========================================== //

"use strict";


// ------------------------ //
//
// BASEMAP PARAMETERS
//
// ------------------------ //

// Coordinates and zoom level of map on first render
const defaultCoords2 = [52.56555275762325, -1.4667093894864072];
const defaultZoom2 = 6;

// Tiles
// https://leaflet-extras.github.io/leaflet-providers/preview/

// OpenStreetMap tiles
const osm2 = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// Esri grey canvas
const Esri_WorldGrayCanvas2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16,
});
// Esri world imagery
const Esri_WorldImagery2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Initiate map and set bounding box to the centre of England
// const map = L.map("map").setView(defaultCoords, defaultZoom);
const map2 = L.map("map2", {
  center: defaultCoords2,
  zoom: defaultZoom2,
  layers: [osm2, Esri_WorldGrayCanvas2, Esri_WorldImagery2],
  zoomControl: false,
});


// ------------------------ //
//
// DYNAMICALLY SET HEIGHT OF MAP
//
// ------------------------ //

// Calculate maximum height of the container where the map will render based on the users screen height
const navbarHeight3 = document.querySelector(".navbar").offsetHeight;
const navbarHeightMargin3 = parseInt(window.getComputedStyle(document.querySelector(".navbar")).getPropertyValue("margin-bottom"));
const mapHeight3 = window.innerHeight - navbarHeight3 - navbarHeightMargin3;

// Set the height of map and sidebar containers
document.getElementById("map2").style.height = `${mapHeight3}px`;
document.getElementById("snpmap-sidebar-container").style.height = `${mapHeight3}px`;
document.getElementById("table-sidebar-container").style.height = `${mapHeight3}px`;
map2.invalidateSize();

// Change the height of the map when the window is resized
// For example, when the user drags the browser from a laptop screen to a desktop screen (or vice versa)
window.addEventListener("resize", () => {
  document.getElementById("map2").style.height = `${window.innerHeight - navbarHeight3 - navbarHeightMargin3}px`;
  document.getElementById("snpmap-sidebar-container").style.height = `${window.innerHeight - navbarHeight3 - navbarHeightMargin3}px`;
  document.getElementById("table-sidebar-container").style.height = `${window.innerHeight - navbarHeight3 - navbarHeightMargin3}px`;
  map2.invalidateSize();
});


// ------------------------ //
//
// TOGGLE FULL SCREEN AND HIDING SIDEBAR
//
// ------------------------ //

// Add a full screen button to the top-left corner of the map
// Collapse the sidebar when this button is clicked
// [Detail: this code creates and adds a custom control using the leaflet library]
// [Detail: this code adds a collapse data-bs-toggle collapse property using the bootstrap library]
const btnFullScreen2 = L.Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function(map) {
    const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar");
    divContainer.setAttribute("id", "btn__map-fullscreen2");

    divContainer.insertAdjacentHTML("afterbegin", `
      <a title="Hide sidebar" data-bs-toggle="collapse" href="#snpmap-content-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg>
      </a>
    `);
    return divContainer;
  }
});
map2.addControl(new btnFullScreen2());

// Add a right arrow button to the top-left corner of the map (hidden by default)
// Expand the sidebar when this button is clicked
const btnRightArrow2 = L.Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function(map) {
    const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar hidden");
    divContainer.setAttribute("id", "btn__map-exitfullscreen2");

    divContainer.insertAdjacentHTML("afterbegin", `
      <a title="Show sidebar" data-bs-toggle="collapse" href="#snpmap-content-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
      </a>
    `);
    return divContainer;
  }
});
map2.addControl(new btnRightArrow2());

// Refresh map size after sidebar has completed collapse 
document.getElementById("snpmap-content-container").addEventListener("hidden.bs.collapse", () => {
  map2.invalidateSize();
});

// Refresh map size after sidebar has expanded 
document.getElementById("snpmap-content-container").addEventListener("shown.bs.collapse", () => {
  map2.invalidateSize();
});

// Change icon to right-arrow after sidebar has collapsed
document.getElementById("btn__map-fullscreen2").addEventListener("click", () => {
  document.getElementById("btn__map-exitfullscreen2").classList.remove("hidden");
  document.getElementById("btn__map-fullscreen2").classList.add("hidden");
});

// Change icon to left-arrow after sidebar has expanded
document.getElementById("btn__map-exitfullscreen2").addEventListener("click", () => {
  document.getElementById("btn__map-fullscreen2").classList.remove("hidden");
  document.getElementById("btn__map-exitfullscreen2").classList.add("hidden");
});


// ------------------------ //
//
//  ADDITIONAL MAP FEATURES
//
// ------------------------ //

// Add a zoom control to the top-left corner of the map
L.control.zoom({
    position: "topleft",
  }).addTo(map2);
  
  
// Add a repeat arrow button to the top-left corner of the map
// [Detail: this code creates and adds a custom control using the leaflet library]
const resetView2 = L.Control.extend({
    options: {
        position: "topleft",
    },
    onAdd: function(map) {
        const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar");
        divContainer.setAttribute("id", "btn__map-resetview2");

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
map2.addControl(new resetView2());

// Reset view to default coordinates when repeat arrow button is clicked
document.getElementById("btn__map-resetview2").addEventListener("click", () => {
map2.setView(defaultCoords2, defaultZoom2);
});


// Add a measurement tool to the top-left corner of the map
// Leaflet plugin: https://github.com/NLTGit/Leaflet.LinearMeasurement
map2.addControl(
new L.Control.LinearMeasurement({
    unitSystem: "imperial",
    position: "topleft",
    color: "#FF0080",
    type: "line",
})
);


// Add scalebar to the bottom-left corner of the map
L.control.scale({imperial: false}).addTo(map2);


// Add a control layer for basemaps in the top-right to allow user to change the basemap tiles
const baseMaps2 = {
  "Open Street Map": osm2,
  "Esri Grey Canvas": Esri_WorldGrayCanvas2,
  "Esri World Imagery": Esri_WorldImagery2,
};
let layerControl2 = L.control.layers(baseMaps2, null, {collapsed: false}).addTo(map2);

// Add a title to the basemap control
document.querySelectorAll(".leaflet-control-layers-base").forEach((layer,index) => {
  if(document.querySelectorAll(".leaflet-control-layers-list")[index].children[0].innerHTML != "Basemaps") {
  layer.insertAdjacentHTML("beforebegin", "<strong style='font-size: 15px; margin-bottom: 15px;'>Basemaps</strong>")}
});
document.querySelectorAll('.leaflet-control-layers-selector').forEach((node,index) => {
if (index === 0 || index === 3) node.click()
})
// ensure OSM is the default basemap
  


// ------------------------ //
//
// TOGGLE SHAPEFILE LAYERS IN SIDEBAR
//
// ------------------------ //

// Initiate variables to store shapefile data
let countyPoly2, riskAreaPoly2, HRAPoly2, LRAPoly2, EdgePoly2, HTBAPoly2, ITBAPoly2, LTBAPoly2, TBFAPoly2, hotspotPoly2;

// Function to toggle layers on or off
const toggleLayers2 = function(layer){

  // When checkbox is ticked, add layer to map
  if(this.checked === true){
    layer.addTo(map2) 
  };

  // When checkbox is unticked, remove layer from map
  if(this.checked === false) map2.removeLayer(layer);

  // Automatically tick the Risk Areas main checkbox and add legend if a sub-category checkbox is ticked first
  if(HRACheckBox2.checked  ||
     LRACheckBox2.checked  ||
     EdgeCheckBox2.checked ||
     HTBACheckBox2.checked ||
     ITBACheckBox2.checked ||
     LTBACheckBox2.checked ||
     TBFACheckBox2.checked) {
      riskAreaBox2.checked = true;
      riskarealegend2.addTo(map2);
    };
};


// ------------------------ //
//
// RISK AREAS LAYER
//
// ------------------------ //

// ELement ID from DOM
const riskAreaBox2 = document.getElementById("riskAreasBox2");
const HRACheckBox2 = document.getElementById("checkbox__HRA2");
const LRACheckBox2 = document.getElementById("checkbox__LRA2");
const EdgeCheckBox2 = document.getElementById("checkbox__Edge2");
const HTBACheckBox2 = document.getElementById("checkbox__HTBA2");
const ITBACheckBox2 = document.getElementById("checkbox__ITBA2");
const LTBACheckBox2 = document.getElementById("checkbox__LTBA2");
const TBFACheckBox2 = document.getElementById("checkbox__TBFA2");

// Function to set polygon colours for Risk Areas
const riskAreaCols2 = function(area) {
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
const styleRiskAreaPoly2 = function(feature){
    return {
      fillColor: riskAreaCols2(feature.properties.TB_Area),
      weight: 1.5,  
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.50,
  };
};

// Legend for Risk Areas
// https://leafletjs.com/examples/choropleth/
let riskarealegend2 = L.control({position: "bottomright"});
riskarealegend2.onAdd = function (map) {

    let div = L.DomUtil.create("div", "info legend");
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

// Create new shapefile object
riskAreaPoly2 = new L.Shapefile("/static/data/RiskAreas.zip", {style: styleRiskAreaPoly2});
HRAPoly2 = new L.Shapefile("/static/data/RiskAreas_HighRiskArea.zip", {style: styleRiskAreaPoly2});
LRAPoly2 = new L.Shapefile("/static/data/RiskAreas_LowRiskArea.zip", {style: styleRiskAreaPoly2});
EdgePoly2 = new L.Shapefile("/static/data/RiskAreas_EdgeArea.zip", {style: styleRiskAreaPoly2});
HTBAPoly2 = new L.Shapefile("/static/data/RiskAreas_HighTBArea.zip", {style: styleRiskAreaPoly2});
ITBAPoly2 = new L.Shapefile("/static/data/RiskAreas_IntermediateTBArea.zip", {style: styleRiskAreaPoly2});
LTBAPoly2 = new L.Shapefile("/static/data/RiskAreas_LowTBArea.zip", {style: styleRiskAreaPoly2});
TBFAPoly2 = new L.Shapefile("/static/data/RiskAreas_TBFreeArea.zip", {style: styleRiskAreaPoly2});

// Toggle legend and subcategories when Risk Areas layer is (un)ticked
riskAreaBox2.addEventListener("change", function() {

  // When checkbox is ticked
  if(this.checked === true) {

    // Add legend to map
    riskarealegend2.addTo(map2);

    // Tick all risk area sub-category checkboxes
    HRACheckBox2.checked = true;
    HRAPoly2.addTo(map2);
    LRACheckBox2.checked = true;
    LRAPoly2.addTo(map2);
    EdgeCheckBox2.checked = true;
    EdgePoly2.addTo(map2);
    HTBACheckBox2.checked = true;
    HTBAPoly2.addTo(map2);
    ITBACheckBox2.checked = true;
    ITBAPoly2.addTo(map2);
    LTBACheckBox2.checked = true;
    LTBAPoly2.addTo(map2);
    TBFACheckBox2.checked = true;
    TBFAPoly2.addTo(map2);
  }; 

  // When checkbox is unticked
  if(this.checked === false) {

    // Remove legend from map
    riskarealegend2.remove();

    // Untick all risk area sub-category checkboxes
    HRACheckBox2.checked = false;
    map2.removeLayer(HRAPoly2);
    LRACheckBox2.checked = false;
    map2.removeLayer(LRAPoly2);
    EdgeCheckBox2.checked = false;
    map2.removeLayer(EdgePoly2);
    HTBACheckBox2.checked = false;
    map2.removeLayer(HTBAPoly2);
    ITBACheckBox2.checked = false;
    map2.removeLayer(ITBAPoly2);
    LTBACheckBox2.checked = false;
    map2.removeLayer(LTBAPoly2);
    TBFACheckBox2.checked = false;
    map2.removeLayer(TBFAPoly2);
  }; 

  // Ensure county layer is always on top by re-executing bringToFront() method
  countyPoly2.bringToFront();
});

// Toggle risk area polygons
HRACheckBox2.addEventListener("change", toggleLayers2.bind(HRACheckBox2, HRAPoly2));
LRACheckBox2.addEventListener("change", toggleLayers2.bind(LRACheckBox2, LRAPoly2));
EdgeCheckBox2.addEventListener("change", toggleLayers2.bind(EdgeCheckBox2, EdgePoly2));
HTBACheckBox2.addEventListener("change", toggleLayers2.bind(HTBACheckBox2, HTBAPoly2));
ITBACheckBox2.addEventListener("change", toggleLayers2.bind(ITBACheckBox2, ITBAPoly2));
LTBACheckBox2.addEventListener("change", toggleLayers2.bind(LTBACheckBox2, LTBAPoly2));
TBFACheckBox2.addEventListener("change", toggleLayers2.bind(TBFACheckBox2, TBFAPoly2));



// ------------------------ //
//
// COUNTIES LAYER
//
// ------------------------ //

// ELement ID from DOM
const countyBox2 = document.getElementById("countyBox2");

// Function to convert uppercase to lowercase with the first letter capitalised
const formatCounty2 = function(countyNum, county) {
  // E.g. ["WILTSHIRE"] or ["SOUTH YORKSHIRE"]
  const countyArr = county.split(" ");
  // firstLetter: ["W"] or ["S", "Y"]
  const firstLetter = countyArr.map(x => x[0].toUpperCase());
  // remainingLetters: ["iltshire"] or ["outh", "orkshire"]
  const remainingLetters = countyArr.map(x => x.slice(1).toLowerCase());

  // Execute for counties with a single word
  if (firstLetter.length === 1) return `${countyNum} ${firstLetter[0]}${remainingLetters}`;

  // Execute for counties with more than one word
  let fullCountyName = "";
  if (firstLetter.length > 1) {
    for (let i = 0; i < firstLetter.length; i++) {
      fullCountyName += firstLetter[i] + remainingLetters[i] + " ";
    };
  };
  return `${countyNum} ${fullCountyName}`;
};

// Custom popup options
// https://leafletjs.com/reference.html#popup
const countyPopupOptions2 = {
  className: "countyPopupOptions", // must match a css class in _cattleMovement.css
  closeButton: false,
  maxWidth: 100,
  autoPan: false,
};

// Function to highlight polygon borders and show popup on mouseover (when mouse hovers over them)
const highlightCounty2 = function(e) {
  const poly = e.target;

  // Polygon borders
  poly.setStyle({
    weight: 3,
    color: "#252525",
  });

  // Popup on hover
  poly.bindPopup(formatCounty2(poly.feature.properties.C, poly.feature.properties.COUNTY), countyPopupOptions2)
    .openPopup();

  poly.bringToFront();
};

// Function to reset border to original style on mouseout (when mouse is not hovering over a polygon)
const resetHighlight2 = function(e) {
  countyPoly2.resetStyle(e.target);
};

// Function to zoom to a polygon when it is clicked
const zoomToPoly2 = function(e) {
  map2.fitBounds(e.target.getBounds());
};

// Function to add highlighting parameters to a layer
const onEachFeature2 = function(feature, layer) {
  layer.on({
    mouseover: highlightCounty2,
    mouseout: resetHighlight2,
    click: zoomToPoly2,
  });
};

// Function to set custom styles for county polygons
const stylePoly2 = function(color = "blue"){
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
countyPoly2 = new L.Shapefile("/static/data/AHVLACounties_Merged.zip", 
  {style: stylePoly2("grey"), onEachFeature: onEachFeature2});
countyBox2.addEventListener("change", toggleLayers2.bind(countyBox2, countyPoly2));

// ------------------------ //
//
// HOTSPOT LAYER
//
// ------------------------ //

// ELement ID from DOM
const hotspotBox2 = document.getElementById("hotspotBox2");

// Function to set polygon colours for Hotspot
const hotspotCols2 = function(area) {
  switch (area) {
    case "HS 28": return "red";
    case "HS 27": return "blue";
    case "HS 26": return "orange";
    case "HS 23": return "yellow";
    case "HS 21" : return "pink";
    case "HS 29": return "purple";
  };
};

// Function to set custom styles for Hotspot polygons
const stylehotspotPoly2 = function(feature){
    return {
      fillColor: hotspotCols2(feature.properties.Name),
      weight: 1.5,  
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.50,
  };
};


// Toggle hotspot polygons when checkbox is ticked or unticked
hotspotPoly2 = new L.Shapefile("/static/data/TBHotspots22062030.zip", {style: stylehotspotPoly2});
hotspotBox2.addEventListener("change", toggleLayers2.bind(hotspotBox2, hotspotPoly2));

// Legend for Hotspots
// https://leafletjs.com/examples/choropleth/
let hotspotLegend2 = L.control({position: "bottomright"});
hotspotLegend2.onAdd = function (map) {

    let div = L.DomUtil.create("div", "info legend");
    const category = ["HS 28", "HS 27", "HS 26", "HS 23", "HS 21", "HS 29"];
    const colours = ["red","blue","orange","yellow","pink","purple"];

    // Build legend: loop through levels and generate a label with a colored square

    // Add each category to legend
    div.insertAdjacentHTML("afterbegin", "<strong>Hotspots</strong><br>");
    for (let i = 0; i < category.length; i++) 
      div.insertAdjacentHTML("beforeend", `<i style="background: ${colours[i]};"></i> ${category[i]} <br>`);

    return div;
};

// Toggle legend  when Hotspot layer is (un)ticked
hotspotBox2.addEventListener("change", function() {

  // When checkbox is ticked
  if(this.checked === true) {

    // Add legend to map
    hotspotLegend2.addTo(map2);
  }

  // When checkbox is unticked
  if(this.checked === false) {

    // Remove legend from map
    hotspotLegend2.remove();
  }

  // Ensure county layer is always on top by re-executing bringToFront() method
  countyPoly2.bringToFront();
});

// ==================================================================================== //



// ------------------------ //
//
//  BACK BUTTON
//
// ------------------------ //

// Create a back button
let backBtn2 = document.createElement("button");
backBtn2.classList.add("btn");
backBtn2.setAttribute("type", "button");
backBtn2.setAttribute("id", "btn-backToSNPSplashPage");
backBtn2.setAttribute("data-bs-toggle", "tooltip");
backBtn2.setAttribute("data-bs-placement", "btn-backToSplashPage");
backBtn2.setAttribute("title", "Back to SNP Distance Start Page");
backBtn2.innerHTML = `
    <span id="back-to-start-page-text">
        <svg style="margin-bottom: 3px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
        Back
    </span>
`;
backBtn2.classList.add("back-to-start-page-bttn");


// ------------------------ //
//
//  RENDER SNP MAP PAGE
//
// ------------------------ //

// Render SNP map page on click of "View Map" button
function loadSNPmapPage(){
  // Hide splash page and show SNP map content
  document.getElementById("snpdistance-splash-page").classList.add("hidden");
  document.getElementById("snpmatrix-content").classList.add("hidden");
  document.getElementById("snpmap-content").classList.remove("hidden");
  map2.invalidateSize();

  // Render a back button
  document.getElementById("snpmap-sidebar-container").insertAdjacentElement("afterbegin", backBtn2);

  // Ensure hidden class removed from back button
  backBtn2.classList.remove("hidden");
}

//Add event listener on View Map Button - SNP Distance
document.getElementById("btn-view-snpmap").addEventListener("click", () => {
  loadSNPmapPage()
});

// ------------------------ //
//
//  GO BACK TO SPLASH PAGE
//
// ------------------------ //

// Go back to splash page when back button is clicked
backBtn2.addEventListener("click", () => {

  // Hide SNP map content and show splash page
  document.getElementById("snpmap-content").classList.add("hidden");
  document.getElementById("snpdistance-splash-page").classList.remove("hidden");
  

  // Hide back button
  backBtn2.classList.add("hidden");
});



// ------------------------ //
//
//  SNP DISTANCE SLIDER
//
// ------------------------ //

// Select elements from DOM
const snpSlider = document.querySelector("#snpmap-range");

// Update display value when user moves slider
const rangeValue = function(){
  let newValue = snpSlider.value;
  let displayValue = document.querySelector("#snp-distance-value");
  displayValue.innerHTML = newValue;
}
snpSlider.addEventListener("input", rangeValue);



// ------------------------ //
//
// LEGEND FOR MARKERS AND ARROWS
//
// ------------------------ //

// Legend for markers and arrows
let markerLegend2 = L.control({position: "topright"});
markerLegend2.onAdd = function (map) {

    let div = L.DomUtil.create("div", "leaflet-control leaflet-bar");
    div.style.width = "150px";
    div.style.background = "white";

    // Build legend with HTML
    div.insertAdjacentHTML("afterbegin", `
    <div style="padding-top:5px;">
        <span class="fs-6" style="padding-left:6px;"><strong>Legend</strong></span>
        <span style="display: flex; align-items: center;">
          <img src="/static/img/sample-icon.svg" class="legend-marker-img">
          <span class="legend-marker-title">Sample</span>
        </span>
        <span style="display: flex; align-items: center; padding-bottom: 5px;">
        <img src="/static/img/relatedness-icon.svg" class="legend-marker-img">
          <span class="legend-marker-title">SNP Relatedness</span>
        </span>
        <span style="display: flex; align-items: center;">
        <img src="/static/img/movementCluster.svg" class="legend-marker-img">
        <span class="legend-marker-title">Geographic Group</span>
        </span>
      </div>
    `);

    return div;
};



// ------------------------ //
//
// POPUP CONTENT
//
// ------------------------ //

// Object to store sample icons
const sampleIcon = {
  standardIcon2: L.icon({
    iconUrl: "/static/img/sample-icon.svg",
    iconSize: [55, 55],
    iconAnchor:   [25, 45], // horizontal and vertical adjustment so that the icon exactly matches marker coordinate
  })
};

// Custom popup options
// https://leafletjs.com/reference.html#popup
const popupOptions2 = {
  maxWidth: 400, // in pixels
  className: "relatedPopupOptions", // must match a css class in _cattleMovement.css
  autoClose: false,
  closeOnClick: false,
};

// Function to create HTML popup content using template literal
const popupContentSNPMap = function(data, AFnumber) {

  return `
  <div class="fs-5 fw-bold">${data.animal_id}</div><br>
    <div id="popTabContent">     
      <table class="table table-striped">
        <tbody>
          <tr>
            <td><strong>Submission:</strong></td>
            <td>${AFnumber}</td> 
          </tr>
          <tr>
            <td><strong>Date of Birth:</strong></td>
            <td>${data.dob}</td>
          </tr>
          <tr>
            <td><strong>Slaughter Date:</strong></td>
            <td>${data.slaughter_date}</td>
          </tr>
          <tr>
            <td><strong>Miles:</strong></td>
            <td>${parseFloat(data.distance).toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>SNP Distance:</strong></td>
            <td>${data.snp_distance}</td>
          </tr>
          <tr>
            <td><strong>Precise Location:</strong></td>
            <td>${data.cph}</td> 
          </tr>
          <tr>
            <td><strong>OS Map Reference:</strong></td>
            <td>${data.os_map_ref}</td>
          </tr>
          <tr>
            <td><strong>Species:</strong></td>
            <td>${data.species}</td> 
          </tr>
          <tr>
            <td><strong>Animal Type:</strong></td>
            <td>${data.animal_type}</td> 
          </tr>
          <tr>
            <td><strong>Sex:</strong></td>
            <td>${data.sex == `F` ? `Female`: data.sex == `M` ? `Male`: `Unknown`}</td>
          </tr> 
          <tr>
            <td><strong>Disclosing Test Type:</strong></td>
            <td>${data.disclosing_test}</td>
          </tr> 
          <tr>
            <td><strong>Import Country:</strong></td>
            <td>${data.import_country == null ? `British`: `${data.import_country}`}</td>
          </tr> 
        </tbody>
      </table>
    </div>
  </div>        
  `;
};


// ------------------------ //
//
//  RENDER SNP DISTANCE MARKERS
//
// ------------------------ //

// function to display server error text
const snp_distance_serverError = function () {
    // Remove spinner when fetch is complete
    document.getElementById("snpmap-spinner").classList.add("hidden");  

    // Activate generic (unknown) warning message on UI
    document.getElementById("snpmap-warning-text").insertAdjacentHTML("afterbegin", `
      <p class="error-text" style="white-space:pre" id="snpmap-error-message">Server error: please report to developers (please include details on how to reproduce this error)</p>
    `);
}

// function to display client error text
const snp_distance_ClientError = function (err) {
    // log the error
    console.log(err);

    // Remove spinner when fetch is complete
    document.getElementById("snpmap-spinner").classList.add("hidden");  

    // Activate generic (unknown) warning message on UI
    document.getElementById("snpmap-warning-text").insertAdjacentHTML("afterbegin", `
      <p class="error-text" style="white-space:pre" id="snpmap-error-message">Client side error: please report to developers (please include details on how to reproduce this error)</p>
    `);
}

// Initiate variables
let targetMarker, relatedSampleArr, relatedMarker, markerLayer, snpMarkersClusterLayer, snpTable, snpTableData, rowSubmissionSelect, rowSubmissionDeselect;

// Function whose input is the json file returned by Flask and whose output is rendering markers on the map
const renderRelatedMarkers = function (json, target) {
  
  // Extract data for target sample
  let targetSample = json[target];

  // Create a layer group for target sample marker
  markerLayer = L.layerGroup().addTo(map2);
  // Create a layer group for related samples markers
  snpMarkersClusterLayer = L.markerClusterGroup({
    iconCreateFunction: function(cluster){
      return L.divIcon({
        html: `<div class='snp-cluster-icon'>${cluster.getChildCount()}</div>`,
        className: 'snp-cluster-icon',
        iconSize:[30,30]
      })
    }
  }).addTo(map2)

  // Add target sample to map
  targetMarker = L.marker([targetSample.lat, targetSample.lon], {icon: sampleIcon.standardIcon2});
  markerLayer.addLayer(targetMarker);

  // Add popup to target sample
  targetMarker.bindPopup(popupContentSNPMap(targetSample, target), popupOptions2);

  // Extract data for related sample(s)
  let relatedSample = {...json}; // deep copy json object
  delete relatedSample[target];
  relatedSampleArr = Object.values(relatedSample);

  // add submission number to relatedSampleArr
  for (let i = 0; i < relatedSampleArr.length; i++) {
    relatedSampleArr[i].submission = Object.keys(relatedSample)[i]
  }

  // find the indexes where cph is null
  var idxs = [];
  for (let i = relatedSampleArr.length - 1; i >= 0; i--) {
      if (relatedSampleArr[i].cph === null) {
          idxs.unshift(i);
      }
  }
  // delete the Submissions where the CPH is null
  for (let i = idxs.length -1; i >= 0; i--)
    relatedSampleArr.splice(idxs[i],1);

  // Add related sample(s) to map
  relatedSampleArr.forEach(function (item) {
    relatedMarker = L.marker([item.lat, item.lon], {
      icon: new L.AwesomeNumberMarkers({
        className: `awesome-number-marker marker-${item.submission}`,
        iconSize: [35, 45],
        iconAnchor:   [17, 42],
        popupAnchor: [1, -32],
        number: item.snp_distance,
        markerColor: "gray",
        numberColor: "white"
      })
    });
    snpMarkersClusterLayer.addLayer(relatedMarker);
    // Add popup to related samples
    relatedMarker.bindPopup(popupContentSNPMap(item, item.submission), popupOptions2);
  });

  // Create a new array in the format [ [lat1, lon1], [lat2, lon2], [..., ...] ]
  let allSamplesArr = Object.values({...json})
  const allLat = allSamplesArr.map( arr => arr.lat ); 
  const allLon = allSamplesArr.map( arr => arr.lon ); 
  const allPts = allLat.map( (lat, index) => { return [lat, allLon[index]] });

  // Automatically zoom in on the markers and allow some padding (buffer) to ensure all points are in view
  map2.fitBounds(L.latLngBounds(allPts).pad(0.10));

  // Add marker legend to map
  markerLegend2.addTo(map2);
};


// Async function that renders target samples and its related samples on map
const showRelatedSamples = async function () {

  try {

    // First clear any previous markers on map and warning text
    if(typeof markerLayer !== "undefined") map2.removeLayer(markerLayer);
    if(typeof snpMarkersClusterLayer !== "undefined") map2.removeLayer(snpMarkersClusterLayer);
    document.getElementById("snpmap-warning-text").textContent = "";
    if(document.getElementById("snpmap-error-message") !== null && document.getElementById("snpmap-error-message") !== "undefined") {
      document.getElementById("snpmap-error-message").remove();
    };

    // If table-sidebar-title is not empty then set text and table content to empty
    if(document.getElementById("table-sidebar-title") !== "") {
      document.getElementById("table-sidebar-title").textContent = "";
      document.getElementById("table-content-container").textContent = "";
      document.getElementById("table-content-container").style.border = "none";
    };

    // Select elements from DOM
    const sampleID = validateIdentifierInput(document.getElementById("input__sampleID_temp--1").value);
    const snpDistance = document.getElementById("snp-distance-value").textContent;

    // Render spinner
    document.getElementById("snpmap-spinner").classList.remove("hidden");

    // Fetch json data from backend
    const response = await fetch(`/sample/related?sample_name=${sampleID}&snp_distance=${snpDistance}`);

    if(!response.ok) {

      snp_distance_serverError()

    } else {
    
      let json = await response.json();
      
      console.log(json)
      // Remove spinner when fetch is complete
      document.getElementById("snpmap-spinner").classList.add("hidden");

      // If response contains a warning
      if (json["warnings"]) {
        document.getElementById("snpmap-warning-text").insertAdjacentHTML("beforebegin", `
          <p class="warning-text" style="white-space:pre" id="snpmap-error-message">${json["warning"]}</p>
        `);
      } else {
        // TODO: better solution to this - massive hack in Tom's absence 
        let soi = json.SOI;
        delete json.SOI;

        // Remove time from date property and round miles to two decimal places
        Object.values(json).forEach((item) => {
          item.distance = parseFloat(item.distance).toFixed(2);
        });

        // Render related markers
        renderRelatedMarkers(json, soi);

        // Render html table title in right sidebar
        document.getElementById("table-sidebar-title").insertAdjacentHTML("afterbegin", `
          <h4>${soi}</h4>
          <p>
            <span>Identifier: ${json[soi].animal_id}<br/></span>
            <span>Precise Location: ${json[soi].cph}<br/></span>
            <span>OS Map Reference: ${json[soi].os_map_ref}<br/></span>
            <span>Clade: ${json[soi].clade}<br/></span>
          </p>
          <button id="btn-download-snptable" class="govuk-button btn-snptable" onclick="downloadSNPTable()">Download CSV</button>
        `);

        // Tabulator requires array of json objects
        let tabledata = Object.values(json)
        // Add submission number to tabledata
        for (let i = 0; i < tabledata.length; i++) {
          tabledata[i].submission = Object.keys(json)[i]
        }

        // Render table in right sidebar
        snpTable = new Tabulator("#table-content-container", {
          data: tabledata,
          columnDefaults:{
              resizable:false,
            },
          movableColumns: true,
          selectable:true,
          selectableRangeMode:"click",
          selectableCheck:function(row){
            return row.getData().submission != soi && row.getData().cph != null; //disallow selection of soi row
          },
          columns: [
              {title:"Precise Location", field:"cph", headerFilter:"input", sorter: "string"},
              {title:"Identifier", field:"animal_id", headerFilter:"input", sorter: "string"},
              {title:"Submission", field:"submission", headerFilter:"input", sorter: "string",
                formatter: function(cell) {
                  var cellValue = cell.getValue();
                  if (cellValue == soi){
                    cell.getRow().getElement().style.backgroundColor = "#ffbe33"
                  }
                  return cellValue;
                }},
              {title:"SNP distance", field:"snp_distance", headerFilter:"input", hozAlign:"right", sorter:"number"},
              {title:"Miles", field:"distance", headerFilter:"input", hozAlign:"right", sorter:"number"},
              {title:"Slaughter Date", field:"slaughter_date", headerFilter:"input", sorter: "date"},  
          ],
          initialSort:[
            {column:"distance", dir:"asc"},
            {column:"snp_distance", dir:"asc"},
          ],
        });

        // When a row is selected, change the colour of the map marker
        snpTable.on("rowSelected", function(row){
          if (row.getData().cph != null){
            // Get the row submission
            rowSubmissionSelect = row.getData().submission;
            document.querySelector(`.marker-${rowSubmissionSelect}`).firstChild.style.color = "#ffbe33";
          }
        });

        // Reset marker colour to default when row is deselected
        snpTable.on("rowDeselected", function(row){
          if (row.getData().cph != null){
            // Get the row submission
            rowSubmissionDeselect = row.getData().submission;
            document.querySelector(`.marker-${rowSubmissionDeselect}`).firstChild.style.color = "white";
          }
        });
      }
    }
  } catch(err) {
    snp_distance_ClientError(err);
  };
  
};

// Execute the async showRelatedSamples() function when the main "Plot Related Isolates" button is clicked
document.getElementById("btn__plot-related-isolates").addEventListener("click", showRelatedSamples);



// ------------------------ //
//
//  TABLE SIDEBAR
//
// ------------------------ //

// Add a table button to the top-right corner of the map
// Collapse the sidebar when this button is clicked
// [Detail: this code creates and adds a custom control using the leaflet library]
// [Detail: this code adds a collapse data-bs-toggle collapse property using the bootstrap library]
const btnShowTable = L.Control.extend({
  options: {
    position: "topright",
  },
  onAdd: function(map) {
    const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar");
    divContainer.setAttribute("id", "btn__show-table");

    divContainer.insertAdjacentHTML("afterbegin", `
      <a class="snp-table-toggle btn-show-table" data-bs-toggle="collapse" id="show-table" href="#table-sidebar-container">Show Table</a>
    `);
    return divContainer;
  }
});
map2.addControl(new btnShowTable());

// Add a table button to the top-right corner of the map (hidden by default)
// Expand the sidebar when this button is clicked
const btnHideTable = L.Control.extend({
  options: {
    position: "topright",
  },
  onAdd: function(map) {
    const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar hidden");
    divContainer.setAttribute("id", "btn__hide-table");

    divContainer.insertAdjacentHTML("afterbegin", `
      <a class="snp-table-toggle" data-bs-toggle="collapse" href="#table-sidebar-container" id="hide-table">Hide Table</a>
    `);
    return divContainer;
  }
});
map2.addControl(new btnHideTable());

// Refresh map size after sidebar has completed collapse 
document.getElementById("table-sidebar-container").addEventListener("hidden.bs.collapse", () => {
  map2.invalidateSize();
});

// Refresh map size after sidebar has expanded 
document.getElementById("table-sidebar-container").addEventListener("shown.bs.collapse", () => {
  map2.invalidateSize();
});

// Change icon to right-arrow after sidebar has collapsed
document.getElementById("show-table").addEventListener("click", () => {
  document.getElementById("btn__hide-table").classList.remove("hidden");
  document.getElementById("btn__show-table").classList.add("hidden");
});

// Change icon to left-arrow after sidebar has expanded
document.getElementById("hide-table").addEventListener("click", () => {
  document.getElementById("btn__show-table").classList.remove("hidden");
  document.getElementById("btn__hide-table").classList.add("hidden");
});



// ------------------------ //
//
// TABLE BUTTONS
//
// ------------------------ //

// Function to trigger download of snpTable CSV file
const downloadSNPTable = function() {
  snpTable.download("csv", "snptable.csv");
};

// Function to select all rows
const selectAllRows = function() {
  snpTable.selectRow();
};

// Function to deselect all rows
const deselectAllRows = function() {
  snpTable.deselectRow();
  const markerEl = document.querySelectorAll(".awesome-number-marker");
  markerEl.forEach(function(el) {
    el.firstChild.style.color = "white";
  });
};


