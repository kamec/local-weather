import type { ForecastDay, TemperatureUnit } from '../types/weather';
import { convertTemperature, getTemperatureSymbol } from '../utils/temperature';

interface ForecastCardProps {
  day: ForecastDay;
  temperatureUnit: TemperatureUnit;
}

export const ForecastCard = ({ day, temperatureUnit }: ForecastCardProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
  const tempSymbol = getTemperatureSymbol(temperatureUnit);

  const displayTempMin = convertTemperature(day.tempMin, temperatureUnit);
  const displayTempMax = convertTemperature(day.tempMax, temperatureUnit);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-blue-50 rounded-xl p-4 min-w-[140px] flex flex-col items-center">

      <p className="text-sm font-semibold text-gray-700 mb-2">
        {formatDate(day.date)}
      </p>

      <img
        src={iconUrl}
        alt={day.description}
        className="w-16 h-16"
      />

      <p className="text-xs text-gray-600 capitalize text-center mb-2">
        {day.description}
      </p>

      <div className="flex gap-2 items-center">
        <span className="text-lg font-bold text-gray-800">
          {displayTempMax}
          {tempSymbol}
        </span>
        <span className="text-sm text-gray-500">
          {displayTempMin}
          {tempSymbol}
        </span>
      </div>
    </div>
  );
};
