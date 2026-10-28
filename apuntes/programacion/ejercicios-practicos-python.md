---
title: "Programación / Python - Ejercicios prácticos"
kind: "apunte"
subject: "Programación"
order: 2
summary: "Colección de ejercicios prácticos de Python: bucles, listas, matrices, funciones, validación, números primos, palíndromos y conexión con MySQL."
topics:
  - "Python"
  - "Ejercicios"
  - "Bucles"
  - "Listas"
  - "Matrices"
  - "Funciones"
  - "MySQL"
  - "Condicionales"
source_batches:
  - 2
dates:
  - "2025-01-23"
  - "2025-01-29"
  - "2025-02-05"
status: "organizado"
---

**Asignatura:** Programación / Python.
**Temas:** Ejercicios prácticos del boletín 1, ejemplos de clase, ejercicios con listas, matrices, funciones y conexión a MySQL.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 23/01/2025 - 29/01/2025 | Sintaxis básica y primeros ejercicios |
| 05/02/2025 | Pruebas con MySQL |

## Lotes de origen

- **Lote 2**

---

## 1. Boletín 1 de ejercicios

### Ejercicio 1
Diseña un programa que solicite al usuario una frase y muestre por pantalla el número de letras que tiene.

### Ejercicio 2
Desarrolla un programa que almacene una clave en una variable y, a continuación, compruebe si la clave introducida por el usuario coincide con ella.

### Ejercicio 3
Crea un programa que le pida al usuario una palabra y, a continuación, muestre por pantalla las vocales que contiene.

### Ejercicio 4
Escribe un programa que pregunte al usuario por una frase y, a continuación, cuente el número de vocales y consonantes que contiene.

### Ejercicio 5
Crea un programa que solicite al usuario dos números y muestre por pantalla el resultado de la suma.

### Ejercicio 6
Realiza un programa que solicite al usuario un número y compruebe si es par o impar.

### Ejercicio 7
Desarrolla un programa que pida al usuario una temperatura en grados Celsius y la convierta a Fahrenheit.

### Ejercicio 8
Escribe un programa que solicite al usuario un número y muestre su tabla de multiplicar.

### Ejercicio 9
Crea un programa que genere una lista de números aleatorios y muestre los números pares.

### Ejercicio 10
Crea un programa que almacene varias matrices en una lista y las muestre por pantalla.

## 2. Ejercicios adicionales

### Devolver cambio
Calcula el cambio a devolver con el menor número de billetes y monedas posibles.

```python
moneda = [500, 200, 100, 50, 20, 10, 5, 2, 1]
importe = int(input('Introduce el importe: '))
pago = int(input('Introduce la cantidad con la que se ha realizado el pago: '))
```

### Números primos
Determina si un número es primo.

```python
def es_primo(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5)+1):
        if n % i == 0:
            return False
    return True
```

### Palabra palindrómica
Comprueba si una palabra es palíndroma.

```python
def es_palindroma(palabra):
    return palabra == palabra[::-1]
```

### Contar vocales
Cuenta las vocales de una palabra introducida por el usuario.

```python
v_vocales = ['a', 'e', 'i', 'o', 'u']
v_palabra = input('Introduce la palabra: ')
v_cont = 0
for i in v_palabra:
    if i in v_vocales:
       v_cont = v_cont + 1
print('La palabra ', v_palabra, ' tiene ', v_cont, ' vocales.')
```

## 3. Conexión con MySQL

### pruebas-mysql.py
Ejemplo de conexión a base de datos MySQL desde Python usando la librería correspondiente.

### pruebas-python.py
Pruebas generales de Python.

## 4. Ejemplos de clase

- `ejemplos-1.py` a `ejemplos-7.py`: Ejercicios progresivos trabajados en clase.

## Archivos relacionados

Todos los archivos se encuentran en `2024-2025/python-instituto/` y sus subcarpetas.