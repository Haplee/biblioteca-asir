/**
 * Utilidades de temas (temas = conceptos transversales, como «Redes y
 * servicios» o «Oracle»). Se generan páginas de tema que agrupan los apuntes
 * que lo tratan, sin duplicar contenido.
 */
import { getApuntes, type Doc } from './docs';

/** Convierte un tema en un slug de URL estable. */
export function slugifyTopic(topic: string): string {
  return topic
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface TopicGroup {
  slug: string;
  name: string;
  docs: Doc[];
}

/** Agrupa todos los apuntes por tema, ordenados por número de documentos. */
export async function getTopicGroups(): Promise<TopicGroup[]> {
  const apuntes = await getApuntes();
  const map = new Map<string, TopicGroup>();
  for (const doc of apuntes) {
    for (const topic of doc.data.topics) {
      const slug = slugifyTopic(topic);
      if (!slug) continue;
      let group = map.get(slug);
      if (!group) {
        group = { slug, name: topic, docs: [] };
        map.set(slug, group);
      }
      group.docs.push(doc);
    }
  }
  return [...map.values()]
    .sort((a, b) => b.docs.length - a.docs.length || a.name.localeCompare(b.name, 'es'));
}

/** Temas destacados que se enlazan desde la navegación principal. */
export const FEATURED_TOPICS = ['Redes y servicios'] as const;
