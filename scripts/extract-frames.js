const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

const inputFile = process.argv[2] || path.join(__dirname, '../public/video/mahle_test.mp4');
const outputDir = path.join(__dirname, '../public/frames');

if (!fs.existsSync(inputFile)) {
  console.error('No se encuentra el archivo de entrada:', inputFile);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extrayendo fotogramas WebP desde:', inputFile);
const cmd = `"${ffmpegPath}" -y -i "${inputFile}" -vf "fps=24" -c:v libwebp -quality 75 "${path.join(outputDir, 'frame_%04d.webp')}"`;
execSync(cmd, { stdio: 'inherit' });
console.log('¡Fotogramas extraídos correctamente en public/frames/!');
