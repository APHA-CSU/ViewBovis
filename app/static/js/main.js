// =========================================== //
// Main JavaScript Code for View Bovis App
//
// Code: JavaScript
// Author: Tom Jenkins (Tom.Jenkins@apha.gov.uk)
// =========================================== //

"use strict";
var cattleMovementHtml, nextstrainHtml, SNPmatrixHtml, IsSharedScriptAppended, SNPscript
// Select DOM elements
var navBar = document.querySelector(".navbar-nav");
var navLinks = document.querySelectorAll(".nav-link");
var navContent = document.querySelectorAll(".content");

// ------------------------ //
//
//  LOADING DISPLAY
//
// ------------------------ //

// Waits until the page is fully loaded. Then removes the loading
// spinner, removes the grey overlay div and re-enables "pointerEvents"
// (the mouse)
window.addEventListener("load", function() {
    document.getElementById("spinner").style.visibility="hidden";
    document.getElementsByTagName("BODY")[0].style.pointerEvents = "auto";
    document.getElementById("checkbox--agree").addEventListener("click", function(){
        document.getElementById("overlay").style.visibility="hidden";
    });
});

// ------------------------ //
//
//  LAUNCH MODAL ON PAGE LOAD
//
// ------------------------ //

// Launch modal immediately after DOM contents have been loaded
// Modal will not disappear when user clicks background or when escape on the keyboard is pressed
let securityModal;
document.addEventListener("DOMContentLoaded", function() {
    securityModal = new bootstrap.Modal(document.getElementById("modal--security"), {backdrop: "static", keyboard: false});
    securityModal.show();
});

// Hide modal after user agrees to security message
document.getElementById("checkbox--agree").addEventListener("change", async function(){
    // Add half a second delay to allow user to see the box being ticked
    setTimeout(function(){
        securityModal.hide();
    }, 500);
    await dynamicLoadFile("/static/libraries/leaflet-1.9.3/leaflet.js","JS",null)
    await dynamicLoadFile("https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js","JS",null)
    await dynamicLoadFile("/static/js/leaflet.shpfile.js","JS",null)
    await dynamicLoadFile("/static/js/shp.js","JS",null)
    await dynamicLoadFile("/static/js/leaflet.geometryutil.js","JS",null)
    await dynamicLoadFile("/static/js/leaflet-arrowheads.js","JS",null)
    await dynamicLoadFile("/static/js/leaflet_awesome_number_markers.js","JS",null)
});

// ------------------------ //
//
//  CATTLE MOVEMENT MAP
//
// ------------------------ //
var osm,Esri_WorldGrayCanvas,Esri_WorldImagery,map
const defaultCoords = [52.56555275762325, -1.4667093894864072];
const defaultZoom = 6;

function loadMap(){
// Coordinates and zoom level of map on first render


// Tiles
// https://leaflet-extras.github.io/leaflet-providers/preview/

// OpenStreetMap tiles
osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// Esri grey canvas
Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16,
});
// Esri world imagery
Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// Initiate map and set bounding box to the centre of England
// const map = L.map("map").setView(defaultCoords, defaultZoom);
map = L.map("map", {
    center: defaultCoords,
    zoom: defaultZoom,
    layers: [osm, Esri_WorldGrayCanvas, Esri_WorldImagery],
    zoomControl: false,
});
}

// ------------------------ //
//
//  PAGE NAVIGATION
//
// ------------------------ //

// Function to hide all content
const hideContent = function(){
    // Deactivate bold font in all nav-links (remove 'active' class)
    navLinks.forEach(link => link.classList.remove("active"));

    // Hide all content (add 'hidden' class to all content pages)
    navContent.forEach(content => content.classList.add("hidden"));
};


// Navbar Links and Content Navigation using Event Delegation
// Purpose: hide all content when any nav-link is clicked then show content for the link clicked
navBar.addEventListener("click", async function(e){
    // Select the closest element with the 'nav-link' class
    const clicked = e.target.closest(".nav-link");
    // console.log(clicked);
    
    // Hide all content function
    hideContent();

    //load all html files
    if (!cattleMovementHtml && (clicked.dataset.tab === "2" || clicked.dataset.tab === "3" )) cattleMovementHtml = await dynamicLoadFile("/static/html/cattlemovement.html","HTML","cattlemovement")
    if(!SNPmatrixHtml && clicked.dataset.tab === "3") SNPmatrixHtml =  await dynamicLoadFile("/static/html/SNPdistance.html","HTML","SNPdistance")
    else if(!nextstrainHtml && clicked.dataset.tab === "4") nextstrainHtml = await dynamicLoadFile("/static/html/nextstrain.html","HTML","nextstrain")
    //load all shared JS and html here
    if(!IsSharedScriptAppended && (clicked.dataset.tab === "2" || clicked.dataset.tab === "3" )){
        loadMap()
        await dynamicLoadFile("/static/js/L.LinearMeasurement.js","JS",null)
        await dynamicLoadFile("/static/js/cattleMovement.js","JS","defer")
        IsSharedScriptAppended = true
    }
    
    if (clicked.dataset.tab === "3" && !SNPscript){
        await dynamicLoadFile("/static/js/snpdistance.js","JS",null)
        await dynamicLoadFile("/static/js/snpmatrix.js","JS","module")
        SNPscript = true
    }
    /* load this if user clicked Next strain or cattle movement
    <script src="/static/libraries/leaflet-1.9.3/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js"></script>  
    <script src="/static/js/leaflet.shpfile.js" defer></script>
    <script src="/static/js/shp.js" defer></script>
    <script src="/static/js/leaflet.geometryutil.js" ></script>
    <script src="/static/js/leaflet-arrowheads.js" ></script>
    <script src="/static/js/L.LinearMeasurement.js" ></script>
    <script src="/static/js/leaflet_awesome_number_markers.js" ></script>
    <script src="/static/js/cattleMovement.js"></script>*/
    // If nothing clicked then end function
    if(!clicked) return // guard clause

    navBar = document.querySelector(".navbar-nav");
    navLinks = document.querySelectorAll(".nav-link");
    navContent = document.querySelectorAll(".content");

 
    // Activate bold font for nav-link clicked (add 'active' class)
    clicked.classList.add("active"); 

    // Activate content for nav-link clicked (remove 'hidden' class from content-X class using data-tab number extracted from the nav-link clicked)
    // console.log(clicked.dataset.tab);
    document.querySelector(`.content-${clicked.dataset.tab}`).classList.remove("hidden");   

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    if(map) map.invalidateSize();
});


// Button to Cattle Movement Map
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-cattleLink").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-2").classList.add("active");

    // Show content
    document.querySelector(".content-2").classList.remove("hidden");

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    mapElem.invalidateSize();
});


// Button to Nextstrain
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-nextstrainLink").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-4").classList.add("active");

    // Show content
    document.querySelector(".content-4").classList.remove("hidden");
});


// Button to SNP Map
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-snpMapLink").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-3").classList.add("active");

    // Show content
    document.querySelector(".content-3").classList.remove("hidden");
});


// Button to SNP Matrix
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-snpMatrixLink").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-3").classList.add("active");

    // Show content
    document.querySelector(".content-3").classList.remove("hidden");
});

// -------------------------//
//
// DYNAMIC FILE LOADING
//
//--------------------------//
async function dynamicLoadFile(filepath,type,id){
if (type === "HTML" && id){
    let response = await fetch(filepath).then(res => res.text()).then(html => {
        document.getElementById(id).innerHTML = html;
        return true
    }).catch(err => {
        console.error(err)
        document.getElementById(id).innerHTML = "Page not found"
        return false
    })
    return response
} else if (type==="JS"){
    let newScript = document.createElement("script");
    if(id="defer") newScript.defer = true 
    if(id="async") newScript.async = true
    if(id="module") {
        newScript.type = "module"
        newScript.async = true
    }
    newScript.textContent = await fetch(filepath).then(res => res.text()).catch(err => {
        console.error(err)
        throw err
    });
    document.body.appendChild(newScript)
    return true
} else if (type==="CSS"){

}
}

// Hyperlink to Help and Support
// Purpose: hide all content when button is clicked then show content
// document.querySelector(".footer-help-link").addEventListener("click", () => {

//     // Hide all content function
//     hideContent();

//     // Activate bold font (add 'active' class)
//     document.querySelector(".nav-link-5").classList.add("active");

//     // Show content
//     document.querySelector(".content-5").classList.remove("hidden");
// });



// ------------------------ //
//
// RENDER FOOTER TODO
//
// ------------------------ //

