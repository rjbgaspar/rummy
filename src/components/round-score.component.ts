import { Inject, Prop, Vue, Watch } from 'vue-property-decorator'
import { IRound, Round } from '@/shared/model/round/round.model'

export default class RoundScore extends Vue {
  @Prop({
    type: Object,
    required: true,
    default: () => { return new Round('', 0, []) }
  })
  round!: IRound;

  @Prop()
  scoreboard: any

  @Inject()
  readonly sharedState!: any

  public actualScoreboard: any[] = [];

  public get actualScoreboardKeys () {
    if (!this.round) { return null }
    return [...this.sharedState.roundNames].splice(0, (this.round.index) + 1)
  }

  @Watch('scoreboard', { deep: true })
  onScoreBoardChange (newVal: any, oldVal: any) {
    console.log('watcher')
    this.updateActualScoreboard()
  }

  updateActualScoreboard (): void {
    const scores = []

    for (const player of this.round.players) {
      scores.push(0)
    }

    // eslint-disable-next-line
    // @ts-ignore
    for (const key of this.actualScoreboardKeys) {
      for (const playerIndex in this.round.players) {
        scores[playerIndex] += this.scoreboard[key][playerIndex]
      }
    }
    this.$set(this, 'actualScoreboard', scores)
  }
}
