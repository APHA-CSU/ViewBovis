import { MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { relatedMarker } from "./SNPLayers";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from "leaflet";
import RiskLayers from "../Layers/RiskLayers";
import CountyLayers from "../Layers/CountyLayers";

const SNPMapComp = ({SNPMapDataset, checkedLayers, useCountyLayers}) => {
    //SNP map cluster icon
    const createCustomClusterIcon = (cluster) => {
      return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "cluster-icon",
        iconSize: [30, 30],
      });
    };
    const popupContentSNPMap = function(data, AFnumber) {

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
                <td>${data.sex == `F` ? `Female`: data.sex == `M` ? `Male`: `Unknown`}
                </td>
              </tr> 
              <tr>
                <td><strong>Disclosing Test Type:</strong></td>
                <td>${data.disclosing_test}</td>
              </tr> 
              <tr>
                <td><strong>Import Country:</strong></td>
                <td>${data.import_country == null ? 
                  `British`: `${data.import_country}`}</td>
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
      maxHeight: 300
    };

    return (
      <MapContainer center={[53.3781, -1]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CountyLayers isChecked={useCountyLayers}/>
        <RiskLayers checkedLayers={checkedLayers}/>
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
        {Object.keys(SNPMapDataset).filter(elem => { 
          return elem !== "SOI" && elem !== SNPMapDataset["SOI"] })
          .map((elem,index) => {
            return <Marker ref={ref => 
              {ref?.bindPopup(popupContentSNPMap({...SNPMapDataset[elem]},elem),
              popupOptions)}}
            icon={relatedMarker({...SNPMapDataset[elem],submission:elem},
              SNPMapDataset["SOI"])} 
            key={"snp_related_marker_"+index}
            position={[SNPMapDataset[elem].lat,SNPMapDataset[elem].lon ]}>
            </Marker>
          })}
          </MarkerClusterGroup>
          {Object.keys(SNPMapDataset).filter(elem => { 
          return elem === SNPMapDataset["SOI"]})
          .map((elem,index) => {
            return <Marker 
            ref={ref => 
              {{ref?.bindPopup(popupContentSNPMap({...SNPMapDataset[elem]},elem),
              popupOptions)}}}
            icon={relatedMarker({...SNPMapDataset[elem],submission:elem},
              SNPMapDataset["SOI"])} 
            key={"snp_related_marker_"+index}
            position={[SNPMapDataset[elem].lat,SNPMapDataset[elem].lon ]}>
            </Marker>
          })}
      </MapContainer>
    );
};

export default SNPMapComp;