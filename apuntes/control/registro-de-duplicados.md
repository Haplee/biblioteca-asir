---
title: "Registro de duplicados y solapamientos"
kind: "control"
order: 3
summary: "Solapamientos de contenido entre lotes y tratamiento aplicado."
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

> El documento maestro original se conserva intacto como fuente de referencia.

---

## 1. Temas repetidos dentro del propio maestro (solapamiento de contenido)

Estos no son duplicados de un mismo fragmento, sino **contenido que aparece en más de un punto del
maestro**. Se ha integrado en un único documento principal, con nota de las apariciones, para no
repetir texto.

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

## 2. Discrepancias entre versiones

No se ha detectado, dentro del maestro, dos versiones distintas del **mismo** fragmento con contenido
diferente. Donde el maestro recoge dudas de lectura, se han trasladado a
`dudas_y_revision.md` en lugar de elegir silenciosamente una versión.

---

## 3. Cómo se conserva la referencia al lote de origen

Cada documento temático indica el **lote** de origen y remite a `inventario_de_lotes.md`, que detalla
el contenido de cada lote. Así se conserva la trazabilidad al lote de origen sin repetir la
información en cada documento.
