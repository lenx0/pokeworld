import type { PokemonTypeName } from '../types/pokemon';

export const TYPE_COLORS: Record<PokemonTypeName | string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const TYPE_GRADIENTS: Record<string, string> = {
  normal: 'from-[#A8A878] to-[#C8C8A8]',
  fire: 'from-[#F08030] to-[#FF6B00]',
  water: 'from-[#6890F0] to-[#4A70D8]',
  electric: 'from-[#F8D030] to-[#FFAA00]',
  grass: 'from-[#78C850] to-[#5AA830]',
  ice: 'from-[#98D8D8] to-[#70BCBC]',
  fighting: 'from-[#C03028] to-[#A01018]',
  poison: 'from-[#A040A0] to-[#802080]',
  ground: 'from-[#E0C068] to-[#C0A048]',
  flying: 'from-[#A890F0] to-[#8870D0]',
  psychic: 'from-[#F85888] to-[#D83868]',
  bug: 'from-[#A8B820] to-[#88A800]',
  rock: 'from-[#B8A038] to-[#988020]',
  ghost: 'from-[#705898] to-[#503878]',
  dragon: 'from-[#7038F8] to-[#5018D8]',
  dark: 'from-[#705848] to-[#503828]',
  steel: 'from-[#B8B8D0] to-[#9898B0]',
  fairy: 'from-[#EE99AC] to-[#CE798C]',
};

export const STAT_COLORS: Record<string, string> = {
  hp: '#FF5959',
  attack: '#F5AC78',
  defense: '#FAE078',
  'special-attack': '#9DB7F5',
  'special-defense': '#A7DB8D',
  speed: '#FA92B2',
};

export const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
};

export const formatPokemonId = (id: number): string => {
  return `#${String(id).padStart(4, '0')}`;
};

export const formatPokemonName = (name: string): string => {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export const getPokemonIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};

export const getTypeColor = (type: string): string => {
  return TYPE_COLORS[type] ?? '#A8A878';
};

export const getTypeGradient = (primaryType: string): string => {
  return TYPE_GRADIENTS[primaryType] ?? 'from-[#A8A878] to-[#C8C8A8]';
};

export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const getPokemonAnimatedUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
};

export const getPokemon3DUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
};

export const formatStatName = (stat: string): string => {
  return STAT_LABELS[stat] ?? stat.toUpperCase();
};
