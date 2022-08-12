import { Component, Provide, Vue } from 'vue-property-decorator'
import GameRound from './components/game-round.vue'
import SplashScreen from './components/splash-screen.vue'
import { IRound, Round } from '@/shared/model/round/round.model'

const ROUND_NAMES: string[] = ['2T', 'TS', '2S', '3T', '2TS', 'T2S', '3S']

@Component({
  components: {
    GameRound,
    SplashScreen
  }
})
export default class App extends Vue {
  public playing = true;

  public players: string[] = ['', '', '', '', '']

  public roundNames = [...ROUND_NAMES];

  public rounds: IRound[] = [];

  public scoreboard: { [k:string]: string[] } = {
    [ROUND_NAMES[0]]: [],
    [ROUND_NAMES[1]]: [],
    [ROUND_NAMES[2]]: [],
    [ROUND_NAMES[3]]: [],
    [ROUND_NAMES[4]]: [],
    [ROUND_NAMES[5]]: [],
    [ROUND_NAMES[6]]: []
  };

  @Provide() sharedState = {
    roundNames: this.roundNames
  }

  public get playersCount () {
    return this.players.filter(item => item !== '').length
  }

  public get currentRoundIndex () {
    return this.rounds.length
  }

  public newRound () : void {
    if (this.playersCount < 2) {
      alert('Please add 2 players')
      return
    }
    const newRound = new Round(this.roundNames[this.currentRoundIndex], this.currentRoundIndex, [...this.players])
    this.rounds.push(newRound)
  }

  public scoreUpdate (payload: { [k:string]: any }) {
    this.$set(this.scoreboard, payload.name, payload.scores)
    // for (const refName in this.$refs) {
    //   // this.$refs[refName][0].$refs.scoreboard.updateActualScoreboard()
    // }
  }

  public startPlaying () {
    this.playing = true
  }
}
