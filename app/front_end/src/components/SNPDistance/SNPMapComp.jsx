import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { relatedMarker } from "./SNPLayers";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from "leaflet";
import RiskLayers from "../Layers/RiskLayers";
import CountyLayers from "../Layers/CountyLayers";
import HotspotLayers from "../Layers/HotspotLayers";
import { useEffect } from "react";
import L from "leaflet";
import HideSidebar from "../MapControls/HideSidebar";
import MeasurementTool from "../MapControls/MeasurementTool";
import ResetView from "../MapControls/ResetView";
import SNPsoi from "../../imgs/SNPsoi.svg";
import SNPrelated from "../../imgs/SNPrelated.svg";
import movementClusterImg from "../../imgs/movementCluster.svg";
import BaseMaps from "../MapControls/Basemaps";

const SNPMapComp = ({
  SNPMapDataset,
  checkedLayers,
  useCountyandHotspotLayers,
  setOpenSideBar,
  openSideBar,
  setOpenTable,
  openTable,
}) => {
  //SNP map cluster icon
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "cluster-icon",
      iconSize: [30, 30],
    });
  };

  const popupContentSNPMap = function (data, AFnumber) {
    return `
      <div class="fs-5 fw-bold">${data.animal_id}</div><br>
        <div id="popTabContent">     
          <table class="table table-striped">
            <tbody>
              <tr>
                <td><strong>Submission:</strong></td>
                <td>${AFnumber}</td> 
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>${data.dob}</td>
              </tr>
              <tr>
                <td><strong>Slaughter Date:</strong></td>
                <td>${data.slaughter_date}</td>
              </tr>
              <tr>
                <td><strong>Miles:</strong></td>
                <td>${parseFloat(data.distance).toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>SNP Distance:</strong></td>
                <td>${data.snp_distance}</td>
              </tr>
              <tr>
                <td><strong>Precise Location:</strong></td>
                <td>${data.cph}</td> 
              </tr>
              <tr>
                <td><strong>OS Map Reference:</strong></td>
                <td>${data.os_map_ref}</td>
              </tr>
              <tr>
                <td><strong>Species:</strong></td>
                <td>${data.species}</td> 
              </tr>
              <tr>
                <td><strong>Animal Type:</strong></td>
                <td>${data.animal_type}</td> 
              </tr>
              <tr>
                <td><strong>Sex:</strong></td>
                <td>${
                  data.sex == `F`
                    ? `Female`
                    : data.sex == `M`
                    ? `Male`
                    : `Unknown`
                }
                </td>
              </tr> 
              <tr>
                <td><strong>Disclosing Test Type:</strong></td>
                <td>${data.disclosing_test}</td>
              </tr> 
              <tr>
                <td><strong>Import Country:</strong></td>
                <td>${
                  data.import_country == null
                    ? `British`
                    : `${data.import_country}`
                }</td>
              </tr> 
            </tbody>
          </table>
        </div>
      </div>        
      `;
  };

  const popupOptions = {
    maxWidth: 400, // in pixels
    className: "relatedPopupOptions", // must match a css class
    autoClose: false,
    closeOnClick: false,
    maxHeight: 300,
  };

  return (
    <MapContainer
      center={[53.3781, -1]}
      zoom={6}
      zoomAnimation={true}
      zoomAnimationThreshold={20}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <BaseMaps />
      <ResetView />
      <HideSidebar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />
      <MeasurementTool />
      <HotspotLayers isChecked={useCountyandHotspotLayers["hotspotLayers"]} />
      <CountyLayers isChecked={useCountyandHotspotLayers["countyLayers"]} />
      <RiskLayers checkedLayers={checkedLayers} />
      <LegendTableAction
        SNPMapDataset={SNPMapDataset}
        setOpenTable={setOpenTable}
        openTable={openTable}
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {Object.keys(SNPMapDataset)
          .filter((elem) => {
            return elem !== "SOI" && elem !== SNPMapDataset["SOI"];
          })
          .map((elem, index) => {
            return (
              <Marker
                ref={(ref) => {
                  ref?.bindPopup(
                    popupContentSNPMap({ ...SNPMapDataset[elem] }, elem),
                    popupOptions
                  );
                }}
                icon={relatedMarker(
                  { ...SNPMapDataset[elem], submission: elem },
                  SNPMapDataset["SOI"]
                )}
                key={"snp_related_marker_" + index}
                position={[SNPMapDataset[elem].lat, SNPMapDataset[elem].lon]}
              ></Marker>
            );
          })}
      </MarkerClusterGroup>
      {Object.keys(SNPMapDataset)
        .filter((elem) => {
          return elem === SNPMapDataset["SOI"];
        })
        .map((elem, index) => {
          return (
            <Marker
              ref={(ref) => {
                {
                  ref?.bindPopup(
                    popupContentSNPMap({ ...SNPMapDataset[elem] }, elem),
                    popupOptions
                  );
                }
              }}
              icon={relatedMarker(
                { ...SNPMapDataset[elem], submission: elem },
                SNPMapDataset["SOI"]
              )}
              key={"snp_related_marker_" + index}
              position={[SNPMapDataset[elem].lat, SNPMapDataset[elem].lon]}
            ></Marker>
          );
        })}
    </MapContainer>
  );
};

const LegendTableAction = ({ SNPMapDataset, setOpenTable, openTable }) => {
  const map = useMap();
  const btnShowTable = new L.Control({
    position: "topright",
  });
  btnShowTable.onAdd = function (map) {
    const divContainer = L.DomUtil.create("div", "leaflet-control leaflet-bar");
    divContainer.setAttribute("id", "btn__show-table");
    divContainer.onclick = function () {
      setOpenTable((bool) => !bool);
    };
    if (!openTable)
      divContainer.insertAdjacentHTML(
        "afterbegin",
        `<a class="snp-table-toggle btn-show-table">Show Table</a>`
      );
    else
      divContainer.insertAdjacentHTML(
        "afterbegin",
        `<a class="snp-table-toggle btn-show-table">Hide Table</a>`
      );
    return divContainer;
  };
  const markerLegend = new L.control({ position: "topright" });
  markerLegend.onAdd = function (map) {
    let div = L.DomUtil.create("div", "leaflet-control leaflet-bar");
    div.style.width = "150px";
    div.style.background = "white";

    // Build legend with HTML
    div.insertAdjacentHTML(
      "afterbegin",
      `
    <div style="padding-top:5px;">
        <span class="fs-6" style="padding-left:6px;"><strong>Legend</strong></span>
        <span style="display: flex; align-items: center; padding-bottom: 5px;">
          <img src=${SNPsoi} class="legend-marker-img">
          <span class="legend-marker-title">Sample</span>
        </span>
        <span style="display: flex; align-items: center; padding-bottom: 5px;padding-left: 8px;">
        <img src=${SNPrelated} width="25" height="25">
          <span class="legend-marker-title">SNP Relatedness</span>
        </span>
        <span style="display: flex; align-items: center;">
        <img src=${movementClusterImg} class="legend-marker-img">
        <span class="legend-marker-title">Geographic Group</span>
        </span>
      </div>
    `
    );

    return div;
  };
  useEffect(() => {
    const latLon = Object.keys(SNPMapDataset)
      .filter((elem) => {
        return SNPMapDataset[elem]?.lat && SNPMapDataset[elem]?.lon;
      })
      .map((elem) => [SNPMapDataset[elem].lat, SNPMapDataset[elem].lon]);
    if (latLon?.length > 0) {
      markerLegend.addTo(map);
      map.fitBounds(L.latLngBounds(latLon).pad(0.1));
    }
    return () => {
      markerLegend.remove();
    };
  }, [SNPMapDataset]);

  useEffect(() => {
    btnShowTable.addTo(map);
    return () => {
      btnShowTable.remove();
    };
  }, [openTable]);
};

export default SNPMapComp;
