---
title: "IAW - Joomla"
kind: "apunte"
subject: "IAW"
order: 3
summary: "Plantillas y posiciones de módulos, instalación de Joomla, base de datos, inserción de vídeos y mapas, menús y sindicación de contenido (RSS)."
topics:
  - "Joomla"
  - "CMS"
  - "Plantillas"
  - "Menús"
  - "RSS"
  - "MySQL"
source_batches:
  - 1
dates:
  - "2024-11-20"
  - "2024-12-04"
status: "organizado"
---

**Asignatura:** IAW (Implantación de Aplicaciones Web).
**Temas:** plantillas y posiciones de módulos, instalación de Joomla, base de datos, inserción de
vídeos y mapas, menús y distribución del contenido, sindicación de contenido (RSS).

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 20/11/2024 | Configuración de equipos y acceso, denegación del backend (relacionado con Joomla) |
| (sin fecha) | Plantillas, instalación, vídeos, mapas, menús |
| 04/12/2024 | Sindicación de contenido (RSS) |

## Lotes de origen

- **Lote 1**

---

## 1. Joomla: Posiciones de las plantillas

- Sistema -' Plantillas.
- Previsualizar la posición de los módulos.
- Habilitar la previsualización de posiciones.

En el navegador:

```text
URL/?tp=1
```

## 2. Instalación de Joomla y base de datos

- Descargar Joomla **4.4.9** desde la m-quina.
- Mover el archivo descargado al directorio `public_html`.
- Configurar el propietario del directorio web con `www-data`.
- Instalar MySQL Server.

La creación de la base de datos y del usuario se detalla en `BBDD/02_SQL_y_MySQL.md`:

```sql
CREATE DATABASE nombre;

CREATE USER 'usuario'@'localhost'
IDENTIFIED BY 'contraseña';

GRANT ALL PRIVILEGES ON nombre.*
TO 'usuario'@'localhost';

FLUSH PRIVILEGES;
```

Salir de MySQL. Descomprimir el archivo ZIP de Joomla dentro de `public_html` y comprobar los permisos.

> Las sentencias SQL se han reconstruido siguiendo la sintaxis habitual de MySQL cuando los
> caracteres no se distinguen bien. El tratamiento principal del bloque MySQL está
> en `BBDD/02_SQL_y_MySQL.md`; aquí se conserva por formar parte del procedimiento de Joomla.
```

## 3. Posiciones y módulos en Joomla

- Módulos posicionen en las diferentes áreas del sitio.
- Posiciones comunes: `position-1`, `position-2`, `position-3`, etc.
- Asociar módulos a posiciones específicas en la configuración de la plantilla.

## 4. RSS y sindicación de contenido

- Configurar feeds RSS para entradas del sitio.
- Dirección del feed: `index.php?option=com_fireboard&view=feed`
- Lectores RSS compatibles.

## 5. Videos y mapas

- Insertar videos de YouTube o Vimeo en articulos.
- Añadir mapas de Google Maps en posiciones de módulos.