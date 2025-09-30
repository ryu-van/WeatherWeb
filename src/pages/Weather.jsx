import React, { useState } from "react";
import "./Weather.css";
import SettingDialog from "../components/SettingDialog";
import WeatherHeader from "../layouts/WeatherHeader";
import WeatherCard from "../components/WeatherCard";
import WeatherForecast from "../components/WeatherForecast"
import { useWeather } from "../hooks/useWeather";

const Weather = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const{
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    setUnit
  } = useWeather();
  return (
    <div className="weather-app">
      <WeatherHeader
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
        onSearch={fetchWeatherByCity}
        onLocationSearch={fetchWeatherByLocation}
        unit={unit}
        chooseUnit={setUnit}
        loading={loading}
      />
      <main>
        {loading && (
          <div className="loading-overlay" role="status" aria-live="polite">
            <div className="spinner" />
            <span className="loading-text">Loading...</span>
          </div>
        )}
        {currentWeather && !loading && (
          <>
            <WeatherCard />
            {forecast && <WeatherForecast />}
          </>
        )}

        
      </main>
      <SettingDialog
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      ></SettingDialog>
    </div>
  );
};

export default Weather;
