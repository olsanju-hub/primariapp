import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoBase = '/primariapp/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [react()],
}))
