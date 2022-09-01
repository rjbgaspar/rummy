import { Module } from 'vuex'
import { IPlayer, Player } from '@/shared/model/player/player.model'
import { IRound, Round } from '@/shared/model/round/round.model'

const ROUND_NAMES: string[] = ['2T', 'TS', '2S', '3T', '2TS', 'T2S', '3S']

const EMPTY_SCORE: { [k:string]: string[] } = {
  [ROUND_NAMES[0]]: [],
  [ROUND_NAMES[1]]: [],
  [ROUND_NAMES[2]]: [],
  [ROUND_NAMES[3]]: [],
  [ROUND_NAMES[4]]: [],
  [ROUND_NAMES[5]]: [],
  [ROUND_NAMES[6]]: []
}

export interface RummyStateStorable {
  roundNames: string[];
  players: IPlayer[];
  scoreboard: { [k:string]: string[] };
  rounds: IRound[];
}

export const defaultRummyState: RummyStateStorable = {
  roundNames: [...ROUND_NAMES],
  players: [
    new Player('', 0),
    new Player('', 0),
    new Player('', 0),
    new Player('', 0),
    new Player('', 0)
  ],
  scoreboard: { ...EMPTY_SCORE },
  rounds: []
}

export const rummyStore: Module<RummyStateStorable, any> = {
  state: { ...defaultRummyState },
  getters: {
    roundNames: state => state.roundNames,
    players: state => state.players,
    scoreboard: state => state.scoreboard,
    rounds: state => state.rounds,
    playersCount: state => state.players.filter(item => item.name !== '').length,
    currentRoundIndex: state => state.rounds.length
  },
  mutations: {
    newGame (state) {
      ROUND_NAMES.forEach((it) => state.scoreboard[it].splice(0))
      state.rounds.splice(0)
      state.players.forEach(it => { it.luckyCount = 0 })
    },
    newRound (state, payload) {
      const newRound = new Round(state.roundNames[payload.currentRoundIndex], payload.currentRoundIndex, payload.players)
      state.rounds.push(newRound)
    },
    scoreUpdate (state, payload) {
      state.scoreboard[payload.name] = payload.scores
    },
    setPlayerName (state, payload) {
      state.players[payload.index].name = payload.name
    },
    incrementPlayerLuckyCount (state, payload) {
      state.players[payload.index].luckyCount++
    },
    decrementPlayerLuckyCount (state, payload) {
      state.players[payload.index].luckyCount--
    }
  }
}
