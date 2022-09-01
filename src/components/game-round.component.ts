import RoundScore from './round-score.vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { IRound, Round } from '@/shared/model/round/round.model'

@Component({
  components: {
    RoundScore
  }
})
export default class GameRound extends Vue {
  @Prop({
    type: Object,
    required: true,
    default: () => { return new Round('', 0, []) }
  })
  round!: IRound;

  @Prop({
    type: Object,
    required: true
  })
  scoreboard: {[k: string] : any[]} | undefined;

  private scores: any[] = []

  public get playersCount () {
    return this.round.players.filter(item => item.name !== '').length
  }

  public get isScoreValid () {
    const negativeScoresCount = this.scores.reduce((carry, current) => {
      return carry + (current < 0 ? 1 : 0)
    }, 0)
    return negativeScoresCount === (this.playersCount - 1)
  }

  created (): void {
    this.bootScores()
  }

  @Watch('scores', {})
  onScoresChange (newVal: string[]): void {
    if (!this.isScoreValid) {
      return
    }

    let updateIndex: any | null = null

    this.round.players.forEach((value, index) => {
      if (newVal[index] === '' || parseInt(newVal[index]) > 0) {
        if (updateIndex === null) {
          updateIndex = index
        }
      }
    })

    const sum = newVal
      .map(it => parseInt(it, 10))
      .filter(item => item < 0)
      .reduce((carry, current) => {
        if (isNaN(current)) {
          return carry
        }
        return carry + current
      }, 0)

    this.scores[updateIndex] = `${sum * -1}`

    this.$emit('score-update', { name: this.round.name, scores: this.scores })
  }

  public bootScores (): void {
    this.round.players.forEach((value, index) => {
      if (this.scoreboard) {
        this.scores[index] = this.scoreboard[this.round.name][index] ?? ''
      } else {
        this.scores[index] = ''
      }
    })
  }
}
