interface IpcRenderer {
  on: <T>(channel: string, func: T) => EventListener
  once: <T>(channel: string, func: T) => EventListener
  send: <T>(channel: string, data: T) => void
  removeListener: (channel: string, listener: EventListener) => void
  invoke: <TypeData, TypeResp>(
    channel: string,
    data: TypeData
  ) => Promise<TypeResp>
}

interface Electron {
  ipcRenderer: IpcRenderer
}

declare global {
  interface Window {
    electron: Electron
  }
}

export const useIpc = () => {
  async function invokeIpc<TypeResponse, TypePayload = unknown>(
    channel: string,
    data?: TypePayload
  ) {
    try {
      const result: TypeResponse = await globalThis.electron.ipcRenderer.invoke(
        channel,
        data
      )
      return result
    } catch (error) {
      console.error(error)
      return null
    }
  }

  function onIpc<T>(onChannel: string, callback: (data: T) => void) {
    const listener = globalThis.electron.ipcRenderer.on(onChannel, callback)
    const removeListener = () =>
      globalThis.electron.ipcRenderer.removeListener(onChannel, listener)
    return [listener, removeListener] as const
  }

  function sendIpc<T>(sendChannel: string, data?: T) {
    globalThis.electron.ipcRenderer.send(sendChannel, data)
  }
  return { sendIpc, onIpc, invokeIpc } as const
}
