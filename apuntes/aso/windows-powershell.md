---
title: "ASO - Windows y PowerShell"
kind: "apunte"
subject: "ASO"
order: 1
summary: "PowerShell para consultar la configuraci-n de red, los procesos y los servicios; apagado programado, Windows Server y dominio, RDP y listado de archivos por tama-o."
topics:
  - "PowerShell"
  - "Windows Server"
  - "Red"
  - "Procesos"
  - "Servicios"
  - "RDP"
source_batches:
  - 3
dates:
  - "2024-11-18"
  - "2025-01-13"
status: "organizado"
---

**Asignatura:** ASO (Administraci-n de Sistemas Operativos).
**Temas:** PowerShell (red, procesos, servicios), apagado programado, Windows Server y dominio, RDP,
listado de archivos por tama-o en Windows.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 18/11/2024 | Windows Server y dominio (Lote 2) |
| 13/01/2025 | PowerShell: red, procesos y servicios (Lote 3) |
| (por definir) | Listado de archivos por tama-o en Windows |

## Lotes de origen

- **Lote 2**
- **Lote 3**

## 1. PowerShell: Configuraci-n de red

Consultar las caracter-sticas que podemos consultar y activar:

```powershell
Get-NetIPConfiguration
```

Alias anotado: `gip`.

Caracter-sticas y configuraci-n de cada adaptador.

Para comprobar si la configuraci-n es din-mica o est-tica:

```powershell
Get-NetIPAddress
```

Propiedades anotadas:

- `PrefixOrigin`
- `SuffixOrigin`

Para que no se solicite confirmaci-n:

```powershell
-Confirm $false
```

## 2. Procesos y servicios

Consultar procesos activos y su estado:

```powershell
Get-Process
```

Alias anotado: `gpr`.

Para filtrar por nombre:

```powershell
Get-Process -Name powershell
```

Ver detalle de un proceso:

```powershell
Get-Process -Id <PID> | Format-Table -AutoSize
```

Gestionar servicios:

```powershell
Get-Service
```

Alias anotado: `gs`.

Para iniciar/Detener un servicio:

```powershell
Start-Service -Name <nombre>
Stop-Service -Name <nombre>
```

Reiniciar servicio:

```powershell
Restart-Service -Name <nombre>
```

## 3. Apagado programado y RDP

Apagado programado en Windows:

```cmd
shutdown /s /t <minutos>
```

Consultar el tiempo restante hasta el apagado:

```cmd
shutdown /a
```

Configurar conexi-n RDP:

- Permitir el acceso remoto en las propiedades del sistema.
- Configurar el firewall para el puerto 3389.
- Usar `mstsc` para conectarse a la m-quina remota.

Listado de archivos por tama-o en Windows:

```powershell
Get-ChildItem -Recurse | Sort-Object Length -Descending | Select-Object -First 20
```