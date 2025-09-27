import React, { useState } from "react";
import "./Weather.css";
import SettingDialog from "./SettingDialog";
import WeatherHeader from "../layouts/WeatherHeader";

const Weather = () => {
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <div className="weather-app">
      <WeatherHeader openSettings={openSettings} setOpenSettings={setOpenSettings}/>
      <div className="setting-dialog-overlay">
        <SettingDialog
          open={openSettings}
          onClose={() => setOpenSettings(false)}
        ></SettingDialog>
      </div>
    </div>
  );
};

export default Weather;
