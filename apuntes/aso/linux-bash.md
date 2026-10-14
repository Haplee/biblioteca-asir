---
title: "ASO — Linux y Bash"
kind: "apunte"
subject: "ASO"
order: 2
summary: "Scripts de Bash: variables, funciones, bucles, redirecciones, permisos usados en scripts, empaquetado, procesos, monitorización, arrays, condicionales, filtros con awk, parámetros, case y ficheros temporales."
topics:
  - "Bash"
  - "Scripts"
  - "Variables"
  - "Funciones"
  - "Bucles"
  - "Redirecciones"
  - "Permisos"
  - "Procesos"
  - "Arrays"
  - "awk"
  - "case"
  - "Ficheros temporales"
source_batches:
  - 2
  - 3
  - 4
dates:
  - "2024-10-28"
  - "2024-10-31"
  - "2024-11-25"
  - "2024-11-28"
  - "2024-11-30"
  - "2024-12-05"
  - "2024-12-12"
  - "2024-12-16"
  - "2025-01-23"
  - "2025-02-03"
  - "2025-02-06"
  - "2025-02-10"
status: "organizado"
---

**Asignatura:** ASO — Administración de Sistemas Operativos.
**Temas:** scripts de Bash, variables, funciones, bucles, redirecciones, permisos usados en scripts,
empaquetado, procesos, monitorización, arrays, condicionales, filtros con `awk`, parámetros, `case`
y ficheros temporales.

## Fechas de los apuntes

| Fecha | Contenido | Lote |
|---|---|---|
| 28/10/2024 | Permisos y primer script con grupos | 2 |
| 31/10/2024 | Bucles en Bash | 2 |
| 25/11/2024 | Funciones y redirecciones | 2 |
| 28/11/2024 – 30/11/2024 | Monitorización y variables | 2 |
| 05/12/2024 | Operaciones `if` y permisos especiales | 2 |
| 12/12/2024 | Saltos y tabulaciones | 3 |
| 16/12/2024 | Parámetros | 3 |
| 23/01/2025 | Repaso de scripts de contraseñas y autorizaciones | 3 |
| 03/02/2025 | (Puerto RDP, tratado en `01_Windows_PowerShell.md`) | 3 |
| 06/02/2025 | Parámetros y `case` | 3 |
| 10/02/2025 | Ficheros temporales | 4 |

## Lotes de origen

- **Lote 2**
- **Lote 3**
- **Lote 4**


---

## 1. Permisos y primer script (28/10/2024)

- Permisos E y L → `666`
- Permisos E, X y L → `777`
- *Una solución al primer script con los grupos (departamentos) y usuarios; una solución es darle
  permisos a los grupos en lugar que a los usuarios.*

---

## 2. Script de ejemplo (variables y funciones)

```bash
#!/bin/bash
# Def variables
EMPRESA="Nombre"$(date +%Y.%m.%d)
DIR="/educate/$EMPRESA"

# Def Funciones
F_conv_nomb () {
  # Función de buscar, renombrar y escribir 3 nombres.
}

# P.P.
Fconv_nomb
```

### Comandos de usuario en Bash

- `mkdir`
- `useradd -m -d $Dir -s /bin/bash "nombre"`
- **OJO:** `-g "grupo"` (Entrada y la salida del documento de usuarios)
- `chmod` (para el `mkdir`)

---

## 3. Bucles en Bash (31/10/2024)

```bash
while IFS= read -r line   # (espacio)
do
  i=`expr $i + 1`
done < ${variable}  # -> lee el fichero
```

---

## 4. Funciones y redirecciones en Bash (25/11/2024)

- En bash las funciones: `nombre function ; function nombre` se lo traga.
- Para ejecutar: `/sh nombre function .`
- `2>>` → salida de errores.
- `1&2 > /dev/null` → entrada y salida (1. para que no se escriba en terminal. 2. para la salida de
  errores).

---

## 5. Empaquetado y procesos

- `tar -cvf / xvf / czvf` → copias de seguridad
- `gzip`
- `ps -ef | tail -n +2` → Quitar la 1ª línea

---

## 6. Monitorización y variables (28/11/2024 al 30/11/2024)

- `sar` / `sysstat`
- `read -n "$letras"` → controla el número de caracteres
- `\0` (Enter)
- `$#` → parámetros (1-2)

---

## 7. Arrays en Bash

- `echo $?` → Devuelve error o 0
- `lista=(uno, dos, tres)` → Guardar cadena
- `lista[4]="cuatro"` → Guardar elemento en su posición
- `echo ${lista[*]}` → todos los elementos
- `echo ${#lista[*]}` → Nº elementos total
- `echo ${#lista[1]}` → Nº caracteres de X elemento

---

## 8. Condicionales `if` (05/12/2024)

```bash
if [ -f mm ] || [ ! -z mm ]
```

- `-z` es para saber si la variable está vacía. Existe el fichero y no está vacío.
- `IFS` → cada línea de un read (`while IFS= read -r line`)

---

## 9. Filtros con `awk`

Ejemplos incompletos de la hoja:

```bash
... | awk 'length($9) > 9 { print ... }'
```

```bash
cat /etc/group | awk 'NF > 2 { print ... }'
```

`NF` → número de campos.

---

## 10. Saltos y tabulaciones (12/12/2024)

```bash
echo -e "\n"
```

Nueva línea.

```bash
echo -e "\t"
```

Tabulación.

---

## 11. Parámetros (16/12/2024 y 06/02/2025)

Todos los parámetros:

```bash
$*
```

Cantidad de parámetros:

```bash
$#
```

Comprobar ficheros en tiempo real:

```bash
tail -f
```

---

## 12. `case` (06/02/2025)

Estructura anotada:

```bash
case $opcion in
    "-m")
        mkdir ...
        exit 0
        ;;
    "-m")
        ...
        exit 0
        ;;
    *)
        exit
        ;;
esac
```

Parece repetirse `"-m")`, pero puede tratarse de otra opción. *(Revisar: ver Dudas.)*

---

## 13. Ficheros temporales (10/02/2025)

- `head -1 fichero > fichero_temporal.txt`
- `grep mm fichero >> fichero_temporal.txt`
- `echo fichero_temporal.txt`
- `rm`
- **USAR ficheros temporales.**
- **Linux:** `du -s * | sort -n` (Buscar ficheros y ordenarlos por tamaño)

---

## 14. Repaso de scripts (23/01/2025)

- Repasar script de contraseñas y de autorizaciones en Bash.

---

## Dudas de lectura

- En el `case` del Lote 3 parece repetirse la opción `"-m")`; podría ser otra opción distinta.
- La sintaxis de funciones «`nombre function ; function nombre`» del Lote 2 no es clara.

## Notas técnicas

- **Posible corrección técnica (B1):** `1&2 > /dev/null` probablemente corresponde a
  `2>&1 > /dev/null` o a `&> /dev/null` (redirigir salida estándar y de error).
- **Posible corrección técnica (B3):** la función se define como `F_conv_nomb` y se llama como
  `Fconv_nomb`; puede ser una errata del manuscrito.
- **Posible corrección técnica:** en `lista=(uno, dos, tres)` los elementos de un array de Bash se
  separan por espacios, no por comas; el apunte escribe comas. Se conserva literal.
- Contenido de los lotes 2 y 4 proveniente del texto del usuario; conviene revisarlo si se
  requiere literalidad.

## Referencias cruzadas

- Permisos especiales (sticky bit, `Euid`/`Uid`) y usuarios/grupos: `ASO/04_Usuarios_permisos_y_politicas.md`.
- Listado por tamaño en Windows (`Get-ChildItem`): `ASO/01_Windows_PowerShell.md`.
- `ufw`, `iptables` y servicios de red: `ASO/03_Red_y_servicios.md`.
