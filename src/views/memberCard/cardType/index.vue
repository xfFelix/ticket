<template>
  <div class="cardType">
    <!-- 选择卡券 -->
    <card-select @info-content="infoContent"></card-select>
    <!-- 兑换信息 -->
    <charge-info v-if="show.info" :show.sync="show.info" @go-back="initShow" @send-sms="sendCode" :info="chargeInfo"></charge-info>
    <!-- 短信 -->

    <Sms-code :show.sync="show.sms" v-if="show.sms" :fail-text="failText" @handler-show-info="initShow" @submit-order="codeInfo" @forget="setForget"></Sms-code>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
        <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
        <div slot="btn">联系客服</div>
      </remindDialog>
    <!-- <sms-code :show="show.sms" :fail-text="failText" @go-back="initShow" @code-info="codeInfo" :codeError.sync="codeErrFlag" @send-sms="sendCode"></sms-code> -->
    <!-- 遮罩层 -->
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>
  </div>
</template>
<script>
import { vipCostInfo, sendSmsCode, vipSubmit } from 'api';
import { mapGetters } from 'vuex';
import { tools_uri } from 'common/tools';
import { IOSFocus } from "@/mixins";
export default {
  mixins: [IOSFocus],
  data: () => ({
    show: {
      mask: false,
      info: false,
      sms: false,
      dialog: false
    },
    productId: undefined,
    codeErrFlag: false,
    chargeInfo: {
      productName: undefined,
      sellingPrice: undefined,
      tax_total: undefined,
      total: undefined,
      cardNumber: undefined,
      productType: undefined,
      costWay:undefined
    },
    failText: '',
    link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
      linkType: 'href'
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
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
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow()
        }
      }
    }
  },
  methods: {
    setForget() {
        this.show = {mask:true,info: false,sms: false,file:false,dialog:true}
      },
    initShow() {
      this.show = { mask: false, info: false, sms: false,dialog:false };
    },
    showInfo() {
      this.show = { mask: true, info: true, sms: false,dialog:false };
    },
    showSms() {
      this.show = { mask: true, info: false, sms: true,dialog:false };
    },
    infoContent(item) {
      console.log(item.productId)
      this.productId = item.productId;
      this.chargeInfo.cardNumber = item.cardNumber;
      this.chargeInfo.costWay = item.costWay;
      this.vipCostInfo();
    },
    //兑换信息
    async vipCostInfo() {
      let data = await vipCostInfo({ token: this.getToken, productId: this.productId });
      if (data.code !== '1' && data.code !== '6' && data.code !== '4') return this.$toast(data.message);
      if (data.code === '6') {
          this.$dialog({ content: '请先实名认证' }, () => {
          this.$router.push({path:'/realName?back=/memberCard'})
        })
        return false
      }
      if (data.code === '4') {
        return this.$dialog({ content: '可用余额不足' }, () => {
          return this.initShow();
        })
      }
      this.chargeInfo.productName = data.data.productName;
      this.chargeInfo.sellingPrice = data.data.sellingPrice;
      this.chargeInfo.tax_total = data.data.tax_total;
      this.chargeInfo.total = data.data.total;
      this.chargeInfo.productType = data.data.productType;
      this.chargeInfo.service_fee = data.data.service_fee
      this.showInfo();
    },
    //发送短信
    async sendSmsCode() {
      // if (this.userinfo.payValidType !== 1) {
      //   let res = await sendSmsCode({ token: this.getToken })
      //   if (res.error_code) {
      //     this.initShow();
      //     return this.$toast(res.message);
      //   };
      // }
      this.showSms()
    },
    sendCode() {
      this.sendSmsCode();
    },
    codeInfo(val) {
      this.vipSubmit(val)
    },
    //提交订单
    async vipSubmit(code) {
      let res = await vipSubmit({ code: code, token: this.getToken, productId: this.productId, accountNo: this.chargeInfo.cardNumber });
      if (res.code == 4) {
        this.failText = res.message
        return this.codeErrFlag = true;
      }
      if (res.code != 1 && res.code != 4) {
        this.initShow();
        return this.$toast(res.message);
      }
      localStorage.setItem('vipInfoS',JSON.stringify(res.data))
      this.$router.push({ name: 'cardChangeS'})
    },
  },
  components: {
    ChargeInfo: () => import('./components/ChargeInfo'),
    BgMask: () => import('components/BgMask'),
    // SmsCode: () => import('./components/SmsCode'),
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    CardSelect: () => import('./components/CardSelect'),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword'),
    SetMobile: () => import(/* webpackPrefetch: true */ 'components/SetMobile')
  },
  mounted() {


  }
}
</script>

<style lang="scss" scoped>
.cardType {
  background: #fff;
  width: 100%;
  height: 100%;
}
</style>
