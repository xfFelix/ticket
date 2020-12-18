
<template>
<div class="phoneType">
      <div class="phoneBill-sel-wrap">
        <div class="phoneBill-sel">
            <ul >
                <li class="phoneDirect" v-for="(item,index) in type" :key="index" :style="item.show?'':'display: none'" @click="typeSelect(index)">
                    <div class="phone-icon">
                      <img :src="index==typeIndex?item.imgPath:item.imgPathNone" alt="">
                    </div>
                    <div class="phone-name" :class="index==typeIndex?'select-active':''">
                      <p class="name">{{item.name}}</p>
                      <p class="tips"><span v-if="index==0" :class="index==typeIndex?'tips-active':'tips-inactive'"></span><span>{{item.tip}}</span></p>
                    </div>
                </li>
            </ul>

        </div>

      </div>
       <div class="phoneBill-money" :class="[typeIndex==0?'phone-direct':'phone-indirect']">
         <div class="advert-top" v-if="bulletin">
            <div class="ico-horn">
                <img src="@/common/images/phone/tips_big.png" alt="">
            </div>
            <!-- 滚动文字区域 -->
            <div class="marquee-wrap" ref="marqueeWrap">
                <ul class="marquee-box" ref="marqueeBox">
                    <!-- 循环3次为了无缝衔接， 给第一个设置Id 方便计算文字宽度 -->
                    <li class="marquee-list" v-for="(i,index) in 3" :key="index" v-html="bulletin" ref="marquee" :id="i==1?'marquee':''"></li>
                </ul>
            </div>
        </div>
          <!-- 直充 -->
          <div class="phoneBill-inpW" v-show="typeIndex==0">
              <div class="input-flex">
                <input type="tel" pattern="\d*" autofocus="autofocus" class="phoneBill-inp" :class="[isiOS?'iOS-phone':'']" @click="inputClick($event)" maxlength="11" placeholder="请输入手机号码" v-model="mobile"/>
              </div>
              <div v-if="phoneCan" class="phoneText">(充值手机号)</div>
              <div v-if="phoneCan" class="close" @click="cleanInput"></div>
          </div>
          <div class="recordW" :class="[typeIndex==0?'':'recordW-indirect']">
            <p v-if="typeIndex!=0" class="charge-num">请选择充值卡面额</p>
            <p class="record" @click="$router.push({name:'phoneCRecord',query:{cardId:typeIndex}})">
              <span class="record-content">{{typeIndex==0?'充值记录':'兑换记录'}}</span>
            </p>
          </div>
          <div class="phoneBill-direct" v-show="typeIndex==0">
            <ul class="phoneBill-typeU" :class="phoneCan?'phoneCan':''">
                <li v-for="(item,key,index) in dirList" :key="index" @click="dirClick(index,item,key)"
                :class="noGoods.indexOf(key)!=-1?'price_gray':(dirIndex==index?'price_actived':'')">
                <span v-if="noGoods.indexOf(key)!=-1" class="dir-lack lack" >缺货</span>
                  <p class="pB-tMWrap">
                    <span class="phoneBill-tMoney"> {{key}}</span>
                    <span class="phoneBill-tYuan">元</span>
                  </p>
                  <p class="pB-tIWrap" >
                    <span class="phoneBill-tIntegral">需积分</span>
                    <span class="phoneBill-tIntegral">{{item[1]}}</span>
                  </p>
              </li>
            </ul>
          </div>



          <!-- 卡充 -->
          <div class="phoneBill-indirect" v-show="typeIndex!=0">
              <ul class="phoneBill-tCard clearfix">
                <li v-for="(item,key,index) in cardList" :key="index"  @click="carClick(index,item,key)"
                :class="noGoods.indexOf(key)!=-1?'card_price_gray':(carIndex==index?'card_price_actived':'')"
                :style="(noGoods.indexOf(key)!=-1 && yinqiudiShow)?'display: none':''">
                    <span v-if="noGoods.indexOf(key)!=-1" class="lack" >缺货</span>
                    <div class="phoneBill-top">
                      <div class="icon">{{key}}元</div>
                      <div class="phoneBill-info">
                        <p class="price">{{key}}元充值卡</p>
                        <p class="notice">三网全国通用</p>
                      </div>
                    </div>
                    <div class="phoneBill-bottom">
                      <p>需积分{{item[1]}}</p>
                    </div>
                </li>
              </ul>
          </div>

          <div class="phoneBnt" v-if="typeIndex!=0" @click="phoneBnt('card')">
            <span class="left">应付积分{{phoneTaxInfo.total | toPrice}}</span>
            <span class="line"></span>
            <span class="right">立即兑换</span>
          </div>
          <div class="phoneBnt" v-else-if="phoneCan && typeIndex==0" @click="phoneBnt('dir')">
            <span class="left">应付积分{{phoneTaxInfo.total | toPrice}}</span>
            <span class="line"></span>
            <span class="right">立即充值</span>
          </div>
          <div class="phoneBnt phoneBntN" v-else>
            <span class="left">应付积分0.00</span>
            <span class="line"></span>
            <span class="right">立即充值</span>
          </div>
          <div class="detailInfoW" v-if="detailInfoShow">
            <li><span>售价</span><span>{{phoneTaxInfo.amount | toPrice}}</span></li>
            <li><span>平台服务费</span><span>{{phoneTaxInfo.service_fee | toPrice}}</span></li>
            <li><span>税费</span><p><span>{{phoneTaxInfo.tax_total | toPrice}}</span><span>{{phoneTaxInfo.tax_total>0?'':'(免税)'}}</span></p></li>
            <li v-if="phoneTaxInfo.preferentialFee"><span>优惠费用</span><span style="color:#FF6600">-{{phoneTaxInfo.preferentialFee | toPrice}}</span></li>
          </div>
          <div class="phoneInfoW">
            <div class="left"><span>椰子分余额</span><span class="score">{{userinfo.score}}</span></div>
            <!-- 不可点击状态 -->
            <div class="right rightN" v-if="!phoneCan && typeIndex==0"><span>费用明细</span><div class="arrow"><span></span></div></div>
            <div class="right" v-else  @click="detailInfo"><span>费用明细</span><div class="arrow"><span :class="detailInfoShow?'top-arrow':'bottom-arrow'"></span></div></div>
          </div>
          <div class="contact" @click="contact">
            <img src="../../../../common/images/phone/service-icon.png">
            <p>联系我们</p>
          </div>
      </div>
      <div class="explainW"  v-if="typeIndex!=0 && isNormalUser">
        <div class="explain-header">
          <img src="../../../../common/images/phone/explain-header.png" alt="">
        </div>
        <div class="explain-main">
          <li>
            <img src="../../../../common/images/phone/icon1.png" alt="">
            <div>
              <span class="left">使用充值卡充值</span>
              <span class="right">兑换成功后提供卡密</span>
            </div>
          </li>
          <li>
            <img src="../../../../common/images/phone/icon2.png" alt="">
            <div>
              <span class="left">第三方提供寄卖服务</span>
              <span class="right">预计24小时内完成交易</span>
            </div>
          </li>
          <li @click="toPhoneFile">
            充值卡使用流程 >
          </li>
        </div>
      </div>

      <div class="other-serviceW" v-if="isNormalUser">
        <p class="title">更多服务</p>
        <div class="other-service">
          <li @click="$router.push({name:'goldZyHome'})">
            <img src="@/common/images/phone/gold.png" alt="">
            <p>黄金兑换</p>
          </li>
          <li @click="$router.push({name:'oilHome'})">
            <img src="@/common/images/phone/oil.png" alt="">
            <p>加油卡</p>
          </li>
          <!-- <li @click="$router.push({name:'lifeHome'})">
            <img src="@/common/images/phone/life.png" alt="">
            <p>生活缴费</p>
          </li> -->
          <li>
            <a :href="process+'#/layout/channel?id=yeyun'">
              <img src="@/common/images/phone/shop.png" alt="">
              <p>小椰超市</p>
            </a>
          </li>
          <li @click="$router.push({name:'memberHomeC'})">
            <img src="@/common/images/phone/members.png" alt="">
            <p>会员卡券</p>
          </li>
        </div>
      </div>
</div>
</template>
<script >
import {directPrice,cardPrice, phoneCharge ,phoneTax, phoneTaxS} from 'api';
import {mapGetters, mapActions} from 'vuex';
import { IsMobile, IsChinaMobile } from "util/common";
import { vipCustom } from '@/mixins';
import { isEmpty  } from "util/common";
export default {
  mixins: [vipCustom],
  data:()=>({
    mobile:'',
    dirList:{},
    cardList:{},
    type:[
      {id:0,name:'话费充值 - 直充',tip:'预计24小时内充值成功',show:true,
        imgPath: require('../../../../common/images/phone/chonghuafei_normal.png'),
        imgPathNone: require('../../../../common/images/phone/chonghuafei_none.png'),
      },
      {id:1,name:'兑换充值卡',tip:'可转卖或话费充值',show:true,
        imgPath:require('../../../../common/images/phone/chongzhika_normal.png'),
        imgPathNone:require('../../../../common/images/phone/chongzhika_none.png'),
       },
    ],
    typeIndex:0,
    phoneCan:false,
    dirIndex:1,
    carIndex:2,
    noGoods:[],
    yinqiudiShow:false,
    needIntegral: [],
    detailInfoShow: false,
    phoneTaxInfo:{},
    isiOS: false,
    bulletin: "",
    isNormalUser: true,
    process:process.env.VUE_APP_BASE_HOME_URL
  }),
  watch:{
    mobile(val){
      let valNum = val.replace(/\s+/g, "")
      if(IsChinaMobile(valNum)){
          this.getDirPrice();
          this.phoneCan=true;
          this.setConfig({mobile:valNum})
          clearTimeout(this.timeout)
          this.timeout = setTimeout(()=>{
            // var str = val.replace(/\s+/g, "")
            this.mobile =valNum.replace(/((?:^|\d)\d{3})(?!$)/g,'$1 ')
          },300)

      }else{
        this.phoneCan=false
      }
      this.$emit("hand-phoneCan",this.phoneCan)
    },
    type:{
      get() {
        return this.$store.state.phone.config.type
      },
      set(val) {
        return this.$store.dispatch('phone/setConfig',{type: val})
      }
    },
  },
  methods:{
    ...mapActions({
      setConfig: 'phone/setConfig',
      checkPassword: 'checkPassword',
    }),
      async getDirPrice(){
        let newMobile = this.mobile.replace(/\s+/g, "")
        let res = await directPrice({token:this.getToken,mobile:newMobile});
        if(res.error_code!=0) return res.message;
        this.dirList = res.data;
        this.setConfig({dirPrice:Object.keys(this.dirList)[1],realDirP:Object.values(this.dirList)[1][0]})
        this.phoneTax()
      },
       async getCarPrice(){
        let res = await cardPrice({token:this.getToken});
        if(res.error_code!=0) return res.message;
        this.cardList = res.data;
        this.vipCustom()
      },
      typeSelect(index){
          this.setConfig({type:index})
          this.typeIndex = index;
          if(index==0) {
            this.noGoods = ['1']
            this.phoneTax()
            this.bulletin = ""
          }else {
            this.noGoods = ['1','5']
            this.phoneTax()
            this.bulletin = "同一个账号在多个渠道进行充值卡充值，每天累计最多5次。"
            setTimeout(() => {
              this.runMarquee()
            }, 500)
          }
      },
      dirClick(index,price,key){
        if(this.phoneCan==true){
          // console.log(this.noGoods)
          // console.log(key)
          if(this.noGoods.indexOf(key)!=-1){
            return false;
          }
          this.dirIndex = index;
          this.setConfig({dirPrice:key,realDirP:price[0]})
          this.phoneTax()
        }
      },
      carClick(index,price,key){
        if(this.noGoods.indexOf(key)!=-1){
          return false;
        }
        this.carIndex = index;
        this.setConfig({cardPrice:key,realCarP:price[0]})
        this.phoneTax()
      },
      vipCustom(){  //赢球帝
        if(this.userinfo.vendorId == 'yingqiudi'){
           this.type[0].show=false;
           this.typeIndex=1;
           this.yinqiudiShow = true;
          //['1','5','20','30','50','100','200','300','500'];//所有的金额类型
           this.noGoods=['1','5','20','30','50'];  //不需要的金额
           this.carIndex = this.noGoods.length;
           this.setConfig({
              type:1,
              cardPrice:Object.keys(this.cardList)[this.carIndex],
              realCarP:Object.values(this.cardList)[this.carIndex][0]
            })
        }else{
          this.setConfig({cardPrice:Object.keys(this.cardList)[2],realCarP:Object.values(this.cardList)[2][0]}) //初始值拿下标为1的值
        }
      },
      contact () {
        window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
      },
      detailInfo() {
        this.detailInfoShow = !this.detailInfoShow
      },
      async phoneBnt(name){
        if(name == 'dir'){
          if(this.phoneCan){

            if(this.userinfo.score >= this.phoneTaxInfo.total){
              if(this.phoneTaxInfo.monthTotal > 30000 && isEmpty(this.userinfo.idnum)){
                this.$dialog({type:'confirm',content:'您消费额度超过3万，请先实名认证！'},()=>{
                  this.$router.push({path:'/realName?back=/phone'})
                })
                return false;
              }else {
                let res = await this.checkPassword();
                if (!res) return false;
              }
            }else{
              this.$dialog({content:'您的积分不足！'},()=>{});
              return false;
            }
            this.setConfig({phoneTaxInfoTotal: this.phoneTaxInfo.total})
            this.$emit('hand-smsShow')
          }
        }else{

          if(this.userinfo.score >= this.phoneTaxInfo.total){
              if(this.phoneTaxInfo.monthTotal > 30000 && isEmpty(this.userinfo.idnum)){
                this.$dialog({type:'confirm',content:'您消费额度超过3万，请先实名认证！'},()=>{
                  this.$router.push({path:'/realName?back=/phone'})
                })
                return false;
              }else {
                let res = await this.checkPassword();
                if (!res) return false;
              }
            }else{
              this.$dialog({content:'您的积分不足！'},()=>{});
              return false;
            }
            this.setConfig({phoneTaxInfoTotal: this.phoneTaxInfo.total})
            this.$emit('hand-smsShow')
        }
      },
      async phoneTax() {
        let amount = ''
        let denomination = ''
        let memo = ''
        if(this.phoneConfig.type==0){
          amount = this.phoneConfig.realDirP;
          denomination = this.phoneConfig.dirPrice;
          memo = 'phone';
        }else{
          amount = this.phoneConfig.realCarP;
          denomination = this.phoneConfig.cardPrice;
          memo = 'phoneCard'
        }
        let res = await phoneTaxS({amount:amount, token: this.getToken, memo: memo,denomination: denomination})
        if (res.error_code != 0) return this.$toast(res.message);
        this.phoneTaxInfo = res.data;
      },
      cleanInput() {
        this.mobile = ''
        this.dirIndex = 1
        this.carIndex = 2
      },
      toPhoneFile() {
        this.$emit('hand-phoneFile', true)
      },
      runMarquee() {
        // 获取文字 计算后宽度
        var width = this.$refs.marquee[0].getBoundingClientRect().width,
            marquee = this.$refs.marqueeBox,
            disx = 0, // 位移距离
            bodyWith = this.$refs.marqueeWrap.clientWidth;
        console.log(width)
        console.log(bodyWith)
        if (width > bodyWith){
        //设置位移
        setInterval(() => {
            disx--; // disx-=1; 滚动步长
          if (-disx >= width) {
              disx = 45; // 如果位移超过文字宽度，则回到起点  marquee-list的margin值
          }
          // marquee.style.transform = 'translateX(' + disx + 'px)'
            marquee.style.left = disx + 'px'
          }, 30) //滚动速度
        }
      },
      inputClick(e) {
        e.target.focus();
      }
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      userinfo: 'getUserinfo',
      phoneConfig: 'phone/getConfig',
      platform: 'platform/getPlatform',
      vendorId: 'platform/getVendorId',
    }),
  },
  created () {
    let u = navigator.userAgent
    let is_iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if(is_iOS) {
      this.isiOS = true
    }
    let phoneNum = this.userinfo.userName.replace(/\s+/g, "")
      if(IsChinaMobile(phoneNum)) {
        this.mobile = phoneNum
      }else {
        this.mobile = ''
      }
    this.getDirPrice();
    this.getCarPrice();
    this.noGoods = ['1']
    // if (this.platform && this.vendorId=='3839c796c9574b05a80c87f0adfb1f21') {
    //   this.isNormalUser = false
    //   this.type[1].tip = "话费充值"
    // }
  },
  mounted(){
    if(this.haofang) {
      this.isNormalUser = false
      this.type[1].tip = "话费充值"
    }
    // 延时滚动
    // setTimeout(() => {
    //     this.runMarquee()
    // }, 1000)
  },

}
</script>

<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.phoneType{
  padding-top: 44px;
}
.phoneBill-sel-wrap{
  // background: #313340;
  height: 115px;
  .phoneBill-sel {
    // padding-top: 30px;
    color: #30ce84;
    ul {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      width: 100%;
      margin: 0 auto;
      li {
        text-align: center;
        width: 50%;
        height: 115px;
        .phone-icon {
          margin: 0 auto;
          margin-top: 24px;
          width: 36px;
          height: 36px;
          img {
            width:100%;
            height: 100%;
          }
        }
        .phone-name {
          margin-top: 12px;
          color: rgba($color: #ffffff, $alpha: 0.6);
          .name {
            font-size: 15px;
            font-weight: bold;
          }
          .tips {
            margin-top: 2px;
            font-size: 10px;
            span {
              display: inline-block;
              vertical-align: middle;
            }
            .tips-active {
              margin-right: 3px;
              width: 10px;
              height: 10px;
              background-image: url('../../../../common/images/phone/tips_normal.png');
              background-size: 100% 100%;
            }
            .tips-inactive {
              margin-right: 3px;
              width: 10px;
              height: 10px;
              background-image: url('../../../../common/images/phone/tips_none.png');
              background-size: 100% 100%;
            }
          }
          &.select-active {
            color: #ffffff;
          }
        }
      }
    }
  }
}
.phoneBill-money {
  position: relative;
  margin: 0 16px;
  margin-top: 10px;
  padding: 16px;
  padding-top: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
    .phone-explain{
      color: #999;
      font-size: 12px;
      // padding-bottom: 70px;
      padding-bottom: 5px;
    }
    .phone-explain-important {
      color: #FF0000;
      font-size: 20px;
    }
    .bulletinW {
      margin-top: 5px;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 14px;
        height: 14px;
      }
      div {
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
        width: 93.5%;
        span {
          display: inline-block;
          width: 200%;
          font-size: 20px;
          color: #FF9900;
          transform: scale(0.5);
          transform-origin: left;
        }
      }

    }
    .phoneBill-inpW {
      position: relative;
      // margin-top: 8px;
      border-bottom: 1px solid #E5E5E5;
      .input-flex {
        .phoneBill-inp {
          color: #444444;
          font-size: 28px;
          font-weight: bold;
          font-family: PingFangSC-Semibold;
        }
        .phoneBill-inp::placeholder {
          font-size: 18px;
          color: rgba($color: #000000, $alpha: 0.1);
        }
        .iOS-phone {
          letter-spacing: -2px;
        }
      }

      .phoneText {
        position: absolute;
        top: 9px;
        right: 30px;
        font-size: 14px;
        color: rgba($color: #444444, $alpha: 0.4) ;
      }
      .close {
        position: absolute;
        top: 9px;
        right: 0;
        width: 20px;
        height: 20px;
        background-image: url('../../../../common/images/phone/close_normal.png');
        background-size: 100% 100%;
      }
    }
    .recordW {
      padding-top: 12px;
      padding-bottom: 8px;
      position: relative;
      .charge-num {
        position: absolute;
        top: 2px;
        left: 0;
        font-size: 18px;
        color: #444444;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
      }
      .record {
          text-align: right;
          font-size: 12px;
          color: #444444;
          .record-content {
            display: inline-block;
            padding: 3px 9px 3px 9px;
            border-radius: 12px;
            border: 1px solid #444444;
          }
        }
    }
    .recordW-indirect {
      padding-top: 0px;
    }
    .advert-top {
      position:relative;
      display:flex;
      width:100%;
      height:46px;
      color:#FF9900;
      font-size:14px;
      align-items:center;
      margin-top: -18px;
      img {
        width: 14px;
        height: 14px;
        margin-right: 3px;
      }
      .marquee-wrap {
        position:relative;
        display:flex;
        overflow:hidden;
        width:100%;
        height:100%;
        .marquee-box{
          position:absolute;
          top:50%;
          display:flex;
          white-space:nowrap;
          transform:translateY(-50%);
          .marquee-list{
            margin-right:45px;
          }
        }
      }
    }
  }
  .phone-direct::before, .phone-indirect::before{
    position: absolute;
    content: '';
    top: -10px;
    width: 40px;
    height: 20px;
    background-image: url('../../../../common/images/phone/yuanhu.png');
    background-size: 100% 100%;
  }
  .phone-direct::before {
    left: 58px;
  }
  .phone-indirect::before {
    right: 58px;
  }
.phoneBill-typeU{
  overflow: auto;
  li {
    height: 72px;
    display: inline-block;
    // margin: 10px 1.6% 0px 1.6%;
    margin-top: 10px;
    margin-right: 3.2%;
    font-size: 15px;
    position: relative;
    width: 31%;
    border-radius: 5px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #999999;
    background: #F8F8F7;
    .lack{
      position: absolute;
      width: 32px;
      height: 16px;
      line-height: 16px;
      border-radius: 8px;
      font-size: 10px;
      color: #fff;
      text-align: center;
      top: -8px;
      right: -8px;
      background: $theme;
    }
    &:nth-of-type(3n) {
      margin-right: 0;
    }
    .phoneBill-tIntegral {
      color: #999999;
      font-size: 12px;
      letter-spacing: 1px;
    }
  }
  .price_gray{
    color: #999999;
  }
}
.phoneBill-tCard {
  margin-top: 5px;
  li {
    position: relative;
    width: 150px;
    height: 82px;
    float: left;
    margin-right: 11px;
    margin-top: 10px;
    // border: 1px solid #3296FA;
    &:nth-child(even) {
      margin-right: 0px;
    }
    .lack{
      position: absolute;
      width: 32px;
      height: 16px;
      line-height: 16px;
      border-radius: 8px;
      font-size: 10px;
      color: #fff;
      text-align: center;
      top: -8px;
      right: -8px;
      background: $theme;
    }
    .phoneBill-top {
      padding: 10px 0px 10px 10px;
      height: 60px;
      background: #F6FAFE;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      box-sizing: border-box;
      font-size: 0;
      border: 1px solid #F6FAFE;
      .icon {
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 40px;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        line-height: 40px;
        font-weight: 600;
        background-image: url('../../../../common/images/phone/chongzhika-icon.png');
        background-size: 100% 100%;
      }
      .phoneBill-info {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        .price {
          font-size: 15px;
          color: #3296FA;
          font-weight: 600;
        }
        .notice {
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .phoneBill-bottom {
      height: 22px;
      line-height: 22px;
      color: #ffffff;
      text-align: center;
      background: #CCE1FC;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      p {
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        // transform: scale(0.5);
      }
    }
  }
  .card_price_gray {
    .phoneBill-top {
      background: #F8F8F7;
      .icon {
        background-image: url('../../../../common/images/phone/chongzhika_icon_none.png') !important;
      }
      .price {
        color: #999999 !important;
      }
    }
    .phoneBill-bottom {
      background: rgba($color: #AAAAAA, $alpha: 0.2);
    }
  }
  .card_price_actived {
    .phoneBill-top {
      border: 1px solid #3296FA;
      border-bottom: 0px;
      box-sizing: border-box;
    }
    .phoneBill-bottom {
      background: linear-gradient(225deg, #1B6AF2 0%, #56B2FF 100%);
    }
  }
}
.explainW {
  width: 343px;
  margin: 0 auto;
  margin-top: 12px;
  .explain-header {
    img {
      width: 343px;
      height: 80px;
    }
  }
  .explain-main {
    padding: 0 16px;
    background: #ffffff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-size: 12px;
      color: #444444;
      img {
        width: 16px;
        height: 16px;
      }
      div {
        margin-left: 10px;
        width: 290px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #F0F0F0;
        box-sizing: border-box;
        .left {
          font-size: 15px;
          color: #444444;
        }
        .right {
          font-size: 12px;
          color: #999999;
        }
      }
    }
  }
}

.other-serviceW {
  width: 343px;
  margin: 0 auto;
  margin-top: 12px;
  padding: 16px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  .title {
    font-size: 14px;
    color: #444444;
    font-weight: 500;
  }
  .other-service {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 16px;
    li {
      text-align: center;
      img {
        display: inline-block;
        width: 28px;
        height: 28px;
      }
      p {
        font-size: 12px;
        color: #444444;
      }
    }

  }
}

.phoneCan{
  li{
    background: #F6FAFE;
    color: #3296FA;
    .phoneBill-tIntegral {
      color: #999999;
      font-size: 12px;
      letter-spacing: 1px;
    }
  }
  .price_actived{
    background: linear-gradient(225deg, #1B6AF2 0%, #56B2FF 100%);
    color: #fff;
    .phoneBill-tIntegral {
      color: #fff;
    }
  }
  .price_gray{

    color: #999999;
    // border: 1px solid #cccccc;
  }
}

.phoneBill-tMoney,
.phoneCard-tMoney {
  font-size: 24px;
  font-weight: bold;
}
.phoneBill-card ,.phoneBill-OR {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
  color: #4a4a4a;
  .phoneBill-over{
    color: #30ce84;
  }
}
.phoneBill-card{
    color: rgb(255, 255, 255);
    width: 88%;
    text-align: center;
    margin: 38px auto 0px auto;
}
.phoneBnt {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  width: 311px;
  height: 45px;
  color: #ffffff;
  font-size: 17px;
  font-family: PingFangSC-Semibold;
  border-radius: 5px;
  background: linear-gradient(225deg, #1ED688 0%, #0CC391 100%);
  .line {
    display: inline-block;
    margin: 0 12px;
    width: 1px;
    height: 17px;
    background: #ffffff;
  }
}
.phoneBntN {
  background: rgb(230,230,230);
}
.detailInfoW {
  margin: 0 auto;
  padding: 6px 16px;
  width: 299px;
  // height: 108px;
  height: auto;
  background: rgba($color:$phone, $alpha: 0.05);
  box-sizing: border-box;
  li {
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #444444;
  }
}
.phoneInfoW {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  .left {
    color: #444444;
    font-size: 14px;
    .score {
      margin-left: 10px;
      color: #FF9900;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .right {
    color: $phone;  // 主題色
    font-size: 14px;
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
  .rightN {
    color: rgba($color:$phone, $alpha: 0.4);
  }
}
.contact {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  p {
    font-size:14px;
    color: #444444;
    text-align: center;
  }
  img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
}
.price_gray{

    color: #cccccc;
    // border: 1px solid #cccccc;
  }

</style>
<style>
.clearfix:after{
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
}
@media screen and (min-width: 600px) {
  .phoneBnt{
    max-width: 384px; /*no*/
  }
}

</style>
