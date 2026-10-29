---
title: "Exámenes · 2ASIR: Apache, DNS y VirtualHost"
kind: "apunte"
subject: "Exámenes"
order: 6
summary: "Examen final resuelto: instalación de Apache, zona DNS directa e inversa con BIND, dos sitios con VirtualHost en puertos distintos, permisos de www-data y publicación por HTTPS."
topics:
  - "Redes y servicios"
  - "DNS"
  - "Apache"
  - "VirtualHost"
source_batches:
  []
dates:
  - "2024-05-24"
status: "organizado"
---

**Asignatura:** 2ASIR, examen conjunto de servicios de red y aplicaciones web.
**Fecha:** 24 de mayo de 2024. **Entorno:** Ubuntu en máquina virtual.

**Nota:** el nombre y el correo del alumno se han eliminado, y el dominio del centro
se ha sustituido por `asir.test`. Las IP y el resto de la configuración son las del
examen.

---

## 1. Instalación de Apache

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install apache2
```

## 2. Red y búsqueda de dominio

En `/etc/network/interfaces`, IP fija `24.0.2.2`, máscara `/8`, puerta de enlace
`24.0.2.1` y `dns-search asir.test`.

```text
auto enp0s3
iface enp0s3 inet static
    address 24.0.2.2
    netmask 255.0.0.0
    gateway 24.0.2.1
    dns-nameservers 24.0.2.2
    dns-search asir.test
```

## 3. Sitio por defecto

En `/etc/apache2/sites-available/000-default.conf` se ajustan las tres primeras
directivas:

```text
# ServerName www.example.com
ServerAdmin alumno@asir.test
ServerName asir.test
ServerAlias www.asir.test
DocumentRoot /var/www/html/web
```

## 4. Zona directa

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
servidor     IN  A       24.0.2.2
             IN  MX  10 mail.asir.test.
mail         IN  A       24.0.3.2
ftp          IN  A       24.0.4.2
server       IN  CNAME   servidor.asir.test.
transfer     IN  CNAME   ftp.asir.test.
www          IN  A       24.0.2.2
```

## 5. Zona inversa

```text
$TTL 604800
@   IN  SOA servidor.asir.test. root.asir.test. (
        2       ; Serial
        604800  ; Refresh
        86400   ; Retry
        2419200 ; Expire
        604800  ; Negative Cache TTL
)
    IN  NS   servidor.asir.test.
2   IN  PTR  servidor.asir.test.
3   IN  PTR  mail.asir.test.
4   IN  PTR  ftp.asir.test.
```

Los ficheros se guardan como `/etc/bind/db.asir.test` y `/etc/bind/db.24`, con las
mismas zonas declaradas en `named.conf.local` que en el examen de DNS.

## 6. Contenido del sitio

```bash
sudo mkdir -p /var/www/html/web
```

`index.html`:

```html
<h1>Hola asir.test</h1>
<p>Soy Alumno, 2ASIR, 24/05/2024</p>
<a href="documento.html">Documentos</a>
```

`documentos.html`:

```html
<h1>Documentos</h1>
<a href="documento.pdf">PDF</a>
<a href="imagen.jpg">IMAGEN</a>
```

## 7. Permisos y publicación

```bash
sudo chmod 777 documento.pdf && sudo chmod 777 imagen.jpg
sudo mv documento.pdf /var/www/html/web/
sudo mv imagen.jpg /var/www/html/web/
sudo chown -R www-data:www-data /var/www/html/web
```

## 8. Segundo sitio en el puerto 8080

```bash
sudo mkdir -p /var/www/html/host
sudo chown -R $USER:$USER /var/www/html/host
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/host.conf
```

En `host.conf` se cambia el `VirtualHost` al puerto 8080 y el `DocumentRoot` a
`/var/www/html/host.conf`.

## 9. Activar y desactivar sitios

```bash
sudo a2ensite host
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
```

En `/etc/apache2/ports.conf`:

```text
Listen 8080

<IfModule ssl_module>
    Listen 443
</IfModule>
```

## 10. HTTPS

```bash
sudo a2enmod ssl
sudo a2ensite default-ssl
sudo systemctl reload apache2
```

## 11. Pruebas

| Prueba | Resultado en el examen |
| --- | --- |
| `https://www.asir.test/host/` | Sirve el segundo sitio |
| `https://www.asir.test/web/` | Sirve el sitio principal |
| `https://www.asir.test/web/documento.pdf` | Descarga el PDF de prueba |
| `https://www.asir.test/web/imagen.jpg` | Muestra la imagen |

---

## Observaciones sobre la resolución

**`chmod 777` sobra cuando el propietario es `www-data`.** Con
`chown -R www-data:www-data` basta `644` para ficheros y `755` para directorios. El
`777` deja el contenido escribible por cualquiera, y en un servidor web eso es un
riesgo real, no una precaución.

**El `DocumentRoot` del segundo sitio apunta a `host.conf`.** En la captura queda
`/var/www/html/host.conf` cuando debería ser `/var/www/html/host`: el sitio serviría
un fichero de configuración en lugar de un directorio.

**Se cambia el puerto de escucha global.** Poner `Listen 8080` en `ports.conf` y
desactivar `000-default` deja el sitio principal sin puerto 80. Si se quiere el
principal en 80 y el segundo en 8080, hay que añadir `Listen 8080` sin borrar el
`Listen 80`.

**HTTPS sin certificado propio.** `a2ensite default-ssl` usa el certificado
autofirmado que trae el paquete `ssl-cert`. Sirve para practicar, pero el navegador
avisará de que no es de confianza.

## Qué se practica

- Apache con varios `VirtualHost` en puertos distintos.
- `a2ensite` y `a2dissite` como interruptores de sitios, sin borrar ficheros.
- Propiedad y permisos de `DocumentRoot`.
- El mismo dominio en DNS directa, inversa y en `ServerName`/`ServerAlias`.
