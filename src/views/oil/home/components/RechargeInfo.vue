<template>
  <transition name="slideUp" mode="out-in">
    <div class="info-wrapper" v-if="show">
      <ul class="info">
        <li class="header">
          <i class="cubeic-back" @click="$emit('go-back')"></i>
          <span class="title">确认兑换</span>
        </li>
        <li class="price">
           <span class="logoPng"></span>
          {{data.total|toPrice}}
        </li>
        <li class="item">
          <span class="label">产品名称</span>
          <span class="value">{{data.productName}}</span>
        </li>
        <li class="item" v-if="config.cardNum">
          <span class="label">充值账号</span>
          <span class="value">{{config.cardNum}}</span>
        </li>
        <!-- <li class="item">
          <span class="label">售价</span>
          <span class="value">{{data.faceValue}}</span>
        </li> -->
        <li class="item">
          <span class="label">服务费</span>
          <span class="value">{{data.service_fee | toPrice}}</span>
        </li>
        <li class="item">
          <span class="label">税费</span>
          <span class="value">{{data.tax_total | toPrice}}</span>
        </li>
        <li class="item" v-if="data.preferentialFee">
          <span class="label">优惠费用</span>
          <span class="value" style="color:#FF6600">-{{data.preferentialFee | toPrice}}</span>
        </li>
        <li class="item">
          <span class="label">应付合计</span>
          <span class="value">{{data.total | toPrice}}</span>
        </li>
      </ul>
      <div class="footer">
        <button class="confirm" @click="handlerShowCode" :disabled="confirmBtn">确认</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import {getCostInfo} from 'api';
import {tools_uri} from 'common/tools';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    data: {},
    confirmBtn: false
  }),
  computed: {
    ...mapGetters({
      config: 'oil/getConfig',
      getToken: 'getToken',
      typeList: 'oil/getTypeList'
    })
  },
  watch: {
    show(val) {
      if (val) {
        this.getCostInfo()
      }
    }
  },
  methods: {
    async getCostInfo() {
      const {faceValue, type, token, rechargeType} = this.config
      let res = await getCostInfo({faceValue, type, token: this.getToken, rechargeType})
      if (res.code !== '1' && res.code !== '6' && res.code !== '4') return this.$toast(res.message)
      this.data = res.data[0]
      if (res.code === '6') {
        this.$dialog({content: '请先实名认证'}, () => {
          this.$router.push({path:'/realName?back=/oil'})
        })
        return false
      } else if (res.code === '4') {
        this.confirmBtn = true
        return this.$toast(res.message)
      }
    },
    typeListFilter(val) {
      if (val) {
        const filter = this.typeList.reduce((previous, current) => {
          previous[current.value] = current.label
          return previous
        }, {});
        return filter[val]
      }
    },
    handlerShowCode() {
      this.$emit('handler-show-code')
    }
  }
}
</script>
<style lang="scss" scoped>
.info-wrapper{
  position: fixed;
  z-index: 11;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  .info{
    padding: 0 18px 0;
    color: #8B8B8B;
    font-size: 13px;
    .header{
      padding: 20px 0 21px 0;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #111010;
      position: relative;
      i{
        position: absolute;
        left: 0;
      }
    }
    .price{
      padding: 40px 0 0 0;
      margin-bottom: 45px;
      font-size: 30px;
      color: #111010;
      font-weight: bold;
      text-align: center;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &::before{
        position: absolute;
        display: block;
        content: '';
        width: 100%;
        height: 1px;
        background: #d3d3d3;
        top: 0;
      }
        .logoPng {
        width: 27px;
        height: 27px;
        display: inline-block;
        background: url("../../../../common/images/logo.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 5px;
      }
    }
    .item{
      margin-top: 35px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px 0 12px;
      font-weight: 400;
      .label{
        color: #999;
      }
      .value{
        color: #4a4a4a;
      }
    }
  }
  .footer{
    margin-top: 36px;
    .confirm{
      border: none;
      background: #30CE84;
      width: 100%;
      padding: 11px 0;
      color: #fff;
      font-size: 15px;
      font-weight: 400;
    }
  }
}
</style>
<style>
@media screen and (min-width: 600px){
  .info-wrapper{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
