<template>
  <div class="oilHome">
    <Header class="navbar" :show-more="!yingqiudiShow && !haofang" >加油卡充值
      <i slot="icon" class="icon-gengduo-black"></i>
    </Header>
    <oil-type @oil-input="getInputValue" ref="oilType" @handle-value="handleValue"></oil-type>
    <div class="home-footer" v-if="disabled">
      <div class="exchange-btn" @click="submitBtn">应付积分{{config.total}}  |  立即充值</div>
      <div class="scoreW">
        <div class="left"><span class="score-left">椰子分余额</span><span class="score">{{userinfo.score}}</span></div>
        <div class="right" @click="detailToggle">费用明细<div class="arrow"><span :class="show.info?'bottom-arrow':'top-arrow'"></span></div></div>
      </div>
    </div>
    <div v-else class="home-footer">
      <div class="exchange-btn bg-tint">应付积分0.00  |  立即充值</div>
      <div class="scoreW">
        <div class="left"><span class="score-left">椰子分余额</span><span class="score color-tint">{{userinfo.score}}</span></div>
        <div class="right color-tint">费用明细</div>
      </div>
    </div>

    <!-- 兑换信息 -->
    <charge-info :show="show.info" @go-back="initShow" :info="costInfo"></charge-info>

    <transition name="fade">
      <bg-mask v-model="show.mask" :zIndex="zIndex"></bg-mask>
    </transition>
    <!-- 短信dialog -->
    <sms-code v-if="show.code" :show.sync="show.code" :fail-text="failText" @handler-show-info="initShow" @submit-order="submitOrder" @forget="setForget"></sms-code>
    <!-- <sms-code :show.sync="show.code" v-if="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" @forget="setForget"></sms-code> -->
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
        <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
        <div slot="btn">联系客服</div>
      </remindDialog>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>
  </div>
</template>

<script>
import {setPayType ,IOSFocus ,vipCustom} from '@/mixins'
import { mapActions, mapGetters } from 'vuex';
import { getParam } from "util/common";
import { IsChinaMobile, IsZhongshihua, IsZhongshiyou,IsInteger,isEmpty } from "util/common";
export default {
  mixins: [setPayType, IOSFocus ,vipCustom],
  components: {
    Header: () => import('@/components/Header'),
    BgMask: () => import(/* webpackPrefetch: true */ 'components/BgMask'),
    SmsCode: () => import(/* webpackPrefetch: true */ 'components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword'),
    SetMobile: () => import(/* webpackPrefetch: true */ 'components/SetMobile'),
    oilType: () => import(/* webpackPrefetch: true */ './components/oilType'),
    ChargeInfo: () => import(/* webpackPrefetch: true */ './components/ChargeInfo'),
  },
  data: () => ({
    show: {
      mask: false,
      code: false,
      info: false,
      dialog: false
    },
    failText: '',
    link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
    linkType: 'href',
    account: "",
    costInfo: {},
    disabled: false,
    submitClick:false,
    zIndex: 10,
    data: {}
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
  mounted(){
  },
  computed: {
    ...mapGetters({
      config: 'oil/getConfig',
      userinfo: 'getUserinfo'
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
    handleValue(val) {
      this.disabled = val
    },
    detailToggle() {
      this.submitClick = false
      this.$refs["oilType"].sendValue()
    },
    setForget() {
      this.zIndex = 10
      this.show = {mask:true,code:false,file:false, dialog:true}
    },
    async submitOrder (val) {
      const {faceValue, cardNum, token, type, rechargeType, mobile} = this.config
      let config = {faceValue, cardNum, token, rechargeType, oilCardType: type, phoneNo: mobile, code: val}
      // if (rechargeType === 1 && type === 2) {
      //   config.phoneNo = mobile
      // }
      const {submitOilOrder} = await import(/* webpackPrefetch: true */ 'api')
      let res = await submitOilOrder(config)
      if (res.code !== '1') {
        return this.failText = res.message
      }
      this.initShow()
      this.$router.push({
        name: 'oilRecordC',
      })
    },
    initShow() {
      this.zIndex = 10
      this.show = { mask: false, code: false, info: false, dialog:false }
    },
    handlerShowCode() {
      this.zIndex = 13
      this.show = { mask: true, code: true, info: false, dialog:false }
    },
    goRecovery() {
      this.$router.push('recovery')
    },
    async getInputValue(val) {
      // 获取手机号，卡号
      if(!IsChinaMobile(val.mobile)) {
        return false
      }
      if(this.config.type == 1) {
        if(!IsZhongshihua(val.cardNum)) {
          return false
        }
      }else {
        if(!IsZhongshiyou(val.cardNum)) {
          return false
        }
      }
      this.setConfig({mobile: val.mobile,cardNum: val.cardNum})
      if(this.submitClick) {
        if(this.config.total>this.userinfo.score) {
          return this.$toast("用户余额不足")
        }
        if(this.config.monthTotal > 30000 && isEmpty(this.userinfo.idnum)){
          this.$dialog({type:'confirm',content:'您消费额度超过3万，请先实名认证！'},()=>{
            this.$router.push({path:'/realName?back=/oil'})
          })
          return false;
        }else {
          let res = await this.checkPassword();
          if (!res) return false;
        }
        this.handlerShowCode()
      }else {
        this.show.mask = !this.show.mask
        this.show.info = !this.show.info
      }
    },
    submitBtn() {
      this.submitClick = true
      this.$refs["oilType"].sendValue()
    },
    ...mapActions({
      initConfig: 'oil/initConfig',
      checkPassword: 'checkPassword',
      setConfig: 'oil/setConfig'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.oilHome{
  padding-bottom: 120px;
  .navbar{
    background: #F5F5F5;
    color: #1A1A1A;
    position: fixed;
    width: 100%;
    .icon-gengduo-black {
      position: absolute;
      top: 9px;
      right: 16px;
      width: 24px;
      height: 24px;
      background-image: url('../../../common/images/header-more.png') !important;
      background-size: 100% 100%;
    }
  }
  .home-footer{
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    padding: 20px 16px 21px;
    box-sizing: border-box;
    border-top: 1px solid rgb(245, 245, 245);
    z-index: 12;
    .exchange-btn{
      font-size: 16px;
      background: $theme;
      color: #fff;
      height: 46px;
      line-height: 48px;
      border-radius: 10px;
      font-weight: bold;
      text-align: center;
      box-sizing: border-box;
    }
    .bg-tint {
      background: rgba($color: $theme, $alpha: 0.4);
    }
    .scoreW {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      .left {
        .score-left {
          font-size: 16px;
          color: #646464;
        }
        .score {
          margin-left: 6px;
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          color: $theme;
        }
      }
      .right {
        // margin-left: 10px;
        width: 74px;
        height: 20px;
        line-height: 22px;
        text-align: center;
        color: $theme;
        background: #F5F5F5;
        border-radius: 10px;
        .arrow {
          display: inline-block;
          margin-left: 5px;
          width: 6px;
          height: 6px;
          position: relative;
          .top-arrow {
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 6px;
            height: 6px;
            border-top: 2px solid $theme;
            border-right: 2px solid $theme;
            transform: rotate(-45deg);
          }
          .bottom-arrow {
            position: absolute;
            left: 0;
            top: -5px;
            display: block;
            width: 6px;
            height: 6px;
            border-top: 2px solid $theme;
            border-right: 2px solid $theme;
            transform: rotate(135deg);
          }
        }
      }
      .color-tint {
        color: rgba($color: $theme, $alpha: 0.4);
      }
    }
  }
  @media screen and (min-width: 600px){
    .home-footer, .navbar{
      max-width: 384px;
    }
  }
}
</style>

