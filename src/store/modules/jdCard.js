import {isEmpty} from 'util/common';
import {sessionStorage } from 'common/storage'
let defaultConfig = {
  realCarP:undefined,
  cardPrice:undefined,
  salesPrice:undefined,
  productCode: undefined,
  num: undefined,
  monthTotal:undefined
}


const state = {
  config: defaultConfig
}


// getters
const getters = {
  getConfig (state) {
    if (!state.config || isEmpty(state.config)) return undefined
    return state.config
  },
}

// actions
const actions = {
  setConfig({ state, commit }, config) {
    commit('setConfig', config)
  },
  initConfig({commit}) {
    commit('initConfig')
  }
}

// mutations
const mutations = {
  setConfig(state, config) {
    state.config = Object.assign(state.config, config)
  },
  initConfig(state) {
    state.config = {
      realCarP:undefined,
      cardPrice:undefined,
      salesPrice:undefined,
      productCode: undefined,
      num: undefined,
      monthTotal: undefined
    }
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
