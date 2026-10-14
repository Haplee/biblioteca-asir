---
title: "IAW — PHP"
kind: "apunte"
subject: "IAW"
order: 2
summary: "Configuración de PHP (php.ini), extensiones ZIP e intl, búfer de salida y tamaño máximo de archivos subidos."
topics:
  - "PHP"
  - "php.ini"
  - "Extensiones"
source_batches:
  - 1
dates:
  []
status: "organizado"
---

**Asignatura:** IAW — Implantación de Aplicaciones Web.
**Temas:** configuración de PHP (`php.ini`), extensiones necesarias, búfer de salida y tamaño de
archivos subidos.

## Fechas de los apuntes

- Sin fecha explícita en la hoja (contenido del Lote 1, práctica de Joomla; entorno del 20/11/2024).

## Lotes de origen

- **Lote 1**

---

## Configuración de PHP

Archivo anotado:

```text
/etc/php/VERSION/apache2/php.ini
```

En una lista relacionada con errores o requisitos aparecen:

- Búfer de salida.
- Extensión ZIP.
- Extensión `intl`.

Instalar extensiones:

```bash
apt install php-zip php-intl
```

Editar `php.ini`:

- Buscar la configuración del búfer de salida.
- Comprobar o activar `output_buffering`.
- Habilitar ZIP.
- Habilitar `intl`.
- Cambiar el parámetro relacionado con el tamaño máximo de archivos subidos.

El apunte parece indicar `upload_file_size`, pero el parámetro habitual de PHP es
`upload_max_filesize`. **[Revisar]**

---

## Dudas de lectura

- `upload_file_size` frente a `upload_max_filesize`.
- La versión concreta de PHP (`/etc/php/VERSION/...`) aparece como marcador en el apunte.

## Notas técnicas

- **Posible corrección técnica (A7/B):** el parámetro de PHP para el tamaño máximo de archivo subido
  es `upload_max_filesize` (y suele acompañarse de `post_max_size`). El apunte parece escribir
  `upload_file_size`. Se conserva la lectura literal y se señala aparte.

## Referencias cruzadas

- Instalación de Apache y `VirtualHost`: `IAW/01_Apache_y_VirtualHost.md`.
- Práctica de Joomla que exige estas extensiones: `IAW/03_Joomla.md`.
