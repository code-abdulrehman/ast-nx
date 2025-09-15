// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'AST - Premium Audio Products',
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'description', content: 'AST - Premium wireless audio products with high-quality sound and advanced features' },
        { name: 'keywords', content: 'wireless earbuds, audio, AST, premium sound, bluetooth' },
        { property: 'og:title', content: 'AST - Premium Audio Products' },
        { property: 'og:description', content: 'AST - Premium wireless audio products with high-quality sound and advanced features' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  devServer: {
    port: 3000,
    host: 'localhost',
    https: false,
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
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-icon',
    '@nuxtjs/robots',
  ],
  robots: {
    allow: '/',
    disallow: ['/admin/', '/api/', '/_nuxt/'],
    sitemap: 'https://ast-nx.vercel.app/sitemap.xml'
  },
  icon: {
    customCollections: [{
      prefix: 'svg',
      dir: './app/assets/icons'
    }],
    serverBundle: {
      collections: [],
    },
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
  runtimeConfig: {
    public: {
      cdnBase: 'https://cdn.jsdelivr.net/gh/code-abdulrehman/ast-nx@main/public'
    }
  }
  
})