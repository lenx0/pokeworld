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

const EvolutionCard: React.FC<{
  node: EvolutionNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ node, isActive, onClick }) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.id}.png`;
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
        isActive
          ? 'ring-2 ring-pokeyellow bg-pokeyellow/10'
          : 'hover:bg-white/5'
      }`}
    >
      <img
        src={imgUrl}
        alt={node.name}
        className="w-16 h-16 object-contain drop-shadow"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node.id}.png`;
        }}
      />
      <span className="font-body text-xs font-bold text-white text-center leading-tight">
        {formatPokemonName(node.name)}
      </span>
      <span className="text-[10px] text-white/40 font-pokemon">
        {formatPokemonId(node.id)}
      </span>
      {node.minLevel && (
        <span className="text-[9px] text-pokeyellow">Lv. {node.minLevel}</span>
      )}
      {node.item && (
        <span className="text-[9px] text-pokeyellow capitalize">{node.item.replace(/-/g, ' ')}</span>
      )}
    </motion.button>
  );
};

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemonId, onClose, onSelectPokemon }) => {
  const { pokemon, species, evolutionStages, loading, error } = usePokemonDetail(pokemonId);
  const [tab, setTab] = useState<Tab>('info');
  const [viewMode, setViewMode] = useState<'static' | '3d' | 'animated'>('static');
  const [imgError, setImgError] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // reset ao trocar pokémon
  useEffect(() => {
    setTab('info');
    setViewMode('static');
    setImgError(false);
  }, [pokemonId]);

  // fechar com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // bloquear scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const primaryType = pokemon?.types[0]?.type.name ?? 'normal';
  const typeColor = getTypeColor(primaryType);

  const getImageSrc = () => {
    if (!pokemon) return '';
    if (imgError) return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
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

  const flavorText = species?.flavor_text_entries
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
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="relative w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl bg-pokesurface border border-pokeborder shadow-2xl flex flex-col"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header colorido */}
            <div
              className="relative overflow-hidden px-5 pt-4 pb-0 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${typeColor}33 0%, transparent 70%)` }}
            >
              {/* Pokeball decorativa */}
              <div
                className="absolute -right-10 -top-10 w-48 h-48 rounded-full border-[3px] opacity-10"
                style={{ borderColor: typeColor }}
              />
              <div
                className="absolute -right-4 -top-4 w-28 h-28 rounded-full border-2 opacity-10"
                style={{ borderColor: typeColor }}
              />

              {/* Botão fechar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>

              <div className="flex items-start gap-4">
                {/* Imagem com controles de view */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36">
                    {loading ? (
                      <div className="w-full h-full rounded-full bg-pokeborder animate-pulse" />
                    ) : (
                      <motion.img
                        key={`${pokemon?.id}-${viewMode}`}
                        src={getImageSrc()}
                        alt={pokemon?.name}
                        className={`w-full h-full object-contain drop-shadow-2xl ${viewMode === 'static' ? 'animate-float' : ''}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        onError={() => setImgError(true)}
                      />
                    )}
                  </div>

                  {/* View mode switcher */}
                  {!loading && pokemon && (
                    <div className="flex gap-1">
                      {(['static', '3d', 'animated'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => { setViewMode(mode); setImgError(false); }}
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase transition-all ${
                            viewMode === mode
                              ? 'text-pokebg'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                          style={viewMode === mode ? { backgroundColor: typeColor } : {}}
                        >
                          {mode === 'static' ? '2D' : mode === '3d' ? 'HOME' : 'GIF'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Nome, ID, tipos */}
                <div className="flex-1 min-w-0 pt-1">
                  {loading ? (
                    <div className="space-y-2">
                      <div className="h-4 bg-pokeborder rounded w-24 animate-pulse" />
                      <div className="h-7 bg-pokeborder rounded w-40 animate-pulse" />
                      <div className="h-5 bg-pokeborder rounded w-20 animate-pulse" />
                    </div>
                  ) : pokemon ? (
                    <>
                      <p className="font-pokemon text-[10px] text-white/40">{formatPokemonId(pokemon.id)}</p>
                      <h2 className="font-body font-black text-white text-2xl sm:text-3xl leading-tight mt-0.5">
                        {formatPokemonName(pokemon.name)}
                      </h2>
                      {genus && (
                        <p className="text-xs text-white/50 font-body mb-2 mt-0.5">{genus}</p>
                      )}
                      <div className="flex gap-1.5 flex-wrap mb-2">
                        {pokemon.types.map((t) => (
                          <span
                            key={t.type.name}
                            className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase"
                            style={{ backgroundColor: getTypeColor(t.type.name) }}
                          >
                            {t.type.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 text-xs text-white/60 font-body">
                        <span>⚖️ {((pokemon.weight ?? 0) / 10).toFixed(1)} kg</span>
                        <span>📏 {((pokemon.height ?? 0) / 10).toFixed(1)} m</span>
                        <span>⭐ {pokemon.base_experience ?? '—'} XP</span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-0 mt-4 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-0">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`flex-shrink-0 px-3 sm:px-4 py-2.5 text-xs font-bold font-body border-b-2 transition-all whitespace-nowrap ${
                      tab === t.key
                        ? 'border-b-2 text-white'
                        : 'border-transparent text-white/40 hover:text-white/70'
                    }`}
                    style={tab === t.key ? { borderBottomColor: typeColor, color: typeColor } : {}}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo das tabs */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {loading && <ModalLoader />}
              {error && (
                <p className="text-center text-red-400 font-body py-10">{error}</p>
              )}

              {!loading && !error && pokemon && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* ─── INFO ─── */}
                    {tab === 'info' && (
                      <div className="space-y-5">
                        {flavorText && (
                          <div className="bg-pokebg/60 rounded-xl p-4 border border-pokeborder">
                            <p className="text-white/80 font-body text-sm leading-relaxed italic">
                              "{flavorText}"
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Experiência Base', value: pokemon.base_experience ?? '—' },
                            { label: 'Taxa de Captura', value: species?.capture_rate ?? '—' },
                            { label: 'Felicidade Base', value: species?.base_happiness ?? '—' },
                            { label: 'Taxa de Crescimento', value: species?.growth_rate?.name?.replace(/-/g, ' ') ?? '—' },
                            { label: 'Habitat', value: species?.habitat?.name?.replace(/-/g, ' ') ?? '—' },
                            { label: 'Cor', value: species?.color?.name ?? '—' },
                            { label: 'Forma', value: species?.shape?.name?.replace(/-/g, ' ') ?? '—' },
                            { label: 'Grupos de Ovo', value: species?.egg_groups?.map(g => g.name).join(', ') ?? '—' },
                          ].map(({ label, value }) => (
                            <div key={label} className="bg-pokebg/50 rounded-xl p-3 border border-pokeborder">
                              <p className="text-[10px] text-white/40 font-pokemon uppercase mb-1">{label}</p>
                              <p className="text-white font-body font-bold capitalize text-sm">{String(value)}</p>
                            </div>
                          ))}
                        </div>

                        {/* Badges especiais */}
                        <div className="flex flex-wrap gap-2">
                          {species?.is_legendary && (
                            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500/30">
                              ⭐ Lendário
                            </span>
                          )}
                          {species?.is_mythical && (
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                              ✨ Mítico
                            </span>
                          )}
                          {species?.is_baby && (
                            <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold border border-pink-500/30">
                              🍼 Baby
                            </span>
                          )}
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
                                <span className="text-xs font-pokemon text-white/60 uppercase">
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
                                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                                />
                              </div>
                            </div>
                          );
                        })}

                        {/* Total */}
                        <div className="mt-4 pt-3 border-t border-pokeborder flex justify-between">
                          <span className="text-xs font-pokemon text-white/60 uppercase">Total</span>
                          <span className="text-sm font-black text-pokeyellow font-body">
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
                            className="bg-pokebg/50 rounded-xl p-4 border border-pokeborder"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-body font-bold text-white capitalize">
                                {formatPokemonName(a.ability.name)}
                              </h4>
                              {a.is_hidden && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 font-bold">
                                  OCULTA
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/50 font-body">Slot {a.slot}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ─── MOVES ─── */}
                    {tab === 'moves' && (
                      <div>
                        <p className="text-xs text-white/40 font-body mb-3">
                          Total: {pokemon.moves.length} moves
                        </p>
                        <div className="grid grid-cols-2 gap-1.5 max-h-80 overflow-y-auto">
                          {pokemon.moves.map((m) => (
                            <div
                              key={m.move.name}
                              className="bg-pokebg/50 border border-pokeborder rounded-lg px-3 py-1.5"
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
                      <div className="space-y-4">
                        {evolutionStages.length === 0 ? (
                          <p className="text-center text-white/50 font-body py-10">
                            Nenhuma evolução encontrada.
                          </p>
                        ) : (
                          evolutionStages.map((stage, si) => (
                            <div key={si}>
                              <p className="text-[10px] font-pokemon text-white/30 uppercase mb-2">
                                {si === 0 ? 'Forma Base' : `Estágio ${si}`}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {stage.map((node) => (
                                  <React.Fragment key={node.id}>
                                    {si > 0 && (
                                      <div className="flex items-center text-white/30">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                      </div>
                                    )}
                                    <EvolutionCard
                                      node={node}
                                      isActive={node.id === pokemonId}
                                      onClick={() => {
                                        onSelectPokemon(node.id);
                                      }}
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
