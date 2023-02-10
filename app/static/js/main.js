// ================================================== //
// Main JavaScript Codebase for View Bovis Front-End
// ================================================== //

"use strict";

// Select DOM elements
const navBar = document.querySelector(".navbar-nav");
const navLinks = document.querySelectorAll(".nav-link");
const navContent = document.querySelectorAll(".content");


// ------------------------ //
//
//  MAIN NAVIGATION
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
navBar.addEventListener("click", function(e){

    // Select the closest element with the 'nav-link' class
    const clicked = e.target.closest(".nav-link");
    // console.log(clicked);

    // If nothing clicked then end function
    if(!clicked) return // guard clause

    // Hide all content function
    hideContent();
 
    // Activate bold font for nav-link clicked (add 'active' class)
    clicked.classList.add("active"); 

    // Activate content for nav-link clicked (remove 'hidden' class from content-X class using data-tab number extracted from the nav-link clicked)
    // console.log(clicked.dataset.tab);
    document.querySelector(`.content-${clicked.dataset.tab}`).classList.remove("hidden");   

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    map.invalidateSize();
});


// Hyperlink to Help and Support page
// Purpose: hide all content when the Help and Support link is clicked then show Help and Support content
document.getElementById("hyperlink__toHelp").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font for Help and Support page (add 'active' class)
    document.querySelector(".nav-link-5").classList.add("active");

    // Show content for Help and Support page
    document.querySelector(".content-5").classList.remove("hidden");
});


// Hyperlink to Cattle Movement Map
// Purpose: hide all content when Link to Map is clicked then show Cattle Movement Map content
document.getElementById("hyperlink__toMap").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font for Help and Support page (add 'active' class)
    document.querySelector(".nav-link-2").classList.add("active");

    // Show content for Help and Support page
    document.querySelector(".content-2").classList.remove("hidden");

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    map.invalidateSize();
});


// Hyperlink to Nextstrain
// Purpose: hide all content when Link to Nextstrain is clicked then show Nexstraincontent
document.getElementById("hyperlink__toNextstrain").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font for Help and Support page (add 'active' class)
    document.querySelector(".nav-link-4").classList.add("active");

    // Show content for Help and Support page
    document.querySelector(".content-4").classList.remove("hidden");
});


// ------------------------ //
//
//  LOADING NEXTSTRAIN DATA SETS
//
// ------------------------ //

// Load Zika example when hyperlink is clicked
document.getElementById("link_toZika"). addEventListener("click", () => {

    // Remove all content from Nextstrain page (add 'hidden' class to 'filter-clade' element ID)
    document.getElementById("filter-clade").classList.add("hidden");

    // Render a back button on the top-right of the container
    const btnContent = document.createElement("button");
    btnContent.classList.add("btn", "btn-secondary", "btn-sm", "btn-backToDatasets");
    btnContent.setAttribute("type", "button");
    btnContent.innerText = "< Back To Dataset Selection";
    btnContent.style.marginBottom = "5px";
    

    // Get maximum height of the container where Nextstrain will render based on the users screen height
    // const navHeight = document.querySelector(".navbar").offsetHeight;
    // const backBtnHeight = document.querySelector(".btn-backToDatasets").offsetHeight;
    // const screenHeight = window.innerHeight - (navHeight + backBtnHeight);

    // Render Zika example on page by inserting HTML
    document.querySelector(".content-4").insertAdjacentHTML("afterbegin", `
        <iframe src="http://127.0.0.1:1234/zika" frameborder="0" height="800px" width="100%"></iframe>
    `);
    document.querySelector(".content-4").insertAdjacentElement("afterbegin", btnContent);
    

});


// ------------------------ //
//
//  DYNAMICALLY SET HEIGHT
//
// ------------------------ //

// TODO
// Get screen height
// const screenHeight = window.innerHeight;




