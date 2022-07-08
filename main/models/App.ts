import path from 'path'
import { app as Electron, BrowserWindow } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'

type PropsWindow = {
  height: number
  width: number
  security: string[]
  preload: string
  updateUrl: string
}

interface ArgsInit {
  show: boolean
  dev: boolean
  port: string
}

class App {
  height: number
  width: number
  private security: string[]
  private preload: string
  private updateUrl: string
  private mainWindow: BrowserWindow
  private app: Electron.App

  constructor({ height, width, security, preload, updateUrl }: PropsWindow) {
    this.height = height
    this.width = width
    this.security = security
    this.preload = preload
    this.updateUrl = updateUrl
    this.app = Electron
    this.mainWindow = null
  }

  private createWindow(show: boolean) {
    this.mainWindow = new BrowserWindow({
      show,
      height: this.height,
      width: this.width,
      webPreferences: {
        preload: this.preload,
      },
    })
  }

  private securityPolicy() {
    this.mainWindow.webContents.session.webRequest.onHeadersReceived(
      (details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': this.security,
          },
        })
      }
    )
  }

  private reactDevTools() {
    this.app.whenReady().then(() => {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    })
  }

  init({ show, dev, port }: ArgsInit) {
    if (require('electron-squirrel-startup')) this.app.quit()

    this.app.whenReady().then(() => {
      this.createWindow(show)
      if (dev) {
        this.mainWindow.loadURL(`http://localhost:${port}`)
        this.mainWindow.webContents.openDevTools()
        this.reactDevTools()
      } else {
        this.mainWindow.loadFile(
          path.join(__dirname, '../', 'renderer', 'index.html')
        )
      }
      this.securityPolicy()
    })
  }

  send<T>(channel: string, data?: T) {
    this.mainWindow.webContents.send(channel, data)
  }

  get platform() {
    return process.platform === 'linux' ? 'deb' : process.platform
  }

  get version() {
    return this.app.getVersion()
  }

  get updateServer() {
    const { platform, version } = this
    const url = `${this.updateUrl}/update/${platform}/${version}`
    return url
  }
}

export { App }
