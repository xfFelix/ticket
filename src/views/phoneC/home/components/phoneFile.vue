<template>
    <div class="agreeFixed" v-if="show">
        <div class="iconfont goback" @click="$emit('handle-phonefile',false)">&#xe61e;<span>充值卡使用流程</span></div>
        <div class="goldCompanyW">
          <img src="@/common/images/phone/1.png" alt="">
          <img src="@/common/images/phone/2.png" alt="">
          <img src="@/common/images/phone/3.png" alt="">
          <img src="@/common/images/phone/4.png" alt="">
          <img src="@/common/images/phone/5.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({

    }),
    methods: {
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
    height: 95%;
    width: 375px;
}

.goback {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    color: #fff;
    background:#1A63FB;
    span {
      margin-left: 90px;
    }
}

.goldCompanyW {
    position: relative;
    overflow: scroll;
    height: 100%;
    padding-bottom: 100px;
    img {
      width: 375px;
      height: auto;
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
