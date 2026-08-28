import { useState, useEffect } from "react";
import { useConnectionState } from "use-connection-state";
import { SpotRateProvider } from "./context/SpotRateContext";
import { MarketDataProvider } from "./context/MarketDataContext";
import "./App.css";
import TvScreen from "./pages/tvscreenView";
import ErrorPage from "./components/ErrorPage";
import { Route, Routes } from "react-router-dom";
 

function App() {


  return (
    <SpotRateProvider>
      <MarketDataProvider>
        <Routes>
          <Route path="/" element={<TvScreen />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MarketDataProvider>
    </SpotRateProvider>
  );
}

export default App;
