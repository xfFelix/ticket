<template>
  <div class="realName">
    <div class="header-bg">
      <Header class="navbar" :show-more="!yingqiudiShow">实名认证
        <i slot="icon" class="icon-gengduo-black"></i>
      </Header>
    </div>


    <div class="name-info-wrap">
      <ul class="name-info">
        <!-- <li v-if="smsValid" style="color:#999;">虚拟号码：{{userinfo.userName}}</li> -->
        <li v-if="smsValid"><span class="iconImg tel"></span><input type="text" placeholder="手机号码" v-model="mobile"></li>
        <li v-if="smsValid" >
          <span class="iconImg sms"></span><input type="text" placeholder="短信验证码" v-model="smsCode">
          <button class="sms-code" :disabled="btnDisabled" @click="sendCode">{{time>0 ? time + 's': timeFlag}}</button>
        </li>

        <li><span class="iconImg name"></span><input type="text" placeholder="真实姓名" v-model="name"></li>
        <li><span class="iconImg identy"></span><input type="text" placeholder="身份证号码" v-model="cardId">
        </li>
        <!-- <li class="tip">
          温馨提示：应税务要求，月累计消费超过3万的用户需要实名认证。
        </li> -->
      </ul>

    </div>
    <div class="certBntW">
      <div class="certBnt" @click="certBnt()">认证</div>
    </div>
  </div>
</template>

<script>
import {cert ,certsms} from 'api';
import {mapGetters} from 'vuex';
import {isEmpty,IsMobile} from 'util/common'
import {IOSFocus ,vipCustom} from '@/mixins';
export default {
  mixins: [IOSFocus,vipCustom],
  data:()=>({
      name:undefined,
      cardId:undefined,
      mobile:undefined,
      smsCode:undefined,
      btnDisabled:false,
      timeout:null,
      smsValid:false,
      time:0,
      timeFlag:"获取验证码"
  }),
  computed:{
    ...mapGetters({
      getToken:'getToken',
      userinfo: 'getUserinfo'
    })
  },
  methods:{
    certBnt(){
      // if(!isEmpty(this.userinfo.idnum)){
      //   this.$dialog({content:'您已经实名认证过了！'},()=>{});
      //   return false;
      // }
      if(!this.name){
        return this.$toast("请输入你的真实姓名!");
      }
      if(!this.cardId){
         return this.$toast("请输入你的有效身份证号码!");
      }
      this.cert();
    },
    async cert(){
      let res = await cert({cardId:this.cardId,realName:this.name,token:this.getToken,mobile:this.mobile});
      if(res.error_code!=0) return this.$toast(res.message);
      this.$dialog({content:"身份证认证成功！"},()=>{
      if(this.$route.query.back){
          if(this.$route.query.back.indexOf('http')>=0){
              if(this.$route.query.back.indexOf('?')>0){
                location.href = this.$route.query.back+"&token=" + this.getToken;
              }else{
                location.href = this.$route.query.back+"?token=" + this.getToken;
              }
            }else{
              this.$router.push({path:this.$route.query.back})
            }
          }else{
            if(this.userinfo.haiHang){
              location.href = this.userinfo.haiHang;
            }else{
              this.$router.back()
            }
          }
      })
    },
    async sendCode() {
      if(isEmpty(this.mobile)|| !IsMobile(this.mobile)){
        return this.$toast("请输入您的有效手机号码！");
      }
      clearInterval(this.timeout);
      let res = await certsms({ mobile: this.mobile})
       if(res.error_code == 2){
        this.$dialog({type:'confirm',content:'该手机号码已经注册了，请先绑定该账号！'},()=>{
            if(this.$route.query.back){
              this.$router.push({path:`/bind?back=${this.$route.query.back}&m=${this.mobile}`})
            }else{
              this.$router.push({path:`/bind?m=${this.mobile}`})
            }
        })
      }else{
          this.time = 120;
          this.timeFlag = "重新获取"
          this.timeout = setInterval(() => {
            if (this.time > 0) {
              this.time--
              this.btnDisabled = true
            } else {
              this.btnDisabled = false
              clearInterval(this.timeout);
            }
          }, 1000)
      }
    }
  },
  mounted(){
      if(!isEmpty(this.userinfo.idnum)){
        // this.$dialog({type:'confirm',content:'您已经实名认证过了！'},()=>{
        //   if(this.$route.query.back){
        //     if(this.$route.query.back.indexOf('http')>=0){
        //       if(this.$route.query.back.indexOf('?')>0){
        //         location.href = this.$route.query.back+"&token=" + this.getToken;
        //       }else{
        //         location.href = this.$route.query.back+"?token=" + this.getToken;
        //       }
        //     }else{
        //       this.$router.push({path:this.$route.query.back})
        //     }
        //   }else{
        //     if(this.userinfo.haiHang){
        //       location.href = this.userinfo.haiHang;
        //     }else{
        //       this.$router.back()
        //     }
        //   }
        // })
        // this.name = this.userinfo.realName
        // this.cardId = this.userinfo.idnum
        this.$router.replace({path:'/realNameF'})
      }


      if (!IsMobile(this.userinfo.userName)){
        if(this.userinfo.payValidType == null || this.userinfo.payValidType == 0) {
          this.smsValid= true;
        }else{
          this.smsValid= false;
        }
      }else{
        this.smsValid= false;
      }

  },
  components: {
      Header: () => import('@/components/Header'),
    },
  }
</script>
<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.realName{
  height: 100vh;
  position: relative;
  .header-bg {
    width: 100%;
    height: 406px;
    background-image: url('../../../common/images/realName/realName-bg.png');
    background-size: 100% 100%;
    .navbar{
      // background: #313340;
      background: transparent;
      color: #fff;
      // position: fixed;
      width: 100%;
      .icon-gengduo-black {
        position: absolute;
        top: 9px;
        right: 16px;
        width: 24px;
        height: 24px;
        background-image: url('../../../common/images/header-moreW.png') !important;
        background-size: 100% 100%;
      }
    }
  }

  .name-info-wrap{
    // padding-top: 44px;
    padding: 0 16px;
    .name-info{
      font-size: 14px;
      padding: 0 16px;
      background: #fff;
      border-radius: 10px;
      margin-top: -25px;
      li{
        border-bottom: 1px solid#F5F5F5;
        line-height: 52px;
        display: flex;
        height: 52px;
        align-items: center;
        padding: 2px 5px;
        &:last-child {
          border-bottom: none;
        }
        .tel,.name,.sms,.identy{
          margin-right: 16px;
          width: 20px;
          height: 20px;
        }
        .tel{
          margin-right: 16px;
          background-image: url('../../../common/images/realName/icon_phone.png');
        }
        .sms{
          background-image: url('../../../common/images/realName/icon_sms.png')
        }
        .identy{
          background-image: url('../../../common/images/realName/icon_shenfenzheng.png')
        }
        .name{
          background-image: url('../../../common/images/realName/icon_name.png');
        }
        input{
          width: 100%;
          height: 100%;
          flex: 1;
          font-size: 16px;
          color: #1A1A1A;
          &::placeholder {
            font-size: 16px;
            color: #9D9D9D;
          }
        }
        .sms-code{
          background-color: transparent;
          border: 1px solid $theme;
          padding: 0px 16px;
          height: 30px;
          line-height: 30px;
          color: $theme;
          border-radius: 25px;
        }
      }
      .tip{
        line-height: 22px;
        color: #FF004E;
        font-size: 12px;
      }
    }


  }
  .certBntW {
    margin-top: 67px;
    margin-bottom: 30px;
    width: 100%;
    // position: absolute;
    // bottom: 30px;
    padding: 0 16px;
    box-sizing: border-box;
    .certBnt{
      background: $theme;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      height: 48px;
      border-radius: 10px;
      font-weight: bold;
      }
  }

}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .navbar, .certBntW{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
