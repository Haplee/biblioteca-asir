---
title: "Exámenes · SRI: montaje de un servidor DNS"
kind: "apunte"
subject: "Exámenes"
order: 5
summary: "Práctica de montaje completo de un servidor DNS en Ubuntu 18.04 con BIND9, zona servidor.es, registros mail, ftp, correo y transfer, y pruebas desde el cliente con nslookup, dig y ping."
topics:
  - "Redes y servicios"
  - "DNS"
  - "BIND"
source_batches:
  []
dates:
  - "2023-10-19"
status: "organizado"
---

**Asignatura:** SRI (Servicios de Red e Internet). **Entorno:** Ubuntu 18.04 y BIND9.
**Trabajo:** práctica de montaje, no un examen con tiempo.

**Nota:** el apellido que aparecía en el enunciado y en las zonas se ha sustituido
por `primerapellido`, que es justo el marcador que usaba el propio enunciado. El
resto de nombres e IP se mantienen.

---

## Enunciado

Montar un servidor DNS en Ubuntu 18.04 que cumpla:

| Dato | Valor |
| --- | --- |
| Zona | `servidor.es` |
| IP del servidor | `46.0.2.1` |
| Máscara | `255.0.0.0` |
| Puerta de enlace | `46.0.1.1` |

El servidor debe resolver:

- `mail.primerapellido.servidor.es`, servidor de correo con IP `46.0.3.1`.
- `ftp.servidor.es`, servidor de FTP con IP `46.0.4.1`.
- `correo.servidor.es`, alias de `mail.primerapellido.servidor.es`.
- `transfer.servidor.es`, alias de `ftp.servidor.es`.

Hay que entregar: listado de los archivos creados y modificados, contenido de la
configuración local de zonas, contenido de los ficheros de resolución directa e
inversa y resultado de las pruebas desde el cliente.

---

## Resolución

### Instalación

```bash
sudo apt update
sudo apt upgrade
sudo apt install bind9
sudo apt install dnsutils
sudo apt-get install resolvconf
service bind9 status
```

`service bind9 status` debe mostrar `active (running)`. Si el servicio arranca pero
registra `network unreachable resolving`, es normal en red interna: el servidor no
puede consultar los servidores raíz, y para una zona maestra local no le hace falta.

### Red

```bash
sudo nano /etc/network/interfaces
```

```text
auto lo
iface lo inet loopback

auto enp0s3
iface enp0s3 inet static
    address 46.0.2.1
    netmask 255.0.0.0
    gateway 46.0.1.1
    dns-nameservers 46.0.2.1
    dns-search servidor.es
```

La máquina virtual se pone en **red interna** y se reinicia.

```bash
sudo service networking reload
cat /etc/resolv.conf
sudo resolvconf -u
```

### Orden de resolución

```bash
sudo nano /etc/nsswitch.conf
```

```text
hosts: dns files mdns4_minimal [NOTFOUND=return] myhostname
```

### Zonas

```bash
sudo nano /etc/bind/named.conf.local
```

```text
// Zona directa para el dominio servidor.es
zone "servidor.es" {
    type master;
    file "/etc/bind/db.servidor.es";
};

// Zona inversa para la red 46.0.0.0
zone "46.in-addr.arpa" {
    type master;
    file "/etc/bind/db.46";
};
```

### Zona directa

```text
$TTL 604800
$ORIGIN servidor.es.
@   IN  SOA servidor.servidor.es. root.servidor.es. (
        2       ; Serial
        604800  ; Refresh
        86400   ; Retry
        2419200 ; Expire
        604800  ; Negative Cache TTL
)
    IN  NS   servidor.servidor.es.
servidor              IN  A      46.0.2.1
                      IN  MX  10 mail.primerapellido.servidor.es.
mail                  IN  A      46.0.3.1
ftp                   IN  A      46.0.4.1
correo                IN  CNAME  mail.primerapellido.servidor.es.
transfer              IN  CNAME  ftp.servidor.es.
server                IN  CNAME  servidor.servidor.es.
```

### Zona inversa

```text
$TTL 604800
@   IN  SOA servidor.servidor.es. root.servidor.es. (
        2       ; Serial
        604800  ; Refresh
        86400   ; Retry
        2419200 ; Expire
        604800  ; Negative Cache TTL
)
    IN  NS   servidor.servidor.es.
2   IN  PTR  servidor.servidor.es.
3   IN  PTR  mail.primerapellido.servidor.es.
4   IN  PTR  ftp.servidor.es.
```

### Comprobación y recarga

```bash
sudo named-checkconf /etc/bind/named.conf.local
sudo named-checkzone servidor.es /etc/bind/db.servidor.es
sudo named-checkzone 46.in-addr.arpa /etc/bind/db.46
sudo service bind9 restart
sudo rndc flush
```

### Pruebas desde el cliente

```bash
nslookup ftp.servidor.es
dig ftp.servidor.es
ping 46.0.4.1
```

El examen obtuvo respuesta correcta en `nslookup` y `dig`, y `ping` devolvió
`Destination Host Unreachable`: la zona resuelve el nombre, pero no había ningún
equipo con la IP `46.0.4.1` escuchando en la red interna. Es un fallo de la prueba,
no del DNS.

---

## Observaciones sobre la resolución

**`named-checkzone` avisó y siguió adelante.** La salida incluía
`servidor.servidor.es/MX 'mail.primerapellido.servidor.es' has no address records
(A or AAAA)` y aun así terminó con `loaded serial 2 OK`. El aviso aparecía porque el
`MX` apunta a un nombre de tres etiquetas que no tenía registro `A` propio: la zona
solo declaraba `mail`, sin el apellido.

**`correo` como `CNAME` de un `MX`.** Un alias de correo no sustituye al `MX`: el
registro `MX` sigue apuntando al nombre real, y `correo` solo funciona para
resolución normal. Si se quiere que el correo llegue a `correo.servidor.es`, el `MX`
debe apuntar a él o añadirse un `A` propio.

**`ping` no valida DNS.** `ping` resuelve el nombre y luego hace ICMP. Sirve para
comprobar conectividad, no la zona; para la zona están `nslookup` y `dig`.

**Faltaban las PTR de `correo` y `transfer`.** La zona inversa solo declaraba los
hosts reales, que es lo correcto: los alias no llevan `PTR`.

## Qué se practica

- Montaje completo: paquetes, red, `nsswitch`, zonas, comprobación y recarga.
- Registros `MX` y `CNAME` y por qué un alias no puede convivir con otros registros
  del mismo nombre.
- Lectura crítica de la salida de `named-checkzone`: un aviso no siempre invalida la
  zona, pero siempre señala algo.
