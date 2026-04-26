import { useState, useEffect } from 'react';
import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  EvolutionChainLink,
} from '../types/pokemon';
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from '../services/pokeApi';
import { getPokemonIdFromUrl } from '../utils/pokemonUtils';

export interface EvolutionNode {
  id: number;
  name: string;
  minLevel: number | null;
  trigger: string;
  item: string | null;
}

const flattenChain = (chain: EvolutionChainLink): EvolutionNode[][] => {
  const stages: EvolutionNode[][] = [];

  const traverse = (link: EvolutionChainLink, stage: number) => {
    const id = getPokemonIdFromUrl(link.species.url);
    if (!stages[stage]) stages[stage] = [];
    const detail = link.evolution_details?.[0];
    stages[stage].push({
      id,
      name: link.species.name,
      minLevel: detail?.min_level ?? null,
      trigger: detail?.trigger?.name ?? 'base',
      item: detail?.item?.name ?? detail?.held_item?.name ?? null,
    });
    link.evolves_to.forEach((next) => traverse(next, stage + 1));
  };

  traverse(chain, 0);
  return stages;
};

export const usePokemonDetail = (pokemonId: number | null) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [evolutionStages, setEvolutionStages] = useState<EvolutionNode[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokemonId === null) return;

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      setPokemon(null);
      setSpecies(null);
      setEvolutionChain(null);
      setEvolutionStages([]);

      try {
        const [poke, spec] = await Promise.all([
          fetchPokemon(pokemonId),
          fetchPokemonSpecies(pokemonId),
        ]);

        if (cancelled) return;
        setPokemon(poke);
        setSpecies(spec);

        const chain = await fetchEvolutionChain(spec.evolution_chain.url);
        if (cancelled) return;
        setEvolutionChain(chain);
        setEvolutionStages(flattenChain(chain.chain));
      } catch {
        if (!cancelled) setError('Erro ao carregar dados do Pokémon.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [pokemonId]);

  return { pokemon, species, evolutionChain, evolutionStages, loading, error };
};
