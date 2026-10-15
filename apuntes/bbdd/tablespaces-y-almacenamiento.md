---
title: "BBDD · Tablespaces y almacenamiento"
kind: "apunte"
subject: "BBDD"
order: 5
summary: "Jerarquía de almacenamiento (bloque, extensión, segmento), tablespaces, tipos internos, vistas de almacenamiento, creación, movimiento, redimensionado y crecimiento automático de datafiles."
topics:
  - "Oracle"
  - "Tablespaces"
  - "Almacenamiento"
  - "Datafiles"
  - "DBA_FREE_SPACE"
source_batches:
  - 4
  - 5
dates:
  - "2024-11-18"
  - "2024-11-21"
  - "2024-11-25"
  - "2024-12-02"
  - "2024-12-03"
  - "2024-12-19"
  - "2025-01-14"
status: "organizado"
---

**Asignatura:** BBDD (Bases de Datos).
**Temas:** jerarquía de almacenamiento (bloque, extensión, segmento), tablespaces, tipos de
tablespaces internos, vistas de almacenamiento, creación, movimiento, redimensionado y crecimiento
automático de datafiles.

## Fechas de los apuntes

| Fecha | Contenido | Lote |
|---|---|---|
| 18/11/2024 | Conceptos de almacenamiento (bloque, extensión, segmento, tablespace) | 4 |
| 19/12/2024 | Creación de tablespaces | 4 |
| 21/11/2024 | Objetos de la base de datos y tamaños | 5 |
| 25/11/2024 | Tablespaces y almacenamiento | 5 |
| 02/12/2024 | Tablas y espacio | 5 |
| 03/12/2024 | `DBA_FREE_SPACE` | 5 |
| 14/01/2025 | Operaciones sobre tablespaces | 5 |

## Lotes de origen

- **Lote 4**
- **Lote 5**


---

## 1. Conceptos de almacenamiento (18/11/2024, Lote 4)

- **Jerarquía:** la unidad más pequeña es el **bloque**. Si están continuos en memoria son
  **extensiones**, y estas forman **segmentos**.
- **Tablespace:** concepto lógico, agrupación de ficheros, y pueden estar en varios discos. Una tabla
  se encuentra en un tablespace pero puede estar en varios ficheros que están dentro del tablespace.
- **Bloque:** consta de cabecera, libre y datos. Oracle pregunta a la cabecera y se busca el bloque
  completo.

**Vistas de almacenamiento:**

- `DBA_TABLESPACES`
- `DBA_DATA_FILES`
- `DBA_TEMP_FILES`
- `DBA_FREE_SPACE`
- `V$DATAFILE`
- `V$TEMPFILE`

**Tipos de tablespaces internos:**

1. `system`: no tocar; tablas internas.
2. `sysaux`: no tocar; ayuda al anterior.
3. `undotbs`: no tocar; tema de recovery.
4. `temp`: no tocar; almacena agrupaciones, etc.
5. `user`: lo creamos nosotros.

---

## 2. Creación de tablespaces (19/12/2024, Lote 4)

```sql
Alter session set "_oracle_script"=true;
Grant dba to "usuario";
```

Conectarse como usuario creado:

```text
sqlplus FRANVI/FRANVI1
```

- Mirar la IP en `/etc/hosts`.
- Sintaxis:

```sql
Create tablespace "nomb" datafile "ruta" size "tamaño"
```

---

## 3. Objetos de la base de datos (21/11/2024, Lote 5)

Se anota que los objetos son elementos dentro de la base de datos.

Aparece una referencia a los tamaños:

- `64K`
- `1M`
- `8M`
- `64M`

También aparece `Uniform size 1M`, asociado a valores o extensiones definidos para el usuario.
**[Texto dudoso]**

---

## 4. Tablespaces y almacenamiento (25/11/2024, Lote 5)

El tablespace se relaciona con la gestión y almacenamiento de datos. En un esquema se distinguen los
tipos `local` y `dictionary`. **[Lectura probable; confirmar]**

---

## 5. Tablas y espacio (02/12/2024, Lote 5)

Anotaciones sobre crear una tabla en un espacio (tablespace), indicar nombre y ubicación, y el
crecimiento del almacenamiento. Parte del texto no se distingue.

---

## 6. `DBA_FREE_SPACE` (03/12/2024, Lote 5)

Se destaca el término:

```text
DBA_FREE_SPACE
```

La nota indica que muestra información sobre el espacio libre de una tabla o tablespace.
**[Interpretación del apunte; validar el contexto original]**

---

## 7. Operaciones sobre tablespaces (14/01/2025, Lote 5)

Crear un tablespace:

```sql
CREATE TABLESPACE nombre
DATAFILE '/ruta'
SIZE n;
```

Cambiar a solo lectura:

```sql
ALTER TABLESPACE nombre READ ONLY;
```

Cambiar a lectura y escritura:

```sql
ALTER TABLESPACE nombre READ WRITE;
```

Crecimiento automático del archivo de datos:

```sql
ALTER DATABASE DATAFILE '/ruta'
AUTOEXTEND ON
NEXT 256K
MAXSIZE 2M;
```

Mover un tablespace:

1. Ponerlo fuera de línea:

   ```sql
   ALTER TABLESPACE nombre OFFLINE;
   ```

2. Mover el archivo:

   ```bash
   mv /ruta1 /ruta2/
   ```

3. Actualizar la ruta registrada:

   ```sql
   ALTER TABLESPACE nombre
   RENAME DATAFILE '/ruta1'
   TO '/ruta2';
   ```

4. Ponerlo en línea:

   ```sql
   ALTER TABLESPACE nombre ONLINE;
   ```

Cambiar tamaño:

```sql
ALTER DATABASE DATAFILE '/ruta'
RESIZE n;
```

Añadir un archivo:

```sql
ALTER TABLESPACE nombre
ADD DATAFILE '/ruta'
SIZE n;
```

---

## Dudas de lectura

- `Uniform size 1M` (texto dudoso).
- Tipo de tablespace `local` / `dictionary` (lectura probable).
- Interpretación de `DBA_FREE_SPACE`.
- Parte del bloque «Tablas y espacio» (02/12/2024) no se distingue.
- Los bloques del Lote 4 provienen del texto del usuario; conviene revisarlos.

## Notas técnicas

- El `AUTOEXTEND` con `NEXT 256K` y `MAXSIZE 2M` refleja los valores concretos del apunte.
- La creación de tablespaces del 19/12/2024 (Lote 4) usa `"_oracle_script"=true` y `Grant dba`
  porque se trabaja con un usuario recién creado.

## Referencias cruzadas

- Administración de instancia, diccionario y PL/SQL: `BBDD/03_Oracle_y_PL-SQL.md`.
- Usuarios, roles, perfiles y `quota` sobre tablespaces: `BBDD/04_Usuarios_roles_y_privilegios.md`.
- Fundamentos de SGBD y diccionario de datos: `BBDD/01_Fundamentos_SGBD.md`.
