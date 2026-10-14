// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeAsirFlags from './src/plugins/rehype-asir-flags.mjs';

/**
 * Resuelve el `base` (subruta) para GitHub Pages.
 *
 * - En GitHub Actions, `GITHUB_REPOSITORY` vale "usuario/repositorio".
 * - Si el repositorio es una página de usuario/organización (`usuario.github.io`),
 *   el sitio se sirve en la raíz → base = "/".
 * - Para un repositorio de proyecto, el sitio vive en /<repositorio>.
 * - Se puede forzar en local con la variable de entorno `BASE_PATH`.
 *
 * No se presupone ningún usuario ni repositorio concretos.
 */
function resolveBase() {
  const fromEnv = process.env.BASE_PATH;
  if (fromEnv) {
    if (fromEnv === '/' || fromEnv === '') return '/';
    return '/' + fromEnv.replace(/^\/+|\/+$/g, '');
  }
  const repo = process.env.GITHUB_REPOSITORY ?? '';
  const name = repo.includes('/') ? repo.split('/')[1] : '';
  if (!name || name.toLowerCase().endsWith('.github.io')) return '/';
  return '/' + name;
}

function resolveSite() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  const repo = process.env.GITHUB_REPOSITORY ?? '';
  if (!repo.includes('/')) return undefined;
  const [owner, name] = repo.split('/');
  if ((name ?? '').toLowerCase().endsWith('.github.io')) return `https://${name}`;
  return `https://${owner}.github.io`;
}

const base = resolveBase();
const site = resolveSite();

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  // Mantiene el manejo de espacios "consciente de HTML" (evita que se pierdan
  // espacios entre elementos en línea, comportamiento por defecto desde v7 = 'jsx').
  compressHTML: true,
  build: {
    // URLs tipo /ruta/ con index.html: totalmente compatibles con GitHub Pages.
    format: 'directory',
  },
  markdown: {
    // Se usa el procesador `unified` para poder aplicar plugins rehype propios
    // (avisos de lectura dudosa, tablas adaptables, etc.).
    processor: unified({
      rehypePlugins: [rehypeAsirFlags],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // Sin color por defecto: el tema (claro/oscuro) decide vía CSS.
      defaultColor: false,
      wrap: false,
    },
  },
  vite: {
    build: {
      // Evita avisos por chunks grandes en un sitio de contenido.
      chunkSizeWarningLimit: 1200,
    },
  },
});
