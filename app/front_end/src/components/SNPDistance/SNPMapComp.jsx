import { MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SNPMapComp = () => {
  return (
    <MapContainer center={[53.3781, -1]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    </MapContainer>
    
  );
};

export default SNPMapComp;