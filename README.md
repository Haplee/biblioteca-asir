<div align="center">

# ⚡ ASIR · Fran Vidal

### Biblioteca técnica personal

**Los apuntes de ASIR, convertidos en un sitio estático: buscable, en modo claro u
oscuro, sin cuentas y sin backend.**

[![Astro](https://img.shields.io/badge/Astro-7.3.8-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node-%E2%89%A5%2022.12-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![GitHub Pages](https://img.shields.io/badge/despliegue-GitHub%20Pages-222222?logo=github&logoColor=white)](https://haplee.github.io/biblioteca-asir/)
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-22c55e)](./LICENSE)

### 🔎 [**Abrir el sitio →**](https://haplee.github.io/biblioteca-asir/)

<sub>21 apuntes · 5 áreas · búsqueda global (Ctrl/Cmd + K) · sin cookies</sub>

</div>

---

> ## «Todo tu conocimiento. En un solo lugar.»

Apuntes de **ASO**, **IAW**, **BBDD**, **Programación** y **Git** (tal como salieron
de clase, sin reescribir ni «maquillar») organizados para encontrar un comando, una
ruta o una idea en segundos.

---

## 🗂️ Qué hay dentro

| Área | Qué encontrarás |
| --- | --- |
| 🖥️ **ASO** · Administración de Sistemas Operativos | Windows y PowerShell, Linux y Bash, redes y servicios (LDAP, DHCP, SSH, iptables, GPG, Samba, CUPS) y usuarios, permisos y políticas. |
| 🌐 **IAW** · Implantación de Aplicaciones Web | Apache y VirtualHost, PHP, gestores de contenido (Joomla y WordPress) y Django. |
| 🗄️ **BBDD** · Bases de Datos | Fundamentos de un SGBD, SQL y MySQL, Oracle y PL/SQL, usuarios, roles y privilegios, tablespaces y almacenamiento, y transacciones ACID. |
| 🐍 **Programación** · Python | Sintaxis y funciones, con ejemplos reales sacados de los apuntes. |
| 🌿 **Git** · Control de versiones | Configuración, repositorios, ramas y remotos. |

Además, **temas transversales** («Redes y servicios», «Oracle», «PL/SQL», «Bash»,
«VirtualHost»…) que agrupan apuntes de distintas asignaturas sin duplicar contenido.

---

## ✨ Funciones

| | |
| --- | --- |
| 🔍 **Búsqueda global** | Índice estático generado en la compilación. Busca en títulos, encabezados, temas, comandos y rutas. `Ctrl`/`Cmd`+`K` para abrir, `Esc` para cerrar, flechas e `Intro` para navegar. Sin APIs externas. |
| 🌗 **Tema oscuro y claro** | Oscuro por defecto, claro opcional. La preferencia se guarda y se aplica **antes de pintar**, sin parpadeo. |
| 🧭 **Panel de navegación plegable** | Abierto por defecto en escritorio; se comprime con el botón y se desliza sobre el contenido en móvil y tableta. El estado se recuerda por navegador. |
| 📚 **Lectura cómoda** | Migas de pan, metadatos por apunte (asignatura, temas, fechas, lotes, tiempo de lectura), índice lateral con seguimiento del scroll y navegación anterior/siguiente. |
| 📋 **Pensado para clase** | Botón «Copiar» en cada bloque de código, enlaces de anclaje en los encabezados y botones de leído y pendiente. |
| ⚠️ **Avisos honestos** | Se marcan a la vista los fragmentos `[ilegible]`, `[lectura dudosa]` y `[revisar]`: nada se corrige en silencio. |
| 🖨️ **Listo para imprimir** | Hoja de estilos de impresión propia, por si quieres el papel. |
| ♿ **Accesible** | Contraste cuidado, foco visible, etiquetas y regiones semánticas, información que no depende solo del color y `prefers-reduced-motion` respetado. |

---

## 🧱 Tecnología

| Pieza | Versión | Nota |
| --- | --- | --- |
| Astro | 7.3.8 | Generación estática, sin SSR |
| TypeScript | 6.0.3 | Comprobación de tipos en todo el proyecto |
| `@astrojs/markdown-remark` | 7.3.2 | Procesador `unified` para el plugin rehype propio |
| `@lucide/astro` | 1.57.0 | Iconos |
| Node.js | ≥ 22.12 | Desarrollo y compilación |

Sin Tailwind ni frameworks de UI: el diseño usa una **hoja de estilos propia con
tokens CSS**. Todas las versiones están fijadas en `package-lock.json`.

---

## 📁 Estructura

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
  scripts/app.ts              lógica de cliente (tema, búsqueda, panel, TOC…)
  styles/global.css           sistema de diseño completo
.github/workflows/deploy.yml  despliegue en GitHub Pages
```

### Frontmatter de cada apunte

```yaml
---
title: "ASO · Linux y Bash"
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

Todos los metadatos proceden del propio contenido: **no hay contadores inventados**.
El tiempo de lectura, el número de apuntes por asignatura y las fechas cubiertas se
calculan en tiempo de compilación a partir de los ficheros reales.

---

## 🚀 Uso en local

```bash
npm install         # instalar dependencias (versiones fijadas)
npm run dev         # servidor de desarrollo en http://localhost:4321
npm run build       # generar el sitio en dist/
npm run preview     # servir dist/ tal y como se publicará
npm run check       # comprobar tipos y estructura
npm run verify      # check + build + verificación de búsqueda e integridad
```

Para simular la subruta de GitHub Pages antes de publicar:

```powershell
$env:BASE_PATH='/biblioteca-asir'; $env:SITE_URL='https://haplee.github.io'; npm run build
```

La ruta base se deduce sola en GitHub Actions a partir de `GITHUB_REPOSITORY`
(véase `astro.config.mjs`): **no hay ningún usuario ni repositorio escrito a mano**
en la configuración.

---

## 🌍 Publicado en GitHub Pages

El sitio está en marcha en:

### 👉 https://haplee.github.io/biblioteca-asir/

El flujo [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) se ejecuta
con cada `push` a `main` (y también a mano desde la pestaña *Actions*): comprueba
tipos, compila, verifica la búsqueda y la integridad del contenido y publica.

**Requisito (una sola vez):** repositorio → *Settings* → *Pages* → *Build and
deployment* → **Source: GitHub Actions**.

---

## 🔒 Integridad del contenido

Los apuntes **no se han reescrito**. La migración desde los ficheros por asignatura
conservó el cuerpo de cada documento palabra por palabra: lo único que se separó fue
el título H1, que pasó al frontmatter con el mismo texto.

El script `scripts/verify-integrity.mjs` lo comprueba en cada compilación: extrae
todos los fragmentos técnicos (bloques de código, código en línea, rutas y comandos)
de los 21 apuntes y verifica que aparecen en el HTML generado.

Se conservan literalmente los marcadores `[ilegible]`, `[lectura dudosa]` y
`[revisar]`, que se muestran como avisos destacados. Cuando algo parece un error
técnico no se corrige en silencio: se deja el texto original y, si procede, se añade
una nota aparte de «posible corrección técnica».

---

## 👁️ Privacidad

- **GitHub Pages es público.** Lo que se publica aquí lo puede leer cualquiera,
  incluidos los buscadores.
- Los apuntes pueden contener **nombres de máquinas, direcciones IP, dominios, rutas,
  usuarios o contraseñas** de prácticas: son ejemplos de clase, no credenciales
  reales.
- Los bloques de control (`apuntes/control/`) y el documento maestro
  `apuntes_unificados_lotes_1-7.md` forman parte del repositorio: el maestro no se
  publica como página, pero **sí viaja en el repositorio**.
- El sitio **no envía datos a ningún sitio**: lecturas y tema se quedan en el
  navegador. No hay analítica ni cookies de terceros.

---

## 📄 Licencia

**[MIT](./LICENSE) © 2026 Fran Vidal**

El *código* del sitio (plantillas, estilos, scripts) es libre de usar, copiar,
modificar y distribuir citando la autoría. El *contenido de los apuntes* es material
de estudio personal: puedes consultarlo, pero respeta su origen.

---

## ⚠️ Limitaciones conocidas

- La transcripción procede de 7 lotes de origen; algunas lecturas quedan marcadas
  como dudosas o pendientes de revisar (`apuntes/control/dudas-y-revision.md`).
- Las asignaturas se han agrupado a partir del contenido. Algunas clasificaciones
  (Git, Django, LDAP, Windows Server, cifrado/GPG, iptables) son provisionales y se
  pueden ajustar editando el frontmatter.
- No hay generador de exámenes ni tarjetas de repaso: quedan fuera de esta primera
  versión a propósito.
- Los ficheros de `scripts/` son herramientas puntuales de migración y verificación,
  no forman parte del sitio publicado.

<div align="center">

<sub>Hecho con ☕ y muchos apuntes · **ASIR** · FRAN VIDAL</sub>

</div>
