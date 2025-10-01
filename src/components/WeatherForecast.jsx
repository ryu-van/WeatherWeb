import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import calenderIcon from "../assets/icons8-calender-64.png";
import "../components/WeatherForecast.css";
import dropWater from "../assets/water-drop.png";
import * as LucideIcons from "lucide-react";
import { formatTemperature, getWeatherIcon } from '../utils/weatherUtil';

const WeatherForecast = ({forecast, unit}) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    console.log("WeatherForecast component rendered with forecast:", forecast);
  }, [forecast]);
  
  if (!forecast) {
    return <div className="weather-forecasts">{t('weather.loading_forecast')}</div>;
  }
  
  console.log("Forecast data:", forecast);
  
  if (!forecast.list || !Array.isArray(forecast.list) || forecast.list.length === 0) {
    return <div className="weather-forecasts">Không có dữ liệu dự báo. Vui lòng thử lại sau.</div>;
  }
  
  const dailyForecastMap = {};
  
  try {
    console.log("Processing forecast list:", forecast.list);
    
    forecast.list.forEach(item => {
      if (!item || typeof item !== 'object') {
        console.error("Invalid forecast item (null or not an object):", item);
        return; 
      }
      
      if (!item.dt) {
        console.error("Missing dt in forecast item:", item);
        return;
      }
      
      if (!item.main || typeof item.main !== 'object') {
        console.error("Missing main object in forecast item:", item);
        return;
      }
      
      if (!item.weather || !Array.isArray(item.weather) || item.weather.length === 0) {
        console.error("Missing weather array in forecast item:", item);
        return;
      }
      
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!dailyForecastMap[date]) {
        dailyForecastMap[date] = {
          dt: item.dt,
          weather: item.weather,
          main: {
            temp_min: item.main.temp,
            temp_max: item.main.temp
          },
          pop: item.pop || 0
        };
      } else {
        if (item.main.temp < dailyForecastMap[date].main.temp_min) {
          dailyForecastMap[date].main.temp_min = item.main.temp;
        }
        if (item.main.temp > dailyForecastMap[date].main.temp_max) {
          dailyForecastMap[date].main.temp_max = item.main.temp;
        }
        if (item.pop > dailyForecastMap[date].pop) {
          dailyForecastMap[date].pop = item.pop;
        }
      }
    });
    
    console.log("Processed daily forecast map:", dailyForecastMap);
  } catch (error) {
    console.error("Error processing forecast data:", error);
    return <div className="weather-forecasts">Lỗi xử lý dữ liệu dự báo. Vui lòng thử lại.</div>;
  }
  
  if (Object.keys(dailyForecastMap).length === 0) {
    console.error("No valid forecast data after processing");
    return <div className="weather-forecasts">Không có dữ liệu dự báo hợp lệ. Vui lòng thử lại sau.</div>;
  }
  
  const dailyItems = Object.values(dailyForecastMap).slice(0, 5);
  console.log("Final daily items:", dailyItems);

  return (
    <div className='weather-forecasts'>
      <div className='header-forecast'>
        <div className='calender-icon'>
          <img src={calenderIcon} alt="calender-icon" />
        </div>
        <h2>{t('weather.forecast')}</h2>
      </div>
      <div className='main-forecast'>
       {
        dailyItems.map((item,index)=>{
          const iconName = getWeatherIcon(item.weather[0]);
          const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;
          return(
             <div className='forecast-card' key={index}>
          <div className='forecast-left'>
            <div className='forecast-icon'>
              <IconComponent size={40}/>
            </div>
            <div className='forecast-text'>
              <div className='forecast-date'>
                {index === 0 ? "Today" : new Date(item.dt * 1000).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})}
              </div>
              <div className='forecast-desc'>{item.weather[0].description}</div>
            </div>
          </div>
          <div className='forecast-right'>
            <div className='humidity'>
              <img className='humidity-icon' src={dropWater} alt="humidity" />
              <span className='humidity-label'>{Math.round(item.pop* 100)}%</span>
            </div>
            <div className='temps'>
              <div className='temp-value'>{formatTemperature(item.main.temp_max, unit)}°{unit}</div>
              <div className='temp-main'>{formatTemperature(item.main.temp_min, unit)}°{unit}</div>
            </div>
          </div>
        </div>
          )
        })
       }
      </div>
    </div>
  );
}
export default WeatherForecast;
