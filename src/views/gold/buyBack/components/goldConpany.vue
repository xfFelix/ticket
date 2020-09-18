<template>
    <div class="agreeFixed" v-if="show">
        <div class="iconfont goback" @click="$emit('handle-show-profile')">&#xe61e;<span>皇悦珠宝有限公司</span></div>
        <div class="goldCompanyW">
          <div class="logo-wrapper"><img src="~common/images/gold/huangdi-logo.png" alt=""></div>
          <div class="profile-wrapper">
            <p class="title"><span class="square"></span><span class="profile">公司介绍</span></p>
            <p class="content">东莞皇悦珠宝有限公司起源于香港皇帝珠宝,    “LORDGEM 皇帝珠宝”是香港皇帝珠宝旗下的高端珠宝首饰品牌。东莞皇悦珠宝有限公司成立于2002年，是集珠宝款式设计、制作工艺研发、个性专属定制、直营零售和自营进口业务 为一体的大型珠宝品牌公司。本公司追求极致，不断创新精神，致力于为消费者提供极致的产品和完善的体验，深入而广泛地影响着人们的时尚生活。</p>
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
          margin-right: 3px;
          width: 3px;
          height: 16px;
          background: #FE8B30;
        }
        .profile {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
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
        width: 200px;
        height: 276px;
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
          margin-right: 3px;
          width: 3px;
          height: 16px;
          background: #FE8B30;
        }
        .profile {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
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
              font-size: 12px;
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
              margin-top: -4px;
              font-size: 10px;
              color: rgba($color: #000000, $alpha: 0.4);
            }
          }
          .odd {
            font-size: 12px;
            color: #444444;
          }
          .even {
            padding-left: 10px;
          }
          .last {
            margin-left: 23px;
            margin-top: -4px;
            font-size: 10px;
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
