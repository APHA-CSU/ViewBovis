// =========================================== //
// Nextstrain
//
// Code: JavaScript
// Author: Tom Jenkins (Tom.Jenkins@apha.gov.uk)
// =========================================== //

"use strict";


// ------------------------ //
//
// HIGHLIGHT INDIVIDUAL CELLS IN TABLE
//
// ------------------------ //

// Define the CSS class to apply to the hovered cell
const highlightClass = "cell-highlight";

// Define the cell mouse over event listener function
const onCellMouseOver = function(e, cell) {
  // Add the highlight class to the cell
  cell.getElement().classList.add(highlightClass);
}

// Define the cell mouse out event listener function
const onCellMouseOut = function(e, cell) {
  // Remove the highlight class from the cell
  cell.getElement().classList.remove(highlightClass);
}



// ------------------------ //
//
// RENDER SEARCH TABLE ON SAMPLE SEARCH
//
// ------------------------ //

// function to display server error text
const ns_serverError = function () {
    // Remove spinner when fetch is complete
    document.getElementById("nextstrain-search-table-spinner").classList.add("hidden");  

    // Activate generic (unknown) warning message on UI
    document.getElementById("nextstrain-search-table").insertAdjacentHTML("afterbegin", `
      <p class="error-text" style="white-space:pre" id="nextstrain-error-message">Server error: please report to developers (please include details on how to reproduce this error)</p>
    `);
}

// function to display client error text
const ns_ClientError = function (err) {
    // log the error
    console.log(err);

    // Remove spinner when fetch is complete
    document.getElementById("nextstrain-search-table-spinner").classList.add("hidden");  

    // Activate generic (unknown) warning message on UI
    document.getElementById("nextstrain-search-table").insertAdjacentHTML("afterbegin", `
      <p class="error-text" style="white-space:pre" id="nextstrain-error-message">Client side error: please report to developers (please include details on how to reproduce this error)</p>
    `);
}

// Initalise variables
let tableData, table;

// Async function that renders table
const showTable = async function() {

    try {

        // Clear any previous rendered tables or error messages
        document.getElementById("nextstrain-search-table").textContent = "";
        if(document.getElementById("nextstrain-error-message") !== null && document.getElementById("cattle-error-message") !== "undefined") {
            document.getElementById("nextstrain-error-message").remove();
        };

        // Render spinner
        document.getElementById("nextstrain-search-table-spinner").classList.remove("hidden");

        // Fetch json data from backend
        const response = await fetch(`/sample?sample_name=${validateIdentifierInput(document.getElementById("nextstrain-input").value)}`);

        if(!response.ok){

            ns_serverError();

        } else {

            const json = await response.json();
            console.log(json);

            // Remove spinner and activate search table when fetch is complete 
            document.getElementById("nextstrain-search-table-spinner").classList.add("hidden");
            document.getElementById("nextstrain-search-table").classList.remove("hidden");

            // If response contains a warning
            if (json["warnings"]) {
                document.getElementById("nextstrain-search-table").insertAdjacentHTML("afterbegin", `
                <p class="warning-text" style="white-space:pre" id="nextstrain-error-message">${json["warning"]}</p>
                `);
            } else {
                // Create an array containing table data
                tableData = [
                    {cph: `${json.cph}`, county: `${json.county}`, af: `${json.submission}`, eartag: `${json.identifier}`, clade: `${json.clade}`}
                ];
                // console.log(tableData);

                // Create table
                table = new Tabulator("#nextstrain-search-table", {
                    data: tableData,
                    selectable:false,
                    columnDefaults:{
                        resizable:false,
                    },
                    layout: "fitColumns",
                    columns: [
                        {title:"Identifier", field:"eartag"},
                        {title:"Submission", field:"af"},
                        {title:"Precise Location", field:"cph"},
                        {title:"County", field:"county"},
                        {title:"Clade", field:"clade"},
                    ],
                });

                // Event handler on each table cell when clicked
                table.on("cellClick", function(e, cell){
                    // The click event object (e)
                    // console.log(e.target);
                    
                    // Get the cell value
                    let cellValue = cell.getValue();
                    // console.log(cellValue);

                    // Get the column (field) heading
                    let cellField = cell.getField();
                    // console.log(cellField);

                    // Get the clade of the row clicked
                    let clade = cell.getRow().getData().clade;
                    // console.log(clade);

                    // Render Nextstrain for clade, county, AF, Ear tag or CPH
                    if (cellField === "clade") renderNextstrain(`${cellValue}?p=grid&tl=Identifier`);
                    if (cellField === "county") renderNextstrain(`${clade}?f_County=${cellValue}&p=grid&tl=Identifier`);
                    if (cellField === "af") renderNextstrain(`${clade}?f_Submission=${cellValue}&p=grid`);
                    if (cellField === "eartag") renderNextstrain(`${clade}?f_Identifier=${cellValue}&p=grid&tl=Identifier`);
                    if (cellField === "cph") renderNextstrain(`${clade}?f_PreciseLocation=${cellValue}&p=grid&tl=Identifier`);
                });

                // Add the cell mouse over and mouse out event listeners to the table
                table.on("cellMouseOver", onCellMouseOver);
                table.on("cellMouseOut", onCellMouseOut);
            };
        }
    
    } catch(err) {

        ns_ClientError(err);
    }
};

// Executes the async showTable() function when the "nextstrain-search-button" button is clicked
document.getElementById("nextstrain-search-button").addEventListener("click", () => {
    
    // Execute async function to render search table
    showTable();
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
  document.getElementById("nextstrain-iframe").style.height = `${window.innerHeight - navbarHeight2 - navbarHeightMargin2}px`;
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
backBtn.setAttribute("data-bs-toggle", "tooltip");
backBtn.setAttribute("data-bs-placement", "btn-backToSplashPage");
backBtn.setAttribute("title", "Back to Nextstrain Start Page");
backBtn.innerHTML = `
    <span id="back-to-start-page-text">
        <svg style="margin-bottom: 3px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
        Back
    </span>
`;
backBtn.classList.add("back-to-start-page-bttn");
backBtn.style.position = "absolute";


// Function to render nextstrain app when a clade is clicked
const renderNextstrain = function(URL){

    // Remove all content from Nextstrain page (add 'hidden' class to 'nextstrain-splash-page' element ID)
    document.getElementById("nextstrain-splash-page").classList.add("hidden");

    // Calculate maximum height of the container where Nextstrain will render based on the users screen height
    navbarHeight2 = document.querySelector(".navbar").offsetHeight;
    navbarHeightMargin2 = parseInt(window.getComputedStyle(document.querySelector(".navbar")).getPropertyValue("margin-bottom"));
    iframeHeight = window.innerHeight - navbarHeight2 - navbarHeightMargin2;

    // Render Nextstrain on page using a template literal containing the correct URL for the sample or clade selected
    // TODO: uncomment below for production mode
    document.getElementById("nextstrain-container-id").insertAdjacentHTML("afterbegin", `
        <div id="nextstrain-div">
            <iframe src="https://hosting.int.sce.network/http/nextstrain-beta.int.sce.network/${URL}" id="nextstrain-iframe" frameborder="0" height="${iframeHeight}px" width="100%"></iframe>
        </div>
    `);

    // TODO: comment 214-218 for production mode
    //document.getElementById("nextstrain-container-id").insertAdjacentHTML("afterbegin", `
        //<div id="nextstrain-div">
            //<iframe src="http://127.0.0.1:4001/${URL}" id="nextstrain-iframe" frameborder="0" height="${iframeHeight}px" width="100%"></iframe>
        //</div>
    //`);

    // Render a back button with a 1/10 second delay
    setTimeout( () => {
        document.getElementById("nextstrain-container-id").insertAdjacentElement("afterbegin", backBtn);
    }, 100);    

    // Ensure hidden class removed from back button
    backBtn.classList.remove("hidden");
};


// Render Nextstrain for B1-11
document.getElementById("clade-B111").addEventListener("click", (e) => {
    e.preventDefault();
    renderNextstrain("B1-11");
});

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

// Render Nextstrain for B6-71
document.getElementById("clade-B691").addEventListener("click", (e) => {
    e.preventDefault();
    renderNextstrain("B6-91");
});





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


