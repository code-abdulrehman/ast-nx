// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/i18n', 'nuxt-icon'],
  icon: {
    customCollections: [{
      prefix: 'svg',
      dir: './app/assets/icons'
    }],
    serverBundle: {
      collections: [],
      mode: 'local'
    },
    autoInstall: false
  },
  css: ['~/assets/css/main.css', '~/assets/css/font.css'],
  ui: {
    prefix: 'Nuxt',
    fonts: false,
    colorMode: false,
    theme: {
      colors: [
        'primary',
        'primaryHover',
        'primaryLight',
        'primaryBg',
        'primaryBorder',
        'neutral',
        'tertiary',
        'secondary',
        'accent',
        'background',
        'foreground',
        'border',
        'text',
        'error',
        'success',
        'warning',
        'info',
        'muted',
        'light',
      ],
    }
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'ur',
        name: 'Urdu'
      },
      {
        code: 'ar',
        name: 'Arabic'
      }]
  },
  
})