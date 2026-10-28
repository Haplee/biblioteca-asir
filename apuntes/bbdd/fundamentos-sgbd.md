---
title: "BBDD �� Fundamentos de SGBD"
kind: "apunte"
subject: "BBDD"
order: 1
summary: "Arquitectura y componentes de un Sistema Gestor de Bases de Datos: esquemas multicapa, funciones de descripci�n, manipulaci�n y control, diccionario de datos y procesador de consultas."
topics:
  - "SGBD"
  - "Base de Datos"
  - "Esquema Conceptual"
  - "Esquema Interno"
  - "Diccionario de Datos"
  - "Procesador de Consultas"
  - "DDL, DML, DCL"
source_batches:
  - 1
dates:
  - "2024-09-17"
  - "2024-09-23"
status: "organizado"
---

**Asignatura:** BBDD (Bases de Datos).
**Temas:** arquitectura de SGBD, esquemas multicapa, funciones de descripci�n, manipulaci�n y control de datos,
diccionario de datos, procesador de consultas y optimizaci�n.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 17/09/2024 | Introducci�n: qu� es una BD, Big Data, datos vs informaci�n, sistemas orientados a procesos vs datos |
| 23/09/2024 | Interfaces, estructuras de ficheros, registros l�gicos y f�sicos, modelo externo/概念ual/interno |

## Lotes de origen

- **Lote 1**

---

## 1. Qu� es una Base de Datos?

Un conjunto de datos relacionados y estructurados que representan identidades y sus interrelaciones.

## 2. Qu� es un SGBD?

Software que permite a los usuarios procesar, describir, administrar y recuperar datos de una base de datos. Su �xito depende de mantener la seguridad e integridad de los datos.

## 3. Funciones de un SGBD

### Funcion de descripci�n
Permite la creaci�n de las estructuras adecuadas para introducir los datos; se realiza mediante el lenguaje de descripci�n de datos o DDL.

### Funcion de manipulacion
Permite modificar y usar los datos de la BD; se realiza mediante el lenguaje de manipulaci�n de datos o DML
(aquí entra tambi�n la funci�n de consulta con el DQL).

### Funcion de control
Los administradores poseen mecanismos para proteger los datos; se realiza mediante el lenguaje de control de datos o DCL.

## 4. Componentes de un SGBD

### Procesador de consultas
Transforma sentencias de SQL en instrucciones de bajo nivel.

### Gestor de la BD
Es el elemento principal que se encarga de recibir peticiones de los usuarios y procesarlas y realiza los procedimientos necesarios para completar esa petici�n.

### Gestor de ficheros
Se encarga de gestionar el acceso fisico a los ficheros que se encuentran en disco, no lo hace directamente, se comunica con el SO para que este acceda a ellos.

### Interfaces Externas
Permiten que los usuarios y apps se conecten al SGBD en los 2 sentidos; los m�s habituales ODBC y JDBC.

### Preprocesador del lenguaje de manipulaci�n de datos
Traduce instrucciones descritas en otros lenguajes a uno que sea legible para el SGBD.

### Compilador del lenguaje de definicion de datos
Convierte sentencias DDL en un conjunto de tablas que contienen metadatos.

## 5. Estructura Multicapa

### Facilidades de Usuario
Son herramientas que el SGBD proporciona a los usuarios para que tengan un f�cil acceso a los datos.

### Capa de acceso a datos
Permite comunicar las APPS de usuarios con el diccionario de datos (traductor).

### Diccionario de datos
Aquí se encuentran los metadatos; esta capa traduce las instrucciones de los usuarios a instrucciones que el esquema interno pueda entender.

### N�cleo
Se encarga de traducir las instrucciones para que el SO pueda interpretarlas y acceda a los datos.

### SO (Sistema Operativo)
 ��nico capaz de acceder a los datos de forma f�sica.

## 6. Funcionamiento de una petici�n SQL

1. El proceso es lanzado por el SGBD.
2. El SGBD traduce las intrucciones y comprueba si se tienen permisos para realizar la operaci�n.
3. El SGBD obtiene el esquema f�sico.
4. El SGBD traduce los m�todos de acceso para que el SO obtenga los datos del disco.
5. El SO accede a los datos.
6. Los datos se transfieren al buffer y se almacenan ah�.
7. Los datos pasan del buffer al usuario final.
8. En caso de error, el SGBD indicar� al usuario que ha hab� un error.

## 7. DDL, DML y DCL

### DDL (Data Definition Language)
- CREATE DATABASE
- CREATE TABLE
- ALTER TABLE
- DROP TABLE

### DML (Data Manipulation Language)
- SELECT * FROM tabla
- INSERT INTO tabla
- UPDATE tabla
- DELETE FROM tabla

### DCL (Data Control Language)
- GRANT permisos TO usuario
- REVOKE permisos FROM usuario