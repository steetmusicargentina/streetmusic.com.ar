#!/usr/bin/env sh

# Detener en caso de errores
set -e

# Compilar la aplicación
npm run build

# Navegar al directorio de compilación
cd dist

# Inicializar un nuevo repositorio Git en 'dist'
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Subir a la rama `gh-pages` del repositorio
git push -f git@github.com:<TU_USUARIO>/streetmusic.com.ar.git main:gh-pages

# Volver al directorio anterior
cd -
