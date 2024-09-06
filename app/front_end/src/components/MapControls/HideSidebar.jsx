import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import { toggleMovementSidebar } from "./../../features/counter/movementSlice.js";

const HideSidebar = ({ setOpenSideBar, openSideBar, type }) => {
  const map = useMap();
  const dispatch = useDispatch();
  const handleToggle = () => {
    if (type === "movement") dispatch(toggleMovementSidebar());
  };
  useEffect(() => {
    const hideSidebarButton = new L.Control({
      position: "topleft",
    });

    hideSidebarButton.onAdd = function () {
      const div = L.DomUtil.create("div", "leaflet-control leaflet-bar");
      div.setAttribute("id", "btn__map-fullscreen");
      div.onclick = function () {
        setOpenSideBar(!openSideBar);
        handleToggle();
        map.invalidateSize();
      };
      if (openSideBar)
        div.insertAdjacentHTML(
          "afterbegin",
          `<a id="toggle-sidebar" title="Hide sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
            />
          </svg>
        </a>
              `
        );
      else
        div.insertAdjacentHTML(
          "afterbegin",
          `<a id="toggle-sidebar" title="Show sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"></path>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
        </svg>
        </a>
              `
        );
      return div;
    };
    hideSidebarButton.addTo(map);
    return () => {
      hideSidebarButton.remove();
    };
  }, [openSideBar]);
};
export default HideSidebar;
