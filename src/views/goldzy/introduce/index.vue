<template>
  <div class="introduce">
    <div class="header-bg">
      <Header class="navbar" :show-more="!yingqiudiShow" >一分钟了解黄金兑换及回购
        <i slot="icon" class="icon-gengduo-black"></i>
      </Header>
      <div class="header-title">黄金兑换</div>
      <p class="header-subtitle">· 是提供用户兑换实物黄金和回购变现的服务 ·</p>
    </div>
    <div class="mainW">
      <div class="gold-cardW">
        <img src="@/common/images/gold-hd/gold-card.png" alt="">
      </div>
      <div class="gold-btn">黄金兑换及回购使用指南</div>
      <div class="imgW">
        <img src="@/common/images/gold-hd/gold-introduce-1.png" alt="">
        <img src="@/common/images/gold-hd/gold-introduce-2.png" alt="">
        <img src="@/common/images/gold-hd/gold-introduce-3.png" alt="">
        <!-- <button class="img-service" @click="contact">前往提货</button> -->
      </div>
      <div class="footerW">
        <p>若您还有其他疑问,可咨询在线客服</p>
        <button class="service" @click="contact">联系客服</button>
      </div>
    </div>
  </div>
</template>
<script>
import { setPayType ,IOSFocus ,vipCustom} from '@/mixins';
export default {
  mixins: [setPayType, IOSFocus,vipCustom],
  components: {
    Header: () => import('@/components/Header'),
  },
  methods: {
    contact() {
      window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
    }
  }
}
</script>
<style lang="scss" scoped>
.introduce {
  width: 100%;
  height: 100%;
  .header-bg {
    width: 100%;
    height: 222px;
    background-image: url('../../../common/images/gold-hd/intro-bg.png');
    background-size: 100% 100%;
    z-index: 99;
    .navbar{
      background: transparent;
      // position: fixed;
      width: 100%;
      .icon-gengduo-black {
        position: absolute;
        top: 9px;
        right: 16px;
        width: 24px;
        height: 24px;
        background-image: url('../../../common/images/header-more.png') !important;
        background-size: 100% 100%;
      }
    }
    .header-title {
      padding-top: 20px;
      text-align: center;
      font-size: 30px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #444444;
    }
    .header-subtitle {
      margin-top: 10px;
      font-size: 14px;
      color: #444444;
      text-align: center;
    }
  }
  .mainW {
    .gold-cardW {
      margin: 0 auto;
      margin-top: -64px;
      width: 343px;
      height: 198px;
    }
    .gold-btn {
      margin: 0 auto;
      margin-top: 32px;
      margin-bottom: 24px;
      width: 290px;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      font-weight: 500;
      background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
      border-radius: 25px;
    }
    .imgW {
      position: relative;
      .img-service {
        position: absolute;
        left: 50%;
        bottom: 495px;
        margin-left: -90px;
      }
    }
    .footerW {
      text-align: center;
      p {
        font-size: 14px;
        color: #444444;
      }
      .service {
        margin-top: 10px;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
<style>
button {
  width: 180px;
  height: 34px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  background: #07C160;
  border-radius: 5px;
  border: none;
}
@media screen and (min-width: 600px) {
  .navbar{
    max-width: 384px; /*no*/
  }
}
</style>
