```sh
# 🔹 Paso 1: Ver las ramas remotas
git fetch --all
git branch -r


# 🔹 Paso 2: Crear la rama local a partir de la remota
git checkout -b frank origin/frank

# En Git >=2.23 también puedes usar:
git switch -c frank origin/frank

# 🔹 Paso 3: Borrar la rama local 
git branch -D nombre_rama

