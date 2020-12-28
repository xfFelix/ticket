
<template>
  <div class="jdCardType">
    <div class="phoneBill-money">
      <!-- 直充 -->
      <div class="recordW">
        <p class="charge-num">京东E卡面额</p>
        <p class="record" @click="$router.push({name:'jdCardRecord'})">
          <span class="record-content">兑换记录</span>
        </p>
      </div>
      <div class="phoneBill-direct">
        <ul class="phoneBill-typeU" :class="phoneCan?'phoneCan':''">
            <li v-for="(item,index) in dirList" :key="index" @click="dirClick(index,item)"
            :class="noGoods.indexOf(item.productPrices)!=-1?'price_gray':(dirIndex==index?'price_actived':'')">
            <span v-if="noGoods.indexOf(item.productPrices)!=-1" class="dir-lack lack" >缺货</span>
              <p class="pB-tMWrap">
                <span class="phoneBill-tMoney"> {{item.productPrices | toPrice}}</span>
                <span class="phoneBill-tYuan">元</span>
              </p>
              <p class="pB-tIWrap" >
                <span class="phoneBill-tIntegral">需积分</span>
                <span class="phoneBill-tIntegral">{{item.total | toPrice}}</span>
              </p>
          </li>
        </ul>
      </div>
      <!-- 京东E卡数量 -->
      <div class="jdCard-buy">
        <p>兑换数量</p>
        <div class="input-wrapper">
          <span class="decrease" :class="[notSetDec?'not-Decset':'']" @click="decrease"></span>
          <input
            type="number"
            class="jdCard-input"
            :value="inpNum"
            @blur="checkInpNum"
            @input="checkInput($event)"/>
          <span class="increase" :class="[notSetInc?'not-set':'']"  @click="increase"></span>
        </div>
      </div>

      <div class="phoneBnt" @click="phoneBnt()">
        <span class="left">应付积分{{jdCardConfig.realCarP | toPrice}}</span>
        <span class="line"></span>
        <span class="right">立即兑换</span>
      </div>

      <div class="detailInfoW" v-if="detailInfoShow">
        <li><span>售价</span><span>{{jdCardConfig.salesPrice | toPrice}}</span></li>
        <li v-if="jdCardTaxInfo.preferentialFee"><span>优惠费用</span><span>-{{jdCardTaxInfo.preferentialFee | toPrice}}</span></li>
        <li><span>税费</span><p><span>{{jdCardTaxInfo.tax_total | toPrice}}</span><span>{{jdCardTaxInfo.tax_total>0?'':'(免税)'}}</span></p></li>
      </div>
      <div class="phoneInfoW">
        <div class="left"><span>椰子分余额</span><span class="score">{{userinfo.score}}</span></div>
        <div class="right" @click="detailInfo"><span>费用明细</span><div class="arrow"><span :class="detailInfoShow?'top-arrow':'bottom-arrow'"></span></div></div>
      </div>
      <div class="contact" @click="contact">
        <img src="../../../../common/images/phone/service-icon.png">
        <p>在线客服</p>
      </div>
  </div>

    <div class="noticeW">
      <p class="title">兑换须知</p>
      <div class="notice-content">
        <li>1.兑换京东E卡，兑换成功会以卡密方式发放，用户可通过在兑换记录中查看。京东E卡为不记名预付卡，卡密请妥善保管，一旦泄露造成卡密失效需自行承担。</li>
        <li>2.一经兑换成功后，不支持退款。</li>
        <li>3.京东E卡的使用规则和章程等，请前往京东官方商城进行查看“o.jd.com”。</li>
      </div>
    </div>

    <div class="noticeW">
      <p class="title">使用方式</p>
      <div class="notice-content">
        <li>1.登录京东首页（www.jd.com），选择您喜欢的商品加入购物车，并根据页面上的提示进行购物操作。注：京东E卡目前只能购买京东自营的商品（部分特殊商品除外），可以通过“京东自营”标志识别自营商品。</li>
        <li>2.在提交订单页面，点击“使用优惠/抵用”，选择“礼品卡”，输入您的京东E卡的卡密，点击绑定即可绑定到您的账户中。然后根据需要选择您使用的京东E卡，点击提交订单即可完成操作。</li>
      </div>
    </div>

    <div class="other-serviceW" v-if="!haofang">
      <p class="title">更多服务</p>
      <div class="other-service">
        <li @click="$router.push({name:'goldZyHome'})">
          <img src="@/common/images/jdCard/gold.png" alt="">
          <p>黄金兑换</p>
        </li>
        <li @click="$router.push({name:'oilHome'})">
          <img src="@/common/images/jdCard/oil.png" alt="">
          <p>加油卡</p>
        </li>
        <li>
          <a :href="process+'#/layout/channel?id=yeyun'">
            <img src="@/common/images/jdCard/shop.png" alt="">
            <p>小椰超市</p>
          </a>
        </li>
        <li @click="$router.push({name:'memberHomeC'})">
          <img src="@/common/images/jdCard/members.png" alt="">
          <p>会员卡券</p>
        </li>
      </div>
    </div>
  </div>
</template>
<script >
import {JDECardPriceList, JDECardTaxs,} from 'api';
import {mapGetters, mapActions} from 'vuex';
import { IsMobile, IsChinaMobile } from "util/common";
import { vipCustom } from '@/mixins';
import { IsInteger,isEmpty  } from "util/common";
export default {
  mixins: [vipCustom],
  data:()=>({
    mobile:'',
    dirList:[],
    phoneCan:true,
    dirIndex:0,
    noGoods:[],
    detailInfoShow: false,
    jdCardTaxInfo:{},
    process:process.env.VUE_APP_BASE_HOME_URL,
    inpNum: 1,
    notSetDec: true,
    notSetInc: false,
    submitCan: false
  }),
  watch:{
    inpNum(val){
      if(val){
        if(val<=1) {
          this.notSetDec = true
        }else {
          this.notSetDec = false
        }
        if(val>=20) {
          this.notSetInc = true
        }else {
          this.notSetInc = false
        }
        if(val > 20) {
          this.inpNum = 20
          this.$toast("单笔最大只支持兑换20张");
        }
        this.submitCan = true
        this.setConfig({num: val.toString()})
        this.jdCardTax()
      }else{
        this.submitCan = false
      }
    }
  },
  methods:{
    ...mapActions({
      setConfig: 'jdCard/setConfig',
      checkPassword: 'checkPassword',
    }),
      async getDirPrice(){
        let res = await JDECardPriceList({token:this.getToken});
        if(res.error_code !=0) return res.message;
        this.dirList = res.data;
        this.setConfig({cardPrice:res.data[0].productPrices,realCarP:res.data[0].total,productCode:res.data[0].productCode,num:'1',salesPrice:res.data[0].salePrice})
        this.jdCardTaxInfo = res.data[0]
        console.log(this.jdCardTaxInfo)
      },
      dirClick(index,item){
        if(this.phoneCan==true){
          if(this.noGoods.indexOf(item.productPrices)!=-1){
            return false;
          }
          this.inpNum = '1'
          this.dirIndex = index;
          this.setConfig({cardPrice:item.productPrices,realCarP:item.total,productCode:item.productCode})
          this.jdCardTaxInfo = item
          this.jdCardTax()
        }
      },
      contact () {
        window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
      },
      detailInfo() {
        this.detailInfoShow = !this.detailInfoShow
      },
      async phoneBnt(){
          if(this.userinfo.score >= this.jdCardTaxInfo.total){
            if(this.jdCardTaxInfo.monthTotal > 30000 && isEmpty(this.userinfo.idnum)){
              this.$dialog({type:'confirm',content:'您消费额度超过3万，请先实名认证！'},()=>{
                this.$router.push({path:'/realName?back=/jdCard'})
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
          this.$emit('hand-smsShow')
      },

      async jdCardTax() {
        let res = await JDECardTaxs({token: this.getToken, productCode: this.jdCardConfig.productCode,num: this.inpNum})
        if (res.error_code != 0) return this.$toast(res.message);
        this.jdCardTaxInfo = res.data;
        this.setConfig({realCarP:res.data.total,salesPrice: res.data.amount})
      },
      cleanInput() {
        this.mobile = ''
        this.dirIndex = 0
      },
      inputClick(e) {
        e.target.focus();
      },
      decrease() {
      let num = this.inpNum
      if(!this.notSet) {
        num--
        if(num<=1) {
          num=1
        }
        this.inpNum = num
      }
    },
    increase() {
      let num = this.inpNum
      if(!this.notSet) {
        num++
        if(num>=20) {
          num=20
        }
        this.inpNum = num
      }
    },
    checkInput (e) {
      if(IsInteger(e.target.value)) {
        if(e.target.value.length>2) {
          e.target.value = e.target.value.slice(0,2);
        }
        this.inpNum = e.target.value
      }else {
        e.target.value = ''
        this.inpNum = e.target.value
      }
    },
    checkInpNum() {
      if(!this.inpNum) {
        this.inpNum = '1'
      }
    }
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      userinfo: 'getUserinfo',
      jdCardConfig: 'jdCard/getConfig',
    }),
  },
  created () {
    this.getDirPrice();
  },
  mounted(){
  },

}
</script>

<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.jdCardType{
  padding: 0 16px;
}
.phoneBill-money {
  position: relative;
  padding: 16px;
  padding-top: 20px;
  margin-top: -74px;
  background-color: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
    .phone-explain{
      color: #999;
      font-size: 12px;
      padding-bottom: 5px;
    }
    .phone-explain-important {
      color: #FF0000;
      font-size: 20px;
    }
    .recordW {
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .charge-num {
        font-size: 18px;
        color: #1A1A1A;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
      }
      .record {
          text-align: right;
          font-size: 12px;
          color: #B36424;
          .record-content {
            display: inline-block;
            padding: 4px 9px 4px 9px;
            border-radius: 12px;
            font-weight: bold;
            background: linear-gradient(90deg, #FFE6C0 0%, #FFC686 100%);
          }
        }
    }
    .recordW-indirect {
      padding-top: 0px;
    }
  }
.phoneBill-typeU{
  overflow: auto;
  li {
    height: 72px;
    display: inline-block;
    margin-top: 10px;
    margin-right: 3.2%;
    font-size: 15px;
    position: relative;
    width: 31%;
    border-radius: 8px;
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
      color: #FFB991;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .pB-tMWrap {
      .phoneBill-tYuan {
        margin-left: 2px;
        font-size: 14px;
      }
    }
    .pB-tIWrap {
      margin-top: -4px;
    }
  }
  .price_gray{
    color: #999999;
  }
}

.jdCard-buy {
  margin-top: 33px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 18px;
    color: #1A1A1A;
    font-weight: bold;
    font-family: PingFangSC-Semibold;
  }
  .input-wrapper {
    .jdCard-input {
      width: 50px;
      height: 24px;
      font-size: 18px;
      color: #444444;
      font-family: DIN-Bold, DIN;
      font-weight: bold;
      text-align: center;
      -webkit-appearance: none;
      border: 1px solid #FFB991;
      border-radius: 5px;
      background-color: #FFF1EB;
      box-sizing: border-box;
    }
    .decrease {
      margin-right: 12px;
      display: inline-block;
      width: 12px;
      height: 12px;
      background-image: url('../../../../common/images/gold-hd/dec-active.png');
      background-size: 100% 100%;
    }
    .increase {
      margin-left: 12px;
      display: inline-block;
      width: 12px;
      height: 12px;
      background-image: url('../../../../common/images/gold-hd/inc-active.png');
      background-size: 100% 100%;
    }
    .not-Decset {
      background-image: url('../../../../common/images/gold-hd/dec.png');
    }
    .not-set {
      background-image: url('../../../../common/images/gold-hd/inc.png');
    }
  }
}
.noticeW {
  margin-top: 12px;
  padding: 20px 16px 14px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  .title {
    font-size: 18px;
    color: #1A1A1A;
    font-weight: bold;
    font-family: PingFangSC-Semibold;
  }
  .notice-content {
    margin-top: 10px;
    line-height: 26px;
    font-size: 14px;
    color: #1A1A1A;
  }
}
.other-serviceW {
  width: 343px;
  margin: 0 auto;
  margin-top: 12px;
  padding: 20px 16px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  .title {
    font-size: 18px;
    color: #1A1A1A;
    font-weight: bold;
    font-family: PingFangSC-Semibold;
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
        width: 36px;
        height: 36px;
      }
      p {
        font-size: 12px;
        color: #1A1A1A;
      }
    }
  }
}

.phoneCan{
  li{
    background: #FFF1EB;
    color: #FE5E00;
    .phoneBill-tIntegral {
      color: #FFB991;
      font-size: 12px;
      letter-spacing: 1px;
    }
  }
  .price_actived{
    background: linear-gradient(90deg, #FE6509 0%, #FF9A24 100%);
    color: #fff;
    .phoneBill-tIntegral {
      color: #fff;
    }
  }
  .price_gray{
    color: #999999;
  }
}

.phoneBill-tMoney,
.phoneCard-tMoney {
  font-size: 22px;
  font-weight: bold;
}
.phoneBnt {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 17px;
  width: 311px;
  height: 45px;
  color: #ffffff;
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  border-radius: 8px;
  background: linear-gradient(270deg, #FE3215 0%, #FF7434 100%);
  .line {
    display: inline-block;
    margin: 0 12px;
    width: 1px;
    height: 17px;
    background: #ffffff;
  }
}
.detailInfoW {
  margin: 0 auto;
  padding: 6px 16px;
  width: 299px;
  height: auto;
  background: #FFF4F2;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
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
      color: #FE5E00;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .right {
    color: #B36424;
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
        border-top: 2px solid #B36424;
        border-right: 2px solid #B36424;
        transform: rotate(-45deg);
      }
      .bottom-arrow {
        position: absolute;
        left: 0;
        top: -5px;
        display: block;
        width: 6px;
        height: 6px;
        border-top: 2px solid #B36424;
        border-right: 2px solid #B36424;
        transform: rotate(135deg);
      }
    }

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
