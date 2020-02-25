<template>
  <div id="signHelpS">
    <img src="~common/images/chenggong.png" alt="wu" class="img-success" />
    <p class="sign-success-word">恭喜您签约成功！</p>
    <button class="sign-text" v-if="showTimeout" @click="goPersonal()">返回个人中心({{time}})</button>
  </div>
</template>
<script>
export default {
  data: () => ({
    showTimeout: false,
    time: 5
  }),
  components: {
  },
  created() {
    this.getTimeout()
  },
  methods: {
    getTimeout() {
      try {
        let _this = this
        wx.miniProgram.getEnv(function(res) {
            _this.showTimeout = true
            if (res.miniprogram) {
                // 小程序环境
              _this.timeout = setInterval(() => {
                if (_this.time > 0) {
                  console.log(_this.time)
                  --_this.time
                } else {
                  _this.goPersonal()
                }
              }, 1000)
            }else {
                //非小程序环境
              console.log('非小程序环境')                     
            }
        })
      } catch (e) {
        console.log(e)
      }
    },
    goPersonal () {
      console.log('end')
      clearInterval(this.timeout)
      wx.miniProgram.reLaunch({
        url: '/pages/personal/index'
      })
    }
  }
};
</script>
<style lang="scss" scoped>
#signHelpS {
  min-height: 100%;
  background: #fff;
  .img-success {
    width: 68px;
    height: 68px;
    margin: 0 auto;
    padding-top: 91px;
  }
  .sign-success-word {
    font-family: PingFang-SC-Medium;
    color: #4e4e4e;
    text-align: center;
    font-size: 0.56rem;
    font-weight: bold;
    margin-top: 27px;
  }
  .sign-text{
    background-color: #30ce84;
    color: #fff;
    border: none;
    border-radius: 5px;
    display: block;
    margin: 40px auto 0;
    width: 166px;
    height: 50px;
    font-size: 18px;
  }
}
</style>
