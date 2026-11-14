import React from 'react';
import { PlanetSelectorHud } from '../components/PlanetSelectorHud';
import { PlanetaryHabitat } from '../types';
import { PageId } from '../components/Header';

interface HudPageProps {
  onSelectPlanet: (planet: PlanetaryHabitat) => void;
  onNavigate: (page: PageId) => void;
}

export const HudPage: React.FC<HudPageProps> = ({ onSelectPlanet, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#050608] pt-20 pb-12 px-4 sm:px-8">
      {/* Main High-End HUD Component (Red-crossed top buttons removed) */}
      <PlanetSelectorHud
        onSelectPlanet={onSelectPlanet}
        onOpenSimulator={() => onNavigate('simulator')}
      />
    </div>
  );
};
