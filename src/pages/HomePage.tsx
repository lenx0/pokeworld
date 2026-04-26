import React from 'react';
import { motion } from 'framer-motion';

export type Page = 'home' | 'pokedex' | 'trainers' | 'legendaries' | 'games';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

/* ─── SVG Pokéball ──────────────────────────────────── */
const PokeballSVG = ({ size = 100, opacity = 1 }: { size?: number; opacity?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ opacity }}>
    <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="#111" strokeWidth="4" />
    <rect x="2" y="46" width="96" height="8" fill="#111" />
    <circle cx="50" cy="50" r="18" fill="white" stroke="#111" strokeWidth="4" />
    <circle cx="50" cy="50" r="8" fill="#CC0000" stroke="#111" strokeWidth="3" />
  </svg>
);

/* ─── Background Floaters ───────────────────────────── */
const FloatingBalls = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {[
      { size: 180, x: '8%', y: '10%', delay: 0, dur: 7 },
      { size: 120, x: '80%', y: '5%', delay: 1.5, dur: 9 },
      { size: 80, x: '90%', y: '50%', delay: 0.5, dur: 6 },
      { size: 220, x: '5%', y: '65%', delay: 2, dur: 8 },
      { size: 100, x: '50%', y: '80%', delay: 3, dur: 10 },
      { size: 60, x: '70%', y: '85%', delay: 1, dur: 5 },
    ].map((b, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ left: b.x, top: b.y }}
        animate={{ y: [-12, 12, -12] }}
        transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
      >
        <PokeballSVG size={b.size} opacity={0.04} />
      </motion.div>
    ))}
  </div>
);

/* ─── Section Card ──────────────────────────────────── */
interface SectionCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  color: string;
  gradient: string;
  delay: number;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title, subtitle, description, icon, badge, color, gradient, delay, onClick,
}) => (
  <motion.button
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="group relative text-left w-full rounded-3xl overflow-hidden border border-white/10 bg-pokesurface cursor-pointer"
    style={{ boxShadow: `0 0 40px ${color}15` }}
  >
    {/* Gradient overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

    {/* Glow border on hover */}
    <div
      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ boxShadow: `inset 0 0 0 1px ${color}60` }}
    />

    <div className="relative z-10 p-6 sm:p-8">
      {/* Icon + badge */}
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
        >
          {icon}
        </div>
        {badge && (
          <span
            className="text-xs font-bold font-body px-3 py-1 rounded-full"
            style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Text */}
      <div>
        <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: `${color}BB` }}>
          {subtitle}
        </p>
        <h2 className="font-pokemon text-base sm:text-lg mb-3 text-white leading-tight">
          {title}
        </h2>
        <p className="font-body text-white/50 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 flex items-center gap-2">
        <span
          className="font-body font-bold text-sm"
          style={{ color }}
        >
          Explorar
        </span>
        <motion.span
          style={{ color }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </div>
    </div>
  </motion.button>
);

/* ─── HomePage ──────────────────────────────────────── */
const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-pokebg overflow-hidden relative">
      <FloatingBalls />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* ── Hero ────────────────────────────────── */}
        <div className="text-center mb-16 sm:mb-20">
          {/* Spinning pokeball */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <PokeballSVG size={96} opacity={0.9} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-pokemon text-3xl sm:text-5xl lg:text-6xl text-pokeyellow leading-tight mb-4">
              Poke World
            </h1>
            <p className="font-body text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Sua enciclopédia definitiva do mundo Pokémon. Explore Pokémons, treinadores, lendários e a história completa dos jogos.
            </p>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pokeyellow/40" />
            <div className="w-2 h-2 rounded-full bg-pokeyellow/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pokeyellow/40" />
          </motion.div>
        </div>

        {/* ── Section Cards ────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <SectionCard
            title="Pokédex"
            subtitle="Catálogo completo"
            description="Mais de 1000 Pokémons com stats, habilidades, cadeia evolutiva, formas especiais e muito mais. Busca, filtros e dois modos de visualização."
            icon="🔴"
            badge="1000+ Pokémons"
            color="#CC0000"
            gradient="from-pokered/10 to-transparent"
            delay={0.2}
            onClick={() => onNavigate('pokedex')}
          />

          <SectionCard
            title="Treinadores"
            subtitle="Anime & Jogos"
            description="Conheça os maiores treinadores do universo Pokémon — protagonistas, rivais, campeões e vilões com suas equipes e histórias."
            icon="🎒"
            badge="15 Treinadores"
            color="#3B82F6"
            gradient="from-blue-500/10 to-transparent"
            delay={0.3}
            onClick={() => onNavigate('trainers')}
          />

          <SectionCard
            title="Pokémon Lendários"
            subtitle="Mitologia & Poder"
            description="Os seres mais poderosos de cada geração. Lore completa, poderes, grupos e história de cada Pokémon lendário e mítico do mundo Pokémon."
            icon="✨"
            badge="60+ Lendários"
            color="#A855F7"
            gradient="from-purple-500/10 to-transparent"
            delay={0.4}
            onClick={() => onNavigate('legendaries')}
          />

          <SectionCard
            title="Jogos Pokémon"
            subtitle="Toda a história"
            description="Todos os jogos da franquia, do Red/Green de 1996 até Scarlet/Violet de 2022. Gerações, plataformas, mecânicas e os melhores spin-offs."
            icon="🎮"
            badge="9 Gerações"
            color="#10B981"
            gradient="from-emerald-500/10 to-transparent"
            delay={0.5}
            onClick={() => onNavigate('games')}
          />
        </div>

        {/* ── Footer Credits ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-16 space-y-2"
        >
          <p className="font-body text-white/25 text-xs">
            Desenvolvido por <span className="text-pokeyellow/60 font-bold">Thiago Beraldo</span>
          </p>
          <p className="font-body text-white/15 text-xs">
            Dados:{' '}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pokeyellow/40 underline transition-colors"
            >
              PokéAPI
            </a>{' '}
            · © Nintendo / Game Freak / The Pokémon Company
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
