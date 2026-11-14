import React from 'react';
import { ArrowRight, Activity, Compass, Flame } from 'lucide-react';
import { PageId } from '../components/Header';

interface DashPageProps {
  onNavigate: (page: PageId) => void;
}

export const DashPage: React.FC<DashPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 bg-[#030303] overflow-hidden">
      {/* Cinematic Mars Astronaut & Sunrise 02 Lander Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-mars-astronaut.png"
          alt="NASA Astronaut standing on Martian terrain with lander Sunrise 02"
          className="w-full h-full object-cover object-center opacity-70 filter contrast-110 brightness-95"
        />
        {/* Soft Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030303]/20 to-[#030303]/70" />
      </div>

      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      {/* Main Content Area - All Content Centered in the Middle */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto pt-4 sm:pt-8">
        {/* Clean, Light Hero Heading Centered with Deep Dark Shadow */}
        <div className="mb-6 max-w-4xl">
          <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-[1.08] text-shadow-dark">
            SPACEFIRE DYNAMICS <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-amber-200">
              & HABITAT SAFETY
            </span>
          </h1>
        </div>

        {/* Clean Mission Statement Centered - No background boxes, pure floating text with shadow */}
        <div className="max-w-2xl mx-auto space-y-3 mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300 text-shadow-cyan-halo">
            PHYSICAL SCIENCES INFORMATICS // MISSION DIRECTIVE
          </div>
          <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed text-shadow-dark">
            Engineered for humanity's permanent habitats on the <strong className="font-normal text-white">Moon (Artemis)</strong>, 
            <strong className="font-normal text-white"> Mars</strong>, and deep space orbital platforms. In microgravity and reduced gravity, 
            fire loses natural buoyancy and behaves unpredictably. This platform harnesses NASA Physical Sciences Informatics (PSI) 
            combustion data to model, predict, and suppress spaceflight fires before they compromise life support systems.
          </p>
        </div>

        {/* Section Navigation - Completely Frameless / Borderless with Contrast Text Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto w-full text-center mb-8">
          {/* Section 02: Solar HUD & Habitats */}
          <div
            onClick={() => onNavigate('hud')}
            className="group cursor-pointer flex flex-col items-center text-center transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-cyan-400 mb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-shadow-cyan-halo">
              <Activity className="w-3.5 h-3.5" />
              <span>SECTION 02</span>
            </div>
            <h3 className="font-sans text-lg font-normal text-white uppercase tracking-wider mb-2 text-shadow-dark group-hover:text-cyan-200 transition-colors">
              SOLAR HUD & HABITATS
            </h3>
            <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed max-w-xs text-shadow-dark mb-3">
              Explore the horizontal planetary lineup, solar radiation wave propagation, and mission action protocols.
            </p>
            <div className="font-mono text-[10px] text-cyan-300 flex items-center gap-1 uppercase tracking-widest text-shadow-cyan-halo group-hover:translate-x-1 transition-transform">
              <span>EXPLORE HUD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Section 03: Planetary Database */}
          <div
            onClick={() => onNavigate('planets')}
            className="group cursor-pointer flex flex-col items-center text-center transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-amber-400 mb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-shadow-amber-halo">
              <Compass className="w-3.5 h-3.5" />
              <span>SECTION 03</span>
            </div>
            <h3 className="font-sans text-lg font-normal text-white uppercase tracking-wider mb-2 text-shadow-dark group-hover:text-amber-200 transition-colors">
              PLANETARY DATABASE
            </h3>
            <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed max-w-xs text-shadow-dark mb-3">
              Access the 1:1 editorial archives for CETRION (LEO 0g), DEVLAAR (Mars 0.38g), and BITURION (Moon 0.166g).
            </p>
            <div className="font-mono text-[10px] text-amber-300 flex items-center gap-1 uppercase tracking-widest text-shadow-amber-halo group-hover:translate-x-1 transition-transform">
              <span>VIEW PLANETS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Section 04: Fire Simulator */}
          <div
            onClick={() => onNavigate('simulator')}
            className="group cursor-pointer flex flex-col items-center text-center transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-red-400 mb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-shadow-red-halo">
              <Flame className="w-3.5 h-3.5" />
              <span>SECTION 04</span>
            </div>
            <h3 className="font-sans text-lg font-normal text-white uppercase tracking-wider mb-2 text-shadow-dark group-hover:text-red-300 transition-colors">
              FIRE SIMULATOR
            </h3>
            <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed max-w-xs text-shadow-dark mb-3">
              Interactive combustion laboratory. Test gravity (0g–1g), oxygen, pressure, and ventilation in real-time.
            </p>
            <div className="font-mono text-[10px] text-red-300 flex items-center gap-1 uppercase tracking-widest text-shadow-red-halo group-hover:translate-x-1 transition-transform">
              <span>LAUNCH LAB</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar - Centered */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono text-xs">
          <div>
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider block text-shadow-dark">
              EARTH ORBIT // ISS (0g)
            </span>
            <div className="text-sm font-normal text-white tracking-wider text-shadow-dark">
              Spherical Cool Flame
            </div>
            <div className="text-[10px] text-cyan-400 text-shadow-cyan-halo">NASA FLEX / BASS Data</div>
          </div>

          <div>
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider block text-shadow-dark">
              LUNAR SURFACE // (0.166g)
            </span>
            <div className="text-sm font-normal text-white tracking-wider text-shadow-dark">
              Regolith Heat Sinking
            </div>
            <div className="text-[10px] text-zinc-300 text-shadow-dark">Artemis Base Protection</div>
          </div>

          <div>
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider block text-shadow-dark">
              MARS COLONY // (0.38g)
            </span>
            <div className="text-sm font-normal text-white tracking-wider text-shadow-dark">
              Weak Buoyant Dome
            </div>
            <div className="text-[10px] text-amber-400 text-shadow-amber-halo">Sub-Atmospheric 56 kPa</div>
          </div>

          <div>
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider block text-shadow-dark">
              NASA PSI ARCHIVES
            </span>
            <div className="text-sm font-normal text-emerald-400 tracking-wider text-shadow-dark">
              9 Flight Experiments
            </div>
            <div className="text-[10px] text-zinc-300 text-shadow-dark">SAFFIRE, ACME, CIR</div>
          </div>
        </div>
      </div>
    </div>
  );
};
