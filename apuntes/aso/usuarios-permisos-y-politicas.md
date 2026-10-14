---
title: "ASO — Usuarios, permisos y políticas"
kind: "apunte"
subject: "ASO"
order: 4
summary: "Usuarios y grupos, permisos especiales (sticky bit, Euid/Uid), políticas de grupo (GPO) y cuotas de disco."
topics:
  - "Usuarios"
  - "Grupos"
  - "Permisos"
  - "Sticky bit"
  - "GPO"
  - "Cuotas de disco"
source_batches:
  - 2
  - 3
  - 6
dates:
  - "2024-12-05"
  - "2025-01-23"
status: "organizado"
---

**Asignatura:** ASO — Administración de Sistemas Operativos.
**Temas:** usuarios y grupos, permisos especiales (sticky bit, `Euid`/`Uid`), políticas de grupo
(GPO) y cuotas de disco.

## Fechas de los apuntes

| Fecha | Contenido | Lote |
|---|---|---|
| (sin fecha) | Comandos de usuario (`useradd`), grupos | 2 |
| 05/12/2024 | Permisos especiales: sticky bit, `Euid`/`Uid` | 2 |
| 23/01/2025 | GPO no se aplican a los administradores | 3 |
| (sin fecha) | Cuotas de disco (servidor Linux) | 6 |

## Lotes e imágenes de origen

- **Lote 2** — `lote-2/` (texto del usuario; fotos sin contrastar).
- **Lote 3** — `lote-3/` (fotografías).
- **Lote 6** — `lote-6/` (texto del usuario; fotos sin contrastar).

Nombres de archivo completos en `00_Indice_y_control/inventario_de_lotes.md`.

---

## 1. Usuarios y grupos

Comandos anotados (contexto de scripts del Lote 2):

- `mkdir`
- `useradd -m -d $Dir -s /bin/bash "nombre"`
- **OJO:** `-g "grupo"` (Entrada y la salida del documento de usuarios)
- `chmod` (para el `mkdir`)

Creación de grupo y asignación (Lote 6, Samba):

```bash
groupadd sambashare
usermod -aG sambashare "usuario"
smbpasswd -a "usuario"
```

---

## 2. Permisos especiales (05/12/2024)

- **Sticky bit:** se aplica a los directorios (ficheros de log).
- `Euid` → usuario que realmente eres actualmente (puede ser root o cualquier otro si haces un `su...`).
- `Uid` → usuario que eres.

> Los permisos básicos `666` (E y L) y `777` (E, X y L) usados en los scripts del Lote 2 se
> documentan en `ASO/02_Linux_Bash.md`, en su contexto de ejercicio.

---

## 3. Políticas de grupo (GPO)

- Las GPO no se aplican a los administradores. *(Así está resumido en el apunte de 23/01/2025.)*

---

## 4. Cuotas de disco (Lote 6)

```bash
apt install quota
apt install quotatool
find /lib/modules/'uname -r' -type f -name '*quota_v.ko*'
cp /etc/fstab .20211201
nano /etc/fstab              # cambiar el default por "usrquota,grpquota"
mount -o remount /home
quotacheck -ugm /home
mkdir /home/aquota.user
mkdir /home/aquota.group
quotaon /home
edquota -u "usuario"
setquota -u "usuario" 200M 200M 0 0 /home
```

Comando de testeo:

```bash
dd if=/dev/zero of=/home/"usuario"/file bs=1M count=400
```

```bash
quotaoff -v /home
```

---

## Dudas de lectura

- No se han marcado lecturas dudosas específicas, salvo los comandos señalados en Notas técnicas.

## Notas técnicas

- **Posible corrección técnica (B9):** `find /lib/modules/'uname -r' ...` probablemente corresponde a
  `find /lib/modules/$(uname -r) -type f -name '*quota_v.ko*'` (sustitución de comando con `$(...)`).
- **Posible corrección técnica (B10):** lo habitual es crear los **ficheros** `aquota.user` y
  `aquota.group` (no directorios); el apunte usa `mkdir`. Se conserva literal.
- Contenido de los lotes 2 y 6 proveniente del texto del usuario; conviene contrastarlo con las
  fotografías si se requiere literalidad.

## Referencias cruzadas

- Scripts de Bash que usan usuarios, grupos y permisos: `ASO/02_Linux_Bash.md`.
- GPO y contexto de autorizaciones en Bash (23/01/2025): `ASO/02_Linux_Bash.md`.
- Cuotas dentro de la práctica de Samba: `ASO/03_Red_y_servicios.md`.
- Usuarios, esquemas, roles y perfiles de Oracle (otra asignatura): `BBDD/04_Usuarios_roles_y_privilegios.md`.
