import { createRoot } from 'react-dom/client'
import { ElectronApp } from './ElectronApp'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<ElectronApp />)
