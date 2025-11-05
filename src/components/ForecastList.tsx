import type { ForecastDay, TemperatureUnit } from '../types/weather';
import { ForecastCard } from './ForecastCard';

interface ForecastListProps {
  forecast: ForecastDay[];
  temperatureUnit: TemperatureUnit;
}

export const ForecastList = ({ forecast, temperatureUnit }: ForecastListProps) => {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        5-Day Forecast
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {forecast.map(day => (
          <ForecastCard
            key={day.date}
            day={day}
            temperatureUnit={temperatureUnit}
          />
        ))}
      </div>
    </div>
  );
};
