import { useWeather } from './hooks/useWeather';
import { WeatherCard } from './components/WeatherCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';


function App() {
  const { weather, loading, error, refetch } = useWeather();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  if (!weather) {
    return <ErrorMessage error="No weather data available" onRetry={refetch} />;
  }

  return <WeatherCard weather={weather} onRefresh={refetch} />;
}

export default App