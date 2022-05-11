import path from 'path'
import { App } from './models/App'
import { SAFE_LINKS, UPDATE_SERVER } from './environments'

export const ElectronApp = new App({
  updateUrl: UPDATE_SERVER,
  security: [SAFE_LINKS],
  preload: path.join(__dirname, 'preload.bundle.js'),
  height: 800,
  width: 8000,
})
