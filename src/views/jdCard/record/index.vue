<template>
  <div class="jdCard-record">
    <div class="headFixed">
      <header class="navbar">
          <i class="cubeic-back" @click="$router.back()"></i>
          京东E卡记录
      </header>
    </div>
    <div class="record-main">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="tips" @click="openHelps"><span>使用帮助</span><img src="@/common/images/jdCard/icon_help.png" alt=""></div>
          <div class="recordW">
            <ul>
              <li class="record-item" v-for="(item,index) in recordList" :key="index">
                <p class="jdCard-num"><span>获得{{item.productPrices}}元京东E卡</span><span class="num">×{{item.num}}</span><span class="success" v-if="item.status===1">兑换成功</span></p>
                <div class="dateW">
                  <p class="order-date">下单时间：{{item.addDate}}</p>
                  <div class="order-detail" @click="orderInfoShowToggle(item,index)">订单详情
                    <span class="arrow" :class="[item.orderInfoShow?'up':'down']"></span>
                  </div>
                </div>
                <div class="order-detail-info" v-if="item.orderInfoShow">
                  <p class="order-num">订单编号：{{item.orderId}}</p>
                  <p class="order-time one-bottom-px">发卡时间：{{item.sendDate?item.sendDate:'--'}}</p>
                  <div class="price-detail">
                    <li>售价：{{item.salePrice | toPrice}}</li>
                    <li>税费：{{item.taxFee | toPrice }}</li>
                    <li v-if="item.preferentialFee">优惠费用：-{{item.preferentialFee | toPrice}}</li>
                    <li>订单总额：{{item.totalAmount | toPrice}}</li>
                  </div>
                </div>
                <div class="info-detail">
                  <div class="changing" v-if="item.status!=1 ">
                    <div class="changing-btn" v-if="item.status==0">兑换中</div>
                    <div class="changing-btn" v-if="item.status==99">待商户确认</div>
                    <div class="changing-btn" v-if="item.status==88">商户取消订单</div>
                    <div class="changing-btn" v-if="item.status==2">兑换失败</div>
                    <div class="notice" v-if="item.status==0">预计10分钟内发放卡密，刷新页面查看结果</div>
                    <div class="notice" v-if="item.status==99">商户确认后发放卡密</div>
                    <div class="notice" v-if="item.status==2 || item.status==88">积分已返还</div>
                  </div>
                  <div v-if="item.status==1 && item.cardInfos">
                    <div class="change-successW"  v-for="(icardInfo,index) in item.cardInfos" :key="index" :class="[index>1&&!item.showALL?'hide':'show']">
                      <div class="info-header">
                        <div class="img_card">
                          <p class="price-value">¥{{item.productPrices}}</p>
                        </div>
                        <div class="order-info">
                          <p class="title">京东E卡{{item.productPrices}}元卡密</p>
                          <p class="card-num">卡号：{{icardInfo.cardCode}}</p>
                          <p class="exp">过期时间：{{icardInfo.invalidDate}}</p>
                        </div>
                      </div>
                      <div class="card-code">
                        {{icardInfo.cardPwd}}
                      </div>
                      <div class="copy-btn" @click="showSms(item.id,icardInfo.cardCode)">
                        查看复制
                      </div>
                      <div class="top" :class="[{'top1':index==0},{'top2':index==1},{'top3':index==2},{'top-other':index>2}]">{{index+1}}</div>
                    </div>
                    <div class="show-more" @click="showALLToggle(item,index)" v-if="item.cardInfos.length>2">
                      {{item.showALL?'收起':'展开更多'}}
                      <span class="icon_arrow" :class="[item.showALL?'icon_up':'icon_down']"></span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
      </van-pull-refresh>


    </div>
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
        <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
        <div slot="btn">联系客服</div>
      </remindDialog>
    <sms-code :show.sync="show.code" v-if="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" @forget="setForget"></sms-code>
    <no-data :data="recordList"></no-data>
    <jdCardFile :show="showFile" @handle-show-file="initShowFile"></jdCardFile>
  </div>
</template>
<script>
import {mapGetters, mapActions } from 'vuex';
import { List, PullRefresh } from 'vant';
import { queryJDECardRecharge, JDECardCode } from "api";
import clip from 'util/clipboard';
export default {
  data: ()=>({
    orderInfoShow: false,
    recordList: [],
    loading: false,
    finished: false,
    refreshing: false,
    showFile:false,
    start:0,
    tenFlag: true,
    count:0,
    nextCount:0,
    show:{
      mask:false,
      code:false,
      dialog: false
    },
    failText:'',
    link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
    linkType: 'href',
    recordId: '',
    recordCode: ''
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    }),
  },
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow();
          this.failText = undefined;
        }
      }
    },
  },
  methods: {
    setForget() {
      this.show = {mask:true,code:false,dialog:true}
      },
    initShow(){
      this.show={mask:false,code:false,dialog:false}
    },
    orderInfoShowToggle(item,index) {
      this.recordList[index].orderInfoShow = !item.orderInfoShow;
    },
    showALLToggle(item,index) {
      this.recordList[index].showALL = !item.showALL;
    },
    initShowFile () {
      this.showFile = false
    },
    openHelps() {
      this.showFile = true
    },
    async getRecordList() {
      let res = await queryJDECardRecharge({token:this.getToken,start: this.start,})
      if (res.error_code != 0) return this.$toast(res.message);
      res.data.forEach(item=> {    //详细信息显示
        item.showALL = false;
        item.orderInfoShow = false;
      })
      this.recordList.push(...res.data);
      if (res.data.length < 10) {
        this.tenFlag = false;
      }
      this.loading = false
      this.refreshing = false
      this.nextCount +=1
    },
    async onLoad() {
      if (this.tenFlag == true) {
        if(this.nextCount > this.count) {
          this.start+=10
          this.getRecordList();
          this.count = this.nextCount
        }
      }
      this.loading = false;
      if (this.tenFlag == false) {
        this.finished = true;
      }
      this.refreshing = false
    },
    onRefresh() {
      this.start = 0
      this.recordList = [];
      this.refreshing = true
      this.finished = false;
      this.getRecordList();
    },
    showSms(id,code) {
      this.recordId = id
      this.recordCode = code
      this.show = {mask:true,code:true,dialog:false}
    },
    handlerShowInfo(){
        this.initShow();
      },
    async submitOrder(val) {
      let res = await JDECardCode({token:this.getToken,cardCode: this.recordCode,verify_code:val,id:this.recordId})
      if(res.error_code != 0){
        return this.failText = res.message;
      }else{
        this.initShow();
        this.$dialog({type:'alert',showClose: true,content: res.data,title:'您的卡密',confirmBtn:{text:'复制'}},($event) => {
          this.handleCopy(res.data,$event)
        })
      }
    },
    handleCopy(text, event) {
      clip(text, event)
    },
  },
  components:{
    jdCardFile: () => import("./components/jdCardFile"),
    NoData: () => import('components/NoData'),
    SmsCode: ()=> import('components/SmsCode'),
    remindDialog: ()=> import('components/remindDialog'),
    BgMask: () => import('components/BgMask'),
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  created() {
    this.getRecordList()
  }
}
</script>
<style lang="scss" scoped>
.jdCard-record {
  .headFixed {
    position: fixed;
    width: 100%;
    z-index: 2;
    header {
      position: relative;
      background: #FFFFFF;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      color: #444444;
      font-weight: 500;
      .cubeic-back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
      }
    }
    .navbar {
      font-weight: bold !important;
      font-size: 18px;
      color: #1A1A1A;
    }
  }
  .record-main {
    padding: 16px;
    padding-top: 66px;
    .tips {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      img {
        margin-left: 8px;
        width: 14px;
        height: 14px;
      }
      span {
        font-size: 14px;
        color: #1A1A1A;
      }
    }
    .recordW {
      .record-item {
        margin-top: 12px;
        padding: 16px;
        background: linear-gradient(270deg, #FE3215 0%, #FF7434 100%);
        border-radius: 10px;
        .jdCard-num {
          position: relative;
          font-size: 18px;
          color: #ffffff;
          span {
            font-weight: bold;
          }
          .num {
            margin-left: 12px;
          }
          .success {
            position: absolute;
            right: 0;
            bottom: 2px;
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            color: #ffffff;
          }
        }
        .dateW {
          margin-top: 4px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .order-date {
            font-size: 12px;
            color: #ffffff;
          }
          .order-detail {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 82px;
            height: 24px;
            color: #B36424;
            font-weight: bold;
            background: linear-gradient(90deg, #FFE6C0 0%, #FFC686 100%);
            border-radius: 12px;
            .arrow {
              display: inline-block;
              margin-left: 2px;
              width: 12px;
              height: 12px;
              background-size: 100% 100%;
            }
            .up {
              background-image: url('../../../common/images/jdCard/icon_up.png');
            }
            .down {
              background-image: url('../../../common/images/jdCard/icon_down.png');
            }
          }

        }
        .order-detail-info {
          margin-top: -4px;
          .order-num {
            padding-bottom: 10px;
            font-size: 12px;
            color: #ffffff;
          }
          .order-time {
            padding-bottom: 16px;
            font-size: 12px;
            color: #ffffff;
          }
          .price-detail {
            padding: 10px 0px 16px;
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            color: #ffffff;
            li {
              display: inline-block;
              width: auto;
              margin-right: 20px;
              &:last-child {
                margin-top: 8px;
                margin-right: 0;
              }
            }
          }
        }
        .info-detail {
            border-radius: 6px;
            .changing {
              padding: 20px 0;
              background: #ffffff;
              border-radius: 10px;
              .changing-btn {
                margin: 4px auto 0px;
                width: 106px;
                height: 34px;
                line-height: 36px;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                font-family: PingFangSC-Semibold;
                color: #FE5E00;
                background: #FFF1EB;
                border-radius: 10px;
              }
              .notice {
                margin-top: 12px;
                font-size: 12px;
                color: #5A5A5A;
                text-align: center;
              }
            }
            .change-successW {
              position: relative;
              margin-top: 12px;
              padding: 16px 0;
              background: #ffffff;
              border-radius: 10px;
              .info-header {
                padding-left: 12px;
                display: flex;
                .img_card {
                  position: relative;
                  width: 100px;
                  height: 64px;
                  border-radius: 6px;
                  background-image: url('../../../common/images/jdCard/card.png');
                  background-size: 100% 100%;
                  .price-value {
                    position: absolute;
                    left: 8px;
                    bottom: 6px;
                    font-size: 12px;
                    font-weight: bold;
                    color: #ffffff;
                  }
                }
                .order-info {
                  margin-left: 8px;
                  padding-top: 2px;
                  .title {
                    font-size: 14px;
                    color: #1A1A1A;
                    font-weight: bold;
                  }
                  .card-num {
                    margin-top: 6px;
                    font-size: 12px;
                    color: #5A5A5A;
                  }
                  .exp {
                    margin-top: 2px;
                    font-size: 12px;
                    color: #5A5A5A;
                  }
                }
              }
              .top {
                position: absolute;
                top: 8px;
                right: 9px;
                width: 22px;
                height: 24px;
                line-height: 24px;
                color: #ffffff;
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                background-size: 100% 100%;
              }
              .top1 {
                background-image: url('../../../common/images/jdCard/top1.png');
              }
              .top2 {
                background-image: url('../../../common/images/jdCard/top2.png');
              }
              .top3 {
                background-image: url('../../../common/images/jdCard/top3.png');
              }
              .top-other {
                background-image: url('../../../common/images/jdCard/top_other.png');
              }
              &:first-child {
                margin-top: 0;
              }
            }
            .hide {
              display: none;
            }
            .show {
              display: block;
            }
            .show-more {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #ffffff;
              .icon_arrow {
                display: inline-block;
                margin-left: 2px;
                width: 12px;
                height: 12px;
                background-size: 100% 100%;
              }
              .icon_up {
                background-image: url('../../../common/images/jdCard/icon_up_white.png');
              }
              .icon_down {
                background-image: url('../../../common/images/jdCard/icon_down_white.png');
              }
            }
            .card-code {
              margin: 0 auto;
              margin-top: 20px;
              width: 287px;
              // height: 48px;
              padding: 10px 24px;
              font-size: 14px;
              font-family: PingFangSC-Semibold;
              font-weight: bold;
              color: #FE5E00;
              text-align: center;
              box-sizing: border-box;
              word-break: break-all;
              background: #FFF1EB;
              border-radius: 10px;
            }
            .copy-btn {
              margin: 16px auto 0px;
              width: 84px;
              height: 24px;
              line-height: 26px;
              color: #B36424;
              font-size: 12px;
              font-weight: bold;
              text-align: center;
              border-radius: 12px;
              background: linear-gradient(90deg, #FFE6C0 0%, #FFC686 100%);
            }
          }
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
<style>
.cube-popup-mask {
  background-color: rgba(0,0,0,0.8);
  opacity: 0.8;
}
.cube-dialog-btn_highlight {
  color: #FE5E00;
}
.cube-dialog-close {
  top: 4px;
  right: 4px;
  font-size: 0.56rem;
}
</style>
