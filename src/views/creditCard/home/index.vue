<template>
<div class="ccHome">
    <div v-if="!suceesShow" class="ccHome">
        <Header class="navbar" :show-more="!yingqiudiShow">信用卡还款</Header>
        <repayment @current-card="currentCard" v-model="taxPrice" @tax-money="taxInfo"></repayment>
        <div class="agreement">
          <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
          <span @click="show.file=true" class="file">《信用卡还款协议》</span>
        </div>
        <p></p>
        <p class="payBnt" @click="payBnt()">立即兑换 </p>
    </div>
    <succ-page :show="suceesShow" v-on:getCData="getCData" :totalAmount="totalAmount"></succ-page>

    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <sms-code :show.sync="show.code" v-if="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" @forget="setForget"></sms-code>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
      <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
      <div slot="btn">联系客服</div>
    </remindDialog>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>
    <pay-file :show="show.file" @handle-show-file="initShow"></pay-file>
</div>
</template>
<script>
import { setPayType ,IOSFocus,vipCustom} from '@/mixins';
import{mapGetters,mapActions} from 'vuex'
import {applyCard } from 'api'
export default {
  mixins: [setPayType, IOSFocus,vipCustom],
  data:()=>({
      checked:true,
      show:{
        code:false,
        mask:false,
        file:false,
        dialog: false
      },
      failText:undefined,
      suceesShow:false,
      cardId:undefined,
      taxPrice:undefined,
      totalAmount:0,
      taxMoney:{},
      link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
      linkType: 'href'
  }),
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow();
           this.failText=undefined;
        }
      }
    },
  },
  computed: {
      ...mapGetters({
        getToken: 'getToken',
        userinfo: 'getUserinfo'
      }),
    },
  methods:{
    ...mapActions({
        checkPassword: 'checkPassword',
    }),
      setForget() {
        this.show = {mask:true,code:false,file:false,dialog:true}
      },
      getCData(val){  //关闭成功页
        this.suceesShow=val;
      },
      currentCard(val){
        this.cardId = val;
      },
      taxInfo(val){
        this.taxMoney = val;
      },
      async payBnt(){
        if(!this.cardId){
          return this.$dialog({type:'confirm',content:'请先绑定信用卡！'},()=>{
            this.$router.push({path:'/creditCard/manage'})
          })
        }
        if(!this.taxPrice || this.taxPrice<0){
          return this.$toast('请输入有效还款金额');
        }
        if(this.checked==false){
          return this.$toast('请阅读并同意信用卡还款协议');
        }
        if(this.taxMoney.total>this.userinfo.score){
          return this.$toast('您的积分不足!');
        }
        if(!this.userinfo.idnum){
          return this.$dialog({type:'confirm',content:'请先实名认证！'},()=>{
            this.$router.push({path:'/realName?back=/creditCard/home'})
          })
        }
        let res = await this.checkPassword();
        if (!res) return;
        this.smsShow()
      },
      async submitOrder(val){
          let res = await applyCard({token:this.getToken,amount:this.taxPrice,verify_code:val,cardId:this.cardId});
          if(res.error_code == 30000){
             return this.$dialog({type:'confirm',content:'请先实名认证！'},()=>{
              this.$router.push({path:'/realName?back=/creditCard/home'})
            })
          }else if(res.error_code!=0) {
            return this.failText =  res.message;
          }else{
            this.totalAmount = res.data.totalAmount;
            this.initShow();
            this.suceesShow = true;
          }
      },
      handlerShowInfo(){
        this.initShow()
      },
      initShow(){
        this.show={code:false,mask:false, file:false,dialog:false}
      },
      smsShow(){
        this.show={code:true,mask:true, file:false, dialog:false}
      },
      fileShow(){
        this.show={code:false,mask:true, file:true, dialog:false}
      },
  },
  mounted(){

  },
  components: {
    Header: () => import('@/components/Header'),
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    BgMask: () => import('@/components/BgMask'),
    succPage:()=> import('./components/succPage'),
    repayment: () => import("./components/repayment"),
    payFile:() => import("./components/payFile"),
  },
}
</script>
<style lang="scss" scoped>
.ccHome{
  height: 100%;
  .navbar{
    background: #313340;
    color: #fff;
    position: fixed;
    width: 100%;
  }
}
.payBnt{
  width: 100%;
  background: #30CE84;
  line-height: 44px;
  color: #fff;
  display: fixed;
  bottom: 0;
  text-align: center;
  font-size: 15px;
  position: fixed;
  height: 44px;
}
  .agreement {
    display: flex;
    align-items: center;
    padding-bottom: 44px;
    .cube-checkbox {
      padding: 0 0 0 10px;
    }
    .file {
      color: #30CE84;
      margin-top: -2px;
    }
  }
</style>
<style>
@media screen and (min-width: 600px) {
  .navbar,.payBnt{
    max-width: 384px; /*no*/
    /* overflow: hidden; */
  }
}
</style>
