// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ // eslint-disable-line no-undef
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Desktop',
      titleTemplate: '%s | T Corbett',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { hid: 'description', name: 'description', content: 'Portfolio site of Tom Corbett, UI developer based in Toronto' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-DJ7TPKG1GE'
        },
        {
          children: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DJ7TPKG1GE');`
        }
      ]
    }
  },

  css: [
    '@/stylus/main.styl'
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/prismic'
  ],

  prismic: {
    endpoint: 'tcorbett',
    toolbar: false
  }
})
