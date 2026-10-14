/**
 * Plugin rehype propio para los apuntes de ASIR.
 *
 * Hace tres cosas, sin alterar ni una sola letra del contenido:
 *
 * 1. Convierte los avisos entre corchetes que ya existen en la fuente
 *    (`[ilegible]`, `[Lectura dudosa]`, `[revisar original]`, `[comprobar contra
 *    la imagen]`, …) en insignias visuales discretas. El texto original,
 *    corchetes incluidos, se conserva intacto dentro de la insignia.
 * 2. Envuelve cada tabla en un contenedor con desplazamiento horizontal para
 *    que sea legible en móvil.
 * 3. Marca los párrafos que empiezan por «Posible corrección técnica»,
 *    «Aclaración», «Nota» o «Aviso» para darles un estilo propio.
 *
 * No usa dependencias externas: recorre el árbol HAST a mano.
 */

/** Elementos dentro de los cuales NO se interpretan avisos. */
const SKIP_TAGS = new Set(['code', 'pre', 'a', 'script', 'style', 'svg', 'kbd']);

/**
 * Reglas de clasificación de avisos. El orden importa: la primera que coincide
 * determina el tipo.
 */
const FLAG_RULES = [
  { key: 'ilegible', re: /ilegible/i },
  {
    key: 'dudosa',
    re: /dudosa|dudoso|no se distingue|no se distinguen|borros|confus|probable|parcialmente|no se distingue completamente|lectura dudosa/i,
  },
  {
    key: 'revisar',
    re: /revisar|comprobar|verificar|contra la imagen|imagen original|no debe considerarse|cautela|provisional/i,
  },
];

const FLAG_LABELS = {
  ilegible: 'Texto ilegible en el original',
  dudosa: 'Lectura dudosa',
  revisar: 'Pendiente de revisar contra el original',
};

const NOTE_RE = /^(Posible corrección técnica|Posible corrección|Aclaración|Nota|Aviso|Advertencia)\b/i;

// Corchetes sin salto de línea ni corchetes anidados (evita enlaces tipo [texto](url)).
const BRACKET_RE = /\[([^[\]\n]{2,180})\]/g;

function classify(text) {
  for (const rule of FLAG_RULES) {
    if (rule.re.test(text)) return rule.key;
  }
  return null;
}

/** Divide un nodo de texto en varios nodos, envolviendo los avisos detectados. */
function splitFlags(value) {
  const nodes = [];
  let lastIndex = 0;
  BRACKET_RE.lastIndex = 0;

  let match;
  while ((match = BRACKET_RE.exec(value)) !== null) {
    const key = classify(match[1]);
    if (!key) continue;
    if (match.index > lastIndex) {
      nodes.push({ type: 'text', value: value.slice(lastIndex, match.index) });
    }
    nodes.push({
      type: 'element',
      tagName: 'span',
      properties: {
        className: ['asir-flag', `asir-flag--${key}`],
        'data-flag': key,
        title: FLAG_LABELS[key],
      },
      children: [{ type: 'text', value: match[0] }],
    });
    lastIndex = match.index + match[0].length;
  }

  if (nodes.length === 0) return [{ type: 'text', value }];
  if (lastIndex < value.length) {
    nodes.push({ type: 'text', value: value.slice(lastIndex) });
  }
  return nodes;
}

function textContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(textContent).join('');
}

function markNoteParagraph(el) {
  const first = Array.isArray(el.children) ? el.children[0] : null;
  if (!first || first.type !== 'element' || first.tagName !== 'strong') return;
  const label = textContent(first);
  if (!NOTE_RE.test(label)) return;
  const cls = el.properties?.className ?? [];
  const kind = /^posible corrección/i.test(label) ? 'asir-note--techfix' : 'asir-note--note';
  el.properties = el.properties ?? {};
  el.properties.className = [...cls, 'asir-note', kind];
}

function markExternalLink(el) {
  const href = el.properties?.href;
  if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return;
  el.properties = el.properties ?? {};
  const cls = el.properties.className ?? [];
  el.properties.className = [...cls, 'asir-external'];
  el.properties.rel = 'noopener noreferrer';
  el.properties.target = '_blank';
}

function processElement(el, insideSkip) {
  const skip = insideSkip || SKIP_TAGS.has(el.tagName);
  const out = [];

  for (const child of el.children ?? []) {
    if (child.type === 'element') {
      out.push(processElement(child, skip));
    } else if (child.type === 'text') {
      if (skip) {
        out.push(child);
      } else {
        for (const node of splitFlags(child.value)) out.push(node);
      }
    } else {
      out.push(child);
    }
  }
  el.children = out;

  if (el.tagName === 'p') markNoteParagraph(el);
  if (el.tagName === 'a') markExternalLink(el);

  if (el.tagName === 'table') {
    return {
      type: 'element',
      tagName: 'div',
      properties: {
        className: ['table-wrap'],
        tabIndex: 0,
        role: 'region',
        'aria-label': 'Tabla (desplazable horizontalmente)',
      },
      children: [el],
    };
  }

  return el;
}

export default function rehypeAsirFlags() {
  return (tree) => {
    processElement(tree, false);
  };
}
