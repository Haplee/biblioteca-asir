---
title: "IAW — Joomla"
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

**Asignatura:** IAW — Implantación de Aplicaciones Web.
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

## 1. Joomla — Posiciones de las plantillas

- Sistema → Plantillas.
- Previsualizar la posición de los módulos.
- Habilitar la previsualización de posiciones.

En el navegador:

```text
URL/?tp=1
```

---

## 2. Instalación de Joomla y base de datos

- Descargar Joomla **4.4.9** desde la máquina.
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
> caracteres no se distinguían bien. El tratamiento principal del bloque MySQL está
> en `BBDD/02_SQL_y_MySQL.md`; aquí se conserva por formar parte del procedimiento de Joomla.

---

## 3. Joomla — Insertar vídeos

Ruta aproximada:

**Contenido → Módulos del sitio → Crear → Custom**.

- Introducir el nombre del módulo.
- Utilizar el editor de texto y el código.
- Copiar el código `iframe` del vídeo desde la opción de compartir.

---

## 4. Joomla — Insertar un mapa

- Abrir Google Maps.
- Buscar la ubicación.
- Seleccionar **Compartir**.
- Elegir **Insertar un mapa**.
- Copiar el código proporcionado.
- Ir a **Contenido → Módulos del sitio → Crear → Custom**.
- Introducir el nombre.
- Abrir el editor de código.
- Pegar el código del mapa.
- Escoger la posición del módulo.

---

## 5. Joomla — Menús y distribución del contenido

**Main Menu → Menu → Choose Layout**

- Elegir la distribución.
- Organizar las columnas.
- Crear los artículos y desplazarlos a la posición deseada.

Crear un menú:

**Menú → Gestionar**

- Título.
- Nombre único.
- Asociar un menú o seleccionar el tipo de menú.

---

## 6. Sindicación de contenido (04/12/2024)

Ruta aproximada:

**Contenido → Módulos del sitio → Crear**.

Tipo de módulo: **Feed Display / Canales electrónicos**.

1. Introducir el nombre.
2. Buscar una fuente RSS en alguna página.
3. Copiar la URL del feed.
4. Pegar la URL en el módulo.

La distribución dibujada muestra una barra de navegación, una zona principal de artículos o imágenes
y tres bloques inferiores de artículos.

---

## Dudas de lectura

- Las sentencias SQL de creación de la base de datos se reconstruyeron por sintaxis habitual; no se
  distinguían bien.
- No se ha podido confirmar el número exacto de columnas/bloques del esquema de distribución dibujado.

## Notas técnicas

- El apunte cita **Joomla 4.4.9**; se conserva tal cual.
- El propietario del directorio web se indica como `www-data` (habitual en Apache/Debian).

## Referencias cruzadas

- Creación de la base de datos y del usuario en MySQL: `BBDD/02_SQL_y_MySQL.md`.
- Apache, `VirtualHost` y `DocumentRoot`: `IAW/01_Apache_y_VirtualHost.md`.
- Extensiones de PHP necesarias (`zip`, `intl`): `IAW/02_PHP.md`.
- WordPress (misma asignatura): `IAW/04_WordPress.md`.
