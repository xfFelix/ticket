<template>
  <div class="sign-helper">
    <form ref="advForm">
      <person-info @person-data="personInfoF" :getPersonInfoC.sync="getPersonInfo" :gainPhotoInfo.sync="photoInfo"></person-info>
      <!-- <div class="agreement">
        <cube-checkbox class="with-click" v-model="checked" shape="square">我已阅读并同意</cube-checkbox>
        <span class="file" @click="$router.push({name:'signHelpFile'})">《数字经济合作伙伴协议》</span>
      </div> -->
    </form>
    <div class="next-step" @click="commitInfo">确认提交</div>
    <div class="next-step-height"></div>
  </div>
</template>
<script>
import { IdentityCodeValid, isEmpty, IsMobile } from "util/common"
import { signInfoByInfo } from 'api'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    checked: true,
    getPersonInfo:false,
    dataInfo:{},
    photoInfo:{}
  }),
  computed: {
    ...mapGetters({
      config: 'sign_config'
    })
  },
  methods: {
    // 点击确定按钮后不能直接拿到子组件的值，所以得在拿到值后再调接口
    commitInfo() {
      this.getPersonInfo = true;
    },
    //判断是否为空
    judgeEmpty(){
      if (isEmpty(this.dataInfo.name)) return this.$toast("请填写您的姓名");
      if (!IdentityCodeValid(this.dataInfo.idNum)) return this.$toast("请填写您的有效身份证号码");
      if (isEmpty(this.dataInfo.bankCard)) return this.$toast("请填写您的银行卡号");
      if (isEmpty(this.dataInfo.mobile)) return this.$toast("请填写您的手机号");
      if (!IsMobile(this.dataInfo.mobile)) return this.$toast("请输入正确的手机号");
      if (isEmpty(this.dataInfo.code)) return this.$toast("请输入验证码");
      // if (this.checked==false) return  this.$toast("请阅读并同意<p>《在线签约用户协议》</p>");
      this.uploadFile();
    },
    //上传文件
    async uploadFile(){
      const toast = this.$createToast({mask:true,time:0, txt: '正在加载合同，进入签署电子合同中...'});
      toast.show();
      try{
        let data = await signInfoByInfo({
          name:this.dataInfo.name,
          idCard:this.dataInfo.idNum,
          mobile:this.dataInfo.mobile,
          code:this.dataInfo.code,
          bankCardNum:this.dataInfo.bankCard,
          redirect_url: this.dataInfo.redirect_url
        })
        window.location.href = data.data.shortUrl
        toast.hide();
      } catch (e) {
        toast.hide();
        this.$toast(e, '', 2000);
      }

    },
    //拿到子组件的值，开始调接口
    personInfoF(val){
      this.dataInfo=val;
      this.judgeEmpty();
    },
  },
  components: {
    personInfo: () => import("./components/personInfo"),
  }
};
</script>
<style lang="scss" scoped>
.sign-helper {
  min-height: 100%;
  .next-step {
    width: 345px;
    background: #30ce84;
    border-radius: 5px;
    font-size: 15px;
    color: #fff;
    line-height: 44px;
    text-align: center;
    margin: 20px auto;
  }
  .next-step-height{
    height:50px;
  }
  .agreement {
    display: flex;
    align-items: center;
    .cube-checkbox {
      padding: 0 0 0 20px;
    }
    .file {
      color: #30ce84;
      margin-top: -2px;
    }
  }
}
</style>
