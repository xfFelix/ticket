<template>
  <div class="wrapper">
    <div class="success-pageW" v-if="!businessValidate">
      <div class="success-page">
      <div class="headerW">
        <p class="finish-text">
          <span @click="changeGlod">完成</span>
        </p>
        <div class="finishW">
          <img src="@/common/images/gold-hd/success.png" alt="">
          <div>
            <p>兑换成功！</p>
            <p>感谢您的兑换</p>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="success-mainW">
        <div class="success-main">
          <div class="success-info">
            <li>
              <span>兑换数量</span>
              <span>{{successInfo.gtype==3?'金条':'金砂'}}，{{successInfo.weight}}克</span>
            </li>
            <li>
              <span>消耗积分</span>
              <span>{{successInfo.totalAmount}}</span>
            </li>
            <div class="line"></div>
            <p class="order-id">订单号：{{successInfo.id}}</p>
          </div>
          <div class="success-detail">
            <p class="code-title">—  您的黄金提货码  —</p>
            <p class="code-text">{{successInfo.code}}</p>
            <img class="code-icon" src="@/common/images/gold-hd/success_gold.png" alt="">
            <p class="gold-weight">{{successInfo.gtype==3?'金条':'金砂'}}{{successInfo.weight}}克</p>
            <div class="gold-info">
              <p>
                <img src="@/common/images/gold-hd/icon_yeyun.png" alt="">
                <span>椰云网络</span>
              </p>
              <p class="gold-hc">恒昌黄金</p>
            </div>
            <p class="gold-yeyun">椰云网络联手恒昌黄金提供黄金兑换服务</p>
          </div>
        </div>
      </div>
      <div class="success-footerW">
        <div class="footerBtn">
          <button class="left" @click="$router.push({name: 'goldZyRecord'})">兑换记录</button>
          <button class="right" @click="goldback">前往提货 ></button>
        </div>
        <div class="tips">
          <p>注：黄金提货由第三方，海南信达贵金科技有限公司</p>
          <p>提供实物黄金物流和黄金回收服务</p>
        </div>
      </div>
      </div>
    </div>
    <div class="success-page-business" v-if="businessValidate">
      <div class="order-infoW">
        <li class="order-info-item">
          <span class="num">{{successInfo.weight}}</span><span class="unit">克，{{successInfo.gtype==3?'金条':'金砂'}}</span>
        </li>
        <li class="order-info-item">
          <span class="num">{{successInfo.totalAmount}}</span>
        </li>
      </div>
      <div class="changes" @click="changeGlod">完成</div>
      <div class="check-record" @click="$router.push({name: 'goldZyRecord'})">查看兑换记录<span class="right-arrow"></span></div>
    </div>
  </div>
</template>
<script>
import {goldInfo} from 'api';
import {mapGetters} from 'vuex'
export default {
  props: {
    businessValidate: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      // pathP:{
      //   name:'goldRecord',
      //   query:0
      // },//要跳转的订单记录页面
      // moneyP:undefined,
      // pathHomeP:'gold',
      // logoIdP:[2,3,5]
      successInfo: {}
    }
  },
  computed:{
     ...mapGetters({
      getToken: 'getToken',
      goldConfig: 'gold/getConfig'
    }),
  },
  methods: {
    async getGoldInfo(){
      let res = await goldInfo({id:this.goldConfig.id,token:this.getToken});
      if(res.error_code != 0)  return this.$toast(res.message);
      this.successInfo = res.data
    },
    changeGlod() {
      this.$emit('getCData',false)
    },

    goldback() {
      let href = window.location.origin
      // this.$router.push({name:'goldGsBuyBack',query:{id:this.successInfo.id,gtype:this.successInfo.gtype,token:this.getToken}})
      if(href == 'https://tmall.cocogc.cn') {
        window.location.href = href+'/ticket/gold/buyBackGs?id='+this.successInfo.id+'&gtype='+this.successInfo.gtype+'&token='+this.getToken+'&fromType=cocogc'
      }else {
        window.location.href = 'https://t.xindaguijin.cn/ticket/gold/buyBackGs?id='+this.successInfo.id+'&gtype='+this.successInfo.gtype+'&token='+this.getToken+'&fromType=cocogc'
      }
    }
  },
  mounted() {
    this.getGoldInfo()
  }
}
</script>
<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.success-pageW {
  margin:auto;
  width: 100%;
  height: 100vh;
  position: fixed;
  top:0;
  overflow-y: scroll;
  background: #F5F5F5;
  z-index: 11;
  .success-page {
    height: 800px;
    .headerW {
      padding-top: 13px;
      height: 200px;
      color: #ffffff;
      text-align: right;
      background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
      box-sizing: border-box;
      .finish-text {
        padding-right: 16px;
        font-size: 16px;
        font-size: 600;
      }
      .finishW {
        margin-top: 40px;
        padding: 0 94px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        img {
          width: 76px;
          height: 76px;
        }
        div {
          p {
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 1px;
            &:first-child {
              font-size: 20px;
              font-weight: bold;
            }
            &:last-child {
              margin-top: 1px;
            }
          }
        }
      }
      .line {
        margin: 0 auto;
        margin-top: 18px;
        width: 359px;
        height: 10px;
        border-radius: 5px;
        background: rgba($color: #000000, $alpha: 0.2);
      }
    }
    .success-mainW {
      padding: 0 16px;
      .success-main {
        margin-top: -27px;
        padding-bottom: 16px;
        background: #ffffff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .success-info {
          padding: 0 16px;
          padding-top: 16px;
          li {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #444444;
            margin-top: 15px;
            &:first-child {
              margin-top: 0px;
            }
          }
          .line {
            margin-top: 20px;
            border-bottom: 1px dashed #EBEBEB;
          }
          .order-id {
            margin-top: 20px;
            font-size: 14px;
            color: rgba($color: #000000, $alpha: 0.2)
          }
        }
        .success-detail {
          margin-top: 30px;
          text-align: center;
          .code-title {
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            color: #444444;
          }
          .code-text {
            margin-top: 6px;
            font-size: 24px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: #D5A96E;
          }
          .code-icon {
            margin: 0 auto;
            margin-top: 8px;
            width: 150px;
            height: 150px;
          }
          .gold-weight {
            margin-top: 12px;
            font-size: 18px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: #444444;
          }
          .gold-info {
            margin-top: 32px;
            display: flex;
            align-items: center;
            padding-left: 60px;
            p {
              font-size: 14px;
              color: #D5A96E;
              display: flex;
              align-items: center;
              img {
                margin-right: 8px;
                display: inline-block;
                width: 22px;
                height: 22px;
              }
              span {
                display: inline-block;
                &::after {
                  content: '';
                  position: absolute;
                  left: 188px;
                  height: 18px;
                  width: 1px;
                  background: rgba($color: #B4B4B4, $alpha: 0.3);
                }
              }
            }
            .gold-hc {
              margin-left: 50px;
            }
          }
          .gold-yeyun {
            margin-top: 8px;
            font-size: 12px;
            color: rgba($color: #000000, $alpha: 0.2);
          }
        }
      }
    }
    .success-footerW {
      margin-top: 16px;
      padding: 0 16px;
      .footerBtn {
        display: flex;
        justify-content: space-between;
        button {
          width: 164px;
          height: 40px;
          font-size: 16px;
          border-radius: 5px;
          box-sizing: border-box;
          font-weight: bold;
        }
        .left {
          color: #D5A96E;
          border: 1px solid #D5A96E;
          background: #F5F5F5;
        }
        .right {
          color: #ffffff;
          border: none;
          background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
        }
      }
      .tips {
        margin-top: 24px;
        padding-bottom: 24px;
        text-align: center;
        font-size: 12px;
        color: #D5A96E;
        p {
          line-height: 18px;
        }
      }
    }
  }
}
.success-page-business {
    position: fixed;
    margin:auto;
    left:0;
    right:0;
    top:0;
    bottom:0;
    // padding: 24px;
    width: 288px;
    height: 438px;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 11;
    background-image: url('../../../../common/images/gold-hd/success-bg.png');
    background-size: 100% 100%;
    .order-infoW {
      padding-top: 102px;
      display: flex;
      align-items: center;
      .order-info-item {
        flex: 1;
        text-align: center;
        color: #ffffff;
        font-size: 12px;
        .num {
          font-size: 26px;
        }
        .unit {
          margin-left: 4px;
        }
      }
    }
    .check-record {
      margin: 0 auto;
      margin-top: 10px;
      width: 180px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      font-weight: 600;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      letter-spacing: 1px;
      .right-arrow {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-image: url('../../../../common/images/record-arrow.png');
        background-size: 100% 100%;
      }
    }
    .changes {
      margin: 0 auto;
      margin-top: 190px;
      width: 180px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      font-size: 16px;
      color:#ffffff;
      text-align: center;
      background: linear-gradient(270deg, #1ED688 0%, #0CC391 100%);
    }
  }
</style>
