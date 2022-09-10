import { Component, Provide, Vue } from 'vue-property-decorator'
import GameRound from './game-round.vue'
import { IRound } from '@/shared/model/round/round.model'
import { IPlayer } from '@/shared/model/player/player.model'

@Component({
  components: {
    GameRound
  }
})
export default class PlayRummy extends Vue {
  public players: IPlayer[] = this.$store.getters.players

  public roundNames = this.$store.getters.roundNames;

  public biggerHeight = 220;

  public smallerHeight = 86;

  public isLuckyPanelVisible = false;

  public rounds: IRound[] = this.$store.getters.rounds;

  public scoreboard: { [k:string]: string[] } = this.$store.getters.scoreboard;

  public dialog = false;

  @Provide() sharedState = {
    roundNames: this.roundNames
  }

  public get playersCount () {
    return this.$store.getters.playersCount
  }

  public get currentRoundIndex () {
    return this.$store.getters.currentRoundIndex
  }

  public setPlayerName (name: string, index: number) {
    this.$store.commit('setPlayerName', { index, name })
  }

  public incrementPlayerLuckyCount (index: number) {
    this.$store.commit('incrementPlayerLuckyCount', { index })
  }

  public decrementPlayerLuckyCount (index: number) {
    this.$store.commit('decrementPlayerLuckyCount', { index })
  }

  public get actionIcon (): string {
    if (this.currentRoundIndex < 7) {
      return 'mdi-plus'
    } else {
      return 'mdi-restart'
    }
  }

  public click () : void {
    if (this.currentRoundIndex < 7) {
      this.newRound()
    } else {
      this.confirmRestart()
    }
  }

  public newRound () : void {
    if (this.playersCount < 2) {
      alert('Please add 2 players')
      return
    }
    this.$store.commit('newRound', {
      players: [...this.$store.getters.players],
      currentRoundIndex: this.$store.getters.currentRoundIndex
    })
    this.$nextTick(() => window.scrollTo(0, document.body.scrollHeight))
  }

  public confirmRestart () : void {
    this.dialog = true
  }

  public restart () : void {
    console.log('restart')
    this.$store.commit('newGame')
    this.$nextTick(() => window.scrollTo(0, 0))
  }

  public scoreUpdate (payload: { [k:string]: any }) {
    this.$store.commit('scoreUpdate', payload)
  }
}
