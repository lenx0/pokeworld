import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage, { type Page } from './pages/HomePage';
import PokedexPage from './pages/PokedexPage';
import TrainersPage from './pages/TrainersPage';
import LegendariesPage from './pages/LegendariesPage';
import GamesPage from './pages/GamesPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pokedexTotal, setPokedexTotal] = useState(0);

  if (currentPage === 'home') {
    return <HomePage onNavigate={setCurrentPage} />;
  }

  return (
    <div className="min-h-dvh flex flex-col bg-pokebg">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} total={pokedexTotal} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {currentPage === 'pokedex' && <PokedexPage onTotalChange={setPokedexTotal} />}
            {currentPage === 'trainers' && <TrainersPage />}
            {currentPage === 'legendaries' && <LegendariesPage />}
            {currentPage === 'games' && <GamesPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;

