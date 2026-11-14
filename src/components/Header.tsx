import React from 'react';

export type PageId = 'dash' | 'hud' | 'planets' | 'simulator';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/[0.06] px-6 sm:px-10 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Minimalist & Premium NASA Branding */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('dash')}
        >
          <img
            src="/nasa-logo.svg"
            alt="NASA Meatball Logo"
            className="w-10 h-8 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          />
          <div className="flex items-center gap-2 pl-2">
            <span className="font-mono text-[11px] font-normal tracking-[0.25em] text-white text-shadow-dark">
              NASA
            </span>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="font-mono text-[10px] font-light tracking-[0.2em] text-zinc-300 text-shadow-dark">
              PHYSICAL SCIENCES INFORMATICS
            </span>
          </div>
        </div>

        {/* Right Side: Sleek, Minimalist & Premium Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 font-mono text-[11px] tracking-[0.2em] uppercase">
          {/* 01: Dash */}
          <button
            onClick={() => onNavigate('dash')}
            className={`transition-all relative py-1 text-shadow-dark ${
              currentPage === 'dash'
                ? 'text-white font-normal after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white'
                : 'text-zinc-400 hover:text-white font-light'
            }`}
          >
            DASH
          </button>

          {/* 02: Solar HUD */}
          <button
            onClick={() => onNavigate('hud')}
            className={`transition-all relative py-1 text-shadow-dark ${
              currentPage === 'hud'
                ? 'text-cyan-300 font-normal after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-cyan-400'
                : 'text-zinc-400 hover:text-cyan-300 font-light'
            }`}
          >
            SOLAR HUD
          </button>

          {/* 03: Planets */}
          <button
            onClick={() => onNavigate('planets')}
            className={`transition-all relative py-1 text-shadow-dark ${
              currentPage === 'planets'
                ? 'text-amber-300 font-normal after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-amber-400'
                : 'text-zinc-400 hover:text-amber-300 font-light'
            }`}
          >
            PLANETS
          </button>

          {/* 04: Simulator */}
          <button
            onClick={() => onNavigate('simulator')}
            className={`transition-all relative py-1 flex items-center gap-1.5 text-shadow-dark ${
              currentPage === 'simulator'
                ? 'text-red-400 font-normal after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-red-500'
                : 'text-zinc-400 hover:text-red-400 font-light'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>SIMULATOR</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
