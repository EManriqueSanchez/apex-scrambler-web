# MAHLE SmartBike — 3D Scrollytelling Web

Experiencia web inmersiva de alto impacto visual y rendimiento nativo basada en el ecosistema **MAHLE X20 SmartBike Systems**.

## 🚀 Arquitectura y Solución de Rendimiento

Para garantizar **60 FPS constantes tanto al hacer scroll hacia abajo como hacia arriba**, el proyecto descarta el scrubbing directo sobre etiquetas `<video>` y adopta el estándar de la industria (técnica Apple):

1. **Secuencia de Fotogramas en Memoria:**
   - El vídeo se extrae en fotogramas WebP (`public/frames/frame_%04d.webp`) con compresión visual optimizada (~2.5 MB en total para 120 fotogramas).
   - El componente `ScrollyCanvasSequence` precarga los fotogramas en memoria (`Image()` array).
   - Cada evento de scroll dibuja instantáneamente el fotograma correspondiente en un `<canvas>` 2D en menos de 1 milisegundo, eliminando por completo la latencia de decodificación hacia atrás de los códecs MP4.

2. **Física de Scroll y GSAP ScrollTrigger:**
   - **Lenis Smooth Scroll** (`lerp: 0.1`) proporciona una inercia elástica natural para trackpad, ratón y dispositivos móviles.
   - **GSAP ScrollTrigger** mapea el recorrido vertical (`0.0` a `1.0`) al índice del fotograma.

3. **Tipografía Monocromática Flotante (Scroll Natural):**
   - El texto fluye de forma orgánica de abajo hacia arriba en capas sin fondos de caja, con sombras de alto contraste (`drop-shadow`) en blanco puro (`#ffffff`) y negro puro (`#000000`).

## 🛠️ Cómo procesar nuevos vídeos para este proyecto

Si generas un nuevo clip de vídeo (en Google Flow, Veo, Luma o Runway), puedes convertirlo automáticamente a la secuencia de fotogramas con el script incluido:

```bash
npm run extract-frames -- ruta/a/tu_video.mp4
```

O directamente mediante ffmpeg:
```bash
./node_modules/ffmpeg-static/ffmpeg -i public/video/nuevo_video.mp4 -vf "fps=24" -c:v libwebp -quality 75 public/frames/frame_%04d.webp
```

## 📦 Ejecución en desarrollo

```bash
npm run dev -- --host
```
- Local: `http://localhost:5173/`
- Móvil (misma Wi-Fi): `http://<IP_LOCAL>:5173/`
