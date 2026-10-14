/**
 * Migración puntual: organiza los apuntes en `apuntes/<asignatura>/<tema>.md`
 * y les añade frontmatter YAML para el sitio.
 *
 * GARANTÍAS:
 *  - No se toca ni se borra el documento maestro `apuntes_unificados_lotes_1-7.md`.
 *  - El cuerpo de cada apunte se conserva byte a byte; lo único que se separa es
 *    la primera línea (el título H1), que pasa al frontmatter como `title`
 *    (el texto es idéntico). El script comprueba esa igualdad y aborta si falla.
 *  - Los metadatos (temas, lotes, fechas) proceden de cada propio apunte.
 *
 * Uso:  node scripts/migrate-apuntes.mjs
 * Es idempotente: si el destino ya existe y el origen no, lo salta.
 */
import { readFile, writeFile, mkdir, rm, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DOCS = [
  // ---------------- ASO ----------------
  {
    src: 'ASO/01_Windows_PowerShell.md', dest: 'aso/windows-powershell.md', kind: 'apunte',
    subject: 'ASO', order: 1,
    summary: 'PowerShell para consultar la configuración de red, los procesos y los servicios; apagado programado, Windows Server y dominio, RDP y listado de archivos por tamaño.',
    topics: ['PowerShell', 'Windows Server', 'Red', 'Procesos', 'Servicios', 'RDP'],
    batches: [2, 3, 4],
    dates: ['2024-11-18', '2025-01-13', '2025-02-03', '2025-02-10'],
  },
  {
    src: 'ASO/02_Linux_Bash.md', dest: 'aso/linux-bash.md', kind: 'apunte',
    subject: 'ASO', order: 2,
    summary: 'Scripts de Bash: variables, funciones, bucles, redirecciones, permisos usados en scripts, empaquetado, procesos, monitorización, arrays, condicionales, filtros con awk, parámetros, case y ficheros temporales.',
    topics: ['Bash', 'Scripts', 'Variables', 'Funciones', 'Bucles', 'Redirecciones', 'Permisos', 'Procesos', 'Arrays', 'awk', 'case', 'Ficheros temporales'],
    batches: [2, 3, 4],
    dates: ['2024-10-28', '2024-10-31', '2024-11-25', '2024-11-28', '2024-11-30', '2024-12-05', '2024-12-12', '2024-12-16', '2025-01-23', '2025-02-03', '2025-02-06', '2025-02-10'],
  },
  {
    src: 'ASO/03_Red_y_servicios.md', dest: 'aso/red-y-servicios.md', kind: 'apunte',
    subject: 'ASO', order: 3,
    summary: 'Conceptos de red (VPN, switch, SLA, DMZ), LDAP, DHCP, SSH, cortafuegos con iptables, encriptación con GPG, servidor Samba y servidor de impresión CUPS.',
    topics: ['Redes', 'Redes y servicios', 'VPN', 'DMZ', 'LDAP', 'DHCP', 'SSH', 'iptables', 'Cortafuegos', 'Encriptación', 'GPG', 'Samba', 'CUPS'],
    batches: [2, 4, 6],
    dates: ['2024-11-07', '2024-11-15', '2024-11-21', '2025-02-10'],
  },
  {
    src: 'ASO/04_Usuarios_permisos_y_politicas.md', dest: 'aso/usuarios-permisos-y-politicas.md', kind: 'apunte',
    subject: 'ASO', order: 4,
    summary: 'Usuarios y grupos, permisos especiales (sticky bit, Euid/Uid), políticas de grupo (GPO) y cuotas de disco.',
    topics: ['Usuarios', 'Grupos', 'Permisos', 'Sticky bit', 'GPO', 'Cuotas de disco'],
    batches: [2, 3, 6],
    dates: ['2024-12-05', '2025-01-23'],
  },

  // ---------------- IAW ----------------
  {
    src: 'IAW/01_Apache_y_VirtualHost.md', dest: 'iaw/apache-y-virtualhost.md', kind: 'apunte',
    subject: 'IAW', order: 1,
    summary: 'Configuración de equipos y acceso, archivo hosts, instalación y configuración de Apache, VirtualHost, DocumentRoot y cortafuegos.',
    topics: ['Apache', 'VirtualHost', 'DocumentRoot', 'hosts', 'ufw', 'Cortafuegos'],
    batches: [1],
    dates: ['2024-11-20', '2025-01-08'],
  },
  {
    src: 'IAW/02_PHP.md', dest: 'iaw/php.md', kind: 'apunte',
    subject: 'IAW', order: 2,
    summary: 'Configuración de PHP (php.ini), extensiones ZIP e intl, búfer de salida y tamaño máximo de archivos subidos.',
    topics: ['PHP', 'php.ini', 'Extensiones'],
    batches: [1],
    dates: [],
  },
  {
    src: 'IAW/03_Joomla.md', dest: 'iaw/joomla.md', kind: 'apunte',
    subject: 'IAW', order: 3,
    summary: 'Plantillas y posiciones de módulos, instalación de Joomla, base de datos, inserción de vídeos y mapas, menús y sindicación de contenido (RSS).',
    topics: ['Joomla', 'CMS', 'Plantillas', 'Menús', 'RSS', 'MySQL'],
    batches: [1],
    dates: ['2024-11-20', '2024-12-04'],
  },
  {
    src: 'IAW/04_WordPress.md', dest: 'iaw/wordpress.md', kind: 'apunte',
    subject: 'IAW', order: 4,
    summary: 'Diferencia entre página y entrada, categorías y etiquetas, acceso al backend, formato de fecha, enlaces permanentes y caché.',
    topics: ['WordPress', 'CMS', 'Entradas', 'Categorías', 'Enlaces permanentes', 'Caché'],
    batches: [1],
    dates: ['2025-01-08'],
  },
  {
    src: 'IAW/05_Django_y_despliegue.md', dest: 'iaw/django-y-despliegue.md', kind: 'apunte',
    subject: 'IAW', order: 5,
    summary: 'Django como framework de Python, la idea de «baterías incluidas» y la ayuda de los comandos.',
    topics: ['Django', 'Python', 'Framework'],
    batches: [1],
    dates: ['2025-01-15'],
  },

  // ---------------- BBDD ----------------
  {
    src: 'BBDD/01_Fundamentos_SGBD.md', dest: 'bbdd/fundamentos-sgbd.md', kind: 'apunte',
    subject: 'BBDD', order: 1,
    summary: 'Big Data, dato e información, SOP/SOD, fichero/BD/SGBD, esquemas, componentes y funcionamiento de un SGBD, estructuras operacionales, NoSQL, funciones del DBA y elección de SGBD.',
    topics: ['Big Data', 'SGBD', 'Modelos de datos', 'NoSQL', 'DBA'],
    batches: [7],
    dates: [],
  },
  {
    src: 'BBDD/02_SQL_y_MySQL.md', dest: 'bbdd/sql-y-mysql.md', kind: 'apunte',
    subject: 'BBDD', order: 2,
    summary: 'Creación de base de datos, usuario, privilegios y aplicación de cambios en MySQL (dentro de la práctica de Joomla).',
    topics: ['MySQL', 'SQL', 'Usuarios', 'Privilegios'],
    batches: [1],
    dates: ['2024-11-20'],
  },
  {
    src: 'BBDD/03_Oracle_y_PL-SQL.md', dest: 'bbdd/oracle-y-pl-sql.md', kind: 'apunte',
    subject: 'BBDD', order: 3,
    summary: 'Tablas y vistas de Oracle, red de Oracle (listener.ora, puerto 1521), triggers, funciones, procedimientos, cursores, secuencias, control de flujo en PL/SQL, administración de instancia y vistas del diccionario.',
    topics: ['Oracle', 'PL/SQL', 'Triggers', 'Procedimientos', 'Funciones', 'Cursores', 'Secuencias', 'listener.ora'],
    batches: [3, 4, 5, 6],
    dates: ['2024-10-28', '2024-10-29', '2024-11-05', '2025-01-14', '2025-01-20', '2025-01-21', '2025-01-27', '2025-01-28', '2025-02-04', '2025-02-11'],
  },
  {
    src: 'BBDD/04_Usuarios_roles_y_privilegios.md', dest: 'bbdd/usuarios-roles-y-privilegios.md', kind: 'apunte',
    subject: 'BBDD', order: 4,
    summary: 'Usuarios y esquemas, roles, perfiles, bloqueo de cuentas, privilegios de objeto y administración de cuentas en Oracle.',
    topics: ['Oracle', 'Usuarios', 'Roles', 'Perfiles', 'Privilegios', 'Esquemas'],
    batches: [5, 6],
    dates: ['2024-12-16', '2024-12-17', '2025-01-14'],
  },
  {
    src: 'BBDD/05_Tablespaces_y_almacenamiento.md', dest: 'bbdd/tablespaces-y-almacenamiento.md', kind: 'apunte',
    subject: 'BBDD', order: 5,
    summary: 'Jerarquía de almacenamiento (bloque, extensión, segmento), tablespaces, tipos internos, vistas de almacenamiento, creación, movimiento, redimensionado y crecimiento automático de datafiles.',
    topics: ['Oracle', 'Tablespaces', 'Almacenamiento', 'Datafiles', 'DBA_FREE_SPACE'],
    batches: [4, 5],
    dates: ['2024-11-18', '2024-11-21', '2024-11-25', '2024-12-02', '2024-12-03', '2024-12-19', '2025-01-14'],
  },
  {
    src: 'BBDD/06_Transacciones_ACID.md', dest: 'bbdd/transacciones-acid.md', kind: 'apunte',
    subject: 'BBDD', order: 6,
    summary: 'Propiedades ACID de las transacciones: atomicidad, consistencia, aislamiento y durabilidad.',
    topics: ['Transacciones', 'ACID'],
    batches: [7],
    dates: [],
  },

  // ---------------- Programación / Python ----------------
  {
    src: 'Programacion_Python/01_Sintaxis_y_funciones.md', dest: 'programacion/sintaxis-y-funciones.md', kind: 'apunte',
    subject: 'Programación', order: 1,
    summary: 'print y salto de línea, definición de funciones con parámetros y cadenas formateadas (f-strings).',
    topics: ['Python', 'Funciones', 'print', 'f-strings'],
    batches: [2],
    dates: ['2025-01-23', '2025-01-29'],
  },

  // ---------------- Control de versiones ----------------
  {
    src: 'Control_de_versiones/01_Git.md', dest: 'git/comandos-git.md', kind: 'apunte',
    subject: 'Git', order: 1,
    summary: 'Configuración, repositorios, add, commit, estado e historial, diff, checkout/reset, ramas, remotos y descarga/subida de cambios.',
    topics: ['Git', 'Control de versiones', 'Ramas', 'Remotos'],
    batches: [7],
    dates: [],
  },

  // ---------------- Bloques de control ----------------
  {
    src: '00_Indice_y_control/indice_general.md', dest: 'control/indice-general.md', kind: 'control',
    order: 1,
    summary: 'Índice general navegable de los apuntes por asignatura, con fechas, lotes de origen y estado.',
    topics: ['Índice', 'Control'],
    batches: [],
    dates: [],
  },
  {
    src: '00_Indice_y_control/inventario_de_lotes.md', dest: 'control/inventario-de-lotes.md', kind: 'control',
    order: 2,
    summary: 'Detalle de los 7 lotes de origen (70 fotografías), asignaturas detectadas e incidencias del inventario.',
    topics: ['Lotes', 'Control'],
    batches: [1, 2, 3, 4, 5, 6, 7],
    dates: [],
  },
  {
    src: '00_Indice_y_control/registro_de_duplicados.md', dest: 'control/registro-de-duplicados.md', kind: 'control',
    order: 3,
    summary: 'Solapamientos de contenido entre lotes, tratamiento aplicado y estado de la comprobación de duplicados.',
    topics: ['Duplicados', 'Control'],
    batches: [],
    dates: [],
  },
  {
    src: '00_Indice_y_control/dudas_y_revision.md', dest: 'control/dudas-y-revision.md', kind: 'control',
    order: 4,
    summary: 'Lecturas dudosas, comandos incompletos o posiblemente erróneos y contenidos pendientes de revisar contra el original.',
    topics: ['Dudas', 'Revisión', 'Control'],
    batches: [],
    dates: [],
  },
];

/** Serializa un valor escalar como YAML seguro. */
function yamlValue(value) {
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return JSON.stringify(String(value));
}

function buildFrontmatter(doc) {
  const lines = ['---'];
  lines.push(`title: ${yamlValue(doc.title)}`);
  lines.push(`kind: ${yamlValue(doc.kind)}`);
  if (doc.subject) lines.push(`subject: ${yamlValue(doc.subject)}`);
  lines.push(`order: ${doc.order}`);
  lines.push(`summary: ${yamlValue(doc.summary)}`);
  lines.push('topics:');
  for (const topic of doc.topics) lines.push(`  - ${yamlValue(topic)}`);
  lines.push('source_batches:');
  if (doc.batches.length === 0) lines.push('  []');
  else for (const batch of doc.batches) lines.push(`  - ${batch}`);
  lines.push('dates:');
  if (doc.dates.length === 0) lines.push('  []');
  else for (const date of doc.dates) lines.push(`  - ${yamlValue(date)}`);
  lines.push('status: "organizado"');
  lines.push('---');
  return lines.join('\n') + '\n\n';
}

/** Separa el H1 inicial del resto del cuerpo, sin alterar el resto. */
function splitTitle(raw) {
  const text = raw.replace(/^\uFEFF/, '');
  const match = text.match(/^(#\s+[^\n]*)\n/);
  if (!match) throw new Error('No se encontró un H1 al inicio del documento');
  const title = match[1].replace(/^#\s+/, '').trim();
  let body = text.slice(match[0].length);
  // Elimina una única línea en blanco justo después del título.
  body = body.replace(/^\n/, '');
  return { title, body };
}

async function processDoc(doc) {
  const srcPath = path.join(ROOT, doc.src);
  const destPath = path.join(ROOT, 'apuntes', doc.dest);

  if (existsSync(destPath) && !existsSync(srcPath)) {
    return { ...doc, skipped: true };
  }

  const raw = await readFile(srcPath, 'utf8');
  const { title, body } = splitTitle(raw);

  // Verificación de integridad: título + cuerpo reconstruyen el original.
  const reconstructed = `# ${title}\n\n${body}`;
  const original = raw.replace(/^\uFEFF/, '');
  const normalize = (s) => s.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').replace(/\n+$/, '');
  if (normalize(reconstructed) !== normalize(original)) {
    throw new Error(`Integridad rota al procesar ${doc.src}`);
  }

  const finalDoc = { ...doc, title };
  await mkdir(path.dirname(destPath), { recursive: true });
  await writeFile(destPath, buildFrontmatter(finalDoc) + body, 'utf8');
  return { ...finalDoc, skipped: false, src: doc.src, dest: destPath };
}

const results = [];
for (const doc of DOCS) {
  results.push(await processDoc(doc));
}

const migrated = results.filter((r) => !r.skipped);
const skipped = results.filter((r) => r.skipped);
console.log(`Migrados: ${migrated.length}`);
for (const r of migrated) console.log(`  ✓ ${r.src}  →  apuntes/${r.dest}`);
if (skipped.length) {
  console.log(`Ya existentes (saltados): ${skipped.length}`);
  for (const r of skipped) console.log(`  · apuntes/${r.dest}`);
}

// Retira las carpetas de origen tras verificar la migración completa.
const sourceDirs = ['ASO', 'IAW', 'BBDD', 'Programacion_Python', 'Control_de_versiones', '00_Indice_y_control'];
const remaining = DOCS.filter((d) => existsSync(path.join(ROOT, d.src)));
if (remaining.length === 0) {
  for (const dir of sourceDirs) {
    const dirPath = path.join(ROOT, dir);
    if (existsSync(dirPath)) {
      await rm(dirPath, { recursive: true, force: true });
      console.log(`Origen eliminado (ya copiado): ${dir}/`);
    }
  }
} else {
  console.log(`Aviso: quedan ${remaining.length} documentos de origen sin migrar; no se elimina nada.`);
}
