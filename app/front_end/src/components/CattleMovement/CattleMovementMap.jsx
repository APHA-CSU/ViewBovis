import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Tab, Nav } from "react-bootstrap";
import holdingImg from "../../imgs/holding.svg";
import React, { useEffect } from 'react';
import L from 'leaflet'; 
import 'leaflet-polylinedecorator'; 

const CattleMovementMap = ({ jsonData }) => {
  // Check if jsonData is null or undefined, return null or a loading indicator until data is fetched
  if (!jsonData || Object.keys(jsonData).length === 0) {
    return null;
  }

  // Extract movement data from json object into an array
  const movArr = Object.values(jsonData.move);
  const linePts = movArr.map((arr) => [arr.lat, arr.lon]);
  // console.log(movArr);
  const customIcon = new Icon({
    iconUrl: holdingImg,
    iconSize: [40, 40],
    iconAnchor: [20, 35],
  });
 const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "cluster-icon",
      iconSize: [30, 30],
    });
  };

  const arrow = [
    {
      offset: "100%",
      repeat: 0,
      symbol: L.Symbol.arrowHead({
        pixelSize: 15,
        polygon: false,
        pathOptions: { stroke: true }
      })
    }];

const PolylineDecorator = ({ patterns, polyline, color }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;
  
     L.polyline(polyline, {color}).addTo(map);  // added color property
      L.polylineDecorator(polyline, {
        patterns,
        
      }).addTo(map);
    }, [map]);

    return null;
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
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {linePts.map((position, index) => (
          <Marker key={index} position={position} icon={customIcon}>
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
            <Polyline key={index} pathOptions={"blue"} positions={linePts} />
            <PolylineDecorator key={`decorator-${index}`} patterns ={arrow} polyline={position}  color = {modeColor(line.mode)} />
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CattleMovementMap;
