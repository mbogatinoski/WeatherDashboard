import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./App.css";
import { Navbar, Footer, Sidebar } from "./components";
import {
  Panel,
  Sensors,
  Historical,
  Weather,
  AirQuality,
  Forecast,
  DashboardPanel,
  WeatherForm,
} from "./pages";
import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="flex relative dark:bg-main-dark-bg">
          {/*<div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3
               hover:drop-shadow-xl
                hover:bg-light-grey
                text-white"
                style={{ background: "black", borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>}
          </div>*/}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<DashboardPanel />} />
                <Route path="/panel" element={<DashboardPanel />} />

                {/* Apps */}
                <Route path="/weather" element={<Weather />} />
                <Route path="/notifications" element="Notifications" />

                {/* Charts */}
                <Route path="/Forecast" element={<Forecast />} />
                <Route path="/Historical" element={<Historical />} />
                <Route path="/AirQuality" element={<AirQuality />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
