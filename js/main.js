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

// Navbar Links and Content Navigation using Event Delegation
// Purpose: hide all content when any nav-link is clicked then show content for the link clicked
navBar.addEventListener("click", function(e){

    // Select the closest element with the 'nav-link' class
    const clicked = e.target.closest(".nav-link");
    // console.log(clicked);

    // If nothing clicked then end function
    if(!clicked) return // guard clause

    // Deactivate bold font in all nav-links (remove 'active' class)
    navLinks.forEach(link => link.classList.remove("active"));

    // Hide all content (add 'hidden' class to all content pages)
    navContent.forEach(content => content.classList.add("hidden"));
 
    // Activate bold font for nav-link clicked (add 'active' class)
    clicked.classList.add("active"); 

    // Activate content for nav-link clicked (remove 'hidden' class from content-X class using data-tab number extracted from the nav-link clicked)
    // console.log(clicked.dataset.tab);
    document.querySelector(`.content-${clicked.dataset.tab}`).classList.remove("hidden");   
   
    // Ensures the correct sub-tab is highlighted green on the SNP Distances page
    // The code adds the active class when the content of either the SNP Distances Map or SNP Matrix are active
    if(document.getElementById("snpMapContent").classList.contains("active")) document.getElementById("navSnpMap").classList.add("active");
    if(document.getElementById("snpMatrixContent").classList.contains("active")) document.getElementById("navSnpMatrix").classList.add("active");

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    map.invalidateSize();
});


// Help and Support Link on Home Page using Event Delegation TODO
// Purpose: hide all content when the Help and Support link is clicked then show Help and Support content



// ------------------------ //
//
//  DYNAMICALLY SET HEIGHT
//
// ------------------------ //

// Get screen height
// const screenHeight = window.innerHeight;

// Dynamically update height of



