import { isEmpty } from "util/common";

export default {
  // 获取用户信息
  getUserinfo: state => {
    if (!state.userinfo || isEmpty(state.userinfo)) return undefined
    return state.userinfo
  },
  // 获取配置信息
  getToken: state => {
    if (!state.token || isEmpty(state.token)) return undefined
    return state.token
  },
  // 获取商户平台
  getPlatform: state => {
    if (!state.platform || isEmpty(state.platform)) return undefined
    return state.platform
  },

  getShowSetPassword: state => {
    return state.showSetPassword
  },
  getShowSetMobile: state => {
    return state.showSetMoblie
  }
}
