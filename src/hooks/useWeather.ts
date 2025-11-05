import { useState, useEffect } from 'react';
import type { Weather, ForecastDay } from '../types/weather';
import { getUserLocation } from '../services/geolocation';
import {
  getWeatherByCoordinates,
  getWeatherByCity,
  getForecastByCoordinates,
  getForecastByCity,
} from '../services/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const coords = await getUserLocation();

      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoordinates(coords),
        getForecastByCoordinates(coords),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
    finally {
      setLoading(false);
    }
  };
  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecastByCity(city),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    refetch: fetchWeatherByLocation,
    searchCity: fetchWeatherByCity,
  };
};
