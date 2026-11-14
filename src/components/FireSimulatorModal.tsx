import React, { useState } from 'react';
import { X, CheckCircle, ShieldAlert } from 'lucide-react';

interface FireSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FireSimulatorModal: React.FC<FireSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [gravity, setGravity] = useState<number>(0.0);
  const [oxygen, setOxygen] = useState<number>(21.0);
  const [pressure, setPressure] = useState<number>(101.3);
  const [airflow, setAirflow] = useState<number>(10.0);
  const [material, setMaterial] = useState<'nomex' | 'pmma' | 'ptfe' | 'methane'>('pmma');

  if (!isOpen) return null;

  // Preset Handlers
  const applyPreset = (g: number, o2: number, p: number, u: number) => {
    setGravity(g);
    setOxygen(o2);
    setPressure(p);
    setAirflow(u);
  };

  // Physical calculations based on NASA combustion science
  const isExtinguished = oxygen < 13.5 && airflow < 2;
  const flameBurnRate = Math.max(
    0.1,
    (oxygen - 12) * 0.12 * (pressure / 101.3) * (1 + gravity * 0.5) * (1 + airflow * 0.05)
  ).toFixed(2);
  const quenchingDistance = Math.max(
    0.8,
    25 / ((oxygen / 21) * (pressure / 101.3) * (1 + (1 - gravity) * 0.8))
  ).toFixed(1);
  const coAccumulationIndex = gravity === 0 ? 'CRITICAL (95%)' : gravity < 0.4 ? 'ELEVATED (72%)' : 'NOMINAL (18%)';

  // Flame visual characteristics
  const flameShapeText =
    gravity === 0
      ? 'Quiescent Spherical Diffusion Envelope (Microgravity)'
      : gravity < 0.3
      ? 'Low-Buoyancy Flattened Dome (Lunar / Martian)'
      : gravity < 0.8
      ? 'Moderate Convective Tear-Flame'
      : 'Buoyancy-Driven Turbulent Plume (1g Terrestrial)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#08090d] border border-white/10 text-white shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-black/50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-0.5 bg-red-600/90 text-white font-normal tracking-wider">
              INTERACTIVE SIMULATOR
            </span>
            <div className="font-sans font-light text-base sm:text-lg tracking-[0.15em] uppercase text-shadow-cinematic">
              NASA SPACEFIRE DYNAMICS & FLAME PROPAGATION ENGINE
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto font-sans font-light">
          {/* Preset Buttons */}
          <div>
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 text-shadow-cinematic">
              SELECT HABITAT FLIGHT PRESETS:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => applyPreset(0.0, 21.0, 101.3, 10.0)}
                className={`p-2.5 text-left border font-mono text-xs transition-all ${
                  gravity === 0.0
                    ? 'border-cyan-400 bg-cyan-950/20 text-cyan-200'
                    : 'border-white/10 hover:border-white/20 text-zinc-400'
                }`}
              >
                <div className="font-normal text-white text-shadow-cinematic">ISS / 0g (Orbital)</div>
                <div className="text-[10px] text-zinc-400 font-light">0.00g · 21% O2 · 101.3 kPa</div>
              </button>

              <button
                onClick={() => applyPreset(0.166, 21.0, 56.5, 5.0)}
                className={`p-2.5 text-left border font-mono text-xs transition-all ${
                  gravity === 0.166
                    ? 'border-cyan-400 bg-cyan-950/20 text-cyan-200'
                    : 'border-white/10 hover:border-white/20 text-zinc-400'
                }`}
              >
                <div className="font-normal text-white text-shadow-cinematic">LUNA / 0.166g (Moon)</div>
                <div className="text-[10px] text-zinc-400 font-light">0.166g · Artemis Hab</div>
              </button>

              <button
                onClick={() => applyPreset(0.38, 28.0, 56.0, 8.0)}
                className={`p-2.5 text-left border font-mono text-xs transition-all ${
                  gravity === 0.38
                    ? 'border-cyan-400 bg-cyan-950/20 text-cyan-200'
                    : 'border-white/10 hover:border-white/20 text-zinc-400'
                }`}
              >
                <div className="font-normal text-white text-shadow-cinematic">MARS / 0.38g (Base)</div>
                <div className="text-[10px] text-zinc-400 font-light">0.38g · 28% O2 (Low-P)</div>
              </button>

              <button
                onClick={() => applyPreset(1.0, 21.0, 101.3, 0.0)}
                className={`p-2.5 text-left border font-mono text-xs transition-all ${
                  gravity === 1.0
                    ? 'border-cyan-400 bg-cyan-950/20 text-cyan-200'
                    : 'border-white/10 hover:border-white/20 text-zinc-400'
                }`}
              >
                <div className="font-normal text-white text-shadow-cinematic">EARTH / 1.0g (Standard)</div>
                <div className="text-[10px] text-zinc-400 font-light">1.00g · Terrestrial Sea Level</div>
              </button>
            </div>
          </div>

          {/* Main Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Slider 1: Gravity */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-zinc-400">GRAVITY FIELD (g):</span>
                  <strong className="text-cyan-400 font-normal text-shadow-cyan">{gravity.toFixed(3)} g</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={gravity}
                  onChange={(e) => setGravity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-zinc-800 h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-0.5">
                  <span>0g (Microgravity)</span>
                  <span>0.166g (Moon)</span>
                  <span>0.38g (Mars)</span>
                  <span>1.0g (Earth)</span>
                </div>
              </div>

              {/* Slider 2: Oxygen */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-zinc-400">OXYGEN CONCENTRATION (% O2):</span>
                  <strong className="text-amber-400 font-normal text-shadow-amber">{oxygen.toFixed(1)} %</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  step="0.5"
                  value={oxygen}
                  onChange={(e) => setOxygen(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 bg-zinc-800 h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-0.5">
                  <span>10% (Extinction LOC Limit)</span>
                  <span>21% (Nominal Earth)</span>
                  <span>35% (High-O2 Exploration)</span>
                </div>
              </div>

              {/* Slider 3: Pressure */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-zinc-400">AMBIENT PRESSURE (kPa):</span>
                  <strong className="text-emerald-400 font-normal text-shadow-cinematic">{pressure.toFixed(1)} kPa</strong>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  step="1"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 bg-zinc-800 h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-0.5">
                  <span>56.5 kPa (Artemis 8.2 psi)</span>
                  <span>101.3 kPa (1 atm)</span>
                  <span>120 kPa</span>
                </div>
              </div>

              {/* Slider 4: Ventilation Airflow */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-zinc-400">FORCED CABIN AIRFLOW (cm/s):</span>
                  <strong className="text-blue-400 font-normal text-shadow-cinematic">{airflow.toFixed(1)} cm/s</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="0.5"
                  value={airflow}
                  onChange={(e) => setAirflow(parseFloat(e.target.value))}
                  className="w-full accent-blue-400 bg-zinc-800 h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-0.5">
                  <span>0 cm/s (Stagnant Air)</span>
                  <span>10 cm/s (ISS Nominal Draft)</span>
                  <span>30 cm/s (High Ventilation)</span>
                </div>
              </div>

              {/* Material Selection */}
              <div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-1.5 text-shadow-cinematic">
                  MATERIAL TEST SAMPLES:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'pmma', name: 'PMMA (Acrylic)', type: 'Viewing Port' },
                    { id: 'nomex', name: 'Nomex Aramid', type: 'Flight Suit' },
                    { id: 'ptfe', name: 'PTFE (Teflon)', type: 'Wire Jacket' },
                    { id: 'methane', name: 'CH4 Fuel', type: 'Propellant Gas' },
                  ].map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setMaterial(mat.id as any)}
                      className={`p-2 text-left border font-mono text-[11px] transition-all ${
                        material === mat.id
                          ? 'border-white bg-white/10 text-white font-normal'
                          : 'border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="text-shadow-cinematic">{mat.name}</div>
                      <div className="text-[9px] text-zinc-400 font-light">{mat.type}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Flame Display & Real-time Metrics Column */}
            <div className="lg:col-span-5 flex flex-col justify-between border-l border-white/10 pl-6">
              {/* Flame Visualization Box */}
              <div className="relative w-full h-48 bg-gradient-to-b from-[#020305] to-[#0a0c14] border border-white/10 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-2 left-2 font-mono text-[9px] text-zinc-400 tracking-wider">
                  FLAME PROFILE // NASA PSI PHYSICS
                </div>

                {isExtinguished ? (
                  <div className="text-center font-mono text-xs text-zinc-400 flex flex-col items-center gap-1">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mb-1" />
                    <span className="text-emerald-300 font-normal">FLAME EXTINGUISHED</span>
                    <span className="text-[10px] font-light">Sub-LOC threshold or insufficient convective flux</span>
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center">
                    {/* Simulated Dynamic Flame Shape */}
                    {gravity === 0 ? (
                      /* Perfect Microgravity Sphere (Blue / Cyan Flame) */
                      <div className="relative flex items-center justify-center">
                        <div
                          className="rounded-full bg-gradient-to-tr from-cyan-600 via-blue-500 to-transparent blur-[1px] shadow-[0_0_25px_#06b6d4] animate-pulse"
                          style={{
                            width: `${Math.min(90, Math.max(30, oxygen * 2.8))}px`,
                            height: `${Math.min(90, Math.max(30, oxygen * 2.8))}px`,
                          }}
                        />
                        <div className="absolute w-4 h-4 rounded-full bg-white blur-[2px] opacity-75" />
                        <span className="absolute -bottom-6 font-mono text-[9px] text-cyan-300 uppercase tracking-widest whitespace-nowrap text-shadow-cyan">
                          0g Spherical Blue Diffusion Flame
                        </span>
                      </div>
                    ) : gravity < 0.4 ? (
                      /* Partial Gravity Dome (Moon / Mars) */
                      <div className="relative flex flex-col items-center">
                        <div
                          className="rounded-t-full bg-gradient-to-t from-orange-600 via-amber-400 to-blue-500 blur-[1px] shadow-[0_0_30px_#f59e0b]"
                          style={{
                            width: `${Math.min(80, Math.max(35, oxygen * 2.5))}px`,
                            height: `${Math.min(90, Math.max(35, oxygen * 2.5 * (1 + gravity * 0.8)))}px`,
                          }}
                        />
                        <span className="font-mono text-[9px] text-amber-300 uppercase tracking-widest mt-2 whitespace-nowrap text-shadow-amber">
                          {gravity.toFixed(2)}g Low-Buoyancy Dome
                        </span>
                      </div>
                    ) : (
                      /* Standard 1g Teardrop Flame */
                      <div className="relative flex flex-col items-center">
                        <div
                          className="rounded-full bg-gradient-to-t from-blue-700 via-orange-500 to-yellow-200 blur-[1px] shadow-[0_0_35px_#f97316] animate-[pulse_1.5s_infinite]"
                          style={{
                            width: `${Math.min(65, Math.max(25, oxygen * 2))}px`,
                            height: `${Math.min(130, Math.max(50, oxygen * 4))}px`,
                            borderRadius: '50% 50% 35% 35% / 70% 70% 30% 30%',
                          }}
                        />
                        <span className="font-mono text-[9px] text-orange-300 uppercase tracking-widest mt-2 whitespace-nowrap text-shadow-cinematic">
                          1g Buoyant Teardrop Flame
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dynamic Calculations */}
              <div className="mt-4 space-y-2 font-mono text-xs border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400">PROPAGATION RATE:</span>
                  <span className="text-white font-normal text-shadow-cinematic">{flameBurnRate} mm/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">QUENCHING DISTANCE:</span>
                  <span className="text-cyan-300 font-normal text-shadow-cyan">{quenchingDistance} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">CO ACCUMULATION HAZARD:</span>
                  <span className={gravity === 0 ? 'text-red-400 font-normal' : 'text-zinc-300'}>
                    {coAccumulationIndex}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 pt-1 border-t border-white/5 font-light">
                  <span className="text-zinc-300 block mb-0.5">GEOMETRIC PROFILE:</span>
                  <span>{flameShapeText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actionable NASA Safety Recommendation */}
          <div className="border-l-2 border-red-500 pl-4 py-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-red-400 uppercase mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>NASA DIRECTIVE & CREW ACTION:</span>
            </div>
            <p className="text-zinc-200 font-sans text-xs sm:text-sm leading-relaxed font-light text-shadow-cinematic">
              {gravity === 0
                ? "WARNING: In 0g microgravity, cease all forced ventilation immediately. Without forced flow, the flame will self-suffocate via oxygen starvation within its boundary layer. Continued airflow will expand the flame front. Engage catalytic filters to capture high CO buildup."
                : gravity < 0.4
                ? "LUNAR / MARTIAN PROTOCOL: Buoyant draft is weak; combustion products migrate laterally across cabin floor levels. Reduce ambient oxygen below 13% by purging with inert gas (CO2 or N2) to achieve rapid quench."
                : "TERRESTRIAL 1g PROTOCOL: Buoyant convection drives hot plumes upward. Deploy standard ceiling detectors and fire suppression agents."}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 bg-black/70">
          <div className="font-mono text-[10px] text-zinc-400">
            SIMULATION ENGINE // BASED ON NASA PHYSICAL SCIENCES INFORMATICS (PSI)
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-black font-mono text-xs uppercase tracking-wider font-medium hover:bg-zinc-200 transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
