// =========================================== //
// Cattle Movement Leaflet Map
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
// TOGGLE FULL SCREEN AND HIDING SIDEBAR
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
      <a title="Hide sidebar" data-bs-toggle="collapse" href="#content2-column1-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
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
      <a title="Show sidebar" data-bs-toggle="collapse" href="#content2-column1-container">
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

// Refresh map size after sidebar has completed collapse 
document.getElementById("content2-column1-container").addEventListener("hidden.bs.collapse", () => {
  map.invalidateSize();
});

// Refresh map size after sidebar has expanded 
document.getElementById("content2-column1-container").addEventListener("shown.bs.collapse", () => {
  map.invalidateSize();
});

// Change icon to right-arrow after sidebar has collapsed
document.getElementById("btn__map-fullscreen").addEventListener("click", () => {
  document.getElementById("btn__map-exitfullscreen").classList.remove("hidden");
  document.getElementById("btn__map-fullscreen").classList.add("hidden");
});

// Change icon to left-arrow after sidebar has expanded
document.getElementById("btn__map-exitfullscreen").addEventListener("click", () => {
  document.getElementById("btn__map-fullscreen").classList.remove("hidden");
  document.getElementById("btn__map-exitfullscreen").classList.add("hidden");
});



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


// Add scalebar to the bottom-left corner of the map
L.control.scale({imperial: false}).addTo(map);


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



// ------------------------ //
//
// COW HEAD POPUP CONTENT
//
// ------------------------ //

// Object to store cow icons
const cowIcons = {
  cowStandard: L.icon({
    iconUrl: "/static/img/CH_1_no_outline.svg",
    iconSize: [75, 75],
    iconAnchor: [35, 55], // horizontal and vertical adjustment so that the cow head exactly matches marker coordinate
  }),
  cowShowground: L.icon({
    iconUrl: "/static/img/CH_Showground_no_outline.svg",
    iconSize: [110, 110],
    iconAnchor: [40, 81],
  }),
  cowMarket: L.icon({
    iconUrl: "/static/img/CH_Market_no_outline.svg",
    iconSize: [110, 110],
    iconAnchor: [40, 81],
  }),
  cowSlaughter: L.icon({
    iconUrl: "/static/img/CH_Slaughterhouse_no_outline.svg",
    iconSize: [110, 110],
    iconAnchor: [40, 81],
  }),
}; 

// Custom popup options
// https://leafletjs.com/reference.html#popup
const cowheadPopupOptions = {
  maxWidth: 400, // in pixels
  className: "cowheadPopupOptions", // must match a css class in _cattleMovement.css
  autoClose: false,
  closeOnClick: false,
};

// Function to create HTML popup content using template literal
const popupContent = function(data, movArr, index) {

  return `
  <div class="fs-5 fw-bold">${data.identifier}</div><br>
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
              <td>${`${index+1} of ${movArr.length}`}</td>
            </tr>
            <tr>
              <td><strong>Duration of Stay:</strong></td>
              <td>${movArr[index].stay_length <= 30 ? `${movArr[index].stay_length} days` :
                    movArr[index].stay_length > 30 && movArr[index].stay_length <= 365 ? `${(movArr[index].stay_length / 7).toFixed(0)} weeks` :
                    `${(movArr[index].stay_length / 365).toFixed(1)} years`}
              </td> 
            </tr>
            <tr>
              <td><strong>Date of Arrival:</strong></td>
              <td>${movArr[index].on_date}</td> 
            </tr>
            <tr>
              <td><strong>Date of Departure:</strong></td>
              <td>${movArr[index].off_date}</td> 
            </tr>
            <tr>
              <td><strong>AF Number:</strong></td>
              <td>${data.submission}</td> 
            </tr>
            <tr>
              <td><strong>Species:</strong></td>
              <td>${data.species === "COW" ? "Bovine" : data.species}</td>
            </tr>
            <tr>
              <td><strong>Grid Reference:</strong></td>
              <td>TBC</td>
            </tr>
            <tr>
              <td><strong>CPH:</strong></td>
              <td>${movArr[index].cph}</td>
            </tr>
            <tr>
              <td><strong>CPH Type:</strong></td>
              <td>${movArr[index].type}</td>
            </tr>
            <tr>
              <td><strong>County:</strong></td>
              <td>${movArr[index].county}</td>
            </tr>
            <tr>
              <td><strong>Clade:</strong></td>
              <td>${data.clade}</td>
            </tr>
            <tr>
              <td><strong>Out of Home Range:</strong></td>
              <td>${data.out_of_homerange === "N" ? "No" : "Yes"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tab-pane fade show" id="navInfoContent" role="tabpanel" aria-labelledby="navInfo" tabindex="0">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td><strong>Birth CPH:</strong></td>
              <td>${movArr[0].cph}</td>
            </tr>
            <tr>
              <td><strong>Date of Birth:</strong></td>
              <td>TBC</td>
            </tr>
            <tr>
              <td><strong>Slaughter Date:</strong></td>
              <td>${data.slaughter_date.replace(" 00:00:00.000", "")}</td>
            </tr>
            <tr>
              <td><strong>Age:</strong></td>
              <td>TBC</td>
            </tr>
            <tr>
              <td><strong>Sex:</strong></td>
              <td>TBC</td>
            </tr> 
          </tbody>
        </table>
      </div>
    </div>           
  `;
};


// ------------------------ //
//
// LEGEND FOR MARKERS AND ARROWS
//
// ------------------------ //

// Legend for markers and arrows
let markerLegend = L.control({position: "topright"});
markerLegend.onAdd = function (map) {

    let div = L.DomUtil.create("div", "leaflet-control leaflet-bar");
    div.style.width = "150px";
    div.style.background = "white";

    // Build legend with HTML
    div.insertAdjacentHTML("afterbegin", `
    <div class="legend-marker-container" style="padding-top:5px;">
        <span class="fs-6" style="padding-left:6px;"><strong>Legend</strong></span>
        <span style="display: flex; align-items: center;">
          <img src="/static/img/CH_1_no_outline.svg" class="legend-marker-img">
          <span class="legend-marker-title">Holding</span>
        </span>
        <span style="display: flex; align-items: center;">
          <img src="/static/img/CH_Market_no_outline.svg" class="legend-marker-img">
          <span class="legend-marker-title">Market</span>
        </span>
        <span style="display: flex; align-items: center;">
          <img src="/static/img/CH_Showground_no_outline.svg" class="legend-marker-img">
          <span class="legend-marker-title">Showground</span>
        </span>
        <span style="display: flex; align-items: center;">
          <img src="/static/img/CH_Slaughterhouse_no_outline.svg" class="legend-marker-img">
          <span class="legend-marker-title">Slaughterhouse</span>
        </span>
        <span style="display: flex; align-items: center;">
          <svg style="margin-left: 5px;" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0096FF" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
          <span class="legend-marker-title" style="padding-left:10px;">Cattle movement lines</span>
        </span>
      </div>
    `);

    return div;
};



// ------------------------ //
//
// UTILITY FUNCTIONS FOR PLOTTING MOVEMENTS
//
// ------------------------ //

// Function to clear any previous cattle movements currently rendered on map
const clearPreviousMovements = function (second = false) {
  // Execute this code to clear main cattle movement
  if(second === false) {
    if(typeof cowMarker !== "undefined") map.removeLayer(cowLayer);
    if(typeof cattleMovLine !== "undefined") cattleMovLine.remove();
    if(typeof markerLegend !== "undefined") markerLegend.remove();
  };
  // Execute this code to clear second cattle movement
  if(second === true) {
    if(typeof cowMarker2 !== "undefined") map.removeLayer(cowLayer2);
    if(typeof cattleMovLine2 !== "undefined") cattleMovLine2.remove();
  };
};


// Function to render the correct cow icon
let iconToReturn;
const renderCowIcon = function (movementArr, cowIconObj) {

  // Extract location type from movement array
  let moveType = movementArr.type;
  // console.log(moveType);

  // Return the correct cow icon given the location type
  iconToReturn = moveType === "Agricultural Holding"      ? cowIconObj.cowStandard   :
                 moveType === "Market"                    ? cowIconObj.cowMarket     :
                 moveType === "Slaughterhouse (Red Meat)" ? cowIconObj.cowSlaughter  :
                 moveType === "Showground"                ? cowIconObj.cowShowground : cowIconObj.cowStandard;           
  return iconToReturn;
};


// Function whose input is the json file returned by Flask and whose output is rendering the cow markers and lines on the map
const renderCowMarkers = function (json, cowIcon, lineColour, second = false) {

  // Extract movement data from json object into an array
  const moveArr = Object.values(json.move);
  console.log(moveArr);

  // Array for latitude and longitude
  const moveLat = moveArr.map(arr => arr.lat);
  const moveLon = moveArr.map(arr => arr.lon);

  // Create a layer group that will contain all the cow markers
  second === false ? cowLayer = L.layerGroup().addTo(map) : cowLayer2 = L.layerGroup().addTo(map);

  // Add cow head markers to map
  for (let i = 0; i < moveLat.length; i++) {
    // Render markers and the correct cow icons
    second === false ? cowMarker = L.marker([moveLat[i], moveLon[i]], {icon: renderCowIcon(moveArr[i], cowIcon)}) : cowMarker2 = L.marker([moveLat[i], moveLon[i]], {icon: renderCowIcon(moveArr[i], cowIcon)});
    second === false ? cowLayer.addLayer(cowMarker) : cowLayer2.addLayer(cowMarker2);

    // Add popup content to each cow head marker
    second === false ? cowMarker.bindPopup(popupContent(json, moveArr, i), cowheadPopupOptions) : cowMarker2.bindPopup(popupContent(json, moveArr, i), cowheadPopupOptions);
  };

  // Create a new array in the format [ [lat1, lon1], [lat2, lon2], [..., ...] ]
  if(second === false) {
    linePts = moveLat.map( (lat, index) => { return [lat, moveLon[index]] });
  };
  if(second === true) {
    linePts2 = moveLat.map( (lat, index) => { return [lat, moveLon[index]] });
  };

  // Automatically zoom in on the markers and allow some padding (buffer) to ensure all points are in view
  second === false ? map.fitBounds(L.latLngBounds(linePts).pad(0.10)) : map.fitBounds(L.latLngBounds(linePts.concat(linePts2)).pad(0.10));

  // Connect the points with a line
  second === false ? cattleMovLine = L.polyline(linePts, {color: lineColour}).addTo(map) : cattleMovLine2 = L.polyline(linePts2, {color: lineColour}).addTo(map);

  // Add directional arrows to the line
  // Leaflet plugin: https://github.com/slutske22/leaflet-arrowheads
  if(second === false) {
    cattleMovLine.arrowheads({
      yawn: 40,
      size: "5%",
      fill: true,
      fillColor: lineColour,
      // color: "black",
      frequency: "20000m", // options: 10, "500m", "50px", "allvertices", "endonly"
    }).addTo(map);
  };
  if(second === true) {
    cattleMovLine2.arrowheads({
      yawn: 40,
      size: "2%",
      fill: true,
      fillColor: lineColour,
      // color: "black",
      frequency: "20000m", // options: 10, "500m", "50px", "allvertices", "endonly"
    }).addTo(map);
  };

  // Add marker legend to map
  markerLegend.addTo(map);
};



// ------------------------ //
//
// PLOT MAIN CATTLE MOVEMENT
//
// ------------------------ //

// Initiate variables
let cowMarker, cowLayer, linePts, cattleMovLine;

// Async function that renders main cattle movement
const showMovements = async function () {

  try {

    // Render spinner
    document.getElementById("cattle-spinner").classList.remove("hidden");

    // First clear any previous cattle movements on map and warning text
    clearPreviousMovements();
    document.getElementById("cattle-warning-text").textContent = "";
    if(document.getElementById("cattle-error-message") !== null && document.getElementById("cattle-error-message") !== "undefined") {
      document.getElementById("cattle-error-message").remove();
    };

    // Extract the element ID number from the event listener
    // E.g. input__sampleID--1 or input__sampleID--2
    const elementID = this.id.at(-1);

    // Automatically ensure the toggle movement lines checkbox for the cattle movement is ticked
    // This is important for when users plot cattle movement on the map for subsequent samples
    document.getElementById(`cattleMovementLines--${elementID}`).checked = true;

    // Fetch json data from backend
    const response = await fetch(`/sample?sample_name=${document.getElementById(`input__sampleID--${elementID}`).value}`);
    // console.log(response);
    if(!response.ok) throw new Error("Problem getting SNP data from backend");
    const json = await response.json();
    console.log(json);

    // Remove spinner when fetch is complete
    document.getElementById("cattle-spinner").classList.add("hidden");


    // If first object in JSON is not an error, proceed with main function
    if(Object.keys(json)[0] !== "error") {

      // Render cow markers and lines
      renderCowMarkers(json, cowIcons, "#0096FF");

      // Allow user access to other elements by removing the disabled class
      document.getElementById("cattleMovementLines--1").disabled = false;
      document.getElementById("input__sampleID--2").disabled = false;
      document.getElementById("btn__cattleMovement--2").disabled = false;
      // document.getElementById("slider__snp-threshold").disabled = false;
      // document.getElementById("btn__related-isolates").disabled = false;
    }

    // If first object in JSON is an error, print the error message
    if(Object.keys(json)[0] === "error") {
      document.getElementById("cattle-warning-text").insertAdjacentHTML("beforebegin", `
        <p class="warning-text" id="cattle-error-message">${Object.values(json)[0]}</p>
      `);
    }

  } catch(err) {
    console.error(err)

    // Remove spinner when fetch is complete
    document.getElementById("cattle-spinner").classList.add("hidden");  

    // Activate generic (unknown) warning message on UI
    document.getElementById("cattle-warning-text").insertAdjacentHTML("afterbegin", `
      <p class="error-text" id="cattle-error-message">Server error: please report to developers (please include details on how to reproduce this error)</p>
    `);
  }
};

// Executes the async showMovements() function when the main "Show Cattle Movement" button is clicked
document.getElementById("btn__cattleMovement--1").addEventListener("click", showMovements);



// ------------------------ //
//
// PLOT SECOND CATTLE MOVEMENT
//
// ------------------------ //

// Initiate variables
let cowMarker2, cowLayer2, linePts2, cattleMovLine2;

// Async function that renders main cattle movement
const showMovements2 = async function () {

  try {

    // Render spinner
    document.getElementById("cattle-spinner2").classList.remove("hidden");

    // First clear any previous cattle movements on map
    clearPreviousMovements(true);
    document.getElementById("cattle-warning-text2").classList.add("hidden");
    if(document.getElementById("cattle-error-message2") !== null && document.getElementById("cattle-error-message2") !== "undefined") {
      document.getElementById("cattle-error-message2").remove();
    };

    // Extract the element ID number from the event listener
    // E.g. input__sampleID--1 or input__sampleID--2
    const elementID = this.id.at(-1);

    // Automatically ensure the toggle movement lines checkbox for the cattle movement is ticked
    // This is important for when users plot cattle movement on the map for subsequent samples
    document.getElementById(`cattleMovementLines--${elementID}`).checked = true;

    // Fetch json data from backend
    const response = await fetch(`/sample?sample_name=${document.getElementById(`input__sampleID--${elementID}`).value}`);
    if(!response.ok) throw new Error("Problem getting SNP data from backend");
    const json = await response.json();
    // console.log(json);

    // Remove spinner when fetch is complete
    document.getElementById("cattle-spinner2").classList.add("hidden");

    // If first object in JSON is not an error, proceed with main function
    if(Object.keys(json)[0] !== "error") {

      // Render cow markers and lines
      renderCowMarkers(json, cowIcons, "#cb181d", true);

      // Allow user access to other elements by removing the disabled class
      document.getElementById("cattleMovementLines--2").disabled = false;
    };

    // If first object in JSON is an error, print the error message
    if(Object.keys(json)[0] === "error") {
      document.getElementById("cattle-warning-text2").insertAdjacentHTML("beforebegin", `
        <p class="warning-text" id="cattle-error-message2">${Object.values(json)[0]}</p>
      `);
    }

  } catch(err) {
    console.error(err)

    // Remove spinner when fetch is complete
    document.getElementById("cattle-spinner2").classList.add("hidden");  

    // Activate generic (unknown) warning message on UI
    document.getElementById("cattle-warning-text2").insertAdjacentHTML("afterbegin", `
      <p class="error-text" id="cattle-error-message2">Server error: please report to developers (please include details on how to reproduce this error)</p>
    `);
    
  } 
};

// Executes the async showMovements2() function when the second "Show Second Movement" button is clicked
document.getElementById("btn__cattleMovement--2").addEventListener("click", showMovements2);



// ------------------------ //
//
// TOGGLE MOVEMENT LINES
//
// ------------------------ //

// Function to toggle lines and arrows from map 
const toggleMovementLines = function() {
  if(this.checked === true) cattleMovLine.addTo(map);
  if(this.checked === false) cattleMovLine.remove();
};

// Execute toggleMovementLines when "Movement Lines" checkbox is ticked or unticked
document.getElementById("cattleMovementLines--1").addEventListener("change", toggleMovementLines);

// Function to toggle lines and arrows from map 
const toggleMovementLines2 = function() {
  if(this.checked === true) {
    map.addLayer(cowLayer2);
    cattleMovLine2.addTo(map);
  };
  if(this.checked === false) {
    map.removeLayer(cowLayer2);
    cattleMovLine2.remove();
  };
};

// Execute toggleMovementLines when "Toggle Movement" checkbox is ticked or unticked
document.getElementById("cattleMovementLines--2").addEventListener("change", toggleMovementLines2);



// ------------------------ //
//
// TOGGLE SHAPEFILE LAYERS IN SIDEBAR
//
// ------------------------ //

// Initiate variables to store shapefile data
let countyPoly, riskAreaPoly, HRAPoly, LRAPoly, EdgePoly, HTBAPoly, ITBAPoly, LTBAPoly, TBFAPoly;

// Function to toggle layers on or off
const toggleLayers = function(layer){

  // When checkbox is ticked, add layer to map
  if(this.checked === true){
    layer.addTo(map) 
  };

  // When checkbox is unticked, remove layer from map
  if(this.checked === false) map.removeLayer(layer);

  // Automatically tick the Risk Areas main checkbox and add legend if a sub-category checkbox is ticked first
  if(HRACheckBox.checked  ||
     LRACheckBox.checked  ||
     EdgeCheckBox.checked ||
     HTBACheckBox.checked ||
     ITBACheckBox.checked ||
     LTBACheckBox.checked ||
     TBFACheckBox.checked) {
      riskAreaBox.checked = true;
      riskareaLegend.addTo(map);
    };
};

// Leaflet plugin URL for adding shapefiles
// https://github.com/calvinmetcalf/leaflet.shapefile



// ------------------------ //
//
// RISK AREAS LAYER
//
// ------------------------ //

// TODO
// SEPARATE SHAPEFILE INTO SUB-CATEGORIES

// ELement ID from DOM
const riskAreaBox = document.getElementById("riskAreasBox");
const HRACheckBox = document.getElementById("checkbox__HRA");
const LRACheckBox = document.getElementById("checkbox__LRA");
const EdgeCheckBox = document.getElementById("checkbox__Edge");
const HTBACheckBox = document.getElementById("checkbox__HTBA");
const ITBACheckBox = document.getElementById("checkbox__ITBA");
const LTBACheckBox = document.getElementById("checkbox__LTBA");
const TBFACheckBox = document.getElementById("checkbox__TBFA");

// Function to set polygon colours for Risk Areas
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

// Legend for Risk Areas
// https://leafletjs.com/examples/choropleth/
let riskareaLegend = L.control({position: "bottomright"});
riskareaLegend.onAdd = function (map) {

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
riskAreaPoly = new L.Shapefile("/static/data/RiskAreas.zip", {style: styleRiskAreaPoly});
HRAPoly = new L.Shapefile("/static/data/RiskAreas_HighRiskArea.zip", {style: styleRiskAreaPoly});
LRAPoly = new L.Shapefile("/static/data/RiskAreas_LowRiskArea.zip", {style: styleRiskAreaPoly});
EdgePoly = new L.Shapefile("/static/data/RiskAreas_EdgeArea.zip", {style: styleRiskAreaPoly});
HTBAPoly = new L.Shapefile("/static/data/RiskAreas_HighTBArea.zip", {style: styleRiskAreaPoly});
ITBAPoly = new L.Shapefile("/static/data/RiskAreas_IntermediateTBArea.zip", {style: styleRiskAreaPoly});
LTBAPoly = new L.Shapefile("/static/data/RiskAreas_LowTBArea.zip", {style: styleRiskAreaPoly});
TBFAPoly = new L.Shapefile("/static/data/RiskAreas_TBFreeArea.zip", {style: styleRiskAreaPoly});

// Toggle legend and subcategories when Risk Areas layer is (un)ticked
riskAreaBox.addEventListener("change", function() {

  // When checkbox is ticked
  if(this.checked === true) {

    // Add legend to map
    riskareaLegend.addTo(map);

    // Tick all risk area sub-category checkboxes
    HRACheckBox.checked = true;
    HRAPoly.addTo(map);
    LRACheckBox.checked = true;
    LRAPoly.addTo(map);
    EdgeCheckBox.checked = true;
    EdgePoly.addTo(map);
    HTBACheckBox.checked = true;
    HTBAPoly.addTo(map);
    ITBACheckBox.checked = true;
    ITBAPoly.addTo(map);
    LTBACheckBox.checked = true;
    LTBAPoly.addTo(map);
    TBFACheckBox.checked = true;
    TBFAPoly.addTo(map);
  }; 

  // When checkbox is unticked
  if(this.checked === false) {

    // Remove legend from map
    riskareaLegend.remove();

    // Untick all risk area sub-category checkboxes
    HRACheckBox.checked = false;
    map.removeLayer(HRAPoly);
    LRACheckBox.checked = false;
    map.removeLayer(LRAPoly);
    EdgeCheckBox.checked = false;
    map.removeLayer(EdgePoly);
    HTBACheckBox.checked = false;
    map.removeLayer(HTBAPoly);
    ITBACheckBox.checked = false;
    map.removeLayer(ITBAPoly);
    LTBACheckBox.checked = false;
    map.removeLayer(LTBAPoly);
    TBFACheckBox.checked = false;
    map.removeLayer(TBFAPoly);
  }; 
});

// Toggle risk area polygons
HRACheckBox.addEventListener("change", toggleLayers.bind(HRACheckBox, HRAPoly));
LRACheckBox.addEventListener("change", toggleLayers.bind(LRACheckBox, LRAPoly));
EdgeCheckBox.addEventListener("change", toggleLayers.bind(EdgeCheckBox, EdgePoly));
HTBACheckBox.addEventListener("change", toggleLayers.bind(HTBACheckBox, HTBAPoly));
ITBACheckBox.addEventListener("change", toggleLayers.bind(ITBACheckBox, ITBAPoly));
LTBACheckBox.addEventListener("change", toggleLayers.bind(LTBACheckBox, LTBAPoly));
TBFACheckBox.addEventListener("change", toggleLayers.bind(TBFACheckBox, TBFAPoly));



// ------------------------ //
//
// COUNTIES LAYER
//
// ------------------------ //

// ELement ID from DOM
const countyBox = document.getElementById("countyBox");

// Function to convert uppercase to lowercase with the first letter capitalised
const formatCounty = function(countyNum, county) {
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
const countyPopupOptions = {
  className: "countyPopupOptions", // must match a css class in _cattleMovement.css
  closeButton: false,
  maxWidth: 100,
  autoPan: false,
};

// Function to highlight polygon borders and show popup on mouseover (when mouse hovers over them)
const highlightCounty = function(e) {
  const poly = e.target;

  // Polygon borders
  poly.setStyle({
    weight: 3,
    color: "#252525",
  });

  // Popup on hover
  poly.bindPopup(formatCounty(poly.feature.properties.C, poly.feature.properties.COUNTY), countyPopupOptions)
    .openPopup();

  poly.bringToFront();
};

// Function to reset border to original style on mouseout (when mouse is not hovering over a polygon)
const resetHighlight = function(e) {
  countyPoly.resetStyle(e.target);
};

// Function to zoom to a polygon when it is clicked
const zoomToPoly = function(e) {
  map.fitBounds(e.target.getBounds());
};

// Function to add highlighting parameters to a layer
const onEachFeature = function(feature, layer) {
  layer.on({
    mouseover: highlightCounty,
    mouseout: resetHighlight,
    click: zoomToPoly,
  });
};

// Function to set custom styles for county polygons
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
countyPoly = new L.Shapefile("/static/data/AHVLACounties_Merged.zip", {style: stylePoly("royalblue"), onEachFeature: onEachFeature});
countyBox.addEventListener("change", toggleLayers.bind(countyBox, countyPoly));



// ------------------------ //
//
// HOME RANGES LAYER
//
// ------------------------ //

// ELement ID from DOM
// const homeRangeBox = document.getElementById("homeRangesBox");

// Toggle home range polygons when checkbox is ticked or unticked
// homeRangePoly = new L.Shapefile("/static/data/HomeRanges.zip", stylePoly("purple"));
// homeRangeBox.addEventListener("change", toggleLayers.bind(homeRangeBox, homeRangePoly));


