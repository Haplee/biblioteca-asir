import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Colección única `apuntes`.
 *
 * El `id` de cada entrada es la ruta del fichero respecto a `apuntes/` sin
 * extensión (por ejemplo `aso/linux-bash`), lo que da una URL estable.
 *
 * `kind` distingue los apuntes de asignatura (`apunte`) de los bloques de
 * control/procedencia (`control`: índice general, inventario de lotes,
 * registro de duplicados y dudas).
 */
const apuntes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './apuntes' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['apunte', 'control']).default('apunte'),
    subject: z.string().optional(),
    order: z.number().default(0),
    summary: z.string(),
    topics: z.array(z.string()).default([]),
    source_batches: z.array(z.number()).default([]),
    dates: z.array(z.string()).default([]),
    status: z.string().default('organizado'),
  }),
});

export const collections = { apuntes };
