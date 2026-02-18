import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 192, 384, 512];
const inputFile = path.join(__dirname, 'src/assets/logo-mobile.png');
const publicDir = path.join(__dirname, 'public');
const buildDir = path.join(__dirname, 'build');

async function generateFavicons() {
  try {
    console.log('Generando favicon da logo-mobile.png...');

    for (const size of sizes) {
      // Ridimensiona e salva in public/
      await sharp(inputFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(publicDir, `icon-${size}.png`));

      // Ridimensiona e salva in build/
      await sharp(inputFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(buildDir, `icon-${size}.png`));

      console.log(`✓ Creato icon-${size}.png`);
    }

    console.log('✓ Favicon generate con successo!');
  } catch (err) {
    console.error('Errore:', err);
    process.exit(1);
  }
}

generateFavicons();
