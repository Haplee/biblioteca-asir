---
title: "Dudas y revisión"
kind: "control"
order: 4
summary: "Lecturas dudosas, comandos incompletos o posiblemente erróneos y contenidos pendientes de revisar contra el original."
topics:
  - "Dudas"
  - "Revisión"
  - "Control"
source_batches:
  []
dates:
  []
status: "organizado"
---

**Fecha de creación:** 14/10/2026.
Aquí se centralizan las lecturas dudosas, los comandos incompletos, las discrepancias y los
contenidos que no se pueden clasificar con seguridad. Todos los puntos están extraídos del maestro
`apuntes_unificados_lotes_1-7.md`; **no se ha inventado contenido para rellenar los huecos**.

Estados: `pendiente` (sin resolver) · `resuelto` (confirmado por el usuario).

---

## A. Dudas de lectura (contrastar con las fotografías)

| # | Lote | Documento | Fragmento | Estado |
|---|---|---|---|---|
| A1 | 1 | `IAW/01_Apache_y_VirtualHost.md` | «M. huésped → RBAC (?) → Alta puesto (?) — (Reset MAC)» | pendiente |
| A2 | 1 | `IAW/01_Apache_y_VirtualHost.md` | «Análisis de permisos / antivirus del host» | pendiente |
| A3 | 1 | `IAW/01_Apache_y_VirtualHost.md` | Entrada de `VirtualHost`: parte del texto original dudosa | pendiente |
| A4 | 1 | `IAW/01_Apache_y_VirtualHost.md` | `AllowOverride All` — en la foto parece «Override all» | pendiente |
| A5 | 1 | `IAW/01_Apache_y_VirtualHost.md` | Comandos `chown` y `chmod` del directorio web | pendiente |
| A6 | 1 | `IAW/01_Apache_y_VirtualHost.md` | Comandos para habilitar el sitio y reiniciar Apache (borrosos) | pendiente |
| A7 | 1 | `IAW/02_PHP.md` | `upload_file_size` (probable `upload_max_filesize`) | pendiente |
| A8 | 1 | `IAW/04_WordPress.md` | «La categoría es obligatoria en páginas y entradas y solo puede haber una» | pendiente |
| A9 | 3 | `ASO/01_Windows_PowerShell.md` | Conversión con `1MB` en la consulta de tamaño de un proceso | pendiente |
| A10 | 3 | `ASO/01_Windows_PowerShell.md` | `RequiredServices` [lectura probable] | pendiente |
| A11 | 3 | `BBDD/03_Oracle_y_PL-SQL.md` | Campo tras `UPDATE OF` en el trigger (no se distingue) | pendiente |
| A12 | 3 | `BBDD/03_Oracle_y_PL-SQL.md` | Condición de `ROWNUM` (ilegible) | pendiente |
| A13 | 3 | `BBDD/03_Oracle_y_PL-SQL.md` | Esquemas `HR`, `USERS`, `TEMP`, `ORACLE_HOME` (parte dudosa) | pendiente |
| A14 | 3 | `ASO/02_Linux_Bash.md` | `case`: parece repetirse `"-m")` | pendiente |
| A15 | 5 | `BBDD/04_Usuarios_roles_y_privilegios.md` | `PASSWORD_LIMIT = TRUE` en perfiles | pendiente |
| A16 | 5 | `BBDD/03_Oracle_y_PL-SQL.md` | «Función: programa que devuelve un valor. En el apunte aparece «siempre»» | pendiente |
| A17 | 5 | `BBDD/05_Tablespaces_y_almacenamiento.md` | `Uniform size 1M` (texto dudoso) | pendiente |
| A18 | 5 | `BBDD/05_Tablespaces_y_almacenamiento.md` | Tipo de tablespace `local` / `dictionary` (lectura probable) | pendiente |
| A19 | 5 | `BBDD/05_Tablespaces_y_almacenamiento.md` | Interpretación de `DBA_FREE_SPACE` («espacio libre de una tabla o tablespace») | pendiente |
| A20 | 5 | `BBDD/04_Usuarios_roles_y_privilegios.md` | Tercer usuario junto a `SYS` y `SYSTEM` [ilegible] | pendiente |
| A21 | 5 | `BBDD/04_Usuarios_roles_y_privilegios.md` | Definición manuscrita de «perfil» parcialmente dudosa | pendiente |
| A22 | 7 | `BBDD/01_Fundamentos_SGBD.md` | Definición manuscrita de «registro lógico/físico» (confusa) | pendiente |
| A23 | 7 | `BBDD/01_Fundamentos_SGBD.md` | «Los elementos de una tabla deben tener el mismo número de filas y columnas» | pendiente |

---

## B. Comandos incompletos o posiblemente erróneos

> Se conserva en la transcripción literal lo que figura en el original y **aparte** se propone una
> posible corrección técnica. El detalle está en la sección «Notas técnicas» de cada documento.

| # | Lote | Documento | Fragmento original | Posible corrección técnica | Estado |
|---|---|---|---|---|---|
| B1 | 2 | `ASO/02_Linux_Bash.md` | `1&2 > /dev/null` | Probablemente `2>&1 > /dev/null` o `&> /dev/null` | pendiente |
| B2 | 2 | `ASO/02_Linux_Bash.md` | `Funciones: nombre function ; function nombre` | Sintaxis Bash dudosa (¿`function nombre`?) | pendiente |
| B3 | 2 | `ASO/02_Linux_Bash.md` | Llamada `Fconv_nomb` frente a la definición `F_conv_nomb` | Posible errata de la fuente | pendiente |
| B4 | 3 | `ASO/01_Windows_PowerShell.md` | `-Confirm $false` | En PowerShell sería `-Confirm:$false` | pendiente |
| B5 | 4 | `BBDD/03_Oracle_y_PL-SQL.md` | `LSNRCTL` | El ejecutable es `lsnrctl` (minúsculas) | pendiente |
| B6 | 6 | `BBDD/03_Oracle_y_PL-SQL.md` | `for x in select dni, nombre from alumnos` | En PL/SQL: `FOR x IN (SELECT ...) LOOP ... END LOOP;` | pendiente |
| B7 | 6 | `BBDD/03_Oracle_y_PL-SQL.md` | `export CV_ASSUME_DIS` | Posiblemente `export CV_ASSUME_DISTID=OEL7.8` o similar | pendiente |
| B8 | 6 | `ASO/03_Red_y_servicios.md` | `smb -version` | Probablemente `smbd -V` o `smbclient -V` | pendiente |
| B9 | 6 | `ASO/04_Usuarios_permisos_y_politicas.md` | `find /lib/modules/'uname -r' -type f -name '*quota_v.ko*'` | Probablemente `$(uname -r)` (sustitución de comando) | pendiente |
| B10 | 6 | `ASO/04_Usuarios_permisos_y_politicas.md` | `mkdir /home/aquota.user` / `mkdir /home/aquota.group` | Lo habitual es crear ficheros `aquota.user`/`aquota.group` (no directorios) | pendiente |

---

## C. Discrepancias y avisos estructurales

| # | Descripción | Estado |
|---|---|---|
| C1 | El maestro dice que los lotes 2, 4 y 6 se tomaron del texto del usuario y no de fotos, pero las carpetas `lote-2/`, `lote-4/` y `lote-6/` contienen 10 fotografías cada una. Hay originales sin contrastar. | pendiente |
| C2 | El maestro advierte de que algunos comandos de IAW y BBDD se reconstruyeron «a partir de la sintaxis habitual» y deben verificarse contra las fotos. | pendiente |
| C3 | Las fotografías no están ordenadas cronológicamente por número de lote; el orden temporal hay que deducirlo de las fechas escritas en cada hoja. | pendiente |
| C4 | No se ha podido mapear cada fotografía concreta con el texto del maestro: la transcripción solo conserva el nivel de lote. En las fotos podría haber páginas que no llegasen al maestro o viceversa. | pendiente |

---

## D. Contenidos sin clasificar

Por ahora **no hay ningún contenido que quede en `Por_clasificar`**. Todos los bloques del maestro se
han asignado a una asignatura con las siguientes cautelas provisionales:

- **Git (Lote 7):** clasificado como *Control de versiones*. El centro podría impartirlo dentro de
  otra asignatura; la categoría queda como provisional hasta confirmación del usuario.
- **Django (Lote 1):** clasificado en IAW por estar dentro de la práctica de despliegue web. Si en
  el centro corresponde a otra asignatura (p. ej. Programación), se movería.
- **MySQL dentro de la práctica de Joomla (Lote 1):** es contenido de BBDD usado en IAW. Se ha
  dejado principal en BBDD con referencia cruzada desde IAW.
- **LDAP y Windows Server (Lote 2):** asignados a ASO. Podrían corresponder a una asignatura de
  redes/servicios según el plan del centro.
- **Encriptación/GPG e iptables (Lote 4):** asignados a ASO (seguridad y cortafuegos).
