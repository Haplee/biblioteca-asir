---
title: "ASO �� PowerShell Prácticas"
kind: "apunte"
subject: "ASO"
order: 3
summary: "Ejercicios prácticos de PowerShell: arrays, bucles, condicionales, lectura de archivos CSV, funciones y validación de IPs."
topics:
  - "PowerShell"
  - "Scripts"
  - "Arrays"
  - "Bucles"
  - "CSV"
  - "Funciones"
  - "Validación"
source_batches:
  - 3
dates:
  - "2024-11-01"
  - "2025-01-13"
status: "organizado"
---

**Asignatura:** ASO (Administración de Sistemas Operativos).
**Temas:** Scripts en PowerShell, estructuras de control, arrays, bucles, lectura de archivos CSV.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 01/11/2024 - 13/01/2025 | Ejercicios prácticos de PowerShell |

## Lotes de origen

- **Lote 3**

---

## Ejercicio 1: Uso básico de PowerShell

```powershell
# Ejercicio 1 - Actividades Propuestas
# Consultas básicas de sistema
```

## Ejercicio 2: Estructuras condicionales

```powershell
# Ejercicio 2
# Uso de if/else para validación
```

## Ejercicio 3: Bucles

```powershell
# Ejercicio 3
# Bucles for/while
```

## Ejercicio 4: Arrays y listas

```powershell
# Ejercicio 4
# Trabajo con arrays
```

## Ejercicio 5: Lectura de archivos CSV

```powershell
# Ejercicio 5
# Importación y procesamiento de archivos CSV
$usuarios = Import-Csv -Path "usuarios.csv"
$ips = Import-Csv -Path "ips.csv"
```

**Archivos utilizados:**
- `usuarios.csv`
- `ips.csv`

## Ejercicio 7: Funciones y validación

```powershell
# Ejercicio 7
# Creación de funciones para validación
function Comprobar-IP {
    param([string]$ip)
    # Validación de dirección IP
}
```

## Notas

Estos ejercicios provienen de las actividades propuestas realizadas en clase con PowerShell.
Los ficheros CSV utilizados se encuentran en el directorio de prácticas.