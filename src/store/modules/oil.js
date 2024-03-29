import {isEmpty} from 'util/common';

const state = {
  typeList: [
    {label: '中国石化', value: 1},
    {label: '中国石油', value: 2},
  ],
  config: {
    cardNum: undefined,
    faceValue: 100,
    type: 1,
    token: undefined,
    mobile: '',
    code: '',
    total: '',
    rechargeType: 1, // 充值方式： 1 直充 2 加油卡充值
    monthTotal: undefined
  },
  statusList: [
    { label: '兑换成功', value: 0 },
    { label: '回收成功', value: 1 },
    { label: '回收失败', value: 2 },
    { label: '回收中', value: 3 },
    { label: '兑换失败', value: 3 }
  ]
}

// getters
const getters = {
  getTypeList: state => {
    if (!state.typeList || isEmpty(state.typeList)) return undefined
    return state.typeList
  },
  getConfig (state) {
    if (!state.config || isEmpty(state.config)) return undefined
    return state.config
  },
  getStatusList: state => {
    return state.statusList
  }
}

// actions
const actions = {
  setTypeList ({state, commit}, typeList) {
    commit('setTypeList', typeList)
  },
  setConfig({state, commit, rootGetters }, config) {
    if (!state.config.token) {
      config.token = rootGetters.getToken
    }
    commit('setConfig', config)
  },
  initConfig({state,commit}) {
    commit('initConfig')
  }
}

// mutations
const mutations = {
  setTypeList(state, typeList) {
    if (!typeList || isEmpty(typeList)) {
      state.typeList = undefined
    } else {
      state.typeList = typeList
    }
  },
  setConfig(state, config) {
    if (!config || isEmpty(config)) {
      state.config = undefined
    } else {
      state.config = Object.assign(state.config, config)
    }
  },
  initConfig(state) {
    state.config = {
      cardNum: undefined,
      faceValue: 100,
      type: 1,
      mobile: '',
      token: undefined,
      code: '',
      total: '',
      rechargeType: 1, // 充值方式： 1 直充 2 加油卡充值
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
