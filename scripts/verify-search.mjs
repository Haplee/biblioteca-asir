/**
 * Verificación del índice de búsqueda.
 *
 * Replica la lógica de `src/scripts/app.ts` (normalización sin tildes, división
 * en términos y coincidencia AND sobre título/encabezado/temas/texto) para
 * comprobar que los términos representativos del temario devuelven resultados
 * reales tras la compilación.
 */
import { readFile } from 'node:fs/promises';

const index = JSON.parse(await readFile('dist/search-index.json', 'utf8'));
const docsById = new Map(index.docs.map((doc) => [doc.id, doc]));

const normalize = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

function search(query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const scored = [];
  for (const record of index.records) {
    const doc = docsById.get(record.docId);
    if (!doc) continue;
    const hayTitle = normalize(doc.title);
    const hayHeading = normalize(record.heading);
    const hayTopics = normalize(doc.topics.join(' '));
    const hayText = normalize(record.text);
    let score = 0;
    let all = true;
    for (const term of terms) {
      let s = 0;
      if (hayTitle.includes(term)) s += 14;
      if (hayHeading.includes(term)) s += 8;
      if (hayTopics.includes(term)) s += 6;
      const n = hayText.split(term).length - 1;
      if (n > 0) s += 1 + Math.min(n, 4);
      if (s === 0) {
        all = false;
        break;
      }
      score += s;
    }
    if (!all) continue;
    if (hayTitle.includes(normalize(query))) score += 20;
    scored.push({ doc, record, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored;
}

const TERMS = ['VirtualHost', 'PL/SQL', 'DHCP', 'chmod', 'tablespace', 'Git'];

let failures = 0;
for (const term of TERMS) {
  const results = search(term);
  const docs = [...new Set(results.map((r) => r.doc.title))];
  const ok = results.length > 0;
  if (!ok) failures += 1;
  console.log(
    `${ok ? 'OK  ' : 'FALLO'} ${term.padEnd(12)} ${String(results.length).padStart(3)} coincidencias · ${docs.length} apuntes`,
  );
  console.log(`      ${docs.slice(0, 3).join(' | ')}`);
}

console.log('');
console.log(`Apuntes indexados: ${index.docs.length}`);
console.log(`Secciones indexadas: ${index.records.length}`);
console.log(`Términos sin resultados: ${failures}`);
process.exitCode = failures === 0 ? 0 : 1;
