---
title: "IAW �� Joomla"
kind: "apunte"
subject: "IAW"
order: 3
summary: "Plantillas y posiciones de m�dulos, instalaci�n de Joomla, base de datos, inserci�n de v�deos y mapas, men�s y sindicaci�n de contenido (RSS)."
topics:
  - "Joomla"
  - "CMS"
  - "Plantillas"
  - "Men�s"
  - "RSS"
  - "MySQL"
source_batches:
  - 1
dates:
  - "2024-11-20"
  - "2024-12-04"
status: "organizado"
---

**Asignatura:** IAW (Implantaci�n de Aplicaciones Web).
**Temas:** plantillas y posiciones de m�dulos, instalaci�n de Joomla, base de datos, inserci�n de
v�deos y mapas, men�s y distribuci�n del contenido, sindicaci�n de contenido (RSS).

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 20/11/2024 | Configuraci�n de equipos y acceso, denegaci�n del backend (relacionado con Joomla) |
| (sin fecha) | Plantillas, instalaci�n, v�deos, mapas, men�s |
| 04/12/2024 | Sindicaci�n de contenido (RSS) |

## Lotes de origen

- **Lote 1**

---

## 1. Joomla: Posiciones de las plantillas

- Sistema ��' Plantillas.
- Previsualizar la posici�n de los m�dulos.
- Habilitar la previsualizaci�n de posiciones.

En el navegador:

```text
URL/?tp=1
```

## 2. Instalaci�n de Joomla y base de datos

- Descargar Joomla **4.4.9** desde la m��quina.
- Mover el archivo descargado al directorio `public_html`.
- Configurar el propietario del directorio web con `www-data`.
- Instalar MySQL Server.

La creaci�n de la base de datos y del usuario se detalla en `BBDD/02_SQL_y_MySQL.md`:

```sql
CREATE DATABASE nombre;

CREATE USER 'usuario'@'localhost'
IDENTIFIED BY 'contrase�a';

GRANT ALL PRIVILEGES ON nombre.*
TO 'usuario'@'localhost';

FLUSH PRIVILEGES;
```

Salir de MySQL. Descomprimir el archivo ZIP de Joomla dentro de `public_html` y comprobar los permisos.

> Las sentencias SQL se han reconstruido siguiendo la sintaxis habitual de MySQL cuando los
> caracteres no se distinguen bien. El tratamiento principal del bloque MySQL est�
> en `BBDD/02_SQL_y_MySQL.md`; aqu� se conserva por formar parte del procedimiento de Joomla.
```

## 3. Posiciones y m�dulos en Joomla

- M�dulos posicionen en las diferentes �reas del sitio.
- Posiciones comunes: `position-1`, `position-2`, `position-3`, etc.
- Asociar m�dulos a posiciones espec�ficas en la configuraci�n de la plantilla.

## 4. RSS y sindicaci�n de contenido

- Configurar feeds RSS para entradas del sitio.
- Direcci�n del feed: `index.php?option=com_fireboard&view=feed`
- Lectores RSS compatibles.

## 5. Videos y mapas

- Insertar videos de YouTube o Vimeo en articulos.
- A�adir mapas de Google Maps en posiciones de m�dulos.