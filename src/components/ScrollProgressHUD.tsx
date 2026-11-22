import React from 'react';

interface ScrollProgressHUDProps {
  progress: number;
  onNavigate: (targetScrollProgress: number) => void;
}

const SECTIONS = [
  { id: 'sec1-hero', name: '01. ARQUITECTURA', target: 0.02 },
  { id: 'sec1-specs', name: '02. INGENIERÍA 72V', target: 0.25 },
  { id: 'sec2-intro', name: '03. RADIOGRAFÍA', target: 0.65 },
  { id: 'sec2-xray', name: '04. INTERACTIVO +', target: 0.88 },
];

export const ScrollProgressHUD: React.FC<ScrollProgressHUDProps> = ({ progress, onNavigate }) => {
  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-6 pointer-events-auto select-none">
      <div className="relative flex flex-col items-end gap-5">
        {SECTIONS.map((sec, idx) => {
          const isActive = 
            (idx === 0 && progress < 0.15) ||
            (idx === 1 && progress >= 0.15 && progress < 0.52) ||
            (idx === 2 && progress >= 0.52 && progress < 0.78) ||
            (idx === 3 && progress >= 0.78);

          return (
            <button
              key={sec.id}
              onClick={() => onNavigate(sec.target)}
              className="group flex items-center gap-3 text-right transition-all cursor-pointer"
            >
              <span 
                className={`text-[11px] font-mono tracking-wider transition-colors ${
                  isActive ? 'text-white font-bold' : 'text-white/40 group-hover:text-white'
                }`}
              >
                {sec.name}
              </span>
              <div 
                className={`w-2.5 h-2.5 rounded-full border transition-all ${
                  isActive 
                    ? 'bg-white border-white shadow-md shadow-white/50 scale-125' 
                    : 'bg-black border-white/40 group-hover:border-white'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};