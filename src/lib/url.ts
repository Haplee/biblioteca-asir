/**
 * Utilidades de URL. El sitio puede desplegarse en una subruta de GitHub Pages
 * (por ejemplo `/asir-apuntes/`), así que todas las rutas internas se construyen
 * con `withBase` en lugar de asumir la raíz del dominio.
 */
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Antepone la subruta de despliegue a una ruta interna. */
export function withBase(path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `${BASE}${clean}` : BASE;
}

/** URL de un apunte a partir de su id de colección. */
export function docUrl(id: string): string {
  return withBase(`apuntes/${id}/`);
}

export { BASE as basePath };
