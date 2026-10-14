/**
 * Estadísticas de la biblioteca.
 *
 * Es la ÚNICA fuente de recuentos del sitio: portada, barra lateral, páginas de
 * asignatura e índices leen de aquí, de modo que nunca aparecen dos cifras
 * distintas para lo mismo. Todos los números se calculan a partir del catálogo
 * real en tiempo de compilación; ninguno se escribe a mano.
 *
 * Nomenclatura (se mantiene en todas las páginas):
 *   - «apunte»   → documento académico de asignatura (`kind: apunte`).
 *   - «control»  → documento auxiliar de procedencia (`kind: control`).
 *   - «documento»→ cualquiera de los dos (nunca se cuenta dos veces).
 */
import { getCatalog, type DocMeta } from './docs';
import { SUBJECTS } from '../config/site';

export interface LibraryStats {
  /** Apuntes académicos, ordenados. */
  apuntes: DocMeta[];
  /** Documentos de control/procedencia. */
  control: DocMeta[];
  /** Nº de apuntes académicos. */
  apunteCount: number;
  /** Nº de documentos de control. */
  controlCount: number;
  /** Nº total de documentos distintos (apuntes + control). */
  documentCount: number;
  /** Nº de asignaturas que realmente tienen apuntes. */
  subjectCount: number;
  /** Nº de lotes de origen distintos. */
  batchCount: number;
  /** Lotes de origen distintos, ordenados. */
  batches: number[];
  /** Minutos de lectura estimados de los apuntes. */
  totalMinutes: number;
  /** Palabras de los apuntes. */
  totalWords: number;
  /** Fechas de origen distintas, ordenadas. */
  dates: string[];
  /** Fecha más antigua registrada, si la hay. */
  firstDate?: string;
  /** Fecha más reciente registrada, si la hay. */
  lastDate?: string;
  /** Apuntes con la fecha de origen más reciente. */
  recent: DocMeta[];
}

/** Fecha de origen más reciente de un documento (cadena ISO o vacío). */
export function lastDateOf(doc: DocMeta): string {
  return doc.dates.length > 0 ? (doc.dates[doc.dates.length - 1] ?? '') : '';
}

/** Estadísticas completas, memoizadas por compilación. */
let statsPromise: Promise<LibraryStats> | null = null;

export function getLibraryStats(): Promise<LibraryStats> {
  statsPromise ??= buildStats();
  return statsPromise;
}

async function buildStats(): Promise<LibraryStats> {
  const catalog = await getCatalog();
  const apuntes = catalog.filter((doc) => doc.kind === 'apunte');
  const control = catalog.filter((doc) => doc.kind === 'control');

  const subjectsPresent = new Set(apuntes.map((doc) => doc.subject).filter(Boolean));
  const subjectCount = SUBJECTS.filter((subject) => subjectsPresent.has(subject.key)).length;

  const batches = [...new Set(apuntes.flatMap((doc) => doc.batches))].sort((a, b) => a - b);
  const dates = [...new Set(apuntes.flatMap((doc) => doc.dates))].sort();

  const recent = [...apuntes]
    .filter((doc) => doc.dates.length > 0)
    .sort((a, b) => lastDateOf(b).localeCompare(lastDateOf(a)))
    .slice(0, 3);

  return {
    apuntes,
    control,
    apunteCount: apuntes.length,
    controlCount: control.length,
    documentCount: apuntes.length + control.length,
    subjectCount,
    batchCount: batches.length,
    batches,
    totalMinutes: apuntes.reduce((sum, doc) => sum + doc.minutes, 0),
    totalWords: apuntes.reduce((sum, doc) => sum + doc.words, 0),
    dates,
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
    recent,
  };
}
