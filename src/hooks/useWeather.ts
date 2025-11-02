import { useState, useEffect } from 'react';
import type { Weather } from '../types/weather';
import { getUserLocation } from '../services/geolocation';
import { getWeatherByCoordinates } from '../services/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
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
  }

  useEffect(() => {
    fetchWeather()
  }, []);

  return { weather, loading, error, refetch: fetchWeather };
}