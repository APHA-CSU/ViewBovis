import L from 'leaflet'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet'
import countyJSON from '../../data/countiesMerged.json'
import countyZip from '../../data/AHVLACounties_Merged.zip'


const CountyLayers = ({isChecked}) => {
    const map = useMap()
    const styleCounty = function(color = "blue"){
        return {
          fillColor: color,
          weight: 1.5,  
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.30,
        };
      };
      const countyPopupOptions = {
        className: "countyPopupOptions", // must match a css class in _cattleMovement.css
        closeButton: false,
        maxWidth: 100,
        autoPan: false,
      };
      // Function to convert uppercase to lowercase with the first letter capitalised
const formatCounty = function(countyNum, county) {
    // E.g. ["WILTSHIRE"] or ["SOUTH YORKSHIRE"]
    const countyArr = county.split(" ");
    // firstLetter: ["W"] or ["S", "Y"]
    const firstLetter = countyArr.map(x => x[0].toUpperCase());
    // remainingLetters: ["iltshire"] or ["outh", "orkshire"]
    const remainingLetters = countyArr.map(x => x.slice(1).toLowerCase());
  
    // Execute for counties with a single word
    if (firstLetter.length === 1) return `${countyNum} ${firstLetter[0]}${remainingLetters}`;
  
    // Execute for counties with more than one word
    let fullCountyName = "";
    if (firstLetter.length > 1) {
      for (let i = 0; i < firstLetter.length; i++) {
        fullCountyName += firstLetter[i] + remainingLetters[i] + " ";
      };
    };
    return `${countyNum} ${fullCountyName}`;
  };
      // Function to highlight polygon borders and show popup on mouseover (when mouse hovers over them)
      const highlightCounty = function(e) {
        const poly = e.target;
      
        // Polygon borders
        poly.setStyle({
          weight: 3,
          color: "#252525",
        });
      
        // Popup on hover
        poly.bindPopup(formatCounty(poly.feature.properties.C, poly.feature.properties.COUNTY), countyPopupOptions)
          .openPopup();
      
        poly.bringToFront();
      };
      
      // Function to reset border to original style on mouseout (when mouse is not hovering over a polygon)
      const resetHighlight = function(e) {
        countyLayers.resetStyle(e.target);
      };
      
      // Function to zoom to a polygon when it is clicked
      const zoomToPoly = function(e) {
        map.fitBounds(e.target.getBounds());
      };
      
      // Function to add highlighting parameters to a layer
      const onEachFeature = function(feature, layer) {
        layer.on({
          mouseover: highlightCounty,
          mouseout: resetHighlight,
          click: zoomToPoly,
        });
      };
    const countyLayers = L.geoJSON(countyJSON, {style : styleCounty("grey"), 
        onEachFeature : onEachFeature})
    useEffect(()=>{
        if(isChecked) {
            countyLayers.addTo(map)
            countyLayers.bringToFront()
        }

        return () => {
            map.removeLayer(countyLayers)
        }
    },[isChecked])
}

export default CountyLayers;