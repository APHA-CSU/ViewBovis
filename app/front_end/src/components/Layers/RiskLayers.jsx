import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import AllRA from "../../data/riskAreas.json";
import L from "leaflet";
const RiskLayers = ({ checkedLayers }) => {
  const [layers, setLayers] = useState([]);
  const [geoJson, setGeoJson] = useState(AllRA);

  const map = useMap();

  //Update `layers` (array) state whenever `checkedLayers` object changes
  useEffect(() => {
    setLayers([
      ...Object.keys(checkedLayers).filter((elem) => checkedLayers[elem]),
    ]);
  }, [checkedLayers]);

  //Update geoJson by filtering the features array in AllRA, keeping only the features where the TB_Area property exists in the layers array.
  useEffect(() => {
    const selectedFeatures = AllRA["features"].filter(
      (feature) => layers.indexOf(feature["properties"]["TB_Area"]) >= 0
    );
    setGeoJson({ ...geoJson, features: selectedFeatures });
  }, [layers]);

  //Function to set polygon colours for Risk Areas
  const riskAreaCols = (area) => {
    if (area === "High Risk Area" || area === "High TB Area") return "#C62828";
    else if (area === "Intermediate TB Area" || area === "Edge Area")
      return "orange";
    else if (area === "Low Risk Area" || area === "Low TB Area")
      return "#00C853";
    else if (area === "TB Free Area") return "#CFD8DC";
    return "#CFD8DC";
  };

  //Function to set custom styles for each feature (TB area). "feature" object is obtained from geoJSON.
  const styleRiskArea = (feature) => {
    const area = feature.properties.TB_Area;

    return {
      fillColor: riskAreaCols(area),
      weight: 1.5,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };

  //Function using Leaflet bindTooltip to create a tooltip on each feature (TB area)
  const onEachFeature = (feature, layer) => {
    layer.bindTooltip(
      `<div>
                  <div style="font-size: 14px">
                  ${feature.properties.Country} ${feature.properties.TB_Area}
                  </div>
                  <div style="font-size: 12px">
                  ${feature.properties.Testing__1} ${"months testing"}
                  </div>
                </div>`,
      {
        sticky: true,
        className: "custom-tooltip",
      }
    );
  };

  //Function to highlight each feature (TB area)
  const highlightFeature = (e) => {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      dashArray: "",
      fillOpacity: 0.7,
    });
  };

  //Function to reset highlighting each feature (TB area)
  const resetHighlight = (e) => {
    const layer = e.target;
    const map = layer._map;
    if (map.infoControl) {
      map.infoControl.update();
    }
    layer.setStyle(styleRiskArea(layer.feature));
  };

  // Function to add `highlightFeature` and `resetHighlight` on mouseover/out on each feature (TB area)
  const onEachFeatureCombined = (feature, layer) => {
    onEachFeature(feature, layer);
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

  //Create GeoJSON layer using Leaflets' `L.geoJSON` method & geoJson data
  useEffect(() => {
    const geoJsonLayer = L.geoJSON(geoJson, {
      style: styleRiskArea,
      onEachFeature: onEachFeatureCombined,
    });
    geoJsonLayer.addTo(map);
    return () => {
      map.removeLayer(geoJsonLayer);
    };
  }, [geoJson]);

  // Legend for Risk Areas (https://leafletjs.com/examples/choropleth/)
  const RiskAreaLegend = () => {
    useEffect(() => {
      const riskareaLegend = L.control({ position: "bottomright" });

      riskareaLegend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        const levels = [
          "High Risk Area",
          "Edge Area",
          "Low Risk Area",
          "High TB Area",
          "Intermediate TB Area",
          "Low TB Area",
          "TB Free Area",
        ];
        const colours = [
          "#C62828",
          "orange",
          "#00C853",
          "#C62828",
          "orange",
          "#00C853",
          "#CFD8DC",
        ];
        const country = ["ENG", "ENG", "ENG", "WAL", "WAL", "WAL", "SCO"];

        // Build legend: loop through levels and generate a label with a colored square

        // England
        div.insertAdjacentHTML("afterbegin", "<strong>England</strong><br>");
        for (let i = 0; i < levels.length; i++)
          if (country[i] === "ENG")
            div.insertAdjacentHTML(
              "beforeend",
              `<i style="background: ${colours[i]};"></i> ${levels[i]} <br>`
            );

        div.insertAdjacentHTML("beforeend", "<br>");

        // Wales
        div.insertAdjacentHTML("beforeend", "<strong>Wales</strong><br>");
        for (let i = 0; i < levels.length; i++)
          if (country[i] === "WAL")
            div.insertAdjacentHTML(
              "beforeend",
              `<i style="background: ${colours[i]};"></i> ${levels[i]} <br>`
            );

        div.insertAdjacentHTML("beforeend", "<br>");

        // Scotland
        div.insertAdjacentHTML("beforeend", "<strong>Scotland</strong><br>");
        for (let i = 0; i < levels.length; i++)
          if (country[i] === "SCO")
            div.insertAdjacentHTML(
              "beforeend",
              `<i style="background: ${colours[i]};"></i> ${levels[i]} <br>`
            );
        return div;
      };

      riskareaLegend.addTo(map);

      // Cleanup function to remove the legend when the component unmounts
      return () => {
        map.removeControl(riskareaLegend);
      };
    });

    return null;
  };

  return <>{layers.length > 0 && <RiskAreaLegend />}</>;
};

export default RiskLayers;
