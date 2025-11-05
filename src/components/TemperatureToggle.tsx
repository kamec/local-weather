import type { TemperatureUnit } from '../types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export const TemperatureToggle = ({ unit, onToggle }: TemperatureToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
      aria-label="Toggle temperature unit"
    >
      <span className={`font-semibold ${unit === 'celsius' ? 'text-blue-600' : 'text-gray-400'}`}>
        °C
      </span>
      <div className="relative w-10 h-6 bg-gray-300 rounded-full">
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            unit === 'fahrenheit' ? 'translate-x-4' : ''
          }`}
        />
      </div>
      <span className={`font-semibold ${unit === 'fahrenheit' ? 'text-blue-600' : 'text-gray-400'}`}>
        °F
      </span>
    </button>
  );
};
