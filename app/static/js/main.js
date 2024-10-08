// =========================================== //
// Main JavaScript Code for View Bovis App
//
// Code: JavaScript
// Author: Tom Jenkins (Tom.Jenkins@apha.gov.uk)
// =========================================== //

"use strict";
let cattleMovementFiles, nextstrainFiles, SNPFiles, leafletFileStatus;
// Select DOM elements
const navBar = document.querySelector(".navbar-nav");
const navLinks = document.querySelectorAll(".nav-link");
let navContent = document.querySelectorAll(".content");

//A Global Object to reuse variables from it
window.globalObj = {}

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
        document.body.style.overflow = "auto"
    }, 500);
    await loadLeafletFiles()
});

// ----------------------------- //
//
//  LOAD ALL LEAFLET SCRIPT FILES
//
// ----------------------------- //
async function loadLeafletFiles(){
    leafletFileStatus = "WAIT"
    await fetchStaticFile("/static/libraries/leaflet-1.9.3/leaflet.js","JS",null)
    await fetchStaticFile("/static/js/markerCluster.js","JS",null)
    await fetchStaticFile("/static/js/leaflet.shpfile.js","JS",null)
    await fetchStaticFile("/static/js/shp.js","JS",null)
    await fetchStaticFile("/static/js/leaflet.geometryutil.js","JS",null)
    await fetchStaticFile("/static/js/leaflet-arrowheads.js","JS",null)
    await fetchStaticFile("/static/js/leaflet_awesome_number_markers.js","JS",null)
    await fetchStaticFile("/static/js/L.LinearMeasurement.js","JS",null)
    leafletFileStatus = "DONE"
}

// ------------------------ //
//
//  CATTLE MOVEMENT MAP
//
// ------------------------ //
globalObj.defaultCoords = [52.56555275762325, -1.4667093894864072];
globalObj.defaultZoom = 6;

/* loadCattleMovementMap function will hold all variables inside the globalObj 
to reuse it again in cattlemovement.js script */
function loadCattleMovementMap(){
// Coordinates and zoom level of map on first render


// Tiles
// https://leaflet-extras.github.io/leaflet-providers/preview/

// OpenStreetMap tiles
globalObj.osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// Esri grey canvas
globalObj.Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16,
});
// Esri world imagery
globalObj.Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// Initiate map and set bounding box to the centre of England
// const map = L.map("map").setView(defaultCoords, defaultZoom);
globalObj.map = L.map("map", {
    center: globalObj.defaultCoords,
    zoom: globalObj.defaultZoom,
    layers: [globalObj.osm, globalObj.Esri_WorldGrayCanvas, globalObj.Esri_WorldImagery],
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
    if(!clicked) return
    
    // Hide all content function
    hideContent();
    
    //fetch and load all static contents
    await loadStaticContent(clicked.dataset.tab)

 
    // Activate bold font for nav-link clicked (add 'active' class)
    clicked.classList.add("active"); 

    // Activate content for nav-link clicked (remove 'hidden' class from content-X class using data-tab number extracted from the nav-link clicked)
    // console.log(clicked.dataset.tab);
    document.querySelector(`.content-${clicked.dataset.tab}`).classList.remove("hidden");   

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    if(globalObj.map) globalObj.map.invalidateSize();
});


// Button to Cattle Movement Map
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-cattleLink").addEventListener("click", async () => {

    // Hide all content function
    hideContent();

    //load all the static files
    await loadStaticContent("2")

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-2").classList.add("active");

    // Show content
    document.querySelector(".content-2").classList.remove("hidden");

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    map.invalidateSize();
});


// Button to Nextstrain
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-nextstrainLink").addEventListener("click", async () => {

    // Hide all content function
    hideContent();

    //load all the static files
    await loadStaticContent("4")

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-4").classList.add("active");

    // Show content
    document.querySelector(".content-4").classList.remove("hidden");
});


// Button to SNP Map
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-snpMapLink").addEventListener("click", async () => {

    // Hide all content function
    hideContent();

    //load all the static files
    await loadStaticContent("3")

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-3").classList.add("active");

    // Show content
    document.querySelector(".content-3").classList.remove("hidden");
    loadSNPmapPage();
});


// Button to SNP Matrix
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-snpMatrixLink").addEventListener("click", async () => {

    // Hide all content function
    hideContent();

    //load all the static files
    await loadStaticContent("3")

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-3").classList.add("active");

    // Show content
    document.querySelector(".content-3").classList.remove("hidden");
    loadSNPmatrixPage()
});

// -------------------------//
//
// DYNAMIC FILE LOADING
//
//--------------------------//
async function fetchStaticFile(filepath,type,id){
if (type === "HTML" && id){
    let response = await fetch(filepath).then(res => res.text()).then(html => {
        document.getElementById(id).innerHTML = html;
        return true
    }).catch(err => {
        console.error(err)
        document.getElementById(id).innerHTML = "Page not found"
        return false
    })
    //update navContent Variable for new HTML files
    navContent = document.querySelectorAll(".content");
    return response
} else if (type==="JS"){
    const newScript = document.createElement("script");
    if(id==="defer") newScript.defer = true 
    else if(id==="async") newScript.async = true
    else if(id==="module") {
        newScript.type = "module"
    }
    newScript.textContent = await fetch(filepath).then(res => res.text()).catch(err => {
        console.error(err)
        return false
    });
    document.body.appendChild(newScript)
    return true
} else if (type==="CSS"){

}
}


async function loadStaticContent(tab){
    document.getElementById("spinner").style.visibility="visible";
    let pointerEvents = navBar.style.pointerEvents
    navBar.style.pointerEvents = 'none'
    document.body.style.cursor = "wait"
    //check for leafletfileStatus for SNPmap and Cattlemovement map Pages
    if((tab === "2" || tab === "3") && leafletFileStatus === "WAIT") {
        await new Promise((res,rej)=> {
            const leafletInterval = setInterval(()=> {
                if(leafletFileStatus === "DONE"){
                    clearInterval(leafletInterval)
                    res()
                }
            },100)
        })
    }
    //fetch and load all html and script files
    if (!cattleMovementFiles && tab === "2") {
        cattleMovementFiles = await fetchStaticFile("/static/html/cattlemovement.html","HTML","cattlemovement")
        loadCattleMovementMap()
        cattleMovementFiles = await fetchStaticFile("/static/js/cattleMovement.js","JS","defer")
    }
    if(!SNPFiles && tab === "3") {
        SNPFiles =  await fetchStaticFile("/static/html/SNPdistance.html","HTML","SNPdistance")
        SNPFiles = await fetchStaticFile("/static/js/snpdistance.js","JS",null)
        SNPFiles = await fetchStaticFile("/static/js/snpmatrix.js","JS",null)
    }
    else if(!nextstrainFiles && tab === "4") {
        nextstrainFiles = await fetchStaticFile("/static/html/nextstrain.html","HTML","nextstrain")
        await fetchStaticFile("/static/js/nextstrain.js","JS",null)
}
    document.getElementById("spinner").style.visibility="hidden";
    document.body.style.cursor = "auto"
    navBar.style.pointerEvents = pointerEvents
}


 window.validateIdentifierInput = function(identifierStr){
// regex to remove all spaces in the Identifier or Submission id
    return identifierStr.replace(/ /g, "")
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

