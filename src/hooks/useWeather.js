import React, { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecast,
  // searchCities,
} from "../services/weatherApi";
export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnits] = useState("C");

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city),
      ]);
      setCurrentWeather(weatherData);
      console.log("Forecast data received:", forecastData);
      setForecast(forecastData);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const { latitude, longitude } = position.coords;
      const weatherData = await getCurrentWeatherByCoords(
        latitude,
        longitude
      );
      setCurrentWeather(weatherData);
      
      const forecastData = await getWeatherForecast(weatherData.name);
      setForecast(forecastData);
      
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data."
      );
    } finally {
      setLoading(false);
    }
  }
  const setUnit = ()=>{
    setUnits((prev)=> prev === "C" ? "F" : "C");
  }
  useEffect(()=>{
    fetchWeatherByCity("Ha Noi");
    // run once on mount
  }, [])

  return {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    setUnit
  }

  
};
