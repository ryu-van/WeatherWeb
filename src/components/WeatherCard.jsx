import React from "react";
import { useTranslation } from 'react-i18next';
import locationIcon from "../assets/icons8-location-48.png";
import "../components/WeatherCard.css";
import sunriseIcon from "../assets/icons8-sunrise-100.png";
import sunsetIcon from "../assets/icons8-sunset-64.png";
import { formatTemperature, formatTime, getWeatherIcon } from "../utils/weatherUtil";
import * as LucideIcons from "lucide-react";
import { Eye, Wind, Droplets, Gauge, Thermometer } from "lucide-react";

const WeatherCard = ({weather,unit}) => {
  const { t } = useTranslation();
  const iconName = getWeatherIcon(weather.weather[0]);
  const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;
  const WeatherStats =[
    {
      icon: Eye,
      label: t('weather.visibility'),
      value: `${(weather.visibility/1000).toFixed(1)}km`,
      color: "#93c5fd",
    },
    {
      icon: Wind,
      label: t('weather.wind_speed'),
      value: `${weather.wind.speed.toFixed(1)} m/s`,
      color: "#86efac",
    },
    {
      icon: Droplets,
      label: t('weather.humidity'),
      value: `${weather.main.humidity}%`,
      color: "#67e8f9",
    },
    {
      icon: Gauge,
      label: t('weather.pressure'),
      value: `${weather.main.pressure} hPa`,
      color: "#d8b4fe",
    },
    {
      icon: Thermometer,
      label: t('weather.feels_like'),
      value: `${formatTemperature(weather.main.feels_like,unit)}°${unit}`,
      color: "#fdba74"
    },
  ]

  


  return (
    <div className="current-weather">
      <div className="header-current-weather">
        <div className="left-info">
          <div className="location-icon">
            <img src={locationIcon} alt="" />
          </div>
          <div className="weather-sub">
            <h2>{weather.name}</h2>
            <p>{weather.sys.country}</p>
          </div>
        </div>
        <div className="right-info">
          <div className="days">{new Date(weather.dt * 1000).toLocaleDateString("en-US",{
            weekday: "long",
            month: "short",
            day: "numeric"
          })}</div>
          <div className="hours">
           {new Date(weather.dt * 1000).toLocaleTimeString("en-US",{
            hour:"2-digit",
            minute:"2-digit"
          })}
          </div>
        </div>
      </div>
      <div className="main-weather">
        <div className="temp-info">
          <div className="main-temp">{formatTemperature(weather.main.temp, unit)}° <span>{unit}</span></div>
          <div className="weather-description">{weather.weather[0].description}</div>
          <div className="temp-diff">
            <span>H: {formatTemperature(weather.main.temp_max,unit)}°</span>
            <span>L: {formatTemperature(weather.main.temp_min,unit)}°</span>
          </div>
        </div>
        <div className="weather-icon"><IconComponent size={20}/></div>
      </div>
      <div className="weather-stats-grid">
        {WeatherStats.map((stat, index) => {
            return (
                <div className="weather-stat-card" key={index}>
                    <div className="weather-stat-header">
                        <div className="weather-stat-icon">
                            <stat.icon style={{color: stat.color}}/>
                        </div>
                        <span className="weather-stat-label">{stat.label}</span>
                    </div>
                    <div className="weather-stats-value">
                        {stat.value}
                    </div>
                </div>
            )
        })}
    
      </div>
     <div className="sun-time-grid">
  <div className="sun-time-card sunrise">
    <div className="sun-time-header">
      <div className="sun-time-icon">
        <img src={sunriseIcon} alt="Sunrise" />
      </div>
      <span className="sun-time-label">Sunrise</span>
    </div>
    <div className="sun-time-value">
      {formatTime(weather.sys.sunrise)}
    </div>
  </div>

  <div className="sun-time-card sunset">
    <div className="sun-time-header">
      <div className="sun-time-icon">
        <img src={sunsetIcon} alt="Sunset" />
      </div>
      <span className="sun-time-label">Sunset</span>
    </div>
    <div className="sun-time-value">
      {formatTime(weather.sys.sunset)}
    </div>
  </div>
</div>

    </div>
  );
};
export default WeatherCard;
