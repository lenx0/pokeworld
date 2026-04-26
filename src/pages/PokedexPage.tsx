import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePokemonCatalog } from '../hooks/usePokemonCatalog';
import PokemonCard from '../components/PokemonCard';
import PokemonModal from '../components/PokemonModal';
import SearchBar from '../components/SearchBar';
import { SkeletonCard } from '../components/Loaders';

type DisplayLayout = 'grid' | 'list';

const GRID_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const IconGrid = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconList = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="3.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="3.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="3.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const PokedexPage: React.FC<{ onTotalChange?: (total: number) => void }> = ({ onTotalChange }) => {
  const {
    pokemons,
    loading,
    loadingMore,
    error,
    hasMore,
    total,
    loadMore,
    searchQuery,
    searchResults,
    searching,
    searchError,
    handleSearch,
    clearSearch,
  } = usePokemonCatalog();

  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
  const [displayLayout, setDisplayLayout] = useState<DisplayLayout>('grid');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (onTotalChange && total > 0) onTotalChange(total);
  }, [total, onTotalChange]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!sentinelRef.current || !hasMore || searchQuery || loadingMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: '200px' }
    );
    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, searchQuery, loadingMore, loadMore]);

  const handleSelectPokemon = useCallback((id: number) => setSelectedPokemonId(id), []);
  const handleCloseModal = useCallback(() => setSelectedPokemonId(null), []);

  const displayPokemons = searchQuery ? searchResults : pokemons;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" width="60" height="60">
            <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="#111" strokeWidth="4" />
            <rect x="2" y="46" width="96" height="8" fill="#111" />
            <circle cx="50" cy="50" r="18" fill="white" stroke="#111" strokeWidth="4" />
            <circle cx="50" cy="50" r="8" fill="#CC0000" stroke="#111" strokeWidth="3" />
          </svg>
        </motion.div>
        <p className="font-body text-white/40 text-sm animate-pulse">Carregando Pokédex...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ── Toolbar ── */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1">
          <SearchBar
            onSearch={handleSearch}
            onClear={clearSearch}
            searching={searching}
            searchQuery={searchQuery}
          />
        </div>
        <div className="flex items-center gap-1 bg-pokesurface border border-pokeborder rounded-2xl p-1 self-center">
          <button
            onClick={() => setDisplayLayout('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-body transition-all ${
              displayLayout === 'grid' ? 'bg-pokered text-white shadow' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <IconGrid />
            <span className="hidden sm:inline">Grade</span>
          </button>
          <button
            onClick={() => setDisplayLayout('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-body transition-all ${
              displayLayout === 'list' ? 'bg-pokered text-white shadow' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <IconList />
            <span className="hidden sm:inline">Lista</span>
          </button>
        </div>
      </div>

      {/* ── Count ── */}
      <div className="mb-5">
        {searchQuery ? (
          <p className="font-body text-white/30 text-xs">
            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para{' '}
            <span className="text-pokeyellow font-bold">"{searchQuery}"</span>
          </p>
        ) : (
          <p className="font-body text-white/30 text-xs">
            Exibindo <span className="text-white/60 font-bold">{pokemons.length}</span> de{' '}
            <span className="text-pokeyellow font-bold">{total}</span> Pokémons
          </p>
        )}
      </div>

      {/* Errors */}
      {searchError && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">😵</p>
          <p className="font-body text-red-400 font-bold">{searchError}</p>
          <button onClick={clearSearch} className="mt-4 font-body text-pokeyellow text-sm underline">
            Voltar ao catálogo
          </button>
        </div>
      )}
      {error && !searchError && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">⚡</p>
          <p className="font-body text-red-400 font-bold">{error}</p>
        </div>
      )}

      {/* ── Grid ── */}
      {displayPokemons.length > 0 && displayLayout === 'grid' && (
        <motion.div
          variants={GRID_VARIANTS}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
        >
          <AnimatePresence>
            {displayPokemons.map((poke) => (
              <motion.div key={poke.id} variants={CARD_VARIANTS}>
                <PokemonCard pokemon={poke} onClick={handleSelectPokemon} layout="grid" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Lista ── */}
      {displayPokemons.length > 0 && displayLayout === 'list' && (
        <motion.div
          variants={GRID_VARIANTS}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2"
        >
          <AnimatePresence>
            {displayPokemons.map((poke) => (
              <motion.div key={poke.id} variants={CARD_VARIANTS}>
                <PokemonCard pokemon={poke} onClick={handleSelectPokemon} layout="list" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Skeletons */}
      {loadingMore && (
        <div className={`mt-4 ${displayLayout === 'grid'
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4'
          : 'flex flex-col gap-2'}`}
        >
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {searching && (
        <div className="text-center py-8">
          <p className="font-body text-white/40 text-sm animate-pulse">Buscando na Pokédex...</p>
        </div>
      )}

      {!searchQuery && <div ref={sentinelRef} className="h-10 mt-4" />}

      {!hasMore && !searchQuery && pokemons.length > 0 && (
        <div className="text-center py-8">
          <p className="font-pokemon text-xs text-white/20">Você os capturou todos!</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedPokemonId !== null && (
          <PokemonModal
            key={selectedPokemonId}
            pokemonId={selectedPokemonId}
            onClose={handleCloseModal}
            onSelectPokemon={handleSelectPokemon}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PokedexPage;
