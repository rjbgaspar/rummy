const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Rummy',
    manifestOptions: {
      startUrl: 'index.html',
      display: 'standalone',
      themeColor: '#000',
      backgroundColor: '#fff',
      orientation: 'portrait',
      icons: [
        {
          src: './img/icons/rummy-pwa-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/rummy-pwa-256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: './img/icons/rummy-pwa-384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: './img/icons/rummy-pwa-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})
