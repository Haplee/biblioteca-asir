/**
 * Capa de datos de los apuntes.
 *
 * Lee la colección `apuntes` y ofrece utilidades de ordenación, agrupación por
 * asignatura, tiempo de lectura estimado, vecinos (anterior/siguiente) y un
 * catálogo serializable para el cliente. Nada se inventa: todos los metadatos
 * vienen del frontmatter generado a partir de los propios apuntes.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SUBJECTS, subjectByKey } from '../config/site';

export type Doc = CollectionEntry<'apuntes'>;

/** Metadatos serializables (se incrustan en el HTML para el cliente). */
export interface DocMeta {
  id: string;
  title: string;
  kind: 'apunte' | 'control';
  subject?: string;
  subjectName?: string;
  subjectSlug?: string;
  order: number;
  summary: string;
  topics: string[];
  batches: number[];
  dates: string[];
  status: string;
  minutes: number;
  words: number;
}

const subjectIndex = new Map<string, number>(SUBJECTS.map((s, i) => [s.key as string, i]));

/** Ordena por asignatura (orden de la configuración), luego por `order`, luego por título. */
export function compareDocs(a: Doc, b: Doc): number {
  const ai = a.data.subject ? (subjectIndex.get(a.data.subject) ?? 99) : 100;
  const bi = b.data.subject ? (subjectIndex.get(b.data.subject) ?? 99) : 100;
  if (ai !== bi) return ai - bi;
  if (a.data.order !== b.data.order) return a.data.order - b.data.order;
  return a.data.title.localeCompare(b.data.title, 'es');
}

/** Ruta absoluta del fichero fuente del apunte. */
function notePath(id: string): string {
  return path.join(process.cwd(), 'apuntes', `${id}.md`);
}

/** Cuerpo Markdown del apunte, sin el frontmatter. */
export async function readNoteBody(id: string): Promise<string> {
  const raw = await readFile(notePath(id), 'utf8');
  const withoutBom = raw.replace(/^\uFEFF/, '');
  if (withoutBom.startsWith('---')) {
    const end = withoutBom.indexOf('\n---', 3);
    if (end !== -1) {
      const afterMarker = withoutBom.indexOf('\n', end + 1);
      return afterMarker !== -1 ? withoutBom.slice(afterMarker + 1).replace(/^\n/, '') : '';
    }
  }
  return withoutBom;
}

export function countWords(text: string): number {
  const plain = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_~\-|]+/g, ' ');
  const words = plain.split(/\s+/).filter(Boolean);
  return words.length;
}

/** Tiempo de lectura estimado (200 palabras/minuto, mínimo 1 minuto). */
export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200));
}

/** Todos los apuntes de asignatura, ordenados. */
export async function getApuntes(): Promise<Doc[]> {
  const all = await getCollection('apuntes');
  return all.filter((d) => d.data.kind === 'apunte').sort(compareDocs);
}

/** Documentos de control (índice, inventario, duplicados, dudas). */
export async function getControlDocs(): Promise<Doc[]> {
  const all = await getCollection('apuntes');
  return all
    .filter((d) => d.data.kind === 'control')
    .sort((a, b) => a.data.order - b.data.order);
}

export interface SubjectGroup {
  key: string;
  slug: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  accent: string;
  docs: Doc[];
}

/** Apuntes agrupados por asignatura, en el orden de la configuración. */
export async function getSubjectGroups(): Promise<SubjectGroup[]> {
  const apuntes = await getApuntes();
  return SUBJECTS.map((subject) => ({
    key: subject.key,
    slug: subject.slug,
    name: subject.name,
    fullName: subject.fullName,
    description: subject.description,
    icon: subject.icon,
    accent: subject.accent,
    docs: apuntes.filter((d) => d.data.subject === subject.key),
  })).filter((g) => g.docs.length > 0);
}

/** Apuntes de una asignatura por su slug. */
export async function getDocsBySubjectSlug(slug: string): Promise<Doc[]> {
  const apuntes = await getApuntes();
  const subject = SUBJECTS.find((s) => s.slug === slug);
  if (!subject) return [];
  return apuntes.filter((d) => d.data.subject === subject.key);
}

/** Vecinos (anterior/siguiente) dentro de la misma asignatura. */
export async function getNeighbours(doc: Doc): Promise<{ prev?: Doc; next?: Doc }> {
  if (!doc.data.subject) return {};
  const siblings = (await getApuntes()).filter((d) => d.data.subject === doc.data.subject);
  const index = siblings.findIndex((d) => d.id === doc.id);
  if (index === -1) return {};
  return { prev: siblings[index - 1], next: siblings[index + 1] };
}

/**
 * Apuntes relacionados con uno dado.
 *
 * Se puntúa por temas compartidos (peso alto), pertenencia a la misma
 * asignatura y lotes de origen comunes. Se calcula siempre a partir de los
 * metadatos reales: nunca se inventan relaciones. Los apuntes de control no
 * tienen asignatura ni, en general, temas, así que pueden devolver una lista
 * vacía.
 */
export async function getRelated(doc: Doc, limit = 4): Promise<Doc[]> {
  const all = await getApuntes();
  const topics = new Set(doc.data.topics.map((topic) => topic.toLowerCase()));
  const batches = new Set(doc.data.source_batches);

  return all
    .filter((other) => other.id !== doc.id)
    .map((other) => {
      let score = 0;
      for (const topic of other.data.topics) {
        if (topics.has(topic.toLowerCase())) score += 3;
      }
      if (doc.data.subject && other.data.subject === doc.data.subject) score += 4;
      for (const batch of other.data.source_batches) {
        if (batches.has(batch)) score += 1;
      }
      return { doc: other, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.data.title.localeCompare(b.doc.data.title, 'es'))
    .slice(0, limit)
    .map((item) => item.doc);
}

/** Convierte una entrada en metadatos serializables. */
export function toMeta(doc: Doc, words = 0): DocMeta {
  const subject = subjectByKey(doc.data.subject);
  return {
    id: doc.id,
    title: doc.data.title,
    kind: doc.data.kind,
    subject: doc.data.subject,
    subjectName: subject?.fullName,
    subjectSlug: subject?.slug,
    order: doc.data.order,
    summary: doc.data.summary,
    topics: doc.data.topics,
    batches: doc.data.source_batches,
    dates: doc.data.dates,
    status: doc.data.status,
    words,
    minutes: readingMinutes(words),
  };
}

/** Catálogo completo (apuntes + control) para el cliente. */
export async function buildCatalog(): Promise<DocMeta[]> {
  const [apuntes, control] = await Promise.all([getApuntes(), getControlDocs()]);
  const out: DocMeta[] = [];
  for (const doc of apuntes) {
    out.push(toMeta(doc, countWords(await readNoteBody(doc.id))));
  }
  for (const doc of control) {
    out.push(toMeta(doc, countWords(await readNoteBody(doc.id))));
  }
  return out;
}

let catalogPromise: Promise<DocMeta[]> | null = null;

/** Catálogo memoizado (se calcula una sola vez por compilación). */
export function getCatalog(): Promise<DocMeta[]> {
  catalogPromise ??= buildCatalog();
  return catalogPromise;
}

/** Índice `id → metadatos` a partir del catálogo memoizado. */
export async function getMetaMap(): Promise<Map<string, DocMeta>> {
  const catalog = await getCatalog();
  return new Map(catalog.map((meta) => [meta.id, meta]));
}

/** Formatea una fecha ISO (`2025-01-08`) como texto en español. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Fecha corta en español (`8 ene 2025`). */
export function formatDateShort(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function sortedDates(dates: readonly string[]): string[] {
  return [...dates].sort();
}
