---
title: "IAW — WordPress"
kind: "apunte"
subject: "IAW"
order: 4
summary: "Diferencia entre página y entrada, categorías y etiquetas, acceso al backend, formato de fecha, enlaces permanentes y caché."
topics:
  - "WordPress"
  - "CMS"
  - "Entradas"
  - "Categorías"
  - "Enlaces permanentes"
  - "Caché"
source_batches:
  - 1
dates:
  - "2025-01-08"
status: "organizado"
---

**Asignatura:** IAW — Implantación de Aplicaciones Web.
**Temas:** diferencia entre página y entrada, categorías y etiquetas, acceso al backend, formato de
fecha, enlaces permanentes y caché.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 08/01/2025 | Páginas, entradas, categorías, etiquetas, backend, formato de fecha, enlaces permanentes y caché |

## Lotes de origen

- **Lote 1**

---

## WordPress — Páginas, entradas, categorías y etiquetas

**Diferencia entre página y entrada:**

- **Página:** contenido más estático.
- **Entrada (post):** contenido más dinámico.
- La elección depende de la naturaleza del contenido.

**Categoría:** clasificación del contenido. El apunte indica que es obligatoria en páginas y
entradas y que solo puede haber una categoría.
**[Esta anotación puede referirse a un ejercicio concreto; no debe considerarse una regla general de WordPress]**

**Etiqueta:** no es obligatoria y puede haber cero o varias.

Acceso al backend:

```text
/wp-admin
```

Cambiar el formato de fecha:

**Ajustes → Generales → Formato de fecha**.

Configurar enlaces permanentes:

**Ajustes → Enlaces permanentes**.

Limpiar caché:

- Plugin: **LiteSpeed Cache**.
- Utilizar las opciones del plugin para limpiar la caché.

---

## Dudas de lectura

- La afirmación «la categoría es obligatoria y solo puede haber una» probablemente corresponde a un
  ejercicio concreto y no a una regla general de WordPress (ver `dudas_y_revision.md`, A8).

## Notas técnicas

- **Aclaración:** en WordPress, las entradas normalmente **pueden** no tener categoría (se asigna a
  la categoría por defecto) y admiten varias categorías y varias etiquetas. Se conserva el texto
  original y se añade esta nota, sin corregir el apunte.

## Referencias cruzadas

- Apache, `VirtualHost` y `hosts`: `IAW/01_Apache_y_VirtualHost.md`.
- Joomla (otro gestor de contenidos de la misma asignatura): `IAW/03_Joomla.md`.
