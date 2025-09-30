import React from "react";
import locationIcon from "../assets/icons8-location-48.png";
import "../components/WeatherCard.css";
import sunriseIcon from "../assets/icons8-sunrise-100.png"
import sunsetIcon from "../assets/icons8-sunset-64.png"

const WeatherCard = () => {
  return (
    <div className="current-weather">
      <div className="header-current-weather">
        <div className="left-info">
          <div className="location-icon">
            <img src={locationIcon} alt="" />
          </div>
          <div className="weather-sub">
            <h2>Weather name</h2>
            <p>Weather country</p>
          </div>
        </div>
        <div className="right-info">
          <div className="days">{/* display time days */} tus.24,2023</div>
          <div className="hours">
            {/* display time hour and am or pm */}4:55 pm
          </div>
        </div>
      </div>
      <div className="main-weather">
        <div className="temp-info">
          <div className="main-temp">main-temp</div>
          <div className="weather-description">weather description</div>
          <div className="temp-diff">
            <span>max temp</span>
            <span>min temp</span>
          </div>
        </div>
        <div className="weather-icon">display icon</div>
      </div>
      <div className="weather-stats-grid">
        <div className="weather-stat-card">
          <div className="weather-stat-header">
            <div className="weather-stat-icon">
            </div>
            <span className="weather-stat-label">stats label</span>
          </div>
          <div className="weather-stats-value">
            stats value
          </div>
        </div>
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
      06:12 AM
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
      05:45 PM
    </div>
  </div>
</div>

    </div>
  );
};
export default WeatherCard;
