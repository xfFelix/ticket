import { isObject } from '@/util/common'

const state = {
  config: {
    city: ''
  },
}

// getters
const getters = {
  getConfig (state) {
    return state.config
  }
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
    if (!config || !isObject(config)) {
      state.config = undefined
    } else {
      state.config = Object.assign(state.config, config)
    }
  },
  initConfig(state) {
    state.config = {
      name: '',
      idcard: ''
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

