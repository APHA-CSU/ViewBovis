import { interpolateViridis } from "d3";
import { init } from "echarts";
import { useEffect, useRef } from "react";
const SNPMatrixComp = ({ json }) => {
  const heatMap = useRef()
  const renderSNPDistribution = function (matrix, minValue, maxValue) {
    // Subset all non-identical pairwise comparisons and extract their SNP distance values
    const uniqSNPComparisons = matrix
      .filter((i) => i[0] !== i[1])
      .map((i) => i[2]);
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
      Object.entries(snpCounts).map(([key, value]) => [
        key,
        typeof value === "number" ? value / 2 : value,
      ])
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
      }
    }
    // console.log(snpCountsAll);

    // Select element from DOM
    const snpDistributionDOM = document.getElementById("snp-distribution-plot");

    // Initiate echarts instance
    const snpDistributionInstance = init(snpDistributionDOM);

    // Generate an array of colors using d3.interpolateViridis
    const viridis = Object.keys(snpCountsAll).map((d) =>
      interpolateViridis(d / maxValue)
    );
    // console.log(viridis);

    // Bar chart configuration
    const option = {
      tooltip: {
        position: "top",
      },

      grid: {
        top: "25%",
        left: "20%",
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

      series: [
        {
          type: "bar",
          name: "SNP Count",
          data: Object.values(snpCountsAll),
          colorBy: "data",
          color: maxValue === 0 ? "#440154" : viridis.reverse(),
        },
      ],

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
          },
        },
      },
    };

    // Set configuration options
    snpDistributionInstance.setOption(option);
  };
  // ------------------------ //
  //
  // SNP NUMBER SIZE
  //
  // ------------------------ //

  // Function to change the size of the SNP distance number within squares
  const snpFontSize = function (numComparisons) {
    switch (true) {
      case numComparisons <= 100:
        return 25;
      case numComparisons > 100 && numComparisons <= 150:
        return 20;
      case numComparisons > 150 && numComparisons <= 200:
        return 17.5;
      case numComparisons > 200 && numComparisons <= 250:
        return 15;
      case numComparisons > 250 && numComparisons <= 1000:
        return 10;
      case numComparisons > 1000:
        return 8;
    }
  };
  // ------------------------ //
  //
  // SNP MATRIX HEATMAP
  //
  // ------------------------ //

  // Function to plot a heatmap with echarts.js using SNP matrix data
  const plotHeatmap = function (
    matrix,
    identifier,
    af,
    sampleNames,
    minValue,
    maxValue
  ) {
    // Select element from DOM

    // Initiate echarts instance
    const echartInstance = init(heatMap.current);

    // Generate an array of colors using d3.interpolateViridis
    const viridis = [...Array(maxValue + 1).keys()].map((d) =>
      interpolateViridis(d / maxValue)
    );

    // Configure chart options
    const option = {
      tooltip: {
        position: "top",
        formatter: function (params) {
          return `
            Sample 1: <strong>${params.value[0]}</strong><br/>
            Sample 2: <strong>${params.value[1]}</strong><br/>
            SNP Distance: <strong>${params.value[2]}</strong> 
          `;
        },
      },

      grid: {
        bottom: "27%",
        left: "15%",
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
          show: true,
        },
        // position: "top",
        axisLabel: {
          interval: 0,
          rotate: 90,
          fontWeight: "bold",
          fontSize: 15,
          // Colour selected sample green and everything else X
          color: function (_, index) {
            if (index === 0) {
              return "#00A33B";
            } else {
              return "#333333";
            }
          },
        },
      },

      yAxis: {
        type: "category",
        data: sampleNames,
        splitArea: {
          show: true,
        },
        axisLabel: {
          fontWeight: "bold",
          fontSize: 15,
          // Colour selected sample green and everything else X
          color: function (_, index) {
            if (index === 0) {
              return "#00A33B";
            } else {
              return "#333333";
            }
          },
        },
      },

      visualMap: {
        type: "piecewise",
        // min: minValue,
        // max: maxValue,
        categories: [...Array(maxValue + 1).keys()].map(String),
        right: "2.5%",
        top: "middle",
        inRange: {
          color: maxValue === 0 ? "#440154" : viridis.toReversed(),
        },
        itemWidth: 30,
        itemHeight: 20,
        textStyle: {
          fontSize: 16,
        },
      },

      animationDurationUpdate: 300,

      series: [
        {
          type: "heatmap",
          data: matrix,
          label: {
            show: true,
            fontSize: snpFontSize(matrix.length),
            offset: [0, 2],
          },
          itemStyle: {
            borderColor: "white",
          },
          emphasis: {
            focus: "none",
            itemStyle: {
              opacity: 0.75,
              borderWidth: 5,
              borderColor: "white",
            },
          },
        },
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
          },
        },
      },
    };

    // Set configuration options
    echartInstance.setOption(option);
  };

  // Async function that renders target samples and its related samples on map
  const showSNPMatrix = function () {
    // First clear any error and warning text
    // Remove spinner when fetch is complete
    //document.getElementById("snpmatrix-spinner").classList.add("hidden");

    // If response contains a warning
    // Extract the selected sample Submission number and Identifier
    const selectedSampleSubmission = json.soi;
    const selectedSampleIdentifier = json.identifier;
    // console.log(selectedSampleIdentifier);

    // Extract matrix from json array
    const matrix = json.matrix;
    // console.log(matrix);

    const sampleIDs = json.sampleIDs;
    console.log(sampleIDs);

    //================
    // POSSIBLE IDEA: BACKEND TO PROVIDE IDENTIFIERS INSTEAD OF AF NUMBERS?
    //================

    // Extract minimum and maximum SNP distance
    const minValue = Math.min(...matrix.map((i) => i[2]));
    const maxValue = Math.max(...matrix.map((i) => i[2]));
    // console.log(minValue, maxValue);

    // Render SNP distribution plot
    renderSNPDistribution(matrix, minValue, maxValue);

    // Render SNP matrix
    plotHeatmap(
      matrix,
      selectedSampleIdentifier,
      selectedSampleSubmission,
      sampleIDs,
      minValue,
      maxValue
    );
  };

  useEffect(() => {
    if (Object.keys(json).length > 0) showSNPMatrix();
  }, [json]);
 
  return <div ref={heatMap}>
  
  </div>
};

export default SNPMatrixComp;
