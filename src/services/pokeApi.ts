import axios from 'axios';
import type {
  PokemonListResponse,
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  AbilityDetail,
} from '../types/pokemon';

export interface GenerationData {
  id: number;
  name: string;
  main_region: { name: string; url: string };
  version_groups: { name: string; url: string }[];
  pokemon_species: { name: string; url: string }[];
}

const BASE = 'https://pokeapi.co/api/v2';

const api = axios.create({ baseURL: BASE });

export const fetchPokemonList = async (
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> => {
  const { data } = await api.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return data;
};

export const fetchPokemon = async (idOrName: string | number): Promise<Pokemon> => {
  const { data } = await api.get<Pokemon>(`/pokemon/${idOrName}`);
  return data;
};

export const fetchPokemonSpecies = async (idOrName: string | number): Promise<PokemonSpecies> => {
  const { data } = await api.get<PokemonSpecies>(`/pokemon-species/${idOrName}`);
  return data;
};

export const fetchEvolutionChain = async (url: string): Promise<EvolutionChain> => {
  const { data } = await axios.get<EvolutionChain>(url);
  return data;
};

export const fetchAbility = async (url: string): Promise<AbilityDetail> => {
  const { data } = await axios.get<AbilityDetail>(url);
  return data;
};

export const fetchPokemonBatch = async (ids: number[]): Promise<Pokemon[]> => {
  const results = await Promise.allSettled(
    ids.map((id) => api.get<Pokemon>(`/pokemon/${id}`).then((r) => r.data))
  );
  return results
    .filter((r): r is PromiseFulfilledResult<Pokemon> => r.status === 'fulfilled')
    .map((r) => r.value);
};

export const fetchPokemonSpeciesBatch = async (ids: number[]): Promise<PokemonSpecies[]> => {
  const results = await Promise.allSettled(
    ids.map((id) => api.get<PokemonSpecies>(`/pokemon-species/${id}`).then((r) => r.data))
  );
  return results
    .filter((r): r is PromiseFulfilledResult<PokemonSpecies> => r.status === 'fulfilled')
    .map((r) => r.value);
};
