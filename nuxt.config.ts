// https://nuxt.com/docs/api/configuration/nuxt-config
import wasm from 'vite-plugin-wasm';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [wasm()],
    server: {
      mimeTypes: {
        'application/wasm': ['wasm'],
      },
    },
  },

})
