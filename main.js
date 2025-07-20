const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  //win.webContents.openDevTools(); // Uncomment if you want dev tools
}

app.whenReady().then(createWindow);

// macOS behavior
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
