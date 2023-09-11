// =========================================== //
// SNP Matrix
//
// Code: JavaScript
// Author: Tom Jenkins (Tom.Jenkins@apha.gov.uk)
// =========================================== //

"use strict";

// Viridis colour palette
// https://github.com/d3/d3-scale-chromatic
import {interpolateViridis} from "https://cdn.skypack.dev/d3-scale-chromatic@3";


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
    <span id="back-to-start-page-text">
        <svg style="margin-bottom: 3px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
        Back
    </span>
`;
backBtn3.classList.add("back-to-start-page-bttn");


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
  document.getElementById("snpmatrix-sidebar-container").insertAdjacentElement("afterbegin", backBtn3);

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



// ------------------------ //
//
// SNP DISTANCE SLIDER
//
// ------------------------ //

// Select elements from DOM
const snpSlider2 = document.querySelector("#snpmatrix-range");

// Update display value when user moves slider
const rangeValue2 = function(){
  let newValue2 = snpSlider2.value;
  let displayValue2 = document.querySelector("#snpmatrix-distance-value");
  displayValue2.innerHTML = newValue2;
}
snpSlider2.addEventListener("input", rangeValue2);



// ------------------------ //
//
// SNP NUMBER SIZE
//
// ------------------------ //

// Function to change the size of the SNP distance number within squares
const snpFontSize = function (numComparisons) {
  switch (true) {
    case (numComparisons <= 100): return 25;
    case (numComparisons > 100 && numComparisons <= 150): return 20;
    case (numComparisons > 150 && numComparisons <= 200): return 17.5;
    case (numComparisons > 200 && numComparisons <= 250): return 15;
    case (numComparisons > 250 && numComparisons <= 1000): return 10;
    case (numComparisons > 1000): return 8;
  };
};



// ------------------------ //
//
// SNP DISTRIBUTION PLOT
//
// ------------------------ //

// Function to render SNP distribution chart
const renderSNPDistribution = function(matrix, minValue, maxValue) {

  // Subset all non-identical pairwise comparisons and extract their SNP distance values
  const uniqSNPComparisons = matrix
      .filter( i => i[0] !== i[1])
      .map( i => i[2])
  // console.log(uniqSNPComparisons);

  // Count the number of unique SNP distances (e.g. how many 0s, 1s, 2s, etc.)
  // Note: acc = accumulator, curr = current value
  // Returns object in the format {"0": 10, "1": 10, "3": 10}
  let snpCounts = uniqSNPComparisons.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});
  // console.log(snpCounts);

  // Divide each property by two
  // Return half as many because each pairwise comparison is repeated twice
  snpCounts = Object.fromEntries(
    Object.entries(snpCounts).map(([key, value]) =>
      [key, typeof value === 'number' ? value / 2 : value]
    )
  );
  // console.log(snpCounts);

  // Create object in the format up to the maxValue {"0": 0, "1": 0, "n": 0}
  // All object values are zero by default and will be replaced by the actual counts below
  let snpCountsAll = {};
  for (let i = 0; i <= maxValue; i++) {
    snpCountsAll[i] = 0;
  }
  // console.log(snpCountsAll);

  // Replace zero in object property for which there the real counts for each SNP distance
  // Returns e.g. {"0": 2, "1": 3, "2": 0, "n": n} (format required for bar chart)
  for (let prop in snpCounts) {
    if (snpCountsAll.hasOwnProperty(prop)) {
      snpCountsAll[prop] = snpCounts[prop];
    };
  };
  // console.log(snpCountsAll);

  // Select element from DOM
  const snpDistributionDOM = document.getElementById("snp-distribution-plot");

  // Initiate echarts instance
  const snpDistributionInstance = echarts.init(snpDistributionDOM);

  // Generate an array of colors using d3.interpolateViridis
  const viridis =  Object.keys(snpCountsAll).map((d) => interpolateViridis(d / (maxValue)));
  // console.log(viridis);

  // Bar chart configuration
  const option = {

    tooltip: {
      position: "top",
    },

    grid: {
      top: "25%",
      left: "20%" 
    },

    title: {
      text: `SNP Distance Distribution`,
      textStyle: {
        fontSize: 15,
        // color: "#00A33B"
      },
    },
    
    xAxis: {
      type: "category",
      data: Object.keys(snpCountsAll),
      name: "SNP distance",
      nameLocation: "center",
      nameGap: 30,
    },

    yAxis: {
      type: "value",
      minInterval: 1,
      name: "Count",
      nameLocation: "center",
      nameGap: 35,
    },

    series: [{
      type: "bar",
      name: "SNP Count",
      data: Object.values(snpCountsAll),
      colorBy: "data",
      color: maxValue === 0 ? "#440154" : viridis.reverse(),
    }],

    toolbox: {
      show: true,
      itemSize: 15,
      right: "2.5%",
      feature: {
        saveAsImage: {
          type: "png",
          name: "snpdistribution",
          title: "",
          pixelRatio: 5,
        }
      }
    }

  };

  // Set configuration options
  snpDistributionInstance.setOption(option);
};


// ------------------------ //
//
// SNP MATRIX HEATMAP
//
// ------------------------ //

// Function to plot a heatmap with echarts.js using SNP matrix data
const plotHeatmap = function(matrix, identifier, af, sampleNames, minValue, maxValue) {

  // Select element from DOM
  const chartDom = document.getElementById("snpmatrix");

  // Initiate echarts instance
  const echartInstance = echarts.init(chartDom);

  // Generate an array of colors using d3.interpolateViridis
  const viridis =  [...Array(maxValue+1).keys()].map((d) => interpolateViridis(d / (maxValue)));
  
  // Configure chart options
  const option = {

    tooltip: {
      position: "top",
      formatter: function(params){
        return(
          `
          Sample 1: <strong>${params.value[0]}</strong><br/>
          Sample 2: <strong>${params.value[1]}</strong><br/>
          SNP Distance: <strong>${params.value[2]}</strong> 
        `)
      }
    },

    grid: {
      bottom: "27%",
      left: "15%"      
    },

    title: {
      text: `SNP Matrix: ${identifier} (${af})`,
      textStyle: {
        fontSize: 20,
        // color: "#00A33B"
      },
    },

    xAxis: {
      type: "category",
      data: sampleNames,
      splitArea: {
        show: true
      },
      // position: "top",
      axisLabel: {
        interval: 0,
        rotate: 90,
        fontWeight: "bold",
        fontSize: 15,
        // Colour selected sample green and everything else X
        color: function(_, index) {
          if (index === 0) {
              return "#00A33B";
          }
          else {
              return "#333333";
          }
        },
      },
    },

    yAxis: {
      type: "category",
      data: sampleNames,
      splitArea: {
        show: true
      },
      axisLabel: {
        fontWeight: "bold",
        fontSize: 15,
        // Colour selected sample green and everything else X
        color: function(_, index) {
          if (index === 0) {
              return "#00A33B";
          }
          else {
              return "#333333";
          }
        },
      }
    },

    visualMap: {
      type: "piecewise",
      // min: minValue,
      // max: maxValue,
      categories: [...Array(maxValue+1).keys()].map(String),
      right: "2.5%",
      top: "middle",
      inRange: {
        color: maxValue === 0 ? "#440154" : viridis.reverse(),
      },
      itemWidth: 30,
      itemHeight: 20,
      textStyle: {
        fontSize: 16
      },
    },

    animationDurationUpdate: 300,

    series: [
      {
        type: "heatmap",
        data: matrix,
        // markPoint: {
        //   data: [
        //     { type: 'max', name: 'Max' },
        //     { type: 'min', name: 'Min' }
        //   ]
        // },
        label: {
          show: true,
          fontSize: snpFontSize(matrix.length),
          offset: [0, 2]
        },
        itemStyle: {
          borderColor: "white",
        },
        emphasis: {
          focus: "none",
          itemStyle: {
            opacity: 0.75,
            borderWidth: 5,
            borderColor: "white"
          }
        }
      }
    ],

    toolbox: {
      show: true,
      itemSize: 25,
      right: "2.5%",
      feature: {
        dataZoom: {},
        saveAsImage: {
          type: "png",
          name: "snpmatrix",
          title: "Save as Image",
          pixelRatio: 5,
        }
      }
    }
  };

  // Set configuration options
  echartInstance.setOption(option);
};



// ------------------------ //
//
// ASYNC FUNCTION TO RENDER SNP MATRIX
//
// ------------------------ //

// function to display server error text
const matrix_serverError = function () {
    // Remove spinner when fetch is complete
    document.getElementById("snpmatrix-spinner").classList.add("hidden");  

    // Activate generic (unknown) warning message on UI
    document.getElementById("snpmatrix-warning-text").insertAdjacentHTML("afterbegin", `
      <p class="error-text" id="snpmatrix-error-message">Server error: please report to developers (please include details on how to reproduce this error)</p>
    `);
}

// function to display client error text
const matrix_ClientError = function (err) {
    // log the error
    console.log(err);

    // Remove spinner when fetch is complete
    document.getElementById("snpmatrix-spinner").classList.add("hidden");  

    // Activate generic (unknown) warning message on UI
    document.getElementById("snpmatrix-warning-text").insertAdjacentHTML("afterbegin", `
      <p class="error-text" id="snpmatrix-error-message">Client side error: please report to developers (please include details on how to reproduce this error)</p>
    `);
}

// Async function that renders target samples and its related samples on map
const showSNPMatrix = async function () {

  try {

    // First clear any error and warning text
    document.getElementById("snpmatrix-warning-text").textContent = "";
    if(document.getElementById("snpmatrix-error-message") !== null && document.getElementById("snpmatrix-error-message") !== "undefined") {
      document.getElementById("snpmatrix-error-message").remove();
    };

    // Select elements from DOM
    const matrixSampleSelected = document.getElementById("snpmatrix-selected-sample").value;
    const matrixSNPDistance = document.getElementById("snpmatrix-distance-value").textContent;
    // console.log(matrixSampleSelected, matrixSNPDistance);

    // Render spinner
    document.getElementById("snpmatrix-spinner").classList.remove("hidden");

    // Fetch json data from backend
    const response = await fetch(`/sample/matrix?sample_name=${matrixSampleSelected}&snp_distance=${matrixSNPDistance}`);
    // console.log(response);
    if(!response.ok) {
      matrix_serverError()
    } else {
      const json = await response.json();
      console.log(json);

      // Remove spinner when fetch is complete
      document.getElementById("snpmatrix-spinner").classList.add("hidden");

      // If response contains a warning
      if (json["warnings"]) {
        document.getElementById("snpmatrix-warning-text").insertAdjacentHTML("beforebegin", `
          <p class="warning-text" id="snpmatrix-error-message">${json["warning"]}</p>
        `);
      } else {
        // Extract the selected sample Submission number and Identifier
        const selectedSampleSubmission = json.soi;
        const selectedSampleIdentifier = json.identifier;
        // console.log(selectedSampleIdentifier);

        // Extract matrix from json array
        const matrix = json.matrix;
        // console.log(matrix);

        const sampleIDs = json.sampleIDs
        console.log(sampleIDs);

        //================
        // POSSIBLE IDEA: BACKEND TO PROVIDE IDENTIFIERS INSTEAD OF AF NUMBERS?
        //================
        
        // Extract minimum and maximum SNP distance
        const minValue = Math.min(...matrix.map( i => i[2]));
        const maxValue = Math.max(...matrix.map( i => i[2]));
        // console.log(minValue, maxValue);

        // Render SNP distribution plot
        renderSNPDistribution(matrix, minValue, maxValue); 

        // Render SNP matrix
        plotHeatmap(matrix, selectedSampleIdentifier, selectedSampleSubmission, sampleIDs, minValue, maxValue);
      }
    }

  } catch(err) {
    matrix_ClientError(err)
  }
};

// Execute the async showSNPMatrix() function when the main "Plot SNP Matrix" button is clicked
document.getElementById("btn__plot-snpmatrix").addEventListener("click", showSNPMatrix);



// ------------------------ //
//
// DYNAMICALLY SET HEIGHT OF MAP
//
// ------------------------ //

// Calculate maximum height of the container where the map will render based on the users screen height
const navbarHeight4 = document.querySelector(".navbar").offsetHeight;
const navbarHeightMargin4 = parseInt(window.getComputedStyle(document.querySelector(".navbar")).getPropertyValue("margin-bottom"));
const snpmatrix = window.innerHeight - navbarHeight4 - navbarHeightMargin4;

// Set the height of map and sidebar containers
document.getElementById("snpmatrix").style.height = `${snpmatrix-10}px`;
document.getElementById("snpmatrix-sidebar-container").style.height = `${snpmatrix}px`;

// Change the height of the map when the window is resized BUG
// For example, when the user drags the browser from a laptop screen to a desktop screen (or vice versa)
// window.addEventListener("resize", () => {
//   document.getElementById("map2").style.height = `${window.innerHeight - navbarHeight3 - navbarHeightMargin3}px`;
//   document.getElementById("snpmap-sidebar-container").style.height = `${window.innerHeight - navbarHeight3 - navbarHeightMargin3}px`;
//   document.getElementById("table-sidebar-container").style.height = `${window.innerHeight - navbarHeight3 - navbarHeightMargin3}px`;
//   map2.invalidateSize();
// });