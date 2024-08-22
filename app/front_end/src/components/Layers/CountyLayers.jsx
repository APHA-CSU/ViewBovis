import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import countyJSON from "../../data/AHVLA_Counties_GEOJSON.json";

const CountyLayers = ({ isChecked }) => {
  const map = useMap();

  //Function for Leaflet bindPopup method used in `highlightCounty` - capitalise first letter of county ("KENT" to "Kent")
  const formatCounty = function (countyNum, county) {
    // E.g. ["WILTSHIRE"] or ["SOUTH YORKSHIRE"]
    const countyArr = county.split(" ");

    const firstLetter = countyArr.map((x) => x[0].toUpperCase());
    // firstLetter: ["W"] or ["S", "Y"]

    const remainingLetters = countyArr.map((x) => x.slice(1).toLowerCase());
    // remainingLetters: ["iltshire"] or ["outh", "orkshire"]

    // Execute for counties with a single word
    if (firstLetter.length === 1)
      return `${countyNum} ${firstLetter[0]}${remainingLetters}`;

    // Execute for counties with more than one word
    let fullCountyName = "";
    if (firstLetter.length > 1) {
      for (let i = 0; i < firstLetter.length; i++) {
        fullCountyName += firstLetter[i] + remainingLetters[i] + " ";
      }
    }
    return `${countyNum} ${fullCountyName}`;
  };

  const countyPopupOptions = {
    closeButton: false,
    maxWidth: 100,
    autoPan: false,
  };

  //Function to style polygon (county) borders and show popup on mouseover using Leaflet methods
  const highlightCounty = function (e) {
    const poly = e.target;
    // Polygon borders
    poly.setStyle({
      weight: 3,
      color: "#252525",
    });

    // Popup on hover
    poly
      .bindPopup(
        formatCounty(poly.feature.properties.C, poly.feature.properties.COUNTY),
        countyPopupOptions
      )
      .openPopup();

    poly.bringToFront();
  };

  //Function to reset border style on mouseout
  const resetHighlight = function (e) {
    countyLayers.resetStyle(e.target);
  };

  //Function to add `highlightCounty` and `resetHighlight` on mouseover/out on each feature (county)
  const onEachFeature = function (feature, layer) {
    layer.on({
      mouseover: highlightCounty,
      mouseout: resetHighlight,
      click: zoomToPoly,
    });
  };

  //Function to zoom to a polygon (county) when it is clicked
  const zoomToPoly = function (e) {
    map.fitBounds(e.target.getBounds());
  };

  const styleCounties = function (color = "blue") {
    return {
      fillColor: color,
      weight: 1.5,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.3,
    };
  };

  //Create GeoJSON layer using Leaflets' `L.geoJSON` method & countyJSON data
  const countyLayers = L.geoJSON(countyJSON, {
    style: styleCounties("grey"),
    onEachFeature: onEachFeature,
  });

  useEffect(() => {
    if (isChecked) {
      countyLayers.addTo(map);
      countyLayers.bringToFront();
    }

    return () => {
      map.removeLayer(countyLayers);
    };
  }, [isChecked]);
};

export default CountyLayers;
