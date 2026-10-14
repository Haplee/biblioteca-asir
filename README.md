# ASIR · Fran Vidal

**Biblioteca técnica personal.** Sitio estático que reúne los apuntes de ASIR y los
presenta para consultarlos rápido: búsqueda global, favoritos, índice por
asignaturas, temas transversales y modo de lectura con índice lateral.

> **Todo tu conocimiento. En un solo lugar.**

---

## Qué es y qué no es

- **Es** un sitio estático generado a partir de los apuntes en Markdown que están
  en este mismo repositorio. No hay servidor, ni base de datos remota, ni
  servicios de pago.
- **No es** una aplicación con cuentas ni autenticación. Los favoritos, las
  lecturas y las preferencias se guardan **solo en el navegador** de cada
  persona (`localStorage`) y no se sincronizan entre dispositivos.
- El sitio sigue siendo útil aunque el navegador bloquee el almacenamiento: se
  puede leer, buscar, navegar e imprimir igualmente.

---

## Tecnología

| Pieza | Versión | Nota |
| --- | --- | --- |
| Astro | 7.3.8 | Generación estática, sin SSR |
| TypeScript | 6.0.3 | Comprobación de tipos en todo el proyecto |
| `@astrojs/markdown-remark` | 7.3.2 | Procesador `unified` para el plugin rehype propio |
| `@lucide/astro` | 1.57.0 | Iconos |
| Node.js | ≥ 22.12 | Desarrollo y compilación |

Sin Tailwind ni frameworks de UI: el diseño usa una hoja de estilos propia con
tokens CSS. Todas las versiones están fijadas en `package-lock.json`.

---

## Estructura

```
apuntes/                      ← contenido (Markdown + frontmatter YAML)
  aso/ iaw/ bbdd/ programacion/ git/      apuntes por asignatura
  control/                                índice general, lotes, duplicados, dudas
apuntes_unificados_lotes_1-7.md           documento maestro original (no se publica)
public/favicon.svg
scripts/
  migrate-apuntes.mjs         migración puntual (ya ejecutada; idempotente)
  verify-search.mjs           comprueba que los términos clave encuentran resultados
  verify-integrity.mjs        comprueba que todo el contenido llega al HTML
src/
  config/site.ts              marca, asignaturas, bloques de control
  content.config.ts           esquema de la colección `apuntes`
  lib/docs.ts                 capa de datos (orden, agrupación, tiempo de lectura)
  lib/topics.ts               temas transversales
  lib/url.ts                  construcción de URLs con la ruta base
  plugins/rehype-asir-flags.mjs   avisos de lectura dudosa, tablas, enlaces externos
  components/                 Icon, ThemeToggle, DocCard, SubjectCard, Toc, …
  layouts/                    BaseLayout, DocLayout
  pages/                      una ruta por página + endpoints JSON
  scripts/app.ts              lógica de cliente (tema, búsqueda, favoritos, TOC…)
  styles/global.css           sistema de diseño completo
.github/workflows/deploy.yml  despliegue en GitHub Pages
```

### Frontmatter de cada apunte

```yaml
---
title: "ASO — Linux y Bash"
kind: "apunte"          # apunte | control
subject: "ASO"
order: 2
summary: "Scripts de Bash: variables, funciones, bucles…"
topics: ["Bash", "Scripts", "Variables"]
source_batches: [2, 3, 4]
dates: ["2024-10-28", "2024-11-25"]
status: "organizado"
---
```

Todos los metadatos proceden del propio contenido: no hay contadores inventados.
El tiempo de lectura, el número de apuntes por asignatura y las fechas cubiertas
se calculan en tiempo de compilación a partir de los ficheros reales.

---

## Funciones

**Inicio** — marca, buscador visible de inmediato, estadísticas reales, tarjetas
de asignatura, «Continuar leyendo» y accesos rápidos.

**Navegación** — barra lateral fija en escritorio y panel deslizante en móvil y
tableta: Inicio · Todas las asignaturas · ASO · IAW · BBDD · Programación/Python ·
Git · Redes y servicios · Favoritos · Pendientes de revisar · Índice de lotes y
fechas · bloques de procedencia.

**Asignatura** — descripción real, índice de temas con recuento, buscador propio,
filtro por tema y orden por fecha, orden del índice o título.

**Lectura** — migas de pan, metadatos (asignatura, temas, fechas, lotes, tiempo de
lectura), índice lateral con seguimiento del desplazamiento, barras de progreso,
botón «Copiar» en cada bloque de código, enlaces de anclaje en los encabezados,
avisos destacados para `[ilegible]`, `[lectura dudosa]` y `[revisar]`,
navegación anterior/siguiente y botones de favorito, leído, pendiente, copiar
enlace e imprimir.

**Búsqueda global** — índice estático (`/search-index.json`) generado en la
compilación; busca en títulos, encabezados, temas, comandos y rutas del texto.
`Ctrl`/`Cmd`+`K` para abrirla, `Esc` para cerrar, navegación con flechas y
`Intro`, filtros por asignatura y tema. Funciona sin APIs externas.

**Temas** — «Redes y servicios», «Oracle», «PL/SQL», «Bash», «VirtualHost», etc.
Cada tema agrupa apuntes de distintas asignaturas sin duplicar contenido.

**Estudio** — impresión con hoja de estilos propia, encabezados con enlace
directo, favoritos, pendientes y progreso de lectura locales.

**Accesibilidad** — tema oscuro por defecto y claro opcional (preferencia
guardada, sin parpadeo al cargar), `prefers-reduced-motion` respetado, foco
visible, etiquetas y regiones semánticas, información que no depende solo del
color y diseño adaptable con zoom.

---

## Uso en local

```bash
npm install         # instalar dependencias (versiones fijadas)
npm run dev         # servidor de desarrollo en http://localhost:4321
npm run build       # generar el sitio en dist/
npm run preview     # servir dist/ tal y como se publicará
npm run check       # comprobar tipos y estructura
npm run verify      # check + build + verificación de búsqueda e integridad
```

Para simular la subruta de GitHub Pages antes de publicar:

```bash
# PowerShell
$env:BASE_PATH='/nombre-del-repositorio'; $env:SITE_URL='https://usuario.github.io'; npm run build
```

La ruta base se deduce sola en GitHub Actions a partir de `GITHUB_REPOSITORY`
(véase `astro.config.mjs`): no hay ningún usuario ni repositorio escrito a mano.

---

## Publicar en GitHub Pages

1. **Crear el repositorio** en GitHub (por ejemplo `asir-apuntes`) y subir el
   contenido:

   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

2. **Activar Pages**: repositorio → *Settings* → *Pages* → *Build and
   deployment* → **Source: GitHub Actions**.

3. Listo. El flujo `.github/workflows/deploy.yml` se ejecuta con cada `push` a
   `main` (y también a mano desde la pestaña *Actions*): comprueba tipos, compila,
   verifica la búsqueda y la integridad del contenido, y publica en:

   ```
   https://TU-USUARIO.github.io/TU-REPOSITORIO/
   ```

   Si el repositorio se llama `TU-USUARIO.github.io`, el sitio se sirve en la raíz
   (`https://TU-USUARIO.github.io/`) y la ruta base se ajusta automáticamente.

---

## Avisos de privacidad

- **GitHub Pages es público.** Lo que se publica aquí lo puede leer cualquiera,
  incluidos los buscadores. El repositorio y el sitio publicado son visibles.
- Los apuntes pueden contener **nombres de máquinas, direcciones IP, dominios,
  rutas, usuarios o contraseñas** de prácticas. Revísalos antes de publicar.
- Los bloques de control (`apuntes/control/`) y el documento maestro
  `apuntes_unificados_lotes_1-7.md` forman parte del repositorio: el maestro no
  se publica como página, pero **sí viaja en el repositorio y es visible en
  GitHub**.
- Si necesitas que no sea público, no uses GitHub Pages: opciones razonables son
  un repositorio privado con otro hosting protegido, o Cloudflare Access sobre un
  despliegue propio.
- Este sitio no envía datos a ningún sitio: favoritos, lecturas y tema se quedan
  en el navegador. No hay analítica ni cookies de terceros.

---

## Integridad del contenido

Los apuntes **no se han reescrito**. La migración desde los ficheros por
asignatura conservó el cuerpo de cada documento palabra por palabra: lo único que
se separó fue el título H1, que pasó al frontmatter con el mismo texto.

El script `scripts/verify-integrity.mjs` lo comprueba en cada compilación:
extrae todos los fragmentos técnicos (bloques de código, código en línea, rutas y
comandos) de los 21 apuntes y verifica que aparecen en el HTML generado.

Se conservan literalmente los marcadores `[ilegible]`, `[lectura dudosa]` y
`[revisar]`, que se muestran como avisos destacados. Cuando algo parece un error
técnico no se corrige en silencio: se deja el texto original y, si procede, se
añade una nota aparte de «posible corrección técnica».

---

## Limitaciones conocidas

- Las imágenes de origen (`lote-1/` … `lote-7/`) **no están en el repositorio**;
  el inventario de lotes las referencia, pero no se incluyen.
- Las asignaturas se han agrupado a partir del contenido. Algunas
  clasificaciones (Git, Django, LDAP, Windows Server, cifrado/GPG, iptables) son
  provisionales y se pueden ajustar editando el frontmatter.
- No hay generador de exámenes ni tarjetas de repaso: quedan fuera de esta
  primera versión a propósito.
- Los ficheros de `scripts/` son herramientas puntuales de migración y
  verificación, no forman parte del sitio publicado.
