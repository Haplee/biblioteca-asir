/**
 * Script de cliente del sitio.
 *
 * Cubre, sin dependencias externas:
 *  - selector de tema (oscuro por defecto, claro opcional) con persistencia;
 *  - panel de navegación plegable (se comprime en escritorio y se desliza en móvil);
 *  - búsqueda global sobre el índice estático generado en la compilación;
 *  - leídos y pendientes (solo en `localStorage`);
 *  - «continuar leyendo» y listas dinámicas a partir del catálogo;
 *  - botón «Copiar» en cada bloque de código;
 *  - enlaces de anclaje en los encabezados, índice activo y progreso de lectura.
 *
 * Si `localStorage` no está disponible, el sitio sigue funcionando: las marcas
 * personales simplemente no se conservan.
 */

const RAW_BASE = import.meta.env.BASE_URL;
const BASE = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;

const KEYS = {
  theme: 'asir:theme',
  read: 'asir:read',
  pending: 'asir:pending',
  visits: 'asir:visits',
} as const;

/* ------------------------------------------------------------------ tipos */

interface CatalogDoc {
  id: string;
  title: string;
  kind: 'apunte' | 'control';
  subject?: string;
  subjectName?: string;
  subjectSlug?: string;
  order: number;
  summary: string;
  topics: string[];
  batches: number[];
  dates: string[];
  status: string;
  minutes: number;
  words: number;
}

interface SubjectInfo {
  key: string;
  slug: string;
  name: string;
}

interface Catalog {
  site: { name: string; base: string };
  subjects: SubjectInfo[];
  docs: CatalogDoc[];
}

interface SearchRecord {
  docId: string;
  slug: string;
  heading: string;
  depth: number;
  text: string;
}

interface SearchDoc {
  id: string;
  title: string;
  kind: string;
  subject: string | null;
  subjectName: string | null;
  subjectSlug: string | null;
  topics: string[];
  dates: string[];
  batches: number[];
  summary: string;
  minutes: number;
  words: number;
}

interface SearchIndex {
  generatedAt: string;
  docs: SearchDoc[];
  records: SearchRecord[];
}

interface Visit {
  id: string;
  at: number;
}

/* ------------------------------------------------------------- utilidades */

function $<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(selector);
}

function $$<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Quita tildes y pasa a minúsculas para comparar sin depender de acentos. */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function docUrl(id: string): string {
  return `${BASE}apuntes/${id}/`;
}

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

function readStringSet(key: string): Set<string> {
  const value = safeRead<unknown>(key, []);
  if (!Array.isArray(value)) return new Set();
  return new Set(value.filter((item): item is string => typeof item === 'string'));
}

/* ----------------------------------------------------------- estado global */

const state = {
  read: readStringSet(KEYS.read),
  pending: readStringSet(KEYS.pending),
  visits: safeRead<Visit[]>(KEYS.visits, []).filter(
    (visit): visit is Visit =>
      typeof visit === 'object' && visit !== null && typeof (visit as Visit).id === 'string',
  ),
  catalog: null as Catalog | null,
  catalogPromise: null as Promise<Catalog | null> | null,
};

function persistRead(): void {
  safeWrite(KEYS.read, [...state.read]);
}
function persistPending(): void {
  safeWrite(KEYS.pending, [...state.pending]);
}

function loadCatalog(): Promise<Catalog | null> {
  if (state.catalog) return Promise.resolve(state.catalog);
  state.catalogPromise ??= fetch(`${BASE}catalog.json`, { cache: 'force-cache' })
    .then((response) => (response.ok ? (response.json() as Promise<Catalog>) : null))
    .then((catalog) => {
      state.catalog = catalog;
      return catalog;
    })
    .catch(() => null);
  return state.catalogPromise;
}

/* -------------------------------------------------------------------- tema */

type Theme = 'dark' | 'light';

function currentTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  return stored === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  for (const button of $$('[data-theme-set]')) {
    button.setAttribute('aria-pressed', String(button.getAttribute('data-theme-set') === theme));
  }
}

function initTheme(): void {
  applyTheme(currentTheme());
  for (const button of $$('[data-theme-set]')) {
    button.addEventListener('click', () => {
      const theme: Theme = button.getAttribute('data-theme-set') === 'light' ? 'light' : 'dark';
      try {
        localStorage.setItem(KEYS.theme, theme);
      } catch {
        /* se ignora */
      }
      applyTheme(theme);
    });
  }
}

/* -------------------------------------------------------------- navegación */

const NAV_KEY = 'asir:nav';

function navIsDesktop(): boolean {
  return window.matchMedia('(min-width: 1024px)').matches;
}

/**
 * Panel de navegación plegable. El estado vive en `data-nav` del elemento
 * `html`: en escritorio la barra se comprime dentro de su columna y en móvil se
 * desliza sobre el contenido. La preferencia se recuerda por navegador.
 */
function initSidebar(): void {
  const sidebar = $('[data-sidebar]');
  const toggle = $('[data-sidebar-toggle]');
  const backdrop = $('[data-drawer-backdrop]');
  if (!sidebar || !toggle || !backdrop) return;

  const isOpen = (): boolean => document.documentElement.dataset.nav === 'open';

  const sync = (): void => {
    const open = isOpen();
    const overlay = open && !navIsDesktop();
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Ocultar la navegación' : 'Mostrar la navegación');
    document.body.style.overflow = overlay ? 'hidden' : '';
    backdrop.setAttribute('aria-hidden', String(!overlay));
  };

  const setNav = (open: boolean, persist: boolean): void => {
    document.documentElement.dataset.nav = open ? 'open' : 'closed';
    if (persist) safeWrite(NAV_KEY, open ? 'open' : 'closed');
    sync();
  };

  toggle.addEventListener('click', () => setNav(!isOpen(), true));
  backdrop.addEventListener('click', () => setNav(false, false));

  for (const link of $$('a', sidebar)) {
    link.addEventListener('click', () => {
      if (!navIsDesktop()) setNav(false, false);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen() && !navIsDesktop()) {
      setNav(false, false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    const open = navIsDesktop() && safeRead<string>(NAV_KEY, 'closed') === 'open';
    setNav(open, false);
  });

  sync();
}

/* -------------------------------------------------------------- búsqueda */

const search = {
  index: null as SearchIndex | null,
  loading: false,
  failed: false,
  results: [] as { record: SearchRecord; doc: SearchDoc }[],
  active: -1,
  subject: '',
  topic: '',
};

async function loadSearchIndex(): Promise<void> {
  if (search.index || search.loading) return;
  search.loading = true;
  renderSearchMessage('Cargando índice de búsqueda…', true);
  try {
    const response = await fetch(`${BASE}search-index.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    search.index = (await response.json()) as SearchIndex;
    search.failed = false;
    populateTopics(search.index);
  } catch {
    search.failed = true;
    renderSearchMessage(
      'No se ha podido cargar el índice de búsqueda. Comprueba tu conexión y recarga la página.',
      false,
    );
  } finally {
    search.loading = false;
  }
}

function populateTopics(index: SearchIndex): void {
  const select = $<HTMLSelectElement>('[data-search-topic]');
  if (!select || select.options.length > 1) return;
  const topics = new Set<string>();
  for (const doc of index.docs) for (const topic of doc.topics) topics.add(topic);
  const sorted = [...topics].sort((a, b) => a.localeCompare(b, 'es'));
  for (const topic of sorted) {
    const option = document.createElement('option');
    option.value = topic;
    option.textContent = topic;
    select.append(option);
  }
}

function renderSearchMessage(message: string, isLoading: boolean): void {
  const container = $('[data-search-results]');
  if (!container) return;
  container.innerHTML = isLoading
    ? `<p class="search-loading"><span class="spinner"></span> ${escapeHtml(message)}</p>`
    : `<p class="search-empty">${escapeHtml(message)}</p>`;
}

function snippetFor(text: string, terms: string[]): string {
  const haystack = normalize(text);
  let position = -1;
  for (const term of terms) {
    const found = haystack.indexOf(term);
    if (found !== -1 && (position === -1 || found < position)) position = found;
  }
  let slice: string;
  if (position === -1) {
    slice = text.slice(0, 180);
  } else {
    const start = Math.max(0, position - 70);
    slice = (start > 0 ? '…' : '') + text.slice(start, position + 130);
  }
  let html = escapeHtml(slice);
  for (const term of terms) {
    if (term.length < 2) continue;
    const pattern = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    html = html.replace(pattern, '<mark>$1</mark>');
  }
  return html;
}

function runSearch(query: string): void {
  const container = $('[data-search-results]');
  const status = $('[data-search-status]');
  if (!container) return;

  const trimmed = query.trim();
  if (!search.index) {
    if (!search.failed) renderSearchMessage('Cargando índice de búsqueda…', true);
    return;
  }
  if (trimmed.length < 2) {
    search.results = [];
    search.active = -1;
    renderSearchMessage('Escribe al menos dos caracteres para buscar. Se indexan títulos, temas, comandos y texto de los apuntes.', false);
    if (status) status.textContent = '';
    return;
  }

  const terms = normalize(trimmed).split(/\s+/).filter(Boolean);
  const docsById = new Map(search.index.docs.map((doc) => [doc.id, doc]));
  const scored: { record: SearchRecord; doc: SearchDoc; score: number }[] = [];

  for (const record of search.index.records) {
    const doc = docsById.get(record.docId);
    if (!doc) continue;
    if (search.subject && doc.subject !== search.subject) continue;
    if (search.topic && !doc.topics.includes(search.topic)) continue;

    const hayTitle = normalize(doc.title);
    const hayHeading = normalize(record.heading);
    const hayTopics = normalize(doc.topics.join(' '));
    const hayText = normalize(record.text);

    let score = 0;
    let matchesAll = true;
    for (const term of terms) {
      let termScore = 0;
      if (hayTitle.includes(term)) termScore += 14;
      if (hayHeading.includes(term)) termScore += 8;
      if (hayTopics.includes(term)) termScore += 6;
      const occurrences = hayText.split(term).length - 1;
      if (occurrences > 0) termScore += 1 + Math.min(occurrences, 4);
      if (termScore === 0) {
        matchesAll = false;
        break;
      }
      score += termScore;
    }
    if (!matchesAll) continue;

    if (hayTitle.includes(normalize(trimmed))) score += 20;
    if (record.depth === 2) score += 1;
    scored.push({ record, doc, score });
  }

  scored.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title, 'es'));
  const limited = scored.slice(0, 40);
  search.results = limited.map(({ record, doc }) => ({ record, doc }));
  search.active = -1;

  if (limited.length === 0) {
    renderSearchMessage('Sin resultados. Prueba con otro término o quita los filtros.', false);
    if (status) status.textContent = 'Sin resultados';
    return;
  }

  container.innerHTML = limited
    .map(({ record, doc }, index) => {
      const href = docUrl(doc.id) + (record.slug ? `#${record.slug}` : '');
      const subject = doc.subject ? escapeHtml(doc.subject) : 'Procedencia';
      const heading = record.heading && record.heading !== doc.title ? record.heading : '';
      return `<a class="search-result" href="${href}" data-index="${index}">
        <span class="search-result__top">
          <span class="search-result__title">${escapeHtml(doc.title)}</span>
          <span class="search-result__subject">${subject}</span>
        </span>
        ${heading ? `<span class="search-result__section">${escapeHtml(heading)}</span>` : ''}
        <span class="search-result__snippet">${snippetFor(record.text || doc.summary, terms)}</span>
      </a>`;
    })
    .join('');

  if (status) {
    status.textContent = `${limited.length} resultado${limited.length === 1 ? '' : 's'}`;
  }
}

function setActiveResult(next: number): void {
  const items = $$('.search-result');
  if (items.length === 0) return;
  const bounded = (next + items.length) % items.length;
  search.active = bounded;
  items.forEach((item, index) => item.classList.toggle('is-active', index === bounded));
  items[bounded]?.scrollIntoView({ block: 'nearest' });
}

function initSearch(): void {
  const overlay = $('[data-search-overlay]');
  const input = $<HTMLInputElement>('[data-search-input]');
  if (!overlay || !input) return;

  let lastFocused: Element | null = null;

  const open = (): void => {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    input.focus();
    input.select();
    void loadSearchIndex().then(() => runSearch(input.value));
  };
  const close = (): void => {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  for (const trigger of $$('[data-search-open]')) {
    trigger.addEventListener('click', open);
  }
  $('[data-search-close]')?.addEventListener('click', close);
  overlay.addEventListener('mousedown', (event) => {
    if (event.target === overlay) close();
  });

  let debounce = 0;
  input.addEventListener('input', () => {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(() => runSearch(input.value), 130);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveResult(search.active + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveResult(search.active - 1);
    } else if (event.key === 'Enter') {
      const active = $('.search-result.is-active') as HTMLAnchorElement | null;
      const first = $('.search-result') as HTMLAnchorElement | null;
      const target = active ?? first;
      if (target) {
        event.preventDefault();
        target.click();
      }
    }
  });

  for (const chip of $$('[data-search-subject]')) {
    chip.addEventListener('click', () => {
      search.subject = chip.getAttribute('data-search-subject') ?? '';
      for (const other of $$('[data-search-subject]')) {
        other.setAttribute('aria-pressed', String(other === chip));
      }
      runSearch(input.value);
    });
  }

  $<HTMLSelectElement>('[data-search-topic]')?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    search.topic = target.value;
    runSearch(input.value);
  });

  document.addEventListener('keydown', (event) => {
    const isOpen = !overlay.hidden;
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      close();
      return;
    }
    const target = event.target as HTMLElement | null;
    const typing =
      target instanceof HTMLElement &&
      (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (isOpen) close();
      else open();
      return;
    }
    if (event.key === '/' && !isOpen && !typing) {
      event.preventDefault();
      open();
    }
  });
}

/* ------------------------------------------------------- leído / pendiente */

function updateBadges(): void {
  const map: Record<string, number> = {
    pending: state.pending.size,
  };
  for (const badge of $$('[data-count]')) {
    const key = badge.getAttribute('data-count') ?? '';
    const count = map[key] ?? 0;
    badge.textContent = String(count);
    badge.hidden = count === 0;
  }
}

function syncToggle(button: Element, pressed: boolean): void {
  button.setAttribute('aria-pressed', String(pressed));
}

function initMarks(): void {
  for (const button of $$('[data-read-toggle]')) {
    const id = button.getAttribute('data-read-toggle') ?? '';
    const label = $('[data-read-label]', button);
    const sync = (): void => {
      const pressed = state.read.has(id);
      syncToggle(button, pressed);
      if (label) label.textContent = pressed ? 'Leído ✓' : 'Leído';
    };
    sync();
    button.addEventListener('click', () => {
      if (state.read.has(id)) state.read.delete(id);
      else state.read.add(id);
      persistRead();
      sync();
    });
  }

  for (const button of $$('[data-pending-toggle]')) {
    const id = button.getAttribute('data-pending-toggle') ?? '';
    const label = $('[data-pending-label]', button);
    const sync = (): void => {
      const pressed = state.pending.has(id);
      syncToggle(button, pressed);
      if (label) label.textContent = pressed ? 'Pendiente ✓' : 'Pendiente';
    };
    sync();
    button.addEventListener('click', () => {
      if (state.pending.has(id)) state.pending.delete(id);
      else state.pending.add(id);
      persistPending();
      sync();
      updateBadges();
      refreshDynamicSections();
    });
  }

  updateBadges();
}

/* --------------------------------------------------------------- historial */

function recordVisit(id: string): void {
  const filtered = state.visits.filter((visit) => visit.id !== id);
  filtered.unshift({ id, at: Date.now() });
  state.visits = filtered.slice(0, 60);
  safeWrite(KEYS.visits, state.visits);
}

/* -------------------------------------------------------- bloques de código */

function initCodeCopy(): void {
  for (const pre of $$('[data-prose] pre')) {
    if (pre.parentElement?.classList.contains('code-block')) continue;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.replaceWith(wrapper);
    wrapper.append(pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.textContent = 'Copiar';
    button.setAttribute('aria-label', 'Copiar el código al portapapeles');
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand?.('copy');
        selection?.removeAllRanges();
      }
      button.textContent = 'Copiado';
      button.dataset.copied = 'true';
      window.setTimeout(() => {
        button.textContent = 'Copiar';
        delete button.dataset.copied;
      }, 1800);
    });
    wrapper.append(button);
  }
}

/* --------------------------------------------------------------- anclajes */

function initHeadingAnchors(): void {
  for (const heading of $$('[data-prose] h2[id], [data-prose] h3[id], [data-prose] h4[id]')) {
    const anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = `#${heading.id}`;
    anchor.setAttribute('aria-label', `Enlace directo a «${heading.textContent?.trim() ?? ''}»`);
    anchor.textContent = '#';
    heading.prepend(anchor);
  }
}

/* --------------------------------------------------------- índice y progreso */

function initTocAndProgress(): void {
  const page = $('[data-doc-page]');
  if (!page) return;

  const headings = $$('[data-prose] h2[id], [data-prose] h3[id], [data-prose] h4[id]');
  const links = new Map<string, HTMLElement>();
  for (const link of $$('.toc__link')) {
    const id = link.getAttribute('href')?.slice(1);
    if (id) links.set(id, link);
  }

  const progressBar = $('[data-read-progress]');
  const update = (): void => {
    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progressBar.style.width = `${(ratio * 100).toFixed(2)}%`;
    }
    let activeId = '';
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 130) activeId = heading.id;
      else break;
    }
    for (const [id, link] of links) link.classList.toggle('is-active', id === activeId);
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  });
  window.addEventListener('resize', update);
  update();
}

/* ------------------------------------------------------- acciones del apunte */

function initDocToolbar(): void {
  $('[data-print]')?.addEventListener('click', () => window.print());

  const copyButton = $('[data-copy-link]');
  copyButton?.addEventListener('click', async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* si falla, se ofrece la URL en un aviso */
      window.prompt('Copia el enlace:', url);
      return;
    }
    const original = copyButton.textContent;
    copyButton.textContent = 'Enlace copiado';
    window.setTimeout(() => {
      copyButton.textContent = original;
    }, 1800);
  });
}

/* ------------------------------------------------------- secciones dinámicas */

function cardHtml(doc: CatalogDoc): string {
  const subject = doc.subject ? escapeHtml(doc.subject) : 'Procedencia';
  const topics = doc.topics
    .slice(0, 3)
    .map((topic) => `<span class="chip chip--muted">${escapeHtml(topic)}</span>`)
    .join('');
  return `<article class="card card--link doc-card" data-doc-id="${escapeHtml(doc.id)}">
    <div class="doc-card__head">
      <h3 class="doc-card__title"><a class="card__cover" href="${docUrl(doc.id)}">${escapeHtml(doc.title)}</a></h3>
    </div>
    <div class="doc-card__sub">
      <span class="chip chip--accent">${subject}</span>
      <span>${doc.minutes} min</span>
    </div>
    <p class="doc-card__summary">${escapeHtml(doc.summary)}</p>
    ${topics ? `<div class="doc-card__meta">${topics}</div>` : ''}
  </article>`;
}

function emptyHtml(title: string, text: string): string {
  return `<div class="empty" role="status">
    <p class="empty__title">${escapeHtml(title)}</p>
    <p class="empty__text">${escapeHtml(text)}</p>
  </div>`;
}

async function refreshDynamicSections(): Promise<void> {
  const sections = $$('[data-dynamic]');
  if (sections.length === 0) return;
  const catalog = await loadCatalog();
  if (!catalog) return;
  const byId = new Map(catalog.docs.map((doc) => [doc.id, doc]));

  for (const section of sections) {
    const kind = section.getAttribute('data-dynamic') ?? '';
    const limit = Number(section.getAttribute('data-limit') ?? '6');
    const emptyTitle = section.getAttribute('data-empty-title') ?? 'Nada por aquí todavía';
    const emptyText = section.getAttribute('data-empty-text') ?? '';

    let docs: CatalogDoc[] = [];
    if (kind === 'pending') {
      docs = [...state.pending].map((id) => byId.get(id)).filter((doc): doc is CatalogDoc => Boolean(doc));
    } else if (kind === 'continue' || kind === 'recent') {
      docs = state.visits
        .map((visit) => byId.get(visit.id))
        .filter((doc): doc is CatalogDoc => Boolean(doc));
    } else if (kind === 'read') {
      docs = [...state.read].map((id) => byId.get(id)).filter((doc): doc is CatalogDoc => Boolean(doc));
    }

    const visible = docs.slice(0, Number.isFinite(limit) ? limit : 6);
    section.innerHTML =
      visible.length > 0 ? visible.map(cardHtml).join('') : emptyHtml(emptyTitle, emptyText);
  }

  const countTargets = $$('[data-dynamic-count]');
  for (const target of countTargets) {
    const kind = target.getAttribute('data-dynamic-count') ?? '';
    const count =
      kind === 'pending'
        ? state.pending.size
        : kind === 'read'
          ? state.read.size
          : state.visits.length;
    target.textContent = String(count);
  }
}

/* ------------------------------------------------------------------ arranque */

function init(): void {
  initTheme();
  initSidebar();
  initSearch();
  initMarks();
  initCodeCopy();
  initHeadingAnchors();
  initTocAndProgress();
  initDocToolbar();

  const page = $('[data-doc-page]');
  const docId = page?.getAttribute('data-doc-id');
  if (docId) recordVisit(docId);

  void refreshDynamicSections();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
