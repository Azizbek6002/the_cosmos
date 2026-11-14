import React from 'react';
import { X, Flame, ShieldAlert, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PlanetaryHabitat } from '../types';

interface PlanetDossierModalProps {
  planet: PlanetaryHabitat | null;
  onClose: () => void;
  onOpenSimulator: () => void;
}

export const PlanetDossierModal: React.FC<PlanetDossierModalProps> = ({
  planet,
  onClose,
  onOpenSimulator,
}) => {
  if (!planet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090a0f] border border-white/10 text-white shadow-2xl overflow-hidden my-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-black/50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/30">
              NASA PSI ARCHIVE // {planet.sectionNumber}
            </span>
            <div className="font-sans font-light text-base sm:text-lg tracking-[0.2em] uppercase text-shadow-cinematic">
              {planet.name} // COMBUSTION PROFILE
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
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto font-sans font-light">
          {/* Section: Planet Vital Telemetry Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-white/10 pb-5 font-mono text-xs">
            <div>
              <span className="text-zinc-500 block text-[10px] tracking-wider uppercase">GRAVITY (g):</span>
              <strong className="text-white text-base font-normal text-shadow-cinematic">{planet.gravityG}g</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] tracking-wider uppercase">OXYGEN LEVEL:</span>
              <strong className="text-cyan-400 text-base font-normal text-shadow-cyan">{planet.oxygenPct}% O2</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] tracking-wider uppercase">HABITAT PRESSURE:</span>
              <strong className="text-amber-400 text-base font-normal text-shadow-amber">{planet.pressureKpa} kPa</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] tracking-wider uppercase">CABIN VENTILATION:</span>
              <strong className="text-emerald-400 text-base font-normal text-shadow-cinematic">{planet.airflowCmS} cm/s</strong>
            </div>
          </div>

          {/* Section: Combustion Physics Deep-Dive */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400 text-shadow-cinematic">
                1. MICROGRAVITY & LOW-BUOYANCY FLAME PHYSICS (NASA PSI)
              </h4>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-light text-shadow-cinematic">
              {planet.flameDetailed}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="border-l border-white/20 pl-3">
                <span className="text-zinc-400 font-mono text-[10px] block uppercase mb-1">
                  Buoyancy & Convection Profile:
                </span>
                <p className="text-zinc-300 font-light">{planet.flamePhysicsCol1}</p>
              </div>
              <div className="border-l border-white/20 pl-3">
                <span className="text-zinc-400 font-mono text-[10px] block uppercase mb-1">
                  Cool Flame Dynamics & CO Risk:
                </span>
                <p className="text-zinc-300 font-light">{planet.flamePhysicsCol2}</p>
              </div>
            </div>
          </div>

          {/* Section: Material Flammability & Hazard Matrix */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 text-shadow-cinematic">
                2. HIGH-RISK MATERIALS & COMBUSTION MECHANISMS
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {planet.materialRisks.map((risk, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-2.5 border-l-2 border-red-500/50 text-xs font-light"
                >
                  <span className="text-zinc-200 leading-relaxed text-shadow-cinematic">{risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: NASA Flight Experiments */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400 text-shadow-cyan">
                3. CORRELATED NASA FLIGHT EXPERIMENTS (ISS & CYGNUS)
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {planet.nasaExperiments.map((exp, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 py-1 text-zinc-300 font-light"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="text-shadow-cinematic">{exp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Actionable Fire Suppression Protocol */}
          <div className="border-l-2 border-emerald-400 pl-4 py-2 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 font-normal">
                4. RECOMMENDED EXTINCTION & CREW SAFETY PROTOCOL
              </h4>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed font-light text-shadow-cinematic">
              {planet.suppressionProtocol}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 bg-black/70">
          <div className="font-mono text-[10px] text-zinc-500">
            COORDINATES: {planet.coordinates} · DISTANCE: {planet.distance}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSimulator();
              }}
              className="px-4 py-2 bg-red-600/90 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-wider font-normal transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>TEST IN SIMULATOR</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-white/20 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
