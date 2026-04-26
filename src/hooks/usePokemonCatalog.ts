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
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
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
    setSearchQuery(query);
    setSearchError(null);
    setSearchResult(null);
    if (!query.trim()) return;
    setSearching(true);
    try {
      const poke = await fetchPokemon(query.toLowerCase().trim());
      setSearchResult(poke);
    } catch {
      setSearchError(`Pokémon "${query}" não encontrado.`);
    } finally {
      setSearching(false);
    }
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
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
    searchResult,
    searching,
    searchError,
    handleSearch,
    clearSearch,
  };
};
