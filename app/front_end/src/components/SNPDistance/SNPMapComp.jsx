import { MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { relatedMarker } from "./SNPLayers";

const SNPMapComp = ({SNPMapDataset}) => {
  return (
    <MapContainer center={[53.3781, -1]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.keys(SNPMapDataset).filter(elem => elem !== "SOI").map((elem,index) => {
          return <Marker icon={relatedMarker({...SNPMapDataset[elem],submission:elem},SNPMapDataset["SOI"])} key={index}
          position={[SNPMapDataset[elem].lat,SNPMapDataset[elem].lon ]}>
          </Marker>
        })}
    </MapContainer>
  );
};

export default SNPMapComp;