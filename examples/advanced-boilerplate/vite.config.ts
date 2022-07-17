import { defineConfig, loadEnv, } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default ( {mode}) => {

  return defineConfig({
    plugins: [
      react(),
    ],
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
      },
    },

    define: mode === 'development' ? { global: {}, } : {},
  })


}
