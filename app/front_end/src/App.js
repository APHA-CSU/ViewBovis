import "./App.css";
import Home from "./components/Home/Home";
import CattleMovement from "./components/CattleMovement/CattleMovement";
import SNPMap from "./components/SNPDistance/SNPMap";
import Nextstrain from "./components/Nextstrain/Nextstrain";
import HelpSupport from "./components/HelpSupport/HelpSupport";
import NavbarComp from "./components/Navbar/NavbarComp";
import SecurityModal from "./components/SecurityModal/SecurityModal";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLayers } from "./features/counter/securitySlice";

function App() {
  /* Lazy loading the layers*/
  const dispatch = useDispatch();
  const RiskLayers = lazy(() => import("./components/Layers/RiskLayers"));
  const CountyLayers = lazy(() => import("./components/Layers/CountyLayers"));
  const HotspotLayers = lazy(() => import("./components/Layers/HotspotLayers"));
  const showHelpSupportPage = useSelector(
    (state) => state.security.showHelpSupportPage
  );

  useEffect(() => {
    /* Preload the layers on mount*/
    (async () => {
      await import("./components/Layers/RiskLayers");
      await import("./components/Layers/CountyLayers");
      await import("./components/Layers/HotspotLayers");
      dispatch(setShowLayers(true));
    })();
  }, []);

  return (
    <>
      <SecurityModal />
      <NavbarComp />
      <Home />
      <SNPMap
        RiskLayers={RiskLayers}
        CountyLayers={CountyLayers}
        HotspotLayers={HotspotLayers}
      />
      <CattleMovement
        RiskLayers={RiskLayers}
        CountyLayers={CountyLayers}
        HotspotLayers={HotspotLayers}
      />
      <Nextstrain />
      {showHelpSupportPage && <HelpSupport />}
    </>
  );
}

export default App;
