import React, { useEffect, useRef, useState } from 'react';

interface ScrollyVideoCanvasProps {
  progress: number; // 0.0 to 1.0
  videoSrc: string;
}

export const ScrollyVideoCanvas: React.FC<ScrollyVideoCanvasProps> = ({ progress, videoSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const animationFrameId = useRef<number>(0);
  const hasDrawnFirstFrame = useRef(false);

  // Initialize and load video metadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = videoSrc;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      video.currentTime = 0.001;
    };

    const handleCanPlay = () => {
      setIsVideoReady(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSrc]);

  // Full 60fps continuous time scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady || !duration) return;

    const targetTime = Math.min(Math.max(progress * duration, 0.001), duration - 0.005);
    
    // Smooth time update at 60fps
    if (Math.abs(video.currentTime - targetTime) > 0.015) {
      video.currentTime = targetTime;
    }
  }, [progress, isVideoReady, duration]);

  // Pure 60 FPS Native Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      if (video.videoWidth > 0 && (video.readyState >= 2 || hasDrawnFirstFrame.current)) {
        const videoRatio = video.videoWidth / video.videoHeight;
        const screenRatio = width / height;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (screenRatio > videoRatio) {
          drawW = width;
          drawH = width / videoRatio;
          drawX = 0;
          drawY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * videoRatio;
          drawX = (width - drawW) / 2;
          drawY = 0;
        }

        ctx.drawImage(video, drawX, drawY, drawW, drawH);
        hasDrawnFirstFrame.current = true;

        // Subtle dark vignette to blend cleanly into the page
        const gradient = ctx.createRadialGradient(
          width / 2, height / 2, Math.min(width, height) * 0.35,
          width / 2, height / 2, Math.max(width, height) * 0.75
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.65, 'rgba(0, 0, 0, 0.45)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else if (!hasDrawnFirstFrame.current) {
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
  }, [isVideoReady]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{ width: '100vw', height: '100vh' }}
      />
      {!isVideoReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4" />
          <p className="font-mono text-xs tracking-widest uppercase text-white">
            Sincronizando flujo de fotogramas (60 FPS)...
          </p>
        </div>
      )}
    </div>
  );
};
