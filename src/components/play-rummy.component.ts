import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import GameRound from './game-round.vue'
import { IRound, Round } from '@/shared/model/round/round.model'
import { IPlayer, Player } from '@/shared/model/player/player.model'

const ROUND_NAMES: string[] = ['2T', 'TS', '2S', '3T', '2TS', 'T2S', '3S']

@Component({
  components: {
    GameRound
  }
})
export default class PlayRummy extends Vue {
  public playing = true;

  public players: IPlayer[] =[
    new Player('', 0),
    new Player('', 0),
    new Player('', 0),
    new Player('', 0),
    new Player('', 0)
  ]

  public roundNames = [...ROUND_NAMES];

  public rounds: IRound[] = []

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
    return this.players.filter(item => item.name !== '').length
  }

  public get currentRoundIndex () {
    return this.rounds.length
  }

  public icon (): string {
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
    const newRound = new Round(this.roundNames[this.currentRoundIndex], this.currentRoundIndex, [...this.players])
    this.rounds.push(newRound)
  }

  public restart () : void {
    console.log('restart')
  }

  public scoreUpdate (payload: { [k:string]: any }) {
    this.$set(this.scoreboard, payload.name, payload.scores)
  }
}
