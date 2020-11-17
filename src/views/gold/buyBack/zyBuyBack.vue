<template>
  <div class="goldBuyBack">
    <header>
      <i class="cubeic-back back" @click="$router.go(-1)"></i>黄金提货服务
    </header>
    <div class="buyBack-top">
      <div class="buyBack-top-bg">
      </div>
      <div class="intro-card">
        <img src="~common/images/gold/huangdi-logo.png" alt="">
        <div><span class="jewelry">信达贵金</span></div>
        <p>海南信达贵金科技有限公司是一家专业服务于互联网金融的贵金属交易公司。公司接受海南省监管机构监督指导，稳健运营；制定有严格的... <span @click="show.profile=true">更多 ></span></p>
      </div>
      <div class="goldbuy-back-money">
        <p class="title">回购到账金额</p>
        <p class="price-wrapper">
          <span class="price">{{backPrice|toPrice}}</span>
          <span class="yuan">元</span>
        </p>
      </div>
    </div>
    <div class="line"></div>
     <ul class="goldbuy-back-list gbb-form">
        <p class="goldbuy-back-info">
          <span class="square"></span>
          <span>填写到账银行卡信息</span>
        </p>
        <!-- <li class="l_add">卡密<input type="text" name="code" maxlength="14" placeholder="请输入兑换码"  disabled :value="backInfo.cardCode"/></li> -->
        <li><p class="left-text">联系电话</p><input type="text" name="mobile" maxlength="12" placeholder="请输入联系人电话" v-model="inpInfo.mobile"/></li>
        <li><p class="left-text">姓名</p><input type="text" name="name" maxlength="16" placeholder="请输入户主姓名" v-model="inpInfo.name" @blur="checkBank"/></li>
        <li><p class="left-text">银行卡号</p><input type="text" name="cardNum" maxlength="20" placeholder="请输入银行卡号" v-model="inpInfo.cardNum" @blur="checkBank"/></li>
        <li><p class="left-text">开户行</p><input type="text" name="bank" maxlength="20" placeholder="请输入开卡银行" v-model="inpInfo.bank" disabled/></li>
        <li><p class="left-text">开户支行</p><input type="text" name="subBank" maxlength="20" placeholder="请输入开户支行" v-model="inpInfo.subBank" /></li>

      </ul>
      <p class="arrivel-accound-day"><img src="~common/images/gold/icon_notice.png" alt=""><span>09:00---23:00 二小时到账，其它时间兑换次日处理</span></p>
      <div class="contactW">
        <div class="contact" @click="contact"><img src="~common/images/gold/icon-service.png" alt=""><span>联系客服</span></div>
      </div>
    <div class="backBnt-wrapper">
      <div class="agreement zy-agreement">
        <cube-checkbox class="with-click" v-model="checked" shape="circle">我已阅读并同意</cube-checkbox>
        <span style="color: #FE8B30" @click="show.file=true" class="file">《贵金属闲置回收协议》</span>
      </div>
      <div class="backBnt" @click="buyBnt()">提交</div>
    </div>

    <sms-code :show.sync="show.code" v-if="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" @forget="setForget"></sms-code>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
      <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
      <div slot="btn">联系客服</div>
    </remindDialog>
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <gold-file :show="show.file" @handle-show-file="initShow" :fileType="fileType"></gold-file>
    <gold-conpany :show="show.profile" @handle-show-profile="initShow"></gold-conpany>

  </div>
</template>

<script>
import { goldbuyback, zygoldbuyback ,goldPrice, checkBankAndName, goldBankInfo, findGoldBuyBackPrice, getInfo} from 'api';
import { mapGetters ,mapActions } from 'vuex';
import { setPayType ,IOSFocus ,vipCustom} from '@/mixins';
import { IsMobile,isEmpty, luhnCheck, getParam } from "util/common";
import store from 'store'
export default {
  mixins: [setPayType, IOSFocus,vipCustom],
  data:()=>({
    checked:true,
    backPrice:undefined,
    inpInfo:{
      mobile:undefined,
      name:undefined,
      cardNum:undefined,
      bank:undefined,
      subBank:undefined
    },
    show:{
      mask:false,
      code:false,
      file:false,
      profile: false,
      dialog: false
    },
    failText:'',
    id: sessionStorage.getItem('GOLDID'),
    gtype: sessionStorage.getItem('gtype'),
    token: '',
    fileType: 3,
    link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
    linkType: 'href'
  }),
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow();
          this.failText = undefined;
        }
      }
    },
  },
  computed:{
    ...mapGetters({
      getToken: 'getToken',
      goldConfig: 'gold/getConfig',
      backInfo: 'gold/getBackInfo',
      userinfo: 'getUserinfo'
    })
  },
  methods:{
    ...mapActions({
      checkPassword: 'checkPassword',
    }),
    setForget() {
        this.show = {mask:true,code:false,file:false,profile:false, dialog:true}
      },
    async getUserBankInfo () {
      let res= await goldBankInfo({
            token: this.getToken,
        })
        if(res.error_code != 0){
          this.$toast(res.message)
        }else {
          if(res.data != null){
            this.inpInfo.name = res.data.name
            this.inpInfo.bank = res.data.bank
            this.inpInfo.subBank = res.data.subBank
            this.inpInfo.cardNum = res.data.cardNum
          }
        }
    },
    async checkBank() {
      try {
        const { cardNum, name } = this.inpInfo
        if (!name || !cardNum) return
        const { data, error_code, message } = await checkBankAndName({token: this.getToken, realName: name, cardNum})
        if ([0, 500].includes(error_code)) {
          this.inpInfo.bank = data.bank
          if (error_code == 500) this.$toast(message)
        } else {
          this.inpInfo.bank = ''
          return this.$toast(message)
        }
      } catch (e) {

      }
    },
    async submitOrder(val){ //输入短信下单
        let currentId = this.gtype?this.gtype:this.backInfo.type
        let currentCardId = this.id?this.id:this.backInfo.cardId
        let currentAmount = this.amount?this.amount:this.backInfo.weight
            let res= await zygoldbuyback({
              token: this.getToken,
              amount: currentAmount,
              mobile: this.inpInfo.mobile,
              bank: this.inpInfo.bank,
              subBank: this.inpInfo.subBank,
              realName: this.inpInfo.name,
              cardNum: this.inpInfo.cardNum,
              id: currentId,  // 分自营黄金和金宇黄金
              cardId: currentCardId, // 分自营黄金和金宇黄金
              verify_code: val,
          })
          if(res.error_code != 0){
            return this.failText = res.message;
          }else{
            this.initShow();
            this.$dialog({content:"回购申请成功，请等候客服审核！09:00---23:00 二小时到账，其它时间兑换次日处理。"},()=>{
              this.$router.go(-1)
                  // window.location.href = 'http://192.168.0.107:8080/ticket/gold/record?cardId='+ currentId +'&token='+this.getToken+'&back=zygold'
                  // this.$router.replace({name:'goldRecord'})
              })
          }
    },
    async buyBnt(){
      if(!IsMobile(this.inpInfo.mobile)){
          return this.$toast('请输入有效的手机号码');
      }
      if(isEmpty(this.inpInfo.name)){
          return this.$toast('请输入真实姓名！');
      }
      if(isEmpty(this.inpInfo.cardNum)){
          return this.$toast('请输入有效的银行账号！');
      }
      if(isEmpty(this.inpInfo.bank)){
          return this.$toast('请输入开卡银行！');
      }
      if(isEmpty(this.inpInfo.subBank)){
          return this.$toast('请输入分行信息！');
      }
      if(!this.checked){
          return this.$toast('请先阅读并同意《黄金回购协议》');
      }
      let res = await this.checkPassword();
      if (!res) return;
      this.show={mask:true,code:true,file:false,dialog:false}
    },
    handlerShowInfo(){
        this.initShow();
      },
    initShow(){
      this.show={mask:false,code:false,file:false,profile:false, dialog:false}
    },
    showDig(){
      this.$dialog({title:'回购说明',content: "<p style='margin-top:-12px;text-align: left;'>本服务由深圳市金宇阳光文化发展有限公司提供。</p><p style='text-align: left;margin: 8px 0 -13px 0;'>回购价格=基础金价-3元/克，基础金价为上海黄金交易所Au99.99当日开盘价。</p>"},() => {})
    },
    async getGoldBuyBackPrice() {
      let res = await findGoldBuyBackPrice({
        token: this.getToken,
        cardId: this.id
      })
      if(res.error_code != 0){
          return
      }else {
        this.backPrice = res.data.buyMoney
      }
    },
    async getUserToken() {
      let res = await getInfo({
        token: this.getToken,
      })
      if(res.error_code != 0){
          return
      }else {
        store.dispatch('setUserinfo', res.data)
      }
    },
    contact() {
      window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
    }
  },
  mounted(){
    this.getUserBankInfo()
    if(this.backInfo.type==0){
      this.backPrice = (this.backInfo.barPrice-20)*this.backInfo.weight;
    }
    if(this.backInfo.type==1) {
      this.backPrice = (this.backInfo.sandPrice-21)*this.backInfo.weight;
    }
    // 自营黄金 回购价格从连接参数中获取
    if(getParam().id || sessionStorage.getItem('GOLDID')) {
      let id = getParam().id || sessionStorage.getItem('GOLDID')
      let gtype = getParam().gtype || sessionStorage.getItem('gtype')
      this.id = id
      sessionStorage.setItem('GOLDID',id)
      this.gtype = gtype
      sessionStorage.setItem('gtype',gtype)
      this.token = getParam().token
      this.getUserToken ()
      this.getGoldBuyBackPrice()
      this.fileType = 3
    }
    this.inpInfo.mobile = this.userinfo.userName;
    this.inpInfo.name = this.userinfo.realName;
  },
  components:{
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    BgMask: () => import('@/components/BgMask'),
    goldFile: () => import("./components/goldFile"),
    goldConpany: () => import("./components/goldConpany"),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword'),
  }

}
</script>

<style lang="scss" scoped>
.goldBuyBack{
  min-height: 100%;
  background: #fff;
  header{
    text-align: center;
    position: fixed;
    font-size: 0.48rem;
    color: #FEFEFE;
    background: #373C48;
    line-height: 1.173333rem;
    height: 1.173333rem;
    width: 100%;
    top: 0;
    z-index: 2;
    .back{
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.4rem;
    }
  }
  .buyBack-top {
    width: 100%;
    .buyBack-top-bg {
      width: 100%;
      height: 179px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      background: #373C48;
    }
    .intro-card {
      position: relative;
      margin: 0 auto;
      margin-top: -91px;
      width: 343px;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0px 2px 10px 0px rgba(220,220,220,0.6);
      img {
        position: absolute;
        top: -28px;
        left: 50%;
        margin-left: -35px;
        width: 70px;
        height: 70px;
      }
      div {
        position: absolute;
        top: 32px;
        left: 50%;
        margin-left: -38px;
        width: 76px;
        height: 24px;
        text-align: center;
        color: #fff;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        letter-spacing: 1px;
        border-radius: 15px;
        background: #FE8B30;
        .jewelry {
          display: inline-block;
          width: 152px;
          height: 48px;
          line-height: 48px;
          font-size: 28px;
          transform: scale(0.5);
          transform-origin: 0% 0%;
        }
      }
      p {
        padding: 75px 16px 0px 16px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #444444;
        line-height: 21px;
        span {
          margin-left: 8px;
          color: #FE8B30;
        }
      }
    }
    .goldbuy-back-money {
      text-align: center;
      padding-bottom: 25px;
      .title {
        margin-top: 32px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #444444;
      }
      .price-wrapper {
        margin-top: 12px;
        .price {
          font-size: 30px;
          font-family: DIN-Bold, DIN;
          font-weight: bold;
          color: #FE8B30;
        }
        .yuan {
          margin-left: 4px;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FE8B30;
        }
      }
    }
  }
  .line {
    width: 100%;
    height: 10px;
    background: #F7F7F7;
  }
  .goldbuy-back-list{
    padding: 32px 29px 0 29px;
    color: #4A4A4A;
    font-size: 14px;
    .goldbuy-back-info{
      margin-bottom: 10px;
      text-align: left;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #444444;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .square {
        width: 3px;
        height: 16px;
        background: #FE8B30;
        margin-right: 5px;
      }
    }
    li{
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      color: #444444;
      border-bottom: 1px solid #DEDEDE;
      .left-text {
        text-align: justify;
        width: 57px;
        height: 17px;
        float: left;
        font-family: PingFangSC-Regular, PingFang SC;
        &:after{
          content:'.';
          width: 100%;
          display: inline-block;
          overflow: hidden;
          height: 0;
        }
      }
      input{
        text-align: right;
        flex: 1;
        background: #fff;
      }
    }

    li input::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #999;
      font-size: 15px;
    }
    li input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #999;
      font-size: 15px;
    }
    li input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #999;
      font-size: 15px;
    }
    li input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #999;
      font-size: 15px;
    }
  }

  .arrivel-accound-day{
    padding: 10px 0 0 29px;
    font-size:12px;
    color: #999999;
    text-align: left;
    img {
      display: inline-block;
      vertical-align: middle;
      width: 13px;
      height: 13px;
      margin-right: 5px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .contactW {
    padding-bottom: 128px;
    .contact {
      margin: 0 auto;
      margin-top: 28px;
      width: 319px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: rgba($color: #000000, $alpha: 0.4);
      font-size: 15px;
      background: rgba($color: #000000, $alpha: 0.02);
      border: 2px;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 12px;
        height: 14px;
        margin-right: 5px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .backBnt-wrapper {
    width: 100%;
    height: 108px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0px -1px 10px 0px rgba(220,220,220,0.6);
    .agreement {
      display: flex;
      align-items: center;
      .cube-checkbox {
        padding: 0 0 0 29px;
      }
      .file {
        color: #FE8B30;
        margin-top: -2px;
      }
    }
    .backBnt {
      margin: 0 auto;
      width: 319px;
      height: 45px;
      line-height: 45px;
      border-radius: 22px;
      background: #FE8B30;
      text-align: center;
      color: #fff;
      font-size: 15px;
      z-index: 1;
    }
  }

}
</style>
<style>
.cube-dialog-title-def{
  margin:20px 0 25px 0;
}
.zy-agreement .cube-checkbox_checked .cube-checkbox-ui i {
  color: #FE8B30;
}
.cube-dialog-btn_highlight {
  color: #FE8B30;
}
@media screen and (min-width: 600px) {
  header,.backBnt-wrapper{
    max-width: 384px; /*no*/
  }
}
</style>

