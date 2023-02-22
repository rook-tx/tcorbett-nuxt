export default defineNuxtConfig({
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
        { hid: 'description', name: 'description', content: 'Portfolio site of Tom Corbett, UI developer based in Toronto' },
        { hid: 'og:image', property: 'og:image', content: '/apple-touch-icon.png' }
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
    '@nuxtjs/google-fonts',
    '@nuxtjs/prismic',
    '@pinia/nuxt'
  ],

  googleFonts: {
    families: {
      Lato: [ 100, 300, 400, 700, 900 ],
      Merriweather: [ 300, 400 ],
    },
    // subsets: 'latin'
  },

  prismic: {
    endpoint: 'tcorbett',
    preview: false,
    toolbar: false,
    linkResolver: '~/js/prismicLinkResolver.js'
  },
})
