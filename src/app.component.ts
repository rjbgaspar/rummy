import { Component, Provide, Vue } from 'vue-property-decorator'
import GameRound from './components/game-round.vue'
import SplashScreen from './components/splash-screen.vue'
import { IRound, Round } from '@/shared/model/round/round.model'

@Component({
  components: {
    GameRound,
    SplashScreen
  }
})
export default class App extends Vue {
  public playing = true;

  public players: string[] = ['', '', '', '', '']

  public roundNames: string[] = ['2T', 'TS', '2S', '3T', '2TS', 'T2S', '3S'];

  public rounds: IRound[] = [];

  public scoreboard: any = {};

  @Provide() sharedState = {
    roundNames: this.roundNames
  }

  created () {
    this.bootScoreboard()
  }

  public get playersCount () {
    return this.players.filter(item => item !== '').length
  }

  public get currentRoundIndex () {
    return this.rounds.length
  }

  public bootScoreboard () {
    this.roundNames.forEach((value, index) => {
      const roundScore = []

      for (const player of this.players) {
        roundScore.push('')
      }

      this.scoreboard[value] = roundScore
    })
  }

  public newRound () : void {
    if (this.playersCount < 2) {
      alert('Please add 2 players')
      return
    }
    const newRound = new Round(this.roundNames[this.currentRoundIndex], this.currentRoundIndex, [...this.players])
    this.rounds.push(newRound)
  }

  // public scoreUpdate ({ name, scores }) {
  public scoreUpdate () {
    // this.scoreboard[name] = scores
    // this.$set(this.scoreboard, name, scores)

    for (const refName in this.$refs) {
      // this.$refs[refName][0].$refs.scoreboard.updateActualScoreboard()
    }
  }

  public startPlaying () {
    this.playing = true
  }
}
