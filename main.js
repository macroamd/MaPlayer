const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 900,
    minWidth: 380,
    minHeight: 640,
    backgroundColor: '#000000',
    icon: path.join(__dirname, 'app', 'icons', 'icon-512.png'),
    title: 'MaPlayer',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      // El reproductor no necesita Node.js dentro de la página; se mantiene
      // aislado por seguridad, igual que cualquier web normal.
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Se abre ya maximizada (aprovechando el ancho de ventana responsive que
  // tiene la interfaz), en vez del tamaño pequeño por defecto que obligaba a
  // maximizar a mano cada vez. "show: false" + mostrar tras maximizar evita
  // el parpadeo de ver primero la ventana pequeña y luego el salto de tamaño.
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  // Los enlaces externos (si los hubiera) se abren en el navegador del
  // sistema en vez de dentro de la propia ventana de la app.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Cuando la página pide pantalla completa (el botón/doble clic del vídeo
  // en canales tipo IPTV de las listas M3U), hacemos que la propia ventana
  // del sistema pase a pantalla completa de verdad, no solo el contenido
  // dentro de la ventana.
  mainWindow.webContents.on('enter-html-full-screen', () => {
    mainWindow.setFullScreen(true);
  });
  mainWindow.webContents.on('leave-html-full-screen', () => {
    mainWindow.setFullScreen(false);
  });

  Menu.setApplicationMenu(null);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
