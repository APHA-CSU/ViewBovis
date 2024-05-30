import  properties  from "../data/riskAreas.json";

class LoadAreasTask {
  load = (setState) => {
    setState(properties);
  };
}

export default LoadAreasTask;

