<template>
  <div class="recordDetail">
    <Header class="navbar" :show-more="false" >
      <i slot="icon" class="icon-gengduo-white"></i>
    </Header>
    <div class="record-main">
      <div class="order-typeW">
        <div class="title half-circle">
          <div class="order-img"><img v-if="detailInfo.syncNum" :src="require('@/common/images/memberCard/logo_slices/'+detailInfo.syncNum+'.png')" alt=""></div>
          <div class="order-name">{{syncNumMap[detailInfo.syncNum]}}</div>
        </div>
        <div class="info-main half-circle">
          <img v-if="detailInfo.orderNum" :src="require('@/common/images/memberCard/detail_icon/'+detailInfo.orderNum+'.png')" alt="">
          <p class="info-title">{{detailInfo.cardUser}}</p>
          <div class="info-status" v-if="detailInfo.status == 0">
            <span>兑换中</span>
          </div>
          <div class="info-status" v-if="detailInfo.status == 2">
            <span>兑换失败</span>
          </div>
          <div class="info-status"  v-if="detailInfo.status == 1">
            <span v-if="detailInfo.cardBank!=6">兑换成功</span>
            <div v-else>
              <div class="info-btn" v-if="detailInfo.syncNum==21 || detailInfo.syncNum==25" @click="toLink(detailInfo.memo)">
                立即使用
              </div>
              <div class="order-codeW" v-else>
                <!-- <div class="order-code"><span class="order-code-left">卡号：</span><span class="order-code-right">1643154618463158</span></div> -->
                <div class="order-code"><span class="order-code-left">卡密：</span><span class="order-code-right">{{detailInfo.memo}}</span></div>
                <div class="copy-code" @click="handleCopy(detailInfo.memo,$event)">复制</div>
              </div>
            </div>

          </div>

        </div>
        <div class="order-exp">
          <p class="order-exp-item" v-if="detailInfo.cardBank==6"><span class="left">有效期</span><span class="right">{{detailInfo.sendDate?detailInfo.sendDate:'— —'}}</span></p>
          <p class="order-exp-item" v-if="detailInfo.cardBank!=6"><span class="left">充值账号</span><span class="right">{{detailInfo.cardNum}}</span></p>
        </div>
      </div>
      <div class="order-infoW">
        <div class="order-title">订单信息</div>
        <ul>
          <li><span class="left">订单编号</span><span>{{detailInfo.idUrl}}</span></li>
          <li><span class="left">下单时间</span><span>{{detailInfo.addDate}}</span></li>
          <li><span class="left">售价</span><span>{{detailInfo.repaymentAmount|toPrice}}</span></li>
          <li><span class="left">服务费</span><span>{{detailInfo.serviceFee|toPrice}}</span></li>
          <li><span class="left">税费</span><span>{{detailInfo.taxFee|toPrice}}</span></li>
          <li class="total"><span class="left">合计</span><span class="right">{{detailInfo.totalAmount|toPrice}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { vipOrderDetail } from 'api';
import { mapGetters } from 'vuex';
import clip from 'util/clipboard'
export default {
   data: () => ({
     detailInfo: {},
     syncNumMap: {
       0: '',
       1: '优酷视频',
       2: '爱奇艺视频',
       3: '腾讯视频',
       5: '芒果TV',
       6: '搜狐视频',
       8: '网易云音乐',
       10: 'QQ音乐',
       21: '哈根达斯',
       23: '瑞幸咖啡',
       25: '星巴克',
       26: '猫眼电影',
       27: '咪咕中信书店'
     }
   }),
  components: {
    Header: () => import('@/components/Header'),
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    }),
  },
  methods: {
    async getOrderDetail() {
      let data = await vipOrderDetail({id: this.$route.query.id, token: this.getToken})
      this.detailInfo = data.data
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    toLink (url) {
      window.location.href = url
    }
  },
  created() {
    this.getOrderDetail()
  }
  // mounted() {
  //   this.getOrderDetail()
  // }
}
</script>
<style lang="scss" scoped>
.recordDetail {
  background: #21D398;
  min-height: 100vh;
  padding-bottom: 16px;
  .navbar{
    background: transparent;
    color: #fff;
    // position: fixed;
    width: 100%;
    .icon-gengduo-white {
      position: absolute;
      top: 9px;
      right: 16px;
      width: 24px;
      height: 24px;
      background-image: url('../../../common/images/header-moreW.png') !important;
      background-size: 100% 100%;
    }
  }
  .record-main {
    padding: 0 16px;
    padding-top: 6px;
    .order-typeW {
      background: #fff;
      border-radius: 10px;
      // padding: 0 8px;
      // padding-left: 16px;
      .title {
        display: flex;
        align-items: center;
        height: 56px;
        padding-left: 16px;
        .order-img {
          width: 36px;
          height: 36px;
        }
        .order-name {
          margin-left: 10px;
          font-size: 16px;
          color: #1A1A1A;
        }
      }
      .info-main {
        padding-top: 36px;
        padding-bottom: 24px;
        border-top: 1px dashed rgba($color: #979797, $alpha: 0.2);
        border-bottom: 1px dashed rgba($color: #979797, $alpha: 0.2);
        text-align: center;
        img {
          width: 168px;
          height: 100px;
          margin: 0 auto;
          border: 1px solid rgba($color: #979797, $alpha: 0.2);
          border-radius: 10px;
        }
        .info-title {
          margin-top: 16px;
          font-size: 20px;
          color: #1A1A1A;
          font-family: PingFangSC-Semibold;
          font-weight: bold;
        }
        .info-status {
          padding-top: 24px;
          span {
            display: inline-block;
            width: 112px;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            color: #21D398;
            background-color: #F5F5F5;
            border-radius: 14px;
          }
          .info-btn {
            // margin-top: 36px;
            width: 311px;
            height: 44px;
            line-height: 44px;
            color: #fff;
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            background: #21D398;
            border-radius: 22px;
          }

          .order-codeW {
            width: 249px;
            margin: 0 auto;
            position: relative;
            .order-code {
              width: 100%;
              height: 28px;
              padding: 0 12px;
              display: flex;
              align-items: center;
              background: #F5F5F5;
              border-radius: 14px;
              font-size: 15px;
              box-sizing: border-box;
              .order-code-left {
                width: 50px;
                color: #1A1A1A;
              }
              .order-code-right {
                flex: 1;
                text-align: left;
                color: #21D398;
              }

            }
            .code-secret {
              margin-top: 8px;
            }
            .copy-code {
              position: absolute;
              right: -35px;
              bottom: 6px;
              display: inline-block;
              width: 32px;
              height: 16px;
              line-height: 18px;
              color: #fff;
              text-align: center;
              font-size: 10px;
              background: #21D398;
              border-radius: 16px;
            }
          }
        }

        // .sub-title {
        //   margin-top: 12px;
        //   font-size: 14px;
        //   color: #999999;
        // }

      }
      .order-exp {
        padding: 20px 16px;
        .order-exp-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          .left {
            color: #999999;
          }
          .right {
            color: #1A1A1A;
          }
          // &:last-child {
          //   margin-top: 12px;
          // }
          // &:first-child {
          //   margin-top: 0px;
          // }
        }
      }
    }
    .order-infoW {
      margin-top: 12px;
      background: #fff;
      border-radius: 10px;
      padding: 24px 16px;
      .order-title {
        font-size: 16px;
        color: #1A1A1A;
        font-weight: bold;
        text-align: center;
      }
      ul {
        margin-top: 24px;
        li {
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #1A1A1A;
          .left {
            color: #999999;
          }
        }
        .total {
          margin-top: 24px;
          margin-bottom: 0;
          font-size: 16px;
          .left {
            color: #1A1A1A;
            font-weight: bold;
          }
          .right {
            color: #1A1A1A;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.half-circle {
  position: relative;
  &::before {
    position: absolute;
    left: -8px;
    bottom: -8px;
    width: 16px;
    height: 16px;
    content: '';
    background: #21D398;
    border-radius: 50%;
  }
  &::after {
  position: absolute;
  right: -8px;
  bottom: -8px;
  width: 16px;
  height: 16px;
  content: '';
  background: #21D398;
  border-radius: 50%;
}
}
</style>
