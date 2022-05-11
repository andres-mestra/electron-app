import { autoUpdater, ipcMain } from 'electron'
import { UpdateChannels } from '../channels/update.channels'
import { App } from '../models/App'

export const UpdateService = (app: App) => {
  const { updateServer: url } = app
  autoUpdater.setFeedURL({ url })

  ipcMain.on(UpdateChannels.search, () => {
    autoUpdater.checkForUpdates()
    app.send(UpdateChannels.search, {
      message: 'Se ejecuto orden para buscar actualizaciones',
    })
  })

  autoUpdater.on('update-available', () => {
    app.send(UpdateChannels.available, {
      message:
        'Se encontro una nueva versión de la aplicación e inicio la descarga.',
    })
  })

  autoUpdater.on('update-not-available', () => {
    app.send(UpdateChannels.notAvailable, {
      message: 'No se encontro una nueva versión de la aplicación.',
    })
  })

  autoUpdater.on('update-downloaded', (_, releaseNotes, releaseName) => {
    const message = `${releaseName ?? ''}`
    app.send(UpdateChannels.downloaded, {
      message,
    })
  })

  autoUpdater.on('error', (error) => {
    app.send(UpdateChannels.error, {
      message: `${error}`,
    })
  })

  ipcMain.on(UpdateChannels.downloaded, (event, args) => {
    if (args?.install) autoUpdater.quitAndInstall()
  })
}
