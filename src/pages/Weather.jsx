import React, { useState } from "react";
import "./Weather.css";
import SettingDialog from "../components/SettingDialog";
import WeatherHeader from "../layouts/WeatherHeader";

const Weather = () => {
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <div className="weather-app">
      <WeatherHeader
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
      />
      <SettingDialog
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      ></SettingDialog>
    </div>
  );
};

export default Weather;
