import { Component, Vue } from 'vue-property-decorator'
import SplashScreen from '@/components/splash-screen.vue'

@Component({
  components: {
    SplashScreen
  }
})
export default class HomeView extends Vue {}
