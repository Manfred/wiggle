const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1340, height: 783,
    backgroundColor: '#404040',
    show: false
  })
  // TODO: all external links use window opener, I think, so we should create one of those…
  window.webContents.on('will-navigate', (event, url) => {
    if (url.indexOf('https://www.twitch.tv') !== 0) {
      event.preventDefault()
    }
  })
  window.loadURL('https://www.twitch.tv/directory/following')
  window.once('ready-to-show', () => {
    window.show()
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
