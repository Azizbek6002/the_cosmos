import React from 'react';
import { PlanetarySection } from '../components/PlanetarySection';
import { PlanetaryHabitat } from '../types';
import { PageId } from '../components/Header';

interface PlanetsPageProps {
  onSelectPlanet: (planet: PlanetaryHabitat) => void;
  onNavigate: (page: PageId) => void;
}

export const PlanetsPage: React.FC<PlanetsPageProps> = ({ onSelectPlanet, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#030303] pt-20 pb-16 px-4 sm:px-8">
      {/* Page Title & Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="font-mono text-[10px] text-amber-400 uppercase tracking-[0.25em] text-shadow-amber">
            SECTION 03 // 1:1 EDITORIAL ARCHIVE
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-light text-white tracking-[0.15em] uppercase text-shadow-glow">
            PLANETARY COMBUSTION DATABASE
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => onNavigate('hud')}
            className="px-3 py-1.5 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all uppercase tracking-wider"
          >
            ← SOLAR HUD
          </button>
          <button
            onClick={() => onNavigate('simulator')}
            className="px-3 py-1.5 bg-red-600/90 hover:bg-red-500 text-white transition-all uppercase tracking-wider shadow-[0_0_12px_rgba(239,68,68,0.4)]"
          >
            FIRE SIMULATOR →
          </button>
        </div>
      </div>

      {/* Main 1:1 Planetary Section Component */}
      <PlanetarySection onSelectPlanet={onSelectPlanet} />
    </div>
  );
};
