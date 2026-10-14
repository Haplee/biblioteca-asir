---
title: "ASO — Red y servicios"
kind: "apunte"
subject: "ASO"
order: 3
summary: "Conceptos de red (VPN, switch, SLA, DMZ), LDAP, DHCP, SSH, cortafuegos con iptables, encriptación con GPG, servidor Samba y servidor de impresión CUPS."
topics:
  - "Redes"
  - "Redes y servicios"
  - "VPN"
  - "DMZ"
  - "LDAP"
  - "DHCP"
  - "SSH"
  - "iptables"
  - "Cortafuegos"
  - "Encriptación"
  - "GPG"
  - "Samba"
  - "CUPS"
source_batches:
  - 2
  - 4
  - 6
dates:
  - "2024-11-07"
  - "2024-11-15"
  - "2024-11-21"
  - "2025-02-10"
status: "organizado"
---

**Asignatura:** ASO — Administración de Sistemas Operativos.
**Temas:** conceptos de red (VPN, switch, SLA, DMZ), LDAP, DHCP, SSH, cortafuegos (iptables),
encriptación (GPG), servidor Samba y servidor de impresión CUPS.

## Fechas de los apuntes

| Fecha | Contenido | Lote |
|---|---|---|
| 07/11/2024 | Samba y CUPS, práctica 3 | 2 |
| 15/11/2024 | LDAP | 2 |
| (sin fecha) | Redes: VPN, switch, SLA, DMZ | 2 |
| 10/02/2025 | Redes y servicios (RA 4): DHCP y SSH | 4 |
| (sin fecha) | Seguridad y cortafuegos: iptables y encriptación | 4 |
| 21/11/2024 | Servidor Linux — Samba y CUPS (detallado) | 6 |

## Lotes e imágenes de origen

- **Lote 2** — `lote-2/` (texto del usuario; fotos sin contrastar).
- **Lote 4** — `lote-4/` (texto del usuario; fotos sin contrastar).
- **Lote 6** — `lote-6/` (texto del usuario; fotos sin contrastar).

Nombres de archivo completos en `00_Indice_y_control/inventario_de_lotes.md`.

---

## 1. Redes: VPN, switch, SLA y DMZ

- La VPN se «contrata con telefónica» y esta se le asigna a un puerto en concreto del switch.
- **SLA:** contrato de empresa con penalizaciones por errores (Exterior No «IPTables»).
- **SW inside:** servidores (importante).
- **SW DMZ:** servidor Web (puede acceder desde el exterior «IPTables»).

---

## 2. LDAP (15/11/2024)

- Tema 4. Trabaja con la memoria caché.
- Protocolo de Nivel de Aplicación.
- Basado en LDIF.
- Open LDAP.
- `wc -l` → contar las líneas de un fichero.

---

## 3. DHCP (Lote 4 — RA 4)

- **Sentido:** Servidor → Cliente.
- **Puertos:** 67 – 68.
- Como root:

```bash
apt install isc-dhcp-server
```

- Configuración: `/etc/dhcp/dhcpd.conf`

```bash
systemctl stop/start isc-dhcp-server
```

- Estructura de configuración:
  `subnet - netmask - { range - - ; option routers - .1; option domain-name-servers 8.8.8.8, 8.8.4.4; }`

---

## 4. SSH (Lote 4 — RA 4)

- **Puerto:** 22.

```bash
apt install openssh-server
```

- Para conectarse: `nombreusuario@ip`
- Generar clave:

```bash
ssh-keygen -t rsa -b 4096
```

---

## 5. Seguridad y cortafuegos (Lote 4)

### IP tables

- Netfilter es parte de IP tables.

```bash
iptables -A INPUT -s ip -j DROP   # (Entrada)
iptables -A OUTPUT -s ip -j DROP  # (Salida)
iptables -A INPUT -p tcp --dport 22 -j DROP
iptables -A INPUT -s ip/24 -j DROP
iptables -L -v
```

### Encriptación

- **Simétrica:** 1 clave para cifrar y para descifrar.
- **Asimétrica:** 1 clave pública y otra privada.
- **Hashing:** usando un algoritmo matemático se vuelve irreversible.

```bash
gpg -c archivo.txt   # encriptar
gpg -d archivo.txt   # desencriptar
```

---

## 6. Servidor Samba y CUPS

### 6.1. Apunte del Lote 2 — Samba y CUPS (práctica 3, 07/11/2024)

Controlador de dominio secundario del principal; y en horas de descanso sincronizarlo con el 1º por
el ancho de banda (red satelital). Securizar Samba, configurar `smb.conf`, configurar carpetas
compartidas, comprobar en otro equipo, instalar CUPS, configurar impresora, cuotas
(`apt install quota`), cuota para con = 1.

### 6.2. Apunte del Lote 6 — Samba y CUPS (21/11/2024, detallado)

**Instalación de Samba:**

```bash
apt update && apt upgrade -y
apt install samba-client
apt install samba-common-bin
systemctl status smbd
smb -version
```

**IP tables / firewall:**

```bash
ufw status
ufw enable
ufw app list
ufw app allow samba
```

**Preparar partición/carpeta:**

```bash
lsblk
mkdir /home/"carpeta"
fdisk /dev/sda
lsblk
mkfs -t ext4 /dev/sda5
nano /etc/fstab        # /dev/sda5 /home/"carpeta" ext4 defaults 0 1
df -Kh
```

**Usuario y carpeta compartida:**

```bash
groupadd sambashare
chgrp sambashare /home/"carpeta"
chmod 750 -R /home/"carpeta"
usermod -aG sambashare "usuario"
smbpasswd -a "usuario"
```

**Configuración de Samba (`/etc/samba/smb.conf`):**

```ini
[global]
workgroup = WORKGROUP
server string = ASIR server
netbios name = Ubuntuserver
security = user
map to guest = bad user
dns proxy = no

[carpeta compartida]
path = /home/"carpeta"...
browseable = yes
read only = no
force create mode = 0770
force directory mode = 2550
valid users = @sambashare @adminsamba

[usuario1]
path = /home/"carpeta"/usuario1
browseable = no
read only = no
force create mode = 0760
force directory mode = 2550
valid users = usuario1 @adminsamba
```

**Comprobar Samba:**

```bash
systemctl restart smbd
systemctl status smbd
```

**CUPS:**

```bash
apt install cups-client
```

- Acceder desde navegador: `ip:631`
- Configurar impresoras: `lpadmin -p "n.impresora" -E`
- Añadir a `smb.conf`:

```ini
[printers]
browseable = yes
path = /var/spool/samba
printable = yes
public = yes
writeable = yes
create mode = 0700

[print$]
comment = Printer Drivers
path = /var/lib/samba/printers
browseable = yes
read only = yes
guest ok = yes
```

---

## Dudas de lectura

- No se han marcado lecturas dudosas específicas en estos bloques, salvo los comandos señalados en
  Notas técnicas. Los lotes 2, 4 y 6 provienen del texto del usuario y no se han contrastado aún
  con las fotografías.

## Notas técnicas

- **Posible corrección técnica (B8):** `smb -version` probablemente corresponde a `smbd -V` o
  `smbclient -V` (el binario `smb` no es el servidor).
- En `[global]` del ejemplo, la etiqueta de la sección se escribe habitualmente en minúsculas
  (`[global]`); se conserva tal cual aparece.
- La estructura de `dhcpd.conf` está resumida en el apunte con guiones; se reproduce literal.

## Referencias cruzadas

- Cuotas de disco y gestión de usuarios/grupos (`sambashare`): `ASO/04_Usuarios_permisos_y_politicas.md`.
- Cortafuegos con `ufw`/`iptables` en contexto de scripts: `ASO/02_Linux_Bash.md`.
- Protocolos y red de Oracle (`listener.ora`, puerto 1521): `BBDD/03_Oracle_y_PL-SQL.md`.
