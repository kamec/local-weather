import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export const SearchBar = ({ onSearch, disabled }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Search for a city..."
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={disabled || !city.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
    </form>
  );
};
