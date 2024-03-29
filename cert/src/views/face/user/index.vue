<template>
  <div class="user-wrapper">
    <Header :show-back="false">{{$route.meta.title}}</Header>
    <div class="content">
      <div class="icon-wrapper">
        <span class="iconfont icon-user"><i class="iconfont icon-success"></i></span>
        <h1>真实身份认证</h1>
      </div>
      <div class="input-item">
        <div class="pre">真实姓名</div>
        <input type="text" placeholder="请输入姓名" v-model.trim="name">
      </div>
      <div class="input-item">
        <div class="pre">证件号码</div>
        <input type="text" placeholder="请输入证件号码" v-model.trim="idcard">
      </div>
      <div class="input-item">
        <div class="pre">手机号</div>
        <input type="tel" placeholder="请输入联系方式" pattern="[0-9]*" :maxlength="11" v-model.trim="mobile">
      </div>
      <div class="input-item">
        <div class="pre">图形验证码</div>
        <input type="text" placeholder="请输入图形验证码" :maxlength="4" v-model.trim="verify">
        <img :src="validateImgSrc" class="img_captcha" @click="validateImgClick()">
      </div>
      <div class="input-item">
        <div class="pre">手机验证码</div>
        <input type="tel" placeholder="请输入手机验证码" pattern="[0-9]*" :maxlength="4" v-model.trim="code">
        <button @click.prevent="sendCode" :disabled="codeFlag" class="bnt" type="button">{{codeText}}</button>
      </div>
      <button class="btn-next" @click="validate">下一步</button>
      <div class="hint">
        <h2>温馨提示：</h2>
        <p>您本次众包合同电子签约一共需要分三步完成：1.身份验证通过  2. 实人刷脸认证通过   3.电子合同签约完成。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { getArgs, IsMobile, isEmpty } from '@/util/common'
import Loading from '@/util/loading'
export default {
  data: () => ({
    name: '',
    idcard: '',
    mobile: '',
    verify: '',
    code: '',
    type: '',
    uid: '',
    url: '',
    jumpPage: '',
    validateImgSrc: '',
    codeText: "发送验证码",
    codeFlag: false,
  }),
  created () {
    const { type, uid, url, jumpPage } = getArgs()
    console.log(jumpPage)
    console.log(uid)
    this.type= type ? type : '1'
    this.uid = uid
    this.url = url
    this.jumpPage = jumpPage
    this.validateImgClick()
  },
  methods: {
    ...mapActions({
      setConfig: 'face/setConfig'
    }),
    validate() {
      if (!this.name) return this.$toast('请输入姓名')
      if (!this.idcard) return this.$toast('请输入证件号码')
      if (!IsMobile(this.mobile)) return this.$toast("请输入正确的手机号");
      if (isEmpty(this.verify)) return this.$toast("请输入图形验证码");
      if (isEmpty(this.code)) return this.$toast("请输入手机验证码")
      this.goNext()
    },
    async goNext() {
      let loading = new Loading('身份验证中...')
      try {
        loading.show()
        const { checkInfoByFace } = await import('api')
        const { mobile, idcard, name, type, uid, url, jumpPage } = this
        const { data, code, msg } = await checkInfoByFace({idNo: idcard, name, type, uid, url, jumpPage, mobile, code: this.code})
        if (+code === 2222) {
          loading.hide()
          this.setConfig({name: this.name, idcard: this.idcard, accountId: data})
          return this.$router.push({ path: 'success', query: { result: 1, accountId: data}})
        }
        this.setConfig({name: this.name, idcard: this.idcard, accountId: data.accountId})
        loading.hide()
        this.$router.push('select')
      } catch (e) {
        this.$toast(e)
      }
    },
    validateImgClick(){
      this.validateImgSrc = process.env.VUE_APP_CONTRACT_URL + '/contract/captcha?' + (new Date());
    },
    async sendCode() {
      if (!IsMobile(this.mobile)) return this.$toast("请输入正确的手机号");
      if (isEmpty(this.verify)) return this.$toast("请输入图形验证码");
      try{
        const { contractSms } = await import(/* webpackPrefetch: true */ "api");
        let data = await contractSms({ mobile: this.mobile,code:this.verify});
      }catch (e) {
        this.validateImgClick();
        this.verify = '';
        return this.$toast(e);
      }
      this.codeText = "120s 重新获取";
      let _this = this;
      let timeInit = 120;
      let countDown = window.setInterval(function() {
        let i = 1;
        timeInit = timeInit - i;
        if (timeInit > 0) {
          _this.codeText = timeInit + "s 重新获取";
          _this.codeFlag = true;
        } else {
          _this.codeText = "重新获取";
          _this.codeFlag = false;
          window.clearInterval(countDown);
        }
      }, 1000);
    },
  }
}
</script>
<style scoped lang="scss">
.user-wrapper{
  font-family: PingFang SC;
  .content{
    padding: 0 15px;
    .icon-wrapper{
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-user{
        font-size: 50px;
        color: #30CE84;
        position: relative;
        .icon-success{
          position: absolute;
          bottom: 0;
          right: -10px;
          color: #FEB009;
          background: #fff;
          border-radius: 50%;
          font-size: 20px;
        }
      }
      h1{
        font-size: 15px;
        color: #333333;
        font-weight: bold;
        margin-top: 5px;
      }
    }
    .input-item{
      display: flex;
      height: 60px;
      align-items: center;
      border-bottom: 1px solid rgba(246,246,246,1);
      font-size: 15px;
      position: relative;
      .pre{
        flex: 0 0 100px;
        color: #666666;
        font-weight: bold;
      }
      input{
        flex: 1;
        color: #333333;
        height: 100%;
        &::placeholder{
          color: #999;
        }
      }
      .img_captcha{
        position: absolute;
        right: 0;
        width: 90px;
        height: 40px;
      }
      .bnt{
        text-align: center;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #30ce84;
        color: #30ce84;
        background: #fff;
        position: absolute;
        right: 0;
      }
    }
    .btn-next{
      height:44px;
      font-size: 15px;
      background:rgba(48,206,132,1);
      box-shadow:0px 1px 7px 0px rgba(48,206,132,0.68);
      border-radius:5px;
      border: none;
      width: 100%;
      color: #fff;
      margin-top: 20px;
      letter-spacing: 3px;
    }
    .hint{
      margin-top: 28px;
      h2{
        font-size:13px;
        font-weight:500;
        color:rgba(102,102,102,1);
      }
      p{
        margin-top: 11px;
        font-size:12px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:15px;
      }
    }
  }
}
</style>
