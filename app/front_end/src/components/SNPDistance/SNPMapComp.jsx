import { MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { relatedMarker } from "./SNPLayers";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from "leaflet";

const SNPMapComp = ({SNPMapDataset}) => {
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
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
      {Object.keys(SNPMapDataset).filter(elem => elem !== "SOI").map((elem,index) => {
          return <Marker 
          icon={relatedMarker({...SNPMapDataset[elem],submission:elem},SNPMapDataset["SOI"])} 
          key={index}
          position={[SNPMapDataset[elem].lat,SNPMapDataset[elem].lon ]}>
          </Marker>
        })}
        </MarkerClusterGroup>
    </MapContainer>
  );
};

export default SNPMapComp;