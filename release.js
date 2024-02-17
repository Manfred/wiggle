(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // (disabled):fs
  var require_fs = __commonJS({
    "(disabled):fs"() {
    }
  });

  // (disabled):path
  var require_path = __commonJS({
    "(disabled):path"() {
    }
  });

  // node_modules/electron/index.js
  var require_electron = __commonJS({
    "node_modules/electron/index.js"(exports, module) {
      var fs = require_fs();
      var path = require_path();
      var pathFile = path.join(__dirname, "path.txt");
      function getElectronPath() {
        let executablePath;
        if (fs.existsSync(pathFile)) {
          executablePath = fs.readFileSync(pathFile, "utf-8");
        }
        if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {
          return path.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath || "electron");
        }
        if (executablePath) {
          return path.join(__dirname, "dist", executablePath);
        } else {
          throw new Error("Electron failed to install correctly, please delete node_modules/electron and try installing again");
        }
      }
      module.exports = getElectronPath();
    }
  });

  // main.js
  var { app, BrowserWindow } = require_electron();
  var createWindow = () => {
    const window = new BrowserWindow({
      width: 1340,
      height: 783,
      backgroundColor: "#404040",
      show: false
    });
    window.webContents.on("will-navigate", (event, url) => {
      if (url.indexOf("https://www.twitch.tv") !== 0) {
        event.preventDefault();
      }
    });
    window.loadURL("https://www.twitch.tv/directory/following");
    window.once("ready-to-show", () => {
      window.show();
    });
  };
  app.whenReady().then(() => {
    createWindow();
  });
  app.on("window-all-closed", () => {
    app.quit();
  });
})();
