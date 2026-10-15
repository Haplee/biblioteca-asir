---
title: "IAW · Apache y VirtualHost"
kind: "apunte"
subject: "IAW"
order: 1
summary: "Configuración de equipos y acceso, archivo hosts, instalación y configuración de Apache, VirtualHost, DocumentRoot y cortafuegos."
topics:
  - "Apache"
  - "VirtualHost"
  - "DocumentRoot"
  - "hosts"
  - "ufw"
  - "Cortafuegos"
source_batches:
  - 1
dates:
  - "2024-11-20"
  - "2025-01-08"
status: "organizado"
---

**Asignatura:** IAW (Implantación de Aplicaciones Web).
**Temas:** configuración de equipos y acceso, archivo `hosts`, configuración e instalación de Apache,
`VirtualHost`, `DocumentRoot` y cortafuegos.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 20/11/2024 | Configuración de equipos, acceso a la aplicación y configuración de Apache |
| (sin fecha) | Instalación y configuración de Apache, `VirtualHost` |
| 08/01/2025 | Directorio raíz de Apache (`DocumentRoot`) |

## Lotes de origen

- **Lote 1**

---

## 1. Configuración de equipos y acceso (20/11/2024)

1. M. huésped → RBAC (?) → Alta puesto (?); (Reset MAC). **[Lectura dudosa]**
2. M. aplicación → `C:\Windows\System32\drivers\etc\hosts`.
   - Análisis de permisos / antivirus del host. **[Lectura dudosa]**
   - Control total.
   - Editar asociación de IP mapeada y dominio.
3. Comprobar acceso a la aplicación.
4. Denegar acceso al backend de Joomla.
   - Ruta anotada: `/etc/apache2/sites-available/dominio.conf`.
   - Añadir entrada de `VirtualHost`.
   - Configurar las rutas y los permisos de acceso correspondientes. **[Parte del texto original es dudosa]**

---

## 2. Configuración de Apache

Archivo de configuración:

```text
/etc/apache2/apache2.conf
```

- Buscar `/var/www/`.
- Editar `AllowOverride All`. **[El apunte parece poner «Override all»]**

---

## 3. Instalación y configuración de Apache

Instalar Apache:

```bash
apt install apache2 -y
```

Configurar el cortafuegos:

```bash
ufw enable
ufw allow "Apache Full"
```

Crear el directorio web:

```bash
mkdir -p /var/www/nombre/public_html
```

A continuación, configurar el propietario y los permisos del directorio.
**[Los comandos `chown` y `chmod` no se distinguen por completo]**

Configurar un `VirtualHost` en:

```text
/etc/apache2/sites-available/nombre.com.conf
```

- Configurar el `VirtualHost` con las rutas y los nombres correctos.
- Habilitar el sitio.
- Reiniciar Apache.
- Añadir el dominio al archivo `hosts`.
- Instalar las bibliotecas de PHP para Apache.

> Los comandos concretos para habilitar el sitio y reiniciar Apache están parcialmente borrosos.

---

## 4. Archivo `hosts` de Windows

```text
C:\Windows\System32\drivers\etc\hosts
```

Añadir la IP de la máquina virtual y el nombre del dominio.

---

## 5. Directorio raíz de Apache (08/01/2025)

Archivo:

```text
/etc/apache2/apache2.conf
```

Configuración de `DocumentRoot`:

```apache
DocumentRoot /var/www/html
```

La ruta se puede cambiar y de ella depende la ubicación de los archivos que sirve la web.

---

## Dudas de lectura

- «M. huésped → RBAC (?) → Alta puesto (?); (Reset MAC)».
- «Análisis de permisos / antivirus del host».
- La entrada de `VirtualHost` y la parte de configuración de rutas y permisos.
- `AllowOverride All`: el apunte parece escribir «Override all».
- Comandos `chown` y `chmod` del directorio web (no se distinguen).
- Comandos para habilitar el sitio y reiniciar Apache (parcialmente borrosos).

## Notas técnicas

- **Posible corrección técnica:** la directiva de Apache es `AllowOverride All` (con mayúscula en
  «All»); el apunte parece escribir «Override all».
- **Posible corrección técnica:** los pasos para habilitar el sitio y recargar Apache suelen ser
  `a2ensite nombre.com.conf` y `systemctl reload apache2`, pero **no se incluyen aquí porque no
  figuran con claridad en el apunte**. Se dejan como pendientes de verificar.

## Referencias cruzadas

- Configuración de PHP para Apache: `IAW/02_PHP.md`.
- Práctica de Joomla (backend, plantillas, base de datos): `IAW/03_Joomla.md`.
- Creación de la base de datos MySQL usada en la práctica: `BBDD/02_SQL_y_MySQL.md`.
- Cortafuegos `ufw`/`iptables` en general: `ASO/03_Red_y_servicios.md`.
