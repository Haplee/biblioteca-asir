---
title: "ASO — Windows y PowerShell"
kind: "apunte"
subject: "ASO"
order: 1
summary: "PowerShell para consultar la configuración de red, los procesos y los servicios; apagado programado, Windows Server y dominio, RDP y listado de archivos por tamaño."
topics:
  - "PowerShell"
  - "Windows Server"
  - "Red"
  - "Procesos"
  - "Servicios"
  - "RDP"
source_batches:
  - 2
  - 3
  - 4
dates:
  - "2024-11-18"
  - "2025-01-13"
  - "2025-02-03"
  - "2025-02-10"
status: "organizado"
---

**Asignatura:** ASO — Administración de Sistemas Operativos.
**Temas:** PowerShell (red, procesos, servicios), apagado programado, Windows Server y dominio, RDP,
listado de archivos por tamaño en Windows.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 18/11/2024 | Windows Server y dominio (Lote 2) |
| 13/01/2025 | PowerShell: red, procesos y servicios (Lote 3) |
| 03/02/2025 | Puerto RDP (Lote 3) |
| 10/02/2025 | Listado de archivos por tamaño en Windows (Lote 4) |

## Lotes e imágenes de origen

- **Lote 2** — carpeta `lote-2/` (10 imágenes). Transcrito originariamente desde el texto facilitado por el usuario; existen fotografías sin contrastar.
- **Lote 3** — carpeta `lote-3/` (10 imágenes), transcrito de fotografías.
- **Lote 4** — carpeta `lote-4/` (10 imágenes). Transcrito originariamente desde el texto facilitado por el usuario; existen fotografías sin contrastar.

Los nombres de archivo completos de cada lote están en `00_Indice_y_control/inventario_de_lotes.md`.

---

## 1. PowerShell — Configuración de red (13/01/2025)

Consultar las características que podemos consultar y activar:

```powershell
Get-NetIPConfiguration
```

Alias anotado: `gip`.

Características y configuración de cada adaptador.

Para comprobar si la configuración es dinámica o estática:

```powershell
Get-NetIPAddress
```

Propiedades anotadas:

- `PrefixOrigin`
- `SuffixOrigin`

Para que no se solicite confirmación:

```powershell
-Confirm $false
```

---

## 2. Procesos y servicios (13/01/2025)

Para consultar procesos aparece una referencia a:

```powershell
Get-Process -Name (nombre)
```

También hay una anotación para conocer cuánto ocupa, con una posible conversión usando `1MB`.
*(La expresión completa es dudosa: ver Dudas de lectura.)*

Propiedades de servicios anotadas:

- `Path`
- `RequiredServices` *(lectura probable)*

Cancelar un apagado programado:

```cmd
shutdown /a
```

---

## 3. Windows Server y dominio (18/11/2024)

- ISO: **2022**.
- Nombre de empresa: «FVIOMAT 27Z sistemas».
- 5 sedes: Madrid Principal, controlador de dominio Barcelona.

---

## 4. Puerto RDP (03/02/2025)

Puerto RDP `3389` para la sesión gráfica al conectarse de forma remota.

---

## 5. Listado de archivos por tamaño en Windows (10/02/2025)

Como equivalente a `du -s * | sort -n` en Linux:

```powershell
Get-ChildItem -Recursive -Path C:\ | Sort-Object -Descending -Property length | Select-Object -First 5
```

---

## Dudas de lectura

- La expresión para conocer cuánto ocupa un proceso, con conversión mediante `1MB`, no se distingue
  por completo en el apunte.
- `RequiredServices` es una lectura probable.
- El listado de Windows (Lote 4) proviene del texto facilitado por el usuario; conviene contrastarlo
  con la imagen original.

## Notas técnicas

- **Posible corrección técnica (B4):** el apunte escribe `-Confirm $false`. En PowerShell el
  parámetro se pasa con dos puntos: `-Confirm:$false`.
- **Posible corrección técnica:** el nombre del parámetro del cmdlet `Get-ChildItem` es
  `-Recurse`, no `-Recursive` (aunque el apunte de Lote 4 escribe `-Recursive`). Se conserva
  literalmente lo anotado y se señala aparte.

## Referencias cruzadas

- La GPO y su aplicación a administradores se tratan en `ASO/04_Usuarios_permisos_y_politicas.md`.
- Los ficheros temporales y el listado en Linux (`du -s * | sort -n`) están en `ASO/02_Linux_Bash.md`.
- Los servicios de red vistos desde Linux (DHCP, SSH, Samba) están en `ASO/03_Red_y_servicios.md`.
