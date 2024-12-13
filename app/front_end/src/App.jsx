import "./App.css";
import Home from "./components/Home/Home.jsx";
import CattleMovement from "./components/CattleMovement/CattleMovement.jsx";
import SNPMap from "./components/SNPDistance/SNPMap.jsx";
import Nextstrain from "./components/Nextstrain/Nextstrain.jsx";
import HelpSupport from "./components/HelpSupport/HelpSupport.jsx";
import NavbarComp from "./components/Navbar/NavbarComp.jsx";
import SecurityModal from "./components/SecurityModal/SecurityModal.jsx";
import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowLayers } from "./features/counter/securitySlice.js";
import CPHSearch from "./components/CPHSearch/CPHSearch.jsx";

function App() {
  /* Lazy loading the layers*/
  const dispatch = useDispatch();
  const SNPMapComp = lazy(() =>
    import("./components/SNPDistance/SNPMapComp.jsx")
  );
  const CattleMovementMap = lazy(() =>
    import("./components/CattleMovement/CattleMovementMap.jsx")
  );
  const RiskLayers = lazy(() => import("./components/Layers/RiskLayers.jsx"));
  const CountyLayers = lazy(() =>
    import("./components/Layers/CountyLayers.jsx")
  );
  const HotspotLayers = lazy(() =>
    import("./components/Layers/HotspotLayers.jsx")
  );

  useEffect(() => {
    /* Preload the layers on mount*/
    (async () => {
      await import("./components/Layers/RiskLayers.jsx");
      await import("./components/Layers/CountyLayers.jsx");
      await import("./components/Layers/HotspotLayers.jsx");
      dispatch(setShowLayers(true));
    })();
  }, []);

  return (
    <>
      <SecurityModal />
      <NavbarComp />
      <Home />
      <CPHSearch />
      <SNPMap
        SNPMapComp={SNPMapComp}
        RiskLayers={RiskLayers}
        CountyLayers={CountyLayers}
        HotspotLayers={HotspotLayers}
      />
      <CattleMovement
        CattleMovementMap={CattleMovementMap}
        RiskLayers={RiskLayers}
        CountyLayers={CountyLayers}
        HotspotLayers={HotspotLayers}
      />
      <Nextstrain />
      <HelpSupport />
    </>
  );
}

export default App;
