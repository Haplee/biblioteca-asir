---
title: "BBDD — Usuarios, roles y privilegios"
kind: "apunte"
subject: "BBDD"
order: 4
summary: "Usuarios y esquemas, roles, perfiles, bloqueo de cuentas, privilegios de objeto y administración de cuentas en Oracle."
topics:
  - "Oracle"
  - "Usuarios"
  - "Roles"
  - "Perfiles"
  - "Privilegios"
  - "Esquemas"
source_batches:
  - 5
  - 6
dates:
  - "2024-12-16"
  - "2024-12-17"
  - "2025-01-14"
status: "organizado"
---

**Asignatura:** BBDD — Bases de Datos.
**Temas:** usuarios y esquemas, roles, perfiles, bloqueo de cuentas, privilegios de objeto y
administración de cuentas en Oracle.

## Fechas de los apuntes

| Fecha | Contenido | Lote |
|---|---|---|
| 16/12/2024 | Usuarios y esquemas | 5 |
| 17/12/2024 | Privilegios de objeto | 5 |
| 14/01/2025 | Roles, perfiles y conexión | 5 |
| (sin fecha) | Perfiles, usuarios y roles (detallado) | 6 |

## Lotes de origen

- **Lote 5**
- **Lote 6**


---

## 1. Roles (14/01/2025, Lote 5)

- Los roles agrupan privilegios y otros permisos.
- `DBA`: referencia a los roles de administración.
- Los roles y privilegios se pueden activar y desactivar.

Hay una anotación sobre privilegios de `SELECT`, `UPDATE` y `DELETE`, pero no se distingue
completamente.

---

## 2. Perfiles (14/01/2025, Lote 5)

Los perfiles permiten limitar el uso de algunos recursos.

En el apunte aparece una posible opción `PASSWORD_LIMIT = TRUE`.
**[Lectura dudosa]**

Estructura anotada:

```sql
CREATE PROFILE nombre LIMIT
    ...;
```

Asociar un perfil a un usuario:

```sql
CREATE USER nombre
IDENTIFIED BY contraseña
PROFILE perfil;
```

---

## 3. Conexión (14/01/2025, Lote 5)

```sql
CONNECT nombre_usuario;
```

Anotación: SQL Plus.

---

## 4. Usuarios y esquemas (16/12/2024, Lote 5)

En la hoja se citan:

- `SYS`
- `SYSTEM`
- Un tercer usuario **[ilegible]**

**Esquema:** conjunto de objetos que pertenecen a un usuario.

**Perfil:** conjunto de restricciones o políticas que se asignan a un usuario.
**[Definición manuscrita parcialmente dudosa]**

---

## 5. Bloqueo de usuarios (Lote 5)

Aparecen `DBA_USERS` y la columna `ACCOUNT_STATUS`.

Bloquear un usuario:

```sql
ALTER USER usuario ACCOUNT LOCK;
```

Desbloquearlo:

```sql
ALTER USER usuario ACCOUNT UNLOCK;
```

Caducar la contraseña:

```sql
ALTER USER usuario PASSWORD EXPIRE;
```

La anotación indica que el usuario deberá cambiar la contraseña en la siguiente sesión.

---

## 6. Privilegios de objeto (17/12/2024, Lote 5)

Estructura habitual anotada para conceder privilegios:

```sql
GRANT privilegio
ON esquema.tabla
TO usuario;
```

Retirar privilegios:

```sql
REVOKE privilegio
ON esquema.tabla
FROM usuario;
```

Se mencionan permisos como `SELECT`, `UPDATE` y `DELETE`.

---

## 7. Perfiles, usuarios y roles (detallado, Lote 6)

### Perfiles

- Activar:

  ```sql
  Alter system set Resource_limit = True;
  ```

- Crear:

  ```sql
  create profile "nombre" limit sessions_per_user (n) | connect_time (n) ...
  ```

- Asignar: al crearlo (`create user "nomb" identified by "contra" profile "perfil";`) o
  modificando (`alter user "nombre" profile "nombre";`).
- Ver parámetros:

  ```sql
  select * from DBA_Profiles where profile = "nombre";
  ```

- Desbloquear:

  ```sql
  Alter user "nombre" account [lock|unlock];
  ```

- Eliminar:

  ```sql
  Drop profile "nombre" [cascade];
  ```

### Usuarios

```sql
Create user nombre identified by "contra"
```

Opciones:

```text
default tablespace "nombre"
temporary tablespace "nombre"
quota (n|K|M|unlimited) on "nombre"
profile "nombre";
```

### Roles y privilegios

- Crear rol:

  ```sql
  create role "nombre";
  ```

- Asignar:

  ```sql
  Grant create table to "nombre_rol";
  ```

  (Sistema: `view`, `user` / Objetos: `select`, `insert`, `update`, `delete`
  `on tabla.campo to "nombre";`)

- Quitar:

  ```sql
  Revoke (priv) from "n_rol";
  Revoke (n_rol) from "usuario";
  ```

- Eliminar rol:

  ```sql
  Drop role "nombre_rol";
  ```

---

## Dudas de lectura

- `PASSWORD_LIMIT = TRUE` en perfiles (lectura dudosa).
- Tercer usuario junto a `SYS` y `SYSTEM` (ilegible).
- Definición manuscrita de «perfil» parcialmente dudosa.
- Los privilegios de `SELECT`, `UPDATE` y `DELETE` del Lote 5 no se distinguen completamente.

## Notas técnicas

- Las comillas dobles del Lote 6 en identificadores (`"nombre"`) reproducen el original; en Oracle
  las comillas dobles fuerzan identificadores sensibles a mayúsculas.
- Se conserva `key sensitive` tal como aparece en el apunte (por «case sensitive»).

## Referencias cruzadas

- Vistas del diccionario (`DBA_`, `ALL_`, `USER_`, `V$`, `GV$`): `BBDD/03_Oracle_y_PL-SQL.md`.
- Tablespaces y `quota` sobre ellos: `BBDD/05_Tablespaces_y_almacenamiento.md`.
- Usuarios, grupos y cuotas del sistema operativo (otra asignatura): `ASO/04_Usuarios_permisos_y_politicas.md`.
- Creación de usuario y privilegios en MySQL: `BBDD/02_SQL_y_MySQL.md`.
