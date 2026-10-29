---
title: "Exámenes · SRI: examen práctico DNS"
kind: "apunte"
subject: "Exámenes"
order: 4
summary: "Examen práctico de DNS en Ubuntu con BIND9: instalación, configuración de red, zona directa e inversa, registros SOA, NS, A, MX, CNAME y PTR, y comprobación con named-checkzone, nslookup, dig y ping."
topics:
  - "Redes y servicios"
  - "DNS"
  - "BIND"
source_batches:
  []
dates:
  - "2023-11-02"
status: "organizado"
---

**Asignatura:** SRI (Servicios de Red e Internet). **Fecha:** 2 de noviembre de 2023.
**Entorno:** Ubuntu en máquina virtual, red interna, BIND9 como servidor maestro.

**Nota:** el dominio del centro se ha sustituido por `asir.test` y el nombre del
alumno se ha eliminado. Las direcciones IP y los registros conservan el valor
original del examen.

---

## 1. Instalación

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install bind9 dnsutils resolvconf
```

`bind9` es el servidor, `dnsutils` aporta `nslookup` y `dig`, y `resolvconf` gestiona
`/etc/resolv.conf` a partir de la configuración de red.

## 2. Configuración de red

En `/etc/network/interfaces`: IP fija `140.70.2.1` con máscara `/16`, puerta de
enlace `140.70.1.1` y el propio equipo como servidor DNS.

```bash
sudo nano /etc/network/interfaces
```

```text
auto lo
iface lo inet loopback

auto enp0s3
iface enp0s3 inet static
    address 140.70.2.1
    netmask 255.255.0.0
    gateway 140.70.1.1
    dns-nameservers 140.70.2.1
    dns-search asir.test
```

```bash
sudo service networking reload
sudo resolvconf -u
cat /etc/resolv.conf
```

`resolv.conf` queda con `nameserver 140.70.2.1` y `search asir.test`.

## 3. Orden de resolución de nombres

En `/etc/nsswitch.conf` se adelanta `dns` a `files`, para que el servidor consulte
primero su propia zona y no el fichero local `hosts`.

```text
hosts: dns files mdns4_minimal [NOTFOUND=return] myhostname
```

## 4. Zonas en BIND

```bash
sudo nano /etc/bind/named.conf.local
```

```text
// Zona directa para el dominio asir.test
zone "asir.test" {
    type master;
    file "/etc/bind/db.asir.test";
};

// Zona inversa para la red 140.70.0.0
zone "70.140.in-addr.arpa" {
    type master;
    file "/etc/bind/db.70.140";
};
```

## 5. Fichero de zona directa

```bash
sudo nano /etc/bind/db.asir.test
```

```text
$TTL 604800
$ORIGIN asir.test.
@   IN  SOA servidor.asir.test. root.asir.test. (
        2       ; Serial
        604800  ; Refresh
        86400   ; Retry
        2419200 ; Expire
        604800  ; Negative Cache TTL
)
    IN  NS      servidor.asir.test.
servidor    IN  A       140.70.2.1
             IN  MX  10 mail.asir.test.
mail        IN  A       150.75.3.1
ftp         IN  A       150.75.4.1
correo      IN  CNAME   mail.asir.test.
cloud       IN  CNAME   ftp.asir.test.
```

## 6. Fichero de zona inversa

```bash
sudo nano /etc/bind/db.70.140
```

```text
$TTL 604800
@   IN  SOA servidor.asir.test. root.asir.test. (
        2       ; Serial
        604800  ; Refresh
        86400   ; Retry
        2419200 ; Expire
        604800  ; Negative Cache TTL
)
    IN  NS  servidor.asir.test.
2   IN  PTR servidor.asir.test.
3   IN  PTR mail.asir.test.
4   IN  PTR ftp.asir.test.
```

## 7. Comprobación de sintaxis

```bash
named-checkzone asir.test /etc/bind/db.asir.test
named-checkzone 70.140.in-addr.arpa /etc/bind/db.70.140
```

Ambas responden `loaded serial 2` y `OK`.

## 8. Pruebas desde el cliente

```bash
nslookup -type=A mail.asir.test
nslookup -type=A ftp.asir.test
dig mail.asir.test
dig ftp.asir.test
ping 140.70.2.1
```

Los resultados del examen:

- `mail.asir.test` resuelve a `150.75.3.1`.
- `ftp.asir.test` resuelve a `150.75.4.1`.
- `dig` devuelve `status: NOERROR`, un `ANSWER` y el `NS` de la zona.
- `ping` al servidor responde sin pérdidas.

---

## Observaciones sobre la resolución

Son detalles reales del examen, no erratas de esta transcripción.

**La zona inversa no puede resolver las IP públicas.** Los registros `A` de correo y
FTP apuntan a `150.75.3.1` y `150.75.4.1`, fuera de la red `140.70.0.0/16`. La zona
inversa `70.140.in-addr.arpa` solo cubre las direcciones `140.70.x.x`, así que las
PTR de `2`, `3` y `4` describen una red distinta de la que usan los registros `A`.

**El `SOA` de la zona inversa no coincide con el dominio.** En el original el `SOA`
apunta a un nombre recortado, sin el sufijo completo que usan el resto de registros.
BIND lo acepta, pero deja un `SOA` apuntando a un nombre que no existe en la zona.

**Un nombre con el dominio repetido.** `ftp.asir.test. IN A` en el campo de nombre
genera `ftp.asir.test.asir.test`, porque el `$ORIGIN` ya se añade. Debe ir solo
`ftp`.

**Faltan las PTR de `server` y `transfer`.** La zona inversa del examen declaraba
`server` y `transfer` en la directa pero no sus registros inversos.

## Qué se practica

- Estructura de una zona maestra: `$TTL`, `$ORIGIN`, `SOA` y registros.
- Diferencia entre zona directa (`A`, `MX`, `CNAME`) e inversa (`PTR`).
- Por qué `named-checkzone` es el primer filtro antes de reiniciar el servicio.
- Lectura de la salida de `dig`: cabecera, `QUESTION`, `ANSWER`, `AUTHORITY` y
  `ADDITIONAL`.
