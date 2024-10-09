import { useEffect } from "react";
import hotspotsJson from "../../data/Hotspots.json";
import { useMap } from "react-leaflet";
import L from "leaflet";
const HotspotLayers = ({ isChecked }) => {
  const map = useMap();
  const hotspotCols = function (area) {
    switch (area) {
      case "HS 28":
        return "red";
      case "HS 27":
        return "blue";
      case "HS 26":
        return "orange";
      case "HS 23":
        return "yellow";
      case "HS 21":
        return "pink";
      case "HS 29":
        return "purple";
      default:
        return "black";
    }
  };

  const stylehotspotPoly = function (feature) {
    return {
      fillColor: hotspotCols(feature.properties.Name),
      weight: 1.5,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };
  const hotspotLegend = L.control({ position: "bottomright" });
  hotspotLegend.onAdd = function (map) {
    let div = L.DomUtil.create("div", "info legend");
    const category = ["HS 28", "HS 27", "HS 26", "HS 23", "HS 21", "HS 29"];
    const colours = ["red", "blue", "orange", "yellow", "pink", "purple"];

    // Build legend: loop through levels and generate a label with a colored square

    // Add each category to legend
    div.insertAdjacentHTML("afterbegin", "<strong>Hotspots</strong><br>");
    for (let i = 0; i < category.length; i++)
      div.insertAdjacentHTML(
        "beforeend",
        `<i style="background: ${colours[i]};"></i> ${category[i]} <br>`
      );

    return div;
  };
  const hotspotLayers = L.geoJSON(hotspotsJson, { style: stylehotspotPoly });
  useEffect(() => {
    if (isChecked) {
      hotspotLayers.addTo(map);
      hotspotLegend.addTo(map);
    }
    return () => {
      map.removeLayer(hotspotLayers);
      map.removeControl(hotspotLegend);
    };
  }, [isChecked]);
};

export default HotspotLayers;
