---
title: "ASO �� Linux y Bash"
kind: "apunte"
subject: "ASO"
order: 2
summary: "Scripts de Bash: variables, funciones, bucles, redirecciones, permisos usados en scripts, empaquetado, procesos, monitorizaci��n, arrays, condicionales, filtros con awk, paramentros, case y ficheros temporales."
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
  - "2024-12-05"
  - "2024-12-12"
  - "2024-12-16"
  - "2025-01-23"
  - "2025-02-03"
  - "2025-02-06"
  - "2025-02-10"
status: "organizado"
---

**Asignatura:** ASO (Administraci��n de Sistemas Operativos).
**Temas:** scripts de Bash, variables, funciones, bucles, redirecciones, permisos usados en scripts,
empaquetado, procesos, monitorizaci��n, arrays, condicionales, filtros con `awk`, paramentros,
`case` y ficheros temporales.

## Fechas de los apuntes

| Fecha | Contenido | Lote |
|---|---|---|
| 28/10/2024 | Permisos y primer script con grupos | 2 |
| 31/10/2024 | Bucles en Bash | 2 |
| 25/11/2024 | Funciones y redirecciones | 2 |
| 28/11/2024 a 30/11/2024 | Monitorizaci��n y variables | 2 |
| 05/12/2024 | Operaciones `if` y permisos especiales | 2 |
| 12/12/2024 | Saltos y tabulaciones | 3 |
| 16/12/2024 | Paramentros | 3 |
| 23/01/2025 | Repaso de scripts de contrase��a y autorizaciones | 3 |
| 03/02/2025 | (Puerto RDP, tratado en `01_Windows_PowerShell.md`) | 3 |
| 06/02/2025 | Paramentros y `case` | 3 |
| 10/02/2025 | Ficheros temporales | 4 |

## Lotes de origen

- **Lote 2**
- **Lote 3**
- **Lote 4**

---

## 1. Permisos y primer script (28/10/2024)

- Permisos E y L ��' `666`
- Permisos E, X y L ��' `777`
- *Una soluci��n al primer script con los grupos (departamentos) y usuarios; una soluci��n es darle
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
  # Funci��n de buscar, renombrar y escribir 3 nombres.
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
- `2>>` ��' salida de errores.

---

## 5. Monitorizaci��n y variables (28/11/2024 a 30/11/2024)

- Uso de `top`, `ps`, `vmstat` para monitorizar el sistema.
- Variables de entorno com�nmente usadas.
- Registro de logs y rotaci��n.

---

## 6. Saltos y tabulaciones (12/12/2024)

- Caracteres de escape especiales en Bash.
- Uso de `\t` para tabulaci�n y `\n` para salto de l�nea.

---

## 7. Paramentros (16/12/2024)

- $1, $2, $n para acceder a par�metros del script.
- `shift` para desplazar par�metros.
- Validaci�n de n�mero de par�metros con `$#`.

---

## 8. Repaso de scripts de contrase��a y autorizaciones (23/01/2025)

- Scripts para gestionar autorizaciones por departamento.
- Uso de `sudo` y configuraci�n de ficheros de sudoers.

---

## 9. Paramentros y `case` (06/02/2025)

```bash
case "$1" in
  start)   echo "Iniciando servicio...";
    ;;
  stop)    echo "Deteniendo servicio...";
    ;;
  restart) echo "Reiniciando servicio...";
    ;;
  *)       echo "Opcion no v�lida";
    esac
```