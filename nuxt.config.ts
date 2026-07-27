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
  },

  // i18n 多语言支持
  modules: ['@nuxtjs/i18n'],
  i18n: {
    restructureDir: '',
    locales: [
      { code: 'zh', iso: 'zh-CN', file: 'zh-CN.json', name: '中文' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'EN' }
    ],
    defaultLocale: 'zh',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  }
})
