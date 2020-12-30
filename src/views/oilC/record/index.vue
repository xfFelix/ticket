<template>
    <div class="oilRecord">
        <div class="headFixed">
            <header>
                <i class="cubeic-back" @click="$route.query.go=='cocogc'?$router.back():$router.push({name:'oilHomeC'})"></i>
                油卡充值记录
            </header>
        </div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                          <div>
                            <img v-if="item.cardBank==1" src="@/common/images/oil/icon_zhongshihua.png" alt="">
                            <img v-else src="@/common/images/oil/icon_zhongshiyou.png" alt="">
                            <span class="card-user">{{item.cardUser}}</span>
                          </div>

                            <div>
                                <span v-if="item.status==0" class="order-status bg-orange">{{changeFlag? '提交成功，待充值': '兑换成功'}}</span>
                                <span v-else-if="item.status==1" class="order-status bg-green">{{changeFlag? '充值成功': '已回收'}}</span>
                                <span v-else-if="item.status==2" class="order-status bg-red">{{changeFlag? '充值失败': '回收失败'}}</span>
                                <!-- <span v-else-if="item.status==3">回收中</span>
                                <span v-else-if="item.status==4">兑换失败</span> -->
                            </div>
                            <!-- <div v-else>
                                <span v-if="item.status==0">已售出</span>
                                <span v-else-if="item.status == 1">已回购</span>
                            </div> -->
                        </div>

                        <div class="reInfoW">
                            <div class="reInfo">
                                <p class="flex">
                                    <span class="order-left">充值时间</span>
                                    <span>{{item.orderTime}}</span>
                                </p>
                                <p class="flex">
                                    <span class="order-left">手机号码</span>
                                    <span>{{item.mobile}}</span>
                                </p>
                                <p class="flex" v-if="changeFlag">
                                    <span class="order-left">油卡卡号</span>
                                    <span>{{item.cardNum}}</span>
                                </p>
                                <div class="total flex">
                                  <span class="order-left">合计</span>
                                  <span>{{item.totalAmount|toPrice}}</span>
                                </div>
                                <div class="feeW">
                                    <span>平台服务费:{{item.serviceFee|toPrice}} 税费:{{item.taxFee|toPrice}}</span>
                                    <span v-if="item.preferentialFee"  style="color:#FF6600;margin-right:0"> 优惠费用:-{{item.preferentialFee|toPrice}}</span>
                                  </div>

                            </div>
                        </div>
                    </li>
                </ul>
            </cube-scroll>
            <no-data :data="recodeList"></no-data>
        </div>
    </div>
</template>
<script>
import { oilOrderList } from 'api';
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        changeFlag: 1,
        typeFlag: 1,
        recodeList: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '上拉加载更多...',
        pullUpLoadNoMoreTxt: '已经到底了~',
        pageSize: 10,
        tenFlag: true,
        pageNum: 1,
    }),
    components: {
        NoData: () => import('components/NoData')
    },
    computed: {
        options() {
          return {
            pullUpLoad: this.pullUpLoadObj,
          }
        },
        pullUpLoadObj: function() {
          return this.pullUpLoad ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt,
            }
          } : false
        },
        offset() {
            return (this.pageNum - 1) * this.pageSize + 1;
        },
        ...mapGetters({
            getToken: 'getToken',
            userinfo: 'getUserinfo'
        }),
    },
    methods: {
        async getScenicList() {
            let data = await oilOrderList({
              token: this.getToken,
              type: this.typeFlag,
              offset: this.offset,
              rows: this.pageSize
            });
            if (data.code != 1) {
              return this.$toast(data.message);
            }
            if (data.data.length >= 10){ this.tenFlag = true; }
            else { this.tenFlag = false; }
            this.recodeList.push(...data.data);
        },
        onPullingUp() {
          if (this.tenFlag === true) {
            this.pageNum++;
            this.getScenicList();
          }
          if (!this.tenFlag && this.recodeList.length > 0) {
            this.$refs.scroll.forceUpdate();
          }
        },
    },
    mounted() {
      if(this.$route.query.cardId==2){
        this.changeFlag = 0;
        this.typeFlag = 2;
      }
      this.getScenicList()
    }
}
</script>
<style lang="scss">
.cube-dialog-main{
  .cube-dialog-alert{
    .cube-dialog-title{
      .title-wrapper{
        .text{
          padding: 15px 0;
        }
      }
    }
    .cube-dialog-content{
      .content-wrapper{
        padding: 0 15px;
        position: relative;
        .sms-code{
          position: absolute;
          right: 17px;
          top: 0;
          background: transparent;
          border: none;
          font-size: 12px;
          color: #30CE84;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.recordW {
  padding-top: 61px;
    li {
        background: #fff;
        border-radius: 10px;
        margin: 0 16px;
        margin-bottom: 12px;
        padding: 16px;
        font-size: 13px;
        box-sizing: border-box;
        .reName {
          margin-bottom: 10px;
          line-height: 28px;
          font-size: 14px;
          color: #1A1A1A;
          img {
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            width: 20px;
            height: 20px;
          }
          .card-user {
            font-weight: bold;
          }
          .order-status {
            padding: 7px 10px;
            color: #ffffff;
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            border-radius: 6px;
          }
          .bg-orange {
            background: #FFAF08;
          }
          .bg-green {
            background: #21D398;
          }
          .bg-red {
            background: #FA4839;
          }
        }
        .reInfoW {
            color: #1A1A1A;
            .reInfo {
              position: relative;
                p {
                    font-size: 14px;
                    padding-top: 7px;
                    .order-left {
                      display: inline-block;
                      width: 80px;
                      color: #646464;
                    }
                    span{
                      .see{
                        color: #30CE84;
                        text-decoration: underline;
                        margin-left: 10px;
                      }
                    }
                }
                .total{
                  display: flex;
                  font-size: 16px;
                  padding-top: 18px;
                  color: #1A1A1A;
                  span {
                    font-weight: bold;
                  }
                }
                .feeW {
                  display: flex;
                  justify-content: space-between;
                  margin-top: 6px;
                  color: #B4B4B4;
                  span {
                    display: inline-block;
                    width: auto;
                  }
                }
            }
            .recover{
              width: 100%;
              background: #30CE84;
              color: #fff;
              text-align: center;
              line-height: 44px;
              border-radius:0px 0px 5px 5px; /*no*/
              font-size: 15px;
              &.recoverNo{
                background: #DEDEDE;
                color: #4A4A4A;
              }
            }
        }
    }
}

.headFixed {
    position: fixed;
    width: 100%;
    z-index: 2;
    background: #fff;
}

.scroll-list-wrap {
    height: calc(100vh - 1px);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
}
header {
    position: relative;
    background: #ffffff;
    line-height: 45px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #1A1A1A;
    .cubeic-back {
        position: absolute;
        left: 16px;
    }
}
.oilRecord{
  background: #F5F5F5;
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .headFixed{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
<style>
.cube-pullup-wrapper .before-trigger {
  color: #9C9C9C !important;
  font-size: 12px;
}
</style>
