/**
 * Created by zzmhot on 2017/3/23.
 *
 * 状态管理器
 *
 * @author: xfFelix
 * @github: ''
 * @email: 894838158@qq.com
 * @Date: 2018/11/11 1:17
 *
 *
 */

import Vue from 'vue'
import Vuex from 'vuex'

// 引入模块
import face from './modules/face'
import sign from './modules/sign'
import createLogger from 'vuex/dist/logger' // 每次修改会去控制台打一个状态

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters: {
    face_config: state => state.face.config,
    sign_config: state => state.sign.config
  },
  modules: {
    face,
    sign
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
