import React from 'react';
import { ArrowDown, Cpu, Gauge, Layers, Battery, Activity } from 'lucide-react';

interface HUDOverlaysProps {
  progress: number;
}

export const HUDOverlays: React.FC<HUDOverlaysProps> = ({ progress }) => {
  const getPhaseStyle = (start: number, peak: number, end: number) => {
    let opacity = 0;
    if (progress >= start && progress <= peak) {
      opacity = (progress - start) / (peak - start);
    } else if (progress > peak && progress <= end) {
      opacity = 1 - (progress - peak) / (end - peak);
    }
    opacity = Math.max(0, Math.min(1, opacity));
    
    const translateY = (1 - opacity) * 20;
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.4 ? ('auto' as const) : ('none' as const),
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* ----------------- ACTO 1: HERO / STEALTH DESIGN ----------------- */}
      <div 
        style={getPhaseStyle(0.0, 0.12, 0.28)}
        className="absolute top-28 md:top-36 left-6 md:left-12 max-w-xl transition-all duration-300"
      >
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-cyan-500/20 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Acto 01 — La Ilusión de la Bici Clásica</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-[1.1]">
            POTENCIA INVISIBLE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              PESO DE COMPETICIÓN.
            </span>
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
            El primer ecosistema e-bike de carretera y gravel donde la integración es milimétrica:
            sin cajas de pedalier sobredimensionadas, sin baterías externas y sin cables a la vista.
          </p>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-black/40 p-2.5 rounded-lg border-l-2 border-l-cyan-400">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Peso Sistema</span>
              <span className="text-lg font-bold text-white tracking-tight">3.2 <span className="text-xs text-cyan-400 font-normal">kg</span></span>
            </div>
            <div className="bg-black/40 p-2.5 rounded-lg border-l-2 border-l-cyan-400">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Par Equiv.</span>
              <span className="text-lg font-bold text-white tracking-tight">55 <span className="text-xs text-cyan-400 font-normal">Nm</span></span>
            </div>
            <div className="bg-black/40 p-2.5 rounded-lg border-l-2 border-l-cyan-400">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Autonomía</span>
              <span className="text-lg font-bold text-white tracking-tight">100+ <span className="text-xs text-cyan-400 font-normal">km</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- ACTO 2: BATERÍA Y RAYOS X ----------------- */}
      <div 
        style={getPhaseStyle(0.28, 0.45, 0.65)}
        className="absolute top-28 md:top-36 right-6 md:right-36 lg:right-52 max-w-md transition-all duration-300 text-right"
      >
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-cyan-500/20 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Battery className="w-3.5 h-3.5" />
            <span>Acto 02 — Radiografía del Tubo Diagonal</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            CELDAS DE LITIO <br />
            <span className="text-cyan-400 font-mono">iX250 INTEGRATED</span>
          </h2>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-5">
            La cubierta de fibra de carbono se disuelve en transparencia técnica.
            En su interior reposan celdas cilíndricas de alta densidad gestionadas por el
            BMS inteligente con monitorización térmica y reparto dinámico de energía.
          </p>

          <div className="grid grid-cols-2 gap-2.5 text-left">
            <div className="bg-black/40 p-3 rounded-lg border border-cyan-500/20">
              <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase font-semibold">BMS Predictivo</span>
              </div>
              <p className="text-[11px] text-slate-300">Protección térmica activa y cálculo de degradación a 1000 Hz.</p>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-cyan-500/20">
              <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase font-semibold">Range Extender</span>
              </div>
              <p className="text-[11px] text-slate-300">+171 Wh adicionales en formato bidón ultraligero de 1.1 kg.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- ACTO 3: SENSOR DE PAR Y PEDALIER ----------------- */}
      <div 
        style={getPhaseStyle(0.65, 0.76, 0.88)}
        className="absolute top-28 md:top-36 left-6 md:left-12 max-w-lg transition-all duration-300"
      >
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-cyan-500/20 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Gauge className="w-3.5 h-3.5" />
            <span>Acto 03 — Sensor de Torsión y Cadencia</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            RESPUESTA NATURAL.<br />
            <span className="text-cyan-400">LATENCIA CERO.</span>
          </h2>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-5">
            Un sensor micrométrico en el eje de pedalier analiza milisegundo a milisegundo los vatios
            ejercidos por el ciclista. La asistencia acompaña tus piernas sin tirones mecánicos.
          </p>

          <div className="bg-black/40 p-3.5 rounded-lg border border-cyan-500/30">
            <div className="flex justify-between items-center mb-1.5 font-mono text-[11px] text-slate-400">
              <span>MODULACIÓN DE PAR</span>
              <span className="text-cyan-400">1000 Hz SAMPLING</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-200"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- ACTO 4: BUJE MOTOR Y CTA FINAL ----------------- */}
      <div 
        style={getPhaseStyle(0.88, 0.95, 1.0)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-6 text-center transition-all duration-300"
      >
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Acto 04 — Buje Motor X20 (1.39 kg)</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            CERO ARRASTRE.<br />
            <span className="text-cyan-400">LIBERTAD MECÁNICA.</span>
          </h2>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            Al superar los 25 km/h, el embrague interno desacopla la transmisión eléctrica.
            La bicicleta vuela por inercia como una máquina tradicional sin fricción residual.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs md:text-sm transition-all shadow-lg shadow-cyan-500/25 pointer-events-auto">
              Configurar Modelo
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs md:text-sm font-medium border border-slate-700 transition-all pointer-events-auto">
              Ficha Técnica Completa
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- FOOTER TELEMETRY HUD (PINNED AT BOTTOM) ----------------- */}
      <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 z-30 flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/80 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>SCROLL PROGRESS: {Math.round(progress * 100)}%</span>
        </div>

        {progress < 0.85 && (
          <div className="flex items-center gap-2 text-cyan-400 animate-bounce">
            <span>CONTINÚA EL SCROLL</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        )}

        <div className="hidden sm:block">
          <span>FPS: 24 | CADENCIA CINEMATOGRÁFICA (24 FPS)</span>
        </div>
      </div>
    </div>
  );
};
