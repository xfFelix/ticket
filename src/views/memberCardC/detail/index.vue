<template>
  <div class="cardDetail">
    <Header class="navbar" :show-more="false" >{{detailInfo.categoryName}}{{detailInfo.memberName}}
      <i slot="icon" class="icon-gengduo-white"></i>
    </Header>
    <div class="cardDetail-main">
      <div class="card-infoW">
        <div class="card-info-img">
          <img v-if="detailInfo.productId" v-lazy="require('../../../common/images/memberCard/detail_icon/'+detailInfo.productId+'.png')" alt="">
        </div>
        <div class="card-info">
          <p class="title">{{detailInfo.categoryName}}{{detailInfo.memberName}}</p>
          <p class="priceW"><span class="current-price">{{detailInfo.sellingPrice|toPrice}}</span><span>积分</span><span class="passed-price">{{detailInfo.marketPrice|toPrice}}</span></p>
        </div>
      </div>
      <div class="card-inputW" v-if="detailInfo.productType!=6">
         <input type="text" autofocus="autofocus" class="card-inp" @click="inputClick($event)" maxlength="11" placeholder="请输入充值账号" v-model="account"/>
      </div>
      <div class="card-noticeW">
        <p class="title">兑换须知</p>
        <div class="content" v-html="content"></div>
      </div>

    </div>

    <div class="footerW">
      <div class="serviceW">
        <img src="@/common/images/icon_kefu.png" alt="">
        <p>联系客服</p>
      </div>
      <div class="tax-infoW" v-if="detailInfo.productType==6 || account">
        <div class="tax-info-btn" @click="detailToggle">费用明细<div class="arrow"><span :class="show.info?'bottom-arrow':'top-arrow'"></span></div></div>
        <div class="submit-btn" @click="submitBtn">
          应付积分{{costInfo.total}}  |  立即兑换
        </div>
      </div>
      <div class="tax-infoW" v-else>
        <div class="tax-info-btn shallow-color">费用明细</div>
        <div class="submit-btn shallow-color-bg">
          应付积分0.00 |  立即兑换
        </div>
      </div>

    </div>

    <!-- 兑换信息 -->
    <charge-info v-if="show.info" :show.sync="show.info" @go-back="initShow" :info="costInfo" :account="account"></charge-info>

    <Sms-code :show.sync="show.sms" v-if="show.sms" :fail-text="failText" @handler-show-info="initShow" @submit-order="codeInfo" @forget="setForget"></Sms-code>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
      <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
      <div slot="btn">联系客服</div>
    </remindDialog>



    <!-- 遮罩层 -->
    <transition name="fade">
      <bg-mask v-model="show.mask" :zIndex="zIndex"></bg-mask>
    </transition>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>
  </div>
</template>
<script>
import { IOSFocus } from "@/mixins";
import { mapGetters, mapActions } from 'vuex';
import { vipCardInfo, vipCostInfo, vipSubmit } from 'api';
export default {
  mixins: [IOSFocus],
  data:()=>({
    show: {
      mask: false,
      info: false,
      sms: false,
      dialog: false
    },
    account: '',
    detailInfo:{},
    content: '',
    costInfo: {},
    failText: '',
    link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
    linkType: 'href',
    zIndex: 10
  }),
  components: {
    Header: () => import('@/components/Header'),
    BgMask: () => import('@/components/BgMask'),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword'),
    SetMobile: () => import(/* webpackPrefetch: true */ 'components/SetMobile'),
    ChargeInfo: () => import(/* webpackPrefetch: true */ './components/ChargeInfo'),
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
  },
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
    ...mapActions({
        checkPassword: 'checkPassword',
      }),
    setForget() {
      this.zIndex = 10
      this.show = {mask:true,info: false,sms: false,file:false,dialog:true}
    },
    initShow() {
      this.zIndex = 10
      this.show = { mask: false, info: false, sms: false,dialog:false };
    },
    showSms() {
      this.zIndex = 13
      this.show = { mask: true, info: false, sms: true,dialog:false };
    },
    detailToggle() {
      this.show.mask = !this.show.mask
      this.show.info = !this.show.info
    },
    async getDetailInfo() {
      let id = this.$route.query.id
      let data = await vipCardInfo({ id: id });
      if (data.code != 1) { return this.$toast(data.message); }
      this.detailInfo = data.data.mbsCardProduct
      this.content = data.data.content
      this.getCostInfo()
    },
    async getCostInfo() {
      let data = await vipCostInfo({ token: this.getToken, productId: this.detailInfo.productId });
      if (data.code !== '1' && data.code !== '6' && data.code !== '4') return this.$toast(data.message);
      this.costInfo = data.data
    },

    async submitBtn() {
      let data = await vipCostInfo({ token: this.getToken, productId: this.detailInfo.productId });
      if (data.code !== '1' && data.code !== '6' && data.code !== '4') return this.$toast(data.message);
      if (data.code === '6') {
          this.$dialog({ content: '您消费额度超过3万，请先实名认证' }, () => {
          this.$router.push({path:'/realName?back=/memberCard'})
        })
        return false
      }
      if (data.code === '4') {
        return this.$dialog({ content: '可用余额不足' }, () => {
          return this.initShow();
        })
      }
      let res = await this.checkPassword();
      if (!res) return;
      this.showSms()
    },
    codeInfo(val) {
      this.vipSubmit(val)
    },
    //提交订单
    async vipSubmit(code) {
      let res = await vipSubmit({ code: code, token: this.getToken, productId: this.detailInfo.productId, accountNo: this.account });
      if (res.code == 4) {
        this.failText = res.message
        return this.codeErrFlag = true;
      }
      if (res.code != 1 && res.code != 4) {
        this.initShow();
        this.$toast(res.message);
        this.$router.replace({ name: 'memberRecord'})
        return false
      }
      // localStorage.setItem('vipInfoS',JSON.stringify(res.data))
      // this.$router.push({ name: 'cardChangeS'})
      //  成功跳转记录页面
      this.$toast('提交成功');
      this.$router.replace({ name: 'memberRecord'})
    },
    inputClick(e) {
      e.target.focus();
    }
  },
  mounted() {
    this.getDetailInfo()
  }
}
</script>
<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.cardDetail {
  background: #F5F5F5;
  padding-bottom: 54px;
  .navbar{
      background: #fff;
      color: #1A1A1A;
      position: fixed;
      width: 100%;
      .icon-gengduo-white {
        position: absolute;
        top: 9px;
        right: 16px;
        width: 24px;
        height: 24px;
        background-image: url('../../../common/images/header-moreW.png') !important;
        background-size: 100% 100%;
      }
    }
    .cardDetail-main {
      padding: 16px;
      padding-top: 60px;
      .card-infoW {
        padding: 16px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        .card-info-img {
          width: 168px;
          height: 100px;
          img {
            border-radius: 10px;
          }
        }
        .card-info {
          flex: 1;
          padding-left: 12px;
          padding-top: 12px;
          .title {
            height: 42px;
            color: #1A1A1A;
            font-size: 18px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
          }
          .priceW {
            margin-top: 16px;
            color: $theme;
            font-size: 14px;
            .current-price {
              margin-right: 2px;
              font-size: 18px;
              font-weight: bold;
              font-family: DINPro-Bold;
            }
            .passed-price {
              margin-left: 8px;
              color: #969696;
              font-size: 12px;
              text-decoration: line-through;
            }
          }
        }
      }
      .card-inputW {
        margin-top: 12px;
        padding: 16px;
        border-radius: 10px;
        background: #fff;
        .card-inp {
          font-size: 16px;
          color: #1A1A1A;
        }
      }
      .card-noticeW {
        margin-top: 12px;
        padding: 16px;
        border-radius: 10px;
        background: #fff;
        .title {
          font-size: 16px;
          color: #1A1A1A;
          font-weight: bold;
          font-family: PingFangSC-Semibold;
        }
        .content {
          margin-top: 10px;
          font-size: 14px;
          color: #1A1A1A;
          line-height: 22px;
        }
      }
    }
    .footerW {
      width: 100%;
      height: 54px;
      position: fixed;
      bottom: 0;
      padding: 0 16px;
      background: #fff;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-top: 1px solid rgb(245, 245, 245);
      z-index: 12;
      .serviceW {
        width: 40px;
        img {
          margin: 0 auto;
          width: 20px;
          height: 20px;
        }
        p {
          font-size: 10px;
          color: #7E7E7E;
        }
      }
      .tax-infoW {
        padding-left: 16px;
        display: flex;
        align-items: center;
        .tax-info-btn {
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
              border-top: 2px solid $phone;
              border-right: 2px solid $phone;
              transform: rotate(-45deg);
            }
            .bottom-arrow {
              position: absolute;
              left: 0;
              top: -5px;
              display: block;
              width: 6px;
              height: 6px;
              border-top: 2px solid $phone;
              border-right: 2px solid $phone;
              transform: rotate(135deg);
            }
          }
        }
        .submit-btn {
          margin-left: 12px;
          width: 200px;
          height: 40px;
          line-height: 44px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          border-radius: 20px;
          background: $theme;
          letter-spacing: 1px;
        }
        .shallow-color-bg {
          background: rgba($color: $theme, $alpha: 0.4)
        }
        .shallow-color {
          color: rgba($color: $theme, $alpha: 0.4)
        }
      }

    }
}
</style>
<style scoped>
@media screen and (min-width: 600px) {
  .navbar, .footerW{
    max-width: 384px; /*no*/
  }
}
</style>
