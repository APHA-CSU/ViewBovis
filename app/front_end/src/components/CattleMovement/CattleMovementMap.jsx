import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";
import { Icon, divIcon, icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Tab, Nav } from "react-bootstrap";
import holdingImg from "../../imgs/holding.svg";
import showgroundImg from "../../imgs/showground.svg";
import marketImg from "../../imgs/market.svg";
import slaughterhouseImg from "../../imgs/slaughterhouse.svg";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-polylinedecorator";

const CattleMovementMap = ({ jsonData }) => {
  // Check if jsonData is null or undefined, return null or a loading indicator until data is fetched
  if (!jsonData || Object.keys(jsonData).length === 0) {
    return null;
  }

  // Extract movement data from json object into an array
  const movArr = Object.values(jsonData.move);
  const linePts = movArr.map((arr) => [arr.lat, arr.lon]);

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

  // Leaflet polylineDecorator patterns
  const arrow = [
    {
      repeat: 100,
      symbol: L.Symbol.arrowHead({
        pixelSize: 15,
        polygon: true,
        pathOptions: { stroke: true },
      }),
    },
  ];

  //Function for movement lines, arrows, and map bounds
  const PolylineDecorator = ({ patterns, color, position }) => {
    const map = useMap();
    const prevPolylineRef = useRef(null);
    const prevDecoratorsRef = useRef([]);

    useEffect(() => {
      if (!map) return;

      //Create new polyline & decorators and add it to the map
      const polyline = L.polyline(position, { color }).addTo(map);
      const decorators = L.polylineDecorator(polyline, { patterns }).addTo(map);

      // Get the bounds of the polyline & fit the map to the polyline bounds
      const bounds = polyline.getBounds();
      map.fitBounds(bounds);

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
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {linePts.map((position, index) => (
          <Marker
            key={index}
            position={position}
            icon={renderIcon(movArr[index])}
          >
            <Popup>
              <div className="fs-5 fw-bold">{jsonData.identifier}</div>
              <br />
              <div>
                <Tab.Container id="popupTabs" defaultActiveKey="summary">
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="summary" title="Summary">
                        Summary
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="animal" title="Animal">
                        Animal
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="summary">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Movement:</strong>
                            </td>
                            <td>{`${index + 1} of ${movArr.length}`}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Duration of Stay:</strong>
                            </td>
                            <td>
                              {movArr[index].stay_length <= 30
                                ? `${movArr[index].stay_length} days`
                                : movArr[index].stay_length > 30 &&
                                  movArr[index].stay_length <= 365
                                ? `${(movArr[index].stay_length / 7).toFixed(
                                    0
                                  )} weeks`
                                : `${(movArr[index].stay_length / 365).toFixed(
                                    1
                                  )} years`}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Date of Arrival:</strong>
                            </td>
                            <td>{movArr[index].on_date}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Date of Departure:</strong>
                            </td>
                            <td>{movArr[index].off_date}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Species:</strong>
                            </td>
                            <td>
                              {jsonData.species === "COW"
                                ? "Bovine"
                                : jsonData.species}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Precise Location:</strong>
                            </td>
                            <td>{movArr[index].cph}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Precise Location Type:</strong>
                            </td>
                            <td>{movArr[index].type}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>OS Map Reference:</strong>
                            </td>
                            <td>{movArr[index].os_map_ref}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Submission:</strong>
                            </td>
                            <td>{jsonData.submission}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>County:</strong>
                            </td>
                            <td>{movArr[index].county}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Clade:</strong>
                            </td>
                            <td>{jsonData.clade}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Out of Home Range:</strong>
                            </td>
                            <td>
                              {jsonData.out_of_homerange === "N" ? "No" : "Yes"}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Risk Area:</strong>
                            </td>
                            <td>{movArr[index].risk_area_current}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="animal">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Birth Location:</strong>
                            </td>
                            <td>{movArr[0].cph}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Date of Birth:</strong>
                            </td>
                            <td>{jsonData.dob}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Slaughter Date:</strong>
                            </td>
                            <td>{jsonData.slaughter_date}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Sex:</strong>
                            </td>
                            <td>
                              {jsonData.sex == `F`
                                ? `Female`
                                : jsonData.sex == `M`
                                ? `Male`
                                : `Unknown`}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Disclosing Test Type:</strong>
                            </td>
                            <td>{jsonData.disclosing_test}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Import Country:</strong>
                            </td>
                            <td>
                              {jsonData.import_country == null
                                ? `British`
                                : `${jsonData.import_country}`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Popup>
            <PolylineDecorator
              key={`decorator-${index}`}
              patterns={arrow}
              color={"#0096FF"}
              position={linePts}
            />
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* </LayersControl.Overlay>
            </LayersControl> */}
    </MapContainer>
  );
};

export default CattleMovementMap;
