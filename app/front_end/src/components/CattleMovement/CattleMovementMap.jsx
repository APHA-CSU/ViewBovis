import { MapContainer, TileLayer} from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
// import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";

const CattleMovementMap = () => {
  return (
    <MapContainer center={[53.3781, -1]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    </MapContainer>
    
  );
};

export default CattleMovementMap;