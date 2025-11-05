import type { Weather, WeatherApiResponse, Coordinates, ForecastApiResponse, ForecastDay, ForecastItem } from '../types/weather';

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

const processForecastData = (data: ForecastApiResponse): ForecastDay[] => {
  const dailyData = new Map<string, ForecastItem[]>();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];

    if (!dailyData.has(date)) {
      dailyData.set(date, []);
    }
    dailyData.get(date)!.push(item);
  });

  const forecast: ForecastDay[] = [];

  dailyData.forEach((items, date) => {
    const temps = items.map(item => item.main.temp);
    const tempMin = Math.round(Math.min(...temps));
    const tempMax = Math.round(Math.max(...temps));

    const middleItem = items[Math.floor(items.length / 2)];

    forecast.push({
      date: date,
      tempMin: tempMin,
      tempMax: tempMax,
      icon: middleItem.weather[0].icon,
      description: middleItem.weather[0].description,
    });
  });

  return forecast.slice(0, 5);
};
export const getForecastByCoordinates = async (coords: Coordinates): Promise<ForecastDay[]> => {
  const { lat, lon } = coords;
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch forecast data');

  const data: ForecastApiResponse = await response.json();
  return processForecastData(data);
};

export const getForecastByCity = async (city: string): Promise<ForecastDay[]> => {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`;

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) throw new Error('City not found');
    throw new Error('Failed to fetch forecast data');
  }

  const data: ForecastApiResponse = await response.json();
  return processForecastData(data);
};
