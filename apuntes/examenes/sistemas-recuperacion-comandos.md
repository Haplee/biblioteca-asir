---
title: "Exámenes · Sistemas: recuperación de comandos"
kind: "apunte"
subject: "Exámenes"
order: 3
summary: "Diez ejercicios de recuperación de comandos de Linux resueltos con find, grep, awk, cut, tr y lspci, con las correcciones de las órdenes que no funcionaban tal como se escribieron."
topics:
  - "Linux"
  - "Bash"
  - "Comandos"
source_batches:
  []
dates:
  - "2023-06-01"
status: "organizado"
---

**Asignatura:** Implantación de Sistemas Operativos (ISO), bloque de comandos de
Linux. **Prueba:** recuperación de junio de 2023.

Cada ejercicio se resuelve con una sola orden. Debajo de cada una, las notas de
corrección: el examen entregado tenía varias que no devolvían lo pedido.

---

## 1. La primera letra que más se repite en un diccionario

> En `/usr/share/dict/spanish` hay un diccionario. Contar cuántas veces se repite la
> primera letra que más aparece.

```bash
cut -c1 /usr/share/dict/spanish | sort | uniq -c | sort -rn | head -1
```

`cut -c1` toma el primer carácter de cada línea, `uniq -c` cuenta ocurrencias
consecutivas y `sort -rn` deja arriba la más frecuente.

## 2. Directorios con al menos tres números en el nombre

> Crear `direc3digit.txt` con los directorios cuyo nombre contenga al menos tres
> números.

```bash
sudo find / -type d -name "*[0-9]*[0-9]*[0-9]*" > direc3digit.txt
```

## 3. Controlador de audio del equipo

> ¿Qué controlador de audio dispone el equipo?

```bash
lspci | grep -i audio
```

`lspci -tv` muestra el árbol de buses y no incluye el nombre del controlador, así que
con `-t` la búsqueda se queda vacía.

## 4. Sesiones abiertas por un usuario

> `auth.log` registra los intentos de acceso. Indicar cuántas sesiones ha abierto el
> usuario `usuario`.

```bash
grep -c 'session opened for user usuario' /var/log/auth.log
```

`grep -c` ya cuenta líneas, no hace falta encadenar `wc -l`. El fichero está en
`/var/log/auth.log`; `cat auth.log` a secas falla si no se está dentro de `/var/log`.

## 5. Tabla ARP en formato interfaz, dirección y MAC

> Crear `arp.txt` con la tabla ARP, mostrando solo interfaz, dirección y MAC.

```bash
arp -n | awk -F' +' 'NR > 1 { print $5 ";" $1 ";" $3 }'
```

`awk` con `-F' +'` separa por espacios múltiples, así que las columnas no se
desplazan cuando falta la dirección MAC. `NR > 1` salta la cabecera: sin él, la
primera línea del fichero es el título de la tabla y no un dispositivo.

## 6. Películas de más de 150 KB

> Nombre de todos los ficheros con extensión `avi`, `mpg` o `mp4` y tamaño mayor de
> 150 KB.

```bash
sudo find / -type f -size +150k \( -name "*.avi" -o -name "*.mpg" -o -name "*.mp4" \)
```

Los paréntesis escapados son obligatorios: sin ellos, el `-o` parte la expresión y
el filtro de tamaño solo se aplica a la primera extensión.

## 7. Sustituir todas las vocales por una letra

> Un fichero contiene una frase. Mostrarla sustituyendo todas las vocales por `u`.

```bash
tr 'aeiouAEIOU' 'uuuuuuuuuu' < cancion.txt
```

`tr` trabaja carácter a carácter: el segundo conjunto debe tener la misma longitud
que el primero. Con `tr '[aeio]' 'u'` no se sustituye nada, porque `tr` no interpreta
rangos entre corchetes como una expresión regular.

## 8. Directorios ocultos del home con su número de ficheros

> Crear `ocultos.txt` en la raíz del árbol con los directorios ocultos del home y
> cuántos ficheros contiene cada uno.

```bash
for d in ~/.[!.]*/; do
  printf '%s %s\n' "$(find "$d" -maxdepth 1 -type f | wc -l)" "$d"
done > ~/ocultos.txt
```

## 9. Intérpretes disponibles con awk

> En `/etc/shells` están los intérpretes del sistema. Mostrar solo el nombre del
> intérprete, usando `awk` con `$NF`.

```bash
awk -F/ '!/^#/ && NF > 1 { print $NF }' /etc/shells
```

## 10. Tipo de los ficheros regulares del home

> Mostrar el tipo de archivo de todos los ficheros regulares de `/home/usuario`.

```bash
find /home/usuario -type f -exec file {} \;
```

---

## Correcciones respecto al examen entregado

- **Ejercicio 1:** la orden no aparecía resuelta, solo el enunciado.
- **Ejercicio 3:** `lspci -tv | grep -wi audio` usa `-w`, que exige palabra completa,
  y `lspci -t` no imprime el nombre del dispositivo.
- **Ejercicio 4:** `cat auth.log` depende del directorio actual; el fichero vive en
  `/var/log`.
- **Ejercicio 5:** `head -2` deja la cabecera y solo un dispositivo, y `awk` con el
  separador por defecto rompe las líneas con espacios repetidos.
- **Ejercicio 6:** sin paréntesis escapados, `find` solo aplica `-size` a la primera
  extensión.
- **Ejercicio 7:** el fichero se llamaba `cancion.txt` y la orden leía
  `canciones.txt`, además de que `tr` con corchetes no sustituye.
- **Ejercicio 9:** `cut -d '/' -f3 | tail -4` devuelve una parte fija de la ruta, no
  el intérprete; el enunciado pedía expresamente `awk` con `$NF`.

## Qué se practica

- Composición de órdenes con tuberías: `cut`, `sort`, `uniq`, `awk`.
- Precedencia de `find` y por qué `-o` necesita paréntesis.
- Diferencia entre conjunto de caracteres (`tr`) y patrón (sed o expresiones
  regulares).
