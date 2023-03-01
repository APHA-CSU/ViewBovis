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
//  LAUNCH MODAL ON PAGE LOAD
//
// ------------------------ //

// // Launch modal immediately after DOM contents have been loaded
// // Modal will not disappear when user clicks background or when escape on the keyboard is pressed
// let securityModal;
// document.addEventListener("DOMContentLoaded", function() {
//     securityModal = new bootstrap.Modal(document.getElementById("modal--security"), {backdrop: "static", keyboard: false});
//     securityModal.show();
// });

// // Hide modal after user agrees to security message
// document.getElementById("checkbox--agree").addEventListener("change", function(){
//     // Add half a second delay to allow user to see the box being ticked
//     setTimeout(function(){
//         securityModal.hide();
//     }, 500);    
// });



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

// Hyperlink to Cattle Movement Map
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-cattleLink").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-2").classList.add("active");

    // Show content
    document.querySelector(".content-2").classList.remove("hidden");

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    map.invalidateSize();
});

// Hyperlink to Nextstrain
// Purpose: hide all content when button is clicked then show content
document.getElementById("btn-home-nextstrainLink").addEventListener("click", () => {

    // Hide all content function
    hideContent();

    // Activate bold font (add 'active' class)
    document.querySelector(".nav-link-4").classList.add("active");

    // Show content
    document.querySelector(".content-4").classList.remove("hidden");

    // Redraw cattle movement leaflet map to solve sizing issue on startup
    map.invalidateSize();
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

    // Render XXX example on page by inserting HTML
    document.querySelector(".content-4").insertAdjacentHTML("afterbegin", `
        <iframe src="http://127.0.0.1:1235/B6-13" frameborder="0" height="800px" width="100%"></iframe>
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




