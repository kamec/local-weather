import { useState, useEffect } from 'react';
import type { Weather } from '../types/weather';
import { getUserLocation } from '../services/geolocation';
import { getWeatherByCoordinates, getWeatherByCity } from '../services/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const coords = await getUserLocation();
      const weatherData = await getWeatherByCoordinates(coords);

      setWeather(weatherData);
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

      const weatherData = await getWeatherByCity(city);
      setWeather(weatherData);
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
    loading,
    error,
    refetch: fetchWeatherByLocation,
    searchCity: fetchWeatherByCity,
  };
};
