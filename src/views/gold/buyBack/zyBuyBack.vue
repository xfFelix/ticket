<template>
  <div class="goldBuyBack">
    <header>
      <i class="cubeic-back back" @click="$router.go(-1)"></i>黄金回购
    </header>
     <ul class="goldbuy-back-list gbb-form">
        <li class="goldbuy-back-money">
          回购金额:
          <p>
            <span style="color:#576B95">{{backPrice|toPrice}}</span>
            <span>元</span>
          </p>
        </li>
        <!-- <li class="l_add">卡密<input type="text" name="code" maxlength="14" placeholder="请输入兑换码"  disabled :value="backInfo.cardCode"/></li> -->
        <li>联系电话<input type="text" name="mobile" maxlength="12" placeholder="请输入联系人电话" v-model="inpInfo.mobile"/></li>
        <li>姓名<input type="text" name="name" maxlength="10" placeholder="请输入户主姓名" v-model="inpInfo.name" @blur="checkBank"/></li>
        <li>银行卡号<input type="text" name="cardNum" maxlength="20" placeholder="请输入银行卡号" v-model="inpInfo.cardNum" @blur="checkBank"/></li>
        <li>开户行<input type="text" name="bank" maxlength="20" placeholder="请输入开卡银行" v-model="inpInfo.bank" disabled/></li>
        <li>开户支行<input type="text" name="subBank" maxlength="20" placeholder="请输入开户支行" v-model="inpInfo.subBank" /></li>
      </ul>
    <div class="agreement zy-agreement">
      <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
      <span style="color: #576B95" @click="show.file=true" class="file">《黄金回购协议》</span>
    </div>
    <p class="arrivel-accound-day">工作日预计24小时内到账</p>
    <div class="backBnt" style="background-color: #576B95" @click="buyBnt()">提交</div>

    <sms-code :show="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder"></sms-code>
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <gold-file :show="show.file" @handle-show-file="initShow" :fileType="fileType"></gold-file>


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
      file:false
    },
    failText:'',
    id: sessionStorage.getItem('GOLDID'),
    gtype: sessionStorage.getItem('gtype'),
    token: '',
    fileType: 3
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
            this.$dialog({content:"回购申请成功，请等候客服审核！工作日（周一至周五）24小时内打款  节假日（周六周天）及法定节假日不打款。"},()=>{
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
      this.show={mask:true,code:true,file:false}
    },
    handlerShowInfo(){
        this.initShow();
      },
    initShow(){
      this.show={mask:false,code:false,file:false}
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
    BgMask: () => import('@/components/BgMask'),
    goldFile: () => import("./components/goldFile"),
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
  .goldbuy-back-list{
    padding: 44px 16px 0 16px;
    color: #4A4A4A;
    font-size: 14px;
    .goldbuy-back-money{
      margin-top: 20px;
      font-size: 12px;
      display: block;
      padding: 0 0 20px 0;
      border: none;
      line-height: inherit;
      position: relative;
      p{
          text-align: center;
          margin-top: 18px;
          span{
            &:first-of-type{
              font-size: 36px;
              color: #30CE84;
              line-height: 34px;
            }
            &:nth-of-type(2){
              display: inline-block;
              vertical-align: bottom;
              color: #999999;
            }
            &:nth-of-type(3){
              border: 1px solid #30CE84;
              width: 15px;
              height: 15px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              color: #30CE84;
              font-size: 14px;
              margin: 0px 0 0 10px;
              font-weight: bold;
            }
          }
      }
    }
    li{
      display: flex;
      justify-content: space-between;
          line-height: 69px;
      border-bottom: 1px solid #DEDEDE;
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

  .agreement {
    display: flex;
    align-items: center;
    .cube-checkbox {
      padding: 0 0 0 20px;
    }
    .file {
      color: #30CE84;
      margin-top: -2px;
    }
  }
  .arrivel-accound-day{
    padding: 10px 0 55px 0;
    font-size:12px;
    color: #999999;
    text-align: center;
  }
  .backBnt {
    line-height: 44px;
    position: fixed;
    bottom: 0;
    background: #30ce84;
    width: 100%;
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
  color: #576B95;
}
.cube-dialog-btn_highlight {
  color: #576B95;
}
@media screen and (min-width: 600px) {
  header,.backBnt{
    max-width: 384px; /*no*/
  }
}
</style>

