import { Component, Provide, Vue } from 'vue-property-decorator'
import GameRound from './game-round.vue'
import { IRound, Round } from '@/shared/model/round/round.model'
import { IPlayer, Player } from '@/shared/model/player/player.model'

@Component({
  components: {
    GameRound
  }
})
export default class PlayRummy extends Vue {
  public players: IPlayer[] = this.$store.getters.players

  public roundNames = this.$store.getters.roundNames;

  public rounds: IRound[] = this.$store.getters.rounds;

  public scoreboard: { [k:string]: string[] } = this.$store.getters.emptyScore;

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
      this.restart()
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
  }

  public restart () : void {
    this.$store.commit('newGame')
  }

  public scoreUpdate (payload: { [k:string]: any }) {
    this.$store.commit('scoreUpdate', payload)
  }
}
