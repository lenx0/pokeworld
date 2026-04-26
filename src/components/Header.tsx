import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Page } from '../pages/HomePage';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  total?: number;
}

const NAV_ITEMS: { page: Page; label: string; icon: string }[] = [
  { page: 'home', label: 'Início', icon: '🏠' },
  { page: 'pokedex', label: 'Pokédex', icon: '🔴' },
  { page: 'trainers', label: 'Treinadores', icon: '🎒' },
  { page: 'legendaries', label: 'Lendários', icon: '✨' },
  { page: 'games', label: 'Jogos', icon: '🎮' },
];

const PAGE_TITLES: Record<Page, string> = {
  home: 'Poke World',
  pokedex: 'Pokédex',
  trainers: 'Treinadores',
  legendaries: 'Lendários',
  games: 'Jogos',
};

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, total }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-pokesurface/95 backdrop-blur-md border-b border-pokeborder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-4">

            {/* ── Logo ── */}
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 flex-shrink-0 group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" width="32" height="32" className="drop-shadow group-hover:drop-shadow-lg transition-all">
                  <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="#111" strokeWidth="4" />
                  <rect x="2" y="46" width="96" height="8" fill="#111" />
                  <circle cx="50" cy="50" r="18" fill="white" stroke="#111" strokeWidth="4" />
                  <circle cx="50" cy="50" r="8" fill="#CC0000" stroke="#111" strokeWidth="3" />
                </svg>
              </motion.div>
              <span className="font-pokemon text-pokeyellow text-sm sm:text-base">
                Poke World
              </span>
            </button>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.filter((n) => n.page !== 'home').map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-body text-sm font-bold transition-all duration-200 ${
                    currentPage === item.page
                      ? 'text-white'
                      : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  {currentPage === item.page && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-pokered/20 border border-pokered/30 rounded-xl"
                      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* ── Right side: total + hamburger ── */}
            <div className="flex items-center gap-3">
              {currentPage === 'pokedex' && total != null && total > 0 && (
                <div className="hidden sm:block text-right">
                  <p className="font-pokemon text-xs text-pokeyellow">{total.toLocaleString('pt-BR')}</p>
                  <p className="font-body text-white/30 text-[10px]">Pokémons</p>
                </div>
              )}

              {/* Mobile: current page indicator */}
              {currentPage !== 'home' && (
                <div className="md:hidden flex items-center gap-1.5 bg-pokered/20 border border-pokered/30 px-3 py-1.5 rounded-xl">
                  <span className="text-sm">{NAV_ITEMS.find((n) => n.page === currentPage)?.icon}</span>
                  <span className="font-body text-white text-xs font-bold">{PAGE_TITLES[currentPage]}</span>
                </div>
              )}

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMobileMenuOpen((p) => !p)}
                className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-pokeborder bg-pokesurface hover:border-white/30 transition-all"
                aria-label="Menu"
              >
                <motion.span
                  className="block w-4 h-0.5 bg-white/60 rounded-full"
                  animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 4 : 0 }}
                />
                <motion.span
                  className="block w-4 h-0.5 bg-white/60 rounded-full"
                  animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                />
                <motion.span
                  className="block w-4 h-0.5 bg-white/60 rounded-full"
                  animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -4 : 0 }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-14 left-0 right-0 z-35 bg-pokesurface border-b border-pokeborder md:hidden shadow-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => { onNavigate(item.page); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-body text-sm font-bold ${
                      currentPage === item.page
                        ? 'bg-pokered/20 text-white border border-pokered/30'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                    {currentPage === item.page && (
                      <span className="ml-auto text-pokered text-xs">•</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
