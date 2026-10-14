# Apuntes unificados de ASIR: Sistemas, Redes, Aplicaciones Web, Python y Bases de Datos

**Documento maestro de transcripción y organización preliminar**  
**Lotes incorporados:** 1, 2, 3, 4, 5, 6 y 7.  
**Procedencia:** lotes 1, 3, 5 y 7 transcritos a partir de las fotografías compartidas; lotes 2, 4 y 6 integrados desde el texto facilitado por el usuario. Los lotes 2, 4 y 6 no se han contrastado aquí línea por línea con las fotografías originales.

> **Criterio de transcripción:** se han unificado las transcripciones que ya se hicieron en el chat, organizándolas por lote y tema. Algunos comandos se reconstruyeron a partir de la sintaxis habitual porque la escritura no se distinguía completamente. Esas partes deben contrastarse con las fotografías originales. Las anotaciones `[lectura dudosa]`, `[ilegible]` y `[revisar]` indican incertidumbre. Este documento no sustituye a una comprobación visual de las fotos.

---

# LOTE 1

## IAW — Apache, PHP, Joomla, WordPress y Django

### 20/11/2024 — Configuración de equipos y acceso

1. M. huésped → RBAC (?) → Alta puesto (?) — (Reset MAC). **[Lectura dudosa]**
2. M. aplicación → `C:\Windows\System32\drivers\etc\hosts`.
   - Análisis de permisos / antivirus del host. **[Lectura dudosa]**
   - Control total.
   - Editar asociación de IP mapeada y dominio.
3. Comprobar acceso a la aplicación.
4. Denegar acceso al backend de Joomla.
   - Ruta anotada: `/etc/apache2/sites-available/dominio.conf`.
   - Añadir entrada de `VirtualHost`.
   - Configurar las rutas y los permisos de acceso correspondientes. **[Parte del texto original es dudosa]**

### Configuración de Apache

Archivo de configuración:

```text
/etc/apache2/apache2.conf
```

- Buscar `/var/www/`.
- Editar `AllowOverride All`. **[En la fotografía parece poner «Override all»]**.

### Joomla — Posiciones de las plantillas

- Sistema → Plantillas.
- Previsualizar la posición de los módulos.
- Habilitar la previsualización de posiciones.

En el navegador:

```text
URL/?tp=1
```

Archivo `hosts` de Windows:

```text
C:\Windows\System32\drivers\etc\hosts
```

Añadir la IP de la máquina virtual y el nombre del dominio.

### Instalación y configuración de Apache

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

A continuación, configurar el propietario y los permisos del directorio. **[Los comandos `chown` y `chmod` no se distinguen por completo en la fotografía]**.

Configurar un `VirtualHost` en:

```text
/etc/apache2/sites-available/nombre.com.conf
```

- Configurar el `VirtualHost` con las rutas y los nombres correctos.
- Habilitar el sitio.
- Reiniciar Apache.
- Añadir el dominio al archivo `hosts`.
- Instalar las bibliotecas de PHP para Apache.

Los comandos concretos para habilitar el sitio y reiniciar Apache están parcialmente borrosos.

### Instalación de Joomla y base de datos

- Descargar Joomla 4.4.9 desde la máquina.
- Mover el archivo descargado al directorio `public_html`.
- Configurar el propietario del directorio web con `www-data`.
- Instalar MySQL Server.

Crear la base de datos:

```sql
CREATE DATABASE nombre;
```

Crear el usuario:

```sql
CREATE USER 'usuario'@'localhost'
IDENTIFIED BY 'contraseña';
```

Conceder permisos:

```sql
GRANT ALL PRIVILEGES ON nombre.*
TO 'usuario'@'localhost';
```

Aplicar los cambios:

```sql
FLUSH PRIVILEGES;
```

Salir de MySQL. Descomprimir el archivo ZIP de Joomla dentro de `public_html` y comprobar los permisos.

> Las sentencias SQL se han reconstruido siguiendo la sintaxis habitual de MySQL cuando los caracteres de la fotografía no se distinguían bien.

### Configuración de PHP

Archivo anotado:

```text
/etc/php/VERSION/apache2/php.ini
```

En una lista relacionada con errores o requisitos aparecen:

- Búfer de salida.
- Extensión ZIP.
- Extensión `intl`.

Instalar extensiones:

```bash
apt install php-zip php-intl
```

Editar `php.ini`:

- Buscar la configuración del búfer de salida.
- Comprobar o activar `output_buffering`.
- Habilitar ZIP.
- Habilitar `intl`.
- Cambiar el parámetro relacionado con el tamaño máximo de archivos subidos.

En la fotografía parece leerse `upload_file_size`, pero el parámetro habitual de PHP es `upload_max_filesize`. **[Revisar contra la imagen original]**.

### Joomla — Insertar vídeos

Ruta aproximada:

**Contenido → Módulos del sitio → Crear → Custom**.

- Introducir el nombre del módulo.
- Utilizar el editor de texto y el código.
- Copiar el código `iframe` del vídeo desde la opción de compartir.

### Joomla — Insertar un mapa

- Abrir Google Maps.
- Buscar la ubicación.
- Seleccionar **Compartir**.
- Elegir **Insertar un mapa**.
- Copiar el código proporcionado.
- Ir a **Contenido → Módulos del sitio → Crear → Custom**.
- Introducir el nombre.
- Abrir el editor de código.
- Pegar el código del mapa.
- Escoger la posición del módulo.

### Joomla — Menús y distribución del contenido

**Main Menu → Menu → Choose Layout**

- Elegir la distribución.
- Organizar las columnas.
- Crear los artículos y desplazarlos a la posición deseada.

Crear un menú:

**Menú → Gestionar**

- Título.
- Nombre único.
- Asociar un menú o seleccionar el tipo de menú.

### 04/12/2024 — Sindicación de contenido

Ruta aproximada:

**Contenido → Módulos del sitio → Crear**.

Tipo de módulo: **Feed Display / Canales electrónicos**.

1. Introducir el nombre.
2. Buscar una fuente RSS en alguna página.
3. Copiar la URL del feed.
4. Pegar la URL en el módulo.

La distribución dibujada muestra una barra de navegación, una zona principal de artículos o imágenes y tres bloques inferiores de artículos.

### 08/01/2025 — Directorio raíz de Apache

Archivo:

```text
/etc/apache2/apache2.conf
```

Configuración de `DocumentRoot`:

```apache
DocumentRoot /var/www/html
```

La ruta se puede cambiar y de ella depende la ubicación de los archivos que sirve la web.

### WordPress — Páginas, entradas, categorías y etiquetas

**Diferencia entre página y entrada:**

- **Página:** contenido más estático.
- **Entrada (post):** contenido más dinámico.
- La elección depende de la naturaleza del contenido.

**Categoría:** clasificación del contenido. El apunte indica que es obligatoria en páginas y entradas y que solo puede haber una categoría. **[Esta anotación puede referirse a un ejercicio concreto; no debe considerarse una regla general de WordPress]**.

**Etiqueta:** no es obligatoria y puede haber cero o varias.

Acceso al backend:

```text
/wp-admin
```

Cambiar el formato de fecha:

**Ajustes → Generales → Formato de fecha**.

Configurar enlaces permanentes:

**Ajustes → Enlaces permanentes**.

Limpiar caché:

- Plugin: LiteSpeed Cache.
- Utilizar las opciones del plugin para limpiar la caché.

### 15/01/2025 — Django

- Django → framework de Python.
- «Baterías incluidas»: incluye por defecto funcionalidades necesarias para desarrollar aplicaciones.
- `help`: consultar la ayuda de los comandos y sus palabras clave.

---

# LOTE 2

## Programación Python (23/01/2025 y 29/01/2025)
* **Salto de línea:** `print('\n', end='')`
* **Función:**
  ```python
  def nombre(0..n parametros):
      return v_fin
  ```
* **Meter variables en print:** `print(f'cadenas y {variables}')`

## Programación y Administración Bash
* **Permisos (28/10/2024):**
  * Permisos E y L -> 666
  * Permisos E, X y L -> 777
  * *Una solución al primer script con los grupos (departamentos) y usuarios; una solución es darle permisos a los grupos en lugar que a los usuarios.*
* **Script Ejemplo:**
  ```bash
  #!/bin/bash
  # Def variables
  EMPRESA="Nombre"$(date +%Y.%m.%d)
  DIR="/educate/$EMPRESA"
  
  # Def Funciones
  F_conv_nomb () {
    # Función de buscar, renombrar y escribir 3 nombres.
  }
  
  # P.P.
  Fconv_nomb
  ```
* **Comandos de usuario en Bash:**
  * `mkdir`
  * `useradd -m -d $Dir -s /bin/bash "nombre"`
  * **OJO:** `-g "grupo"` (Entrada y la salida del documento de usuarios)
  * `chmod` (para el mkdir)
* **Bucles en Bash (31/10/2024):**
  ```bash
  while IFS= read -r line   # (espacio)
  do
    i=`expr $i + 1`
  done < ${variable}  # -> lee el fichero
  ```
* **Funciones y Redirecciones en Bash (25/11/2024):**
  * En bash las funciones: `nombre function ; function nombre` se lo traga.
  * Para ejecutar: `/sh nombre function .`
  * `2>>` -> salida de errores.
  * `1&2 > /dev/null` -> entrada y salida (1. para que no se escriba en terminal. 2. para la salida de errores).
* **Empaquetado y Procesos:**
  * `tar -cvf / xvf / czvf` -> copias de seguridad
  * `gzip`
  * `ps -ef | tail -n +2` -> Quitar la 1ª línea
* **Monitorización y Variables (28/11/2024 al 30/11/2024):**
  * `sar` / `sysstat`
  * `read -n "$letras"` -> controla el número de caracteres
  * `\0` (Enter)
  * `$#` -> parámetros (1-2)
* **Arrays en Bash:**
  * `echo $?` -> Devuelve error o 0
  * `lista=(uno, dos, tres)` -> Guardar cadena
  * `lista[4]="cuatro"` -> Guardar elemento en su posición
  * `echo ${lista[*]}` -> todos los elementos
  * `echo ${#lista[*]}` -> Nº elementos Total
  * `echo ${#lista[1]}` -> Nº caracteres de X elemento
* **Operaciones IF y Permisos Especiales (05/12/2024):**
  * `if [ -f mm ] || [ ! -z mm ]`
  * `-z` es para saber si la variable esta vacía. Existe el fichero y no está vacío.
  * `IFS` -> cada línea de un read (`while IFS= read -r line`)
  * **Sticky bit** -> se aplican a los directorios (ficheros de log).
  * `Euid` -> Usuario que realmente eres actualmente (Puede ser root u cualquier otro si haces un su...).
  * `Uid` -> Usuario que eres.

## LDAP, Redes y Windows Server
* **Samba y CUPS - Práctica 3 (07/11/2024):** Controlador de dominio secundario del Principal; y en horas de descanso sincronizarlo con el 1º | Por el ancho de BANDA. -> (Red satelital). Securizar Samba, `conf smb.conf`, conf carpetas compartidas, Comprobar en otro equipo, Inst CUPS, conf impresora, Cuotas (`apt install quota`), cuota para con = 1.
* **LDAP (15/11/2024):** Tema 4. Trabaja con la memoria caché. Protocolo Nivel de Aplicación. Basado en LDIF. Open LDAP. `wc -l` -> contar la línea de un fichero.
* **Windows Server (18/11/2024):** ISO: 2022. Nombre Empresa: "FVIOMAT 27Z sistemas". 5 sedes: Madrid Principal, controlador de dominio Barcelona.
* **Redes (VPN y Switch):**
  * La VPN se "contrata con telefónica" y esta se le asigna a un puerto en concreto del switch.
  * **SLA:** contrato de empresa con penalizaciones por errores (Exterior No "IPTables").
  * **SW inside:** servidores (importante).
  * **SW DMZ:** Servidor Web (puede acceder desde el exterior "IPTables").

---

# LOTE 3

## ASO — PowerShell: configuración de red y procesos

### 13/01/2025 — PowerShell

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

### Procesos y servicios

Para consultar procesos aparece una referencia a:

```powershell
Get-Process -Name (nombre)
```

También hay una anotación para conocer cuánto ocupa, con una posible conversión usando `1MB`. **[La expresión completa es dudosa]**.

Propiedades de servicios anotadas:

- `Path`
- `RequiredServices` **[lectura probable]**

Cancelar un apagado programado:

```cmd
shutdown /a
```

## BBDD — PL/SQL: triggers y consultas

### Trigger para `UPDATE`

Estructura anotada:

```sql
CREATE OR REPLACE TRIGGER nombre
BEFORE UPDATE OF campo
ON tabla
FOR EACH ROW
BEGIN

END;
```

El campo que acompaña a `UPDATE OF` no se distingue con seguridad.

### Consultar las tablas del usuario HR

```sql
SELECT *
FROM all_objects
WHERE object_type = 'TABLE'
  AND owner = 'HR';
```

### 11/02/2025 — `ROWNUM`

Consulta anotada:

```sql
SELECT *
FROM nombre_tabla
WHERE ROWNUM ...;
```

Aparecen operadores de comparación `>`, `>=`, `<` y `<=`, relacionados con números. La condición concreta es ilegible.

### `TRUNC`

```sql
TRUNC(x, -1)
```

En el apunte se indica que trunca el valor a las decenas.

Ejemplo:

```text
47 → 40
```

### Sinónimos y funciones

**Sinónimos = alias.**

Esqueleto de función:

```sql
CREATE OR REPLACE FUNCTION nombre (v tipo)
RETURN tipo
IS
    -- Declaraciones de variables
BEGIN

    RETURN v;

END nombre;
```

La línea `RETURN v` es orientativa; el apunte presenta el esquema general.

### 27/01/2025 — Cursores

En la página se citan los esquemas o usuarios `HR`, `USERS`, `TEMP` y `ORACLE_HOME` **[parte del texto es dudosa]**.

Pasos para trabajar con un cursor:

1. Declarar el cursor.
2. Abrir el cursor.
3. Procesar el cursor.
4. Cerrar el cursor.

Estructura aproximada:

```sql
CURSOR nombre IS
    SELECT ...
    FROM ...
    JOIN tabla USING (campo)
    GROUP BY campo;
```

Abrir:

```sql
OPEN cursor;
```

Obtener datos:

```sql
FETCH cursor INTO variables;
```

Las variables deben tener el tipo correspondiente a los datos recibidos; se menciona `%TYPE`.

Procesar:

```sql
LOOP
    ...
    EXIT WHEN ...;
END LOOP;
```

Cerrar:

```sql
CLOSE cursor;
```

Atributos de cursores:

- `%ISOPEN`: indica si el cursor está abierto.
- `%NOTFOUND`: verdadero cuando no se encuentran más filas.
- `%FOUND`: verdadero cuando se ha encontrado una fila.
- `%ROWCOUNT`: contador de filas procesadas.

### 28/01/2025 — Tipos y procedimientos

Para ver la estructura de una tabla:

```sql
DESC nombre_base_de_datos.tabla;
```

Tipo de una variable según una columna:

```sql
nombre_variable tabla.campo%TYPE;
```

Lanzar un procedimiento:

```sql
EXEC nombre(parametros);
```

### 04/02/2025

```sql
MOD()
```

En la hoja aparece relacionado con `%`.

```sql
%ROWCOUNT
```

Número de filas procesadas por el cursor.

## ASO — Bash: scripts, parámetros y filtros

### 23/01/2025

Repasar script de contraseñas y de autorizaciones en Bash.

- Las GPO no se aplican a los administradores. **[Así está resumido en el apunte]**.

### 03/02/2025

Puerto RDP `3389` para la sesión gráfica al conectarse de forma remota.

### 06/02/2025 — Parámetros y `case`

Todos los parámetros:

```bash
$*
```

Cantidad de parámetros:

```bash
$#
```

Estructura anotada:

```bash
case $opcion in
    "-m")
        mkdir ...
        exit 0
        ;;
    "-m")
        ...
        exit 0
        ;;
    *)
        exit
        ;;
esac
```

En la foto parece repetirse `"-m")`, pero puede tratarse de otra opción. **[Revisar]**.

### Filtros con `awk`

Ejemplos incompletos de la hoja:

```bash
... | awk 'length($9) > 9 { print ... }'
```

```bash
cat /etc/group | awk 'NF > 2 { print ... }'
```

`NF` → número de campos.

**12/12/2024 — Saltos y tabulaciones**

```bash
echo -e "\n"
```

Nueva línea.

```bash
echo -e "\t"
```

Tabulación.

**16/12/2024 — Parámetros**

```bash
$*
```

Todos los parámetros.

```bash
$#
```

Cantidad de parámetros.

Comprobar ficheros en tiempo real:

```bash
tail -f
```

---

# LOTE 4

## Ficheros Temporales (10/02/2025)
* `head -1 fichero > fichero_temporal.txt`
* `grep mm fichero >> fichero_temporal.txt`
* `echo fichero_temporal.txt`
* `rm`
* **USAR Ficheros Temporales.**
* **Linux:** `du -s * | sort -n` (Buscar ficheros y ordenarlos por Tamaño)
* **Windows:** `Get-ChildItem -Recursive -Path C:\ | Sort-Object -Descending -Property length | Select-Object -First 5`

## Redes y Servicios (RA 4)
* **DHCP (Servidor -> Cliente)**
  * **Puertos:** 67 - 68
  * Como Root: `apt install isc-dhcp-server`, Configuración: `/etc/dhcp/dhcpd.conf`, `systemctl stop/start isc-dhcp-server`
  * Estructura de conf: `subnet - netmask - { range - - ; option routers - .1; option domain-name-servers 8.8.8.8, 8.8.4.4; }`
* **SSH**
  * **Puerto:** 22
  * `apt install openssh-server`
  * Para conectarse: `nombreusuario@ip`
  * Generar clave: `ssh-keygen -t rsa -b 4096`

## Seguridad y Cortafuegos
* **IP tables:** Netfilter es parte de IP tables
  * `iptables -A INPUT -s ip -j DROP` (Entrada)
  * `iptables -A OUTPUT -s ip -j DROP` (Salida)
  * `iptables -A INPUT -p tcp --dport 22 -j DROP`
  * `iptables -A INPUT -s ip/24 -j DROP`
  * `iptables -L -v`
* **Encriptación:**
  * **Simétrica:** 1 clave para cifrar y para descifrar
  * **Asimétrica:** 1 clave pública y otra privada
  * **Hashing:** Usando un algoritmo matemático se vuelve irreversible
  * `gpg -c archivo.txt` (encriptar)
  * `gpg -d archivo.txt` (desencriptar)

## Oracle - Conceptos y Tablas (05/11/2024)
* **Tablas más usadas:**
  * **Tablas Base:** Almacena información de la BD (NO TOCAR)
  * **Vistas (Estáticas)**
  * **Vistas Dinámicas (Tiempo Real)**
* Comando de formato: `col name format A10;`
* **Protocolos:**
  * **Protocolo BEQ:** conexión en la misma máquina.
  * **SQL*NET:** framework de red para conectar cliente al servidor.
  * **Protocolo PGA:** conexión remota al servidor.
* **Archivos de red (Ruta: `/opt/oracle/product/19c/dbhome_1/network/admin`):**
  * Puerto por defecto: `1521`
  * `listener.ora` -> servidor
  * `tnsnames.ora` -> cliente y servidor
  * `sqlnet.ora` -> cliente y servidor (A no ser que los 2 ficheros anteriores estén mal, NO TOCAR)
* `LSNRCTL` -> se ejecuta como usuario normal

## Oracle - Almacenamiento (18/11/2024 - 19/12/2024)
* **Jerarquía:** Unidad más pequeña es el **Bloque**. Si están continuos en memoria son **extensiones** y estas en **segmentos**.
* **Tablespace:** concepto lógico agrupación de ficheros y pueden estar en varios discos. Una tabla se encuentra en un Tablespace pero puede estar en varios ficheros que están dentro del tablespace.
* **Bloque:** Consta de Cabecera, Libre y Datos. Oracle pregunta a la cabecera, se busca el bloque completo.
* **Vistas de almacenamiento:** `DBA_TABLESPACES`, `DBA_DATA_FILES`, `DBA_TEMP_FILES`, `DBA_FREE_SPACE`, `V$DATAFILE`, `V$TEMPFILE`.
* **Tipos de Tablespaces Internos:**
  1. `system`: No tocar; tablas internas
  2. `sysaux`: No tocar; ayuda al anterior
  3. `undotbs`: No tocar; tema de recovery
  4. `temp`: No tocar; almacena agrupaciones, etc.
  5. `user`: lo creamos nosotros
* **Creación de Tablespaces (19/12/2024):**
  * `Alter session set "_oracle_script"=true;`
  * `Grant dba to "usuario";`
  * Conectarte como usuario creado: `sqlplus FRANVI/FRANVI1`
  * Mirar la IP en `/etc/hosts`
  * Sintaxis: `Create tablespace "nomb" datafile "ruta" size "tamaño"`

---

# LOTE 5

## BBDD — Oracle: roles, perfiles, usuarios y PL/SQL

### Roles

- Los roles agrupan privilegios y otros permisos.
- `DBA`: referencia a los roles de administración.
- Los roles y privilegios se pueden activar y desactivar.

Hay una anotación sobre privilegios de `SELECT`, `UPDATE` y `DELETE`, pero no se distingue completamente.

### Perfiles

Los perfiles permiten limitar el uso de algunos recursos.

En el apunte aparece una posible opción `PASSWORD_LIMIT = TRUE`. **[Lectura dudosa; comprobar contra la imagen]**.

Estructura anotada:

```sql
CREATE PROFILE nombre LIMIT
    ...;
```

Asociar un perfil a un usuario:

```sql
CREATE USER nombre
IDENTIFIED BY contraseña
PROFILE perfil;
```

### Conexión

```sql
CONNECT nombre_usuario;
```

Anotación: SQL Plus.

### 14/01/2025 — Conceptos

**Bloque:** trozo de código que no se almacena y que se ejecuta; sin nombre.

**Programa:** conjunto de bloques; sí se almacena.

**Función:** programa que devuelve un valor. En el apunte aparece «siempre».

**Procedimiento:** programa que no devuelve un valor; se puede almacenar en una variable y luego mostrarla. **[Definición resumida en la hoja]**.

**Trigger:** programa que se ejecuta cuando ocurre una situación o evento en el sistema.

**Paquete:** conjunto de procedimientos y funciones.

### 20/01/2025 — Sintaxis PL/SQL

La anotación indica: **«Siempre poner IS, no AS»**.

Comentarios de una línea:

```sql
-- Comentario
```

Comentarios de varias líneas:

```sql
/*
Comentario
*/
```

Asignación:

```sql
:=
```

También se anota `DEFAULT` con una advertencia. **[Contexto insuficiente]**.

Escribir por pantalla:

```sql
DBMS_OUTPUT.PUT_LINE(v);
```

Tipo de una variable según una columna:

```sql
%TYPE
```

La anotación indica que hereda el tipo definido en la tabla, pero no la restricción `NOT NULL`.

Fecha del sistema:

```sql
SYSDATE
```

También aparece una referencia a `FROM sys.dual`.

Activar salida por pantalla:

```sql
SET SERVEROUTPUT ON;
```

Concatenar:

```sql
||
```

Número aleatorio:

```sql
DBMS_RANDOM.RANDOM
```

Línea en blanco:

```sql
DBMS_OUTPUT.NEW_LINE();
```

### 21/11/2024 — Objetos de la base de datos

Se anota que los objetos son elementos dentro de la base de datos.

Aparece una referencia a los tamaños:

- `64K`
- `1M`
- `8M`
- `64M`

También aparece `Uniform size 1M`, asociado a valores o extensiones definidos para el usuario. **[Texto dudoso]**.

### 25/11/2024 — Tablespaces y almacenamiento

El tablespace se relaciona con la gestión y almacenamiento de datos. En un esquema se distinguen los tipos `local` y `dictionary` **[lectura probable; confirmar]**.

### 02/12/2024 — Tablas y espacio

Anotaciones sobre crear una tabla en un espacio (tablespace), indicar nombre y ubicación, y el crecimiento del almacenamiento. Parte del texto no se distingue.

### 03/12/2024 — `DBA_FREE_SPACE`

Se destaca el término:

```text
DBA_FREE_SPACE
```

La nota indica que muestra información sobre el espacio libre de una tabla o tablespace. **[Interpretación del apunte; validar el contexto original]**.

### 16/12/2024 — Usuarios y esquemas

En la hoja se citan:

- `SYS`
- `SYSTEM`
- Un tercer usuario **[ilegible]**.

**Esquema:** conjunto de objetos que pertenecen a un usuario.

**Perfil:** conjunto de restricciones o políticas que se asignan a un usuario. **[Definición manuscrita parcialmente dudosa]**.

### Bloqueo de usuarios

Aparecen `DBA_USERS` y la columna `ACCOUNT_STATUS`.

Bloquear un usuario:

```sql
ALTER USER usuario ACCOUNT LOCK;
```

Desbloquearlo:

```sql
ALTER USER usuario ACCOUNT UNLOCK;
```

Caducar la contraseña:

```sql
ALTER USER usuario PASSWORD EXPIRE;
```

La anotación indica que el usuario deberá cambiar la contraseña en la siguiente sesión.

### Privilegios de objeto — 17/12/2024

Estructura habitual anotada para conceder privilegios:

```sql
GRANT privilegio
ON esquema.tabla
TO usuario;
```

Retirar privilegios:

```sql
REVOKE privilegio
ON esquema.tabla
FROM usuario;
```

Se mencionan permisos como `SELECT`, `UPDATE` y `DELETE`.

### 14/01/2025 — Tablespaces

Crear un tablespace:

```sql
CREATE TABLESPACE nombre
DATAFILE '/ruta'
SIZE n;
```

Cambiar a solo lectura:

```sql
ALTER TABLESPACE nombre READ ONLY;
```

Cambiar a lectura y escritura:

```sql
ALTER TABLESPACE nombre READ WRITE;
```

Crecimiento automático del archivo de datos:

```sql
ALTER DATABASE DATAFILE '/ruta'
AUTOEXTEND ON
NEXT 256K
MAXSIZE 2M;
```

Mover un tablespace:

1. Ponerlo fuera de línea:

   ```sql
   ALTER TABLESPACE nombre OFFLINE;
   ```

2. Mover el archivo:

   ```bash
   mv /ruta1 /ruta2/
   ```

3. Actualizar la ruta registrada:

   ```sql
   ALTER TABLESPACE nombre
   RENAME DATAFILE '/ruta1'
   TO '/ruta2';
   ```

4. Ponerlo en línea:

   ```sql
   ALTER TABLESPACE nombre ONLINE;
   ```

Cambiar tamaño:

```sql
ALTER DATABASE DATAFILE '/ruta'
RESIZE n;
```

Añadir un archivo:

```sql
ALTER TABLESPACE nombre
ADD DATAFILE '/ruta'
SIZE n;
```

---

# LOTE 6

## PL/SQL - Control de Flujo (21/01/2025)
* `merge` -> Inserta y Actualiza
* **CASE:** El valor que devuelve se debe almacenar siempre en una variable.
  ```sql
  v := case v_2
    when 'x' then 'x'
    when 'y' then 'y'
    else 'error'
  end;
  ```
* **LOOP:** Mínimo se ejecuta 1 vez. Se le pueden asignar etiquetas.
  ```sql
  << mi_bucle >>
  loop
    -- instrucciones
  end loop << mi_bucle >>
  ```
* **WHILE:** Se ejecuta 0 o n veces. (No se le pone etiquetas)
  ```sql
  while condición loop
    -- instrucciones
  end loop;
  ```
* **FOR:** (Se pueden poner etiquetas)
  ```sql
  for x in select dni, nombre from alumnos
  -- x actúa como un registro con los tipos de la select
  ```
  * Se usa `%rowtype`

## PL/SQL - Secuencias
* Nunca van hacia atrás siempre hacia delante
  ```sql
  create sequence nombre
  increment by n
  start with n
  maxvalue n ;
  ```
* Consultar valores: `select nombre.nextval/currval from dual;` (`nextval` = Siguiente Valor, `currval` = Valor actual)

## Oracle - Administración de Instancia (28/10/2024 - 29/10/2024)
* En terminal `export CV_ASSUME_DIS`
* Para la práctica de Debian y Rocky = `OEL7.8`
* Ruta: `$ORACLE_HOME/dbs` (Se deben encontrar los ficheros `spfile.ora` y el `init.ora`)
* **Tipos de Parada:**
  * `Normal`: Espera a que termine la sesión
  * `Immediate`: Termina todas las transacciones y cierra
  * `Transactional`: Espera que terminen las transacciones y cierra
  * `Abort`: Cierra todo.
* **Parámetros de Sesión/Sistema:**
  * `Alter system` -> cambios permanentes
  * `Alter session` -> cambios en la sesión
  * `Nombre_usu` -> siempre Mayúscula
  * `contraseña_user` -> key sensitive
  * `alter session set "_ORACLE_SCRIPT"=TRUE`
  * Comandos de visualización: `show parameter` o `select * from v$parameter`
  * Diferencia: `v$PARAMETER` (Valores en Tiempo Real) != `v$SPPARAMETER` (Valores Base)

## Oracle - Perfiles, Usuarios y Roles
* **Perfiles:**
  * Activar: `Alter system set Resource_limit = True;`
  * Crear: `create profile "nombre" limit sessions_per_user (n) | connect_time (n) ...`
  * Asignar: Al crearlo (`create user "nomb" identified by "contra" profile "perfil";`) o modificando (`alter user "nombre" profile "nombre";`)
  * Ver parámetros: `select * from DBA_Profiles where profile = "nombre";`
  * Desbloquear: `Alter user "nombre" account [lock|unlock];`
  * Eliminar: `Drop profile "nombre" [cascade];`
* **Usuarios:**
  * `Create user nombre identified by "contra"`
  * Opciones: `default tablespace "nombre"`, `temporary tablespace "nombre"`, `quota (n|K|M|unlimited) on "nombre"`, `profile "nombre";`
* **Roles y Privilegios:**
  * Crear Rol: `create role "nombre";`
  * Asignar: `Grant create table to "nombre_rol";` (Sistema: view, user / Objetos: select, insert, update, delete `on tabla.campo to "nombre";`)
  * Quitar: `Revoke (priv) from "n_rol";` / `Revoke (n_rol) from "usuario";`
  * Eliminar Rol: `Drop role "nombre_rol";`
* **Vistas del Diccionario:**
  * `DBA_`: Todos los objetos del sistema
  * `ALL_`: Objetos a los que tengo acceso
  * `USER_`: Mis objetos
  * `V$`: Vistas dinámicas
  * `GV$`: Vistas globales

## Servidor Linux - SAMBA y CUPS (21/11/2024)
* **Instalación SAMBA:** `apt update && apt upgrade -y`, `apt install samba-client`, `apt install samba-common-bin`, `systemctl status smbd`, `smb -version`
* **IP tables/firewall:** `ufw status`, `ufw enable`, `ufw app list`, `ufw app allow samba`
* **Preparar partición/carpeta:** `lsblk`, `mkdir /home/"carpeta"`, `fdisk /dev/sda`, `lsblk`, `mkfs -t ext4 /dev/sda5`, `nano /etc/fstab` (`/dev/sda5 /home/"carpeta" ext4 defaults 0 1`), `df -Kh`
* **Usuario y carpeta compartida:** `groupadd sambashare`, `chgrp sambashare /home/"carpeta"`, `chmod 750 -R /home/"carpeta"`, `usermod -aG sambashare "usuario"`, `smbpasswd -a "usuario"`
* **Configuración SAMBA (`/etc/samba/smb.conf`):**
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
* **Comprobar SAMBA:** `systemctl restart smbd`, `systemctl status smbd`
* **CUPS:**
  * `apt install cups-client`
  * Acceder desde navegador: `ip:631`
  * Config impresoras: `lpadmin -p "n.impresora" -E`
  * Añadir a `smb.conf`:
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

## Servidor Linux - Cuotas
* `apt install quota`
* `apt install quotatool`
* `find /lib/modules/'uname -r' -type f -name '*quota_v.ko*'`
* `cp /etc/fstab .20211201`
* `nano /etc/fstab` (cambiar el default por `"usrquota,grpquota"`)
* `mount -o remount /home`
* `quotacheck -ugm /home`
* `mkdir /home/aquota.user`
* `mkdir /home/aquota.group`
* `quotaon /home`
* `edquota -u "usuario"`
* `setquota -u "usuario" 200M 200M 0 0 /home`
* Comando de testeo: `dd if=/dev/zero of=/home/"usuario"/file bs=1M count=400`
* `quotaoff -v /home`

---

# LOTE 7

## BBDD — Arquitectura y funciones de un SGBD

### Big Data, dato e información

**Big Data:** conjunto de información de diversas fuentes que no están relacionadas unas entre otras.

**Dato:** un valor en crudo.

**Información:** información que completa la descripción de un dato.

### Sistemas orientados a los procesos (SOP)

Los SOP leen los datos de un fichero, pero no se conoce la estructura de ese fichero. Esto puede provocar errores si el código no se define correctamente.

Ventaja indicada: los procesos de las aplicaciones son independientes de los datos; si uno cambia, no afecta al resto.

**Inconvenientes:**

- Datos redundantes.
- Datos inconsistentes.
- Coste de almacenamiento elevado por duplicación de datos.
- Difícil acceso a datos para consultas no previstas, porque hay que editar el código de la aplicación.
- Dependencia física: se debe conocer cómo se almacenan los datos.
- Tiempo de proceso elevado.
- Dificultad para acceso simultáneo: dos usuarios no pueden acceder a los mismos datos a la vez.

### Sistemas orientados a los datos (SOD)

Permiten leer y editar datos sin conocer la estructura de los ficheros, ya que los datos se almacenan en una estructura lógica.

**Ventajas:**

- Independencia de los datos y programas respecto a los procesos.
- Menor redundancia.
- Integridad de los datos.
- Mayor seguridad al limitar el acceso de los usuarios.
- Datos más documentados mediante metadatos.
- Acceso más eficiente.
- Menor espacio de almacenamiento.
- Acceso simultáneo a los datos.

**Desventajas:**

- Instalación costosa.
- Requiere personal cualificado.
- Implantación larga y difícil.
- Ausencia de estándares reales.

### Fichero, base de datos y SGBD

**Fichero o archivo:** conjunto de información relacionada, tratada y organizada de forma estructurada. Están formados por registros lógicos y físicos. **[La definición manuscrita de registro lógico/físico es confusa y necesita revisión]**.

**Base de datos:** conjunto estructurado de datos que representan entidades y sus interrelaciones.

**SGBD:** software que permite procesar, describir, administrar y recuperar datos en una base de datos. Debe mantener su seguridad e integridad.

Funciones/herramientas relacionadas:

- Creación y especificación de los datos.
- Administración y creación de la estructura física.
- Manipulación de los datos.
- Recuperación.

### Sistema de información: puntos de vista

- **Vista externa:** la tienen los usuarios del sistema.
- **Vista física:** forma en la que se almacenan los datos.

### Esquemas

- **Esquema interno:** representa cómo se almacenan los datos; esta visión solo la posee el administrador.
- **Esquema conceptual:** esquema teórico de los datos del mundo real; primer paso para crear una base de datos.
- **Esquema externo:** visión de los usuarios del sistema, obtenida a través de las aplicaciones.

### Funciones de un SGBD

**Descripción:** permite crear las estructuras necesarias para introducir los datos. Se realiza mediante DDL.

**Manipulación:** permite modificar y usar los datos. Se realiza mediante DML; las consultas se relacionan con DQL.

**Control:** proporciona mecanismos para proteger los datos. Se realiza mediante DCL.

### Componentes de un SGBD

- **Procesador de consultas:** transforma sentencias SQL en instrucciones de bajo nivel.
- **Gestor de la base de datos:** recibe peticiones de usuarios, las procesa y realiza los procedimientos necesarios.
- **Gestor de ficheros:** gestiona el acceso físico a los ficheros en disco y se comunica con el sistema operativo.
- **Interfaces externas:** permiten la conexión de usuarios y aplicaciones. Ejemplos: ODBC y JDBC.
- **Preprocesador del lenguaje de manipulación de datos:** traduce instrucciones descritas en otros lenguajes a uno legible para el SGBD.
- **Compilador del lenguaje de definición de datos:** convierte sentencias DDL en un conjunto de tablas con metadatos.

### Estructura multicapa

- **Facilidades de usuario:** herramientas para facilitar el acceso a los datos.
- **Capa de acceso a datos:** comunica las aplicaciones de los usuarios con el diccionario de datos.
- **Diccionario de datos:** contiene metadatos y traduce las instrucciones para que el esquema interno pueda entenderlas.
- **Núcleo:** traduce las instrucciones para que el sistema operativo pueda interpretarlas y acceder a los datos.
- **Sistema operativo:** es el único capaz de acceder físicamente a los datos.

### Funcionamiento de un SGBD

1. El proceso es lanzado por el SGBD.
2. El SGBD traduce las instrucciones y comprueba permisos.
3. Obtiene el esquema físico.
4. Traduce los métodos de acceso para que el sistema operativo obtenga los datos del disco.
5. El sistema operativo accede a los datos.
6. Los datos se transfieren al *buffer* y se almacenan ahí.
7. Los datos pasan del *buffer* al usuario final.
8. Si hay un error, el SGBD lo comunica al usuario.

### Estructuras operacionales

**Cliente-servidor:** la base de datos se aloja en un servidor y el cliente se conecta mediante aplicaciones que envían instrucciones.

**Cliente-multiservidor:** los datos no se encuentran en un único servidor. Un servidor de aplicaciones traduce las instrucciones y las envía a los distintos servidores.

**Cliente-servidor con facilidades de usuario:** los clientes se conectan a un intermediario que facilita la comunicación con el servidor.

### Tipos de SGBD

**Modelos conceptuales:**

- Entidad-relación.
- RM/T.
- Semánticos.

**Modelos lógicos:**

- **Relacional:** almacena los datos en tablas compuestas por filas y columnas/campos.
- **CODASYL.**
- **Jerárquico:** organiza los datos en árbol, con un padre y uno o varios hijos; está en desuso.

**Modelo orientado a objetos:** diseña estructuras con atributos en los que se definen procedimientos.

**Modelo objeto-relacional:** híbrido entre el modelo relacional y el orientado a objetos.

### Problemas del modelo relacional

- **Poca flexibilidad de representación:** el apunte indica que los elementos de una tabla deben tener el mismo número de filas y columnas. **[La explicación podría estar formulada de manera imprecisa en el original]**.
- **Poca escalabilidad:** se anota un límite finito de crecimiento de la base de datos.

### Sistemas NoSQL

**NoSQL (Not Only SQL).**

- Distribución de los datos.
- Manejan datos no estructurados o sin estructura fija.
- Evitan operaciones almacenando datos desnormalizados.
- Se basan en el teorema de consistencia, disponibilidad y tolerancia a fallos.

Ejemplos anotados: MongoDB, Redis, Amazon DynamoDB y Microsoft Azure.

### Funciones de un DBA

- Crear y administrar los esquemas de la base de datos.
- Administrar la seguridad.
- Realizar copias de seguridad periódicas.
- Controlar el espacio de los discos.
- Vigilar la integridad de los datos.
- Observar la evolución y el rendimiento del sistema.
- Asesorar a programadores y usuarios.
- Cambiar el diseño físico para mejorar el rendimiento.
- Resolver emergencias.

### Elección de un SGBD

- **Usabilidad:** facilidad de uso del SGBD.
- **Seguridad:** evitar que los datos almacenados se vean comprometidos.
- **Funcionalidad:** los módulos deben cumplir los requisitos empresariales.
- **Integración:** compatibilidad con otros sistemas, tanto en la actualidad como en el futuro.
- **Escalabilidad:** capacidad para crecer con los datos y la empresa.

### Transacciones — Propiedades ACID

- **Atomicidad:** todo o nada; se deben realizar las operaciones completas de una transacción.
- **Consistencia:** la base de datos debe mantener la integridad de los datos.
- **Aislamiento:** una operación no debe afectar a otra operación concurrente dentro de la misma base de datos.
- **Durabilidad:** los cambios confirmados deben persistir en el sistema.

## Control de versiones — Manual de Git

### Configuración

```bash
git config --global user.name "nombre-usuario"
git config --global user.email "email-usuario"
git config --list
```

Los dos primeros comandos configuran el nombre y el correo del usuario. El tercero muestra la configuración.

### Inicializar y clonar repositorios

```bash
git init "nombre-repositorio"
git clone "url-repositorio"
```

### Añadir archivos

```bash
git add "fichero"
git add "carpeta"
git add .
```

Añaden archivos a la zona de preparación (*staging area*).

### Commits

```bash
git commit -m "mensaje"
git commit --amend -m "mensaje"
```

El primero crea un *commit* con un mensaje. El segundo modifica el último *commit*.

Flujo anotado:

```text
WORKING DIRECTORY --git add--> STAGING AREA --git commit--> REPOSITORY
```

### Estado e historial

```bash
git status
git log
git log --oneline
git log --graph
git show
git annotate
```

- `git status`: muestra el estado del repositorio.
- `git log`: historial de *commits*.
- `git log --oneline`: historial compacto.
- `git log --graph`: historial en forma de grafo.
- `git show`: información del último *commit*.
- `git annotate`: muestra el contenido de un fichero con información de los *commits* que afectaron a sus líneas.

### Diferencias entre versiones

```bash
git diff
git diff --cached
git diff HEAD
```

- `git diff`: diferencias entre el directorio de trabajo y la zona de preparación.
- `git diff --cached`: diferencias entre la zona de preparación y el último *commit*.
- `git diff HEAD`: diferencias entre el directorio de trabajo y el último *commit*.

### Checkout y reset

```bash
git checkout "commit"
git checkout "rama"
git checkout -b "rama"
```

Las dos últimas formas permiten cambiar a una rama o crear y activar una rama nueva. La primera puede cambiar a un *commit* concreto.

```bash
git reset -- "fichero"
git reset --hard "commit"
git reset "commit"
```

- `git reset -- fichero`: retira el fichero de la zona de preparación sin descartar necesariamente los cambios del directorio de trabajo.
- `git reset --hard commit`: restablece el estado al *commit* y puede descartar cambios locales; usar con precaución.
- `git reset commit`: actualiza `HEAD` y mueve la referencia de la rama según el modo usado.

### Ramas

```bash
git branch "nombre"
git branch
git checkout -b "rama"
git merge "rama"
git rebase "rama1" "rama2"
git branch -d "rama"
git branch -D "rama"
```

- `git branch nombre`: crea una rama.
- `git branch`: muestra las ramas.
- `git checkout -b rama`: crea y activa una rama.
- `git merge rama`: integra los cambios de la rama indicada en la rama actual.
- `git rebase rama1 rama2`: reorganiza los commits de una rama sobre otra base.
- `git branch -d rama`: elimina una rama fusionada.
- `git branch -D rama`: fuerza la eliminación de una rama.

### Repositorios remotos

```bash
git remote add "repositorio-remoto" "url"
git remote
git remote -v
```

Añadir un remoto y consultar los remotos configurados y sus direcciones.

### Descargar y subir cambios

```bash
git pull "remoto" "rama"
git fetch "remoto"
git push "remoto" "rama"
```

- `git pull`: descarga e integra cambios.
- `git fetch`: descarga referencias y cambios del remoto sin integrarlos automáticamente en la rama actual.
- `git push`: sube los cambios de la rama local al remoto.

---

# Índice temático preliminar

| Asignatura / bloque | Contenidos principales | Lotes identificados |
|---|---|---|
| IAW — Implantación de Aplicaciones Web | Apache, VirtualHost, PHP, Joomla, WordPress, Django, RSS, módulos y plantillas | 1 |
| ASO — Administración de Sistemas Operativos | PowerShell, red, procesos, servicios, Linux, Bash, scripts, permisos, archivos temporales, RDP, DHCP, SSH, firewall, Samba, CUPS, cuotas, LDAP, Windows Server y VPN | 2, 3 y 4; algunos contenidos relacionados en 6 |
| Programación / Python | Funciones, parámetros, `print` y cadenas formateadas | 2 |
| BBDD — Fundamentos de SGBD | Big Data, dato e información, SOP/SOD, arquitectura, componentes, modelos, NoSQL, DBA y ACID | 7 |
| BBDD — Oracle / PL-SQL | Tablas y vistas, red Oracle, tablespaces, almacenamiento, usuarios, roles, perfiles, privilegios, triggers, funciones, procedimientos, cursores, secuencias, control de flujo y administración de instancia | 3, 4, 5 y 6 |
| Control de versiones | Git, commits, ramas, repositorios remotos, merge, rebase, pull/fetch/push | 7 |

---

# Pendientes de revisión

1. Contrastar con las fotografías originales las lecturas dudosas de los lotes 1, 3, 5 y 7, especialmente los comandos incompletos, rutas, opciones y fragmentos tachados.
2. Revisar los comandos transcritos desde el texto de los lotes 2, 4 y 6 frente a sus apuntes originales si se necesita fidelidad literal.
3. Separar, en una futura versión didáctica, la transcripción del manuscrito de las posibles correcciones técnicas. No corregir silenciosamente comandos que parezcan incorrectos.
4. Confirmar la asignatura oficial de cada bloque mixto con el criterio del centro; la clasificación de este índice es temática y provisional.
