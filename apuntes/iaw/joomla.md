---
title: "IAW - Joomla"
kind: "apunte"
subject: "IAW"
order: 3
summary: "Plantillas y posiciones de mñdulos, instalaciñn de Joomla, base de datos, inserciñn de vñdeos y mapas, menñs y sindicaciñn de contenido (RSS)."
topics:
  - "Joomla"
  - "CMS"
  - "Plantillas"
  - "Menñs"
  - "RSS"
  - "MySQL"
source_batches:
  - 1
dates:
  - "2024-11-20"
  - "2024-12-04"
status: "organizado"
---

**Asignatura:** IAW (Implantaciñn de Aplicaciones Web).
**Temas:** plantillas y posiciones de mñdulos, instalaciñn de Joomla, base de datos, inserciñn de
vñdeos y mapas, menñs y distribuciñn del contenido, sindicaciñn de contenido (RSS).

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 20/11/2024 | Configuraciñn de equipos y acceso, denegaciñn del backend (relacionado con Joomla) |
| (sin fecha) | Plantillas, instalaciñn, vñdeos, mapas, menñs |
| 04/12/2024 | Sindicaciñn de contenido (RSS) |

## Lotes de origen

- **Lote 1**

---

## 1. Joomla: Posiciones de las plantillas

- Sistema -' Plantillas.
- Previsualizar la posiciñn de los mñdulos.
- Habilitar la previsualizaciñn de posiciones.

En el navegador:

```text
URL/?tp=1
```

## 2. Instalaciñn de Joomla y base de datos

- Descargar Joomla **4.4.9** desde la m-quina.
- Mover el archivo descargado al directorio `public_html`.
- Configurar el propietario del directorio web con `www-data`.
- Instalar MySQL Server.

La creaciñn de la base de datos y del usuario se detalla en `BBDD/02_SQL_y_MySQL.md`:

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
> caracteres no se distinguen bien. El tratamiento principal del bloque MySQL estñ
> en `BBDD/02_SQL_y_MySQL.md`; aquñ se conserva por formar parte del procedimiento de Joomla.
```

## 3. Posiciones y mñdulos en Joomla

- Mñdulos posicionen en las diferentes ñreas del sitio.
- Posiciones comunes: `position-1`, `position-2`, `position-3`, etc.
- Asociar mñdulos a posiciones especñficas en la configuraciñn de la plantilla.

## 4. RSS y sindicaciñn de contenido

- Configurar feeds RSS para entradas del sitio.
- Direcciñn del feed: `index.php?option=com_fireboard&view=feed`
- Lectores RSS compatibles.

## 5. Videos y mapas

- Insertar videos de YouTube o Vimeo en articulos.
- Añadir mapas de Google Maps en posiciones de mñdulos.