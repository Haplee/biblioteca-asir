# DESIGN.md · ASIR · Fran Vidal

Dirección de diseño de la Biblioteca Técnica Personal. Este archivo es la fuente
de la identidad; `AGENTS.md` / antislop actúan como filtro encima de él.

## Identidad

- **Qué es:** biblioteca personal de apuntes técnicos de ASIR (ASO, IAW, BBDD,
  Programación, Git, EIE, exámenes resueltos, más documentos de control y
  procedencia).
- **Para quién:** una sola persona (el propietario) estudiando durante sesiones
  largas, a menudo releyendo y buscando entre apuntes propios.
- **Personalidad:** instrumento de consulta, no escaparate. Sobrio, denso en
  información, cero decoración que no ayude a encontrar algo.
- **Firma personal:** el nombre propio está siempre presente (`ASIR · Fran Vidal`,
  marca `F` + firma `FRAN VIDAL`). Es un archivo de una persona, y se nota.

## Diales

| Dial | Valor | Motivo en una línea |
| --- | --- | --- |
| **ENERGY** | **1** (calm) | Es una herramienta de estudio: la interfaz no debe saludar, debe desaparecer detrás del contenido. |
| **RHYTHM** | **2** (balanceado) | Las secciones cambian de forma (portada, rejilla de cifras, tarjetas, tabla, bloque de control) pero comparten una misma cabecera para poder escanearlas siempre igual. |
| **MOTION** | **1** (calm) | Solo transiciones de estado de 0.12 a 0.24 s (hover, foco, apertura del buscador); no hay animaciones de entrada, y `prefers-reduced-motion` las anula. |

## Paleta

**Decisión del propietario:** los tonos se mantienen tal cual (base de ingeniería
al estilo GitHub Primer). Es una elección de marca, no un descuido; lo que se
corrigió fue el contraste, no el color.

### Superficies y texto

| Token | Oscuro | Claro | Motivo |
| --- | --- | --- | --- |
| `--bg` | `#0d1117` | `#ffffff` | Fondo de lectura, casi negro para sesiones largas. |
| `--surface` | `#161b22` | `#ffffff` | Elevación 1: tarjetas, panel de búsqueda, cabecera de documento. |
| `--surface-2` | `#21262d` | `#f6f8fa` | Elevación 2: chips, barras de filtro, elementos sobre tarjeta. |
| `--surface-3` | `#2d333b` | `#eaeef2` | Elevación 3: hover de botón, tinte de etiquetas. |
| `--text` | `#f0f6fc` | `#1f2328` | Texto principal. |
| `--text-muted` | `#a3abb6` | `#5c6470` | Texto secundario: descripciones, resúmenes. |
| `--text-faint` | `#99a1ac` | `#606871` | Tercer nivel: etiquetas, notas al pie, iconos. |

### Acento

| Token | Oscuro | Claro | Motivo |
| --- | --- | --- | --- |
| `--accent` | `#e5484d` | `#cf222e` | Acento único: foco, bordes activos, iconos de sección. Rojo de anotación técnica. |
| `--accent-text` | `#f87171` | `#cf222e` | El acento cuando es **texto** o monograma (versión con contraste suficiente). |
| `--accent-fill` | `#cf3238` | `#cf222e` | El acento cuando lleva **texto blanco encima** (botón sólido, skip-link, selección). |
| `--accent-fill-hover` | `#bd2a30` | `#a40e26` | Estado hover del relleno. |

### Semánticos (chips y avisos de lectura)

| Token | Oscuro | Claro | Uso |
| --- | --- | --- | --- |
| `--warn` | `#d29922` | `#7d5300` | Duda o lectura dudosa (`[lectura dudosa]`). |
| `--danger` | `#ff7b72` | `#a40e26` | Fragmento ilegible (`[ilegible]`). |
| `--ok` | `#3fb950` | `#14602b` | Confirmado. |
| `--info` | `#58a6ff` | `#0550ae` | Requiere revisar el original (`[revisar original]`). |

### Colores de asignatura

Siete colores, uno por área. No son decoración: funcionan como **etiqueta de
reconocimiento** (barra superior de la tarjeta + icono), para localizar una
asignatura de un vistazo en una rejilla. Sin este sistema documentado serían
siete colores sueltos sobre el límite de paleta.

| Área | Color | Se reconoce por |
| --- | --- | --- |
| ASO | `#ff6b7d` | Sistemas operativos |
| IAW | `#f2a65a` | Aplicaciones web |
| BBDD | `#5ec8d8` | Bases de datos |
| Programación | `#a98bf5` | Python |
| Git | `#8fd18a` | Control de versiones |
| EIE | `#e879c9` | Empresa e iniciativa emprendedora |
| Exámenes | `#7f9ef3` | Pruebas y exámenes resueltos |

## Tipografía

- **Sans:** Plus Jakarta Sans. Motivo: geométrica con personalidad propia, sin
  ser la sans por defecto de los modelos; aguanta bien tamaños pequeños.
- **Mono:** JetBrains Mono, solo para código, rutas y contadores. Motivo: es un
  archivo técnico y el código tiene que leerse cómodo, no decorar.

## Escritura

- **Un solo separador: el punto medio `·`.** Se usa para `marca · firma`, para
  `asignatura · nombre completo` y para los títulos de los apuntes
  (`ASO · Linux y Bash`). Motivo: un único signo, reconocible, que no compite con
  el guion del código ni con los dos puntos de los rótulos.
- **Sin em dash ni en dash** en la interfaz, en la documentación ni en los
  apuntes: en los rangos de fechas se escribe `a` (`07/11/2024 a 21/11/2024`), en
  los rótulos `:`, y las aclaraciones van entre paréntesis.
- El contenido técnico (bloques de código, comandos, rutas) no se altera nunca
  por criterios de estilo.

## Forma y material

- **Radios:** 4 / 8 / 10 px. Motivo: esquinas sobrias, de herramienta, no de tarjeta
  inflada. `--radius-full` existe solo para elementos circulares reales.
- **Sombras:** tres niveles discretos (`--shadow-sm/--shadow-lg`). Motivo: marcar
  elevación de tarjeta y panel de búsqueda. No hay glow; la marca de atención es
  el acento, no el brillo.
- **Bordes:** 1 px, tres niveles. Motivo: separar superficies contiguas sin sombra.
- **Espaciado:** escala de 0.5rem; el ritmo vertical se marca con las cabeceras de
  sección, no con separadores decorativos.

## Tema

Oscuro por defecto, con conmutador claro completo. Motivo del oscuro por defecto:
es documentación técnica para lectura prolongada. Ambos temas son obligatorios y
se verifican por separado (contraste y todos los componentes).

## Accesibilidad (requisito, no extra)

- Todo texto ≥ 4.5:1 sobre la superficie más clara de su tema; los tres grises del
  tema oscuro se eligieron para pasar sobre `--surface-2`, no solo sobre `--bg`.
- Foco visible en todo elemento interactivo, incluidos los campos que llevan
  `outline: none` (el foco se dibuja en el contenedor).
- `prefers-reduced-motion` anula transiciones.
- Navegación completa por teclado, con enlace de salto al contenido.

## Motivo de identidad

El patrón que se repite y hace reconocible el sitio sin ver el logotipo: **barra de
acento vertical de 3 px en el elemento activo de la navegación**, eco de la barra
superior de color de cada tarjeta de asignatura, y la firma en mono versalita en la
marca. Es el mismo gesto a tres escalas.

## Registro de excepciones

- **R-30 (no clonar productos populares):** la paleta parte de la referencia de
  GitHub Primer. El propietario la conserva por decisión de marca. Se registra como
  excepción aceptada; la identidad propia se sostiene en la firma personal, el
  sistema de color por asignatura y el motivo de identidad de arriba.
- **R-29 (paleta):** se aceptan los cinco colores de asignatura porque ahora están
  documentados como sistema de etiquetado, no como decoración.
