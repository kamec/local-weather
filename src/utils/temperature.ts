import type { TemperatureUnit } from '../types/weather';

export const convertTemperature = (celsius: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9 / 5) + 32);
  }
  return celsius;
};

export const getTemperatureSymbol = (unit: TemperatureUnit): string => {
  return unit === 'celsius' ? '°C' : '°F';
};
