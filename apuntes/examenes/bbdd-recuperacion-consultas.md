---
title: "Exámenes · BBDD: recuperación de consultas"
kind: "apunte"
subject: "Exámenes"
order: 2
summary: "Diez consultas de recuperación sobre una base de datos de centro educativo resueltas con SELECT, JOIN implícito, GROUP BY, HAVING y funciones de agregado, con las trampas de cada enunciado."
topics:
  - "Bases de Datos"
  - "SQL"
  - "Consultas"
source_batches:
  []
dates:
  - "2023-06-01"
status: "organizado"
---

**Asignatura:** BBDD (Bases de Datos). **Prueba:** recuperación de consultas, junio de
2023. **Base de datos:** `centro`, con `Profesor`, `Asignatura`,
`AsignaturasGrupo`, `Alumno`, `AlumnoNota` y `Grupo`.

**Nota:** los nombres de profesores y la localidad que aparecían en el enunciado se
han sustituido por `Profesor A`, `Profesor B`, `Profesor C`, `Profesor D` y
`LOCALIDAD`. Las consultas conservan la estructura original.

---

## 1. Asignaturas que imparte un profesor concreto

> Relación de asignaturas que imparte el profesor indicado.

```sql
select distinct A.Denominacion
  from Profesor P, AsignaturasGrupo AG, Asignatura A
 where P.Codigo = AG.CodigoProfesor
   and AG.CodigoAsignatura = A.Codigo
   and lower(P.Nombre) like '%profesor a%';
```

## 2. Alumnos de una localidad que reciben clase de un profesor

> Relación de alumnos que son de `LOCALIDAD` y les da clase el profesor indicado.

```sql
select A.nombre
  from Alumno A, Grupo G, Profesor P
 where A.CodigoGrupo = G.Codigo
   and G.CodigoTutor = P.Codigo
   and A.Direccion like '%LOCALIDAD%'
   and P.Nombre like '%Profesor B%';
```

## 3. Alumnos que han aprobado una asignatura

> Relación de alumnos que han aprobado «CULTIVOS EN VIVEROS E INVERNADEROS».

```sql
select AL.nombre
  from Alumno AL, AlumnoNota AN, Asignatura A
 where AL.CodigoGrupo = AN.CodigoAlumno
   and AN.CodigoAsignatura = A.Codigo
   and A.Denominacion like 'CULTIVOS EN VIVEROS E INVERNADEROS';
```

## 4. Cuántas asignaturas imparten dos profesores

> Mostrar cuántas asignaturas imparten el profesor C y la profesora D.

```sql
select count(A.Codigo) as Num_Asig
  from Profesor P, AsignaturasGrupo AG, Asignatura A
 where P.Codigo = AG.CodigoProfesor
   and AG.CodigoAsignatura = A.Codigo
   and lower(P.Nombre) like '%profesor c%'
   and lower(P.Nombre) like '%profesor d%';
```

## 5. Nota media por alumno de un grupo

> Mostrar las notas medias de los alumnos del grupo 913NMB.

```sql
select AL.Nombre, round(avg(AN.nota))
  from Alumno AL, AlumnoNota AN, Grupo G
 where AL.CodigoGrupo = G.Codigo
   and AL.Codigo = AN.CodigoAlumno
   and G.Codigo like '913NMB'
 group by AL.Codigo;
```

## 6. Número de asignaturas por profesor

> Mostrar el número de asignaturas que imparte cada profesor del centro.

```sql
select distinct P.nombre, count(A.Codigo)
  from Profesor P, AsignaturasGrupo AG, Asignatura A
 where P.Codigo = AG.CodigoProfesor
   and AG.CodigoAsignatura = A.Codigo
 group by P.Codigo;
```

## 7. Alumnos de una localidad con media entre 2 y 6

> Obtener la relación de alumnos de `LOCALIDAD` cuya nota media esté entre 2 y 6.

```sql
select A.nombre
  from Alumno A, Grupo G, AlumnoNota AN
 where A.CodigoGrupo = G.Codigo
   and AN.CodigoAlumno = A.Codigo
   and A.Direccion like '%LOCALIDAD%'
 group by A.Nombre
having avg(nota) between 2 and 6;
```

## 8. Nota media por asignatura de un grupo

> Mostrar la relación de nota media por asignatura del grupo 913NMA.

```sql
select A.Codigo, avg(AN.Nota)
  from Alumno AL, AlumnoNota AN, Asignatura A, Grupo G
 where AN.CodigoAsignatura = A.Codigo
   and G.Codigo = AL.CodigoGrupo
   and AL.CodigoGrupo = AN.CodigoAlumno
   and G.Codigo like '913NMA'
 group by G.Codigo, A.Codigo;
```

## 9. Número de bajas por grupo

> Mostrar el número de bajas de cada grupo.

```sql
select Codigo, count(Codigo) as Bajas
  from Grupo
 where CodigoTutor is null
 group by Codigo;
```

## 10. Asignaturas que no se imparten en ningún grupo

> Mostrar los nombres de las asignaturas que no se imparten en ningún grupo.

```sql
select A.Denominacion
  from Asignatura A
 where A.Codigo not in (select CodigoAsignatura from AsignaturasGrupo);
```

---

## Trampas de los enunciados

Estas son las que hacen fallar la consulta aunque la sintaxis sea correcta.

**La 4 pide dos profesores a la vez.** Con `and` sobre la misma columna
(`P.Nombre like '%C%' and P.Nombre like '%D%'`) no devuelve nada: ningún registro
cumple las dos condiciones. La solución de verdad son dos recuentos unidos
(`union all`) o una condición `or` con `count(distinct ...)`.

**La 7 agrupa por nombre.** Dos alumnos con el mismo nombre se funden en una sola
fila. Lo correcto es agrupar por `A.Codigo`, que es la clave, y mostrar el nombre en
el `select`.

**La 8 pedía 913NMA.** En la resolución aparece `913NMB`, así que devuelve el grupo
equivocado. Además el enunciado pide la media (`avg`), no la suma (`sum`).

**La 9 cuenta filas, no bajas por grupo.** `count(Codigo)` con `group by Codigo`
cuenta una fila por grupo, es decir, devuelve 1 en cada uno. La intención del
enunciado es contar alumnos sin tutor, así que el agregado debería ir sobre la tabla
de alumnos, no sobre la de grupos.

**La 10 se resuelve mejor con `not in`.** La versión con producto cartesiano y
`is null` que se intentó en el examen no filtra bien: al unir tres tablas nunca
aparece un `null` en `CodigoAsignatura`, porque las filas que no existen no se unen.

## Qué se practica

- Producto cartesiano con `where` frente a `join` explícito.
- `group by` por clave frente a `group by` por texto.
- `having` para filtrar agregados.
- Subconsultas con `not in` para los casos de «no aparece en».
