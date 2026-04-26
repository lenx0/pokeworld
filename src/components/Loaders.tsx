import React from 'react';
import { motion } from 'framer-motion';

/* ─── Pokeball Loader ─── */
const PokeballLoader: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <div
    className="relative inline-block animate-pokeball-shake"
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="#222" strokeWidth="4" />
      <rect x="2" y="46" width="96" height="8" fill="#222" />
      <circle cx="50" cy="50" r="18" fill="white" stroke="#222" strokeWidth="4" />
      <circle cx="50" cy="50" r="8" fill="#CC0000" stroke="#222" strokeWidth="3" />
    </svg>
  </div>
);

/* ─── Full Page Loader ─── */
export const PageLoader: React.FC = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-pokebg">
    <PokeballLoader size={80} />
    <p className="mt-6 font-pokemon text-pokeyellow text-xs tracking-widest animate-pulse">
      Carregando...
    </p>
  </div>
);

/* ─── Inline Card Loader ─── */
export const CardLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-8 gap-3">
    <PokeballLoader size={48} />
    <p className="font-body text-pokegray text-sm animate-pulse">Carregando mais Pokémons...</p>
  </div>
);

/* ─── Skeleton Card ─── */
export const SkeletonCard: React.FC = () => (
  <div className="rounded-2xl bg-pokesurface border border-pokeborder p-4 animate-pulse flex flex-col gap-3">
    <div className="mx-auto w-24 h-24 rounded-full bg-pokeborder" />
    <div className="h-4 bg-pokeborder rounded w-3/4 mx-auto" />
    <div className="h-3 bg-pokeborder rounded w-1/2 mx-auto" />
    <div className="flex gap-2 justify-center">
      <div className="h-5 w-16 bg-pokeborder rounded-full" />
      <div className="h-5 w-16 bg-pokeborder rounded-full" />
    </div>
  </div>
);

/* ─── Modal Loader ─── */
export const ModalLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <PokeballLoader size={64} />
    </motion.div>
    <p className="font-pokemon text-pokeyellow text-xs animate-pulse tracking-wider">
      Capturando dados...
    </p>
  </div>
);

export default PokeballLoader;
