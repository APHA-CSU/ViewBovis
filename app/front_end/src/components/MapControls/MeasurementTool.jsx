import { useEffect } from "react";
import { useMap } from "react-leaflet";
import LinearMeasurement from "../Utilities/L.LinearMeasurement";

const MeasurementTool = () => {
  const map = useMap();

  useEffect(() => {
    const measurementTool = new LinearMeasurement({
      unitSystem: "imperial",
      position: "topleft",
      color: "#FF0080",
      type: "line",
  })
    measurementTool.addTo(map);
    return () => {
      measurementTool.remove();
    };
  });
};
export default MeasurementTool;
