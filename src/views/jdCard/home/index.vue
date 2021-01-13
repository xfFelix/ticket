
<template>
<div class="jdCardHome">
  <div>
    <div class="headerW">
      <Header class="navbar" :class="[viewTop>0?'whiteBg':'']"  :show-more="!yingqiudiShow && !haofang" >京东E卡
        <i slot="icon" class="icon-gengduo-white"></i>
      </Header>
    </div>

    <jdCardType @hand-smsShow="smsShow"></jdCardType>

    <Sms-code v-if="show.code" :show.sync="show.code" :fail-text="failText" @handler-show-info="initShow" @submit-order="submitOrder" @forget="setForget"></Sms-code>
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

  </div>
  <succ-page v-if="suceesShow" @get-close="getCData" :businessValidate="businessValidate"> </succ-page>

</div>

</template>
<script >

import {mapGetters, mapActions } from 'vuex';
import {setPayType ,IOSFocus ,vipCustom} from '@/mixins'
import {JDECardRecharge} from 'api';
import {isEmpty, getParam} from "util/common";
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
      totalAmount:0,
      viewTop:0,
      showClose: true,
      suceesData: {},
      link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
      linkType: 'href',
      businessValidate: false
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
      jdCardConfig: 'jdCard/getConfig',
      userinfo: 'getUserinfo',
    }),
  },
  methods:{
     ...mapActions({
        checkPassword: 'checkPassword',
        initConfig: 'jdCard/initConfig',
      }),
      setForget() {
        this.show = {mask:true,code:false,file:false,info:false,dialog:true}
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
        let res = await JDECardRecharge({token:this.getToken,productCode:this.jdCardConfig.productCode,verify_code:val,num:this.jdCardConfig.num});
        if(res.error_code!=0)  return this.failText = res.message;
        if(res.data.status === 99) {
          this.businessValidate = true
        }
        this.initShow();
        this.suceesShow=true;
        this.show.mask = true;
        this.showClose = false;
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.viewTop = scrollTop
      },
  },
  created(){
    this.initConfig()
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.handleScroll);
  },
  components: {
    Header: () => import('@/components/Header'),
    jdCardType: ()=> import('./components/jdCardType'),
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    BgMask: () => import('@/components/BgMask'),
    succPage:()=> import('./components/succPage'),
  },
}
</script>
<style lang="scss" scoped>
.jdCardHome{
  height: 100%;
  min-height: 100vh;
  padding-bottom: 16px;
  .headerW {
    height: 242px;
    background-image: url('../../../common/images/jdCard/header-bg.png');
    background-size: 100% 100%;
    .navbar{
      background: transparent;
      color: #fff;
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
    .whiteBg {
      color: #444444 !important;
      background: #ffffff !important;
      .icon-gengduo-white {
        background-image: url('../../../common/images/header-more.png') !important;
      }
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
