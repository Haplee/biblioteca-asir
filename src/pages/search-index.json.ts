import type { APIRoute } from 'astro';
import { render } from 'astro:content';
import { getApuntes, getControlDocs, readNoteBody, countWords, readingMinutes } from '../lib/docs';
import { subjectByKey } from '../config/site';

/**
 * Índice de búsqueda generado en tiempo de compilación.
 *
 * Se sirve como fichero estático (`/search-index.json`), por lo que la búsqueda
 * funciona sin servicios externos ni APIs de pago, incluso bajo una subruta de
 * GitHub Pages.
 */

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Section {
  slug: string;
  heading: string;
  depth: number;
  text: string;
}

/** Limpieza ligera del Markdown para el texto indexable. */
function clean(markdown: string): string {
  return markdown
    .replace(/```[^\n]*\n([\s\S]*?)```/g, (_, code: string) => ` ${code} `)
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\s*\|.*\|\s*$/gm, (row) => row.replace(/\|/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Divide el cuerpo en secciones usando los encabezados reales de Astro. */
function splitSections(body: string, headings: Heading[]): Section[] {
  const lines = body.split(/\r?\n/);
  const headingRe = /^(#{2,6})\s+(.*)$/;
  const sections: Section[] = [];
  let current: Section = { slug: '', heading: '', depth: 0, text: '' };
  let headingIndex = 0;

  for (const line of lines) {
    const match = headingRe.exec(line);
    if (match) {
      sections.push(current);
      const depth = match[1]!.length;
      const found = headings[headingIndex];
      headingIndex += 1;
      current = {
        slug: found?.slug ?? '',
        heading: found?.text ?? match[2]!.trim(),
        depth,
        text: '',
      };
    } else {
      current.text += `${line}\n`;
    }
  }
  sections.push(current);

  return sections
    .map((section) => ({ ...section, text: clean(section.text) }))
    .filter((section) => section.text.length > 0 || section.heading.length > 0);
}

export const GET: APIRoute = async () => {
  const [apuntes, control] = await Promise.all([getApuntes(), getControlDocs()]);
  const docs = [...apuntes, ...control];

  const entries = [];
  const records = [];

  for (const doc of docs) {
    const body = await readNoteBody(doc.id);
    const { headings } = await render(doc);
    const words = countWords(body);

    const subject = subjectByKey(doc.data.subject);

    entries.push({
      id: doc.id,
      title: doc.data.title,
      kind: doc.data.kind,
      subject: doc.data.subject ?? null,
      subjectName: subject?.fullName ?? null,
      subjectSlug: subject?.slug ?? null,
      topics: doc.data.topics,
      dates: doc.data.dates,
      batches: doc.data.source_batches,
      summary: doc.data.summary,
      minutes: readingMinutes(words),
      words,
    });

    for (const section of splitSections(body, headings as Heading[])) {
      records.push({
        docId: doc.id,
        slug: section.slug,
        heading: section.heading,
        depth: section.depth,
        text: section.text,
      });
    }
  }

  // Índice ordenado por fecha descendente para mostrar metadatos útiles.
  const payload = {
    generatedAt: new Date().toISOString(),
    docs: entries,
    records,
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};
