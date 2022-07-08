import { ipcMain } from 'electron'
import { ElectronApp } from './ElectronApp'
import { UpdateService } from './update/index'
import { IS_DEV, NODE_ENV, PORT } from './environments'

const show = NODE_ENV !== 'test'

ElectronApp.init({ show, dev: IS_DEV, port: PORT })

UpdateService(ElectronApp)

ipcMain.on('hello', (event, args) => {
  event.sender.send('hello', {
    msg: `Saludos ${args.name} desde el main process`,
  })
})
