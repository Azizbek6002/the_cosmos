import React, { useState, useEffect } from 'react';
import { Header, PageId } from './components/Header';
import { DashPage } from './pages/DashPage';
import { HudPage } from './pages/HudPage';
import { PlanetsPage } from './pages/PlanetsPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { PlanetDossierModal } from './components/PlanetDossierModal';
import { PlanetaryHabitat } from './types';

export const App: React.FC = () => {
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'hud') return 'hud';
    if (hash === 'planets') return 'planets';
    if (hash === 'simulator') return 'simulator';
    return 'dash';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [selectedDossierPlanet, setSelectedDossierPlanet] = useState<PlanetaryHabitat | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'dash' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-red-500 selection:text-white flex flex-col justify-between">
      {/* Header with Navigation and clean NASA Branding */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Dedicated Page Routing */}
      <main className="flex-1">
        {currentPage === 'dash' && <DashPage onNavigate={handleNavigate} />}
        {currentPage === 'hud' && (
          <HudPage
            onSelectPlanet={(planet) => setSelectedDossierPlanet(planet)}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'planets' && (
          <PlanetsPage
            onSelectPlanet={(planet) => setSelectedDossierPlanet(planet)}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'simulator' && <SimulatorPage onNavigate={handleNavigate} />}
      </main>

      {/* Clean Technical NASA Footer (No FlameGuard AI branding) */}
      <footer className="border-t border-white/5 bg-black/90 py-8 px-6 sm:px-12 text-zinc-500 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/nasa-logo.svg" alt="NASA Meatball Logo" className="w-9 h-7 object-contain" />
            <div>
              <div className="text-zinc-300 font-normal tracking-wider text-shadow-cinematic">
                NASA PHYSICAL SCIENCES INFORMATICS (PSI)
              </div>
              <div className="text-[10px] text-zinc-500">
                COMBUSTION FLIGHT EXPERIMENT REPOSITORY // LUNAR & MARS HABITATS
              </div>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] leading-relaxed font-light">
            <div>NASA Space Apps Challenge 2026 // Challenge 08: Flame in Freefall</div>
            <div className="text-zinc-500">
              Microgravity Combustion Physics · Extraterrestrial Fire Safety Protocols
            </div>
          </div>
        </div>
      </footer>

      {/* Detailed NASA Combustion Dossier Modal */}
      <PlanetDossierModal
        planet={selectedDossierPlanet}
        onClose={() => setSelectedDossierPlanet(null)}
        onOpenSimulator={() => {
          setSelectedDossierPlanet(null);
          handleNavigate('simulator');
        }}
      />
    </div>
  );
};
