import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const ResetView = () => {
  const map = useMap();
  const defaultCoords = [52.56555275762325, -1.4667093894864072];
  const defaultZoom = 6;
  useEffect(() => {
    const resetView = new L.Control({
      position: "topleft",
    });
    const scaleControl = new L.control.scale({imperial: false})
    resetView.onAdd = function() {
        const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar");
        divContainer.onclick = () => {
            map.setView(defaultCoords,defaultZoom)
        }

        divContainer.insertAdjacentHTML("afterbegin", `
        <a title="Reset view">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
            </svg>
        </a>
        `);
        return divContainer;
    }
    resetView.addTo(map);
    scaleControl.addTo(map)
    return () => {
        resetView.remove();
        scaleControl.remove();
    };
  }, []);
};
export default ResetView;
