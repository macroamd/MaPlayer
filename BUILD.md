# MaPlayer — Escritorio (Electron → AppImage)

Este proyecto envuelve la versión PWA de MaPlayer en una app de escritorio con
Electron, lista para empaquetarse como un `.AppImage` para Ubuntu 22.04 (Jammy)
y, en general, para casi cualquier distribución Linux moderna con glibc
razonablemente reciente.

## Por qué no viene ya compilado

Generar el `.AppImage` requiere descargar Electron (unos 100-150MB) desde
`registry.npmjs.org` / GitHub. El entorno donde se preparó este proyecto no
tiene acceso a esas descargas en este momento, así que el paso de compilación
lo tienes que hacer tú, con conexión a internet normal. Son 2 comandos.

## Requisitos previos (Ubuntu 22.04)

Necesitas Node.js y npm. Si no los tienes:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Comprueba que quedaron instalados:
```bash
node -v
npm -v
```

## Compilar el AppImage

Descomprime este proyecto y, dentro de la carpeta `maplayer-desktop`:

```bash
npm install
npm run dist
```

- `npm install` descarga Electron y electron-builder (tarda un par de minutos
  la primera vez).
- `npm run dist` genera el AppImage.

El resultado queda en:
```
dist/MaPlayer-1.2.0-x86_64.AppImage
```

## Ejecutarlo

```bash
chmod +x dist/MaPlayer-1.2.0-x86_64.AppImage
./dist/MaPlayer-1.2.0-x86_64.AppImage
```

(Si tu Ubuntu 22.04 no tiene `libfuse2` instalado, los AppImage a veces no
arrancan con doble clic. Instálalo con `sudo apt install libfuse2` — es un
requisito general de los AppImage en Ubuntu 22.04+, no algo específico de
MaPlayer.)

## Qué funciona igual que en la PWA/Android

- Reproducción de archivos locales (selector de archivos del propio sistema
  operativo) y de carpetas.
- Radio online, con búsqueda automática de logo de emisora.
- Importar/exportar emisoras en formato M3U estándar, y vaciar la lista
  guardada de golpe.
- Reproducción de vídeo (canales IPTV que traigan las listas M3U) con vista
  previa y **pantalla completa real** — en Electron, además, conecté la
  Fullscreen API de la página con el propio modo pantalla completa de la
  ventana del sistema operativo (`enter-html-full-screen` /
  `leave-html-full-screen` en `main.js`), así que se ve igual de "a pantalla
  completa" que cualquier reproductor de vídeo de escritorio normal.
- Ecualizador y color de acento, guardados en el propio perfil de la app
  (usa el almacenamiento local de Chromium/Electron, con persistencia
  garantizada — no tiene el problema que sí tuvimos en Android con `file://`).
- Listas de reproducción guardables.
- Los tres visualizadores (LED, columnas, ondas).
- El modal "Acerca de" (doble clic en el visualizador).

## Qué NO aplica aquí (son cosas específicas de Android)

- Notificación con controles multimedia / pantalla de bloqueo.
- Reproducción en segundo plano al minimizar (en escritorio, mientras no
  cierres la ventana, el audio sigue sonando con normalidad; esto es un
  "problema" resuelto de forma nativa por cómo funcionan las apps de
  escritorio, no algo que haya que replicar).
- "Abrir con" desde otras apps del sistema (se podría añadir más adelante
  registrando MaPlayer como manejador de archivos de audio en el `.desktop`
  del AppImage, si te interesa).
- El botón "Pant" (mantener pantalla encendida) no tiene sentido en un
  ordenador de escritorio normal — lo dejé tal cual porque no molesta, pero
  no hace nada relevante fuera de un dispositivo móvil/tablet (eso sí, ahora
  se activa solo automáticamente cuando pones un vídeo a pantalla completa,
  igual que en Android).

## Icono y nombre

Usa el mismo icono (nota musical sobre fondo negro) y nombre "MaPlayer" que
las versiones Android y PWA, para mantener la identidad consistente en todas
las plataformas.

## Si quieres personalizar algo antes de compilar

- **Versión**: cambia `"version"` en `package.json`.
- **Tamaño de ventana por defecto**: en `main.js`, las líneas `width`/`height`
  del `BrowserWindow`.
- **Icono**: reemplaza los PNG en `app/icons/` (o cambia la ruta en
  `package.json` → `build.linux.icon`).
