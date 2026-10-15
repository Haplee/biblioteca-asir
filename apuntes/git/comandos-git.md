---
title: "Control de versiones · Git"
kind: "apunte"
subject: "Git"
order: 1
summary: "Configuración, repositorios, add, commit, estado e historial, diff, checkout/reset, ramas, remotos y descarga/subida de cambios."
topics:
  - "Git"
  - "Control de versiones"
  - "Ramas"
  - "Remotos"
source_batches:
  - 7
dates:
  []
status: "organizado"
---

**Asignatura / bloque:** Control de versiones (categoría **provisional**; el centro podría impartir
estos contenidos dentro de otra asignatura).
**Temas:** configuración, repositorios, `add`, `commit`, estado e historial, `diff`,
`checkout`/`reset`, ramas, remotos y descarga/subida de cambios.

## Fechas de los apuntes

- Sin fecha explícita en la hoja (manual de Git del Lote 7).

## Lotes de origen

- **Lote 7**

---

## 1. Configuración

```bash
git config --global user.name "nombre-usuario"
git config --global user.email "email-usuario"
git config --list
```

Los dos primeros comandos configuran el nombre y el correo del usuario. El tercero muestra la
configuración.

---

## 2. Inicializar y clonar repositorios

```bash
git init "nombre-repositorio"
git clone "url-repositorio"
```

---

## 3. Añadir archivos

```bash
git add "fichero"
git add "carpeta"
git add .
```

Añaden archivos a la zona de preparación (*staging area*).

---

## 4. Commits

```bash
git commit -m "mensaje"
git commit --amend -m "mensaje"
```

El primero crea un *commit* con un mensaje. El segundo modifica el último *commit*.

Flujo anotado:

```text
WORKING DIRECTORY --git add--> STAGING AREA --git commit--> REPOSITORY
```

---

## 5. Estado e historial

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
- `git annotate`: muestra el contenido de un fichero con información de los *commits* que afectaron
  a sus líneas.

---

## 6. Diferencias entre versiones

```bash
git diff
git diff --cached
git diff HEAD
```

- `git diff`: diferencias entre el directorio de trabajo y la zona de preparación.
- `git diff --cached`: diferencias entre la zona de preparación y el último *commit*.
- `git diff HEAD`: diferencias entre el directorio de trabajo y el último *commit*.

---

## 7. Checkout y reset

```bash
git checkout "commit"
git checkout "rama"
git checkout -b "rama"
```

Las dos últimas formas permiten cambiar a una rama o crear y activar una rama nueva. La primera
puede cambiar a un *commit* concreto.

```bash
git reset -- "fichero"
git reset --hard "commit"
git reset "commit"
```

- `git reset -- fichero`: retira el fichero de la zona de preparación sin descartar necesariamente
  los cambios del directorio de trabajo.
- `git reset --hard commit`: restablece el estado al *commit* y puede descartar cambios locales;
  usar con precaución.
- `git reset commit`: actualiza `HEAD` y mueve la referencia de la rama según el modo usado.

---

## 8. Ramas

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

---

## 9. Repositorios remotos

```bash
git remote add "repositorio-remoto" "url"
git remote
git remote -v
```

Añadir un remoto y consultar los remotos configurados y sus direcciones.

---

## 10. Descargar y subir cambios

```bash
git pull "remoto" "rama"
git fetch "remoto"
git push "remoto" "rama"
```

- `git pull`: descarga e integra cambios.
- `git fetch`: descarga referencias y cambios del remoto sin integrarlos automáticamente en la rama
  actual.
- `git push`: sube los cambios de la rama local al remoto.

---

## Dudas de lectura

- Sin lecturas dudosas marcadas en este bloque.

## Notas técnicas

- **Aclaración:** `git annotate` es un alias de `git blame`; muestra, por cada línea de un fichero,
  el *commit* que la modificó por última vez.
- **Aclaración:** `git rebase rama1 rama2` reorganiza los commits de `rama2` sobre `rama1`
  (se reproduce tal como figura en el apunte).

## Referencias cruzadas

- Clasificación provisional de este bloque: ver `00_Indice_y_control/dudas_y_revision.md` (sección D)
  e `00_Indice_y_control/indice_general.md`.
