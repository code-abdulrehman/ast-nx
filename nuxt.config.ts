// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devServer: {
    port: 3000,
    host: 'localhost',
    https: false,
    timeout: 60000, // 60 seconds timeout
    hmr: {
      port: 24678,
      host: 'localhost'
    }
  },
  vite: {
    server: {
      hmr: {
        timeout: 60000,
        overlay: false
      },
      watch: {
        usePolling: false,
        interval: 1000
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router']
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        timeout: 60000
      }
    }
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