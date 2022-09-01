import Vue from 'vue'
import Vuex from 'vuex'
// eslint-disable-next-line
// @ts-ignore
import createPersistedState from 'vuex-persistedstate'
import { rummyStore } from './rummy.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  plugins: [createPersistedState()],
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    rummyStore
  }
})
