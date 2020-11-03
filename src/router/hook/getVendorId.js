import store from '@/store'
import {getParam, getCookie} from 'util/common';

export default (router) => {
  router.beforeEach((to, from, next) => {
    let cookieVendorId = getCookie('vendorId')
    let cookieVendorUid = getCookie('vendorUid')
    if (getParam().vendorId || cookieVendorId) {
      store.dispatch('platform/setVendorId', getParam().vendorId || cookieVendorId)
    }
    if (getParam().vendorUid) {
      store.dispatch('platform/setVendorUid', getParam().vendorUid || cookieVendorUid)
    }
    next()
  });
}
