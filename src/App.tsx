import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePokemonCatalog } from './hooks/usePokemonCatalog';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { PageLoader, SkeletonCard } from './components/Loaders';

type DisplayLayout = 'grid' | 'list';

const GRID_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

/* ── Ícone Grid ── */
const IconGrid = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

/* ── Ícone Lista ── */
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

const App: React.FC = () => {
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

  // Infinite scroll via IntersectionObserver
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

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-dvh flex flex-col bg-pokebg">
      <Header total={total} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">

        {/* ── Toolbar: Search + toggle ── */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex-1">
            <SearchBar
              onSearch={handleSearch}
              onClear={clearSearch}
              searching={searching}
              searchQuery={searchQuery}
            />
          </div>

          {/* Toggle Grid / Lista */}
          <div className="flex items-center gap-1 bg-pokesurface border border-pokeborder rounded-2xl p-1 self-center">
            <button
              onClick={() => setDisplayLayout('grid')}
              title="Visualização em grade"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-body transition-all ${
                displayLayout === 'grid'
                  ? 'bg-pokered text-white shadow'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <IconGrid />
              <span className="hidden sm:inline">Grade</span>
            </button>
            <button
              onClick={() => setDisplayLayout('list')}
              title="Visualização em lista"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-body transition-all ${
                displayLayout === 'list'
                  ? 'bg-pokered text-white shadow'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <IconList />
              <span className="hidden sm:inline">Lista</span>
            </button>
          </div>
        </div>

        {/* Contagem */}
        <div className="flex items-center justify-between mb-5">
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

        {/* Erro de busca */}
        {searchError && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">😵</p>
            <p className="font-body text-red-400 font-bold">{searchError}</p>
            <button
              onClick={clearSearch}
              className="mt-4 font-body text-pokeyellow text-sm underline hover:no-underline"
            >
              Voltar ao catálogo
            </button>
          </div>
        )}

        {/* Erro geral */}
        {error && !searchError && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">⚡</p>
            <p className="font-body text-red-400 font-bold">{error}</p>
          </div>
        )}

        {/* ── GRID ── */}
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

        {/* ── LISTA ── */}
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

        {/* Skeletons carregando mais */}
        {loadingMore && (
          <div className={`mt-4 ${displayLayout === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4'
            : 'flex flex-col gap-2'}`}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Buscando (API fallback) */}
        {searching && (
          <div className="text-center py-8">
            <p className="font-body text-white/40 text-sm animate-pulse">Buscando na Pokédex...</p>
          </div>
        )}

        {/* Sentinel de infinite scroll */}
        {!searchQuery && <div ref={sentinelRef} className="h-10 mt-4" />}

        {/* Fim da lista */}
        {!hasMore && !searchQuery && pokemons.length > 0 && (
          <div className="text-center py-8">
            <p className="font-pokemon text-xs text-white/20">Você os capturou todos!</p>
          </div>
        )}
      </main>

      <Footer />

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

export default App;

