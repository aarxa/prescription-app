const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    show: false // You can make this true later for patient dashboard
  });

  // Path to your local index.html file
  const filePath = path.join(__dirname, 'index.html');

  // ✅ Open the HTML in the user's default browser (offline!)
  shell.openPath(filePath);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
