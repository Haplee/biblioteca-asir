---
title: "BBDD — Fundamentos de un SGBD"
kind: "apunte"
subject: "BBDD"
order: 1
summary: "Big Data, dato e información, SOP/SOD, fichero/BD/SGBD, esquemas, componentes y funcionamiento de un SGBD, estructuras operacionales, NoSQL, funciones del DBA y elección de SGBD."
topics:
  - "Big Data"
  - "SGBD"
  - "Modelos de datos"
  - "NoSQL"
  - "DBA"
source_batches:
  - 7
dates:
  []
status: "organizado"
---

**Asignatura:** BBDD — Bases de Datos.
**Temas:** Big Data, dato e información, SOP/SOD, fichero/BD/SGBD, esquemas, funciones y componentes
de un SGBD, estructura multicapa, funcionamiento, estructuras operacionales, tipos de SGBD, problemas
del modelo relacional, sistemas NoSQL, funciones del DBA y elección de un SGBD.

## Fechas de los apuntes

- Sin fecha explícita en la hoja (tema teórico del Lote 7).

## Lotes de origen

- **Lote 7**

---

## 1. Big Data, dato e información

- **Big Data:** conjunto de información de diversas fuentes que no están relacionadas unas entre otras.
- **Dato:** un valor en crudo.
- **Información:** información que completa la descripción de un dato.

---

## 2. Sistemas orientados a los procesos (SOP)

Los SOP leen los datos de un fichero, pero no se conoce la estructura de ese fichero. Esto puede
provocar errores si el código no se define correctamente.

Ventaja indicada: los procesos de las aplicaciones son independientes de los datos; si uno cambia, no
afecta al resto.

**Inconvenientes:**

- Datos redundantes.
- Datos inconsistentes.
- Coste de almacenamiento elevado por duplicación de datos.
- Difícil acceso a datos para consultas no previstas, porque hay que editar el código de la aplicación.
- Dependencia física: se debe conocer cómo se almacenan los datos.
- Tiempo de proceso elevado.
- Dificultad para acceso simultáneo: dos usuarios no pueden acceder a los mismos datos a la vez.

---

## 3. Sistemas orientados a los datos (SOD)

Permiten leer y editar datos sin conocer la estructura de los ficheros, ya que los datos se almacenan
en una estructura lógica.

**Ventajas:**

- Independencia de los datos y programas respecto a los procesos.
- Menor redundancia.
- Integridad de los datos.
- Mayor seguridad al limitar el acceso de los usuarios.
- Datos más documentados mediante metadatos.
- Acceso más eficiente.
- Menor espacio de almacenamiento.
- Acceso simultáneo a los datos.

**Desventajas:**

- Instalación costosa.
- Requiere personal cualificado.
- Implantación larga y difícil.
- Ausencia de estándares reales.

---

## 4. Fichero, base de datos y SGBD

- **Fichero o archivo:** conjunto de información relacionada, tratada y organizada de forma
  estructurada. Están formados por registros lógicos y físicos.
  **[La definición manuscrita de registro lógico/físico es confusa y necesita revisión]**
- **Base de datos:** conjunto estructurado de datos que representan entidades y sus interrelaciones.
- **SGBD:** software que permite procesar, describir, administrar y recuperar datos en una base de
  datos. Debe mantener su seguridad e integridad.

Funciones/herramientas relacionadas:

- Creación y especificación de los datos.
- Administración y creación de la estructura física.
- Manipulación de los datos.
- Recuperación.

---

## 5. Sistema de información: puntos de vista

- **Vista externa:** la tienen los usuarios del sistema.
- **Vista física:** forma en la que se almacenan los datos.

---

## 6. Esquemas

- **Esquema interno:** representa cómo se almacenan los datos; esta visión solo la posee el administrador.
- **Esquema conceptual:** esquema teórico de los datos del mundo real; primer paso para crear una
  base de datos.
- **Esquema externo:** visión de los usuarios del sistema, obtenida a través de las aplicaciones.

---

## 7. Funciones de un SGBD

- **Descripción:** permite crear las estructuras necesarias para introducir los datos. Se realiza
  mediante DDL.
- **Manipulación:** permite modificar y usar los datos. Se realiza mediante DML; las consultas se
  relacionan con DQL.
- **Control:** proporciona mecanismos para proteger los datos. Se realiza mediante DCL.

---

## 8. Componentes de un SGBD

- **Procesador de consultas:** transforma sentencias SQL en instrucciones de bajo nivel.
- **Gestor de la base de datos:** recibe peticiones de usuarios, las procesa y realiza los
  procedimientos necesarios.
- **Gestor de ficheros:** gestiona el acceso físico a los ficheros en disco y se comunica con el
  sistema operativo.
- **Interfaces externas:** permiten la conexión de usuarios y aplicaciones. Ejemplos: ODBC y JDBC.
- **Preprocesador del lenguaje de manipulación de datos:** traduce instrucciones descritas en otros
  lenguajes a uno legible para el SGBD.
- **Compilador del lenguaje de definición de datos:** convierte sentencias DDL en un conjunto de
  tablas con metadatos.

---

## 9. Estructura multicapa

- **Facilidades de usuario:** herramientas para facilitar el acceso a los datos.
- **Capa de acceso a datos:** comunica las aplicaciones de los usuarios con el diccionario de datos.
- **Diccionario de datos:** contiene metadatos y traduce las instrucciones para que el esquema
  interno pueda entenderlas.
- **Núcleo:** traduce las instrucciones para que el sistema operativo pueda interpretarlas y acceder
  a los datos.
- **Sistema operativo:** es el único capaz de acceder físicamente a los datos.

---

## 10. Funcionamiento de un SGBD

1. El proceso es lanzado por el SGBD.
2. El SGBD traduce las instrucciones y comprueba permisos.
3. Obtiene el esquema físico.
4. Traduce los métodos de acceso para que el sistema operativo obtenga los datos del disco.
5. El sistema operativo accede a los datos.
6. Los datos se transfieren al *buffer* y se almacenan ahí.
7. Los datos pasan del *buffer* al usuario final.
8. Si hay un error, el SGBD lo comunica al usuario.

---

## 11. Estructuras operacionales

- **Cliente-servidor:** la base de datos se aloja en un servidor y el cliente se conecta mediante
  aplicaciones que envían instrucciones.
- **Cliente-multiservidor:** los datos no se encuentran en un único servidor. Un servidor de
  aplicaciones traduce las instrucciones y las envía a los distintos servidores.
- **Cliente-servidor con facilidades de usuario:** los clientes se conectan a un intermediario que
  facilita la comunicación con el servidor.

---

## 12. Tipos de SGBD

**Modelos conceptuales:**

- Entidad-relación.
- RM/T.
- Semánticos.

**Modelos lógicos:**

- **Relacional:** almacena los datos en tablas compuestas por filas y columnas/campos.
- **CODASYL.**
- **Jerárquico:** organiza los datos en árbol, con un padre y uno o varios hijos; está en desuso.

**Modelo orientado a objetos:** diseña estructuras con atributos en los que se definen procedimientos.

**Modelo objeto-relacional:** híbrido entre el modelo relacional y el orientado a objetos.

---

## 13. Problemas del modelo relacional

- **Poca flexibilidad de representación:** el apunte indica que los elementos de una tabla deben
  tener el mismo número de filas y columnas.
  **[La explicación podría estar formulada de manera imprecisa en el original]**
- **Poca escalabilidad:** se anota un límite finito de crecimiento de la base de datos.

---

## 14. Sistemas NoSQL

**NoSQL (Not Only SQL).**

- Distribución de los datos.
- Manejan datos no estructurados o sin estructura fija.
- Evitan operaciones almacenando datos desnormalizados.
- Se basan en el teorema de consistencia, disponibilidad y tolerancia a fallos.

Ejemplos anotados: MongoDB, Redis, Amazon DynamoDB y Microsoft Azure.

---

## 15. Funciones de un DBA

- Crear y administrar los esquemas de la base de datos.
- Administrar la seguridad.
- Realizar copias de seguridad periódicas.
- Controlar el espacio de los discos.
- Vigilar la integridad de los datos.
- Observar la evolución y el rendimiento del sistema.
- Asesorar a programadores y usuarios.
- Cambiar el diseño físico para mejorar el rendimiento.
- Resolver emergencias.

---

## 16. Elección de un SGBD

- **Usabilidad:** facilidad de uso del SGBD.
- **Seguridad:** evitar que los datos almacenados se vean comprometidos.
- **Funcionalidad:** los módulos deben cumplir los requisitos empresariales.
- **Integración:** compatibilidad con otros sistemas, tanto en la actualidad como en el futuro.
- **Escalabilidad:** capacidad para crecer con los datos y la empresa.

---

## Dudas de lectura

- Definición de «registro lógico/físico» (confusa en el manuscrito).
- «Los elementos de una tabla deben tener el mismo número de filas y columnas» (formulación
  posiblemente imprecisa).

## Notas técnicas

- **Aclaración:** en el modelo relacional, una tabla tiene un número fijo de **columnas** pero un
  número variable de **filas**; la frase del apunte probablemente se refiere a que todas las filas
  comparten las mismas columnas. Se conserva el texto original y se añade esta nota.
- Se mencionan ODBC y JDBC como interfaces externas de conexión.

## Referencias cruzadas

- Transacciones y propiedades ACID: `BBDD/06_Transacciones_ACID.md`.
- Arquitectura y red de Oracle (`listener.ora`, `tnsnames.ora`): `BBDD/03_Oracle_y_PL-SQL.md`.
- Almacenamiento y tablespaces: `BBDD/05_Tablespaces_y_almacenamiento.md`.
