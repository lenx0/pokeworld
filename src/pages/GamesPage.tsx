import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_GENERATIONS, SPINOFF_GAMES, type GameGeneration, type PokemonGame } from '../data/games';
import { getPokemonImageUrl } from '../utils/pokemonUtils';

/* ── Platform badge ──────────────────────────────────────────── */
const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => (
  <span className="font-body text-xs px-2 py-0.5 rounded-md bg-white/10 text-white/50 border border-white/10">
    {platform}
  </span>
);

/* ── Starter mini sprites ────────────────────────────────────── */
const StarterSprites: React.FC<{ ids: number[]; size?: number }> = ({ ids, size = 40 }) => (
  <div className="flex items-center gap-1">
    {ids.slice(0, 3).map((id) => (
      <img
        key={id}
        src={getPokemonImageUrl(id)}
        alt={`pokemon-${id}`}
        width={size}
        height={size}
        className="object-contain drop-shadow"
        loading="lazy"
        title={`#${id}`}
      />
    ))}
  </div>
);

/* ── Game Detail Modal ───────────────────────────────────────── */
const GameModal: React.FC<{ game: PokemonGame; genColor: string; onClose: () => void }> = ({
  game, onClose,
}) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/75 backdrop-blur-xl" />

    <motion.div
      className="relative z-10 w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto scrollbar-hide bg-pokesurface border border-pokeborder rounded-t-3xl sm:rounded-3xl overflow-hidden"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        className="p-6 pb-5 relative"
        style={{ background: `linear-gradient(135deg, ${game.color}30, ${game.secondColor}15, #1A1A2E)` }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white/60 hover:text-white text-xl leading-none"
        >
          ×
        </button>

        <div className="flex items-start gap-4">
          {/* Game box illustration */}
          <div
            className="w-20 h-24 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${game.color}, ${game.secondColor})` }}
          >
            🎮
            {game.isRemake && (
              <span className="absolute bottom-1 font-body text-[8px] text-white/80 bg-black/40 px-1 rounded">
                REMAKE
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {game.isRemake && game.originalGame && (
              <p
                className="font-body text-xs font-bold mb-1"
                style={{ color: game.color }}
              >
                Remake de {game.originalGame}
              </p>
            )}
            <h2 className="font-pokemon text-sm sm:text-base text-white leading-tight mb-2">
              {game.title}
            </h2>
            <div className="flex flex-wrap gap-2 items-center">
              <PlatformBadge platform={game.platform} />
              <span className="font-body text-white/40 text-xs">{game.year}</span>
              <span className="font-body text-white/30 text-xs">· {game.region}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <p className="font-body text-white/65 text-sm leading-relaxed">{game.description}</p>

        {game.starters.length > 0 && game.starters[0] !== 25 && (
          <div>
            <p className="font-body text-white/30 text-xs uppercase tracking-widest mb-3">
              Pokémon Iniciais
            </p>
            <div className="flex gap-4">
              {game.starters.slice(0, 3).map((id) => (
                <div key={id} className="flex flex-col items-center gap-1">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ background: `${game.color}15`, border: `1px solid ${game.color}30` }}
                  >
                    <img
                      src={getPokemonImageUrl(id)}
                      alt={`pokemon-${id}`}
                      className="w-12 h-12 object-contain drop-shadow"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-body text-white/40 text-xs">#{id}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);

/* ── Game Card ───────────────────────────────────────────────── */
const GameCard: React.FC<{
  game: PokemonGame;
  genColor: string;
  onClick: () => void;
  index: number;
}> = ({ game, onClick, index }) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.06 }}
    whileHover={{ x: 4, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group w-full text-left rounded-2xl overflow-hidden border border-pokeborder bg-pokesurface hover:border-white/20 transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-stretch">
      {/* Color bar */}
      <div
        className="w-1.5 flex-shrink-0 rounded-l-2xl"
        style={{ background: `linear-gradient(180deg, ${game.color}, ${game.secondColor})` }}
      />

      {/* Game box icon */}
      <div
        className="w-14 flex-shrink-0 flex items-center justify-center text-2xl"
        style={{ background: `${game.color}12` }}
      >
        🎮
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 p-3 pr-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-pokemon text-xs text-white leading-tight line-clamp-2 flex-1">
            {game.title}
          </p>
          <span className="flex-shrink-0 font-body text-white/30 text-xs">{game.year}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <PlatformBadge platform={game.platform} />
          {game.isRemake && (
            <span
              className="font-body text-xs font-bold px-2 py-0.5 rounded-md"
              style={{ background: `${game.color}20`, color: game.color }}
            >
              REMAKE
            </span>
          )}
        </div>
        {game.starters.length > 0 && (
          <StarterSprites ids={game.starters} size={32} />
        )}
      </div>
    </div>
  </motion.button>
);

/* ── Generation Section ──────────────────────────────────────── */
const GenSection: React.FC<{
  gen: GameGeneration;
  onSelectGame: (game: PokemonGame) => void;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}> = ({ gen, onSelectGame, isExpanded, onToggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="rounded-3xl overflow-hidden border border-pokeborder"
    style={{ borderColor: `${gen.color}30` }}
  >
    {/* Gen header – clickable to expand */}
    <button
      onClick={onToggle}
      className="w-full text-left p-5 sm:p-6 transition-all duration-300 hover:brightness-110"
      style={{ background: `linear-gradient(135deg, ${gen.color}20, ${gen.color}08, #1A1A2E)` }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Gen number badge */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-pokemon text-lg text-white"
            style={{ background: gen.color, boxShadow: `0 4px 20px ${gen.color}50` }}
          >
            {gen.gen}
          </div>
          <div>
            <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-0.5">
              {gen.name}
            </p>
            <h3 className="font-pokemon text-sm sm:text-base text-white">
              Região {gen.region}
            </h3>
            <p className="font-body text-white/40 text-xs mt-0.5">
              {gen.year} · {gen.games.length} jogo{gen.games.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <motion.span
          className="text-white/30 text-xl flex-shrink-0"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ↓
        </motion.span>
      </div>

      {/* Description */}
      {!isExpanded && (
        <p className="font-body text-white/40 text-xs leading-relaxed mt-4 line-clamp-2">
          {gen.description}
        </p>
      )}
    </button>

    {/* Expanded content */}
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="px-5 sm:px-6 pb-5 space-y-4">
            {/* Full description */}
            <p className="font-body text-white/55 text-sm leading-relaxed border-t border-pokeborder pt-4">
              {gen.description}
            </p>

            {/* Games list */}
            <div className="space-y-2">
              {gen.games.map((game, i) => (
                <GameCard
                  key={game.id}
                  game={game}
                  genColor={gen.color}
                  onClick={() => onSelectGame(game)}
                  index={i}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ── GamesPage ────────────────────────────────────────────────── */
const GamesPage: React.FC = () => {
  const [expandedGen, setExpandedGen] = useState<number>(1);
  const [selectedGame, setSelectedGame] = useState<{ game: PokemonGame; genColor: string } | null>(null);
  const [showSpinoffs, setShowSpinoffs] = useState(false);

  const handleToggleGen = (gen: number) =>
    setExpandedGen((prev) => (prev === gen ? -1 : gen));

  return (
    <div className="w-full">
      {/* ── Page Hero ── */}
      <div className="mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl mb-4"
        >
          🎮
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-pokemon text-xl sm:text-2xl text-white mb-3"
        >
          Jogos Pokémon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-body text-white/50 max-w-lg mx-auto text-sm leading-relaxed"
        >
          Toda a história da franquia Pokémon em jogos. De 1996 até hoje, 9 gerações de aventuras em diferentes regiões do mundo.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mt-6"
        >
          {[
            { label: 'Gerações', value: '9' },
            { label: 'Jogos Principais', value: GAME_GENERATIONS.reduce((s, g) => s + g.games.length, 0).toString() },
            { label: 'Spin-offs', value: SPINOFF_GAMES.length.toString() },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-pokemon text-pokeyellow text-xl">{stat.value}</p>
              <p className="font-body text-white/30 text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Generations timeline ── */}
      <div className="space-y-4 mb-10">
        {GAME_GENERATIONS.map((gen, i) => (
          <GenSection
            key={gen.gen}
            gen={gen}
            onSelectGame={(game) => setSelectedGame({ game, genColor: gen.color })}
            isExpanded={expandedGen === gen.gen}
            onToggle={() => handleToggleGen(gen.gen)}
            index={i}
          />
        ))}
      </div>

      {/* ── Spin-offs ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl overflow-hidden border border-pokeborder"
        style={{ borderColor: '#6366F130' }}
      >
        <button
          onClick={() => setShowSpinoffs((p) => !p)}
          className="w-full text-left p-5 sm:p-6 hover:brightness-110 transition-all"
          style={{ background: 'linear-gradient(135deg, #6366F120, #6366F108, #1A1A2E)' }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: '#6366F1', boxShadow: '0 4px 20px #6366F150' }}
              >
                🌟
              </div>
              <div>
                <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-0.5">Extras</p>
                <h3 className="font-pokemon text-sm sm:text-base text-white">Spin-offs & Mobile</h3>
                <p className="font-body text-white/40 text-xs mt-0.5">
                  {SPINOFF_GAMES.length} jogos extras
                </p>
              </div>
            </div>
            <motion.span
              className="text-white/30 text-xl"
              animate={{ rotate: showSpinoffs ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ↓
            </motion.span>
          </div>
        </button>

        <AnimatePresence>
          {showSpinoffs && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 pt-4 border-t border-pokeborder">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPINOFF_GAMES.map((game, i) => (
                    <motion.div
                      key={game.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl p-3 border border-pokeborder bg-pokebg/30"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-xl"
                          style={{ background: `${game.color}20` }}
                        >
                          🎮
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <p className="font-pokemon text-xs text-white truncate">{game.title}</p>
                            <span className="font-body text-white/30 text-xs flex-shrink-0">{game.year}</span>
                          </div>
                          <p className="font-body text-white/30 text-xs mb-1">{game.platform}</p>
                          <p className="font-body text-white/50 text-xs leading-relaxed line-clamp-2">
                            {game.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Game modal */}
      <AnimatePresence>
        {selectedGame && (
          <GameModal
            key={selectedGame.game.id}
            game={selectedGame.game}
            genColor={selectedGame.genColor}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamesPage;
