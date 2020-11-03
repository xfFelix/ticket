<template>
    <div class="agreeFixed" v-if="show">
        <div class="iconfont goback" @click="$emit('handle-show-profile')">&#xe61e;<span>信达贵金有限公司</span></div>
        <div class="goldCompanyW">
          <div class="logo-wrapper"><img src="~common/images/gold/huangdi-logo.png" alt=""></div>
          <div class="profile-wrapper">
            <p class="title"><span class="square"></span><span class="profile">公司介绍</span></p>
            <p class="content">海南信达贵金科技有限公司是一家专业服务于互联网金融的贵金属交易公司。公司接受海南省监管机构监督指导，稳健运营；制定有严格的防范措施，用以保障交易环境及资金安全；拥有专业化的精英运营团队并建立交易风控策略；配置7*24小时私人客服，全时段服务于互联网金融。</p>
            <img class="profile-img" src="~common/images/gold/profile.png" alt="">
          </div>
          <div class="line"></div>
          <div class="service-wrapper">
            <p class="title"><span class="square"></span><span class="profile">提供的服务</span></p>
            <p class="service-title">通过黄金提货码，进行回购，回购步骤如下</p>
            <div class="service-info">
              <p class="odd"><span class="circle flex">1</span>填写回购银行卡信息</p>
              <p class="even"><span class="dash"></span><span class="text">校验银行信息真实性</span></p>
              <p class="odd"><span class="circle flex">2</span>提交回购</p>
              <p class="even"><span class="dash"></span></p>
              <p class="odd"><span class="circle flex">3</span>到账成功</p>
              <p class="last">09:00---23:00 二小时到账，其它时间兑换次日处理</p>
            </div>
          </div>
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
        goBack() {

        }
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
    height: 100%;
    width: 375px;
}

.goback {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    color: #fff;
    background: #373C48;
    span {
      margin-left: 90px;
    }
}

.goldCompanyW {
    position: relative;
    overflow: scroll;
    height: 100%;
    .logo-wrapper {
      margin: 30px auto;
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .profile-wrapper {
      .title {
        padding: 0 29px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .square {
          margin-right: 10px;
          width: 3px;
          height: 18px;
          background: #FE8B30;
        }
        .profile {
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: bold;
          color: #444444;

        }
      }
      .content {
        margin-top: 16px;
        padding-left:29px;
        padding-right: 19px;
        font-size: 15px;
        color: #444444;
        line-height: 21px;
        text-align: left;
        letter-spacing: 1px;
      }
      .profile-img {
        display: block;
        margin: 20px auto;
        margin-bottom: 32px;
        width: 310px;
        height: 222px;
      }
    }
    .line {
      width: 100%;
      height: 10px;
      background: #F7F7F7;
    }
    .service-wrapper {
      margin-top: 32px;
      padding: 0 29px;
      height: 300px;
      .title {
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .square {
          margin-right: 10px;
          width: 3px;
          height: 18px;
          background: #FE8B30;
        }
        .profile {
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: bold;
          color: #444444;
        }
      }
      .service-title {
        margin-top: 18px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 500;
        color: #444444;
      }
      .service-info {
        margin-top: 16px;
          p {
            .circle {
              margin-right: 5px;
              display: inline-block;
              width: 20px;
              height: 20px;
              color: #FFFFFF;
              font-size: 14px;
              line-height: 21px;
              text-align: center;
              background-image: url('../../../../common/images/gold/circular-ring.png');
              background-size: 100% 100%;
            }
            .dash {
              margin-top: 3px;
              display: inline-block;
              width: 1px;
              height: 16px;
              background-image: url('../../../../common/images/gold/dashed.png');
              background-size: 100% 100%;
            }
            .text {
              display: inline-block;
              vertical-align: top;
              margin-left: 13px;
              margin-top: -2px;
              font-size: 12px;
              color: rgba($color: #000000, $alpha: 0.4);
            }
          }
          .odd {
            font-size: 14px;
            color: #444444;
          }
          .even {
            padding-left: 10px;
          }
          .last {
            margin-left: 23px;
            margin-top: -2px;
            font-size: 12px;
            color: rgba($color: #000000, $alpha: 0.4);
          }
        }
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
