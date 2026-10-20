---
title: "ASO · Redes: enrutamiento y DNS"
kind: "apunte"
subject: "ASO"
order: 5
summary: "Protocolos de enrutamiento (RIP v2, OSPF, EIGRP), conceptos de red (ancho de banda, confiabilidad, rendimiento) y DNS: resolución directa e inversa, registros SOA, NS, A, CNAME, PTR y MX, proceso de resolución y herramienta dig."
topics:
  - "Redes"
  - "Redes y servicios"
  - "Enrutamiento"
  - "DNS"
source_batches:
  []
dates:
  []
status: "organizado"
---

**Asignatura:** ASO (Administración de Sistemas Operativos).
**Temas:** protocolos de enrutamiento (RIP v2, OSPF, EIGRP), conceptos de red y DNS
(resolución de nombres, registros, proceso y `dig`).

**Procedencia:** transcripción de fotografías de apuntes de clase, ajena a los 7 lotes.
**Revisión técnica:** 20/10/2026. Los cambios sobre la transcripción se listan en el
«Informe de revisión» final, con sus fuentes: nada se ha corregido en silencio.

---

## Bloque 1. Protocolos de enrutamiento

### 1. RIP v2

- Métrica: número de saltos (hop count) de un router a otro. El máximo es 15 saltos; 16 significa inalcanzable. RIP es un protocolo de tipo distancia-vector.
- Envía su tabla de enrutamiento completa cada 30 segundos (actualización periódica). Además admite actualizaciones disparadas (triggered updates): cuando cambia la topología, anuncia de inmediato solo las rutas afectadas.
- Multicast (grupo 224.0.0.9).
- Fácil de configurar.
- Pocas opciones.
- Split horizon: no anuncia una red por la interfaz por la que la aprendió, evitando bucles y anuncios innecesarios. Por eso "solo usa las rutas necesarias" vale como matiz, no como regla general: la actualización periódica de 30 segundos lleva la tabla completa.

### 2. OSPF

- Métrica de ancho de banda: el coste de cada interfaz se calcula a partir de su capacidad de transmisión (coste = ancho de banda de referencia / ancho de banda de la interfaz).
- Envía paquetes Hello cada 10 segundos en redes broadcast y punto a punto (30 segundos en redes NBMA). Los datos de enrutamiento viajan en LSA: se inundan solo cuando cambia la topología y se refrescan cada 30 minutos.
- OSPF v2 para IPv4 y OSPF v3 para IPv6.
- Usa el concepto de áreas (el área 0 hace de backbone).
- Sin clases: admite VLSM y CIDR.
- Eficaz. Escalable. Seguro (admite autenticación de vecinos y de actualizaciones).

#### 2.1. Componentes de OSPF

Estructuras de datos que crea y mantiene:

- Tabla de vecinos (los vecinos con los que negocia adyacencia).
- Base de datos de estado de enlace (LSDB).
- Tabla de enrutamiento (o de reenvío): las mejores rutas calculadas.

#### 2.2. Mensajes OSPF

Cinco tipos:

- Saludo (Hello).
- Descripción de base de datos (DBD).
- Solicitud de estado de enlace (LSR).
- Actualización de estado de enlace (LSU).
- Acuse de recibo de estado de enlace (LSAck).

#### 2.3. Funcionamiento

- Crea adyacencia con vecinos.
- Intercambia información de estado de enlace.
- Calcula las mejores rutas con el algoritmo SPF (Dijkstra).
- Logra la convergencia.

### 3. EIGRP

- Métrica: ancho de banda y retardo (delay) por defecto; de forma opcional también carga (load) y fiabilidad (reliability).
- Funciona directamente sobre IP (protocolo 88) y usa RTP (Reliable Transport Protocol) para entregar los paquetes de forma fiable; no usa TCP ni UDP.
- Usa 5 tipos de paquetes:
  - Saludo (Hello).
  - Actualizar (Update).
  - Consulta (Query).
  - Respuesta (Reply).
  - Acuse de recibo (Acknowledgment).
- Los paquetes Hello se envían cada 5 segundos por defecto (60 segundos en enlaces de 1.544 Mbps o inferiores).
- Mantiene la tabla de vecinos y la tabla de topología, además de la tabla de enrutamiento común.

### 4. Fragmento sin título de la transcripción

El fragmento sin título del apunte original ("Respuesta. Tiene 2 tablas: vecinos y topologías. Envía enrutamiento cada 10 segundos") parece pertenecer a EIGRP: "Respuesta" es su quinto paquete de red, y sus dos tablas propias son las de vecinos y de topología. Pero hay que matizarlo:

- EIGRP no envía actualizaciones periódicas de la tabla de enrutamiento (solo Hello periódicos y actualizaciones cuando algo cambia), y su Hello es cada 5 segundos, no cada 10.
- El intervalo de 10 segundos corresponde al Hello de OSPF.

Conviene comprobar la foto original antes de memorizar ese dato.

---

## Bloque 2. Conceptos básicos de redes

### 5. Definir conceptos

#### Ancho de banda

La cantidad de datos que se pueden transmitir a través de una red en un momento dado.

#### Confiabilidad

La capacidad de una red para funcionar sin errores ni interrupciones.

#### Rendimiento

La cantidad de datos procesados y transmitidos con éxito a través de la red.

---

## Bloque 3. DNS: resolución de nombres

### 6. Tipos de resoluciones

#### Resolución directa

Un cliente realiza una consulta sobre un nombre y recibe una dirección IP. Es la que suele usarse por defecto en la resolución de nombres.

#### Resolución indirecta (resolución inversa)

El cliente solicita un nombre a partir de una dirección IP. Se publica con registros PTR dentro de las zonas inversas `in-addr.arpa` (IPv4) e `ip6.arpa` (IPv6). Se utiliza principalmente en aplicaciones de seguridad, como la detección de spam en correos electrónicos o la verificación de emisores fraudulentos.

La resolución directa es fundamental para el funcionamiento de un servicio DNS, mientras que la resolución inversa es opcional pero recomendable para mejorar la seguridad y autenticación en línea.

---

### 7. Tipos de registro DNS

Las zonas con los espacios de nombres se almacenan en una base de datos formada por uno o más ficheros llamados registro de recursos (RR) y se pueden alojar en uno o más servidores DNS.

#### 7.1. Comentarios

Comienzan con punto y coma (`;`) e incluyen notas aclaratorias sobre el fichero.

#### 7.2. Directivas

Especifican ciertos aspectos del RR. Comienzan con el símbolo del dólar (`$`).

##### `$ORIGIN`

Define el nombre de dominio que será incluido al final de cualquier nombre que se defina en el RR y que no acabe en el punto (`.`).

Esta directiva no es obligatoria y, si se omite, se tomará como valor la cadena especificada en la sección de la zona del fichero:

`/etc/bind/named.conf`

##### `$TTL`

Es el valor del *Time to Live* predeterminado para una zona. Está expresado en segundos e indica el tiempo que un RR es válido. Cada registro de recurso puede tener su propio TTL.

#### 7.3. Registros de recursos

Líneas de texto que sirven para definir diversas entidades dentro del dominio. Los más utilizados son:

##### SOA

Registro que define el comienzo de la zona. Debe estar colocado directamente detrás de las directivas y define información importante acerca de la autoridad de los RR para la zona.

Sintaxis:

```text
@ IN SOA <servidor de nombres primario> <email del administrador>
    (<número de serie>
    <tiempo de refresco>
    <tiempo de reintento>
    <tiempo de expiración>
    TTL mínimo)
```

Nota: el email del administrador se escribe sustituyendo la arroba por un punto y terminando en punto, por ejemplo `admin.ejemplo.es.` (en DNS, `admin@ejemplo.es` se escribe `admin.ejemplo.es.`).

##### NS

Registro que define los nombres de los servidores autoritarios para una zona en particular.

Sintaxis:

```text
IN NS <nombre del servidor>
```

##### A

Define y asigna una dirección IPv4 a un nombre.

Sintaxis:

```text
<host> IN A <dirección IP>
```

##### CNAME

Nombre canónico: define un alias que apunta a otro nombre (el nombre canónico), enlazando nombres. El nombre de destino no tiene por qué tener un registro A: puede resolverse con cualquier tipo de registro (A, AAAA, TXT...), menos con otro CNAME. Un nombre con CNAME no debe llevar otros registros (A, MX, TXT...) a la vez.

Sintaxis:

```text
<nombre alias> IN CNAME <nombre real>
```

##### PTR

Define un nombre de dominio para una IP determinada. Vive en las zonas inversas (`in-addr.arpa` / `ip6.arpa`) y, dentro de la zona, solo se escribe la parte de la dirección que la zona no fija (en una red /24, el último octeto):

Sintaxis:

```text
<último octeto> IN PTR <host>.<dominio>.
```

Ejemplo, para `192.168.1.10` en la zona `1.168.192.in-addr.arpa`:

```text
10 IN PTR servidor.ejemplo.es.
```

##### MX

Define un servidor de correo electrónico para el dominio.

Sintaxis:

```text
IN MX <valor preferencia> <nombre servidor email>
```

Donde `<valor preferencia>` indica el orden de preferencia cuando hay varios servidores de correo en la zona: cuanto menor sea el valor, mayor la prioridad (0 es el máximo).

---

### 8. Proceso de resolución DNS

En las fotografías aparece el final del procedimiento, concretamente los pasos 4 a 7. (Los pasos 1 a 3 no se ven; suelen describir la consulta inicial del cliente al servidor DNS local, la comprobación de su caché y, si el dato está ahí, la respuesta directa.)

#### Paso 4

Si el servidor DNS primario no puede proporcionar la respuesta, inicia consultas iterativas recorriendo el árbol jerárquico de nombres hasta encontrar el servidor con la asociación nombre/dirección IP en sus RR. Consulta a los servidores raíz y, si es necesario, al servidor que coordina los TLD.

#### Paso 5

Si se requiere más información, se consulta al servidor que administra el TLD o se identifica quién administra la zona específica.

#### Paso 6

Al recibir la respuesta, se realiza una consulta al servidor DNS que gestiona la zona requerida para obtener la dirección IP correspondiente al nombre consultado.

#### Paso 7

Finalmente, la respuesta se envía al resolver del cliente para que la aplicación pueda utilizarla y empaquetar la información adecuadamente.

---

### 9. Herramienta DIG

*Domain Information Groper* (`dig`) es una herramienta que realiza búsquedas de DNS y muestra las respuestas de los servidores de nombres consultados.

Por defecto, `dig` prueba cada uno de los servidores listados en `/etc/resolv.conf`, a menos que se especifique uno concreto con `dig @servidor`.

Sin argumentos u opciones, `dig` realiza una consulta NS para `.` (la raíz).

Uso típico:

```text
dig @servidor nombre tipo     # consulta a un servidor concreto
dig -x <IP>                   # resolución inversa (registro PTR)
dig +short ejemplo.es         # solo la respuesta
```

`nslookup` (*Name Server Lookup*) es otra herramienta que permite realizar consultas manuales a servidores DNS para resolver nombres de host, útil para solucionar problemas de resolución de nombres y verificar el estado de los servidores. (En la transcripción original, esta frase quedaba dentro de la sección de `dig`; el nombre *Name Server Lookup* corresponde a `nslookup`.)

---

## Informe de revisión

### A. Las 7 observaciones de la transcripción: todas confirmadas

1. **OSPF y el intervalo de 10 segundos: confirmada.** Los 10 segundos son el envío de paquetes Hello (broadcast y punto a punto; 30 s en NBMA), no el anuncio de toda la información de enrutamiento. Las LSA se inundan ante cambios y se refrescan cada 30 minutos. *Cambio aplicado: sección 2, segunda viñeta.*
2. **EIGRP y sus 5 tipos de paquete: confirmada.** Los cinco son Hello, Update, Query, Reply y Acknowledgment. En la foto faltaban dos (Reply y Ack); de hecho, la "Respuesta" que aparece suelta en el punto 4 es el paquete Reply de EIGRP, lo que refuerza que ese fragmento es de la hoja de EIGRP. *Cambio aplicado: sección 3, lista completa.*
3. **Bases de datos de OSPF: confirmada con matiz.** Los tres objetos del apunte coinciden con las tres estructuras estándar (tabla de vecinos, LSDB, tabla de enrutamiento), pero solo la LSDB es propiamente una "base de datos": "base de datos de adyacencia" es la tabla de vecinos y "base de datos de reenvío" es la tabla de enrutamiento. *Cambio aplicado: sección 2.1 con terminología habitual.*
4. **CNAME: confirmada.** Un CNAME apunta a otro nombre y el destino no exige un registro A: puede resolverse con A, AAAA, TXT... (nunca con otro CNAME). *Cambio aplicado: sección 7.3, registro CNAME.*
5. **Resolución inversa: confirmada.** Los PTR viven en zonas inversas `in-addr.arpa` (IPv4) e `ip6.arpa` (IPv6); no existe un fichero de zona llamado "RR reverse". *Cambio aplicado: sección 6 y sintaxis del PTR.*
6. **dig: confirmada, y verificada contra el man page.** `dig` es *Domain Information Groper*; *Name Server Lookup* corresponde a `nslookup`. Además, las dos frases de la sección 9 de la transcripción son correctas según el man page de `dig` (BIND 9): "Unless it is told to query a specific name server, dig will try each of the servers listed in /etc/resolv.conf" y "When no command line arguments or options are given, dig will perform an NS query for '.' (the root)". *Cambio aplicado: sección 9 (aclaración de nslookup y ejemplos de uso).*
7. **RIP v2 y los 30 segundos: confirmada con matiz.** RIP envía la tabla completa cada 30 segundos por defecto; existen las actualizaciones disparadas y el split horizon, pero no significa que solo envíe las rutas necesarias en toda circunstancia. *Cambio aplicado: sección 1.*

### B. Errores adicionales detectados (no señalados en la transcripción)

1. **Métrica de EIGRP** (sección 3): decía "ancho de banda y estado de enlace". Lo correcto es ancho de banda y retardo (delay) por defecto, con carga y fiabilidad opcionales.
2. **"Usa protocolo de transporte"** (sección 3): EIGRP corre directamente sobre IP (protocolo 88) y no usa TCP/UDP; la entrega fiable la hace su propio protocolo RTP.
3. **Métrica de RIP** (sección 1): decía "se basa en la distancia y el número de saltos". La métrica es solo el número de saltos (máximo 15); "distancia" se refiere a que RIP es distance-vector, no a una métrica aparte.
4. **Fragmento del punto 4**: "Envía enrutamiento cada 10 segundos" no encaja con EIGRP (no tiene actualizaciones periódicas y saluda cada 5 s); el de 10 segundos es el Hello de OSPF. "Tiene 2 tablas" sí encaja con EIGRP, que además usa la tabla de enrutamiento común. Ver sección 4.
5. **Sintaxis del PTR** (sección 7.3): en una zona inversa no se escribe la IP completa, sino la parte relativa a la zona (normalmente el último octeto).
6. **Email del SOA** (sección 7.3): va con arroba sustituida por punto y con punto final (`admin.ejemplo.es.`).
7. **MX** (sección 7.3): se añadió que el valor de preferencia menor es el de mayor prioridad.

### C. Fuentes

- `dig(1)` (BIND 9, paquetes dnsutils/bind9-dnsutils de Debian/Ubuntu): comportamiento por defecto de `dig` respecto a `/etc/resolv.conf` y a la consulta NS de `.`.
- RFC 1035 (SOA, NS, A, CNAME, PTR, MX y zonas inversas `in-addr.arpa`).
- RFC 2181 (el destino de un CNAME puede ser cualquier tipo de registro salvo otro CNAME).
- RFC 3596 (zona inversa IPv6 `ip6.arpa`).
- RFC 2453 (RIP v2: actualizaciones cada 30 s, split horizon, triggered updates, multicast 224.0.0.9).
- RFC 2328 (OSPF: mensajes, áreas, LSDB, refresco de LSA cada 30 minutos).
- Documentación técnica de Cisco (CCNA): 5 tipos de paquete de EIGRP, métrica bandwidth+delay, intervalos de Hello (5 s/60 s en EIGRP, 10 s/30 s en OSPF) y tablas de vecinos/topología.
