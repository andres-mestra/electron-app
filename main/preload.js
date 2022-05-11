/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(channel, data) {
      ipcRenderer.send(channel, data)
    },
    on(channel, func) {
      const listener = (event, ...args) => func(...args)
      ipcRenderer.on(channel, listener)
      return listener
    },
    once(channel, func) {
      const listener = (event, ...args) => func(...args)
      ipcRenderer.once(channel, listener)
      return listener
    },
    invoke: async (channel, data) => {
      const result = await ipcRenderer.invoke(channel, data)
      return result
    },
    removeListener(channel, listener) {
      ipcRenderer.removeListener(channel, listener)
    },
  },
})
