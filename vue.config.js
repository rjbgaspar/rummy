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
        src: '"@/assets/rummy-pwa.png"',
        sizes: '346x346',
        type: 'image/png'
      }
    ]
  }
})
