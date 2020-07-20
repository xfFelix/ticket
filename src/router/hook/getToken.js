import store from 'store'
import {dialog} from 'util/toast';
import {tools_uri} from 'common/tools';
import {getInfo} from 'api';

export default router => {
  router.beforeEach(async(to, from, next) =>{
    // 验证并保存token
    let token = await store.dispatch('checkUrlToken')
    if (to.meta.requireAuth) {
      if (!token) {
        dialog({type: 'confirm', content: '请先登录'}, () => {
          window.location.href = process.env.VUE_APP_INFO_URl + '#!/login?back=' + tools_uri.encode(window.location)
          // window.location.href = process.env.VUE_APP_BASE_HOME_URL + '/#/login?back=' + tools_uri.encode(window.location)
        })
      } else {
        try {
          let info = await getInfo({token})
          if (info.error_code) {
            store.dispatch('setToken', undefined)
            store.dispatch('setUserinfo', undefined)
            dialog({type: 'confirm', content: '请先登录'}, () => {
              window.location.href = process.env.VUE_APP_INFO_URl + '#!/login?back=' + tools_uri.encode(window.location)
              // window.location.href = process.env.VUE_APP_BASE_HOME_URL + '/#/login?back=' + tools_uri.encode(window.location)
            })
          } else {
            info.data.haiHang = info.haiHang;
            store.dispatch('setUserinfo', info.data)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    next()
  });
  router.afterEach( ( to, from, next ) => {
    setTimeout(()=>{
            var _hmt = _hmt || [];
            (function() {
                //每次执行前，先移除上次插入的代码
                document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?691736653bc9daafe84e2286c9838720";
                hm.id = "baidu_tj"
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
    },0);
  });
}
