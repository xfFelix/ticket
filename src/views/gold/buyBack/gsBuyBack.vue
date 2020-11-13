<template>
  <div class="goldBuyBack">
    <div class="BuyBackW">


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
        <div class="goldbuy-back-info">
          <div class="square"></div>
          <p>请选择回购方式</p>
        </div>
        <div class="buyBackTypeW">
          <div class="item">
            <li class="buyBackType buyBackType-gray" v-if="!isWithin">
              <img src="@/common/images/gold/alipay-gray.png" alt="">
              <p class="text">支付宝</p>
              <div class="titleW">
                <p class="title" style="color:#D2D2D2">仅支持不超过{{aliLimit}}元</p>
                <p class="sub-title" style="color:#D2D2D2">预计半个小时内</p>
              </div>
              <div class="select-icon select-icon-disabled"></div>
            </li>
            <li class="buyBackType" v-if="isWithin">
              <img src="@/common/images/gold/alipay.png" alt="">
              <p class="text">支付宝</p>
              <div class="titleW">
                <p class="title">仅支持不超过{{aliLimit}}元</p>
                <p class="sub-title">预计半个小时内</p>
              </div>
              <div class="select-icon" @click="selectType(1)" :class="[selected==1?'selected-icon':'']"></div>
            </li>
            <div class="detailW" v-if="isWithin && selected==1">
              <div class="main">
                 <div class="icon"><img src="@/common/images/gold/icon_phone.png" alt=""></div>
                  <li>
                    <div class="left">
                      手机号码
                    </div>
                    <div class="right">
                      <input type="tel" v-model="aliInfo.mobile" name="aliMobile" maxlength="12" placeholder="请输入手机号码" />
                    </div>
                  </li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_name.png" alt=""></div>
                <li>
                  <div class="left">
                    真实姓名
                  </div>
                  <div class="right">
                    <input type="text" v-model="aliInfo.name" name="nameName" maxlength="12" placeholder="请输入支付宝认证的姓名" />
                  </div>
                </li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_zhanghao.png" alt=""></div>
                <li>
                  <div class="left">
                    支付宝账号
                  </div>
                  <div class="right">
                    <input type="text" v-model="aliInfo.account" name="nameAccount" placeholder="请输入支付宝邮箱或手机号" />
                  </div>
                </li>
              </div>
            </div>
          </div>
          <div class="item">
            <li class="buyBackType">
              <img src="@/common/images/gold/unionpay.png" alt="">
              <p class="text">银行卡</p>
              <div class="titleW">
                <p class="title">金额不限</p>
                <p class="sub-title">预计2小时内到账</p>
              </div>
              <div class="select-icon" @click="selectType(0)" :class="[selected==0?'selected-icon':'']"></div>
            </li>
            <div class="detailW" v-if="selected==0">
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_phone.png" alt=""></div>
                <li><p class="left">联系电话</p><div class="right"><input type="tel" @click="itemClicked" name="mobile" maxlength="12" placeholder="请输入联系人电话" v-model="inpInfo.mobile"/></div></li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_name.png" alt=""></div>
                <li><p class="left">姓名</p><div class="right"><input type="text" @click="itemClicked"  name="name" maxlength="16" placeholder="请输入户主姓名" v-model="inpInfo.name" @blur="checkBank"/></div></li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_card.png" alt=""></div>
                <li><p class="left">银行卡号</p><div class="right"><input type="tel" @click="itemClicked"  name="cardNum" maxlength="20" placeholder="请输入银行卡号" v-model="inpInfo.cardNum" @blur="checkBank"/></div></li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_bank.png" alt=""></div>
                <li><p class="left">开户行</p><div class="right"><input type="text" name="bank" maxlength="20" placeholder="请输入开卡银行" v-model="inpInfo.bank" disabled/></div></li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_bank1.png" alt=""></div>
                <li><p class="left">开户支行</p><div class="right"><input type="text" @click="itemClicked" name="subBank" maxlength="20" placeholder="请输入开户支行" v-model="inpInfo.subBank" /></div></li>
              </div>

            </div>
          </div>
        </div>


      </ul>
      <!-- <p class="arrivel-accound-day"><img src="~common/images/gold/icon_notice.png" alt=""><span>09:00---23:00 二小时到账，其它时间兑换次日处理</span></p> -->
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
    </div>



    <succ-page :selectedType="selected" v-if="suceesShow" :successPrice="backPrice" @handle-success-page="closeSuccessPage"></succ-page>

    <sms-code :show="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" @forget="setForget"></sms-code>
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
    aliInfo: {
      mobile:undefined,
      name:undefined,
      account:undefined,
    },
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
    selected: undefined,  // 0 银行卡 1 支付宝
    options: [
      {
        label: "",
        value: "0"
      },
      {
        label: "",
        value: "1"
      }
      ],
    isWithin: false,
    suceesShow: false,
    aliLimit: 0,
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
        this.show = {mask:true,code:false,file:false,profile:false,dialog:true}
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
        let currentId = this.gtype
        let currentCardId = this.id
        let currentAmount = this.amount
      if(this.selected==0) {
        let res= await zygoldbuyback({
          buybackType: this.selected,
          token: this.getToken,
          amount: currentAmount,
          mobile: this.inpInfo.mobile,
          bank: this.inpInfo.bank,
          subBank: this.inpInfo.subBank,
          realName: this.inpInfo.name,
          cardNum: this.inpInfo.cardNum,
          id: currentId,  // 自营黄金
          cardId: currentCardId, // 自营黄金
          verify_code: val,
        })
          if(res.error_code != 0){
            return this.failText = res.message;
          }else{
            this.initShow();
            this.suceesShow=true
            // console.log("银行卡支付")
            // this.$dialog({content:"回购申请成功，请等候客服审核！09:00---23:00 二小时到账，其它时间兑换次日处理。"},()=>{
            //   this.$router.go(-1)
            //   })
          }
      }else {
        let res= await zygoldbuyback({
          buybackType: this.selected,
          token: this.getToken,
          amount: currentAmount,
          mobile: this.aliInfo.mobile,
          alipayName: this.aliInfo.name,
          alipayAccount: this.aliInfo.account,
          id: currentId,  // 自营黄金
          cardId: currentCardId, // 自营黄金
          verify_code: val,
        })
          if(res.error_code != 0){
            return this.failText = res.message;
          }else{
            this.initShow();
            this.suceesShow=true
            // console.log("支付宝支付")
            // this.$dialog({content:"回购申请成功，请等候客服审核！09:00---23:00 二小时到账，其它时间兑换次日处理。"},()=>{
            //   this.$router.go(-1)
            //   })
          }
      }

    },
    async buyBnt(){
      if(this.selected==1) {
        if(!IsMobile(this.aliInfo.mobile)){
          return this.$toast('请输入有效的手机号码！');
        }
        if(isEmpty(this.aliInfo.name)){
          return this.$toast('请输入支付宝认证的姓名！');
        }
        if(isEmpty(this.aliInfo.account)){
          return this.$toast('请输入支付宝邮箱或手机号！');
        }
      }else if(this.selected==0) {
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
            return this.$toast('请正确输入银行卡号（仅支持借记卡）！');
        }
        if(isEmpty(this.inpInfo.subBank)){
            return this.$toast('请输入分行信息！');
        }
      }else {
        return this.$toast('请选择回购方式');
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
      this.show={mask:false,code:false,file:false,profile:false,dialog:false}
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
        this.aliLimit = res.data.aliPayLimitAmount
        if(res.data.buyMoney>res.data.aliPayLimitAmount) {
          this.isWithin = false
          this.selected=0
        }else {
          this.isWithin = true
          this.selected=1
        }
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
    },
    selectType(val) {
      this.selected = val
    },
    closeSuccessPage(val) {
      this.suceesShow = val
      this.$router.go(-1)
    },
    itemClicked() {
      let dom = document.getElementsByClassName('goldBuyBack')[0]
      let height = document.body.clientHeight
      let clientHeight = dom.clientHeight
      let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      let ele = document.documentElement || document.body;
      if(scrollTop>0) {
        setTimeout(function(){
          //设置滚动条到最底部
          ele.scrollTop =  clientHeight
        },500);
      }
    }
  },
  mounted(){
    this.getUserBankInfo()
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
    if(IsMobile(this.userinfo.userName)) {
      this.inpInfo.mobile = this.userinfo.userName;
    }
    this.inpInfo.name = this.userinfo.realName;

  },
  components:{
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    BgMask: () => import('@/components/BgMask'),
    goldFile: () => import("./components/goldFile"),
    succPage: () => import("./components/succPage"),
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
    padding: 24px 17px 0 17px;
    color: #4A4A4A;
    font-size: 14px;
    .goldbuy-back-info{
      padding-bottom: 8px;
      text-align: left;
      font-size: 17px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #444444;
      display: flex;
      align-items: center;
      .square {
        width: 3px;
        height: 18px;
        background: #FE8B30;
        margin-right: 5px;
      }
    }
    .buyBackTypeW {
      position: relative;
      .item {
        margin: 12px 0;
        padding: 0px 16px;
        box-shadow: 0px 2px 10px 0px rgba(220,220,220,0.6);
        border-radius: 10px;
        // border-bottom: 1px solid #EBEBEB;
        .buyBackType {
          display: flex;
          align-items: center;
          height: 76px;
          // border-bottom: 1px solid #EBEBEB;
          img {
            width: 30px;
            height: 30px;
          }
          .text {
            margin-left: 8px;
            font-family: PingFangSC-Semibold;
            font-size: 18px;
          }
          .titleW {
            margin-left: 28px;
            .title {
              font-size: 16px;
              color: #444444;
            }
            .sub-title {
              margin-top: 2px;
              font-size: 14px;
              color: rgba($color: #000000, $alpha: 0.4)
            }
          }
          .select-icon {
            margin-left: auto;
            margin-right: 0px;
            width: 20px;
            height: 20px;
            background-image: url('../../../common/images/gold/circle-none.png');
            background-size: 100% 100%;
          }
          .selected-icon {
            background-image: url('../../../common/images/gold/choose.png');
          }
          .select-icon-disabled {
            background-image: url('../../../common/images/gold/choose-disabled.png');
          }
          .checkboxW {
            margin-left: auto;
            margin-right: 0px;
          }
        }
        .buyBackType-gray {
          color: #D2D2D2 !important;
        }
        .detailW {

          border-top: 1px solid #F5F5F5;
          .main {
            position: relative;
            .icon {
              position: absolute;
              top: 16px;
                img {
                  width: 18px;
                  height: 18px;
                  margin-right: 10px;
                }
              }
            li {
              display: flex;
              align-items: center;
              margin-left: 28px;
              height: 48px;
              font-size: 14px;
              border-bottom: 1px solid #F5F5F5;
              .left {
                width: 90px;
                color: #444444;
                font-size: 16px;
              }
              .right {
                input {
                  width: 193px;
                  height: 18px;
                  margin:0px;
                  padding:0px;
                  color: #444444;
                  font-size: 16px;
                  &:disabled {
                    background-color: #ffffff;
                    color: #444444;
                  }
                  &::placeholder {
                    font-size: 16px;
                    color: rgba($color: #000000, $alpha: 0.4);
                  }
                }
              }
            }
          }



        }
      }
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
    // padding-bottom: 128px;
    margin-bottom: 12px;
    .contact {
      margin: 0 auto;
      margin-top: 12px;
      width: 319px;
      height: 38px;
      text-align: center;
      color: rgba($color: #000000, $alpha: 0.4);
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      // background: rgba($color: #000000, $alpha: 0.02);
      // border: 2px;
      img {
        width: 12px;
        height: 14px;
        margin-right: 5px;
      }
    }
  }



}
.backBnt-wrapper {
    width: 100%;
    height: 108px;
    // position: fixed;
    // bottom: 0;
    background-color: #fff;
    // box-shadow: 0px -1px 10px 0px rgba(220,220,220,0.6);
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
input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(0,0,0,0.4);
  font-size: 14px;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(0,0,0,0.4);
  font-size: 14px;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(0,0,0,0.4);
  font-size: 14px;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(0,0,0,0.4);
  font-size: 14px;
}
@media screen and (min-width: 600px) {
  header,.backBnt-wrapper{
    max-width: 384px; /*no*/
  }
}
</style>

