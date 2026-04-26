import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  total: number;
}

const Header: React.FC<HeaderProps> = ({ total }) => {
  return (
    <header className="relative overflow-hidden bg-pokesurface border-b border-pokeborder">
      {/* Decorações de fundo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border-4 border-pokered/10" />
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full border-2 border-pokered/10" />
        <div className="absolute -left-16 bottom-0 w-64 h-64 rounded-full border-2 border-pokeyellow/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Pokeball logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="flex-shrink-0"
            >
              <svg viewBox="0 0 100 100" width="52" height="52" className="drop-shadow-lg">
                <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="#111" strokeWidth="4" />
                <rect x="2" y="46" width="96" height="8" fill="#111" />
                <circle cx="50" cy="50" r="18" fill="white" stroke="#111" strokeWidth="4" />
                <circle cx="50" cy="50" r="8" fill="#CC0000" stroke="#111" strokeWidth="3" />
              </svg>
            </motion.div>

            <div>
              <h1 className="font-pokemon text-pokeyellow text-lg sm:text-2xl leading-tight">
                Poke World
              </h1>
            </div>
          </div>

          {total > 0 && (
            <div className="text-right">
              <p className="font-pokemon text-xs text-white/30">Total disponível</p>
              <p className="font-body font-black text-pokeyellow text-xl">
                {total.toLocaleString('pt-BR')}
              </p>
              <p className="font-body text-xs text-white/30">Pokémons</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
