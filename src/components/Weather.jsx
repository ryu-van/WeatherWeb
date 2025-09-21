import React, { useEffect, useState } from "react";
import "./Weather.css";
import menuIcon from "../../src/assets/icons8-menu.svg";
import searchIcon from "../../src/assets/icons8-search.svg";
import ash from "../weather-image/ash.jpg";
import SettingDialog from "./SettingDialog";
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatLocalDateTime = (w) => {
    if (!w || typeof w.dt !== "number" || typeof w.timezone !== "number") {
      return { time: "", date: "" };
    }

    const localTs =
      (w.dt + w.timezone - new Date().getTimezoneOffset() * 60) * 1000;
    const local = new Date(localTs);

    const hh = local.getHours();
    const mm = String(local.getMinutes()).padStart(2, "0");
    const ampm = hh >= 12 ? "pm" : "am";
    const time = `${hh % 12 || 12}:${mm} ${ampm}`;
    const date = local.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return { time, date };
  };

  useEffect(() => {
    const run = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const apiKey = "0a45ef6b97c3ba6ef305e8742bff57a2";
                const response = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=vi`
                );
                const data = await response.json();
                if (response.ok) {
                  setWeather(data);
                } else {
                  setError(data?.message || "Không thể lấy dữ liệu thời tiết");
                }
              } catch {
                setError("Không thể lấy dữ liệu thời tiết");
              } finally {
                setLoading(false);
              }
            },
            () => {
              setError("Vui lòng cho phép truy cập vị trí để xem thời tiết");
              setLoading(false);
            }
          );
        } else {
          setError("Trình duyệt của bạn không hỗ trợ đinh vị");
          setLoading(false);
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    run();
  }, []);
  const { time, date } = formatLocalDateTime(weather);

  return (
    <div className="weather-app">
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
        <div className="menu">
          <img src={menuIcon} className="menu-icon" alt="menu" />
        </div>
      </header>
      <main className="weather-main">
        <section className="weather-banner">
          <div className="banner-image">
            <img src={ash} alt="" />
            <div className="banner-info">
              <h3 className="tempature-info">
                {weather?.main?.temp != null
                  ? Math.round(weather.main.temp)
                  : "--"}
                <span className="tempature-unit">°C</span>
              </h3>
              <h4 className="city-info">{weather?.name || (loading ? "Loading..." : "Unknown")}</h4>
            </div>
            <div className="banner-time">
              <h4 className="hours-info">{time || (loading ? "…" : "")}</h4>
              <span className="date-info">{date || (loading ? "…" : "")}</span>
            </div>
          </div>
        </section>
        <section className="weather-info">
          <card className="left-info"></card>
          <card className="right-info"></card>
        </section>
      </main>
    </div>
  );
};
export default Weather;
