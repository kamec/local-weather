import type { Weather } from '../types/weather';
import { SearchBar } from './SearchBar';

interface WeatherCardProps {
  weather: Weather;
  onRefresh: () => void;
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export const WeatherCard = ({ weather, onRefresh, onSearch, isLoading }: WeatherCardProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Search Bar */}
        <SearchBar onSearch={onSearch} disabled={isLoading} />

        {/* Location */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {weather.city}
            ,
            {weather.country}
          </h1>
        </div>

        {/* Weather Icon & Temperature */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={iconUrl}
            alt={weather.description}
            className="w-32 h-32"
          />
          <div className="text-6xl font-bold text-gray-800">
            {weather.temp}
            °C
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 capitalize">
            {weather.description}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Feels like
            {' '}
            {weather.feels_like}
            °C
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-2xl font-semibold text-gray-800">
              {weather.humidity}
              %
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-2xl font-semibold text-gray-800">
              {weather.windSpeed}
              {' '}
              m/s
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="text-2xl font-semibold text-gray-800">
              {weather.pressure}
              {' '}
              hPa
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">Feels Like</p>
            <p className="text-2xl font-semibold text-gray-800">
              {weather.feels_like}
              °C
            </p>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Use My Location
        </button>
      </div>
    </div>
  );
};
