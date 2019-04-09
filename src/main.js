import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filter'
import './directives'
// 导入click事件
import FastClick from 'fastclick'
import 'lib-flexible'
import './common/css/index.scss'
import {toast} from '@/util/toast'
import 'swiper/dist/css/swiper.css'
FastClick.attach(document.body);

Vue.config.productionTip = false

Vue.prototype.$toast = toast

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
