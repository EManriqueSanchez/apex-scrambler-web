import React from 'react';
import { Zap, Wifi, BatteryCharging, Gauge } from 'lucide-react';

interface NavbarProps {
  progress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ progress }) => {
  const batteryPct = Math.max(74, Math.round(100 - progress * 26));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pb-8 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/85 via-black/50 to-transparent backdrop-blur-[2px]">
      {/* Brand */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-white/10">
          <Zap className="w-4 h-4 text-black stroke-[3]" />
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-white font-bold block drop-shadow">
            APEX // E-MOTO
          </span>
          <span className="text-xs font-light tracking-wide text-white/70 flex items-center gap-1.5 drop-shadow">
            TITAN SCRAMBLER <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/15 text-white/90 border border-white/20 font-mono">72V PRO</span>
          </span>
        </div>
      </div>

      {/* Telemetry Pills */}
      <div className="hidden md:flex items-center gap-3 pointer-events-auto">
        <div className="bg-black/40 border border-white/15 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-white/90 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>SPORT MODE ACTIVE</span>
        </div>

        <div className="bg-black/40 border border-white/15 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-white/90 backdrop-blur-sm">
          <BatteryCharging className="w-3.5 h-3.5 text-white" />
          <span>{batteryPct}% 72V 35Ah</span>
        </div>

        <div className="bg-black/40 border border-white/15 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-white/90 backdrop-blur-sm">
          <Wifi className="w-3.5 h-3.5 text-white" />
          <span>CAN-BUS / GPS</span>
        </div>
      </div>

      {/* Action */}
      <div className="pointer-events-auto">
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
          className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10 font-medium cursor-pointer"
        >
          <Gauge className="w-3.5 h-3.5 text-black" />
          <span>Telemetría</span>
        </button>
      </div>
    </header>
  );
};