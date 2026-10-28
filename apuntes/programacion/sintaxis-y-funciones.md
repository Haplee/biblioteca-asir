---
title: "Programaci�n / Python �� Sintaxis y funciones"
kind: "apunte"
subject: "Programaci�n"
order: 1
summary: "print y salto de l�nea, definici�n de funciones con par�metros y cadenas formateadas (f-strings)."
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

**Asignatura:** Programaci�n / Python.
**Temas:** `print`, salto de l�nea, definici�n de funciones con par�metros y cadenas formateadas
(f-strings).

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 23/01/2025 y 29/01/2025 | Sintaxis b�sica y funciones (Lote 2) |

## Lotes de origen

- **Lote 2**

---

## 1. Salto de l�nea

```python
print('\n', end='')
```

**Aclaraci�n:** `print('\n', end='')` imprime un salto de l�nea sin a�adir el salto adicional que
`print` agrega por defecto. Se reproduce tal cual.

## 2. Funci�n

```python
def nombre(0..n parametros):
    return v_fin
```

**Aclaraci�n:** la notaci�n `def nombre(0..n parametros)` es una forma de indicar ��de 0 a n par�metros��,
no sintaxis literal de Python.

## 3. Meter variables en print

```python
print(f'cadenas y {variables}')
```

## 4. F-strings

Las f-strings (`f'...'`) permiten interpolar variables dentro de la cadena.

## 5. Ejemplos de los scripts de la consigna

### Ejemplo 1: Contar vocales

```python
v_vocales = ['a', 'e', 'i', 'o', 'u']
v_palabra = input('Introduce la palabra: ')
v_cont = 0

for i in v_palabra:
    if i in v_vocales:
       v_cont = v_cont + 1
       
print('La palabra ', v_palabra, ' tiene ', v_cont, ' vocales.')
```

### Ejemplo 2: Cambio de moneda

```python
# Variables de entrada
moneda = [500, 200, 100, 50, 20, 10, 5, 2, 1]
importe = int(input('Introduce el importe: '))
pago = int(input('Introduce la cantidad con la que se ha realizado el pago: '))
a_devolver = importe - pago

while importe > 0:
    print('dentro del bucle')
    if importe > pago:
        importe = importe - pago
```

### Ejemplo 3: Palabra palindr�mica

```python
def es_palindroma(palabra):
    return palabra == palabra[::-1]
```

## 6. Dudas de lectura

- El contenido proviene del texto facilitado por el usuario; conviene revisarlo si se requiere
  literalidad.
- La notaci�n `def nombre(0..n parametros)` es una forma de indicar ��de 0 a n par�metros��, no
  sintaxis literal de Python.

## 7. Notas t�cnicas

- **Aclaraci�n:** `print('\n', end='')` imprime un salto de l�nea sin a�adir el salto adicional que
  `print` agrega por defecto. Se reproduce tal cual.
- **Aclaraci�n:** las f-strings (`f'...'`) permiten interpolar variables dentro de la cadena.

## 8. Referencias cruzadas

- ASO/Linux y Bash: `ASO/02_Linux_Bash.md`.
- Django como framework de Python: `IAW/05_Django_y_despliegue.md`.