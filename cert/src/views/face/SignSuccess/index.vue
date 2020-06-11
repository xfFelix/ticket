<template>
  <div class="success-wrapper">
    <Header :show-back="false">{{$route.meta.title}}</Header>
    <div class="img-wrapper">
      <img :src="require(`@/common/images/${showSuccess ? 'chenggong': 'fail'}.png`)" alt=" ">
    </div>
    <p class="title">{{showSuccess ? '恭喜您，已经签约成功！' : '签约失败'}}</p>
  </div>
</template>
<script>
import {getArgs} from '@/util/common'
import {getSignSuccessByFace} from '@/api'
export default {
  data: () => ({
    accountId: '',
    showSuccess: false
  }),
  created() {
    const { accountId } = getArgs()
    this.accountId = accountId
    this.getInfo()
  },
  methods: {
    async getInfo() {
      try {
        const { data } = await getSignSuccessByFace({accountId: this.accountId})
        if (data === 2) {
          this.showSuccess = true
        } else {
          this.showSuccess = false
        }
      } catch (e) {
        this.$toast(e);
      }
    }
  }
}
</script>
<style scoped lang="scss">
.success-wrapper{
  font-family:PingFang SC;
  .img-wrapper{
    img{
      display: block;
      width: 68px;
      height: 68px;
      border: none;
      margin: 91px auto 0;
    }
  }
  .title{
    margin-top: 30px;
    font-size:21px;
    font-weight:bold;
    color:rgba(78,78,78,1);
    text-align: center;
  }
}
</style>
