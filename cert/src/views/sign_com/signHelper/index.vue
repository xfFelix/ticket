<template>
  <div class="sign-helper">
    <form ref="advForm">
      <upload-img @front-file="frontFiles"  @back-file="backFiles"></upload-img>
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
import { IdentityCodeValid,isEmpty,IsMobile } from "util/common";
import { checkId,signInfoByCom ,getInfo} from 'api'
import axios from 'axios'
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    checked: true,
    getPersonInfo:false,
    dataInfo:{},
    frontObj:{},
    backObj:{},
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
      if (Object.keys(this.frontObj).length==0) return this.$toast("请上传您的身份证正面照");
      if (Object.keys(this.backObj).length==0) return this.$toast("请上传您的身份证反面照");
      if (isEmpty(this.dataInfo.name)) return this.$toast("请填写您的姓名");
      if (!this.dataInfo.industry) return this.$toast("请选择行业")
      if (isEmpty(this.config.city)) return this.$toast("请选择您的地区");
      // if (!IdentityCodeValid(this.dataInfo.idNum)) return this.$toast("请填写您的有效身份证号码");
      if (isEmpty(this.dataInfo.bankCard)) return this.$toast("请填写您的银行卡号");
      if (isEmpty(this.dataInfo.mobile)) return this.$toast("请填写您的手机号");
      if (!IsMobile(this.dataInfo.mobile)) return this.$toast("请输入正确的手机号");
      if (isEmpty(this.dataInfo.code)) return this.$toast("请输入验证码");
      // if (this.checked==false) return  this.$toast("请阅读并同意<p>《在线签约用户协议》</p>");
      this.uploadFile();
    },
    //校验
    async checkedID(){
      try{
         let data = await checkId({name:this.dataInfo.name, idCard: this.dataInfo.idNum,bankCardNum:this.dataInfo.bankCard});
         this.uploadFile()
      }catch (e) {
        this.$toast(e);
      }
    },
    //上传照片得到信息
    async getPhotoInfo(fontFile, backFile){
      const toast = this.$createToast({mask:true,time:0});
      toast.show();
      try{
        let data = await getInfo({positiveIDPhoto:fontFile,negativeIDPhoto:backFile});
        this.photoInfo = data.data;
        toast.hide();
      }catch(e){
        toast.hide();
        this.photoInfo = {};
        this.$toast(e)
      }
    },
    //上传文件
    async uploadFile(){
      const toast = this.$createToast({mask:true,time:0, txt: '正在加载合同，进入签署电子合同中...'});
      toast.show();
      try{
        let data = await signInfoByCom({
          name:this.dataInfo.name,
          idNo:this.dataInfo.idNum,
          mobile:this.dataInfo.mobile,
          code:this.dataInfo.code,
          cardNo:this.dataInfo.bankCard,
          type: this.dataInfo.industry,
          region: this.config.city,
          positiveIDPhoto:this.frontObj,
          negativeIDPhoto:this.backObj,
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
    frontFiles(val){
      this.frontObj = val;
      if(Object.keys(this.backObj).length !==0){
        this.getPhotoInfo(val,this.backObj)
      }
    },
    backFiles(val){
       this.backObj = val;
       if(Object.keys(this.frontObj).length !==0){
         this.getPhotoInfo(this.frontObj,val)
       }
    }
  },
  components: {
    personInfo: () => import("./components/personInfo"),
    uploadImg: () => import("./components/uploadImg")
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
