// =========================================== //
// Nextstrain
//
// Code: JavaScript
// Author: Tom Jenkins (Tom.Jenkins@apha.gov.uk)
// =========================================== //

"use strict";


// ------------------------ //
//
// RENDER SEARCH TABLE ON SAMPLE SEARCH
//
// ------------------------ //

// Array containing table data
const tabledata = [
    {cph: "14/351/0044", af: "AF-16-00326-16", eartag: "UK744195702366", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-16", eartag: "UK744195702367", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-17", eartag: "UK744195702368", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-18", eartag: "UK744195702369", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-19", eartag: "UK744195702100", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-20", eartag: "UK744195702101", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-21", eartag: "UK744195702102", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-22", eartag: "UK744195702103", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-23", eartag: "UK744195702104", clade: "B6-13"},
    {cph: "14/351/0044", af: "AF-16-00326-24", eartag: "UK744195702105", clade: "B6-13"},
]

// Inititalise table
const table = new Tabulator("#nextstrain-search-table", {
    data: tabledata, // assign data to table
    columns:[
        {title:"CPH", field:"cph", resizable:false},
        {title:"AF number", field:"af", resizable:false},
        {title:"Ear tag", field:"eartag", resizable:false},
        {title:"Clade", field:"clade", resizable:false},
    ],
    layout: "fitColumns",
    
});



// ------------------------ //
//
// DYNAMICALLY CHANGE HEIGHT OF NEXTSTRAIN IFRAME
//
// ------------------------ //

// Initiate variables
let navbarHeight2, navbarHeightMargin2, iframeHeight;

// Change the height of Nextstrain when the window is resized
// For example, when the user drags the browser from a laptop screen to a desktop screen (or vice versa)
window.addEventListener("resize", () => {
  document.getElementById("nextstrain-iframe").style.height = `${window.innerHeight - navbarHeight - navbarHeightMargin}px`;
});



// ------------------------ //
//
//  LOADING NEXTSTRAIN DATA SETS
//
// ------------------------ //

// Create a back button
let backBtn = document.createElement("button");
backBtn.classList.add("btn");
backBtn.setAttribute("type", "button");
backBtn.setAttribute("id", "btn-backToSplashPage");
// backBtn.innerHTML = `        
//     <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
//         <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
//     </svg>
//     <span style="color: white; font-size:10px;">Back</span>
//     `;
backBtn.innerHTML = `        
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--gov-green)" class="bi bi-caret-left-square-fill" viewBox="0 0 16 16">
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.5 10V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4A.5.5 0 0 0 10.5 12z"/>
    </svg>
`;
backBtn.style.padding = 0;
backBtn.style.margin = 0;
backBtn.style.marginTop= "-7px";
backBtn.style.position = "absolute";
// backBtn.style.backgroundColor = "var(--gov-green)";


// Function to render nextstrain app when a clade is clicked
const renderNextstrain = function(clade = ""){

    // Remove all content from Nextstrain page (add 'hidden' class to 'nextstrain-splash-page' element ID)
    document.getElementById("nextstrain-splash-page").classList.add("hidden");

    // Calculate maximum height of the container where Nextstrain will render based on the users screen height
    navbarHeight2 = document.querySelector(".navbar").offsetHeight;
    navbarHeightMargin2 = parseInt(window.getComputedStyle(document.querySelector(".navbar")).getPropertyValue("margin-bottom"));
    iframeHeight = window.innerHeight - navbarHeight2 - navbarHeightMargin2;

    // Render Nextstrain on page using a template literal containing the correct URL for the sample or clade selected
    document.getElementById("nextstrain-container-id").insertAdjacentHTML("afterbegin", `
        <div class="navbar-margin" id="nextstrain-div">
            <iframe src="http://127.0.0.1:4001/${clade}" id="nextstrain-iframe" frameborder="0" height="${iframeHeight}px" width="100%"></iframe>
        </div>
    `);

    // Render a back button with a 1/2 second delay
    setTimeout( () => {
        document.getElementById("nextstrain-container-id").insertAdjacentElement("afterbegin", backBtn);
    }, 500);    

    // Ensure hidden class removed from back button
    backBtn.classList.remove("hidden");
};


// Render Nextstrain for B6-13
document.getElementById("clade-B613").addEventListener("click", (e) => {
    e.preventDefault();
    renderNextstrain("B6-13");
});

// Render Nextstrain for B6-71
document.getElementById("clade-B671").addEventListener("click", (e) => {
    e.preventDefault();
    renderNextstrain("B6-71");
});


// Example sample
// http://127.0.0.1:1234/B6-13?f_StandardEartag=UK161705304996

// const rmAuspiceElements = function(){ 
// };
// }
// function myFunction() {
//     var iframe = document.getElementById("myFrame");
//     var elmnt = iframe.contentWindow.document.getElementsByTagName("H1")[0];
//     elmnt.style.display = "none";
//   }



  


// ------------------------ //
//
//  GO BACK TO SPLASH PAGE
//
// ------------------------ //

// Go back to splash page when back button is clicked
backBtn.addEventListener("click", () => {

    // Remove Nextstrain app and back button from page
    document.getElementById("nextstrain-div").classList.add("hidden");
    backBtn.classList.add("hidden");

    // Activate splash page
    document.getElementById("nextstrain-splash-page").classList.remove("hidden");
});


