<template>
  <transition  enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="code" v-if="show" >
      <div class="main">
        <div class="btn-close" @click="$emit('handler-show-info')"></div>
        <div class="header">
          <!-- <i class="cubeic-back" @click="$emit('handler-show-info')"></i> -->
          <span class="title" v-if="userinfo.payValidType === 1">请输入支付密码</span>
          <span class="title" v-else>请输入短信验证码</span>
        </div>
        <h1 v-if="userinfo.payValidType !== 1">验证码已发送至手机 {{userinfo.userName | formatPhone}}</h1>

        <div v-if="userinfo.payValidType === 1" class="pay-numberW">
          <Code v-model="code" ></Code>
          <div class="fail-text">{{failText}}</div>
        </div>
        <div v-if="userinfo.payValidType !== 1">
          <div class="inputW">
            <input class="input-code" type="tel" maxlength="4" autofocus="autofocus" @click="inputClick($event)" placeholder="请输入短信验证码" v-model.trim="code">
            <button class="sms-code" :class="[time>0?'time-gray':'']" :disabled="btnDisabled" @click="sendCode">{{time>0 ? time + '秒后重发': '重新获取'}}</button>
            <div class="fail-text">{{failText}}</div>
          </div>

        </div>


        <button class="confirm" @click="validateCode" :disabled="btnConfirm" :class="[{'gray-confirm': btnConfirm==true},{'pay-confirm': userinfo.payValidType === 1}]">完成</button>
        <div v-if="userinfo.payValidType === 1" class="forget-password">
          <a @click="forget">忘记密码？</a>
          <!-- <a :href="token?(process+'/#/payPassword'+'?token=' + token):(process+'/#/payPassword')">忘记密码？</a> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {sendSmsCode} from 'api'
import Code from 'components/Code'
import { setInterval } from 'timers';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    failText: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    btnDisabled: false,
    time: 0,
    code:'',
    process:process.env.VUE_APP_BASE_HOME_URL,
    timeout: null,
    btnConfirm: true
  }),
  components: {
    Code,
  },
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo',
      token: 'getToken',
    }),
  },
  watch: {
    show(val){
      if (val) {
        if (this.userinfo.payValidType !== 1) {
          this.sendCode()
        }
      }else{
        this.code='';
      }
    },
    code(val) {
      if (val) {
        if(val.length==4 && this.userinfo.payValidType !== 1) {
          this.btnConfirm = false
        } else if(val.length==6 && this.userinfo.payValidType === 1){
          this.btnConfirm = false
        }else {
          this.btnConfirm = true
        }
      }else{
        this.btnConfirm = true
      }
    }
  },
  methods: {
    validateCode() {
      console.log(this.code)
      this.$emit('submit-order',this.code)
    },
    async sendCode(){
        let res = await sendSmsCode({token: this.token})
        if (res.error_code) return this.$toast(res.message)
        this.time = 120
        this.timeout = setInterval(() => {
          if(this.time == 0) {
            this.btnDisabled = false
            clearInterval(this.timeout._id)
          }else {
            this.time--
            this.btnDisabled = true
          }
        }, 1000)
    },
    inputClick(e) {
      e.target.focus();
    },
    forget() {
      this.$emit('forget')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.code{
  position: fixed;
  background: #fff;
  left: 50%;
  top: 50%;
  width: 288px;
  // height: 224px;
  height: auto;
  box-sizing: border-box;
  border-radius: 10px;
  margin-left: -144px;
  margin-top: -107px;
  z-index: 11;
  .main {
    position: relative;
    padding: 24px;
    .btn-close {
      position: absolute;
      top: 5px;
      right: 10px;
      width: 24px;
      height: 24px;
      background-image: url('../common/images/close.png');
      background-size: 100% 100%;
    }
    .header{
      position: relative;
      text-align: center;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #444444;
        font-family: PingFangSC-Semibold;
      }
    }
    h1{
      margin-top: 12px;
      padding: 10px 0;
      font-size: 14px;
      color: #444444;

    }
    .inputW {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      border-bottom: 1px solid #DEDEDE;
      .input-code{
        height: 18px;
        width: 113px;
        font-size: 14px;
        &::placeholder {
          color: rgba($color: #444444, $alpha: 0.2);
        }
      }
      .sms-code{
        color: $theme;
        font-size: 15px;
        border: none;
        background-color: transparent;
        padding: 0;
      }
      .time-gray {
        color: rgba($color: #000000, $alpha: 0.4);
      }
      .fail-text{
        position:absolute;
        left: 0;
        bottom: -20px;
        color: #FF6600;
        font-size: 10px;
      }
    }
    .pay-numberW {
      margin-top: 26px;
      margin-bottom: 50px;;
      position: relative;
      .fail-text{
        position: absolute;
        left: 0;
        top: 50px;
        color: #FF6600;
        font-size: 14px;
      }

    }
    .confirm{
      margin: 0 auto;
      margin-top: 37px;
      width: 240px;
      height: 40px;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
      background: $theme;
      color: #fff;
      border-radius: 5px; /*no*/
      letter-spacing: 1px;
      border: none;
    }
    .pay-confirm {
      margin-top: 0px;
    }
    .gray-confirm {
      background: #cccccc;
    }
    .forget-password {
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
        a {
          color: rgba($color: #000000, $alpha: 0.4);
        }
      }
  }


}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .code{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
    margin-left: 0;
  }
}
</style>
