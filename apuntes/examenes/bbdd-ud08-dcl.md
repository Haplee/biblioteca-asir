---
title: "Exámenes · BBDD: UD08 DCL"
kind: "apunte"
subject: "Exámenes"
order: 1
summary: "Examen resuelto de control de acceso en MySQL: usuarios, contraseñas, roles, GRANT y REVOKE por tabla y columna, rol por defecto y los errores de sintaxis que aparecieron al probarlo."
topics:
  - "Bases de Datos"
  - "SQL"
  - "MySQL"
  - "Usuarios y privilegios"
source_batches:
  []
dates:
  []
status: "organizado"
---

**Asignatura:** BBDD (Bases de Datos). **Bloque:** UD08, DCL (Data Control Language).
**Base de datos del examen:** `investigacion`, con las tablas `INVESTIGADORES`,
`RESERVA`, `FACULTAD` y `EQUIPOS`.

**Nota:** los nombres de alumnos que aparecían en el enunciado y en las capturas se
han sustituido por `alumno1` a `alumno7`, y los nombres de investigadores por
etiquetas del tipo `Investigador A`. El contenido técnico no se toca: solo los
nombres.

---

## Enunciado

1. Crear un usuario de base de datos por cada miembro del grupo (siete), todos en
   `localhost`.
2. Asignar contraseña a dos de ellos.
3. Renombrar uno de los usuarios creados.
4. Crear tres roles (`rol_secretaria`, `rol_leng_sist`, `rol_dirc`) con los permisos
   indicados, asignarlos a los usuarios y fijar el rol por defecto de cada uno.
5. Conectado como un usuario con rol de secretaría, borrar el DNI de un investigador.
   Conectado como un usuario con rol de lenguaje de sistemas, sumar dos años a la
   fecha de nacimiento de otro investigador.
6. Crear un usuario nuevo y darle el rol de lenguaje de sistemas.
7. Conceder permiso `ALTER` sobre toda la base de datos a un usuario concreto.
8. Revocar el permiso `ALTER` sobre la tabla `INVESTIGADORES` al rol de lenguaje de
   sistemas.

---

## 1. Crear los usuarios

```sql
use investigacion;

create user 'alumno1'@'localhost';
create user 'alumno2'@'localhost';
create user 'alumno3'@'localhost';
create user 'alumno4'@'localhost';
create user 'alumno5'@'localhost';
create user 'alumno6'@'localhost';
create user 'alumno7'@'localhost';
```

## 2. Contraseñas

```sql
alter user 'alumno3'@'localhost' identified by 'Clave1';
alter user 'alumno6'@'localhost' identified by 'Clave2';
```

## 3. Renombrar un usuario

```sql
rename user 'alumno6'@'localhost' to 'alumno6b'@'localhost';
```

## 4. Roles y privilegios

```sql
create role rol_secretaria;
create role rol_leng_sist;
create role rol_dirc;
```

### rol_secretaria

```sql
grant select on investigacion.RESERVA to rol_secretaria;
grant insert on investigacion.INVESTIGADORES to rol_secretaria;
grant update(AnioNacimiento) on investigacion.INVESTIGADORES to rol_secretaria;
```

### rol_leng_sist

```sql
grant select on investigacion.INVESTIGADORES to rol_leng_sist;
grant select on investigacion.FACULTAD to rol_leng_sist;
grant select on investigacion.EQUIPOS to rol_leng_sist;
grant update on investigacion.INVESTIGADORES to rol_leng_sist;
```

### rol_dirc

```sql
grant select on investigacion.EQUIPOS to rol_dirc;
grant all on investigacion.INVESTIGADORES to rol_dirc;
grant select, insert, update on investigacion.FACULTAD to rol_dirc;
```

### Asignar los roles y fijar el predeterminado

```sql
grant rol_secretaria to 'alumno1'@'localhost', 'alumno2'@'localhost';
grant rol_leng_sist to 'alumno3'@'localhost', 'alumno4'@'localhost', 'alumno5'@'localhost';
grant rol_dirc to 'alumno6b'@'localhost', 'alumno7'@'localhost';

set default role rol_secretaria to 'alumno1'@'localhost', 'alumno2'@'localhost';
set default role rol_leng_sist to 'alumno3'@'localhost', 'alumno4'@'localhost', 'alumno5'@'localhost';
set default role rol_dirc to 'alumno6b'@'localhost', 'alumno7'@'localhost';
```

## 5. Operar con el rol ya activo

Borrar el DNI de un investigador conectado como usuario de secretaría. `DELETE` no
sirve aquí: actúa sobre filas enteras, así que para vaciar una columna se usa
`UPDATE`:

```sql
mysql -u alumno1 -p
```

```sql
use investigacion;
update INVESTIGADORES set DNI = null where NomApels = 'Investigador A';
```

Sumar dos años a la fecha de nacimiento, conectado como usuario de lenguaje de
sistemas:

```sql
mysql -u alumno3 -pClave1
```

```sql
update INVESTIGADORES
   set AnioNacimiento = AnioNacimiento + interval 2 year
 where NomApels = 'Investigador B';
```

## 6. Usuario nuevo con rol

```sql
create user 'alumno8'@'localhost';
grant rol_leng_sist to 'alumno8'@'localhost';
set default role rol_leng_sist to 'alumno8'@'localhost';
```

## 7. Permiso sobre toda la base

```sql
grant alter on investigacion.* to 'alumno4'@'localhost';
```

## 8. Revocar el permiso sobre una tabla

```sql
revoke alter on investigacion.INVESTIGADORES from rol_leng_sist;
```

---

## Errores que salieron en las capturas

Los tres fallos son de los que se repiten en cualquier examen de DCL, así que
conviene tenerlos localizados.

**Borrar una columna con `delete`.** `delete NomApels from INVESTIGADORES` devuelve
`ERROR 1109: Unknown table 'NomApels'`, porque `DELETE` actúa sobre filas completas,
nunca sobre columnas. Para dejar la columna a nulo se usa `update`; para quitar la
columna de la tabla, `alter table ... drop column`.

**Usar `delete *`.** `delete * from INVESTIGADORES` da `ERROR 1064`, porque MySQL no
admite el asterisco en `DELETE`. La forma correcta es `delete from tabla where ...`.

**Columna en el nombre de la tabla.** `alter table INVESTIGADORES.AnioNacimiento set
...` también da `ERROR 1064`: en `ALTER TABLE` solo va el nombre de la tabla, y las
acciones son `modify`, `change` o `update` (esta última fuera del `ALTER`). La
sentencia que sí funciona es el `update` del ejercicio 5.

**Permisos por columna.** `grant update(AnioNacimiento)` solo permite modificar esa
columna; si se intenta tocar otra, el motor responde con error de privilegios. Es la
diferencia entre el rol de secretaría y el de lenguaje de sistemas, que recibe
`update` sobre la tabla completa.

## Qué se practica

- Diferencia entre `CREATE USER`, `ALTER USER` y `RENAME USER`.
- Roles como agrupación de privilegios, y `SET DEFAULT ROLE` para que se activen al
  conectar sin `SET ROLE` manual.
- `GRANT` a nivel de tabla, de columna y de base de datos con `*`.
- `REVOKE` sobre un rol, que afecta a todos sus usuarios a la vez.
