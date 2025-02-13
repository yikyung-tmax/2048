import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/2048/',
  plugins: [react({
    jsxImportSource: "@emotion/react", 
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  })]
  // plugins : [react()]
})
