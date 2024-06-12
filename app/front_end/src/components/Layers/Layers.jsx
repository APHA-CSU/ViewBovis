import { GeoJSON } from 'react-leaflet';
import { useEffect, useState,useRef } from 'react';
import FetchDataFiles from './ZipFiles';
import dataJson from '../../data/riskAreas.json'
const Layers =  ({checkedLayers}) => {
      const DataSet = FetchDataFiles()
      console.log(DataSet)
      const [layers,setLayers] = useState([])
      const AllRA = DataSet["allRA"]
      useEffect(()=>{
          generateArrForRiskAreas(checkedLayers)
          console.log("layers---->", checkedLayers)
        },[checkedLayers])
    
    const generateArrForRiskAreas = async (checkedLayers) => {
          console.log("generateArrForRisk", checkedLayers)
            let arr = []
            if(checkedLayers["showAllRA"]){
                arr.push({data : AllRA, type : "risk",label:"showAllRA"})
              } 
              if (checkedLayers["showHRA"]) {
                arr.push({data : AllRA, type : "risk", label: "showHRA"})
              }
              if (checkedLayers["showLRA"]) {
                arr.push({data : AllRA, type : "risk",label:"showLRA"})
              }
              if (checkedLayers["showEdgeRA"]) {
                arr.push({data : AllRA, type : "risk"})
              }
              if (checkedLayers["showHTBA"]) {
                arr.push({data : AllRA, type : "risk"})
              }
              if (checkedLayers["showLTBA"]) {
                arr.push({data : AllRA, type : "risk"})
              }
              if (checkedLayers["showITBA"]) {
                arr.push({data : AllRA, type : "risk"})
              }
              if (checkedLayers["showTBFA"]) {
                arr.push({data : AllRA, type : "risk"})
              }
              setLayers([...arr])
        }

        const onEachFeatureCombined = (feature, layer) => {
            onEachFeature(feature, layer);
            layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
            });
          };

          const riskAreaCols = (area) => {
            if (area === "High Risk Area" || area === "High TB Area") return "#C62828";
            else if (area === "Intermediate TB Area" || area === "Edge Area")
              return "orange";
            else if (area === "Low Risk Area" || area === "Low TB Area")
              return "#00C853";
            else if (area === "TB Free Area") return "#CFD8DC";
            return "#CFD8DC";
          };
        
          // Function to set custom styles for Risk Area polygons. "feature" object obtained from GeoJSON react-leaflet component used in CattleMovementMap.jsx.
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
          const highlightFeature = (e) => {
            const layer = e.target;
            layer.setStyle({
              weight: 3,
              dashArray: "",
              fillOpacity: 0.7,
            });
          };
        
          const resetHighlight = (e) => {
            const layer = e.target;
            const map = layer._map;
            if (map.infoControl) {
              map.infoControl.update();
            }
            layer.setStyle(styleRiskArea(layer.feature));
          };
    
    
        return  (
        <>
        {layers.map(layer => <GeoJSON
          data={layer.data}
          style={styleRiskArea}
        />)}
        </>
      )
}

export default Layers;