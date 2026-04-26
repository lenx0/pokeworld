import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRAINERS, type Trainer, type TrainerRole } from '../data/trainers';
import { fetchPokemonBatch } from '../services/pokeApi';
import type { Pokemon } from '../types/pokemon';
import { getPokemonImageUrl, formatPokemonName, getTypeColor } from '../utils/pokemonUtils';

/* ── Type label map ───────────────────────────────────────────── */
const ROLE_FILTERS: { label: string; value: TrainerRole | 'Todos' }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Protagonistas', value: 'Protagonista' },
  { label: 'Companheiros', value: 'Companheiro' },
  { label: 'Rivais', value: 'Rival' },
  { label: 'Campeões', value: 'Campeão' },
  { label: 'Vilões', value: 'Vilão' },
];

const ROLE_COLORS: Record<string, string> = {
  Protagonista: '#FBBF24',
  Companheiro: '#34D399',
  Rival: '#F87171',
  Campeão: '#A78BFA',
  Vilão: '#9CA3AF',
};

/* ── Mini Pokémon Sprite ─────────────────────────────────────── */
const PokemonSprite: React.FC<{ id: number; isSignature?: boolean; pokemonMap: Map<number, Pokemon> }> = ({
  id, isSignature, pokemonMap,
}) => {
  const poke = pokemonMap.get(id);
  return (
    <div
      className={`relative rounded-xl overflow-hidden flex items-center justify-center transition-all duration-200 ${
        isSignature ? 'ring-2 ring-pokeyellow/60' : ''
      }`}
      style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.04)' }}
      title={poke ? formatPokemonName(poke.name) : `#${id}`}
    >
      <img
        src={getPokemonImageUrl(id)}
        alt={poke?.name ?? `pokemon-${id}`}
        className="w-10 h-10 object-contain drop-shadow"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      {isSignature && (
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pokeyellow rounded-full border border-pokebg" />
      )}
    </div>
  );
};

/* ── Trainer Detail Modal ────────────────────────────────────── */
const TrainerModal: React.FC<{
  trainer: Trainer;
  pokemonMap: Map<number, Pokemon>;
  onClose: () => void;
}> = ({ trainer, pokemonMap, onClose }) => {
  const roleColor = ROLE_COLORS[trainer.role] ?? '#A78BFA';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full sm:max-w-lg bg-pokesurface border border-pokeborder rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92dvh] overflow-y-auto scrollbar-hide"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero header */}
          <div
            className="relative p-8 pb-6"
            style={{
              background: `linear-gradient(135deg, ${trainer.primaryColor}30, ${trainer.secondaryColor}15, #1A1A2E)`,
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white/60 hover:text-white text-lg leading-none"
            >
              ×
            </button>

            {/* Avatar circle */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: `linear-gradient(135deg, ${trainer.primaryColor}, ${trainer.secondaryColor})` }}
            >
              <span className="font-pokemon text-2xl text-white">
                {trainer.name.charAt(0)}
              </span>
            </div>

            {/* Name & role */}
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <h2 className="font-pokemon text-xl text-white leading-tight">{trainer.name}</h2>
              <span
                className="font-body text-xs font-bold px-2 py-0.5 rounded-full mt-1"
                style={{ background: `${roleColor}25`, color: roleColor, border: `1px solid ${roleColor}50` }}
              >
                {trainer.role}
              </span>
            </div>

            {trainer.badge && (
              <p className="font-body text-sm font-bold text-pokeyellow mb-2">{trainer.badge}</p>
            )}

            <p className="font-body text-white/40 text-xs">
              {trainer.nameOriginal} · {trainer.region}
            </p>
          </div>

          {/* Body */}
          <div className="px-6 pb-8 pt-4 space-y-5">
            {/* Quote */}
            <blockquote
              className="border-l-4 pl-4 py-1 font-body italic text-white/70 text-sm"
              style={{ borderColor: trainer.primaryColor }}
            >
              {trainer.quote}
            </blockquote>

            {/* Description */}
            <p className="font-body text-white/60 text-sm leading-relaxed">
              {trainer.description}
            </p>

            {/* Goal */}
            <div>
              <p className="font-body text-white/30 text-xs uppercase tracking-widest mb-1">Objetivo</p>
              <p className="font-body text-white/70 text-sm">{trainer.goal}</p>
            </div>

            {/* First appearance */}
            <div>
              <p className="font-body text-white/30 text-xs uppercase tracking-widest mb-1">Primeira Aparição</p>
              <p className="font-body text-white/60 text-xs">{trainer.firstAppearance}</p>
            </div>

            {/* Team */}
            <div>
              <p className="font-body text-white/30 text-xs uppercase tracking-widest mb-3">
                Equipe Pokémon{' '}
                <span className="text-white/20 normal-case font-normal">
                  (✦ = Assinatura)
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {trainer.team.map((tp) => {
                  const poke = pokemonMap.get(tp.id);
                  const typeName = poke?.types?.[0]?.type?.name ?? 'normal';
                  return (
                    <div
                      key={tp.id}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                        style={{ background: `${getTypeColor(typeName)}20`, border: `1px solid ${getTypeColor(typeName)}40` }}
                      >
                        <img
                          src={getPokemonImageUrl(tp.id)}
                          alt={poke?.name ?? ''}
                          className="w-12 h-12 object-contain drop-shadow"
                          loading="lazy"
                        />
                        {tp.isSignature && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-pokeyellow rounded-full border-2 border-pokebg flex items-center justify-center">
                            <span className="text-pokebg text-[8px] font-black">✦</span>
                          </div>
                        )}
                      </div>
                      <span className="font-body text-white/50 text-xs text-center leading-tight max-w-[64px]">
                        {poke ? formatPokemonName(poke.name) : `#${tp.id}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Trainer Card ────────────────────────────────────────────── */
const TrainerCard: React.FC<{
  trainer: Trainer;
  pokemonMap: Map<number, Pokemon>;
  onClick: () => void;
  index: number;
}> = ({ trainer, pokemonMap, onClick, index }) => {
  const roleColor = ROLE_COLORS[trainer.role] ?? '#A78BFA';

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative text-left w-full rounded-2xl overflow-hidden border border-pokeborder bg-pokesurface cursor-pointer transition-all duration-300 hover:border-white/20"
      style={{ boxShadow: `0 0 30px ${trainer.primaryColor}10` }}
    >
      {/* Color bar top */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${trainer.primaryColor}, ${trainer.secondaryColor})` }}
      />

      <div className="p-5">
        <div className="flex gap-4 items-start">
          {/* Avatar */}
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-pokemon text-xl text-white"
            style={{ background: `linear-gradient(135deg, ${trainer.primaryColor}, ${trainer.secondaryColor})` }}
          >
            {trainer.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-pokemon text-sm text-white leading-tight truncate">{trainer.name}</h3>
              <span
                className="flex-shrink-0 text-xs font-bold font-body px-2 py-0.5 rounded-full"
                style={{ background: `${roleColor}20`, color: roleColor }}
              >
                {trainer.role}
              </span>
            </div>
            <p className="font-body text-white/40 text-xs truncate mb-3">{trainer.region}</p>

            {/* Team sprites */}
            <div className="flex gap-1.5 flex-wrap">
              {trainer.team.slice(0, 6).map((tp) => (
                <PokemonSprite
                  key={tp.id}
                  id={tp.id}
                  isSignature={tp.isSignature}
                  pokemonMap={pokemonMap}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <p className="font-body text-white/30 text-xs italic mt-3 line-clamp-1">{trainer.quote}</p>
      </div>
    </motion.button>
  );
};

/* ── TrainersPage ────────────────────────────────────────────── */
const TrainersPage: React.FC = () => {
  const [pokemonMap, setPokemonMap] = useState<Map<number, Pokemon>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [roleFilter, setRoleFilter] = useState<TrainerRole | 'Todos'>('Todos');

  // Collect all unique pokemon IDs
  useEffect(() => {
    const allIds = [...new Set(TRAINERS.flatMap((t) => t.team.map((p) => p.id)))];
    setLoading(true);
    fetchPokemonBatch(allIds)
      .then((pokemons) => {
        const map = new Map<number, Pokemon>();
        pokemons.forEach((p) => map.set(p.id, p));
        setPokemonMap(map);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = roleFilter === 'Todos'
    ? TRAINERS
    : TRAINERS.filter((t) => t.role === roleFilter);

  return (
    <div className="w-full">
      {/* ── Page Hero ── */}
      <div className="mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <span className="text-4xl">🎒</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-pokemon text-xl sm:text-2xl text-white mb-3"
        >
          Treinadores Pokémon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-body text-white/50 max-w-lg mx-auto text-sm leading-relaxed"
        >
          Os maiores treinadores do universo Pokémon. Protagonistas, rivais, campeões e vilões com suas histórias e equipes completas.
        </motion.p>
      </div>

      {/* ── Role Filter ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-8"
      >
        {ROLE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setRoleFilter(f.value as TrainerRole | 'Todos')}
            className={`flex-shrink-0 font-body text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 ${
              roleFilter === f.value
                ? 'bg-pokered text-white shadow-lg shadow-pokered/30'
                : 'bg-pokesurface border border-pokeborder text-white/50 hover:text-white/80'
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* ── Loading ── */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 bg-pokesurface rounded-2xl animate-pulse border border-pokeborder" />
          ))}
        </div>
      )}

      {/* ── Grid ── */}
      {!loading && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((trainer, i) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                pokemonMap={pokemonMap}
                onClick={() => setSelectedTrainer(trainer)}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-body text-white/40">Nenhum treinador encontrado.</p>
        </div>
      )}

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedTrainer && (
          <TrainerModal
            trainer={selectedTrainer}
            pokemonMap={pokemonMap}
            onClose={() => setSelectedTrainer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainersPage;
