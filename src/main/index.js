'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 660,
    useContentSize: true,
    width: 440
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

ipcMain.on('checkForUpdates', () => {
  autoUpdater.checkForUpdatesAndNotify()
})

ipcMain.on('downloadUpdate', () => {
  autoUpdater.downloadUpdate()
})

autoUpdater.on('error', data => {
  sendUpdateMessage('error', data)
})

autoUpdater.on('checking-for-update', data => {
  sendUpdateMessage('checking-for-update', data)
})

autoUpdater.on('update-available', data => {
  sendUpdateMessage('update-available', data)
})

autoUpdater.on('update-not-available', data => {
  sendUpdateMessage('update-not-available', data)
})

autoUpdater.on('download-progress', data => {
  sendUpdateMessage('download-progress', data)
})

autoUpdater.on('update-downloaded', data => {
  sendUpdateMessage('update-downloaded', data)
  ipcMain.on('installNow', () => {
    autoUpdater.quitAndInstall()
  })
})

function sendUpdateMessage (message, data) {
  mainWindow.webContents.send('update-message', { message, data })
}
