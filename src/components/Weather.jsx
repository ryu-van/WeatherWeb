import React, { useEffect, useState } from "react";
import "./Weather.css";
import menuIcon from "../../src/assets/icons8-menu.svg";
import searchIcon from "../../src/assets/icons8-search.svg";
import ash from "../weather-image/ash.jpg";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
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

  // Format riêng cho sunrise/sunset
  const formatTime = (ts, offset) => {
    if (!ts || typeof offset !== "number") return "";
    const localTs = (ts + offset - new Date().getTimezoneOffset() * 60) * 1000;
    const d = new Date(localTs);
    const hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ampm = hh >= 12 ? "pm" : "am";
    return `${hh % 12 || 12}:${mm} ${ampm}`;
  };

  useEffect(() => {
    const run = async () => {
      try {
        if (!navigator.geolocation) {
          setError("Trình duyệt của bạn không hỗ trợ định vị");
          setLoading(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async ({ coords: { latitude, longitude } }) => {
            try {
              const apiKey = "0a45ef6b97c3ba6ef305e8742bff57a2"; // 🔑 thay bằng key của bạn
              const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=vi`
              );
              const data = await res.json();
              if (!res.ok) throw new Error(data?.message || "Không thể lấy dữ liệu thời tiết");
              setWeather(data);

              try {
                const one = await fetch(
                  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`
                );
                const oneData = await one.json();
                if (one.ok) setUvIndex(oneData?.current?.uvi ?? null);
              } catch {
                setUvIndex(null); 
              }
            } catch (e) {
              setError(e.message || "Không thể lấy dữ liệu thời tiết");
            } finally {
              setLoading(false);
            }
          },
          () => {
            setError("Vui lòng cho phép truy cập vị trí để xem thời tiết");
            setLoading(false);
          }
        );
      } catch (e) {
        setError(e.message || "Đã có lỗi xảy ra");
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
          <input type="text" className="search-input" placeholder="Search city..." />
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
                {weather?.main?.temp != null ? Math.round(weather.main.temp) : "--"}
                <span className="tempature-unit">°C</span>
              </h3>
              <h4 className="city-info">
                {weather?.name || (loading ? "Loading..." : "Unknown")}
              </h4>
            </div>
            <div className="banner-time">
              <h4 className="hours-info">{time || (loading ? "…" : "")}</h4>
              <span className="date-info">{date || (loading ? "…" : "")}</span>
            </div>
          </div>
        </section>

        <section className="weather-info">
          <div className="left-info">
            {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
            {!error && loading && <p style={{ margin: 0 }}>Đang tải dữ liệu…</p>}
            {!loading && !error && weather && (
              <section className="weather-extra">
                <div className="extra-card">
                  <span>
                    <img src="/src/assets/icons8-water-96.png" alt="" /> Humidity
                  </span>
                  <strong>{weather?.main?.humidity}%</strong>
                </div>
                <div className="extra-card">
                  <span>
                    <img src="/src/assets/icons8-sunset-64.png" alt="" /> Sunset
                  </span>
                  <strong>{formatTime(weather?.sys?.sunset, weather?.timezone)}</strong>
                </div>
                <div className="extra-card">
                  <span>
                    <img src="/src/assets/icons8-sun.svg" alt="" /> UV Index
                  </span>
                  <strong>{uvIndex ?? "N/A"}</strong>
                </div>
                <div className="extra-card">
                  <span>
                    <img src="/src/assets/icons8-sunrise-100.png" alt="" /> Sunrise
                  </span>
                  <strong>{formatTime(weather?.sys?.sunrise, weather?.timezone)}</strong>
                </div>
              </section>
            )}
          </div>
          <div className="right-info">{/* thêm nội dung khác ở đây */}</div>
        </section>
      </main>
    </div>
  );
};

export default Weather;
