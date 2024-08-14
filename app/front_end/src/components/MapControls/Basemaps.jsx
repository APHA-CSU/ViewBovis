import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
// https://leaflet-extras.github.io/leaflet-providers/preview/
//Basemaps

const BaseMaps = () => {
  const map = useMap();
  const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });

  const Esri_WorldGrayCanvas = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
      maxZoom: 16,
    }
  );

  const Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  );
  const baseMaps = {
    "Open Street Map": osm,
    "Esri Grey Canvas": Esri_WorldGrayCanvas,
    "Esri World Imagery": Esri_WorldImagery,
  };

  useEffect(() => {
    const layerControl = new L.control.layers(baseMaps, null, {
      collapsed: true,
    });
    layerControl.addTo(map);
    const divContainer = layerControl.getContainer();
    const sectionTab = divContainer.querySelectorAll("div")[0];
    sectionTab.insertAdjacentHTML(
      "beforebegin",
      "<strong style='font-size: 15px; margin-bottom: 15px;'>Basemaps</strong>"
    );
    const inputTab = divContainer.querySelectorAll("input")[0];
    inputTab.setAttribute("checked", "true");
    osm.addTo(map)

    return () => {
      layerControl.remove();
    };
  }, []);
};
export default BaseMaps;
