<template>
  <div class="success-pageW">
    <div v-if="phoneConfig.type===0" class="success-page-dir">
      <div class="success-page-dir-topW">
        <div class="left">
          <p class="tick">
            <img class="tick-text" src="@/common/images/phone/tick.png" />
          </p>

          <span class="line-color"></span>
          <span class="line"></span>
          <span class="ellipsis"></span>
        </div>
        <div class="right">
          <p class="commit">已提交，待充值</p>
          <p class="priceW"><span class="price">{{phoneConfig.dirPrice}}元</span><span>(充值金额)</span></p>
          <p class="gray">消耗积分{{phoneConfig.phoneTaxInfoTotal}}</p>
          <p class="success">充值成功</p>
        </div>
      </div>
      <p class="tips">预计24小时内成功(已实际到账为准)</p>
      <div class="success-page-dir-bottomW">
        <div class="finish" @click="$router.push({name:'phoneCRecord',query:{cardId:0}})">完成</div>
        <div class="charge"  @click="$emit('get-close',false)">再充值一笔</div>
      </div>
    </div>
    <div class="success-page-card" v-if="phoneConfig.type===1">
      <div class="icon-wrapper">
        <img src="@/common/images/phone/success-icon.png" alt="">
      </div>
      <p class="success-title">兑换成功</p>
      <div class="success-info">
        <p class="one-bottom-px">
          <span>充值卡面额</span>
          <span class="num">{{phoneConfig.cardPrice}}元</span>
        </p>
        <p>
          <span>消耗积分</span>
          <span class="num">{{phoneConfig.phoneTaxInfoTotal}}</span>
        </p>
      </div>
      <div class="check-record" @click="$router.push({name:'phoneCRecord',query:{cardId:1}})">查看兑换记录</div>
      <div class="changes" @click="changeCard">前往使用充值、转卖 ></div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions } from 'vuex';
export default {
  props: {
    getData: {
      type: Object
    },
    haihangUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      phoneConfig: 'phone/getConfig',
      userinfo: 'getUserinfo'
    }),
  },
  methods: {
    changeCard() {
      window.location.href = this.haihangUrl
    }
  },
  mounted() {
    // console.log(this.getData)
  }
}
</script>
<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.success-pageW {
  .success-page-dir {
    position: fixed;
    margin:auto;
    left:0;
    right:0;
    top:0;
    bottom:0;
    padding: 25px 18px 0px 18px;
    width: 288px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 11;
    .success-page-dir-topW {
      display: flex;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 21px;
        span{
          display: block;
        }
        .tick {
          position: relative;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          color: #ffffff;
          border-radius: 50%;
          background: $theme;
          // background: transparent;
          // border: 1px solid $theme;
          box-sizing: border-box;

          .tick-text {
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            width: 24px;
            height: 24px;
            background-size: 100% 100%;
          }
        }

        .line-color {
          width: 2px;
          height: 34px;
          background: $theme;
        }
        .line {
          width: 2px;
          height: 30px;
          background: rgba($color: #000000, $alpha: 0.1)
        }
        .ellipsis {
          width: 24px;
          height: 24px;
          background-image: url('../../../../common/images/phone/ellipsis.png');
          background-size: 100% 100%;
        }
      }
      .right {
        padding-top: 3px;
        margin-left: 10px;
        .commit {
          color: $theme;
          font-size: 18px;
          font-family: PingFangSC-Semibold;
        }
        .priceW {
          margin-top: 3px;
          color: #444444;
          span {
            font-size: 12px;
            font-weight: 600;
          }
          .price {
            font-size: 14px;
            font-weight: 600;
          }
        }
        .gray {
          // margin-top: 2px;
          color: rgba($color: #000000, $alpha: 0.4);
          font-size: 14px;
        }
        .success {
          margin-top: 21px;
          font-size: 18px;
          color: #444444;
          font-family: PingFangSC-Semibold;
        }
      }
    }
    .tips {
      // margin-top: -2px;
      margin-left: 30px;
      color: rgba($color: #000000, $alpha: 0.4);
      font-size: 14px;
    }
    .success-page-dir-bottomW {
      margin-top: 30px;
      div {
        margin: 0 auto;
        width: 200px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        border-radius: 5px;
        box-sizing: border-box;
      }
      .finish {
        color: #ffffff;
        background-color: $theme;
      }
      .charge {
        margin-top: 10px;
        color: $theme;
        border: 1px solid $theme;
      }
    }
  }
  .success-page-card {
    position: fixed;
    margin:auto;
    left:0;
    right:0;
    top:0;
    bottom:0;
    padding: 24px;
    width: 288px;
    height: 312px;
    background-color: #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 11;
    .icon-wrapper {
      margin: 0 auto;
      width: 90px;
      height: 90px;
      margin-top: -62px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .success-title {
      margin-top: 2px;
      font-size: 18px;
      color: $theme;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      letter-spacing: 1px;
    }
    .success-info {
      margin: 24px 0 30px 0px;
      padding: 0 14px;
      width: 240px;
      height: 74px;
      box-sizing: border-box;
      border: 1px solid #DEDEDE;
      border-radius: 5px;
      background-color: rgba($color: #B4B4B4, $alpha: 0.1);
      p {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        color: rgba($color: #000000, $alpha: 0.4);
        font-size: 14px;
        .num {
          color: #444444;
          font-weight: 600;
        }
      }
    }
    .check-record {
      margin: 0 auto;
      margin-top: 8px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      font-weight: 600;
      background: $theme;
      letter-spacing: 1px;
    }
    .changes {
      margin: 0 auto;
      margin-top: 8px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      font-size: 16px;
      color:$theme;
      text-align: center;
      border: 1px solid $theme;
      box-sizing: border-box;
    }
  }
}

</style>
