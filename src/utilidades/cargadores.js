import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cargarFaqs = () => {
  const rutaFaqs = join(__dirname, '../../jsons/faqs.json');
  const contenido = readFileSync(rutaFaqs, 'utf-8');
  return JSON.parse(contenido);
};

const cargarFallback = () => {
  const rutaFallback = join(__dirname, '../../jsons/fallback.json');
  const contenido = readFileSync(rutaFallback, 'utf-8');
  return JSON.parse(contenido);
};

const cargarIntents = () => {
  const rutaIntents = join(__dirname, '../../jsons/intents.json');
  const contenido = readFileSync(rutaIntents, 'utf-8');
  return JSON.parse(contenido);
};

export { cargarFaqs, cargarFallback, cargarIntents };
