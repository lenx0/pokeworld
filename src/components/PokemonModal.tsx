import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { ModalLoader } from './Loaders';
import {
  formatPokemonId,
  formatPokemonName,
  getTypeColor,
  STAT_COLORS,
  formatStatName,
} from '../utils/pokemonUtils';
import type { EvolutionNode } from '../hooks/usePokemonDetail';

interface PokemonModalProps {
  pokemonId: number | null;
  onClose: () => void;
  onSelectPokemon: (id: number) => void;
}

type Tab = 'info' | 'stats' | 'abilities' | 'moves' | 'evolution';

/* ─── Card de evolução ─── */
const EvolutionCard: React.FC<{
  node: EvolutionNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ node, isActive, onClick }) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.id}.png`;
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
        isActive ? 'ring-2 ring-pokeyellow bg-pokeyellow/10' : 'hover:bg-white/5'
      }`}
    >
      <img
        src={imgUrl}
        alt={node.name}
        className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node.id}.png`;
        }}
      />
      <span className="font-body text-xs font-bold text-white text-center leading-tight">
        {formatPokemonName(node.name)}
      </span>
      <span className="text-[9px] text-white/40 font-pokemon">{formatPokemonId(node.id)}</span>
      {node.minLevel && (
        <span className="text-[9px] text-pokeyellow">Lv. {node.minLevel}</span>
      )}
      {node.item && (
        <span className="text-[9px] text-pokeyellow capitalize">
          {node.item.replace(/-/g, ' ')}
        </span>
      )}
    </motion.button>
  );
};

/* ─── Modal principal ─── */
const PokemonModal: React.FC<PokemonModalProps> = ({ pokemonId, onClose, onSelectPokemon }) => {
  const { pokemon, species, evolutionStages, loading, error } = usePokemonDetail(pokemonId);
  const [tab, setTab] = useState<Tab>('info');
  const [viewMode, setViewMode] = useState<'static' | '3d' | 'animated'>('static');
  const [imgError, setImgError] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTab('info');
    setViewMode('static');
    setImgError(false);
  }, [pokemonId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const primaryType = pokemon?.types[0]?.type.name ?? 'normal';
  const typeColor = getTypeColor(primaryType);

  const getImageSrc = (): string => {
    if (!pokemon) return '';
    if (imgError)
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    if (viewMode === 'animated') {
      return (
        pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default ??
        pokemon.sprites.other?.showdown?.front_default ??
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`
      );
    }
    if (viewMode === '3d') {
      return (
        pokemon.sprites.other?.home?.front_default ??
        pokemon.sprites.other?.['official-artwork']?.front_default ??
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`
      );
    }
    return (
      pokemon.sprites.other?.['official-artwork']?.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    );
  };

  const flavorText =
    species?.flavor_text_entries
      .find((f) => f.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ') ?? '';

  const genus = species?.genera.find((g) => g.language.name === 'en')?.genus ?? '';

  const tabs: { key: Tab; label: string }[] = [
    { key: 'info', label: 'Info' },
    { key: 'stats', label: 'Stats' },
    { key: 'abilities', label: 'Habilidades' },
    { key: 'moves', label: 'Moves' },
    { key: 'evolution', label: 'Evoluções' },
  ];

  return (
    <AnimatePresence>
      {pokemonId !== null && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="relative w-full sm:max-w-lg max-h-[96dvh] sm:max-h-[88vh] overflow-hidden rounded-t-3xl sm:rounded-3xl bg-pokesurface border border-white/10 shadow-2xl flex flex-col"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {/* ══════════════════════════════════════
                HERO — Imagem em evidência
            ══════════════════════════════════════ */}
            <div
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                background: `radial-gradient(ellipse at 50% 30%, ${typeColor}55 0%, ${typeColor}18 45%, #1A1A2E 100%)`,
                minHeight: 220,
              }}
            >
              {/* Drag handle mobile */}
              <div className="flex justify-center pt-3 sm:hidden absolute top-0 left-0 right-0 z-20">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Pokeball watermark */}
              <svg
                viewBox="0 0 100 100"
                className="absolute right-0 bottom-0 w-48 h-48 sm:w-56 sm:h-56 opacity-[0.07] pointer-events-none translate-x-10 translate-y-10"
                aria-hidden
              >
                <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="6" />
                <rect x="2" y="44" width="96" height="12" fill="white" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="6" />
              </svg>

              {/* Botão fechar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>

              {/* ID topo-esquerda */}
              {!loading && pokemon && (
                <span className="absolute top-5 left-5 z-20 font-pokemon text-[10px] text-white/30">
                  {formatPokemonId(pokemon.id)}
                </span>
              )}

              {/* ── Imagem central ── */}
              <div className="flex flex-col items-center justify-center pt-8 pb-4 sm:pt-10 sm:pb-5 px-4">
                {loading ? (
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/5 animate-pulse mb-4" />
                ) : (
                  <motion.img
                    key={`${pokemon?.id}-${viewMode}`}
                    src={getImageSrc()}
                    alt={pokemon?.name}
                    className={`w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-2xl ${
                      viewMode === 'static' ? 'animate-float' : ''
                    }`}
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    onError={() => setImgError(true)}
                  />
                )}

                {/* View mode switcher */}
                {!loading && pokemon && (
                  <div className="flex gap-1.5 mt-2">
                    {(['static', '3d', 'animated'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => { setViewMode(mode); setImgError(false); }}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all border ${
                          viewMode === mode
                            ? 'text-pokebg border-transparent'
                            : 'bg-black/20 border-white/10 text-white/50 hover:text-white/80 hover:bg-black/30'
                        }`}
                        style={viewMode === mode ? { backgroundColor: typeColor, borderColor: typeColor } : {}}
                      >
                        {mode === 'static' ? '2D' : mode === '3d' ? 'HOME' : 'GIF'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Nome, badges, medidas — rodapé do hero ── */}
              <div
                className="px-5 pb-4 pt-3 border-t"
                style={{ borderColor: `${typeColor}30` }}
              >
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-6 bg-white/10 rounded w-40 animate-pulse" />
                    <div className="h-4 bg-white/10 rounded w-24 animate-pulse" />
                  </div>
                ) : pokemon ? (
                  <div className="flex items-end justify-between gap-3 flex-wrap">
                    <div>
                      {genus && (
                        <p className="text-[10px] text-white/40 font-body mb-0.5">{genus}</p>
                      )}
                      <h2 className="font-body font-black text-white text-2xl sm:text-3xl leading-none">
                        {formatPokemonName(pokemon.name)}
                      </h2>

                      {/* Tipos */}
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {pokemon.types.map((t) => (
                          <span
                            key={t.type.name}
                            className="px-3 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider"
                            style={{ backgroundColor: getTypeColor(t.type.name) }}
                          >
                            {t.type.name}
                          </span>
                        ))}
                        {species?.is_legendary && (
                          <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] font-bold border border-yellow-500/30">
                            ⭐ Lendário
                          </span>
                        )}
                        {species?.is_mythical && (
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold border border-purple-500/30">
                            ✨ Mítico
                          </span>
                        )}
                        {species?.is_baby && (
                          <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 text-[10px] font-bold border border-pink-500/30">
                            🍼 Baby
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Medidas */}
                    <div className="flex gap-3 text-right flex-shrink-0">
                      <div>
                        <p className="text-[9px] font-pokemon text-white/30 uppercase">Peso</p>
                        <p className="text-sm font-bold text-white font-body">
                          {((pokemon.weight ?? 0) / 10).toFixed(1)} kg
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-pokemon text-white/30 uppercase">Altura</p>
                        <p className="text-sm font-bold text-white font-body">
                          {((pokemon.height ?? 0) / 10).toFixed(1)} m
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* ══════════════════════════════════════
                TABS
            ══════════════════════════════════════ */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-pokeborder flex-shrink-0 bg-pokesurface">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-shrink-0 px-4 py-3 text-xs font-bold font-body border-b-2 transition-all whitespace-nowrap ${
                    tab === t.key
                      ? 'border-b-2'
                      : 'border-transparent text-white/40 hover:text-white/70'
                  }`}
                  style={
                    tab === t.key
                      ? { borderBottomColor: typeColor, color: typeColor }
                      : {}
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* ══════════════════════════════════════
                CONTEÚDO (scrollável)
            ══════════════════════════════════════ */}
            <div className="flex-1 overflow-y-auto px-5 py-5 bg-pokebg/40">
              {loading && <ModalLoader />}
              {error && (
                <p className="text-center text-red-400 font-body py-10">{error}</p>
              )}

              {!loading && !error && pokemon && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* ─── INFO ─── */}
                    {tab === 'info' && (
                      <div className="space-y-4">
                        {flavorText && (
                          <div className="bg-pokesurface rounded-xl p-4 border border-pokeborder">
                            <p className="text-white/80 font-body text-sm leading-relaxed italic">
                              "{flavorText}"
                            </p>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2.5">
                          {[
                            { label: 'Exp. Base', value: pokemon.base_experience ?? '—' },
                            { label: 'Taxa de Captura', value: species?.capture_rate ?? '—' },
                            { label: 'Felicidade Base', value: species?.base_happiness ?? '—' },
                            { label: 'Crescimento', value: species?.growth_rate?.name?.replace(/-/g, ' ') ?? '—' },
                            { label: 'Habitat', value: species?.habitat?.name?.replace(/-/g, ' ') ?? '—' },
                            { label: 'Cor', value: species?.color?.name ?? '—' },
                            { label: 'Forma', value: species?.shape?.name?.replace(/-/g, ' ') ?? '—' },
                            { label: 'Grupos de Ovo', value: species?.egg_groups?.map((g) => g.name).join(', ') ?? '—' },
                          ].map(({ label, value }) => (
                            <div key={label} className="bg-pokesurface rounded-xl p-3 border border-pokeborder">
                              <p className="text-[9px] text-white/40 font-pokemon uppercase mb-1">{label}</p>
                              <p className="text-white font-body font-bold capitalize text-sm">{String(value)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ─── STATS ─── */}
                    {tab === 'stats' && (
                      <div className="space-y-3">
                        {pokemon.stats.map((s) => {
                          const pct = Math.min((s.base_stat / 255) * 100, 100);
                          const color = STAT_COLORS[s.stat.name] ?? '#aaa';
                          return (
                            <div key={s.stat.name}>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs font-pokemon text-white/50 uppercase">
                                  {formatStatName(s.stat.name)}
                                </span>
                                <span className="text-sm font-bold text-white font-body">
                                  {s.base_stat}
                                </span>
                              </div>
                              <div className="w-full h-2.5 bg-pokeborder rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                        <div className="mt-4 pt-3 border-t border-pokeborder flex justify-between items-center">
                          <span className="text-xs font-pokemon text-white/40 uppercase">Total</span>
                          <span className="text-lg font-black text-pokeyellow font-body">
                            {pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* ─── ABILITIES ─── */}
                    {tab === 'abilities' && (
                      <div className="space-y-3">
                        {pokemon.abilities.map((a) => (
                          <div
                            key={a.ability.name}
                            className="bg-pokesurface rounded-xl p-4 border border-pokeborder flex items-center gap-3"
                          >
                            <div
                              className="w-2 h-10 rounded-full flex-shrink-0"
                              style={{ backgroundColor: typeColor }}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-body font-bold text-white capitalize">
                                  {formatPokemonName(a.ability.name)}
                                </h4>
                                {a.is_hidden && (
                                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 font-bold">
                                    OCULTA
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-white/40 font-body mt-0.5">Slot {a.slot}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ─── MOVES ─── */}
                    {tab === 'moves' && (
                      <div>
                        <p className="text-xs text-white/30 font-body mb-3">
                          {pokemon.moves.length} moves disponíveis
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {pokemon.moves.map((m) => (
                            <div
                              key={m.move.name}
                              className="bg-pokesurface border border-pokeborder rounded-lg px-3 py-1.5"
                            >
                              <p className="text-xs text-white font-body capitalize">
                                {m.move.name.replace(/-/g, ' ')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ─── EVOLUTION ─── */}
                    {tab === 'evolution' && (
                      <div className="space-y-5">
                        {evolutionStages.length === 0 ? (
                          <p className="text-center text-white/40 font-body py-10">
                            Nenhuma evolução encontrada.
                          </p>
                        ) : (
                          evolutionStages.map((stage, si) => (
                            <div key={si}>
                              <p className="text-[9px] font-pokemon text-white/25 uppercase mb-3 tracking-wider">
                                {si === 0 ? 'Forma Base' : `Estágio ${si}`}
                              </p>
                              <div className="flex flex-wrap items-center gap-1">
                                {stage.map((node, ni) => (
                                  <React.Fragment key={node.id}>
                                    {ni > 0 && (
                                      <svg className="w-4 h-4 text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    )}
                                    <EvolutionCard
                                      node={node}
                                      isActive={node.id === pokemonId}
                                      onClick={() => onSelectPokemon(node.id)}
                                    />
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PokemonModal;

