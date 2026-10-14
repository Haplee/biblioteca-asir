---
title: "Registro de duplicados y solapamientos"
kind: "control"
order: 3
summary: "Solapamientos de contenido entre lotes, tratamiento aplicado y estado de la comprobación de duplicados."
topics:
  - "Duplicados"
  - "Control"
source_batches:
  []
dates:
  []
status: "organizado"
---

**Fecha de creación:** 14/10/2026.
**Alcance de esta primera tanda:** organización del texto del maestro `apuntes_unificados_lotes_1-7.md`.

> Ninguna imagen original ha sido borrada, movida ni sobrescrita.

---

## 1. Duplicados a nivel de imagen (pendiente de comprobar)

En esta tanda **no se ha comparado visualmente cada fotografía**, por lo que **no se confirma ni se
descarta** la existencia de fotos repetidas, tomas de la misma página desde otro ángulo o páginas
solapadas.

Queda pendiente, cuando el usuario lo solicite:

- Comparar las 10 imágenes de cada lote entre sí y entre lotes.
- Detectar fotos repetidas o continuaciones de una misma página.
- Comprobar si las fotos de `lote-2/`, `lote-4/` y `lote-6/` se corresponden con el texto que el
  maestro ya tenía de esos lotes (ver `inventario_de_lotes.md`, incidencia 1).

---

## 2. Temas repetidos dentro del propio maestro (solapamiento de contenido)

Estos no son duplicados de imagen, sino **contenido que aparece en más de un punto del maestro**.
Se ha integrado en un único documento principal, con nota de las apariciones, para no repetir texto.

| Tema | Aparece en | Documento principal | Tratamiento |
|---|---|---|---|
| `$*` y `$#` (todos y cantidad de parámetros) | Lote 3 (06/02/2025) y Lote 3 (16/12/2024) | `ASO/02_Linux_Bash.md` | Se documenta una vez, indicando las dos fechas. |
| Permisos `666` / `777` y grupos | Lote 2 (28/10/2024) | `ASO/02_Linux_Bash.md` (contexto de script) y `ASO/04_Usuarios_permisos_y_politicas.md` | Se conserva en el contexto del script y se enlaza con permisos. |
| `echo -e "\n"` / `echo -e "\t"` | Lote 3 (12/12/2024) | `ASO/02_Linux_Bash.md` | Una sola entrada. |
| `tail -f` | Lote 3 (12/12/2024) y Lote 3 (16/12/2024) | `ASO/02_Linux_Bash.md` | Una sola entrada. |
| Tablespaces (crear, mover, autoextend, tamaño, añadir datafile) | Lote 4 (18/11 y 19/12/2024) y Lote 5 (21/11, 25/11, 02/12, 14/01/2025) | `BBDD/05_Tablespaces_y_almacenamiento.md` | Se unifican, conservando las fechas de cada bloque. |
| Privilegios de objeto (`GRANT`/`REVOKE`) | Lote 1 (dentro de Joomla, MySQL) y Lote 5 / Lote 6 (Oracle) | `BBDD/04_Usuarios_roles_y_privilegios.md` (Oracle) y `BBDD/02_SQL_y_MySQL.md` (MySQL) | Separados por SGBD. |
| Creación de base de datos, usuario y permisos en MySQL | Lote 1 (práctica de Joomla) | `BBDD/02_SQL_y_MySQL.md` | Principal en BBDD; en `IAW/03_Joomla.md` se deja referencia cruzada. |
| `%ROWCOUNT` / cursores y atributos | Lote 3 | `BBDD/03_Oracle_y_PL-SQL.md` | Una sola entrada. |
| Samba y CUPS | Lote 2 (práctica 3) y Lote 6 (detallado) | `ASO/03_Red_y_servicios.md` | Se documenta la versión de Lote 6 como principal y se anota la de Lote 2. |
| Cuotas de disco | Lote 6 | `ASO/04_Usuarios_permisos_y_politicas.md` | Una sola entrada. |

---

## 3. Discrepancias entre versiones

No se ha detectado, dentro del maestro, dos versiones distintas del **mismo** fragmento con contenido
diferente. Donde el maestro recoge dudas de lectura, se han trasladado a
`dudas_y_revision.md` en lugar de elegir silenciosamente una versión.

---

## 4. Cómo se conserva la referencia a las imágenes

Cada documento temático indica el **lote** de origen y remite a `inventario_de_lotes.md`, que
enumera los nombres de archivo completos de cada lote. Así se conserva la trazabilidad a todas las
imágenes que contienen ese texto sin repetir la lista de ficheros en cada documento.
