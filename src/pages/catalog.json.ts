import type { APIRoute } from 'astro';
import { getCatalog } from '../lib/docs';
import { SUBJECTS, SITE } from '../config/site';

/**
 * Catálogo de documentos + datos de asignaturas, generado en tiempo de
 * compilación. Lo usa el cliente para pintar las secciones dinámicas
 * (continuar leyendo, favoritos, pendientes, recientes) sin consultar nada
 * externo.
 */
export const GET: APIRoute = async () => {
  const catalog = await getCatalog();
  const payload = {
    site: { name: SITE.name, base: import.meta.env.BASE_URL },
    subjects: SUBJECTS,
    docs: catalog,
  };

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
