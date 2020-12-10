<template>
  <transition name="slideUp" mode="out-in">
    <ul class="info" v-if="show">
      <li class="header">
        <span class="title">费用明细</span>
        <span class="icon_close" @click="$emit('go-back')"></span>
      </li>
      <!-- 直充 -->
      <li class="item" v-if="account">
        <span class="label">充值账号</span>
        <span class="value">
          {{account}}
        </span>
      </li>

      <li class="item">
        <span class="label">售价</span>
        <span class="value">
          {{info.sellingPrice|toPrice}}
        </span>
      </li>
      <li class="item">
        <span class="label">服务费</span>
        <span class="value">
          {{info.service_fee|toPrice}}
        </span>
      </li>
      <li class="item">
        <span class="label">税费</span>
        <span class="value">
          {{info.tax_total|toPrice}}{{info.tax_total>0?'':'(免税)'}}
        </span>
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
    },
    account: {
      type: String,
      default: ''
    }
  },
  data: () => ({

  }),
  methods: {
    handlerShowCode() {
      this.$emit("send-sms")
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.info {
  position: fixed;
  z-index: 11;
  background: #fff;
  padding: 0 24px;
  padding-bottom: 40px;
  bottom: 54px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .header {
    line-height: 56px;
    text-align: center;
    font-size: 16px;
    color: #1A1A1A;
    position: relative;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #1A1A1A;
    }
    .icon_close {
      position: absolute;
      right: -8px;
      top: 16px;
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url('../../../../common/images/memberCard/icon_close.png');
      background-size: 100% 100%;
    }
    // i {
    //   position: absolute;
    //   right: 0;
    //   color: #999999;
    //   font-size: 12px;
    // }
  }
  // .price {
  //   padding: 40px 0 0 0;
  //   margin-bottom: 45px;
  //   font-size: 30px;
  //   color: #111010;
  //   font-weight: bold;
  //   text-align: center;
  //   position: relative;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   &::before {
  //     position: absolute;
  //     display: block;
  //     content: '';
  //     width: 100%;
  //     height: 1px;
  //     background: #DEDEDE;
  //     top: 0;
  //   }
  //   .logoPng {
  //     width: 27px;
  //     height: 27px;
  //     display: inline-block;
  //     background: url("../../../../common/images/logo.png") no-repeat;
  //     background-size: 100% 100%;
  //     margin-right: 5px;
  //   }
  // }
  .item {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    // padding: 0 10px 0 12px;
    font-weight: 400;
    color: #1A1A1A;
    font-size: 14px;

  }
  .itemLast {
    padding-bottom: 44px;
  }
  .footer {
    width: 100%;
    line-height: 44px;
    background: #30CE84;
    height: 44px;
    bottom: 0;
    position: fixed;
    color: #fff;
    font-size: 18px;
    text-align: center;
    left: 0;
    max-width: 384px;
  }
}
</style>
<style>
@media screen and (min-width: 600px) {
  .info {
    max-width: 384px;
    /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
