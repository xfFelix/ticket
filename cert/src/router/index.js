import Vue from 'vue'
import Router from 'vue-router'
// import changeTitle from './hook/changeTitle';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/sign'
    },
    {
      path: '/sign',
      name: 'signHelper',
      component: () => import('views/sign/signHelper'),
      meta: {
        title: '签约助手',
        keepAlive:true
      }
    },
    {
      path: '/sign/signHelps',
      name: 'signHelps',
      component: () => import('views/sign/signHelps'),
      meta: {
        title: '签约助手',
      }
    },
    {
      path: '/sign/signHelpFile',
      name: 'signHelpFile',
      component: () => import('views/sign/signHelpFile'),
      meta: {
        title: '在线签约用户协议',
      }
    },
    {
      path: '/sign_geo',
      redirect: '/sign_geo/home',
      component: () => import('views/sign_geo'),
      children: [
        {
          path: 'home',
          name: 'signGeoHome',
          component: () => import('views/sign_geo/signHelper'),
          meta: {
            title: '签约助手',
            keepAlive: true
          }
        },
        {
          path: 'geolocation',
          name: 'signGeolocation',
          component: () => import('views/sign_geo/geolocation'),
          meta: {
            title: '选择地区',
          }
        },
        {
          path: 'success',
          name: 'signGeoSuccess',
          component: () => import('views/sign_geo/success'),
          meta: {
            title: '签约成功',
          }
        }
      ]
    },
    {
      path: '/sign_com',
      redirect: '/sign_com/home',
      component: () => import('views/sign_com'),
      children: [
        {
          path: 'home',
          name: 'signComGeoHome',
          component: () => import('views/sign_com/signHelper'),
          meta: {
            title: '签约助手',
            keepAlive: true
          }
        },
        {
          path: 'geolocation',
          name: 'signComGeo',
          component: () => import('views/sign_com/geolocation'),
          meta: {
            title: '选择地区',
          }
        },
        {
          path: 'success',
          name: 'signComGeoSuccess',
          component: () => import('views/sign_com/success'),
          meta: {
            title: '签约成功',
          }
        }
      ]
    },
    {
      path: '/sign_info',
      component: () => import('views/sign_info'),
      name: 'SignInfo',
      meta: {
        title: '签约助手',
        keepAlive: true
      }
    },
    {
      path: '/face',
      redirect: '/face/user',
      component: () => import('views/face'),
      children: [
        {
          path: 'user',
          name: 'UserFace',
          component: () => import('views/face/user'),
          meta: {
            title: '签约助手'
          }
        },
        {
          path: 'select',
          name: 'FaceSelect',
          component: () => import('views/face/select'),
          meta: {
            title: '人脸识别'
          }
        },
        {
          path: 'success',
          name: 'FaceSuccess',
          component: () => import('views/face/success'),
          meta: {
            title: '认证成功'
          }
        },
        {
          path: 'signSuccess',
          name: 'SignSuccessForFace',
          component: () => import('views/face/SignSuccess'),
          meta: {
            title: '签约成功'
          }
        }
      ]
    }
  ]
})

// changeTitle(router)
export default router

