import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#3c3f41',
        secondary: '#b0bec5'
      }
    }
  }
}

export default new Vuetify(opts)
