import { localStorage } from 'common/storage'

let defaultPlatform = 0
let defaultVendorId = ''
let defaultVendorUid = ''
try{
  if (localStorage.get('platform')) {
    defaultPlatform = localStorage.get('platform')
    defaultVendorId = localStorage.get('vendorId')
    defaultVendorUid = localStorage.get('vendorUid')
  }
} catch(e) {
  console.error(e)
}

const state = {
  platform: defaultPlatform,
  vendorId: defaultVendorId,
  vendorUid: defaultVendorUid
}

// getters
const getters = {
  getPlatform: state => {
    return state.platform
  },
  getVendorId: state => {
    return state.vendorId
  },
  getVendorUid: state => {
    return state.vendorUid
  }
}

// actions
const actions = {
  setPlatform ({state, commit}, platform) {
    commit('setPlatform', platform)
  },
  setVendorId ({state, commit}, vendorId) {
    commit('setVendorId', vendorId)
  },
  setVendorUid ({state, commit}, vendorUid) {
    commit('setVendorUid', vendorUid)
  }
}

// mutations
const mutations = {
  setPlatform(state, platform) {
    state.platform = platform
    try {
      localStorage.set('platform',platform)
    }catch(e) {
      console.error(e)
    }
  },
  setVendorId(state, vendorId) {
    state.vendorId = vendorId
    try {
      localStorage.set('vendorId',vendorId)
    }catch(e) {
      console.error(e)
    }
  },
  setVendorUid(state, vendorUid) {
    state.vendorUid = vendorUid
    try {
      localStorage.set('vendorUid',vendorUid)
    }catch(e) {
      console.error(e)
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
