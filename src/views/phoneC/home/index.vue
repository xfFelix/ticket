
<template>
<div class="phoneHome">
  <div>
    <Header class="navbar" :class="[viewTop>0?'whiteBg':'']"  :show-more="!yingqiudiShow" >话费充值
      <i slot="icon" class="icon-gengduo-white"></i>
    </Header>
    <phone-type @hand-phoneCan="phoneCanP" @hand-smsShow="smsShow" @hand-phoneFile="phoneFileShow"></phone-type>
    <!-- <phone-info :show="show.info" @handler-show-code="smsShow"  @go-back="initShow" :phoneTax="phoneTaxInfo"></phone-info> -->




    <Sms-code :show="show.code" :fail-text="failText" @handler-show-info="initShow" @submit-order="submitOrder" @forget="setForget"></Sms-code>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
        <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
        <div slot="btn">联系客服</div>
      </remindDialog>

    <transition name="fade">
      <bg-mask v-model="show.mask" :isClose="showClose"></bg-mask>
    </transition>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <!-- 设置手机号 -->
    <set-mobile :show.sync="showSetMobile"></set-mobile>

    <!-- <div class="phoneBnt">
      <div class="dirPhone" v-show="phoneConfig.type==0" @click="phoneBnt('dir')" :style="phoneCan?' background: #30ce84;':' background: #98E7C2;'">立即兑换</div>
      <div v-show="phoneConfig.type!=0" class="carPhone"><p @click="phoneBnt('card')">立即兑换</p><span class="goLogs" @click="$router.push({name:'phoneRecord',query:{cardId:1}})">立即转卖</span></div>
    </div> -->
  </div>
  <phone-file :show.sync="showPhoneFile" @handle-phonefile="phoneFileShow" ></phone-file>
  <succ-page :haihangUrl="haihangUrl" v-if="suceesShow" @get-close="getCData"> </succ-page>
  <!-- <succ-page  :moneyP="totalAmount" v-if="suceesShow" v-on:getCData="getCData" :getData="suceesData"> </succ-page> -->
</div>

</template>
<script >

import {mapGetters, mapActions } from 'vuex';
import {setPayType ,IOSFocus ,vipCustom} from '@/mixins'
import {phoneCharge ,phoneTax} from 'api';
import { isEmpty, getParam} from "util/common";
export default {
  mixins: [setPayType, IOSFocus ,vipCustom],
  data:()=>({
      checked:true,
      show:{
        code:false,
        mask:false,
        file:false,
        info:false,
        dialog: false
      },
      failText:undefined,
      inpPrice:undefined,
      suceesShow:false,
      phoneCan:false,
      totalAmount:0,
      phoneTaxInfo:{},
      viewTop:0,
      showPhoneFile:false,
      showClose: true,
      suceesData: {},
      haihangUrl: '',
      link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
      linkType: 'href'
  }),
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow();
          this.failText=undefined
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      phoneConfig: 'phone/getConfig',
      userinfo: 'getUserinfo',
    }),
  },
  methods:{
     ...mapActions({
        checkPassword: 'checkPassword',
        initConfig: 'phone/initConfig',
        platform:'platform/setPlatform'
      }),
      // async phoneBnt(name){
      //   if(name == 'dir'){
      //     if(this.phoneCan){
      //       let res = await this.checkPassword();
      //       if (!res) return false;
      //       this.phoneTax()
      //     }
      //   }else{
      //     let res = await this.checkPassword();
      //     if (!res) return false;
      //     this.phoneTax()
      //   }
      // },
      setForget() {
        this.show = {mask:true,code:false,file:false,info:false,dialog:true}
      },
      phoneCanP(val){
        this.phoneCan=val
      },
      getCData(val){  //关闭成功页
        this.suceesShow=val;
        this.initShow()
        this.$router.go(0)
      },
      initShow(){
        this.show={mask:false,code:false,file:false,info:false,dialog:false};
      },
      infoShow(){
        this.show={mask:true,code:false,file:false,info:true,dialog:false};
      },
      smsShow(){
        this.show={mask:true,code:true,file:false,info:false,dialog:false};
      },
      async submitOrder(val){  //输入短信下单
        let amount = '';
        let mobile = '';
        if(this.phoneConfig.type==0){
          amount = this.phoneConfig.dirPrice;
          mobile = this.phoneConfig.mobile;
        }else{
          amount = this.phoneConfig.cardPrice;
          mobile = '';
        }
        let res = await phoneCharge({token:this.getToken,amount:amount,verify_code:val,type:this.phoneConfig.type+'',mobile:mobile});
        if(res.error_code == 30000){ return this.$dialog({type:'confirm',content:res.message},()=>{
          this.$router.push({path:'/realName?back=/phone'})
        })}
        if(res.error_code!=0)  return this.failText = res.message;
        this.totalAmount = res.data.totalAmount;
        this.haihangUrl = res.haiHang
        this.initShow();
        this.suceesShow=true;
        this.show.mask = true;
        this.showClose = false;

      },
      async phoneTax() {
        let amount = ''
        if(this.phoneConfig.type==0){
          amount = this.phoneConfig.realDirP;
        }else{
          amount = this.phoneConfig.realCarP;
        }
        let res = await phoneTax({amount:amount, token: this.getToken})
        if (res.error_code != 0) return this.$toast(res.message);
        this.phoneTaxInfo = res.data;
        if(this.userinfo.score >= this.phoneTaxInfo.total){
          if(this.phoneTaxInfo.monthTotal > 30000 && isEmpty(this.userinfo.idnum)){
            this.$dialog({type:'confirm',content:'您消费额度超过3万，请先实名认证！'},()=>{
              this.$router.push({path:'/realName?back=/phone'})
            })
            return false;
          }
        }else{
          this.$dialog({content:'您的积分不足！'},()=>{});
          return false;
        }
        this.infoShow()
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.viewTop = scrollTop
      },
      phoneFileShow(val) {
        this.showPhoneFile = val
      }
  },
  created(){
    this.initConfig()
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, false)
    if(getParam().vendorId) {
      this.platform(1)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.handleScroll);
  },
  components: {
    Header: () => import('@/components/Header'),
    phoneType: ()=> import('./components/phoneType'),
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    BgMask: () => import('@/components/BgMask'),
    succPage:()=> import('./components/succPage'),
    // phoneInfo:()=> import('./components/phoneInfo')
    phoneFile:()=> import('./components/phoneFile')
  },
}
</script>
<style lang="scss" scoped>
.phoneHome{
  height: 100%;
  padding-bottom: 16px;
  background: linear-gradient(225deg, #1A63FC 0%, #3296FA 100%);
  .navbar{
      // background: #313340;
      background: transparent;
      color: #fff;
      position: fixed;
      width: 100%;
      .icon-gengduo-white {
        position: absolute;
        top: 9px;
        right: 16px;
        // font-size: 28px;
        width: 24px;
        height: 24px;
        background-image: url('../../../common/images/header-moreW.png') !important;
        background-size: 100% 100%;
      }
  }
  .whiteBg {
    color: #444444 !important;
    background: #ffffff !important;
    .icon-gengduo-white {
      background-image: url('../../../common/images/header-more.png') !important;
    }
  }
}
.phoneBnt{
    width: 100%;
    position: fixed;
    bottom: -1px;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 15px;
    z-index: 1;
    height: 46px;;
    line-height: 46px;
  .dirPhone{
   background: #98E7C2;
  }
  .carPhone{
    display: flex;
    p{
      align-items: center;
      justify-content: space-between;
      text-align: center;
      margin: 0px auto;
      background: rgb(48, 206, 132);
      flex: 1;
    }
    .goLogs{
      width: 30%;
      display: inline-block;
      float: right;
      background: #fff;
      color: #4a4a4a;
      border-top: 1px solid #DEDEDE;
    }
  }
}

</style>
<style>
@media screen and (min-width: 600px) {
  .navbar, .phoneHome{
    max-width: 384px; /*no*/
  }
}
.cube-dialog-content-def p{
    word-break: break-all;
    word-wrap: break-word;

}
</style>
