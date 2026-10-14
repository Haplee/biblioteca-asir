---
title: "BBDD — SQL y MySQL"
kind: "apunte"
subject: "BBDD"
order: 2
summary: "Creación de base de datos, usuario, privilegios y aplicación de cambios en MySQL (dentro de la práctica de Joomla)."
topics:
  - "MySQL"
  - "SQL"
  - "Usuarios"
  - "Privilegios"
source_batches:
  - 1
dates:
  - "2024-11-20"
status: "organizado"
---

**Asignatura:** BBDD — Bases de Datos.
**Temas:** creación de base de datos, usuario, privilegios y aplicación de cambios en MySQL.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 20/11/2024 | Creación de base de datos, usuario y permisos (dentro de la práctica de Joomla, Lote 1) |

## Lotes e imágenes de origen

- **Lote 1** — carpeta `lote-1/` (10 imágenes), transcrito de fotografías.
  Nombres de archivo completos en `00_Indice_y_control/inventario_de_lotes.md`.

> **Nota de clasificación:** este bloque aparece dentro de la instalación de Joomla (IAW), pero su
> contenido es de BBDD (MySQL). Se documenta aquí como principal; Joomla lo referencia desde
> `IAW/03_Joomla.md`.

---

## Creación de base de datos, usuario y permisos en MySQL

Crear la base de datos:

```sql
CREATE DATABASE nombre;
```

Crear el usuario:

```sql
CREATE USER 'usuario'@'localhost'
IDENTIFIED BY 'contraseña';
```

Conceder permisos:

```sql
GRANT ALL PRIVILEGES ON nombre.*
TO 'usuario'@'localhost';
```

Aplicar los cambios:

```sql
FLUSH PRIVILEGES;
```

Salir de MySQL.

> Las sentencias SQL se han reconstruido siguiendo la sintaxis habitual de MySQL cuando los
> caracteres de la fotografía no se distinguían bien.

---

## Dudas de lectura

- Las sentencias se reconstruyeron por sintaxis habitual; comprobar contra la fotografía original
  si se requiere literalidad exacta.

## Notas técnicas

- `CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'contraseña';` es la forma correcta y coincide con
  el apunte.
- El comando de instalación del servidor anotado en la práctica es MySQL Server.

## Referencias cruzadas

- Práctica de Joomla donde se usa esta base de datos: `IAW/03_Joomla.md`.
- Usuarios, roles y privilegios en Oracle (otro SGBD): `BBDD/04_Usuarios_roles_y_privilegios.md`.
