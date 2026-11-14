import React from 'react';
import { ArrowDown, Flame, Radio, Compass, Shield } from 'lucide-react';

interface HeroSectionProps {
  onScrollToPlanets: () => void;
  onOpenSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToPlanets,
  onOpenSimulator,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 bg-[#030303] overflow-hidden border-b border-white/5">
      {/* Cinematic Mars Astronaut & Lander Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-mars-astronaut.png"
          alt="NASA Astronaut standing on Martian terrain with lander Sunrise 02"
          className="w-full h-full object-cover object-center opacity-70 filter contrast-110 brightness-95"
        />
        {/* Soft Vignettes - No harsh solid boxes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/90 via-transparent to-[#030303]/40" />
      </div>

      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      {/* Main Content Area - Text floats directly without heavy background frames */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 sm:pt-16">
        {/* Top Tag & Mission Directive */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-red-400 font-mono text-[11px] uppercase tracking-[0.25em] text-shadow-cinematic">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
            <span>NASA SPACE APPS CHALLENGE 2026 // CH-08</span>
          </div>
          <span className="text-zinc-500 font-mono text-xs">|</span>
          <div className="font-mono text-xs text-zinc-300 tracking-wider text-shadow-cinematic">
            DIRECTIVE: <span className="text-white font-normal">FLAME IN FREEFALL</span>
          </div>
        </div>

        {/* Clean, Light Hero Heading with Cinematic Shadow */}
        <div className="max-w-4xl mb-8">
          <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-[1.05] mb-6 text-shadow-cinematic">
            SPACEFIRE DYNAMICS <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-amber-200">
              & HABITAT SAFETY
            </span>
          </h1>

          {/* Clean Mission Statement - No heavy background box, pure clean floating text with shadow */}
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400 text-shadow-cyan">
              <Shield className="w-3.5 h-3.5" />
              <span>CORE PURPOSE & MISSION OBJECTIVE:</span>
            </div>
            <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed text-shadow-cinematic">
              Engineered for humanity's expansion to the <strong className="font-normal text-white">Moon (Artemis)</strong>, 
              <strong className="font-normal text-white"> Mars</strong>, and deep space orbital habitats. In microgravity and reduced gravity, 
              fire loses natural buoyancy and behaves unpredictably. FlameGuard AI harnesses NASA Physical Sciences Informatics (PSI) 
              combustion data to analyze, predict, and extinguish spaceflight fires before they compromise life-support systems.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onScrollToPlanets}
            className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-medium hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE HABITATS</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>LAUNCH SIMULATOR</span>
          </button>
        </div>
      </div>

      {/* Bottom Floating Telemetry - No heavy opaque container, clean borders & text shadows */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-4 font-mono text-xs">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block text-shadow-cinematic">
              EARTH ORBIT // ISS (0g)
            </span>
            <div className="text-sm font-normal text-white tracking-wider text-shadow-cinematic">
              Spherical Cool Flame
            </div>
            <div className="text-[10px] text-cyan-400 text-shadow-cinematic">NASA FLEX / BASS Flight Data</div>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block text-shadow-cinematic">
              LUNAR SURFACE // (0.166g)
            </span>
            <div className="text-sm font-normal text-white tracking-wider text-shadow-cinematic">
              Regolith Heat Sinking
            </div>
            <div className="text-[10px] text-zinc-400 text-shadow-cinematic">Artemis Base Protection</div>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block text-shadow-cinematic">
              MARS COLONY // (0.38g)
            </span>
            <div className="text-sm font-normal text-white tracking-wider text-shadow-cinematic">
              Weak Buoyant Dome
            </div>
            <div className="text-[10px] text-amber-400 text-shadow-cinematic">Sub-Atmospheric 56 kPa</div>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block text-shadow-cinematic">
              NASA PSI REPOSITORY
            </span>
            <div className="text-sm font-normal text-emerald-400 tracking-wider text-shadow-cinematic">
              9 Verified Flight Missions
            </div>
            <div className="text-[10px] text-zinc-400 text-shadow-cinematic">SAFFIRE, ACME, CIR</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={onScrollToPlanets}
          className="mt-6 flex items-center justify-center gap-2 cursor-pointer text-zinc-500 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-[0.25em]"
        >
          <span>SCROLL TO EXPLORE CELESTIAL HABITATS</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
