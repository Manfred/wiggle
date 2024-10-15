const { app, BrowserWindow } = require("electron")
const betterttvPath = require("path").join(__dirname, "betterttv/betterttv.js")
const stylingPath = require("path").join(__dirname, "style/override.css")

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1340,
    height: 783,
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
