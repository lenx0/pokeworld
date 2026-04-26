import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  searching: boolean;
  searchQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear, searching, searchQuery }) => {
  const [value, setValue] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce live search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      onClear();
      return;
    }
    debounceRef.current = setTimeout(() => {
      onSearch(value.trim());
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim()) onSearch(value.trim());
  };

  const handleClear = () => {
    setValue('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto">
      <div className="relative flex items-center">
        {/* Ícone */}
        <div className="absolute left-4 text-white/40 pointer-events-none">
          {searching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#CC0000" strokeWidth="8" />
                <rect x="6" y="44" width="88" height="12" fill="#CC0000" />
                <circle cx="50" cy="50" r="16" fill="white" stroke="#CC0000" strokeWidth="6" />
              </svg>
            </motion.div>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Buscar por nome ou número..."
          className="w-full bg-pokesurface border border-pokeborder rounded-2xl py-3 pl-12 pr-20 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:border-pokeyellow/60 focus:ring-1 focus:ring-pokeyellow/30 transition-all"
        />

        {(value || searchQuery) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 text-white/40 hover:text-white/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="absolute right-3 bg-pokered hover:bg-red-700 text-white text-xs font-bold font-body px-3 py-1.5 rounded-xl transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

