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

  @Prop()
  scoreboard: any;

  private scores: any[] = []

  public get playersCount () {
    return this.round.players.filter(item => item !== '').length
  }

  public get validScore () {
    const negativeScoresCount = this.scores.reduce((carry, current) => {
      return carry + (current < 0 ? 1 : 0)
    }, 0)
    return negativeScoresCount === (this.playersCount - 1)
  }

  created (): void {
    this.bootScores()
  }

  @Watch('validScore', {})
  onValidScoreChange (newVal: boolean, oldVal: boolean) {
    if (!oldVal && newVal) {
      this.updateWinningScore()
    }
  }

  public bootScores (): void {
    this.round.players.forEach((value, index) => {
      this.scores[index] = ''
    })
  }

  public updateWinningScore (): void {
    let updateIndex: any | null = null

    this.round.players.forEach((value, index) => {
      if (this.scores[index] === '' || parseInt(this.scores[index]) > 0) {
        if (updateIndex === null) {
          updateIndex = index
        }
      }
    })

    const sum = this.scores
      .filter(item => item < 0)
      .reduce((carry, current) => {
        if (isNaN(parseInt(current))) {
          return carry
        }
        return carry + parseInt(current)
      }, 0)

    console.log(sum)

    this.scores[updateIndex] = sum * -1

    this.$emit('score-update', { name: this.round.name, scores: this.scores })
  }
}
