<template>
  <div class="changeCoin-home">
    <div class="content">
      <div class="input-wrapper">
        <div class="logo">
          <img src="~common/images/logo.png" alt="">
        </div>
        <input type="text" disabled v-model="userinfo.userName">
      </div>
      <div class="score-wrapper">
        椰子分余额：<span class="score">{{userinfo.score}}</span>
      </div>
      <div class="list">
        <h2>种类</h2>
        <div class="container">
          <div class="item">{{storeName}}</div>
        </div>
      </div>
      <div class="list">
        <h2>面值</h2>
        <div class="container">
          <div class="face-item" v-for="(item, index) in list" :key="index">
            <div class="price-wrapper" :class="coinInfo.moneyNum == item.catKey ? 'active': ''" @click="toggleActive(item)">
              <div class="title">{{item.catName}}</div>
              <div class="price"><span>售价：{{item.catKey}}</span></div>
            </div>
            <div class="gift"><span>送{{userinfo.coinAlisa ? userinfo.coinAlisa : '金币'}}{{Math.round(item.num)}}</span></div>
          </div>
        </div>
      </div>
      <div class="desc">
        <h2>温馨提示：</h2>
        <p>
          1 本会员可享受官方客服1对1VIP售后服务一日，时间自兑换之日起计算1天。<br>
          2 本会员附赠一定数量椰豆。<br>
          3 本会员可享受周边产品99折特惠折扣。<br>
          4 本服务不支持7天无理由退款。<br>
          5 椰豆发放问题请咨询客服：邮箱：wanbaohua@cocogc.cn
        </p>
      </div>
    </div>
    <button class="confirm" @click="coinChange">立即兑换</button>

    <!-- 遮罩层 -->
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <!-- 兑换信息 -->
    <recharge-info btnBgColor="#21AEF6" :show="show.info" @handler-show-code="showSms" @go-back="initShow" :coinInfo="coinInfo"></recharge-info>
    <!-- 发送短信 -->
    <sms-code btnBgColor="#21AEF6" :show="show.sms" @handler-show-info="showInfo" @submit-order="codeInfo" :failText="codeMessage"></sms-code>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile" btnBgColor="#21AEF6"></set-mobile>

  </div>
</template>
<script>
import { localStorage } from 'common/storage'
import { tools_uri } from 'common/tools';
import { getCostCoin, sumbmitCoin, getInfo } from 'api';
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    checked: true,
    codeErrFlag: false,
    codeMessage: "",
    codeErr: {},
    show: {
      mask: false,
      info: false,
      sms: false,
      file: false
    },
    coinInfo: {
      num: 0,
      tax_total: 0,
      service_fee: 0,
      total: 0,
      moneyNum: ""
    },
    vendorId: null,
    vendorUid: undefined,
    storeName: '',
    list: [],
    desc: ''
  }),
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow()
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      userinfo: 'getUserinfo',
    }),
    showSetPassword: {
      get() {
        return this.$store.getters.getShowSetPassword
      },
      set(val) {
        this.$store.dispatch('setShowSetPassword', val)
      }
    },
    showSetMobile: {
      get() {
        return this.$store.getters.getShowSetMobile
      },
      set(val) {
        this.$store.dispatch('setShowSetMobile', val)
      }
    }
  },
  methods: {
    ...mapActions({
      checkPassword: 'checkPassword',
      setUserInfo: 'setUserinfo'
    }),
    async getList(){
      const {getChuanQiCoinList} = await import('@/api')
      const { code, data } = await getChuanQiCoinList({catKey: this.vendorId, token: this.getToken})
      this.list = data
      this.coinInfo.moneyNum = data[0].catKey
      this.storeName = data[0].parentName
      this.desc = data[0].content
    },
    toggleActive(item) {
      this.coinInfo.moneyNum = item.catKey
    },
    codeInfo(code) {
      this.coinSumbmit(code)
    },
    initShow() {
      this.show = { mask: false, info: false, sms: false, file: false };
    },
    showInfo() {
      this.show = { mask: true, info: true, sms: false, file: false };
    },
    showSms() {
      this.show = { mask: true, info: false, sms: true, file: false };
    },
    async coinChange() {
      let res = await this.checkPassword();
      if (!res) return;
      this.getCostCoin(this.coinInfo.moneyNum)
    },
    outLogin() {
      this.$dialog({ type: 'confirm', content: '确认退出当前账号？' }, () => {
        localStorage.remove('token');
        window.location.href = process.env.VUE_APP_INFO_URl + '#!/login?back=' + tools_uri.encode(window.location.origin + window.location.pathname)
      })
    },
    initData() {
      this.coinInfo = {
        num: 0,
        tax_total: 0,
        service_fee: 0,
        total: 0,
        moneyNum: ""
      }
    },
    async getCostCoin(integral){
      try{
        let params = { token: this.getToken, integral, vendorId: this.vendorId, vendorUid: this.vendorUid }
        const { code, data } = await getCostCoin(params);
        this.coinInfo = { ...this.coinInfo, ...data[0]}
        this.showInfo()
      } catch (e) {
        this.$toast('getCostCoin 接口失败')
      }
    },
    async coinSumbmit(code) {
      let res = await sumbmitCoin({ token: this.getToken, integral: this.coinInfo.moneyNum, code: code, vendorId: this.vendorId, vendorUid: this.vendorUid })
      if (res.code != 1 && res.code != 4) {
        this.initShow();
        return this.$toast(res.message);
      }
      if (res.code == 4) {
        this.codeMessage = res.message;
        this.codeErrFlag = true;
        return
      }
      if (res.code == 1) {
        this.coinInfo.moneyNum = "";
        this.initShow();
        return this.$dialog({ title: "恭喜您，兑换成功",icon:"cubeic-right" }, () => {
          this.coinInfo = {
            num: 0,
            tax_total: 0,
            service_fee: 0,
            total: 0,
            moneyNum: ""
          }
          this.getInfo();
          this.getList()
          return
        })
      }
    },
    async getInfo() {
      let info = await getInfo({ token: this.getToken })
      if (!info.error_code) { return this.setUserInfo(info.data) }
    },
  },
  mounted() {
    if (this.$route.query.vendorId) {
      this.vendorId = this.$route.query.vendorId
    } else {
      this.vendorId = this.userinfo.vendorId
    }
    if (this.$route.query.vendorUid) {
      this.vendorUid = this.$route.query.vendorUid
    }
    this.getList()
  },
  created() {
    console.log('进入椰子娱乐页面')
  },
  components: {
    BgMask: () => import('components/BgMask'),
    SmsCode: () => import('./components/SmsCode'),
    RechargeInfo: () => import('./components/RechargeInfo'),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword'),
    SetMobile: () => import(/* webpackPrefetch: true */ 'components/SetMobile'),
  },
}
</script>
<style lang="scss" scoped>
.changeCoin-home{
  min-height: 100%;
  background: #fff;
  header{
    background: #373C48;
    color: #fff;
    height: 92px;
    font-size: 18px;
    position: relative;
    z-index: 2;
    padding-top: 22px;
    text-align: center;
    .back{
      position: absolute;
      left: 15px;
      margin-top: -3px;
      &::before{
        font-size: 25px;
      }
    }
  }
  .content{
    padding: 20px 15px 50px;
    overflow: hidden;
    box-sizing: border-box;
    background: #fff;
    .input-wrapper{
      height:60px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 10px 0px rgba(55,60,72,0.25);
      border-radius:5px;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 2;
      .logo{
        flex: 0 0 54px;
        text-align: center;
        line-height: 60px;
        img{
          display: inline-block;
          vertical-align: middle;
          width: 22px;
          height: 22px;
        }
      }

      input{
        flex: 1;
        height: 100%;
        font-size: 16px;
        border-radius:5px;
        color: #000000 !important;
        &:disabled{
          background: #fff;
          // color: #999;
          color: #000000 !important;
        }
      }
    }
    .score-wrapper{
      color: #4A4A4A;
      margin-top: 20px;
      .score{
        color: #ff7149;
      }
    }
    .list{
      margin-top: 15px;
      h2{
        color: #999;
      }
      .container{
        overflow: hidden;
        .item{
          width: 30%;
          height: 49px;
          margin-left: 4.5%;
          margin-top: 15px;
          background:#21AEF6;
          border-radius:5px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 15px;
          float: left;
          &:nth-child(3n + 1){
            margin-left: 0;
          }
        }
        .face-item{
          width: 30%;
          margin-left: 4.5%;
          margin-top: 15px;
          border-radius:5px;
          float: left;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          &:nth-child(3n + 1){
            margin-left: 0;
          }
          .price-wrapper{
            height: 49px;
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            color: #21AEF6;
            &::after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              border: 1px solid #21AEF6;
              box-sizing: border-box;
              width: 200%;
              height: 200%;
              transform: scale(0.5);
              transform-origin: left top;
              border-radius:10px 10px 0px 0px;
              pointer-events: none;
            }
            &.active{
              background: #21AEF6;
              color: #fff;
              border-radius:5px 5px 0px 0px;
              box-sizing: border-box;
            }
            .title{
              font-weight: bold;
              font-size: 15px;
            }
            .price{
              font-size: 12px;
              font-weight: 200;
              span{
                display: block;
                transform: scale(.916);
              }
            }
          }
          .gift{
            width: 100%;
            height: 20px;
            color: #999;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            opacity: .9;
            &::after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              border: 1px solid #DEDEDE;
              border-top: none;
              box-sizing: border-box;
              width: 200%;
              height: 200%;
              transform: scale(0.5);
              transform-origin: left top;
              border-radius: 0px 0px 10px 10px;
              pointer-events: none;
            }
            span{
              display: block;
              white-space: nowrap;
              transform: scale(.75);
            }
          }
        }
      }
    }
    .desc{
      margin-top: 30px;
      h2{
        font-weight:400;
        color:rgba(74,74,74,1);
        font-size: 15px;
      }
      p{
        margin-top: 18px;
        font-size: 12px;
        color: rgba(153,153,153,1);
        line-height: 1.8;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  .confirm{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background: #21AEF6;
    color: #fff;
    font-size: 15px;
    font-weight:400;
    border: none;
    right:0;
    max-width: 384px;
    margin: 0 auto;
  }
}
</style>
<style lang="scss">
.cube-dialog-icon{
  .cubeic-right{
    background: #fff;
    width: auto;
    height: auto;
    &::before{
      color:#21AEF6;
      font-size:60px;
    }
  }
}
.cube-dialog-btns{
  .cube-dialog-btn_highlight{
    color: #21AEF6;
  }
}
</style>
