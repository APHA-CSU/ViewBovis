// =========================================== //
// SNP Matrix
//
// Code: JavaScript
// Author: Tom Jenkins (Tom.Jenkins@apha.gov.uk)
// =========================================== //

"use strict";


// ------------------------ //
//
//  BACK BUTTON
//
// ------------------------ //

// Create a back button
let backBtn3 = document.createElement("button");
backBtn3.classList.add("btn");
backBtn3.setAttribute("type", "button");
backBtn3.setAttribute("data-bs-toggle", "tooltip");
backBtn3.setAttribute("data-bs-placement", "btn-backToSplashPage");
backBtn3.setAttribute("title", "Back to SNP Distance Splash Page");
backBtn3.innerHTML = `
    <span style="font-size:10px; font-weight: bold; background-color: var(--apha-green); color: white; padding-right: 5px;">
        <svg style="margin-bottom: 3px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
        Back
    </span>
`;
backBtn3.style.padding = 0;
backBtn3.style.margin = 0;
backBtn3.style.marginTop = "-16px";
backBtn3.style.border = "none";
backBtn3.style.position = "absolute";


// ------------------------ //
//
//  RENDER SNP MAP PAGE
//
// ------------------------ //

// Render SNP map page on click of "View Map" button
document.getElementById("btn-view-matrix").addEventListener("click", () => {

  // Hide splash page and show SNP map content
  document.getElementById("snpdistance-splash-page").classList.add("hidden");
  document.getElementById("snpmatrix-content").classList.remove("hidden");
  map2.invalidateSize();

  // Render a back button
  document.getElementById("snpmatrix-content-container").insertAdjacentElement("afterbegin", backBtn3);

  // Ensure hidden class removed from back button
  backBtn3.classList.remove("hidden");
});


// ------------------------ //
//
//  GO BACK TO SPLASH PAGE
//
// ------------------------ //

// Go back to splash page when back button is clicked
backBtn3.addEventListener("click", () => {

    // Hide SNP map content and show splash page
    document.getElementById("snpmatrix-content").classList.add("hidden");
    document.getElementById("snpdistance-splash-page").classList.remove("hidden");
    
    // Hide back button
    backBtn3.classList.add("hidden");
  });


