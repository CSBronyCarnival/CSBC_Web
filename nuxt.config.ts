// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3200
  },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in'
    }
  }
})
