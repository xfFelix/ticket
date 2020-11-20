<template>
  <div class="gold-Info" ref="infoContent">
    <div class="goldC-banner">
      <!-- <ul class="goldC-select">
        <li @click="selectBuyType(0)" :class="[gbtId==0? 'left': 'left-change']">黄金兑换</li>
        <li @click="selectBuyType(1)" :class="[gbtId==0? 'right': 'right-change']">回购</li>
      </ul> -->
      <div class="goldC-tabW">
        <div class="goldC-title">黄金兑换</div>
        <div class="goldC-record" @click="$router.push({name:'goldZyRecord'})">
          <span class="record-name">我的兑换记录</span>
          <span class="record-arrow"></span>
          </div>

      </div>
      <div class="tips" v-if="untreated>0">你有{{untreated}}笔黄金兑换未处理，去提货<span class="icon-close" @click="untreated=null"></span></div>
      <!-- 黄金兑换 -->
      <div v-if="buyType==0">
        <div class="gold-type-wrapper">
          <div class="gold-type">
            <li
              v-for="(item,index) in goldType"
              :key="item.id"
              :class="gtActive==index?'gold-active':''"
              @click="selectType(item.id)"
              :style="item.show?'':'display:none'"
            >
            <img :src="item.imgPath" alt="">
            <span>{{item.name}}</span>
            </li>
          </div>
          <div class="information">
            <div class="item unit-price">
              <p class="title"><img src="@/common/images/gold-hd/jiage.png" alt=""><span>兑换价格</span></p>
              <p class="text left">{{unitPrice|toPrice}}</p>
              <p class="unit" v-if="gtId==3"><span class="left">/根</span><span class="right">(10克)</span></p>
              <p class="unit" v-else><span class="left">/颗</span><span class="right">(0.05克)</span></p>
            </div>
            <div class="item score">
              <p class="title"><img src="@/common/images/gold-hd/jifen.png" alt=""><span>椰子分余额</span></p>
              <p class="text right">{{userinfo.score}}</p>
            </div>
          </div>
          <div class="gold-price">
            <span class="left">今日{{gtId==3?'金条':'金砂'}}价格</span>
            <span class="right">{{goldPrice|toPrice}}元/克</span>
          </div>
        </div>
        <!--黄金详细信息 -->
        <div class="gold-detail-wrapper">
          <!-- 黄金数量 -->
          <div class="goldC-buy-wrapper">
            <div class="goldC-buy">
              <p>请选择兑换数量</p>
              <div class="input-wrapper">
                <span class="decrease" :class="[notSetDec?'not-Decset':'']" @click="decrease"></span>
                <input
                  type="number"
                  class="goldC-input"
                  :value="inpPrice"
                  @input="checkInput($event)"/>
                <span class="increase" :class="[notSetInc?'not-set':'']" @click="increase"></span>
              </div>
            </div>
            <div class="special-num">
              <ul>
                <li :class="[inpPrice==item? 'active': '']" v-for="(item,index) in specialNum" :key="index" @click="setAmount(item)">
                  <span>{{item}}</span><span>{{gtId==3?'根':'颗'}}</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 黄金费用 -->
          <ul class="goldC-msg">
            <li v-if="gtId==3">金条价格<span>{{taxInfo.amount|toPrice}}</span></li>
            <li v-if="gtId==4">金砂价格<span>{{taxInfo.amount|toPrice}}</span></li>
            <li>平台服务费<span>{{taxInfo.service_fee|toPrice}}</span></li>
            <li>交易手续费<span>{{taxInfo.transactionFee|toPrice}}</span></li>
            <li>税费<span>{{taxInfo.tax_total|toPrice}}{{taxInfo.tax_total==0?'(免税)':''}}</span></li>
            <li v-if="taxInfo.preferentialFee">优惠费用<span style="color:#FF6600">-{{taxInfo.preferentialFee|toPrice}}</span></li>
            <li class="line one-top-px"></li>
            <li class="total">合计<span class="price">{{taxInfo.total|toPrice}}</span></li>
          </ul>
        </div>

        <goldIntroF></goldIntroF>
      </div>
      <!-- 黄金回购 -->
      <div v-if="buyType==1">
        <div class="scroll-list-wrap">
            <!-- <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0"> -->
                <ul class="recordW" v-if="recodeList.length!=0">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                            <span v-if="item.code">卡密：
                              {{item.code.length>14?item.code.substring(item.code.length-14):item.code}}
                              <em class="see" @click="dialogPwd(item.id)" ></em>
                            </span>
                            <span v-else>卡密：— —</span>
                            <div class="status">可回购</div>
                        </div>
                        <div class="reInfoW">
                            <div class="reInfo">
                                <p class="change-time">兑换时间：{{item.addDate}}</p>
                                <div class="table-wrapper">
                                  <table class="table" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr class="top">
                                        <td><span>数量</span></td>
                                        <td><span>黄金价格</span></td>
                                        <td><span>平台服务费</span></td>
                                        <td><span>交易手续费</span></td>
                                        <td><span>税费</span></td>
                                      </tr>
                                      <tr class="bottom">
                                        <td><span>10g,金条</span></td>
                                        <td><span>44937.00</span></td>
                                        <td><span>449.37</span></td>
                                        <td><span>699.22</span></td>
                                        <td><span>0.00</span></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <p class="total">合计：46085.59</p>
                                <p class="estimate">回购预计可到账金额</p>
                                <p class="estimate-price">44487.63<span>元</span></p>




                                <!-- <p v-if="item.gtype==1">数量：{{Math.round(item.weight/0.2)+'颗'}}</p>
                                <p v-if="item.gtype==4 && item.transactionFee==null">数量：{{Math.round(item.weight/0.1)+'颗'}}</p>
                                <p v-if="item.gtype==4 && item.transactionFee!=null">数量：{{Math.round(item.weight/0.05)+'颗'}}</p>
                                <p v-if="item.gtype==0 || item.gtype==3">数量：{{Math.round(item.weight/10)+'根'}}</p>
                                <p>{{(item.gtype==0 || item.gtype==3)?'金条价格':'金砂价格'}}：{{item.repaymentAmount|toPrice}}</p>
                                <p>平台服务费：{{item.serviceFee|toPrice}}</p>
                                <p>交易手续费：{{item.transactionFee|toPrice}}</p>
                                <p>税费：{{item.taxFee|toPrice}}</p>
                                <p class="total">合计：{{item.totalAmount|toPrice}}</p> -->
                            </div>
                            <div class="recover"  @click="recovery(item.price,item.id,item.gtype,item.code,item.weight)">
                                立即回购
                            </div>
                        </div>
                    </li>
                </ul>
            <!-- </cube-scroll> -->
            <no-data v-else :data="recodeList">
              <p style="margin-top:10px;font-size: 15px;color:rgba(0,0,0,0.4)">暂无回购</p>
            </no-data>
            <div class="other-info">
              <p class="record">所有兑换记录></p>
              <div class="tipW">
                <img src="@/common/images/gold-hd/notice.png" alt="">
                <p class="tip">回购由第三方东莞市皇帝珠宝有限公司提供统一服务</p>
              </div>
              <p class="service-title">您可选择的黄金服务</p>
              <ul class="serviceW">
                <li>
                  <p class="title">直接回购</p>
                  <div class="service-info">
                    <p class="odd"><span class="circle flex">1</span>填写回购银行卡信息</p>
                    <p class="even"><span class="dash"></span><span class="text">校验银行信息真实性</span></p>
                    <p class="odd"><span class="circle flex">2</span>提交回购</p>
                    <p class="even"><span class="dash"></span></p>
                    <p class="odd"><span class="circle flex">3</span>到账成功</p>
                    <p class="last">预计2小时内到账</p>
                  </div>
                </li>
                <li>
                  <p class="title">交割实物</p>
                  <p class="right-text">交割实物无需进行回购，兑换成功后，直接联系客服，申请获取实物。</p>
                </li>
              </ul>
            </div>
        </div>
        <!-- 回购须知 -->
        <goldIntroS></goldIntroS>
      </div>
    </div>
  </div>
</template>
<script>
import { goldPrice,goldTax, goldLog, goldUntreated } from "api";
import { mapGetters,mapActions} from 'vuex';
import { IsInteger,isEmpty } from "util/common";
export default {
  model: {
    prop: 'inpPrice',
    event: 'input'
  },
  props: {
    inpPrice: String
  },
  data: () => ({
    gbtId: 0,  //黄金购买方式标记
    goldType: [
      {
        id: 0,
        name: "金砂",
        imgPath: require('@/common/images/gold-hd/gold-sand.png'),
        show:true
      },
      {
        id: 1,
        name: "金条",
        imgPath: require('@/common/images/gold-hd/gold-bar.png'),
        show:true
      },
    ],
    gtId: 4, //黄金类型标记
    gtActive: 0,
    goldPrice:undefined,
    taxInfo:{},
    unitPrice: undefined,
    recodeList: [],
    pullUpLoad: true,
    pullUpLoadThreshold: 0,
    pullUpLoadMoreTxt: '上拉加载更多...',
    pullUpLoadNoMoreTxt: '没有更多数据了~~',
    tenFlag: true,
    selectAmount: 0,
    specialNum:[4,7,10,20],
    notSetDec: true,
    notSetInc: false,
    untreated: 0
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      userinfo: 'getUserinfo'
    }),
    buyType: {
      get() {
        return this.$store.state.gold.config.buyType
      },
      set(val) {
        return this.$store.dispatch('gold/setConfig',{buyType: val})
      }
    },
    type: {
      get() {
        return this.$store.state.gold.config.type
      },
      set(val) {
        return this.$store.dispatch('gold/setConfig',{type: val})
      }
    },
    barPrice:{
      get() {
        return this.$store.state.gold.config.barPrice
      },
      set(val) {
        return this.$store.dispatch('gold/setConfig',{barPrice: val})
      }
    },
    sandPrice:{
      get() {
        return this.$store.state.gold.config.sandPrice
      },
      set(val) {
        return this.$store.dispatch('gold/setConfig',{sandPrice: val})
      }
    },
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
      }
    },
    pullUpLoadObj: function() {
        return this.pullUpLoad ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
                more: this.pullUpLoadMoreTxt,
                noMore: this.pullUpLoadNoMoreTxt
            }
        } : false
    },
  },
  watch:{
    inpPrice(val){
      if(val){
        // console.log('watch-price',val)
        window.clearTimeout(this.timeInp)
        this.timeInp=window.setTimeout(()=>{
          this.getTax(val);
        },500)
        if(val<=1) {
          this.notSetDec = true
        }else {
          this.notSetDec = false
        }
        if(val>=9999) {
          this.notSetInc = true
        }else {
          this.notSetInc = false
        }
      }else{
        // console.log('else',val)

        // window.clearTimeout(this.timeInp)
        // this.timeInp=window.setTimeout(()=>{
        //   this.getTax(0);
        // },700)
      }
    },
  },
  methods: {
    selectBuyType(index) {
      this.gbtId = index
      this.buyType = index
      if(index == 1) {
        // 回购列表
        // this.getScenicList();
      }
    },
    selectType (id) {
      this.gtActive = id
      this.$emit('input', '1')
      if(id==0) {
        this.specialNum = [4,7,10,20]
        this.notSetDec = true
        this.type = 4
        this.gtId = 4
      }else {
        this.specialNum = [2,3,4,7]
        this.notSetDec = true
        this.type = 3
        this.gtId = 3
      }
      this.getUnitPrice()
      this.getPrice();
    },
    async getPrice() {
      let res = await goldPrice({ id: this.gtId });
      if(res.error_code!=0) return this.$toast(res.message);
      this.goldPrice = res.data.goldPrice;
      if(this.gtId==3){
          this.barPrice = this.goldPrice;
      }else{
          this.sandPrice = this.goldPrice;
      }
    },
    async getTax(val) {
      let res = await goldTax({ amount: val,id: this.gtId,token: this.getToken});
      if(res.error_code!=0) return this.$toast(res.message);
      this.taxInfo = res.data;
      let resStock = await goldPrice({ id: this.gtId });
      if(resStock.error_code!=0) return this.$toast(resStock.message);
      this.taxInfo.goldStock = resStock.data.goldStock;
      // console.log("this.taxInfo",this.taxInfo)
      this.$emit('tax-money',this.taxInfo)
    },
    setAmount (num) {
      this.getTax(num)
      // this.selectAmount = num
      this.$emit('input', num.toString())
    },
    decrease() {
      let num = this.inpPrice
      if(!this.notSet) {
        num--
        if(num<=1) {
          num=1
        }
        this.$emit('input', num.toString())
      }
    },
    increase() {
      let num = this.inpPrice
      if(!this.notSet) {
        num++
        if(num>=9999) {
          num=9999
        }
        this.$emit('input', num.toString())
      }
    },
    async getUnitPrice () {
      let res = await goldTax({ amount: 1,id: this.gtId,token: this.getToken});
      if(res.error_code!=0) return this.$toast(res.message);
      this.taxInfo = res.data;
      // console.log('this.taxInfo',this.taxInfo)
      this.unitPrice = res.data.amount
      let resStock = await goldPrice({ id: this.gtId });
      if(resStock.error_code!=0) return this.$toast(resStock.message);
      this.taxInfo.goldStock = resStock.data.goldStock;
      this.$emit('tax-money',this.taxInfo)
    },
    checkInput (e) {
      if(IsInteger(e.target.value)) {
        if(e.target.value.length>4) {
          e.target.value = e.target.value.slice(0,4);
        }
          this.$emit('input', e.target.value)
      }else {
        e.target.value = ''
        this.$emit('input', e.target.value)
        if(this.gtId==3){
            this.$toast('请输入有效的根数');
          }else{
            this.$toast('请输入有效的颗数');
          }
      }

    },
    onPullingUp() {
        if (this.tenFlag === true) {
            this.start+=10
            this.getScenicList();
        }
        if (!this.tenFlag && this.recodeList.length > 0) {
            this.$refs.scroll.forceUpdate();
        }
    },
    async getScenicList() {
        let data = await goldLog({
          token: this.getToken,
          id: 1,
          start: this.start,
        });
        if (data.error_code != 0) {
          return this.$toast(data.message);
        }
        data.data.forEach(item=> {    //回购信息显示
          item.statusT = false;
        })
        this.recodeList.push(...data.data);
        if (data.data.length < 10) {
            this.tenFlag = false;
        }
    },
    async getUntreated( ) {
      let data = await goldUntreated({
          token: this.getToken,
        });
      if (data.error_code != 0) {
          return this.$toast(data.message);
        }
      this.untreated = data.data
    }
  },
  components: {
    goldIntroF: ()=> import('./goldIntroF.vue'),
    goldIntroS: ()=> import('./goldIntroS.vue'),
    NoData: () => import('components/NoData')
  },
  mounted () {
    this.getPrice();
    if(this.getToken) {
      this.getUnitPrice()
      this.getTax(1)
      this.getUntreated()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.gold-Info {
  width: 100%;
  .goldC-banner {
    width: 100%;
    position: relative;
    // .goldC-select {
    //   height: 50px;
    //   li {
    //     float: left;
    //     width: 185px;
    //     height: 50px;
    //     font-size: 16px;
    //     line-height: 50px;
    //     text-align: center;
    //     font-weight: 600;
    //     letter-spacing: 2px;
    //     background-size: 100% 100%;
    //     font-family: PingFangSC-Medium, PingFang SC;
    //     &.left {
    //       color: #424448;
    //       background-image: url('../../../../common/images/gold-hd/huangjingduihuan_normal.png');
    //     }
    //     &.right {
    //       color: rgba($color: #FFFFFF, $alpha: 0.4);
    //       background-image: url('../../../../common/images/gold-hd/huigou_pressed.png');
    //       margin-left: -27px;
    //     }
    //     &.left-change {
    //       color: rgba($color: #FFFFFF, $alpha: 0.4);
    //       background-image: url('../../../../common/images/gold-hd/huangjingduihuan_pressed.png');
    //     }
    //     &.right-change {
    //       color: #424448;
    //       background-image: url('../../../../common/images/gold-hd/huigou_normal.png');
    //       margin-left: -27px;
    //     }
    //   }
    // }
    .tips {
      position: absolute;
      top: 45px;
      right: 16px;
      padding-left: 10px;
      padding-right: 6px;
      height: 26px;
      // line-height: 26px;
      color: rgba($color: #ffffff, $alpha: 0.8);
      font-size: 12px;
      background: $theme;
      border-radius: 5px;
      display: flex;
      align-items: center;
      .icon-close {
        margin-left: 3px;
        display: inline-block;
        // vertical-align: baseline;
        width: 12px;
        height: 12px;
        background-image: url('../../../../common/images/gold-hd/icon_close.png');
        background-size: 100% 100%;
      }
      &::after {
        content: '';
        position: absolute;
        top: -5px;
        right: 24px;
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        background: $theme;
      }
    }
    .goldC-tabW {
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      background: #fff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .goldC-title {
        font-size: 18px;
        font-weight: bold;
      }
      .goldC-record {
        display: flex;
        align-items: center;
        padding: 0px 10px;
        height: 24px;
        border-radius: 12px;
        background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
        letter-spacing: 1px;
        .record-name {
          font-size: 12px;
          color: #fff;
        }
        .record-arrow {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-image: url('../../../../common/images/gold-hd/record-arrow.png');
          background-size: 100% 100%;
        }
      }
    }
    .gold-type-wrapper {
      margin-top: -1px;
      background-color: #FFFFFF;
      padding: 20px 0 10px 0px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      .gold-type {
        padding: 0 72px;
        display: flex;
        justify-content: space-between;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 30px;
          color: rgba($color: #444444, $alpha: 0.4);
          &.gold-active {
            color: #444444;
            background-color: rgba($color: #B4B4B4, $alpha: 0.1);
            border-radius: 15px;
          }
          img {
            margin-right: 5px;
            width: 18px;
            height: 18px;
          }
          span {
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
      .information {
        display: flex;
        margin-top: 20px;
        padding-left: 20px;
        .item {
          .title {
            img {
              display: inline-block;
              vertical-align: middle;
              margin-right: 5px;
              width: 14px;
              height: 14px;
            }
            span {
              display: inline-block;
              vertical-align: middle;
              font-size: 14px;
              color: #444444;
            }
          }
          .text {
            display: inline-block;
            margin-top: 8px;
            font-size: 24px;
            font-weight: 600;
            font-family: DIN-Bold, DIN;
            &.left{
              color: #D5A96E;
            }
            &.right{
              color: #444444;
            }
          }
          .unit {
            display: inline-block;
            font-size: 14px;
            .left {
              color: #D5A96E;
            }
            .right {
              color: #424448;
            }
          }
        }
        .unit-price {
          width: 180px;
        }
        .score {
          // padding-left: 25px;
        }
      }
      .gold-price {
        margin: 0 auto;
        margin-top: 24px;
        width: 190px;
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        text-align: center;
        background-color: rgba($color: #D5A96E, $alpha: 0.1) ;
        border-radius: 10px;
        .left {
          margin-right: 5px;
          color: #444444;
        }
        .right {
          color: #D5A96E;
        }
      }
    }
    .gold-detail-wrapper {
      margin-top: 12px;
      padding: 16px;
      background-color: #FFFFFF;
      border-radius: 10px;
      box-shadow: 0px 2px 10px 0px rgba(220,220,220,0.6);
      .goldC-buy-wrapper {
        .goldC-buy {
          display: flex;
          justify-content: space-between;
          p {
            font-size: 15px;
            color: #D5A96E;
            font-weight: bold;
          }
          .input-wrapper {
            .goldC-input {
              width: 50px;
              height: 24px;
              font-size: 18px;
              color: #444444;
              font-family: DIN-Bold, DIN;
              font-weight: bold;
              text-align: center;
              -webkit-appearance: none;
              border: 1px solid #D5A96E;
              border-radius: 5px;
              background-color: rgba($color: #D5A96E, $alpha: 0.1);
            }
            .decrease {
              // padding-right: 16px;
              // font-size: 24px;
              margin-right: 12px;
              display: inline-block;
              width: 12px;
              height: 12px;
              background-image: url('../../../../common/images/gold-hd/dec-active.png');
              background-size: 100% 100%;
            }
            .increase {
              // padding-left: 16px;
              // font-size: 20px;
              // padding: 5px;
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
              // color: #C8C8C8;
              background-image: url('../../../../common/images/gold-hd/inc.png');
            }
          }
        }
        .special-num {
          margin-top: 16px;
          ul {
            padding: 0 35px;
            display: flex;
            justify-content: space-between;
            li {
              width: 50px;
              height: 24px;
              line-height: 27px;
              color: #444444;
              font-size: 12px;
              text-align: center;
              border-radius: 5px;
              background-color: rgba($color: #B4B4B4, $alpha: 0.1);
              &.active {
                color: #FFFFFF;
                background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
              }
            }
          }
        }
      }
      .goldC-msg {
        li {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          font-size: 14px;
          color: #444444;
        }
        .total {
          margin-top: 0;
          padding-top: 16px;
          font-weight: bold;
          .price {
            font-weight: bold;
            color: #D3A668;
          }
        }
      }
    }
    .scroll-list-wrap {
      .recordW {
        li {
          padding: 15px 16px;
          margin-bottom: 12px;
          background-color: #F8F8F8;
          border-radius: 10px;
          .reName {
            span {
              display: flex;
              align-items: center;
              font-size: 15px;
              .see {
                margin-left: 8px;
                width: 36px;
                height: 16px;
                background-image: url('../../../../common/images/gold-hd/chakan.png');
                background-size: 100% 100%;
              }
            }
            .status {
              font-size: 14px;
              font-weight: 600;
              color: #07C160;
            }
          }
          .reInfoW {
            .change-time {
              margin-top: 15px;
              margin-bottom: 10px;
              font-size: 10px;
              color: rgba($color: #000000, $alpha: 0.4);
            }
            .table-wrapper {
              .table {
                width: 100%;
                border: 1px solid #DEDEDE;
                border-collapse: separate;
                border-radius: 10px;
                box-sizing: border-box;
                tbody {
                  tr {
                    td {
                      width: 60px;
                      padding: 6px 0px;
                      text-align: center;
                      color: #444444;
                      box-sizing: border-box;
                      border-collapse: separate;
                      border-right: 1px solid #DEDEDE;
                      border-bottom: 1px solid #DEDEDE;
                      span {
                        display: inline-block;
                        width: 100%;
                        font-size: 10px;
                      }
                    }
                  }
                  .top {
                    background-color: rgba($color: #DEDEDE, $alpha: 0.4);
                    td {
                      &:last-child {
                        border-right: 0px solid #DEDEDE;
                      }
                    }
                  }
                  .bottom {
                    td {
                      border-bottom: 0px solid #DEDEDE;
                      &:last-child {
                        border-right: 0px solid #DEDEDE;
                      }
                    }
                  }
                }
              }
            }
            .total {
              margin-top: 15px;
              font-size: 14px;
              color: #D5A96E;
              text-align: right;
              font-weight: bold;
            }
            .estimate {
              margin-top: 30px;
              font-size: 14px;
              color: #444444;
              text-align: center;
            }
            .estimate-price {
              margin-top: 25px;
              font-size: 30px;
              color: #D5A96E;
              text-align: center;
              font-weight: bold;
              font-family: DIN-Bold, DIN;
              span {
                font-size: 14px;
              }
            }
            .recover {
              margin-top: 20px;
              width: 279px;
              height: 34px;
              text-align: center;
              line-height: 34px;
              color: #fff;
              font-size: 16px;
              background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
              border-radius: 5px;
            }
          }
        }
      }
      .other-info {
        .record {
          margin: 15px 0;
          font-size: 12px;
          color: #D5A96E;
          text-align: center;
        }
        .tipW {
          display: flex;
          padding: 5px 8px;
          border-radius: 10px;
          background-color: rgba($color: #D5A96E, $alpha: 0.1);
          img {
            margin-right: 5px;
            width: 12px;
            height: 12px;
          }
          p {
            font-size: 12px;
            color: #424448;
            line-height: 12px;
          }
        }
        .service-title {
          margin-top: 30px;
          font-size: 16px;
          color: #424448;
          font-weight: 600;
        }
        .serviceW {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          li {
            padding-top: 15px;
            padding-left: 8px;
            width: 150px;
            height: 178px;
            box-shadow: 0px 1px 10px 0px rgba(220,220,220,0.6);
            box-sizing: border-box;
            .title {
              font-size: 15px;
              font-weight: 600;
              color: #424448;
              text-align: center;
            }
            .service-info {
              p {
                .circle {
                  margin-right: 5px;
                  display: inline-block;
                  width: 15px;
                  height: 15px;
                  color: #FFFFFF;
                  font-size: 12px;
                  line-height: 15px;
                  text-align: center;
                  border: 5px solid rgb(238, 221, 197);
                  border-radius: 50%;
                  background-color: #D5A96E;
                }
                .dash {
                  margin-top: 3px;
                  padding-left: 12px;
                  display: inline-block;
                  height: 17px;
                  border-right: 2.5px dashed #D5A96E;
                }
                .text {
                  display: inline-block;
                  vertical-align: top;
                  margin-left: 15px;
                  margin-top: -4px;
                  font-size: 10px;
                  color: rgba($color: #000000, $alpha: 0.4);
                }
              }
              .odd {
                font-size: 12px;
                color: #444444;
              }
              .last {
                margin-left: 30px;
                margin-top: -4px;
                font-size: 10px;
                color: rgba($color: #000000, $alpha: 0.4);
              }
            }
            .right-text {
              padding-left: 15px;
              padding-right: 13px;
              margin-top: 12px;
              font-size: 12px;
              color: #444444;
              line-height: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
            }
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.scroll-list-wrap {
    /* padding-top: 80px; */
    /* height: calc(100vh - 89px); */
    /* height: 100vh; */
    /* // fix 子元素超出边框圆角部分不隐藏的问题 */
    /* transform: rotate(0deg); */
    /* overflow: hidden; */
    margin-top: -1px;
    padding: 15px 16px;
    background-color: #ffffff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .headFixed{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
