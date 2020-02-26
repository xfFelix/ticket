<template>
  <div id="signHelpS">
    <img :src="require(`common/images/${isSuccess ? 'chenggong' : 'fail'}.png`)" alt="wu" class="img-success" />
    <p class="sign-success-word">{{isSuccess ? '恭喜您签约成功！' : '签约失败'}}</p>
    <button class="sign-text" v-if="showTimeout" @click="goPersonal()">返回个人中心({{time}})</button>
  </div>
</template>
<script>
import { getSignStatus } from '@/api'
import { getArgs } from '@/util/common'
export default {
  data: () => ({
    showTimeout: false,
    time: 5,
    isSuccess: true
  }),
  components: {
  },
  created() {
    console.log(window.location)
    this.getStatus()
    this.getTimeout()
  },
  methods: {
    async getStatus () {
      try {
        const { accountId } = getArgs()
        const { data } = await getSignStatus({accountId})
        // 0-草稿
        // 1-签署中
        // 2-完成
        // 3-撤销
        // 4-终止（签署流程设置了文件有效截至日期，到期后触发）
        // 5-过期（签署截至日志到期后触发）
        // 7-拒签
        if (data === 2) {
          this.isSuccess = true
        } else {
          this.isSuccess = false
        }
      } catch (e) {
        this.$toast(e)
      }
    },
    getTimeout() {
      try {
        let _this = this
        wx.miniProgram.getEnv(function(res) {
          if (res.miniprogram) {
              _this.showTimeout = true
                // 小程序环境
              _this.timeout = setInterval(() => {
                if (_this.time > 0) {
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
    white-space: nowrap;
  }
}
</style>
