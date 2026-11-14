import React from 'react';
import { PlanetaryHabitat } from '../types';
import { PLANETARY_HABITATS } from '../data/planets';

interface PlanetarySectionProps {
  onSelectPlanet: (planet: PlanetaryHabitat) => void;
}

export const PlanetarySection: React.FC<PlanetarySectionProps> = ({ onSelectPlanet }) => {
  return (
    <section id="planetary-exploration" className="relative w-full bg-[#030303] text-white py-16 px-6 sm:px-12 overflow-hidden border-b border-white/5">
      {/* Background Subtle Wireframe Topographic Curves */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {/* Top Mesh */}
        <svg className="absolute top-12 left-4 w-[500px] h-[220px]" viewBox="0 0 500 200" fill="none">
          <path d="M 0 140 Q 120 20 250 100 T 500 80" stroke="#71717A" strokeWidth="0.7" />
          <path d="M 0 150 Q 120 30 250 110 T 500 90" stroke="#52525B" strokeWidth="0.7" />
          <path d="M 0 160 Q 120 40 250 120 T 500 100" stroke="#3F3F46" strokeWidth="0.7" />
          <path d="M 0 170 Q 120 50 250 130 T 500 110" stroke="#27272A" strokeWidth="0.7" />
        </svg>

        {/* Middle Mesh */}
        <svg className="absolute top-[850px] right-2 w-[480px] h-[240px]" viewBox="0 0 500 200" fill="none">
          <path d="M 0 60 Q 120 160 250 50 T 500 110" stroke="#71717A" strokeWidth="0.7" />
          <path d="M 0 75 Q 120 175 250 65 T 500 125" stroke="#52525B" strokeWidth="0.7" />
          <path d="M 0 90 Q 120 190 250 80 T 500 140" stroke="#3F3F46" strokeWidth="0.7" />
        </svg>

        {/* Lower Mesh */}
        <svg className="absolute top-[1650px] left-8 w-[450px] h-[220px]" viewBox="0 0 500 200" fill="none">
          <path d="M 0 90 Q 120 30 250 120 T 500 70" stroke="#71717A" strokeWidth="0.7" />
          <path d="M 0 105 Q 120 45 250 135 T 500 85" stroke="#3F3F46" strokeWidth="0.7" />
        </svg>

        {/* Bottom Mesh */}
        <svg className="absolute top-[2450px] right-6 w-[480px] h-[220px]" viewBox="0 0 500 200" fill="none">
          <path d="M 0 110 Q 120 40 250 130 T 500 80" stroke="#52525B" strokeWidth="0.7" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* =================================================================== */}
        {/* TOP EDITORIAL HEADER (1:1 with reference)                           */}
        {/* =================================================================== */}
        <div className="border-b border-white/10 pb-6 mb-16">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.25em] text-white uppercase text-shadow-glow">
              PLANETS
            </h2>
            <div className="border border-white/30 rounded-full px-4 py-0.5 font-mono text-xs text-white tracking-widest text-shadow-cinematic">
              0{PLANETARY_HABITATS.length}
            </div>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-lg mt-3 leading-relaxed font-light text-shadow-cinematic">
            Complete editorial archive of celestial habitats, combustion dynamics, and extraterrestrial fire extinction limits
          </p>
        </div>

        {/* =================================================================== */}
        {/* ALTERNATING 1:1 PLANETARY SECTIONS                                  */}
        {/* Even indices: Planet on Left, Info on Right                         */}
        {/* Odd indices: Planet on Right, Info on Left                          */}
        {/* =================================================================== */}
        {PLANETARY_HABITATS.map((planet, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <React.Fragment key={planet.id}>
              <div className="relative min-h-[500px] lg:min-h-[560px] mb-28">
                {/* Orbital Ellipse behind planet */}
                <div
                  className={`absolute top-[-20px] ${
                    isEven ? 'left-[-20px]' : 'right-[-20px]'
                  } w-[440px] h-[440px] rounded-full border border-white/5 pointer-events-none`}
                />

                {/* Large 3D Photorealistic Planet Sphere */}
                <div
                  onClick={() => onSelectPlanet(planet)}
                  className={`cursor-pointer lg:absolute lg:top-4 ${
                    isEven ? 'lg:left-12' : 'lg:right-12'
                  } w-64 h-64 sm:w-80 sm:h-80 lg:w-[320px] lg:h-[320px] mx-auto mb-8 lg:mb-0 z-20 group`}
                  title={`${planet.name} // Click to inspect NASA dossier`}
                >
                  <div
                    className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-500 group-hover:scale-105"
                    style={{
                      boxShadow: `
                        0 0 35px ${planet.themeColor},
                        0 0 70px rgba(0, 0, 0, 0.9)
                      `,
                    }}
                  >
                    <img
                      src={planet.imageSrc}
                      alt={planet.name}
                      className="w-full h-full object-cover rounded-full select-none"
                    />

                    {/* Natural Directional Day/Night Terminator (Zero circular black ring) */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, transparent 55%, rgba(0, 0, 0, 0.35) 80%, rgba(0, 0, 0, 0.75) 100%)',
                      }}
                    />

                    {/* Edge Rim Highlight directly on limb */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 16px ${planet.themeColor}, inset 0 2px 6px rgba(255,255,255,0.75)`,
                      }}
                    />
                  </div>

                  {/* Hover Tag */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[9px] text-white whitespace-nowrap bg-black/90 px-2 py-0.5 border border-white/20">
                    [ CLICK TO INSPECT DOSSIER ]
                  </div>
                </div>

                {/* Information Panel (Right on even, Left on odd) */}
                <div
                  className={`lg:absolute lg:top-4 ${
                    isEven ? 'lg:right-0' : 'lg:left-0'
                  } lg:w-[480px] z-30`}
                >
                  {/* Category Label & Explore Button */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[10px] text-zinc-400 tracking-[0.25em] uppercase text-shadow-cinematic">
                      {isEven ? 'EXPLORATION //' : 'HABITAT SURVEY //'}
                    </span>
                    <button
                      onClick={() => onSelectPlanet(planet)}
                      className="font-mono text-[11px] text-white hover:text-cyan-300 flex items-center gap-2 uppercase tracking-[0.2em] transition-colors text-shadow-cinematic cursor-pointer"
                    >
                      <span className="w-3.5 h-3.5 border border-zinc-500 inline-block relative after:absolute after:top-1.5 after:left-0.5 after:w-2 after:h-[1px] after:bg-white" />
                      <span>EXPLORE</span>
                    </button>
                  </div>

                  {/* Giant Planet Title with Cinematic Shadow */}
                  <h3 className="font-sans text-3xl sm:text-4xl font-light tracking-[0.2em] text-white uppercase mb-1 text-shadow-glow">
                    {planet.name}
                  </h3>
                  <div className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase mb-5 text-shadow-cinematic">
                    {planet.race}
                  </div>

                  {/* Coordinates & Distance */}
                  <div className="grid grid-cols-2 gap-6 pb-4 mb-4 border-b border-white/10">
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1 text-shadow-cinematic">
                        COORDINATES :
                      </div>
                      <div className="font-mono text-xs font-normal text-white tracking-wider text-shadow-cinematic">
                        {planet.coordinates}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1 text-shadow-cinematic">
                        DISTANCE :
                      </div>
                      <div className="font-mono text-xs font-normal text-white tracking-wider text-shadow-cinematic">
                        {planet.distance}
                      </div>
                    </div>
                  </div>

                  {/* Two Scientific Narrative Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300 leading-relaxed font-light mb-6">
                    <div className="text-shadow-cinematic">{planet.flamePhysicsCol1}</div>
                    <div className="text-shadow-cinematic">{planet.flamePhysicsCol2}</div>
                  </div>

                  {/* Bottom Row: Barcode, Chemical Elements & Landscape */}
                  <div className="flex items-end justify-between gap-4">
                    {/* Barcode Graphic */}
                    <div>
                      <div className="flex items-end gap-[2px] h-6">
                        <div className="w-[3px] h-full bg-white" />
                        <div className="w-[1px] h-full bg-white ml-0.5" />
                        <div className="w-[2px] h-full bg-white ml-1" />
                        <div className="w-[4px] h-full bg-white ml-0.5" />
                        <div className="w-[1px] h-full bg-white ml-1" />
                        <div className="w-[3px] h-full bg-white ml-0.5" />
                        <div className="w-[2px] h-full bg-white ml-1" />
                      </div>
                      <div className="font-mono text-[8px] text-zinc-400 tracking-[0.25em] mt-1 text-shadow-cinematic">
                        {planet.barcode}
                      </div>
                    </div>

                    {/* Chemical Element Badges */}
                    <div>
                      <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1 text-right text-shadow-cinematic">
                        PRIMARY RESOURCES
                      </div>
                      <div className="inline-flex items-center gap-1.5 border border-white/10 px-2 py-1">
                        {planet.resources.map((res) => (
                          <div key={res.symbol} className="text-center px-1">
                            <div className="font-mono text-[7px] text-zinc-400">{res.number}</div>
                            <div className="font-sans font-normal text-xs text-white">{res.symbol}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Landscape Preview Viewport */}
                    <div className="w-20 h-10 border border-white/20 overflow-hidden relative group">
                      {planet.landscapeImg ? (
                        <img
                          src={planet.landscapeImg}
                          alt={`${planet.name} landscape`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div
                          className="w-full h-full group-hover:scale-110 transition-transform"
                          style={{ background: planet.landscapeBg }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Large Background Section Number (e.g. _01, _02, 03_, _04, etc.) */}
                <div
                  className={`absolute ${
                    isEven ? 'right-0' : 'left-0'
                  } top-1/2 -translate-y-1/2 font-sans font-light text-7xl sm:text-9xl text-white/[0.04] pointer-events-none select-none`}
                >
                  {planet.sectionNumber}
                </div>
              </div>

              {/* Thin Horizontal Divider Line between planets */}
              {idx < PLANETARY_HABITATS.length - 1 && (
                <div className="w-full border-t border-white/10 my-16" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
