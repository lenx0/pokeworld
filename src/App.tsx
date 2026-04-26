import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePokemonCatalog } from './hooks/usePokemonCatalog';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { PageLoader, SkeletonCard } from './components/Loaders';

const GRID_VARIANTS = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

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
    searchResult,
    searching,
    searchError,
    handleSearch,
    clearSearch,
  } = usePokemonCatalog();

  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!sentinelRef.current || !hasMore || searchQuery || loadingMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '200px' }
    );
    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [hasMore, searchQuery, loadingMore, loadMore]);

  const handleSelectPokemon = useCallback((id: number) => {
    setSelectedPokemonId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemonId(null);
  }, []);

  const displayPokemons = searchQuery
    ? searchResult
      ? [searchResult]
      : []
    : pokemons;

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-dvh flex flex-col bg-pokebg">
      <Header total={total} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {/* Search */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onClear={clearSearch}
            searching={searching}
            searchQuery={searchQuery}
          />
        </div>

        {/* Contagem / status */}
        {!searchQuery && (
          <p className="font-body text-white/30 text-xs mb-5 text-center sm:text-left">
            Exibindo <span className="text-white/60 font-bold">{pokemons.length}</span> de{' '}
            <span className="text-pokeyellow font-bold">{total}</span> Pokémons
          </p>
        )}

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

        {/* Grid */}
        {displayPokemons.length > 0 && (
          <motion.div
            variants={GRID_VARIANTS}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
          >
            <AnimatePresence>
              {displayPokemons.map((poke) => (
                <motion.div key={poke.id} variants={CARD_VARIANTS}>
                  <PokemonCard pokemon={poke} onClick={handleSelectPokemon} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Skeletons enquanto carrega mais */}
        {loadingMore && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Sentinel de infinite scroll */}
        {!searchQuery && (
          <div ref={sentinelRef} className="h-10 mt-4" />
        )}

        {/* Estado sem resultados */}
        {!loading && !searching && searchQuery && !searchResult && !searchError && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-body text-white/50">Buscando Pokémon...</p>
          </div>
        )}

        {/* Fim da lista */}
        {!hasMore && !searchQuery && pokemons.length > 0 && (
          <div className="text-center py-8">
            <p className="font-pokemon text-xs text-white/20">
              Você os capturou todos!
            </p>
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
