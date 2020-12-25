<template>
  <div class="success-pageW">
    <div class="success-page-dir">
      <div class="success-page-dir-topW">
        <p class="jdCard-num"><span>获得{{jdCardConfig.cardPrice}}元京东E卡</span><span class="num">×{{jdCardConfig.num}}</span></p>
        <p class="priceW"><span class="rmb">¥ </span><span class="price">{{jdCardConfig.cardPrice}}</span></p>
      </div>
      <div class="success-page-dir-bottomW">
        <div class="finish" @click="$router.push({name:'jdCardRecord'})">查看兑换记录</div>
        <div class="charge"  @click="$emit('get-close',false)">再兑一张</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions } from 'vuex';
export default {
  data:()=>({
    isNormalUser: true
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      jdCardConfig: 'jdCard/getConfig',
      userinfo: 'getUserinfo'
    }),
  },
  methods: {
  },
  created () {
    if(this.userinfo.vendorId == '3839c796c9574b05a80c87f0adfb1f21') {
      this.isNormalUser = false
    }
  },
  mounted() {
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
    width: 300px;
    height: 350px;
    background-image: url('../../../../common/images/jdCard/success.png');
    background-size: 100% 100%;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 11;
    .success-page-dir-topW {
      .jdCard-num {
        padding-top: 64px;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
        .num {
          margin-left: 12px;
        }
      }
      .priceW {
        margin-top: 55px;
        text-align: center;
        color: #ED6725;
        .rmb {
          font-size: 20px;
          font-weight: bold;
        }
        .price {
          font-size: 48px;
          font-family: DINPro-Bold;
        }
      }
    }

    .success-page-dir-bottomW {
      margin-top: 34px;
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
        background: linear-gradient(270deg, #FE3215 0%, #FF7434 100%);
      }
      .charge {
        margin-top: 8px;
        color: #FF7300;
        border: 1px solid #FF7300;
      }
    }
  }
}

</style>
