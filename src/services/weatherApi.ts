import type { Weather, WeatherApiResponse, Coordinates } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCoordinates = async (
  coords: Coordinates,
): Promise<Weather> => {
  const { lat, lon } = coords;
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data: WeatherApiResponse = await response.json();

  return {
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
    country: data.sys.country,
    windSpeed: data.wind.speed,
  };
};

export const getWeatherByCity = async (city: string): Promise<Weather> => {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }

  const data: WeatherApiResponse = await response.json();

  return {
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
    country: data.sys.country,
    windSpeed: data.wind.speed,
  };
};
