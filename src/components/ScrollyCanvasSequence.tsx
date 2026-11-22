import React, { useEffect, useRef, useState, memo } from 'react';

interface ScrollyCanvasSequenceProps {
  progress: number; // 0.0 to 1.0
  totalFrames: number;
  framesFolder?: string;
  opacity?: number;
  showLoading?: boolean;
  className?: string;
}

export const ScrollyCanvasSequence: React.FC<ScrollyCanvasSequenceProps> = memo(({ 
  progress, 
  totalFrames, 
  framesFolder = '/frames',
  opacity = 1,
  showLoading = true,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);
  const lastDimsRef = useRef<{ w: number; h: number; dpr: number }>({ w: 0, h: 0, dpr: 0 });
  const animationFrameId = useRef<number>(0);

  // Preload frames progressively with prioritized initial frames
  useEffect(() => {
    let isMounted = true;
    let count = 0;
    imagesRef.current = new Array(totalFrames).fill(null);
    lastDrawnFrameRef.current = -1;
    lastDrawnImgRef.current = null;
    setIsReady(false);

    const pad = (n: number) => String(n).padStart(4, '0');

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Cache-busting v5
      img.src = `${framesFolder}/frame_${pad(i)}.webp?v=5`;
      
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[i - 1] = img;
        count++;
        // Throttle state updates to reduce re-rendering on mobile
        if (count % 8 === 0 || count >= totalFrames || count === 10) {
          setLoadedCount(count);
        }
        if (count >= Math.min(10, totalFrames)) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        if (count % 8 === 0 || count >= totalFrames) {
          setLoadedCount(count);
        }
      };
    }

    return () => {
      isMounted = false;
    };
  }, [totalFrames, framesFolder]);

  // Update target frame based on scroll progress
  useEffect(() => {
    const target = Math.min(Math.max(Math.round(progress * (totalFrames - 1)), 0), totalFrames - 1);
    currentFrameRef.current = target;
  }, [progress, totalFrames]);

  // Ultra-fluid high-efficiency render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      const targetFrame = currentFrameRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Dirty check: skip if frame and dimensions haven't changed
      if (
        targetFrame === lastDrawnFrameRef.current &&
        width === lastDimsRef.current.w &&
        height === lastDimsRef.current.h &&
        dpr === lastDimsRef.current.dpr
      ) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Fast, smooth interpolation for mobile performance
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      // Pick target image, or find closest available loaded frame (NEVER flicker black!)
      let img = imagesRef.current[targetFrame];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // Search closest loaded neighbor
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = targetFrame - offset >= 0 ? imagesRef.current[targetFrame - offset] : null;
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = targetFrame + offset < totalFrames ? imagesRef.current[targetFrame + offset] : null;
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
        // Fallback to last drawn image
        if (!img) img = lastDrawnImgRef.current;
      }

      if (img && img.complete && img.naturalWidth > 0) {
        lastDrawnImgRef.current = img;
        lastDrawnFrameRef.current = targetFrame;
        lastDimsRef.current = { w: width, h: height, dpr };

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const screenRatio = width / height;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (screenRatio > imgRatio) {
          drawW = width;
          drawH = width / imgRatio;
          drawX = 0;
          drawY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * imgRatio;
          drawX = (width - drawW) / 2;
          drawY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Subtle studio border vignette
        const gradient = ctx.createRadialGradient(
          width / 2, height / 2, Math.min(width, height) * 0.50,
          width / 2, height / 2, Math.max(width, height) * 0.85
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.70, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.90, 'rgba(0, 0, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else if (!lastDrawnImgRef.current) {
        // Only fill black if not a single frame has ever been drawn yet
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore();
      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [isReady]);

  return (
    <div 
      style={{ 
        opacity, 
        transition: 'opacity 0.3s ease-out',
        visibility: opacity < 0.01 ? 'hidden' : 'visible'
      }}
      className={className || "absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black"}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{ width: '100vw', height: '100vh', willChange: 'transform' }}
      />

      {!isReady && showLoading && opacity > 0.05 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4" />
          <p className="font-mono text-xs tracking-widest uppercase text-white mb-2">
            Cargando secuencia ({Math.round((loadedCount / totalFrames) * 100)}%)...
          </p>
          <div className="w-48 bg-white/10 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-150"
              style={{ width: `${(loadedCount / totalFrames) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
});
