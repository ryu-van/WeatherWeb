import React from "react";
import menuIcon from "../assets/icons8-menu.svg";
import searchIcon from '../assets/icons8-search.svg';

const WeatherHeader = ({ openSettings, setOpenSettings }) => {
  return (
    <header className="weather-header">
      <h4 className="weather-title">Ryu Weather</h4>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
        />
        <button className="search-button">
          <img src={searchIcon} alt="" />
        </button>
      </div>
      <button
        className={`menu ${openSettings ? "is-open" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={openSettings}
        onClick={() => setOpenSettings((v) => !v)}
      >
        <img src={menuIcon} className="menu-icon" alt="" aria-hidden="true" />
      </button>
    </header>
  );
};
export default WeatherHeader;
