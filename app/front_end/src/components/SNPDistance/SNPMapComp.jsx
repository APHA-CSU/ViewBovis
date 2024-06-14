import { MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { relatedMarker } from "./SNPLayers";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from "leaflet";
import Layers from "../Layers/Layers";

const SNPMapComp = ({SNPMapDataset, checkedLayers}) => {
    //SNP map cluster icon
    const createCustomClusterIcon = (cluster) => {
      return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "cluster-icon",
        iconSize: [30, 30],
      });
    };

  return (
    <MapContainer center={[53.3781, -1]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Layers checkedLayers={checkedLayers}/>
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
      {Object.keys(SNPMapDataset).filter(elem => { 
        return elem !== "SOI" && elem !== SNPMapDataset["SOI"]})
        .map((elem,index) => {
          return <Marker 
          icon={relatedMarker({...SNPMapDataset[elem],submission:elem},SNPMapDataset["SOI"])} 
          key={"snp_related_marker_"+index}
          position={[SNPMapDataset[elem].lat,SNPMapDataset[elem].lon ]}>
          </Marker>
        })}
        </MarkerClusterGroup>
        {Object.keys(SNPMapDataset).filter(elem => { 
        return elem === SNPMapDataset["SOI"]})
        .map((elem,index) => {
          return <Marker 
          icon={relatedMarker({...SNPMapDataset[elem],submission:elem},SNPMapDataset["SOI"])} 
          key={"snp_related_marker_"+index}
          position={[SNPMapDataset[elem].lat,SNPMapDataset[elem].lon ]}>
          </Marker>
        })}
    </MapContainer>
  );
};

export default SNPMapComp;