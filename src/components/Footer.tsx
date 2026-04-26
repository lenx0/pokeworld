import React from 'react';

const Footer: React.FC = () => (
  <footer className="border-t border-pokeborder bg-pokesurface mt-10 py-8 text-center">
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 100 100" width="32" height="32" className="opacity-30">
        <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="#111" strokeWidth="4" />
        <rect x="2" y="46" width="96" height="8" fill="#111" />
        <circle cx="50" cy="50" r="18" fill="white" stroke="#111" strokeWidth="4" />
        <circle cx="50" cy="50" r="8" fill="#CC0000" stroke="#111" strokeWidth="3" />
      </svg>
      <p className="font-body text-white/30 text-sm">
        Desenvolvido por{' '}
        <span className="text-pokeyellow font-bold">Thiago Beraldo</span>
      </p>
      <p className="font-body text-white/20 text-xs">
        Dados fornecidos por{' '}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pokeyellow/60 hover:text-pokeyellow underline transition-colors"
        >
          PokéAPI
        </a>
        {' '}· Todas as imagens são de propriedade da © Nintendo / Game Freak
      </p>
    </div>
  </footer>
);

export default Footer;
