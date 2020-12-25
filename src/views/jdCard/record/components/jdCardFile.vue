<template>
    <div class="agreeFixed" v-if="show">
        <div class="goback" @click="$emit('handle-show-file')">
          <i class="iconfont">&#xe61e;</i>
          <span class="header-title">使用帮助</span>
        </div>
        <div class="agreeContentW">
            <h1 class="title">兑换须知</h1>
            <div class="agreeContent">
              1.兑换京东E卡，兑换成功会以卡密方式发放，用户可通过在兑换记录中查看。京东E卡为不记名预付卡，卡密请妥善保管，一旦泄露造成卡密失效需自行承担。<br/>
              2.一经兑换成功后，不支持退款.<br/>
              3.京东E卡的使用规则和章程等，请前往京东官方商城进行查看“o.jd.com”.
            </div>
            <h1 class="title">使用方式</h1>
            <div class="agreeContent">
              1.登录京东首页（www.jd.com），选择您喜欢的商品加入购物车，并根据页面上的提示进行购物操作。注：京东E卡目前只能购买京东自营的商品（部分特殊商品除外），可以通过“京东自营”标志识别自营商品。<br/>
              2.在提交订单页面，点击“使用优惠/抵用”，选择“礼品卡”，输入您的京东E卡的卡密，点击绑定即可绑定到您的账户中。然后根据需要选择您使用的京东E卡，点击提交订单即可完成操作。
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },
    data: () => ({

    }),
    methods: {
        goBack() {

        }
    },
    mounted() {
        console.log(this.show)
    }

}
</script>

<style lang="scss" scoped>
.agreeFixed {
    position: fixed;
    top: 0;
    z-index: 10;
    background: #fff;
    height: 100%;
}

.goback {
    position: relative;
    height: 50px;
    line-height: 50px;
    margin-left: 15px;
    .iconfont {
      font-weight: bold;
    }
    .header-title {
      margin-left: 122px;
      font-size: 18px;
      color: #1A1A1A;
      font-weight: bold;
    }
}

.agreeContentW {
    position: relative;
    overflow: scroll;
    height: 100%;
    margin: 0 20px;
    .title {
      margin-bottom: 14px;
      font-size: 16px;
      color: #1A1A1A;
      font-weight: bold;
    }
    .agreeContent {
        font-size: 13px;
        line-height: 28px;
        padding-bottom: 30px;
        // text-indent: 2em;
        .indent {
          text-indent: 2em;
        }
        .text-bold {
          font-weight: bold;
        }
    }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .agreeFixed{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
