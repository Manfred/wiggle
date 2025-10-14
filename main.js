const { app, BrowserWindow, Menu } = require("electron")
const betterttvPath = require("path").join(__dirname, "betterttv/betterttv.js")
const stylingPath = require("path").join(__dirname, "style/override.css")

const isMac = process.platform === 'darwin'
const menu = Menu.buildFromTemplate(
  [
    ...(
      isMac
      ? [{
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }]
      : []
    ),
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        {
          label: "Resize…",
          submenu: [
            {
              label: "Medium",
              accelerator: "CommandOrControl+1",
              click (item, focusedWindow) {
                if (focusedWindow) focusedWindow.setSize(1370, 802)
              }
            },
            {
              label: "Small",
              accelerator: "CommandOrControl+2",
              click (item, focusedWindow) {
                if (focusedWindow) focusedWindow.setSize(685, 418)
              }
            },
          ]
        }
      ]
    },
  ]
)
Menu.setApplicationMenu(menu)

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1370,
    height: 802,
    backgroundColor: "#404040",
    show: false,
    webPreferences: {
      webSecurity: false,
    },
  })
  // window.webContents.openDevTools()
  window.webContents.on("will-navigate", (event, url) => {
    if (url.indexOf("https://www.twitch.tv") !== 0) {
      event.preventDefault()
    }
  })
  window.webContents.on("did-navigate", (event, url) => {
    if (url.indexOf("https://www.twitch.tv") !== 0) return
    window.webContents.executeJavaScript(
      `(function() {
        const head = document.getElementsByTagName('head')[0]
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'file://${betterttvPath}'
        head.appendChild(script)
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'file://${stylingPath}'
         head.appendChild(link)
      })()`,
      true,
    )
  })
  window.loadURL("https://www.twitch.tv/directory/following")
  window.once("ready-to-show", () => {
    window.show()
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  app.quit()
})
