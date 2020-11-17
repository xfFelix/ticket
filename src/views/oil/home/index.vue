<template>
  <div class="home">
    <score></score>
    <price-list></price-list>

    <div class="home-footer">
      <div class="exchange" @click="handlerShowType">立即兑换</div>
      <!-- 项目需求隐藏立即回收功能 -->
      <!-- <div class="back" @click="goRecovery">立即回收</div> -->
    </div>

    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <!-- 加油卡号dialog -->
    <card-number :show="show.card" @close-dialog="initShow" @handler-show-info="handlerShowInfo" @handler-show-type="handlerShowType"></card-number>
    <!-- 短信dialog -->
    <sms-code :show.sync="show.code" v-if="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" @forget="setForget"></sms-code>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
        <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
        <div slot="btn">联系客服</div>
      </remindDialog>
    <!-- 选择类型dialog 中石化1，中石油2 -->
    <select-type :show="show.type" @handler-show-info="handlerClick" @init-show="initShow"></select-type>
    <!-- 详情dialog -->
    <recharge-info :show="show.info" @handler-show-code="handlerShowCode" @go-back="goBack"></recharge-info>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    Score: () => import('./components/Score'),
    PriceList: () => import('./components/PriceList'),
    CardNumber: () => import(/* webpackPrefetch: true */ './components/CardNumber'),
    BgMask: () => import(/* webpackPrefetch: true */ 'components/BgMask'),
    SmsCode: () => import(/* webpackPrefetch: true */ './components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    SelectType: () => import(/* webpackPrefetch: true */ './components/SelectType'),
    RechargeInfo: ()=> import(/* webpackPrefetch: true */ './components/RechargeInfo'),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword'),
    SetMobile: () => import(/* webpackPrefetch: true */ 'components/SetMobile')
  },
  data: () => ({
    show: {
      mask: false,
      card: false,
      code: false,
      type: false,
      info: false,
      dialog: false
    },
    failText: '',
    link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
    linkType: 'href'
  }),
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow()
        }
      }
    }
  },
  created() {
    this.initConfig()
  },
  computed: {
    ...mapGetters({
      config: 'oil/getConfig'
    }),
    showSetPassword: {
      get () {
        return this.$store.getters.getShowSetPassword
      },
      set (val) {
        this.$store.dispatch('setShowSetPassword', val)
      }
    },
    showSetMobile: {
      get () {
        return this.$store.getters.getShowSetMobile
      },
      set (val) {
        this.$store.dispatch('setShowSetMobile', val)
      }
    }
  },
  methods: {
    setForget() {
        this.show = {mask:true,code:false,file:false,card:false, type: false, dialog:true}
      },
    async submitOrder () {
      const {faceValue, code, cardNum, token, type, rechargeType, mobile} = this.config
      let config = {faceValue, code, cardNum, token, rechargeType, oilCardType: type}
      if (rechargeType === 1 && type === 2) {
        config.phoneNo = mobile
      }
      const {submitOilOrder} = await import(/* webpackPrefetch: true */ 'api')
      let res = await submitOilOrder(config)
      if (res.code !== '1') {
        this.$store.dispatch('oil/setConfig', {code: ''})
        return this.failText = res.message
      }
      this.initShow()
      this.$router.push({
        path: '/oil/oilChangeS',
        query: {
          id : res.data
        }
      })
    },
    initShow() {
      this.show = { mask: false, card: false, code: false, type: false, info: false, dialog:false }
    },
    handlerClick() {
      if (+this.config.rechargeType === 1) {
        this.handlerShowCard()
      } else if(+this.config.rechargeType === 2) {
        this.handlerShowInfo()
      }
    },
    handlerShowInfo() {
      this.show = { mask: true, info: true, type: false, card: false, code: false ,dialog:false }
    },
    async handlerShowType() {
      let res = await this.checkPassword()
      if (!res) return
      this.show = { mask: true, type: true, card: false, code: false, info: false, dialog:false }
    },
    handlerShowCard() {
      this.show = { mask: true, card: true, code: false, type: false, info: false, dialog:false }
    },
    handlerShowCode() {
      this.show = { mask: true, code: true, card: false, type: false, info: false, dialog:false }
    },
    goBack() {
      if (this.config.rechargeType === 1) {
        this.handlerShowCard()
      } else if (this.config.rechargeType === 2) {
        this.handlerShowType()
      }
    },
    goRecovery() {
      this.$router.push('recovery')
    },
    ...mapActions({
      initConfig: 'oil/initConfig',
      checkPassword: 'checkPassword'
    })
  }
}
</script>

<style lang="scss" scoped>
.home{
  background: #fff;
  padding-bottom: 44px;
  .home-footer{
    position: fixed;
    bottom: 0;
    // left: 0;
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    height: 44px;
    text-align: center;
    .exchange{
      font-size: 15px;
      flex: 2;
      background: #30CE84;
      color: #fff;
      height: 100%;
      line-height: 44px;
    }
    .back{
      flex: 1;
      font-size: 15px;
      color: #4a4a4a;
      line-height: 44px;
      height: 100%;
      border: 1px solid #dedede;
    }
  }
  @media screen and (min-width: 600px){
    .home-footer{
      max-width: 384px;
      // left: 50%;
      // transform: translateX(-50%)
    }
  }
}
</style>

