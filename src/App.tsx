import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { WeatherCard } from './components/WeatherCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import type { TemperatureUnit } from './types/weather';

function App() {
  const { weather, forecast, loading, error, refetch, searchCity } = useWeather();
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  if (loading && !weather) {
    return <LoadingSpinner />;
  }

  if (error && !weather) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  if (!weather) {
    return <ErrorMessage error="No weather data available" onRetry={refetch} />;
  }

  return (
    <>
      <WeatherCard
        weather={weather}
        forecast={forecast}
        onRefresh={refetch}
        onSearch={searchCity}
        isLoading={loading}
        temperatureUnit={temperatureUnit}
        onToggleUnit={toggleTemperatureUnit}
      />
    </>
  );
}

export default App;
