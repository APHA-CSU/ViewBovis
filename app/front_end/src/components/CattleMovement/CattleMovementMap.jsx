import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Icon, divIcon} from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import holdingImg from "../../imgs/holding.svg";
import showgroundImg from "../../imgs/showground.svg";
import marketImg from "../../imgs/market.svg";
import slaughterhouseImg from "../../imgs/slaughterhouse.svg";
import movementClusterImg from "../../imgs/movementCluster.svg";
import React, { useEffect, useRef } from "react";
import L from 'leaflet'
import "leaflet-polylinedecorator";
import RiskLayers from "./../Layers/RiskLayers";
import CountyLayers from "../Layers/CountyLayers";
import HotspotLayers from "../Layers/HotspotLayers";
import "bootstrap/js/dist/tab";
import HideSidebar from "../MapControls/HideSidebar";
import MeasurementTool from "../MapControls/MeasurementTool";
import ResetView from "../MapControls/ResetView";
import BaseMaps from "../MapControls/Basemaps";

const CattleMovementMap = ({
  jsonData,
  secondJsonData,
  checkedLayers,
  useCountyandHotspotLayers,
  setOpenSideBar,
  openSideBar,
}) => {
  // if jsonData or secondJsonData is null or undefined, return a placeholder map
  if (
    (!jsonData && !secondJsonData) ||
    (jsonData &&
      Object.keys(jsonData).length === 0 &&
      secondJsonData &&
      Object.keys(secondJsonData).length === 0)
  ) {
    return (
      <MapContainer center={[53.3781, -1]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BaseMaps />
        <HotspotLayers isChecked={useCountyandHotspotLayers["hotspotLayers"]} />
        <CountyLayers isChecked={useCountyandHotspotLayers["countyLayers"]} />
        {Object.keys(checkedLayers).length > 0 && <RiskLayers checkedLayers={checkedLayers} />}
        <ResetView />
        <HideSidebar
          setOpenSideBar={setOpenSideBar}
          openSideBar={openSideBar}
        />
        <MeasurementTool />
      </MapContainer>
    );
  }

  // Extract movement data from json objects into arrays
  const movArr = jsonData.move ? Object.values(jsonData.move) : [];
  const linePts = movArr.map((arr) => [arr.lat, arr.lon]);
  const secondMovArr = secondJsonData.move
    ? Object.values(secondJsonData.move)
    : [];
  const secondLinePts = secondMovArr.map((arr) => [arr.lat, arr.lon]);

  //Object to store marker icons
  const customIcon = {
    holding: new Icon({
      iconUrl: holdingImg,
      iconSize: [40, 40],
      iconAnchor: [20, 35],
    }),
    showground: new Icon({
      iconUrl: showgroundImg,
      iconSize: [40, 40],
      iconAnchor: [20, 35],
    }),
    market: new Icon({
      iconUrl: marketImg,
      iconSize: [40, 40],
      iconAnchor: [20, 35],
    }),
    slaughterhouse: new Icon({
      iconUrl: slaughterhouseImg,
      iconSize: [40, 40],
      iconAnchor: [20, 35],
    }),
  };

  //Function to render the correct marker icon
  const renderIcon = (move) => {
    // Extract location type from movement array
    let moveType = move.type;

    // Return the correct cow icon given the location type
    const iconToReturn =
      moveType === "Agricultural Holding"
        ? customIcon.holding
        : moveType === "Market"
        ? customIcon.market
        : moveType === "Slaughterhouse (Red Meat)"
        ? customIcon.slaughterhouse
        : moveType === "Showground"
        ? customIcon.showground
        : customIcon.holding;

    return iconToReturn;
  };

  //Movement cluster icon
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "cluster-icon",
      iconSize: [30, 30],
    });
  };

  //Function to create HTML popup content using template literal
  const popupContent = function (data, movArr, index, lineIndex) {
    return `
    <div class="fs-5 fw-bold">${data.identifier}</div><br>
    <div>
      <nav>
        <div class="nav nav-tabs" id="popupNav" role="tablist">
          <button class="nav-link active" id="navSummary" data-bs-toggle="tab" data-bs-target="#navSummaryContent${index}${lineIndex}" type="button" role="tab" aria-controls="navSummaryContent" aria-selected="true">Summary</button>
          <button class="nav-link" id="navInfo" data-bs-toggle="tab" data-bs-target="#navInfoContent${index}${lineIndex}" type="button" role="tab" aria-controls="navInfoContent" aria-selected="false">Animal</button>
        </div>
      </nav>
      <div class="tab-content" id="popTabContent">     
        <div class="tab-pane fade show active" id="navSummaryContent${index}${lineIndex}" role="tabpanel" aria-labelledby="navSummary" tabindex="0">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td><strong>Movement:</strong></td>
                <td>${`${index + 1} of ${movArr.length}`}</td>
              </tr>
              <tr>
                <td><strong>Duration of Stay:</strong></td>
                <td>${
                  movArr[index].stay_length <= 30
                    ? `${movArr[index].stay_length} days`
                    : movArr[index].stay_length > 30 &&
                      movArr[index].stay_length <= 365
                    ? `${(movArr[index].stay_length / 7).toFixed(0)} weeks`
                    : `${(movArr[index].stay_length / 365).toFixed(1)} years`
                }
                </td> 
              </tr>
              <tr>
                <td><strong>Date of Arrival:</strong></td>
                <td>${movArr[index].on_date}</td> 
              </tr>
              <tr>
                <td><strong>Date of Departure:</strong></td>
                <td>${movArr[index].off_date}</td> 
              </tr>
              <tr>
                <td><strong>Species:</strong></td>
                <td>${data.species === "COW" ? "Bovine" : data.species}</td>
              </tr>
              <tr>
                <td><strong>Precise Location:</strong></td>
                <td>${movArr[index].cph}</td>
              </tr>
              <tr>
                <td><strong>Precise Location Type:</strong></td>
                <td>${movArr[index].type}</td>
              </tr>
              <tr>
                <td><strong>OS Map Reference:</strong></td>
                <td>${movArr[index].os_map_ref}</td>
              </tr>
              <tr>
                <td><strong>Submission:</strong></td>
                <td>${data.submission}</td> 
              </tr>
              <tr>
                <td><strong>County:</strong></td>
                <td>${movArr[index].county}</td>
              </tr>
              <tr>
                <td><strong>Clade:</strong></td>
                <td>${data.clade}</td>
              </tr>
              <tr>
                <td><strong>Out of Home Range:</strong></td>
                <td>${data.out_of_homerange === "N" ? "No" : "Yes"}</td>
              </tr>
              <tr>
                <td><strong>Risk Area:</strong></td>
                <td>${movArr[index].risk_area_current}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="tab-pane fade show" id="navInfoContent${index}${lineIndex}" role="tabpanel" aria-labelledby="navInfo" tabindex="0">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td><strong>Birth Location:</strong></td>
                <td>${movArr[0].cph}</td>
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
                <td><strong>Sex:</strong></td>
                <td>${
                  data.sex == `F`
                    ? `Female`
                    : data.sex == `M`
                    ? `Male`
                    : `Unknown`
                }</td>
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

  // Custom popup options (https://leafletjs.com/reference.html#popup)
  const samplePopupOptions = {
    maxWidth: 400, // in pixels
    className: "cattlePopup",
    autoClose: false,
    closeOnClick: false,
  };

  //Icons legend
  const CattleIconsLegend = () => {
    const map = useMap();
    useEffect(() => {
      const cattleIconsLegend = L.control({ position: "topright" });

      cattleIconsLegend.onAdd = () => {
        const div = L.DomUtil.create("div", "leaflet-control leaflet-bar");
        div.insertAdjacentHTML(
          "afterbegin",
          `<div class="icons-legend"> <span class="fs-6" style="padding-left:6px;"><strong>Legend</strong></span>
            <span style="display: flex; align-items: center;">
            <img src=${holdingImg} class="legend-marker-img">
            <span>Holding</span>
          </span>
          <span style="display: flex; align-items: center;">
          <img src=${marketImg} class="legend-marker-img">
          <span>Market</span>
        </span>
        <span style="display: flex; align-items: center;">
        <img src=${showgroundImg} class="legend-marker-img">
        <span>Showground</span>
        </span>
        <span style="display: flex; align-items: center;">
      <img src=${slaughterhouseImg} class="legend-marker-img">
      <span>Slaughterhouse</span>
      </span>
      <span style="display: flex; align-items: center;">
      <img src=${movementClusterImg} class="legend-marker-img">
      <span>Movement cluster</span>
      </span>
      <span style="display: flex; align-items: center;">
      <svg style="margin-left: 5px;" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0096FF" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <span  style="padding-left:10px;">Cattle movement lines</span>
    </span>
          </div>`
        );
        return div;
      };
      cattleIconsLegend.addTo(map);
      // Cleanup function to remove the legend when the component unmounts
      return () => {
        map.removeControl(cattleIconsLegend);
      };
    });
  };

  // Leaflet polylineDecorator patterns
  const createArrowPattern = (color) => [
    {
      repeat: 100,
      symbol: L.Symbol.arrowHead({
        pixelSize: 15,
        polygon: true,
        pathOptions: {
          stroke: true,
          color: color,
        },
      }),
    },
  ];
  //
  const firstMovArrow = createArrowPattern("#0096FF");
  const secondMovArrow = createArrowPattern("#cb181d");

  //Function for movement lines, arrows, and map bounds
  const PolylineDecorator = ({ patterns, color, position }) => {
    const map = useMap();
    const prevPolylineRef = useRef(null);
    const prevDecoratorsRef = useRef([]);

    useEffect(() => {
      if (!map) return;

      //Create new polyline & decorators and add it to the map
      const polyline = L.polyline(position, {
        color,
      }).addTo(map);
      const decorators = L.polylineDecorator(polyline, {
        patterns,
      }).addTo(map);

      // Update prevPolylineRef & prevDecoratorsRef values to the current polyline & decorators values
      prevPolylineRef.current = polyline;
      prevDecoratorsRef.current = decorators;

      // Remove previous polyline and decorators on component re-render (new sample search)
      return () => {
        if (prevPolylineRef.current) {
          map.removeLayer(prevPolylineRef.current);
          map.removeLayer(prevDecoratorsRef.current);
        }
      };
    });
  };

  return (
    <MapContainer center={[53.3781, -1]} zoom={6}>
      <HotspotLayers isChecked={useCountyandHotspotLayers["hotspotLayers"]} />
      <CountyLayers isChecked={useCountyandHotspotLayers["countyLayers"]} />
      {Object.keys(checkedLayers).length > 0 && <RiskLayers checkedLayers={checkedLayers} />}
      <BaseMaps />
      <FitMapToBounds jsonData={jsonData} secondJsonData={secondJsonData} />
      <ResetView />
      <HideSidebar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />
      <MeasurementTool />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer
      attribution="Esri WorldImagery"
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      /> */}
      {/* <LayersControl position="topright">
      <LayersControl.Overlay name="Marker with popup"> */}
      <CattleIconsLegend />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
        maxClusterRadius={0}
      >
        {linePts.map((position, index) => (
          <Marker
            ref={(ref) =>
              ref?.bindPopup(
                popupContent(jsonData, movArr, index, `firstMov-${index}`),
                samplePopupOptions
              )
            }
            key={`firstMov-${index}`}
            position={position}
            icon={renderIcon(movArr[index])}
          >
            <PolylineDecorator
              key={`decorator-${index}`}
              patterns={firstMovArrow}
              color={"#0096FF"}
              position={linePts}
            />
          </Marker>
        ))}
      </MarkerClusterGroup>
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
        maxClusterRadius={0}
      >
        {secondLinePts.map((position, index) => (
          <Marker
            ref={(ref) =>
              ref?.bindPopup(
                popupContent(
                  secondJsonData,
                  secondMovArr,
                  index,
                  `secondMov-${index}`
                ),
                samplePopupOptions
              )
            }
            key={`secondMov-${index}`}
            position={position}
            icon={renderIcon(secondMovArr[index])}
          >
            <PolylineDecorator
              key={`second-decorator-${index}`}
              patterns={secondMovArrow}
              color={"#cb181d"}
              position={secondLinePts}
            />
          </Marker>
        ))}
      </MarkerClusterGroup>
      {/* </LayersControl.Overlay>
            </LayersControl> */}
    </MapContainer>
  );
};
//Function to zoom in on the markers and add padding so all points visible
const FitMapToBounds = ({ jsonData, secondJsonData }) => {
  const map = useMap();
  const firstLatLon = Object.values(jsonData.move).map((arr) => [
    arr.lat,
    arr.lon,
  ]);
  const secondLatLon = secondJsonData.move
    ? Object.values(secondJsonData.move).map((arr) => [arr.lat, arr.lon])
    : [];
  const combinedLatLon = [...firstLatLon, ...secondLatLon];
  useEffect(() => {
    map.fitBounds(L.latLngBounds(combinedLatLon).pad(0.1));
  }, [jsonData, secondJsonData]);
  return <></>;
};
export default CattleMovementMap;
