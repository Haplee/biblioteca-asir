---
title: "Git �� Comandos básicos"
kind: "apunte"
subject: "git"
order: 1
summary: "Manual completo de Git: configuraci�n, init, clone, add, commit, status, log, ramas, merge, rebase, checkout, diff y repositorios remotos."
topics:
  - "Git"
  - "Versionado"
  - "Ramas"
  - "Commit"
  - "Merge"
  - "Clone"
  - "Status"
source_batches:
  - 1
dates:
  - "2024-09-18"
status: "organizado"
---

**Asignatura:** Git (Control de versiones).
**Temas:** configuraci�n inicial, comandos b�sicos, gesti�n de ramas, merge, rebase, operaciones con repositorios remotos.

## Fechas de los apuntes

| Fecha | Contenido |
|---|---|
| 18/09/2024 | Manual completo de Git |

## Lotes de origen

- **Lote 1**

---

## 1. Configuraci�n inicial

```bash
git config --global user.nombre "nombre-usuario" -> Pone el nombre del usuario
git config --global user.email "email-usuario" -> Pone el email del usuario
git config --list -> Lista la configuraci�n
```

## 2. Iniciar un repositorio

```bash
git init "nombre-repositorio" -> Inicia el repositorio
```

## 3. Clonar un repositorio

```bash
git clone "url-repositorio" -> Clona el repositorio
```

## 4. Área de intercambio temporal (Staging Area)

```bash
git add "fichero" -> Añade el fichero
git add "carpeta" -> Añade la carpeta
git add . -> Añade todo los archivos no guardados
```

## 5. Commit (Repositorio)

```bash
git commit -m "mensaje" -> Guardamos los cambios realizados y le añadimos un mensaje
git commit --amend -m "mensaje" -> Cambiamos el �ltimo mensaje de commit por uno nuevo
```

## 6. Estado del repositorio

```bash
git status -> Muestra el estado actual del repositorio (ficheros modificados, staged, etc.)
```

## 7. Historial de commits

```bash
git log -> Muestra el historial de commits
git log --oneline -> Muestra el h de commits con una salida m�s compacta
git log --graph -> Muestra el historial en forma de grado
git show -> Muestra la informaci�n del �ltimo commit
git annotate -> Muestra el contenido de un fichero con la informaci�n del �ltimo commit
```

## 8. Diferencias

```bash
git diff -> Muestra las diferencias entre directorio de trabajo y la zona de intercambio temporal
git diff --cached -> Muestra las diferencias entre la zona de intercambio temporal y el �ltimo commit
git diff HEAD -> Muestra la diferencia entre directorio de trabajo y el �ltimo commit
```

## 9. Checkout y Reset

```bash
git checkout "commit" -> Volver a la versi�n anterior
git reset "fichero" -> Elimina los cambios del fichero
git reset --hard "commit" -> Elimina todos los cambios desde el commit
git reset "commit" -> Actualiza el HEAD al commit
```

## 10. Ramas (Branches)

```bash
git branch "nombre" -> Crea una nueva rama
git branch -> Muestra ramas activas del repositorio
git checkout "rama" -> Actualiza los ficheros del directorio de trabajo a la �ltima versi�n del repositorio correspondiente a la rama
git checkout -b "rama" -> Crea una nueva rama con el nombre de rama y la activa
```

## 11. Merge e integración

```bash
git merge "rama" -> Integra los cambios de la rama actual con la principal
git rebase "rama1" "rama2" -> replica los cambios de la rama2 en la rama1
git branch -d "rama" -> Elimina la rama que haya sido fusionada anteriormente
git branch -D "rama" -> Elimina la rama incluso si no ha sido fusionada
```

## 12. Repositorios remotos

```bash
git remote add "repositorio-remoto" "url" -> crea un enlace con el nombre al repositorio remoto
git remote -> Muestra listado con todos los enlaces a repositorios remotos
git remote -v -> Muestra listado de los repositorios remotos con las direcciones url

git pull "remoto" "rama" -> Descarga los cambios de la rama del repositorio remoto
git fetch "remoto" -> Descarga los cambios del repositorio remoto

git push "remoto" "rama" -> Sube al repositorio remoto los cambios de la rama en local
```