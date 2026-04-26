import { useState, useEffect, useCallback, useRef } from 'react';
import type { Pokemon, PokemonListItem } from '../types/pokemon';
import { fetchPokemonList, fetchPokemon } from '../services/pokeApi';
import { getPokemonIdFromUrl } from '../utils/pokemonUtils';

const PAGE_SIZE = 20;

export const usePokemonCatalog = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const cache = useRef<Map<number, Pokemon>>(new Map());

  const loadPage = useCallback(async (currentOffset: number, isFirst: boolean) => {
    try {
      if (isFirst) setLoading(true);
      else setLoadingMore(true);

      const list = await fetchPokemonList(PAGE_SIZE, currentOffset);
      setTotal(list.count);
      setHasMore(list.next !== null);

      const details = await Promise.all(
        list.results.map(async (item: PokemonListItem) => {
          const id = getPokemonIdFromUrl(item.url);
          if (cache.current.has(id)) return cache.current.get(id)!;
          const poke = await fetchPokemon(id);
          cache.current.set(id, poke);
          return poke;
        })
      );

      setPokemons((prev) => (isFirst ? details : [...prev, ...details]));
    } catch {
      setError('Erro ao carregar pokémons. Tente novamente.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPage(0, true);
  }, [loadPage]);

  const loadMore = () => {
    if (!loadingMore && hasMore && !searchQuery) {
      const nextOffset = offset + PAGE_SIZE;
      setOffset(nextOffset);
      loadPage(nextOffset, false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    const q = query.toLowerCase().trim();
    setSearchQuery(q);
    setSearchError(null);
    setSearchResults([]);

    if (!q) return;

    // Partial match on all cached pokémons first (instant)
    const allCached = Array.from(cache.current.values());
    const localMatches = allCached.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        String(p.id) === q
    );

    if (localMatches.length > 0) {
      setSearchResults(localMatches.sort((a, b) => a.id - b.id));
      return;
    }

    // Fall back to API for exact name / ID not yet loaded
    setSearching(true);
    try {
      const poke = await fetchPokemon(q);
      setSearchResults([poke]);
    } catch {
      setSearchError(`Nenhum Pokémon encontrado para "${query}".`);
    } finally {
      setSearching(false);
    }
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
  };

  return {
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
  };
};
