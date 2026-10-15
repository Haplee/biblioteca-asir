---
title: "BBDD · Oracle y PL/SQL"
kind: "apunte"
subject: "BBDD"
order: 3
summary: "Tablas y vistas de Oracle, red de Oracle (listener.ora, puerto 1521), triggers, funciones, procedimientos, cursores, secuencias, control de flujo en PL/SQL, administración de instancia y vistas del diccionario."
topics:
  - "Oracle"
  - "PL/SQL"
  - "Triggers"
  - "Procedimientos"
  - "Funciones"
  - "Cursores"
  - "Secuencias"
  - "listener.ora"
source_batches:
  - 3
  - 4
  - 5
  - 6
dates:
  - "2024-10-28"
  - "2024-10-29"
  - "2024-11-05"
  - "2025-01-14"
  - "2025-01-20"
  - "2025-01-21"
  - "2025-01-27"
  - "2025-01-28"
  - "2025-02-04"
  - "2025-02-11"
status: "organizado"
---

**Asignatura:** BBDD (Bases de Datos).
**Temas:** tablas y vistas de Oracle, red de Oracle (`listener.ora`, puerto 1521), triggers,
funciones, procedimientos, cursores, secuencias, control de flujo en PL/SQL, administración de
instancia y vistas del diccionario.

## Fechas de los apuntes

| Fecha | Contenido | Lote |
|---|---|---|
| 28/10/2024 a 29/10/2024 | Administración de instancia | 6 |
| 05/11/2024 | Conceptos y tablas de Oracle | 4 |
| 25/11/2024 | (Tablespaces, en `05_…almacenamiento`) | 5 |
| 14/01/2025 | Conceptos de PL/SQL | 5 |
| 20/01/2025 | Sintaxis PL/SQL | 5 |
| 21/01/2025 | PL/SQL: control de flujo | 6 |
| 27/01/2025 | Cursores | 3 |
| 28/01/2025 | Tipos y procedimientos | 3 |
| 04/02/2025 | `MOD`, `%ROWCOUNT` | 3 |
| 11/02/2025 | `ROWNUM` | 3 |
| (sin fecha) | Triggers, sinónimos, funciones, secuencias | 3 y 6 |

## Lotes de origen

- **Lote 3**
- **Lote 4**
- **Lote 5**
- **Lote 6**


---

## 1. Conceptos y tablas de Oracle (05/11/2024, Lote 4)

**Tablas más usadas:**

- **Tablas base:** almacenan información de la BD (NO TOCAR).
- **Vistas (estáticas).**
- **Vistas dinámicas (tiempo real).**

Comando de formato:

```sql
col name format A10;
```

**Protocolos:**

- **Protocolo BEQ:** conexión en la misma máquina.
- **SQL\*NET:** framework de red para conectar cliente al servidor.
- **Protocolo PGA:** conexión remota al servidor.

**Archivos de red** (ruta: `/opt/oracle/product/19c/dbhome_1/network/admin`):

- Puerto por defecto: `1521`
- `listener.ora` → servidor
- `tnsnames.ora` → cliente y servidor
- `sqlnet.ora` → cliente y servidor (a no ser que los 2 ficheros anteriores estén mal, NO TOCAR)

```text
LSNRCTL -> se ejecuta como usuario normal
```

---

## 2. Conceptos de PL/SQL (14/01/2025, Lote 5)

- **Bloque:** trozo de código que no se almacena y que se ejecuta; sin nombre.
- **Programa:** conjunto de bloques; sí se almacena.
- **Función:** programa que devuelve un valor. En el apunte aparece «siempre».
- **Procedimiento:** programa que no devuelve un valor; se puede almacenar en una variable y luego
  mostrarla. **[Definición resumida en la hoja]**
- **Trigger:** programa que se ejecuta cuando ocurre una situación o evento en el sistema.
- **Paquete:** conjunto de procedimientos y funciones.

---

## 3. Sintaxis PL/SQL (20/01/2025, Lote 5)

La anotación indica: **«Siempre poner IS, no AS»**.

Comentarios de una línea:

```sql
-- Comentario
```

Comentarios de varias líneas:

```sql
/*
Comentario
*/
```

Asignación:

```sql
:=
```

También se anota `DEFAULT` con una advertencia. **[Contexto insuficiente]**

Escribir por pantalla:

```sql
DBMS_OUTPUT.PUT_LINE(v);
```

Tipo de una variable según una columna:

```sql
%TYPE
```

La anotación indica que hereda el tipo definido en la tabla, pero no la restricción `NOT NULL`.

Fecha del sistema:

```sql
SYSDATE
```

También aparece una referencia a `FROM sys.dual`.

Activar salida por pantalla:

```sql
SET SERVEROUTPUT ON;
```

Concatenar:

```sql
||
```

Número aleatorio:

```sql
DBMS_RANDOM.RANDOM
```

Línea en blanco:

```sql
DBMS_OUTPUT.NEW_LINE();
```

---

## 4. Control de flujo en PL/SQL (21/01/2025, Lote 6)

- `merge` → Inserta y Actualiza.

**CASE:** el valor que devuelve se debe almacenar siempre en una variable.

```sql
v := case v_2
  when 'x' then 'x'
  when 'y' then 'y'
  else 'error'
end;
```

**LOOP:** mínimo se ejecuta 1 vez. Se le pueden asignar etiquetas.

```sql
<< mi_bucle >>
loop
  -- instrucciones
end loop << mi_bucle >>
```

**WHILE:** se ejecuta 0 o n veces. (No se le ponen etiquetas.)

```sql
while condición loop
  -- instrucciones
end loop;
```

**FOR:** (se pueden poner etiquetas.)

```sql
for x in select dni, nombre from alumnos
-- x actúa como un registro con los tipos de la select
```

- Se usa `%rowtype`.

---

## 5. Secuencias (Lote 6)

- Nunca van hacia atrás, siempre hacia delante.

```sql
create sequence nombre
increment by n
start with n
maxvalue n ;
```

Consultar valores:

```sql
select nombre.nextval/currval from dual;
```

(`nextval` = siguiente valor, `currval` = valor actual.)

---

## 6. Triggers (Lote 3)

### Trigger para `UPDATE`

Estructura anotada:

```sql
CREATE OR REPLACE TRIGGER nombre
BEFORE UPDATE OF campo
ON tabla
FOR EACH ROW
BEGIN

END;
```

El campo que acompaña a `UPDATE OF` no se distingue con seguridad.

---

## 7. Consultas y funciones (Lote 3)

### Consultar las tablas del usuario HR

```sql
SELECT *
FROM all_objects
WHERE object_type = 'TABLE'
  AND owner = 'HR';
```

### `ROWNUM` (11/02/2025)

Consulta anotada:

```sql
SELECT *
FROM nombre_tabla
WHERE ROWNUM ...;
```

Aparecen operadores de comparación `>`, `>=`, `<` y `<=`, relacionados con números. La condición
concreta es ilegible.

### `TRUNC`

```sql
TRUNC(x, -1)
```

En el apunte se indica que trunca el valor a las decenas.

Ejemplo:

```text
47 → 40
```

### Sinónimos y funciones

**Sinónimos = alias.**

Esqueleto de función:

```sql
CREATE OR REPLACE FUNCTION nombre (v tipo)
RETURN tipo
IS
    -- Declaraciones de variables
BEGIN

    RETURN v;

END nombre;
```

La línea `RETURN v` es orientativa; el apunte presenta el esquema general.

### 04/02/2025: `MOD` y `%ROWCOUNT`

```sql
MOD()
```

En la hoja aparece relacionado con `%`.

```sql
%ROWCOUNT
```

Número de filas procesadas por el cursor.

---

## 8. Cursores (27/01/2025, Lote 3)

En la página se citan los esquemas o usuarios `HR`, `USERS`, `TEMP` y `ORACLE_HOME`
**[parte del texto es dudosa]**.

Pasos para trabajar con un cursor:

1. Declarar el cursor.
2. Abrir el cursor.
3. Procesar el cursor.
4. Cerrar el cursor.

Estructura aproximada:

```sql
CURSOR nombre IS
    SELECT ...
    FROM ...
    JOIN tabla USING (campo)
    GROUP BY campo;
```

Abrir:

```sql
OPEN cursor;
```

Obtener datos:

```sql
FETCH cursor INTO variables;
```

Las variables deben tener el tipo correspondiente a los datos recibidos; se menciona `%TYPE`.

Procesar:

```sql
LOOP
    ...
    EXIT WHEN ...;
END LOOP;
```

Cerrar:

```sql
CLOSE cursor;
```

Atributos de cursores:

- `%ISOPEN`: indica si el cursor está abierto.
- `%NOTFOUND`: verdadero cuando no se encuentran más filas.
- `%FOUND`: verdadero cuando se ha encontrado una fila.
- `%ROWCOUNT`: contador de filas procesadas.

---

## 9. Tipos y procedimientos (28/01/2025, Lote 3)

Para ver la estructura de una tabla:

```sql
DESC nombre_base_de_datos.tabla;
```

Tipo de una variable según una columna:

```sql
nombre_variable tabla.campo%TYPE;
```

Lanzar un procedimiento:

```sql
EXEC nombre(parametros);
```

---

## 10. Administración de instancia (28/10/2024 a 29/10/2024, Lote 6)

- En terminal: `export CV_ASSUME_DIS`
- Para la práctica de Debian y Rocky → `OEL7.8`
- Ruta: `$ORACLE_HOME/dbs` (se deben encontrar los ficheros `spfile.ora` y el `init.ora`)

**Tipos de parada:**

- `Normal`: espera a que termine la sesión.
- `Immediate`: termina todas las transacciones y cierra.
- `Transactional`: espera que terminen las transacciones y cierra.
- `Abort`: cierra todo.

**Parámetros de sesión/sistema:**

- `Alter system` → cambios permanentes.
- `Alter session` → cambios en la sesión.
- `Nombre_usu` → siempre mayúscula.
- `contraseña_user` → key sensitive.
- `alter session set "_ORACLE_SCRIPT"=TRUE`
- Comandos de visualización: `show parameter` o `select * from v$parameter`
- Diferencia: `v$PARAMETER` (valores en tiempo real) ≠ `v$SPPARAMETER` (valores base).

---

## 11. Vistas del diccionario (Lote 6)

- `DBA_`: todos los objetos del sistema.
- `ALL_`: objetos a los que tengo acceso.
- `USER_`: mis objetos.
- `V$`: vistas dinámicas.
- `GV$`: vistas globales.

---

## Dudas de lectura

- Campo tras `UPDATE OF` en el trigger (no se distingue).
- Condición de `ROWNUM` (ilegible).
- Esquemas o usuarios `HR`, `USERS`, `TEMP` y `ORACLE_HOME` (parte dudosa).
- «Función: programa que devuelve un valor. En el apunte aparece “siempre”.»
- `DEFAULT` con una advertencia (contexto insuficiente).

## Notas técnicas

- **Posible corrección técnica (B5):** el apunte escribe `LSNRCTL`; el ejecutable de Oracle es
  `lsnrctl` (minúsculas).
- **Posible corrección técnica (B6):** `for x in select dni, nombre from alumnos` no es sintaxis
  PL/SQL válida por sí sola; lo habitual es `FOR x IN (SELECT ...) LOOP ... END LOOP;`.
- **Posible corrección técnica (B7):** `export CV_ASSUME_DIS` parece incompleto; probablemente sea
  `export CV_ASSUME_DISTID=OEL7.8` o similar. Se conserva la lectura literal.
- El apunte indica «Siempre poner IS, no AS» al declarar subprogramas PL/SQL.

## Referencias cruzadas

- Usuarios, roles, perfiles y privilegios: `BBDD/04_Usuarios_roles_y_privilegios.md`.
- Tablespaces y almacenamiento (incluye la creación de tablespaces del 19/12/2024): `BBDD/05_Tablespaces_y_almacenamiento.md`.
- Fundamentos de SGBD y diccionario de datos: `BBDD/01_Fundamentos_SGBD.md`.
