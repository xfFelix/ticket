<template>
<div class="gold-home-wrapper" >
  <div class="gold-home-bg">
  <div class="gold-home" ref='viewBox'>
      <Header class="navbar" :class="[viewTop>0?'whiteBg':'']" :show-more="!yingqiudiShow && !haofang">黄金兑换
        <i slot="icon" class="icon-gengduo-black"></i></Header>
      <!-- <div class="introduce" @click="goIntroduce">
        <img src="../../../common/images/gold-hd/topbanner.png" alt="">
      </div> -->
      <div class="main-absolute" >
        <gold-info  v-model.trim="inpPrice" @tax-money="taxInfo" ref="goldInfo"></gold-info>
      </div>



      <sms-code v-if="show.code" :show.sync="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" @forget="setForget"></sms-code>
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


      <div class="goldBnt-wrapper" v-if="goldType.buyType==0">
        <div class="agreement" ref="viewAgree" v-if="goldType.buyType==0">
          <cube-checkbox class="with-click" v-model="checked">我已阅读并同意</cube-checkbox>
          <span @click="show.file=true" class="file">《黄金兑换协议》</span>
        </div>
        <div class="service-wrapper">
          <div class="service">
            <img src="@/common/images/gold-hd/kefu.png" alt="">
            <p>联系客服</p>
          </div>
          <p class="goldBnt" @click="handlerShowType()" :class="!inpPrice?'bntNo':'bntCan'" >
            立即兑换
          </p>
        </div>

        <!-- <p class="goldBnt-right" @click="$router.push({name:'goldRecord',query:{cardId:goldType.type}})" v-if="!yingqiudiShow">
            立即回购
        </p> -->
      </div>
    </div>


      <succ-page v-if="suceesShow" @getCData="getCData"></succ-page>
      <gold-file  :show="show.file" @handle-show-file="initShow"></gold-file>
  </div>
</div>
</template>
<script>

import {mapGetters, mapActions} from 'vuex';
import { goldBuy, getInfo } from 'api';
import { setPayType ,IOSFocus ,vipCustom} from '@/mixins';
import { IsInteger,isEmpty,getParam } from "util/common";
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
      inpPrice:'1',
      suceesShow:false,
      taxMoney:{},
      viewTop:0,
      showClose: true,
      suceesData: {},
      link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
      linkType: 'href'
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
      goldType: 'gold/getConfig',
      userinfo: 'getUserinfo'
    }),
  },
  methods:{
      ...mapActions({
        checkPassword: 'checkPassword',
        setConfig: 'gold/setConfig',
        setUserInfo: 'setUserinfo',
        initConfig:'gold/initConfig'
      }),
      setForget() {
        this.show = {mask:true,code:false,file:false,dialog:true}
      },
      taxInfo(val){
        this.taxMoney = val;
      },
      getCData (val) {
        // this.$createDialog({
        //   showClose: true,
        //   title: '交割实物',
        //   content: '交割实物无需进行回购，兑换成功后直接联系客服，申请获取实物',
        //   confirmBtn: {
        //     text: '联系客服',
        //     active: true,
        //     href: 'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481'
        //   },
        //   onClose: () => {
        //     this.show.mask = false
        //   },
        // }).show()
        this.suceesShow = val;  //关闭成功页
        this.initShow()
        this.inpPrice='1';
        // this.getInfo()
        // 获取 未提货黄金数量
        // this.$refs.goldInfo.getUntreated()
        this.$router.go(0)

      },
      // async getInfo() {
      //   let info = await getInfo({ token: this.getToken })
      //   if (!info.error_code) { return this.setUserInfo(info.data) }
      // },

      handlerShowInfo(){
        this.initShow();
      },
      async submitOrder(val){ //输入短信下单
        let res = await goldBuy({token:this.getToken,amount:this.inpPrice,verify_code:val,id:this.goldType.type});
        if(res.error_code == 30000){
          this.$dialog({type:'confirm',content:res.message},()=>{
          this.$router.push({path:'/realName?back=/gold'})});
          return false;
        }
        if(res.error_code!=0)  return this.$toast(res.message);
        this.setConfig({id:res.data.id});
        this.initShow();
        this.suceesShow=true;
        this.show.mask = true;
        this.showClose = false;
        // this.suceesData.amount = this.inpPrice
        // this.suceesData.type = this.goldType.type
        // this.suceesData.cost = this.taxMoney.total
      },
      initShow(){
        this.show={mask:false,code:false,file:false,dialog:false};
      },
      async handlerShowType() {
        // console.log(this.taxMoney)
        // console.log("22222222")
        let goldWeight = 0
        if(!this.checked){
          return this.$toast('请阅读并同意《黄金兑换协议》');
        }
        if(this.goldType.type==3 && this.inpPrice >=1) {
          goldWeight = this.inpPrice*10
        }
        if(this.goldType.type==4 && this.inpPrice >=1) {
          goldWeight = this.inpPrice*0.05
          goldWeight = goldWeight.toFixed(2)
        }
        if(this.inpPrice >=1 && IsInteger(this.inpPrice)){
          if(this.userinfo.score >= this.taxMoney.total && this.taxMoney.goldStock>=goldWeight){
            if(this.taxMoney.monthTotal > 30000 && isEmpty(this.userinfo.idnum)){
              return this.$dialog({type:'confirm',content:'您消费额度超过3万，请先实名认证！'},()=>{
                this.$router.push({path:'/realName?back=/gold'})
              })
            }else{
              let res = await this.checkPassword();
              if (!res) return;
              this.show = { mask: true,code: true,file:false,dialog:false}
            }
          }else{

            if(this.userinfo.score < this.taxMoney.total) {
              this.$toast('您的积分不足');
              return
            }
            if(this.taxMoney.goldStock < goldWeight) {
              this.$toast('剩余库存不足，请调整兑换数量');
              return
            }
          }
        }else{
          if(this.goldType.type==3){
            this.$toast('请输入有效的根数');
          }else{
            this.$toast('请输入有效的颗数');
          }
        }
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.viewTop = scrollTop
      },
      goIntroduce() {
        this.$router.push({name: 'goldIntroduce'})
      }
  },
  components: {
    Header: () => import('@/components/Header'),
    goldInfo: ()=> import('./components/goldInfo'),
    // goldType: ()=> import('./components/goldType'),
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    BgMask: () => import('@/components/BgMask'),
    succPage:()=> import('./components/succPage'),
    goldFile: () => import("./components/goldFile"),
  },
  created() {
    this.initConfig()
    this.setConfig({type: 4});
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.handleScroll);
  }
}
</script>
<style lang="scss" scoped>
.gold-home-wrapper{
  width: 100%;
  height: 100%;
  // padding-bottom: 44px;
  // box-sizing: border-box;
  .gold-home-bg {
    width: 100%;
    height: 222px;
    background-image: url('../../../common/images/gold-hd/gold-background.png');
    background-size: 100% 100%;
    z-index: 99;
    .navbar{
      // background: #313340;
      // color: #fff;
      background: transparent;
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
    .introduce {
      padding-top: 54px;
      img {
        display: block;
        margin: 0 auto;
        width: 343px;
        height: 85px;
        background-image: url('../../../common/images/gold-hd/topbanner.png');
        background-size: 100% 100%;
      }
    }
  }

}


.goldBnt-wrapper{
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 100px;
    padding: 16px;
    padding-top: 2px;
    box-sizing: border-box;
    z-index: 9;
    box-shadow: 0px -2px 10px 0px rgba(220,220,220,0.6);
    .agreement {
      display: flex;
      align-items: center;
      .cube-checkbox {
        padding: 0;
        color: #444444;

      }

      .file {
        color: #07C160;
        margin-top: -2px;
      }
    }
    .service-wrapper {
      display: flex;
      align-items: center;
      .service {
        margin-right: 24px;
        img {
          margin: 0 auto;
          display: block;
          width: 20px;
          height: 20px;

        }
        p {
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #444444;
        }
      }
      .goldBnt {
        width: 279px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
        border-radius: 5px;
        font-weight: bold;
      }
      .bntCan{
        background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
        border-radius: 5px;
      }
      .bntNo{
        background:rgba($color: #E6E6E6, $alpha: 0.6);
        // border-top: 1px solid #98E7C2;
      }
    }

}

.main-absolute{
  // margin-top: 16px;
  width: 100%;
  // overflow-y: scroll;    /*使之可以滚动*/
　-webkit-overflow-scrolling:touch;
  scrollbar-width: none;
  overflow-x: hidden;
  padding: 0 16px;
  padding-top: 50px;
  box-sizing: border-box;
  // margin-bottom: 112px !important;
  // background-color: #f5f5f5;
}
.main-absolute::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */}
.main-absolute:-webkit-scrollbar-thumb {
    background: transparent;
}
</style>
<style scoped>
.whiteBg {
  background: #ffffff !important;
}
>>>.cube-checkbox_checked .cube-checkbox-ui i {
    color: #07C160;
    -webkit-transform: scale(1.33);
    transform: scale(1.33);
  }
</style>
<style>
@media screen and (min-width: 600px) {
  .navbar,.goldBnt-wrapper,.main-absolute{
    max-width: 384px; /*no*/
  }
}
</style>

