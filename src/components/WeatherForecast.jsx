import React from 'react';
import calenderIcon from "../assets/icons8-calender-64.png"
import  "../components/WeatherForecast.css"
import dropWater from "../assets/water-drop.png"
const WeatherForecast=() =>{
  return (
    <div className='weather-forecasts'>
      <div className='header-forecast'>
        <div className='calender-icon'>
          <img src={calenderIcon} alt="calender-icon" />
        </div>
        <h2 >5 Day Forecast</h2>
      </div>
      <div className='main-forecast'>
        <div className='forecast-card'>
          <div className='forecast-left'>
            <div className='forecast-icon'>
            </div>
            <div className='forecast-text'>
              <div className='forecast-date'>
              </div>
              <div className='forecast-desc'>weather description</div>
            </div>
          </div>
          <div className='forecast-right'>
            <div className='humidity'>
              <img className='humidity-icon' src={dropWater} alt="humidity" />
              <span className='humidity-label'></span>
            </div>
            <div className='temps'>
              <div className='temp-value'>tempature</div>
              <div className='temp-main'>main temp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeatherForecast;
