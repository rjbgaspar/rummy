const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Rummy',
    startUrl: 'index.html',
    display: 'standalone',
    themeColor: '#000',
    backgroundColor: '#fff',
    orientation: 'portrait',
    icons: [
      {
        src: '@/assets/rummy-pwa-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '@/assets/rummy-pwa-256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '@/assets/rummy-pwa-384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '@/assets/rummy-pwa-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
})
