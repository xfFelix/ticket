<template>
  <div class="success-pageW">
    <div class="success-infoW">
      <img src="@/common/images/gold/success-icon.png" alt="">
      <p class="success-title">回购提交成功</p>
      <p class="success-subtitle" v-if="selectedType==0">预计2小时内到账</p>
      <p class="success-subtitle" v-else>预计半个小时内到账</p>
      <p class="success-thrtitle">(处理时间：09:00-23:00，其他次日到账)</p>
    </div>
    <div class="success-list">
      <li class="item">
        <p>回购方式</p>
        <p v-if="selectedType==0">银行卡</p>
        <p v-else>支付宝</p>
      </li>
      <li class="item">
        <p>实际到账金额</p>
        <p>{{successPrice|toPrice}}</p>
      </li>
    </div>
    <div class="success-btnW" @click="closePage">完成</div>
  </div>
</template>
<script>
import {mapGetters, mapActions } from 'vuex';
export default {
  props: {
    selectedType: {
      type: Number,
      default: 0
    },
    successPrice : {
      type: Number,
      default: 0
    }
  },
  data:()=>({
  }),
  methods: {
    closePage() {
      this.$emit("handle-success-page",false)
    }
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      phoneConfig: 'phone/getConfig',
      userinfo: 'getUserinfo'
    }),
  },
}
</script>
<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.success-pageW {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 99;
  .success-infoW {
    text-align: center;
    padding-top: 88px;
    img {
      margin: 0 auto;
      width: 50px;
      height: 50px;
    }
    .success-title {
      margin-top: 10px;
      font-family: PingFangSC-Semibold;
      color: #444444;
      font-weight: 600;
      font-size: 18px;
    }
    .success-subtitle {
      margin-top: 12px;
      color: rgba(0,0,0,0.4);
      font-size: 14px;
    }
    .success-thrtitle {
      margin-top: 2px;
      color: rgba(0,0,0,0.4);
      font-size: 12px;
    }
  }
  .success-list {
    padding: 0 32px;
    margin-top: 24px;
    li {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 46px;
      border-bottom: 1px solid #DEDEDE;
      p {
        color: #444444;
        font-size: 14px;
      }

    }
  }
  .success-btnW {
    margin: 0 auto;
    margin-top: 68px;
    width: 311px;
    height: 46px;
    line-height: 46px;
    border-radius: 23px;
    background-color: #373C48;
    color: #ffffff;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    text-align: center;
  }
}

</style>
