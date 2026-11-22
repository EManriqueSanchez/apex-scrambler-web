import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { ScrollyCanvasSequence } from './components/ScrollyCanvasSequence';
import { NaturalScrollNarrative } from './components/NaturalScrollNarrative';
import { Section2InteractiveXRay } from './components/Section2InteractiveXRay';
import { ScrollProgressHUD } from './components/ScrollProgressHUD';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES_S1 = 163;
const TOTAL_FRAMES_S2 = 119;

export default function App() {
  const [overallProgress, setOverallProgress] = useState(0);
  const [section1Progress, setSection1Progress] = useState(0);
  const [section2Progress, setSection2Progress] = useState(0);

  const pageRef = useRef<HTMLDivElement | null>(null);
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Global scroll trigger for page-level telemetry
    const globalTrigger = ScrollTrigger.create({
      trigger: pageRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.05,
      onUpdate: (self) => {
        setOverallProgress(self.progress);
      },
    });

    // Section 1: scrubs while pinned at top for 220vh
    const trigger1 = ScrollTrigger.create({
      trigger: section1Ref.current,
      start: 'top top',
      end: () => '+=' + (window.innerHeight * 2.2),
      scrub: 0.05,
      onUpdate: (self) => {
        setSection1Progress(self.progress);
      },
    });

    // Section 2: starts scrubbing when Section 1 has fully lifted (100vh after Section 2 track top hits top: 0)
    const trigger2 = ScrollTrigger.create({
      trigger: section2Ref.current,
      start: () => 'top+=' + window.innerHeight + ' top',
      end: () => 'top+=' + (window.innerHeight * 3.2) + ' top',
      scrub: 0.05,
      onUpdate: (self) => {
        setSection2Progress(self.progress);
      },
    });

    return () => {
      globalTrigger.kill();
      trigger1.kill();
      trigger2.kill();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Quick navigation handler from HUD
  const handleNavigate = (targetProgress: number) => {
    if (!lenisRef.current || !pageRef.current) return;
    const scrollHeight = pageRef.current.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * scrollHeight;
    lenisRef.current.scrollTo(targetScroll, { duration: 0.8 });
  };

  const isSection2 = overallProgress >= 0.50;
  const currentSectionNumber = isSection2 ? 2 : 1;

  return (
    <div ref={pageRef} className="relative bg-black text-white w-full">
      {/* Top Navbar */}
      <Navbar progress={overallProgress} />

      {/* Right HUD Navigation */}
      <ScrollProgressHUD 
        progress={overallProgress} 
        onNavigate={handleNavigate} 
      />

      {/* ===================== SECCIÓN 01 (3D E-MOTO) ===================== */}
      {/* Height 320vh: 220vh pinned video scrubbing + 100vh normal curtain lift out */}
      <section ref={section1Ref} className="relative w-full h-[320vh] z-20">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black shadow-[0_35px_60px_-15px_rgba(0,0,0,0.95)] border-b border-white/10">
          {/* Canvas for Section 1 */}
          <ScrollyCanvasSequence 
            progress={section1Progress} 
            totalFrames={TOTAL_FRAMES_S1}
            framesFolder="/frames"
            opacity={1}
            showLoading={true}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black"
          />

          {/* Subtle dark to transparent gradient overlay for high visibility without obscuring the bike */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 via-30% to-transparent pointer-events-none z-10" />

          {/* Narrative for Section 1 (Hero + 3 equal-height cards that stay visible as it scrolls up) */}
          <NaturalScrollNarrative progress={section1Progress} />
        </div>
      </section>

      {/* ===================== SECCIÓN 02 (STICKY REVEAL X-RAY) ===================== */}
      {/* -mt-[100vh] places Section 2 ALREADY at top: 0 when Section 1 begins its upward lift! */}
      <section ref={section2Ref} className="relative w-full h-[420vh] -mt-[100vh] z-10">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          {/* Canvas for Section 2 */}
          <ScrollyCanvasSequence 
            progress={section2Progress} 
            totalFrames={TOTAL_FRAMES_S2}
            framesFolder="/frames_s2"
            opacity={1}
            showLoading={false}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black"
          />

          {/* Subtle dark to transparent gradient overlay for Section 2 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 via-30% to-transparent pointer-events-none z-10" />

          {/* Interactive X-Ray Hotspots (+) & Header */}
          <Section2InteractiveXRay progress={section2Progress} />
        </div>
      </section>

      {/* Fixed bottom telemetry bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-6 md:px-12 py-3 pt-6 flex items-center justify-between text-xs font-mono text-white/70 pointer-events-none bg-gradient-to-t from-black/85 via-black/40 to-transparent">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-semibold text-white">
            SECCIÓN 0{currentSectionNumber} / 02
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline">
            {currentSectionNumber === 1 ? '3D E-MOTO TITAN' : 'RADIOGRAFÍA X-RAY (+)'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-white/40">
            {currentSectionNumber === 1 
              ? `FRAME ${Math.round(section1Progress * (TOTAL_FRAMES_S1 - 1)) + 1}/${TOTAL_FRAMES_S1}`
              : `FRAME ${Math.round(section2Progress * (TOTAL_FRAMES_S2 - 1)) + 1}/${TOTAL_FRAMES_S2}`
            }
          </span>
          <span className="text-white">
            SCROLL: {Math.round(overallProgress * 100)}%
          </span>
        </div>
      </footer>
    </div>
  );
}