/**
 * Configuración de marca, asignaturas y navegación.
 *
 * Todo lo que se muestra aquí procede de los propios apuntes: los recuentos de
 * documentos se calculan en tiempo de compilación (nunca se inventan), y las
 * descripciones de asignatura resumen los temas realmente presentes.
 */

export const SITE = {
  /** Marca corta, con el mayor peso visual. */
  mark: 'ASIR',
  /** Firma personal. */
  signature: 'FRAN VIDAL',
  /** Nombre completo para títulos y metadatos. */
  name: 'ASIR · Fran Vidal',
  subtitle: 'Biblioteca técnica personal',
  hero: {
    title: 'Todo tu conocimiento. En un solo lugar.',
    text: 'Apuntes, comandos y documentación técnica de ASIR, organizados para encontrar lo que necesitas.',
  },
  description:
    'Biblioteca personal de apuntes de ASIR: sistemas operativos, redes y servicios, implantación de aplicaciones web, bases de datos, programación y control de versiones. Con búsqueda, favoritos y modo claro/oscuro.',
  author: 'Fran Vidal',
} as const;

export type SubjectKey = 'ASO' | 'IAW' | 'BBDD' | 'Programación' | 'Git';

export interface SubjectConfig {
  key: SubjectKey;
  /** Segmento de URL, en minúsculas. */
  slug: string;
  /** Nombre corto para la navegación. */
  name: string;
  /** Nombre completo de la asignatura o área. */
  fullName: string;
  /** Descripción breve, basada en los temas reales de sus apuntes. */
  description: string;
  /** Nombre del icono Lucide (ver `src/components/Icon.astro`). */
  icon: string;
  /** Color de acento del área (solo decorativo). */
  accent: string;
}

export const SUBJECTS: SubjectConfig[] = [
  {
    key: 'ASO',
    slug: 'aso',
    name: 'ASO',
    fullName: 'Administración de Sistemas Operativos',
    description:
      'Windows y PowerShell, Linux y Bash, redes y servicios (LDAP, DHCP, SSH, iptables, GPG, Samba, CUPS) y usuarios, permisos y políticas.',
    icon: 'terminal',
    accent: '#ff6b7d',
  },
  {
    key: 'IAW',
    slug: 'iaw',
    name: 'IAW',
    fullName: 'Implantación de Aplicaciones Web',
    description:
      'Apache y VirtualHost, PHP, gestores de contenido (Joomla y WordPress) y Django como framework de despliegue.',
    icon: 'globe',
    accent: '#f2a65a',
  },
  {
    key: 'BBDD',
    slug: 'bbdd',
    name: 'BBDD',
    fullName: 'Bases de Datos',
    description:
      'Fundamentos de un SGBD, SQL y MySQL, Oracle y PL/SQL, usuarios, roles y privilegios, tablespaces y almacenamiento y transacciones ACID.',
    icon: 'database',
    accent: '#5ec8d8',
  },
  {
    key: 'Programación',
    slug: 'programacion',
    name: 'Programación',
    fullName: 'Programación / Python',
    description: 'Sintaxis y funciones en Python, con ejemplos reales de los apuntes.',
    icon: 'braces',
    accent: '#a98bf5',
  },
  {
    key: 'Git',
    slug: 'git',
    name: 'Git',
    fullName: 'Control de versiones — Git',
    description: 'Comandos esenciales de Git: configuración, repositorios, ramas y remotos.',
    icon: 'git-branch',
    accent: '#8fd18a',
  },
];

/** Accesos a los bloques de control y procedencia. */
export const CONTROL_DOCS = [
  { id: 'control/indice-general', label: 'Índice general', icon: 'list-tree' },
  { id: 'control/inventario-de-lotes', label: 'Inventario de lotes', icon: 'layers' },
  { id: 'control/registro-de-duplicados', label: 'Duplicados y solapamientos', icon: 'copy' },
  { id: 'control/dudas-y-revision', label: 'Dudas y revisión', icon: 'circle-alert' },
] as const;

/** Etiqueta legible para un lote de origen. */
export function batchLabel(batch: number): string {
  return `Lote ${batch}`;
}

export function subjectByKey(key: string | undefined): SubjectConfig | undefined {
  if (!key) return undefined;
  return SUBJECTS.find((s) => s.key === key);
}

export function subjectBySlug(slug: string | undefined): SubjectConfig | undefined {
  if (!slug) return undefined;
  return SUBJECTS.find((s) => s.slug === slug);
}
