import React, { memo } from 'react';

interface NaturalScrollNarrativeProps {
  progress: number; // 0.0 to 1.0 within Section 1
}

export const NaturalScrollNarrative: React.FC<NaturalScrollNarrativeProps> = memo(({ progress }) => {
  // Hero fades out gracefully as scroll starts (0% to 18%)
  const heroOpacity = Math.max(0, 1 - progress * 5.0);

  // Opacity transitions for each act in its definitive 3-column slot
  // Acto 02: fades in at 20% - 35%
  const opacity02 = Math.min(Math.max((progress - 0.20) / 0.12, 0), 1);
  // Acto 03: fades in at 42% - 56%
  const opacity03 = Math.min(Math.max((progress - 0.42) / 0.12, 0), 1);
  // Acto 04: fades in at 64% - 78%
  const opacity04 = Math.min(Math.max((progress - 0.64) / 0.12, 0), 1);

  // Bottom 3-column cards container fades in after hero scrolls, and stays visible so it scrolls up naturally
  const containerOpacity = Math.min(Math.max((progress - 0.16) / 0.08, 0), 1);

  return (
    <div className="relative z-10 w-full h-full pointer-events-none select-none">
      {/* ----------------- ACTO 01: HERO INICIAL (FUENTE GRUESA / ELEVADO EN MÓVIL Y ESCRITORIO) ----------------- */}
      <div 
        style={{ 
          opacity: heroOpacity,
          transform: `translate3d(0, -${progress * 70}px, 0)`,
          willChange: 'opacity, transform',
          pointerEvents: heroOpacity > 0.05 ? 'auto' : 'none'
        }}
        className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-28 sm:pb-32 md:pb-32 lg:pb-36 xl:pb-40 max-w-5xl pointer-events-none z-20"
      >
        <div className="pointer-events-auto">
          {/* Micro Tag */}
          <div className="flex items-center gap-2.5 mb-2.5 sm:mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-white/80 text-[11px] sm:text-sm font-mono font-bold tracking-[0.25em] uppercase">
              01 — Integración
            </span>
          </div>

          {/* Monumental Ultra-Bold Hero Headline (Unbounded 900 font-display font-black) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white mb-3 sm:mb-5 leading-[0.88] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            Potencia<br />
            <span>invisible.</span>
          </h1>

          {/* Hero Subtitle in Bold */}
          <p className="text-white/90 text-xs sm:text-base lg:text-lg font-medium leading-relaxed mb-5 sm:mb-8 max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Toda la capacidad de un motor eléctrico de alto rendimiento, preservando la silueta y agilidad de un cuadro tradicional.
          </p>

          {/* Open Monumental Metrics Grid (Cifras Gruesas y Contundentes) */}
          <div className="grid grid-cols-3 gap-4 sm:gap-10 pt-3.5 sm:pt-6 border-t-2 border-white/30 max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <div>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white block tracking-tighter">
                38<span className="text-xs sm:text-base font-bold text-white/70 ml-0.5 sm:ml-1">kg</span>
              </span>
              <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white/70 block mt-1 sm:mt-1.5">
                Sistema total
              </span>
            </div>

            <div>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white block tracking-tighter">
                180<span className="text-xs sm:text-base font-bold text-white/70 ml-0.5 sm:ml-1">Nm</span>
              </span>
              <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white/70 block mt-1.5">
                Par motor
              </span>
            </div>

            <div>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white block tracking-tighter">
                120<span className="text-xs sm:text-base font-bold text-white/70 ml-0.5 sm:ml-1">km</span>
              </span>
              <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white/70 block mt-1.5">
                Rango estimado
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- CONTENEDOR EN POSICIÓN DEFINITIVA (ELEVADO EN ESCRITORIO) ----------------- */}
      <div 
        style={{ 
          opacity: containerOpacity,
          willChange: 'opacity',
          pointerEvents: containerOpacity > 0.1 ? 'auto' : 'none'
        }}
        className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 xl:bottom-32 left-6 right-6 md:left-10 md:right-12 lg:left-12 lg:right-48 xl:left-16 xl:right-52 z-20 pointer-events-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5 max-w-7xl mx-auto items-stretch">
          
          {/* SLOT DEFINITIVO 1: ACTO 02 (Energía 72V) */}
          <div 
            style={{ 
              opacity: opacity02,
              willChange: 'opacity',
              pointerEvents: opacity02 > 0.1 ? 'auto' : 'none'
            }}
            className="h-full flex flex-col justify-between bg-[#0a0d14]/90 border border-white/20 rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2 md:mb-3">
                <span className="text-white/70 font-mono font-bold text-[10px] md:text-xs uppercase tracking-wider">02 — ENERGÍA</span>
                <span className="text-white font-bold text-xs md:text-sm">Batería 72V Li-Ion</span>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-3 pt-2 md:pt-3 border-t border-white/20">
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    1.8<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">kWh</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">Capacidad</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    35<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">Ah</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">Descarga</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    2.5<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">h</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">Carga</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 md:pt-3 mt-3 border-t border-white/20 text-[10px] md:text-xs text-white/70 font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Blindaje de aluminio con disipador y BMS</span>
            </div>
          </div>

          {/* SLOT DEFINITIVO 2: ACTO 03 (Parte Ciclo) */}
          <div 
            style={{ 
              opacity: opacity03,
              willChange: 'opacity',
              pointerEvents: opacity03 > 0.1 ? 'auto' : 'none'
            }}
            className="h-full flex flex-col justify-between bg-[#0a0d14]/90 border border-white/20 rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2 md:mb-3">
                <span className="text-white/70 font-mono font-bold text-[10px] md:text-xs uppercase tracking-wider">03 — PARTE CICLO</span>
                <span className="text-white font-bold text-xs md:text-sm">Suspensión Full-Travel</span>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-3 pt-2 md:pt-3 border-t border-white/20">
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    200<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">mm</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">Horquilla</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    20<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">"</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">Fat 4.0</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    4<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">p</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">Pistones</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 md:pt-3 mt-3 border-t border-white/20 text-[10px] md:text-xs text-white/70 font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Doble pletina invertida y amortiguador helicoidal</span>
            </div>
          </div>

          {/* SLOT DEFINITIVO 3: ACTO 04 (Propulsión & Potencia) */}
          <div 
            style={{ 
              opacity: opacity04,
              willChange: 'opacity',
              pointerEvents: opacity04 > 0.1 ? 'auto' : 'none'
            }}
            className="h-full flex flex-col justify-between bg-[#0a0d14]/90 border border-white/20 rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2 md:mb-3">
                <span className="text-white/70 font-mono font-bold text-[10px] md:text-xs uppercase tracking-wider">04 — PROPULSIÓN</span>
                <span className="text-white font-bold text-xs md:text-sm">Motor High-Torque</span>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-3 pt-2 md:pt-3 border-t border-white/20 mb-3">
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    3.0<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">kW</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">Pico</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    75<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">km/h</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">Velocidad</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tighter block">
                    &lt;3.2<span className="text-xs md:text-sm font-bold text-white/70 ml-0.5">s</span>
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/60 uppercase block mt-1">0-50 km/h</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 md:pt-3 mt-3 border-t border-white/20">
              <button className="flex-1 px-3 py-1.5 md:py-2 rounded-full bg-white text-black font-extrabold text-[10px] md:text-xs hover:bg-neutral-200 transition-all text-center cursor-pointer shadow-md">
                Configurar
              </button>
              <button className="flex-1 px-3 py-1.5 md:py-2 rounded-full bg-transparent text-white border border-white/30 font-bold text-[10px] md:text-xs hover:bg-white/10 transition-all text-center cursor-pointer">
                Ficha Técnica
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});