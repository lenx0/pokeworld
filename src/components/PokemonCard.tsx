import React from 'react';
import { motion } from 'framer-motion';
import type { Pokemon } from '../types/pokemon';
import {
  formatPokemonId,
  formatPokemonName,
  getTypeColor,
} from '../utils/pokemonUtils';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (id: number) => void;
  layout?: 'grid' | 'list';
}

const TYPE_BG: Record<string, string> = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick, layout = 'grid' }) => {
  const primaryType = pokemon.types[0]?.type.name ?? 'normal';
  const color = TYPE_BG[primaryType] ?? '#A8A878';
  const id = pokemon.id;

  const imageUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  /* ─── LIST LAYOUT ─── */
  if (layout === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01, x: 4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        onClick={() => onClick(id)}
        className="cursor-pointer flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-2xl border border-white/10 shadow-md relative overflow-hidden"
        style={{ background: `linear-gradient(90deg, ${color}20 0%, #1A1A2E 80%)` }}
      >
        {/* Pokeball decorativa */}
        <div
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 opacity-10"
          style={{ borderColor: color }}
        />

        {/* Imagem */}
        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16">
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-lg"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            }}
          />
        </div>

        {/* Nome + Tipos */}
        <div className="flex-1 min-w-0">
          <p className="font-pokemon text-[8px] text-white/30 mb-0.5">{formatPokemonId(id)}</p>
          <h3 className="font-body font-bold text-white text-sm sm:text-base leading-tight truncate">
            {formatPokemonName(pokemon.name)}
          </h3>
          <div className="flex gap-1 mt-1 flex-wrap">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-2 py-0.5 rounded-full text-white text-[9px] font-bold uppercase"
                style={{ backgroundColor: getTypeColor(t.type.name) }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats — oculto em telas muito pequenas */}
        <div className="hidden sm:flex gap-4 text-center flex-shrink-0">
          {pokemon.stats.slice(0, 3).map((s) => (
            <div key={s.stat.name}>
              <p className="text-[9px] text-white/30 uppercase font-pokemon">
                {s.stat.name === 'hp' ? 'HP' : s.stat.name === 'attack' ? 'ATK' : 'DEF'}
              </p>
              <p className="text-sm font-bold text-white">{s.base_stat}</p>
            </div>
          ))}
        </div>

        {/* Seta */}
        <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    );
  }

  /* ─── GRID LAYOUT ─── */
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onClick(id)}
      className="cursor-pointer rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group"
      style={{
        background: `linear-gradient(145deg, ${color}22 0%, #1A1A2E 60%)`,
      }}
    >
      {/* Pokeball decorativa fundo */}
      <div
        className="absolute -right-6 -top-6 w-28 h-28 rounded-full border-4 border-white/5 opacity-30 group-hover:opacity-50 transition-opacity"
        style={{ borderColor: color }}
      />
      <div
        className="absolute -right-3 -top-3 w-16 h-16 rounded-full border-2 border-white/5 opacity-20"
        style={{ borderColor: color }}
      />

      <div className="relative p-4 flex flex-col items-center gap-2">
        {/* ID */}
        <span className="absolute top-3 left-3 font-pokemon text-[9px] text-white/40">
          {formatPokemonId(id)}
        </span>

        {/* Imagem */}
        <motion.img
          src={imageUrl}
          alt={pokemon.name}
          className="w-24 h-24 object-contain drop-shadow-xl mt-2 animate-float"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          }}
        />

        {/* Nome */}
        <h3 className="font-body font-bold text-white text-base text-center leading-tight mt-1">
          {formatPokemonName(pokemon.name)}
        </h3>

        {/* Types */}
        <div className="flex gap-1.5 flex-wrap justify-center">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow"
              style={{ backgroundColor: getTypeColor(t.type.name) }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Stats rápidas */}
        <div className="w-full mt-2 grid grid-cols-3 gap-1 text-center">
          {pokemon.stats.slice(0, 3).map((s) => (
            <div key={s.stat.name}>
              <p className="text-[9px] text-white/40 uppercase font-pokemon leading-tight">
                {s.stat.name === 'hp' ? 'HP' : s.stat.name === 'attack' ? 'ATK' : 'DEF'}
              </p>
              <p className="text-xs font-bold text-white">{s.base_stat}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;

