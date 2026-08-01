# MaPlayer — Escritorio

Reproductor de audio y vídeo sencillo y funcional, para Linux de escritorio
(empaquetado como AppImage), desarrollado por **Macroamd**.

Misma base de código que las versiones [Android](../macroamd-player-android)
y PWA de MaPlayer, envuelta en [Electron](https://www.electronjs.org/) para
funcionar como app nativa de escritorio.

## Funciones

- Reproducción de archivos de audio locales y carpetas completas.
- Radios online, con búsqueda automática del logo de la emisora.
- Reproducción de vídeo (canales IPTV / listas M3U con HLS vía `hls.js`),
  con pantalla completa real.
- Listas de reproducción guardables, con importar/exportar en **M3U** y
  **PLS** (formatos estándar).
- Ecualizador de 3 bandas y color de acento personalizables, con
  persistencia entre sesiones.
- Tres visualizadores: barras LED, columnas y onda.
- Interfaz totalmente responsive, desde ventanas pequeñas hasta monitores
  ultra anchos.

## Descargar / compilar

MaPlayer se distribuye como `.AppImage` para Linux (probado en Ubuntu 22.04
"Jammy" y superiores). Para compilarlo tú mismo, consulta
[`BUILD.md`](./BUILD.md) — son solo dos comandos (`npm install` y
`npm run dist`).

## Versión

**1.2** — coherente con las versiones Android y PWA de MaPlayer.

## Licencia

Pendiente de definir por Macroamd.
