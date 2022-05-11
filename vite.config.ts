import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const srcRoot = join(__dirname, 'view')
  const isDEV = mode === 'development'

  return {
    root: srcRoot,
    base: isDEV ? '/' : `./`,
    mode,
    envDir: '../',
    build: {
      outDir: '../.webpack/renderer',
      emptyOutDir: true,
      sourcemap: true,
    },
    plugins: [react()],
  }
})
