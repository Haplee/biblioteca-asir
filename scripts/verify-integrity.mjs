/**
 * Verificación de integridad del contenido.
 *
 * Comprueba dos cosas independientes:
 *
 *  A) FIDELIDAD DE RENDERIZADO (bloqueante).
 *     Cada fragmento técnico del Markdown de un apunte (bloques de código,
 *     código en línea, rutas y comandos) debe aparecer en el HTML generado de
 *     ese mismo apunte. Detecta contenido que la cadena Markdown→HTML hubiera
 *     podido perder o alterar (resaltado, plugins, tablas…).
 *
 *  B) COBERTURA FRENTE AL MAESTRO (informativa).
 *     Cuántos fragmentos técnicos del documento maestro
 *     `apuntes_unificados_lotes_1-7.md` no aparecen en el sitio. El maestro es
 *     una transcripción preliminar organizada por lotes, distinta de los
 *     ficheros por asignatura que sirvieron de origen, así que las diferencias
 *     se informan, no se consideran un fallo.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const MASTER = 'apuntes_unificados_lotes_1-7.md';
const DIST = 'dist';

const normalizeNewlines = (text) => text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');

function stripFrontmatter(raw) {
  const text = normalizeNewlines(raw);
  if (!text.startsWith('---')) return text;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return text;
  const after = text.indexOf('\n', end + 1);
  return after === -1 ? '' : text.slice(after + 1).replace(/^\n/, '');
}

/** Fragmentos técnicos de un Markdown: bloques de código, código en línea y rutas. */
function markdownTokens(markdown) {
  const tokens = new Set();
  const withoutFences = markdown.replace(/```[^\n]*\n([\s\S]*?)```/g, (_, code) => {
    for (const line of code.split('\n')) {
      const value = line.trim();
      if (value.length >= 2) tokens.add(value);
    }
    return '\n';
  });
  for (const match of withoutFences.matchAll(/`([^`\n]+)`/g)) {
    const value = match[1].trim();
    if (value.length >= 2) tokens.add(value);
  }
  for (const match of withoutFences.matchAll(/(?:^|\s)((?:\/|~\/|[A-Za-z]:\\)[^\s`)"'|,;]{2,})/g)) {
    tokens.add(match[1].trim());
  }
  return tokens;
}

/** Texto plano del HTML: se quitan etiquetas y luego se deshacen las entidades. */
function htmlText(html) {
  const ENTITIES = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
  };
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    // Decodificación en una sola pasada: entidades numéricas (decimales y
    // hexadecimales, que es lo que emite Astro para &, < y >) y nombradas.
    .replace(/&(?:#x([0-9a-f]+)|#(\d+)|([a-z]+));/gi, (whole, hex, dec, name) => {
      if (hex) return String.fromCodePoint(Number.parseInt(hex, 16));
      if (dec) return String.fromCodePoint(Number.parseInt(dec, 10));
      const key = String(name).toLowerCase();
      return key in ENTITIES ? ENTITIES[key] : whole;
    });
}

const collapse = (value) => value.replace(/\s+/g, ' ').trim();

async function listMarkdown(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listMarkdown(full)));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out.sort();
}

/* ------------------------------------------------ A) fidelidad de renderizado */

const files = await listMarkdown('apuntes');

let tokenTotal = 0;
let missingTotal = 0;
const report = [];

for (const file of files) {
  const id = path
    .relative('apuntes', file)
    .replace(/\\/g, '/')
    .replace(/\.md$/, '');
  const markdown = stripFrontmatter(await readFile(file, 'utf8'));
  const tokens = markdownTokens(markdown);

  const htmlPath = path.join(DIST, 'apuntes', id, 'index.html');
  let haystack;
  try {
    haystack = collapse(htmlText(await readFile(htmlPath, 'utf8')));
  } catch {
    report.push({ id, error: `falta el HTML: ${htmlPath}` });
    continue;
  }

  const missing = [];
  for (const token of tokens) {
    tokenTotal += 1;
    if (!haystack.includes(collapse(token))) missing.push(token);
  }
  missingTotal += missing.length;
  report.push({ id, tokens: tokens.size, missing });
}

console.log('=== A) FIDELIDAD DE RENDERIZADO (apunte → HTML) ===');
console.log(`Apuntes analizados:   ${files.length}`);
console.log(`Fragmentos técnicos:  ${tokenTotal}`);
console.log(`No encontrados:       ${missingTotal}`);
console.log('');
for (const item of report) {
  if (item.error) {
    console.log(`  FALLO ${item.id}: ${item.error}`);
    continue;
  }
  const mark = item.missing.length === 0 ? 'OK   ' : 'REVISAR';
  console.log(`  ${mark} ${item.id.padEnd(44)} ${String(item.tokens).padStart(4)} fragmentos, ${item.missing.length} ausentes`);
  for (const token of item.missing.slice(0, 8)) console.log(`          · ${token}`);
}

/* ------------------------------------------------ B) cobertura frente al maestro */

console.log('');
console.log('=== B) COBERTURA FRENTE AL MAESTRO (informativa) ===');

const masterText = collapse(
  htmlText((await readFile(MASTER, 'utf8')).replace(/\n/g, '\n')),
);

const siteTextParts = [];
for (const file of files) {
  const id = path.relative('apuntes', file).replace(/\\/g, '/').replace(/\.md$/, '');
  try {
    siteTextParts.push(htmlText(await readFile(path.join(DIST, 'apuntes', id, 'index.html'), 'utf8')));
  } catch {
    /* ignorado */
  }
}
// También se consideran las páginas de control de procedencia.
for (const extra of ['dist/lotes/index.html', 'dist/pendientes/index.html']) {
  try {
    siteTextParts.push(htmlText(await readFile(extra, 'utf8')));
  } catch {
    /* ignorado */
  }
}
const siteText = collapse(siteTextParts.join(' '));

const masterTokens = markdownTokens(
  normalizeNewlines(await readFile(MASTER, 'utf8')),
);
const absent = [...masterTokens].filter((token) => !siteText.includes(collapse(token)));

console.log(`Fragmentos en el maestro:  ${masterTokens.size}`);
console.log(`Ausentes en el sitio:      ${absent.length}`);
console.log('');
for (const token of absent.slice(0, 25)) console.log(`  · ${token}`);
if (absent.length > 25) console.log(`  … y ${absent.length - 25} más`);

const failed = missingTotal > 0 || report.some((item) => item.error);
console.log('');
console.log(
  failed
    ? 'RESULTADO: REVISAR: hay fragmentos que no llegan al HTML.'
    : 'RESULTADO: OK: todo el contenido de los apuntes se renderiza.',
);
process.exitCode = failed ? 1 : 0;
