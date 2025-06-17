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

  public get isIOS (): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  }

  public onKeyPress (event: KeyboardEvent): void {
    const char = String.fromCharCode(event.which)
    const input = event.target as HTMLInputElement
    const currentValue = input.value

    // Allow numbers
    if (/[0-9]/.test(char)) return

    // Allow minus only at the beginning and if not already present
    if (char === '-' && input.selectionStart === 0 && !currentValue.includes('-')) return

    // Allow backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1) return

    event.preventDefault()
  }
}
