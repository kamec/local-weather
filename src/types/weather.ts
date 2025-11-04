export interface Weather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  city: string;
  country: string;
  windSpeed: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherApiResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };

  name2: '';
}
