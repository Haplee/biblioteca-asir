---
title: "Programación / Python · Sintaxis y funciones"
kind: "apunte"
subject: "Programación"
order: 1
summary: "print y salto de línea, definición de funciones con parámetros y cadenas formateadas (f-strings)."
topics:
  - "Python"
  - "Funciones"
  - "print"
  - "f-strings"
source_batches:
  - 2
dates:
  - "2025-01-23"
  - "2025-01-29"
status: "organizado"
---

**Asignatura:** Programación / Python.
**Temas:** `print`, salto de línea, definición de funciones con parámetros y cadenas formateadas
(f-strings).

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 23/01/2025 y 29/01/2025 | Sintaxis básica y funciones (Lote 2) |

## Lotes de origen

- **Lote 2**

---

## Programación Python (23/01/2025 y 29/01/2025)

- **Salto de línea:**

  ```python
  print('\n', end='')
  ```

- **Función:**

  ```python
  def nombre(0..n parametros):
      return v_fin
  ```

- **Meter variables en print:**

  ```python
  print(f'cadenas y {variables}')
  ```

---

## Dudas de lectura

- El contenido proviene del texto facilitado por el usuario; conviene revisarlo si se requiere
  literalidad.
- La notación `def nombre(0..n parametros)` es una forma de indicar «de 0 a n parámetros», no
  sintaxis literal de Python.

## Notas técnicas

- **Aclaración:** `print('\n', end='')` imprime un salto de línea sin añadir el salto adicional que
  `print` agrega por defecto. Se reproduce tal cual.
- **Aclaración:** las f-strings (`f'...'`) permiten interpolar variables dentro de la cadena.

## Referencias cruzadas

- Django como framework de Python: `IAW/05_Django_y_despliegue.md`.
- Scripts de Bash (otro lenguaje de scripting de la misma familia de apuntes):
  `ASO/02_Linux_Bash.md`.
