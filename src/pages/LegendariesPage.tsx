import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LEGENDARY_IDS,
  LEGENDARY_LORE,
  type LegendaryInfo,
  type LegendaryCategory,
} from '../data/legendaries';
import { fetchPokemonBatch, fetchPokemonSpeciesBatch } from '../services/pokeApi';
import type { Pokemon, PokemonSpecies } from '../types/pokemon';
import {
  getPokemonImageUrl,
  formatPokemonName,
  formatPokemonId,
  getTypeColor,
  STAT_COLORS,
  STAT_LABELS,
} from '../utils/pokemonUtils';

/* ── Helpers ────────────────────────────────────────────────── */
const CATEGORY_LABELS: Record<LegendaryCategory, string> = {
  legendary: 'Lendário',
  mythical: 'Mítico',
  ultra_beast: 'Ultra Beast',
  paradox: 'Paradoxo',
};

const CATEGORY_COLORS: Record<LegendaryCategory, string> = {
  legendary: '#FBBF24',
  mythical: '#EC4899',
  ultra_beast: '#22D3EE',
  paradox: '#A855F7',
};

const GEN_FILTERS = [
  { label: 'Todos', value: 0 },
  { label: 'Gen 1', value: 1 },
  { label: 'Gen 2', value: 2 },
  { label: 'Gen 3', value: 3 },
  { label: 'Gen 4', value: 4 },
  { label: 'Gen 5', value: 5 },
  { label: 'Gen 6', value: 6 },
  { label: 'Gen 7', value: 7 },
  { label: 'Gen 8', value: 8 },
  { label: 'Gen 9', value: 9 },
];

/* ── Stat bar ───────────────────────────────────────────────── */
const StatBar: React.FC<{ name: string; value: number }> = ({ name, value }) => {
  const pct = Math.min(100, (value / 255) * 100);
  const color = STAT_COLORS[name] ?? '#A78BFA';
  return (
    <div className="flex items-center gap-2">
      <span className="font-body text-white/40 text-xs w-16 flex-shrink-0 text-right">
        {STAT_LABELS[name] ?? name.toUpperCase()}
      </span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="font-body text-white/60 text-xs w-8 flex-shrink-0">{value}</span>
    </div>
  );
};

/* ── Legendary Detail Modal ─────────────────────────────────── */
const LegendaryModal: React.FC<{
  pokemon: Pokemon;
  species: PokemonSpecies | null;
  lore: LegendaryInfo | null;
  onClose: () => void;
}> = ({ pokemon, species, lore, onClose }) => {
  const primaryType = pokemon.types[0]?.type?.name ?? 'normal';
  const typeColor = getTypeColor(primaryType);
  const category = lore?.category ?? 'legendary';
  const categoryColor = CATEGORY_COLORS[category];

  const flavorText = species?.flavor_text_entries
    ?.find((e) => e.language.name === 'en')
    ?.flavor_text?.replace(/\f/g, ' ') ?? '';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      <motion.div
        className="relative z-10 w-full sm:max-w-xl max-h-[95dvh] sm:max-h-[90vh] overflow-y-auto scrollbar-hide bg-pokesurface border border-pokeborder rounded-t-3xl sm:rounded-3xl overflow-hidden"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero */}
        <div
          className="relative p-6 pb-0 min-h-[240px] flex flex-col items-center justify-end"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, ${typeColor}50, ${typeColor}18, #1A1A2E)`,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white/60 hover:text-white text-xl leading-none"
          >
            ×
          </button>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className="font-body text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: `${categoryColor}25`, color: categoryColor, border: `1px solid ${categoryColor}50` }}
            >
              {CATEGORY_LABELS[category]}
            </span>
          </div>

          {/* Pokéball watermark */}
          <svg
            viewBox="0 0 100 100"
            className="absolute right-4 bottom-4 opacity-5"
            width={120}
          >
            <circle cx="50" cy="50" r="48" fill={typeColor} />
            <rect x="2" y="46" width="96" height="8" fill="white" />
            <circle cx="50" cy="50" r="18" fill="white" />
            <circle cx="50" cy="50" r="8" fill={typeColor} />
          </svg>

          {/* Pokémon image */}
          <motion.img
            src={getPokemonImageUrl(pokemon.id)}
            alt={pokemon.name}
            className="w-44 h-44 sm:w-52 sm:h-52 object-contain drop-shadow-2xl z-10 relative"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          />

          {/* Name + types strip */}
          <div className="relative z-10 w-full bg-gradient-to-t from-pokesurface via-pokesurface/80 to-transparent pt-6 pb-4 px-4 text-center">
            <p className="font-body text-white/40 text-xs mb-1">{formatPokemonId(pokemon.id)}</p>
            <h2 className="font-pokemon text-lg sm:text-xl text-white mb-3">
              {formatPokemonName(pokemon.name)}
            </h2>
            <div className="flex justify-center gap-2 mb-1">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="font-body text-xs font-bold px-3 py-1 rounded-full uppercase"
                  style={{ background: `${getTypeColor(t.type.name)}30`, color: getTypeColor(t.type.name), border: `1px solid ${getTypeColor(t.type.name)}50` }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
            {lore && (
              <p className="font-body text-white/40 text-xs">{lore.group}</p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Lore */}
          {lore && (
            <div>
              <h3 className="font-pokemon text-xs text-white/30 mb-3">Lore & História</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                {lore.lore}
              </p>
            </div>
          )}

          {/* Power */}
          {lore?.power && (
            <div
              className="rounded-xl p-4"
              style={{ background: `${categoryColor}10`, border: `1px solid ${categoryColor}30` }}
            >
              <p className="font-pokemon text-xs mb-1" style={{ color: categoryColor }}>Poder</p>
              <p className="font-body text-white/70 text-sm">{lore.power}</p>
            </div>
          )}

          {/* Official flavor text */}
          {flavorText && (
            <div>
              <h3 className="font-pokemon text-xs text-white/30 mb-2">Pokédex</h3>
              <p className="font-body text-white/50 text-xs italic leading-relaxed">{flavorText}</p>
            </div>
          )}

          {/* Stats */}
          <div>
            <h3 className="font-pokemon text-xs text-white/30 mb-3">Estatísticas Base</h3>
            <div className="space-y-2">
              {pokemon.stats.map((s) => (
                <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
              ))}
            </div>
            <p className="font-body text-white/30 text-xs mt-3 text-right">
              Total: <span className="text-white/60 font-bold">
                {pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}
              </span>
            </p>
          </div>

          {/* Physical info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="font-body text-white/30 text-xs mb-1">Altura</p>
              <p className="font-body text-white font-bold">{(pokemon.height / 10).toFixed(1)} m</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="font-body text-white/30 text-xs mb-1">Peso</p>
              <p className="font-body text-white font-bold">{(pokemon.weight / 10).toFixed(1)} kg</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Legendary Card ─────────────────────────────────────────── */
const LegendaryCard: React.FC<{
  pokemon: Pokemon;
  lore: LegendaryInfo | null;
  species: PokemonSpecies | null;
  onClick: () => void;
  index: number;
}> = ({ pokemon, lore, onClick, index }) => {
  const primaryType = pokemon.types[0]?.type?.name ?? 'normal';
  const typeColor = getTypeColor(primaryType);
  const category = lore?.category ?? 'legendary';
  const categoryColor = CATEGORY_COLORS[category];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative text-left w-full rounded-2xl overflow-hidden border border-pokeborder cursor-pointer transition-all duration-300 hover:border-white/20"
      style={{ background: `radial-gradient(ellipse at 50% 0%, ${typeColor}18, #1A1A2E)` }}
    >
      {/* Category badge */}
      <div className="absolute top-2 left-2 z-10">
        <span
          className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${categoryColor}25`, color: categoryColor }}
        >
          {CATEGORY_LABELS[category]}
        </span>
      </div>

      {/* Image */}
      <div className="relative flex items-center justify-center pt-8 pb-2 px-4">
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ background: `radial-gradient(circle, ${typeColor}40, transparent 70%)` }}
        />
        <motion.img
          src={getPokemonImageUrl(pokemon.id)}
          alt={pokemon.name}
          className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-lg relative z-10"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3 + (index % 3), repeat: Infinity, ease: 'easeInOut' }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="px-3 pb-4 text-center">
        <p className="font-body text-white/30 text-[10px] mb-0.5">{formatPokemonId(pokemon.id)}</p>
        <p className="font-pokemon text-xs text-white leading-tight mb-2">
          {formatPokemonName(pokemon.name)}
        </p>
        <div className="flex justify-center gap-1 flex-wrap mb-2">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
              style={{ background: `${getTypeColor(t.type.name)}25`, color: getTypeColor(t.type.name) }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
        {lore && (
          <p className="font-body text-white/25 text-[10px] leading-tight line-clamp-2">
            {lore.group}
          </p>
        )}
      </div>
    </motion.button>
  );
};

/* ── LegendariesPage ────────────────────────────────────────── */
const LegendariesPage: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [speciesMap, setSpeciesMap] = useState<Map<number, PokemonSpecies>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [genFilter, setGenFilter] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<LegendaryCategory | 'all'>('all');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchPokemonBatch(LEGENDARY_IDS),
      fetchPokemonSpeciesBatch(LEGENDARY_IDS),
    ]).then(([pokes, species]) => {
      setPokemons(pokes);
      const smap = new Map<number, PokemonSpecies>();
      species.forEach((s) => smap.set(s.id, s));
      setSpeciesMap(smap);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = pokemons.filter((p) => {
    const lore = LEGENDARY_LORE[p.id];
    if (genFilter > 0 && lore?.generation !== genFilter) return false;
    if (categoryFilter !== 'all' && lore?.category !== categoryFilter) return false;
    return true;
  });

  const selectedPokemon = selectedId != null ? pokemons.find((p) => p.id === selectedId) ?? null : null;
  const selectedLore = selectedId != null ? LEGENDARY_LORE[selectedId] ?? null : null;
  const selectedSpecies = selectedId != null ? speciesMap.get(selectedId) ?? null : null;

  const handleSelect = useCallback((id: number) => setSelectedId(id), []);
  const handleClose = useCallback(() => setSelectedId(null), []);

  return (
    <div className="w-full">
      {/* ── Page Hero ── */}
      <div className="mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl mb-4"
        >
          ✨
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-pokemon text-xl sm:text-2xl text-white mb-3"
        >
          Pokémon Lendários
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-body text-white/50 max-w-lg mx-auto text-sm leading-relaxed"
        >
          Os seres mais poderosos e misteriosos do mundo Pokémon. Lendas, mitos e poderes que moldaram o universo Pokémon ao longo das gerações.
        </motion.p>
      </div>

      {/* ── Filters ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 mb-8"
      >
        {/* Gen filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {GEN_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setGenFilter(f.value)}
              className={`flex-shrink-0 font-body text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 ${
                genFilter === f.value
                  ? 'bg-pokered text-white shadow-lg shadow-pokered/30'
                  : 'bg-pokesurface border border-pokeborder text-white/50 hover:text-white/80'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['all', 'legendary', 'mythical'] as const).map((c) => {
            const label = c === 'all' ? 'Todos' : CATEGORY_LABELS[c];
            const color = c === 'all' ? '#FFFFFF' : CATEGORY_COLORS[c];
            return (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`flex-shrink-0 font-body text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 border ${
                  categoryFilter === c ? 'text-pokebg' : 'bg-transparent text-white/50 hover:text-white/80'
                }`}
                style={{
                  background: categoryFilter === c ? color : 'transparent',
                  borderColor: categoryFilter === c ? color : `${color}40`,
                  color: categoryFilter === c ? '#0F0F1A' : color,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Count */}
      {!loading && (
        <p className="font-body text-white/30 text-xs mb-5">
          {filtered.length} Pokémon{filtered.length !== 1 ? 's' : ''} exibido{filtered.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-48 bg-pokesurface rounded-2xl animate-pulse border border-pokeborder" />
          ))}
        </div>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((poke, i) => (
              <LegendaryCard
                key={poke.id}
                pokemon={poke}
                lore={LEGENDARY_LORE[poke.id] ?? null}
                species={speciesMap.get(poke.id) ?? null}
                onClick={() => handleSelect(poke.id)}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-body text-white/40">Nenhum lendário encontrado com esses filtros.</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedPokemon && (
          <LegendaryModal
            key={selectedPokemon.id}
            pokemon={selectedPokemon}
            species={selectedSpecies}
            lore={selectedLore}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LegendariesPage;
