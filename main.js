const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => {
    // if (process.platform !== 'darwin') {
      // autoUpdater.setFeedURL('https://dist.unlock.sh/v1/electron/my-app')
      autoUpdater.checkForUpdatesAndNotify();
    // }
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  console.log('process.platform: ', process.platform);
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

// autoUpdater.on('update-available', () => {
//   mainWindow.webContents.send('update_available');
// });

// autoUpdater.on('update-downloaded', () => {
//   mainWindow.webContents.send('update_downloaded');
// });

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
  // app.relaunch()
  // app.exit();
  // app.quit()
});
