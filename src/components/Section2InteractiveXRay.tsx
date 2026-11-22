import React, { useState, useEffect, useRef, memo } from 'react';
import { Plus, X, Cpu, BatteryCharging, Zap, Disc } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  tag: string;
  title: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'bms',
    x: 42,
    y: 32,
    tag: 'ELECTRÓNICA',
    title: 'Controlador FOC 72V',
    icon: <Cpu className="w-4 h-4 text-white" />,
    specs: [
      { label: 'Frecuencia', value: '1000 Hz' },
      { label: 'Eficiencia', value: '96% FOC' },
    ],
    description: 'Unidad de control de onda sinusoidal integrada en la viga superior del chasis. Monitorea cada grupo de celdas en tiempo real y regula picos de descarga.'
  },
  {
    id: 'cells',
    x: 49,
    y: 46,
    tag: 'ALMACENAMIENTO',
    title: 'Pack de Celdas 72V 35Ah',
    icon: <Zap className="w-4 h-4 text-white" />,
    specs: [
      { label: 'Capacidad', value: '1.8 kWh' },
      { label: 'Descarga', value: '35 Ah continua' },
    ],
    description: 'Matriz de celdas de litio alojada en el compartimento central blindado con disipación pasiva de calor. Conexión directa al controlador sin cableado externo.'
  },
  {
    id: 'shock',
    x: 60,
    y: 56,
    tag: 'SUSPENSIÓN',
    title: 'Monoamortiguador con Piggyback',
    icon: <BatteryCharging className="w-4 h-4 text-white" />,
    specs: [
      { label: 'Recorrido', value: '85 mm' },
      { label: 'Ajuste', value: 'Precarga / Rebote' },
    ],
    description: 'Amortiguador de muelle helicoidal progresivo con botella de nitrógeno externa. Absorbe saltos e impactos de alta frecuencia protegiendo el basculante.'
  },
  {
    id: 'motor',
    x: 77,
    y: 68,
    tag: 'PROPULSIÓN',
    title: 'Motor Buje 3000W & Disco 203mm',
    icon: <Disc className="w-4 h-4 text-white" />,
    specs: [
      { label: 'Potencia', value: '3000W Pico' },
      { label: 'Par', value: '180 Nm' },
    ],
    description: 'Motor eléctrico sin escobillas montado directamente en el eje trasero. Pinza de freno hidráulica de 4 pistones con disco perforado de disipación rápida.'
  }
];

interface Section2InteractiveXRayProps {
  progress: number; // 0.0 to 1.0 within Section 2
}

export const Section2InteractiveXRay: React.FC<Section2InteractiveXRayProps> = memo(({ progress }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const scrollAtOpen = useRef<number | null>(null);

  // Close when clicking outside the popover card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        // If clicking on a hotspot button, let the button's onClick handle direct switching
        if (target.closest('.hotspot-trigger')) return;
        setActiveHotspot(null);
      }
    };

    if (activeHotspot) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeHotspot]);

  // Close popover only if user scrolls noticeably
  useEffect(() => {
    if (activeHotspot) {
      scrollAtOpen.current = window.scrollY;
      const handleScroll = () => {
        if (scrollAtOpen.current !== null && Math.abs(window.scrollY - scrollAtOpen.current) > 160) {
          setActiveHotspot(null);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      scrollAtOpen.current = null;
    }
  }, [activeHotspot]);

  // Intro header is visible when Section 2 is revealed, fades out gracefully as user scrolls into the X-ray sequence
  const introOpacity = Math.min(1, Math.max(0, 1 - (progress - 0.12) / 0.10));

  // Hotspots fade in smoothly right as the intro text has cleared
  const hotspotsOpacity = Math.min(1, Math.max(0, (progress - 0.22) / 0.10));

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      {/* Section 02 Intro Header (Imitating Section 1 Hero Impact / Elevado en móvil y escritorio) */}
      <div 
        style={{ 
          opacity: introOpacity,
          willChange: 'opacity, transform',
          pointerEvents: introOpacity > 0.1 ? 'auto' : 'none',
          transform: `translate3d(0, -${progress * 70}px, 0)`
        }}
        className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-28 sm:pb-32 md:pb-32 lg:pb-36 xl:pb-40 max-w-5xl pointer-events-none z-20"
      >
        <div className="pointer-events-auto">
          {/* Micro Tag */}
          <div className="flex items-center gap-2.5 mb-2.5 sm:mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-white/80 text-[11px] sm:text-sm font-mono font-bold tracking-[0.25em] uppercase">
              02 — Arquitectura Interna
            </span>
          </div>

          {/* Monumental Ultra-Bold Hero Headline (Unbounded 900 font-display font-black) */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white mb-3 sm:mb-5 leading-[0.88] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            Radiografía<br />
            <span>de alta tensión.</span>
          </h2>

          {/* Hero Subtitle */}
          <p className="text-white/90 text-xs sm:text-base lg:text-lg font-medium leading-relaxed mb-5 sm:mb-8 max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Desplaza verticalmente para recorrer el núcleo de potencia. Pulsa en los círculos interactivos para inspeccionar cada elemento.
          </p>

          {/* Open Monumental Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-10 pt-3.5 sm:pt-6 border-t-2 border-white/30 max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <div>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white block tracking-tighter">
                72<span className="text-xs sm:text-base font-bold text-white/70 ml-0.5 sm:ml-1">V</span>
              </span>
              <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white/70 block mt-1 sm:mt-1.5">
                Tensión nominal
              </span>
            </div>

            <div>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white block tracking-tighter">
                4<span className="text-xs sm:text-base font-bold text-white/70 ml-0.5 sm:ml-1">pts</span>
              </span>
              <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white/70 block mt-1 sm:mt-1.5">
                Inspección X-Ray
              </span>
            </div>

            <div>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white block tracking-tighter">
                FOC<span className="text-xs sm:text-base font-bold text-white/70 ml-0.5 sm:ml-1">96%</span>
              </span>
              <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white/70 block mt-1 sm:mt-1.5">
                Eficiencia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hotspot Circles (+ / X buttons) */}
      <div 
        style={{ 
          opacity: hotspotsOpacity,
          pointerEvents: hotspotsOpacity > 0.05 ? 'auto' : 'none'
        }}
        className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300"
      >
        {HOTSPOTS.map((spot) => {
          const isActive = activeHotspot?.id === spot.id;

          return (
            <div
              key={spot.id}
              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              {/* Hotspot Button with pulsing outer ring */}
              <div className="relative flex items-center justify-center">
                {!isActive && (
                  <span className="absolute w-12 h-12 rounded-full border border-white/50 animate-ping opacity-30 pointer-events-none" />
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(isActive ? null : spot);
                  }}
                  className={`hotspot-trigger relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white text-black scale-110 shadow-2xl shadow-white/60 border-2 border-white' 
                      : 'bg-black/70 text-white border border-white/40 hover:border-white hover:bg-black/90 hover:scale-115 backdrop-blur-md shadow-lg shadow-black/60'
                  }`}
                  aria-label={isActive ? `Cerrar ${spot.title}` : `Inspeccionar ${spot.title}`}
                >
                  {isActive ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] transition-transform duration-200 hover:rotate-90" />
                  )}
                </button>
              </div>

              {/* Minimal floating badge under dot (hidden when active) */}
              {!isActive && (
                <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-white/80 bg-black/70 px-2 py-0.5 rounded-full border border-white/15 backdrop-blur-sm shadow-md block">
                    {spot.tag}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Backdrop Overlay for closing on outside click (z-40) */}
      {activeHotspot && (
        <div 
          onClick={() => setActiveHotspot(null)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px] transition-opacity duration-200 pointer-events-auto cursor-pointer"
          aria-label="Cerrar modal"
        />
      )}

      {/* Popover Detail Modal Card (z-50) */}
      {activeHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          <div 
            ref={popoverRef}
            className="pointer-events-auto relative bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header: Icon, Tag, Title, and prominent 'X' button */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 text-white">
                  {activeHotspot.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block">
                    {activeHotspot.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-light text-white tracking-tight">
                    {activeHotspot.title}
                  </h3>
                </div>
              </div>

              {/* Close Button 'X' */}
              <button
                onClick={() => setActiveHotspot(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-sm"
                aria-label="Cerrar información"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Description */}
            <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed mb-6">
              {activeHotspot.description}
            </p>

            {/* Technical Specs 2-Column Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/15">
              {activeHotspot.specs.map((sp) => (
                <div key={sp.label} className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-white/50 block mb-0.5">
                    {sp.label}
                  </span>
                  <span className="text-sm sm:text-base font-light text-white tracking-tight">
                    {sp.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Close hint on footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>PULSA 'X' O FUERA PARA CERRAR</span>
              <span className="text-white/60">APEX 72V INTERNALS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});