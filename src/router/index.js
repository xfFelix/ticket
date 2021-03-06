import Vue from 'vue'
import Router from 'vue-router'
import getToken from './hook/getToken'
import changeTitle from './hook/changeTitle'
import getVendorId from './hook/getVendorId'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: 'ticket',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'tourHome',
      meta: {
        title: '首页',
        keepAlive:true
      },
      component: () => import(/* webpackChunkName: "group-ticket" */ 'views/home')
    },
    {
      path: '/goodsDetail',
      name: 'tourGoodsDetail',
      component: () => import(/* webpackChunkName: "group-ticket" */ 'views/goodsDetail')
    },
    {
      path: '/order',
      name: 'tourOrder',
      meta: {
        title: '订单'
      },
      component: () => import(/* webpackChunkName: "group-ticket" */ 'views/order'),
      redirect: '/order/list',
      children:[
        {
          path: 'list',
          name: 'tourList',
          component: () => import(/* webpackChunkName: "group-ticket" */ 'views/order/list'),
          meta: {
            title: '订单列表',
            requireAuth: true
          }
        },
        {
          path: 'detail',
          name: 'tourDetail',
          component: () => import(/* webpackChunkName: "group-ticket" */ 'views/order/detail'),
          meta: {
            title: '订单详情',
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/settlement',
      name: 'tourSettlement',
      component: () => import(/* webpackChunkName: "group-ticket" */ 'views/settlement'),
      meta: {
        title: '结算',
        requireAuth: true
      }
    },
    // {
    //   path: '/oil/oilRecovery',
    //   name: 'oilRecovery',
    //   component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilRecovery'),
    //   meta: {
    //     title: '加油卡回收',
    //     requireAuth: true
    //   }
    // },
    // {
    //   path: '/oil/oilRecord',
    //   name: 'oilRecord',
    //   component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilRecord'),
    //   meta: {
    //     title: '加油卡充值',
    //     // requireAuth: true
    //   }
    // },
    // {
    //   path: '/oil/oilChangeS',
    //   name: 'oilChangeS',
    //   component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilChangeS'),
    //   meta: {
    //     title: '兑换成功',
    //     // requireAuth: true
    //   }
    // },
    // {
    //   path: '/oil/oilRecoveryS',
    //   name: 'oilRecoveryS',
    //   component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilRecoveryS'),
    //   meta: {
    //     title: '回购成功',
    //     // requireAuth: true
    //   }
    // },
    // {
    //   path: '/oil',
    //   name: 'oil',
    //   component: () => import(/* webpackChunkName: "group-oil" */ 'views/oil'),
    //   meta: {
    //     title: '加油卡',
    //     requireAuth: true
    //   },
    //   redirect: '/oil/home',
    //   children: [
    //     {
    //       path: 'home',
    //       name: 'oilHome',
    //       component: () => import(/* webpackChunkName: "group-oil" */ 'views/oil/home'),
    //       meta: {
    //         title: '加油卡首页',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'recovery',
    //       name: 'recoveryList',
    //       component: () => import(/* webpackChunkName: "group-oil" */ 'views/oil/recovery'),
    //       meta: {
    //         title: '加油卡回收列表',
    //         requireAuth: true
    //       }
    //     }
    //   ]
    // },

    {
      path: '/oil',
      name: 'oilC',
      component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilC'),
      meta: {
        title: '加油卡',
        requireAuth: true
      },
      redirect: '/oil/home',
      children: [
        {
          path: 'home',
          name: 'oilHomeC',
          component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilC/home'),
          meta: {
            title: '加油卡首页',
            requireAuth: true
          }
        },
        {
          path: 'record',
          name: 'oilRecordC',
          component: () => import(/* webpackChunkName: "group-oil" */ 'views/oilC/record'),
          meta: {
            title: '加油卡记录',
            requireAuth: true
          }
        },
      ]
    },

    // {
    //   path: '/memberCard',
    //   name: 'memberCard',
    //   component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard'),
    //   meta: {
    //     title: '会员卡券',
    //     requireAuth: true
    //   },
    //   redirect: '/memberCard/home',
    //   children: [
    //     {
    //       path: 'home',
    //       name: 'memberHome',
    //       component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard/home'),
    //       meta: {
    //         title: '会员卡券首页',
    //         requireAuth: true
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: '/memberCard/cardType',
    //   name: 'cardType',
    //   component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard/cardType'),
    //   meta: {
    //     title: '充值类型',
    //     requireAuth: true
    //   }
    // },
    // {
    //   path: '/memberCard/cardRecord',
    //   name: 'cardRecord',
    //   component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard/cardRecord'),
    //   meta: {
    //     title: '兑换记录',
    //     requireAuth: true
    //   }
    // },
    // {
    //   path: '/memberCard/cardChangeS',
    //   name: 'cardChangeS',
    //   component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCard/cardChangeS'),
    //   meta: {
    //     title: '充值成功',
    //     requireAuth: true
    //   }
    // },

    {
      path: '/memberCard',
      name: 'memberCardC',
      component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCardC'),
      meta: {
        title: '会员卡券',
        requireAuth: true
      },
      redirect: '/memberCard/home',
      children: [
        {
          path: 'home',
          name: 'memberHomeC',
          component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCardC/home'),
          meta: {
            title: '会员卡券首页',
            requireAuth: true
          }
        },
        {
          path: '/memberCard/memberDetail',
          name: 'memberDetail',
          component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCardC/detail'),
          meta: {
            title: '会员卡券详情',
            requireAuth: true
          }
        },
        {
          path: '/memberCard/cardRecord',
          name: 'memberRecord',
          component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCardC/record'),
          meta: {
            title: '会员卡券记录',
            requireAuth: true
          }
        },
        {
          path: '/memberCard/recordDetail',
          name: 'recordDetail',
          component: () => import(/* webpackChunkName: "group-vip" */ 'views/memberCardC/record/RecordDetail'),
          meta: {
            title: '会员卡券记录',
            requireAuth: true
          }
        },
      ]
    },

    {
      path: '/changeCoin',
      name: 'changeCoin',
      component: () => import(/* webpackChunkName: "group-coin" */ 'views/changeCoin'),
      meta: {
        title: '兑换金币',
        requireAuth: true
      },
      redirect: '/changeCoin/home',
      children: [
        {
          path: 'home',
          name: 'coinHome',
          component: () => {
            const vendorId = store.getters.getUserinfo.vendorId
            switch(vendorId) {
              case process.env.VUE_APP_YEYUN_YULE:
                return import(/* webpackChunkName: "group-coin" */ 'views/changeCoin/home/yeyun_yule.vue')
              default:
                return import(/* webpackChunkName: "group-coin" */ 'views/changeCoin/home')
            }
        },
          meta: {
            title: '兑换金币',
            requireAuth: true
          }
        },
        {
          path: 'recovery',
          name: 'coinList',
          component: () => import(/* webpackChunkName: "group-coin" */ 'views/changeCoin/recovery'),
          meta: {
            title: '兑换金币列表',
            requireAuth: true
          }
        }
      ]
    },
    // {
    //   path: '/life',
    //   name: 'life',
    //   component: () => import(/* webpackChunkName: "group-life" */'views/life'),
    //   meta: {
    //     title: '生活缴费',
    //     requireAuth: true
    //   },
    //   redirect: '/life/home',
    //   children: [
    //     {
    //       path: 'home',
    //       name: 'lifeHome',
    //       component: () => import(/* webpackChunkName: "group-life" */'views/life/home'),
    //       meta: {
    //         title: '生活缴费首页',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'geolocation',
    //       name: 'lifeGeolocation',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/geolocation'),
    //       meta: {
    //         title: '选择城市',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'account',
    //       name: 'lifeAccount',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/addAccount'),
    //       meta: {
    //         title: '新增缴费账户',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'record',
    //       name: 'lifeRecord',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/record'),
    //       meta: {
    //         title: '兑换记录',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'changeS',
    //       name: 'lifeChangeS',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/changeS'),
    //       meta: {
    //         title: '兑换成功',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'paymentUnit',
    //       name: 'paymentUnit',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/paymentUnit'),
    //       meta: {
    //         title: '选择缴费单位',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'group',
    //       name: 'group',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/group'),
    //       meta: {
    //         title: '选择分组',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'protocol',
    //       name: 'Protocol',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/protocol'),
    //       meta: {
    //         title: '缴费协议',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'payment',
    //       name: 'LifePayment',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/payment'),
    //       meta: {
    //         title: '缴费账户',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'userNumber',
    //       name: 'LifeFindNumber',
    //       component: () => import(/* webpackChunkName: "group-life" */ 'views/life/userNumber'),
    //       meta: {
    //         title: '如何查户号',
    //         requireAuth: true
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: '/gold',
    //   name: 'gold',
    //   component: () => import(/* webpackChunkName: "group-life" */'views/gold'),
    //   meta: {
    //     title: '黄金兑换',
    //     requireAuth: true
    //   },
    //   redirect: '/gold/home',
    //   children: [
    //     {
    //       path: 'home',
    //       name: 'goldHome',
    //       component: () => import(/* webpackChunkName: "group-life" */'views/gold/home'),
    //       meta: {
    //         title: '黄金兑换',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'buyBack',
    //       name: 'goldBuyBack',
    //       component: () => import(/* webpackChunkName: "group-life" */'views/gold/buyBack'),
    //       meta: {
    //         title: '黄金回购',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'buyBackZy',
    //       name: 'goldBuyBackZy',
    //       component: () => import(/* webpackChunkName: "group-life" */'views/gold/buyBack/zyBuyBack'),
    //       meta: {
    //         title: '黄金回购',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'buyBackGs',
    //       name: 'goldBuyBackGs',
    //       component: () => import(/* webpackChunkName: "group-life" */'views/gold/buyBack/gsBuyBack'),
    //       meta: {
    //         title: '竞技黄金回购',
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: 'record',
    //       name: 'goldRecord',
    //       component: () => import(/* webpackChunkName: "group-life" */'views/gold/record'),
    //       meta: {
    //         title: '黄金兑换记录',
    //         requireAuth: true
    //       }
    //     }
    //   ]},

      {
        path: '/gold',
        name: 'gold',
        component: () => import(/* webpackChunkName: "group-life" */'views/goldzy'),
        meta: {
          title: '黄金兑换',
          requireAuth: true
        },
        redirect: '/gold/home',
        children: [
          {
            path: 'home',
            name: 'goldZyHome',
            component: () => import(/* webpackChunkName: "group-life" */'views/goldzy/home'),
            meta: {
              title: '黄金兑换',
              requireAuth: true
            }
          },
          {
            path: 'buyBack',
            name: 'goldJyBuyBack',
            component: () => import(/* webpackChunkName: "group-life" */'views/goldzy/buyBack'),
            meta: {
              title: '黄金回购',
              requireAuth: true
            }
          },
          {
            path: 'buyBackZy',
            name: 'goldZyBuyBack',
            component: () => import(/* webpackChunkName: "group-life" */'views/goldzy/buyBack/zyBuyBack'),
            meta: {
              title: '黄金回购',
              requireAuth: true
            }
          },
          {
            path: 'buyBackGs',
            name: 'goldGsBuyBack',
            component: () => import(/* webpackChunkName: "group-life" */'views/goldzy/buyBack/gsBuyBack'),
            meta: {
              title: '竞技黄金回购',
              requireAuth: true
            }
          },
          {
            path: 'introduce',
            name: 'goldIntroduce',
            component: () => import(/* webpackChunkName: "group-life" */'views/goldzy/introduce'),
            meta: {
              title: '黄金兑换',
              requireAuth: true
            }
          },
          {
            path: 'record',
            name: 'goldZyRecord',
            component: () => import(/* webpackChunkName: "group-life" */'views/goldzy/record'),
            meta: {
              title: '黄金兑换记录',
              requireAuth: true
            }
          }
        ]},



      // {
      //   path: '/phone',
      //   name: 'phone',
      //   component: () => import(/* webpackChunkName: "group-life" */'views/phone'),
      //   meta: {
      //     title: '话费充值',
      //     requireAuth: true
      //   },
      //   redirect: '/phone/home',
      //   children: [
      //     {
      //       path: 'home',
      //       name: 'phoneHome',
      //       component: () => import(/* webpackChunkName: "group-life" */'views/phone/home'),
      //       meta: {
      //         title: '话费充值',
      //         requireAuth: true
      //       }
      //     },
      //     {
      //       path: 'record',
      //       name: 'phoneRecord',
      //       component: () => import(/* webpackChunkName: "group-life" */'views/phone/record'),
      //       meta: {
      //         title: '话费记录',
      //         requireAuth: true
      //       }
      //     }
      //   ]
      // },
      {
        path: '/phone',
        name: 'phone',
        component: () => import(/* webpackChunkName: "group-life" */'views/phoneC'),
        meta: {
          title: '话费充值',
          requireAuth: true
        },
        redirect: '/phone/home',
        children: [
          {
            path: 'home',
            name: 'phoneCHome',
            component: () => import(/* webpackChunkName: "group-life" */'views/phoneC/home'),
            meta: {
              title: '话费充值',
              requireAuth: true
            }
          },
          {
            path: 'record',
            name: 'phoneCRecord',
            component: () => import(/* webpackChunkName: "group-life" */'views/phoneC/record'),
            meta: {
              title: '话费记录',
              requireAuth: true
            }
          }
        ]
      },

      {
        path: '/jdCard',
        name: 'jdCard',
        component: () => import(/* webpackChunkName: "group-life" */'views/jdCard'),
        meta: {
          title: '京东E卡',
          requireAuth: true
        },
        redirect: '/jdCard/home',
        children: [
          {
            path: 'home',
            name: 'jdCardHome',
            component: () => import(/* webpackChunkName: "group-life" */'views/jdCard/home'),
            meta: {
              title: '京东E卡',
              requireAuth: true
            }
          },
          {
            path: 'record',
            name: 'jdCardRecord',
            component: () => import(/* webpackChunkName: "group-life" */'views/jdCard/record/index.vue'),
            meta: {
              title: '京东E卡记录',
              requireAuth: true
            }
          }
        ]
      },

      {
        path: '/creditCard',
        name: 'creditCard',
        component: () => import(/* webpackChunkName: "group-life" */'views/creditCard'),
        meta: {
          title: '信用卡还款',
          requireAuth: true
        },
        redirect: '/creditCard/home',
        children: [
          {
            path: 'home',
            name: 'CCHome',
            component: () => import(/* webpackChunkName: "group-life" */'views/creditCard/home'),
            meta: {
              title: '信用卡还款',
              requireAuth: true
            }
          },
          {
            path: 'record',
            name: 'CCRecord',
            component: () => import(/* webpackChunkName: "group-life" */'views/creditCard/record'),
            meta: {
              title: '还款记录',
              requireAuth: true
            }
          },
          {
            path: 'manage',
            name: 'CCManage',
            component: () => import(/* webpackChunkName: "group-life" */'views/creditCard/manage'),
            meta: {
              title: '信用卡管理',
              requireAuth: true
            }
          },
          {
            path: 'unbind',
            name: 'CCUnbind',
            component: () => import(/* webpackChunkName: "group-life" */'views/creditCard/unbind'),
            meta: {
              title: '信用卡解绑',
              requireAuth: true
            }
          },
          {
            path: 'addCard',
            name: 'CCAddCard',
            component: () => import(/* webpackChunkName: "group-life" */'views/creditCard/addCard'),
            meta: {
              title: '添加信用卡',
              requireAuth: true
            }
          }
        ]
      },
      {
        path: '/realName',
        name: 'realName',
        meta: {
          title: '实名认证',
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/realName')
      },
      {
        path: '/realNameF',
        name: 'realNameF',
        meta: {
          title: '实名认证',
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/realName/realNameF')
      },
      {
        path: '/bind',
        name: 'userBind',
        meta: {
          title: '用户绑定',
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/bind')
      },
      {
        path: '/contact',
        name: 'contact',
        meta: {
          title: '联系我们',
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/contact')
      },
      {
        path: '/cooperate',
        name: 'cooperate',
        meta: {
          title: '商务合作',
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/cooperate')
      },
      {
        path: '/integrallog',
        name: 'integrallog',
        meta: {
          title: '积分日志',
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/integrallog')
      },
      {
        path: '/helpCenter',
        name: 'helpCenter',
        meta: {
          title: '帮助中心',
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/helpCenter')
      },
      {
        path: '/reCharge',
        name: 'reCharge',
        meta: {
          title: '椰子分充值',
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/reCharge')
      },
      {
        path: '/taxeRecord',
        name: 'taxeRecord',
        meta: {
          title: '还款记录',
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/userInfo/taxeRecord')
      },
      {
        path: '/changeCoinCQ',
        name: 'changeCoinCQ',
        meta: {
          title: '椰子分兑换传奇金币',
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "group-ticket" */ 'views/changeCoinCQ')
      },
  ]
})

getToken(router)
changeTitle(router)
getVendorId(router)
export default router

