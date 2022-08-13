import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import SplashScreen from './components/splash-screen.vue'
import PlayRummy from '@/components/play-rummy.vue'

@Component({
  components: {
    PlayRummy,
    SplashScreen
  }
})
export default class App extends Vue {
  private playing = false;

  public startPlaying () {
    this.playing = true
  }
}
