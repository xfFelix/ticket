<template>
    <div class="phoneRecord">
        <div class="headFixed">
            <header class="navbar">
                <i class="cubeic-back" @click="$router.back()"></i>
                话费充值记录
            </header>
            <div class="whoSelectW">
                <div :class="typeFlag==0?'whoSelectLogo':''"  @click="directCharge()" v-show="!yingqiudiShow">
                    <p>话费直充</p>
                </div>
                <div :class="typeFlag==1?'whoSelectLogo':''"   @click="cardCharge()">
                    <p >充值卡兑换</p>
                </div>
            </div>
        </div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                          <p>{{item.cardNum==0?item.cardBank+'元话费直充':'三网全国通用'+item.cardBank +'元充值卡'}}</p>
                          <p class="status-recharge" v-if="item.status==0">提交成功，待充值</p>
                          <p class="status-recharge" v-if="item.status==99">待商户确认</p>
                          <p class="status-success" v-if="item.status==1 || item.status==4 || item.status==7">{{typeFlag==0?'充值':'兑换'}}成功</p>
                          <p class="status-failed" v-if="item.status==2">{{typeFlag==0?'充值':'兑换'}}失败</p>
                          <p class="status-failed" v-if="item.status==88">商户取消订单</p>
                          <p class="status-failed" v-if="item.status==5">已过期</p>
                          <p class="status-failed" v-if="item.status==6">已废弃</p>
                          <p class="score-back" v-if="item.status==2 || item.status==88">积分已退回</p>

<!--
                            <span>产品名称：{{item.cardNum==0?item.cardBank+'元话费直充':item.cardBank+'元话费充值卡'}}</span>
                            <div>
                                <span v-if="item.status==0">兑换中</span>
                                <span v-if="item.status==1">兑换成功</span>
                                <span v-if="item.status==2">兑换失败</span>
                                <span v-if="item.status==4">已兑换</span>
                                <span v-if="item.status==5">已过期</span>
                                <span v-if="item.status==6">已废弃</span>
                                <span v-if="item.status==7">已转卖</span>
                            </div> -->

                        </div>
                        <div class="reInfoW">
                            <div class="reInfo">
                                <div>{{typeFlag==0?'充值':'兑换'}}时间：{{item.addDate}}</div>
                                <div v-if="typeFlag==0">手机号码：{{item.cardUser}}</div>
                                <div v-if="typeFlag==1">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{item.number?item.number:'— —'}}</div>
                                <div v-if="typeFlag==1">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密：{{item.number?item.password:'— —'}}</div>
                                <div>合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计：{{item.totalAmount|toPrice}}<span>(平台服务费:{{item.serviceFee|toPrice}}</span><span v-if="item.preferentialFee">优惠费用:-{{item.preferentialFee|toPrice}}</span><span>税费:{{item.taxFee|toPrice}})</span></div>
                                <div class="reInfo-icon" v-if="typeFlag==1">{{item.cardBank}}元</div>
                            </div>
                        </div>

                        <div class="dashed" v-if="typeFlag==1 && item.status!=2 && isNormalUser"></div>
                        <div class="reInfo-footer" @click="smsShow(item.orderNum)" v-if="item.cardNum==1 && item.status==1 && isNormalUser">充值&nbsp;|&nbsp;转卖 </div>
                        <div class="reInfo-footer recharged" v-if="item.cardNum==1 && item.status==4 && isNormalUser">已充值</div>
                        <div class="reInfo-footer recharged" v-if="item.cardNum==1 && item.status==7 && isNormalUser">已转卖</div>
                        <!-- <div class="pBUse" @click="smsShow(item.orderNum)" v-if="item.cardNum==1 && item.status==1">立即使用</div> -->
                        <!-- <a class="pBUse" :href="item.orderNum" v-if="item.cardNum==1 && item.status==1">立即使用</a> -->
                        <div v-if="typeFlag==1" class="left-around"></div>
                        <div v-if="typeFlag==1" class="right-around"></div>
                    </li>
                </ul>
            </cube-scroll>
            <no-data :data="recodeList"></no-data>
        </div>
        <Sms-code :show.sync="show.code" v-if="show.code" :fail-text="failText" @handler-show-info="initShow" @submit-order="submitOrder" :showSendCode="show.code" @forget="setForget"></Sms-code>
        <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
        <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
        <div slot="btn">联系客服</div>
      </remindDialog>
        <transition name="fade">
          <bg-mask v-model="show.mask"></bg-mask>
        </transition>
    </div>
</template>
<script>
import { phoneLogs, checkCode } from 'api';
import { mapGetters ,mapActions } from 'vuex';
import {vipCustom} from '@/mixins'
export default {
  mixins: [vipCustom],
    data: () => ({
        typeFlag: 0,
        recodeList: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '上拉加载更多...',
        pullUpLoadNoMoreTxt: '没有更多数据了~~',
        start:0,
        tenFlag: true,
        time: 0,
        code: '',
        show: {
          mask: false,
          code: false,
          dialog: false
        },
        failText:undefined,
        orderNum: '',
        isNormalUser: true,
        link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
        linkType: 'href'
    }),
    components: {
        NoData: () => import('components/NoData'),
        SmsCode: ()=> import('@/components/SmsCode'),
        remindDialog: ()=> import('@/components/remindDialog'),
        BgMask: () => import('@/components/BgMask'),
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
                    noMore: this.pullUpLoadNoMoreTxt
                }
            } : false
        },
        ...mapGetters({
            getToken: 'getToken',
            userinfo: 'getUserinfo',
            phoneConfig: 'phone/getConfig'
        }),
    },
    methods: {
      setForget() {
        this.show = {mask:true,code:false,dialog:true}
      },
        initData() {
          this.start=0;
          this.recodeList = [];
          this.tenFlag = true
        },
        directCharge() {
          this.typeFlag = 0;
          this.initData();
          this.getScenicList();
        },
        cardCharge() {
          this.typeFlag = 1;
          this.initData();
          this.getScenicList();
        },
        async getScenicList() {
            let data = await phoneLogs({
              token: this.getToken,
              history_type: this.typeFlag,
              start: this.start,
            });
            if (data.error_code != 0) {
              return this.$toast(data.message);
            }
            for(var i=0;i<data.data.length;i++){
                if(data.data[i].orderNum && data.data[i].orderNum.indexOf('https')!=-1){
                data.data[i]['number'] = this.getUrlParam("number",data.data[i].orderNum);
                data.data[i]['password'] = this.getUrlParam("password",data.data[i].orderNum)
              }
            }
            this.recodeList.push(...data.data);
            if (data.data.length < 10) {
                this.tenFlag = false;
            }
        },
        onPullingUp() {
            if (this.tenFlag === true) {
                this.start+=10
                this.getScenicList();
            }
            if (!this.tenFlag && this.recodeList.length > 0) {
                this.$refs.scroll.forceUpdate();
            }
        },
        getUrlParam(name,locationUrl){
          var arr = locationUrl.toString().split("?")[1].split('&')
          var res = {}
          for (var i = 0; i < arr.length; i++) {
            res[arr[i].split('=')[0]] = arr[i].split('=')[1]
          }
          return res[name]
        },
        smsShow (val) {
          this.orderNum = val
          console.log(val)
          if(this.userinfo.payValidType === 1) {
            window.location.href = this.orderNum
          }else {
            this.show={mask:true,code:true,dialog:false}
          }
        },
        initShow () {
          this.show={mask:false,code:false,dialog:false};
        },
        async submitOrder (val) {
          let data = await checkCode({
              token: this.getToken,
              verify_code: val
            });
          if(data.error_code == 0) {
            this.initShow();
            window.location.href = this.orderNum
          }else {
            this.failText = data.message
          }
        }
    },
    created () {
      if(this.userinfo.vendorId == '3839c796c9574b05a80c87f0adfb1f21') {
        this.isNormalUser = false
      }
    },
    mounted() {
      if(this.$route.query.cardId==1 || this.userinfo.vendorId=='yingqiudi'){
        this.typeFlag = 1;
      }
      this.getScenicList();
    },
    watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.initShow();
          this.failText=undefined
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.whoSelectW {
    height: 50px;
    background: transparent;
    display: flex;
    background: #FFFFFF;
    box-shadow: 0px 2px 10px 0px rgba(220,220,220,0.6);
    div{
        width: 50%;
        text-align: center;
        color: rgba($color: #000000, $alpha: 0.4);
        height: 100%;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        p{
          display: inline-block;
          text-align: center;
          margin: 0 auto;
        }
    }
    .whoSelectLogo {
        p{
          color: #444444;
          font-weight: 600;
          position: relative;
          &::after{
            content: '';
            width: 16px;
            height: 3px;
            position: absolute;
            bottom: -5px;
            left: 50%;
            margin-left: -8px;
            background: #FFAA02;
            border-radius: 2px;
          }
        }
    }
    .divide {
        color: #b1b1b1;
        font-size: 18px;
    }
}

.recordW {
  padding: 0px 16px 16px 16px;
    li {
        position: relative;
        margin-top: 12px;
        background: #fff;
        border-radius: 10px;
        padding: 16px;
        padding-bottom: 10px;
        font-size: 14px;
        box-sizing: border-box;
        box-shadow: 0px 2px 10px 0px rgba(220,220,220,0.6);
        .reName {
          position: relative;
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          p {
            font-size: 14px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color:#444444;
          }
          .status-recharge {
            color: #FFAA02;
          }
          .status-failed {
            color: #FF6600;
          }
          .status-success {
            color: #07C160;
          }
          .score-back {
            position: absolute;
            bottom: -6px;
            right: 0;
            font-size: 12px;
            color: rgba($color: #444444, $alpha: 0.4);
          }
        }
        .reInfoW {
            font-size: 12px;
            color: rgba($color: #444444, $alpha: 0.4);
            .reInfo {
              position: relative;
              div {
                line-height: 22px;
              }
              .reInfo-icon {
                position: absolute;
                right: 0;
                bottom: -11px;
                width: 40px;
                height: 40px;
                line-height: 40px;
                color: #FFFFFF;
                font-size: 12px;
                text-align: center;
                background-image: url('../../../common/images/phone/chongzhika-icon.png');
                background-size: 100% 100%;
              }
            }
        }
        .dashed {
          margin-top: 16px;
          border-bottom: 1px dashed #DEDEDE;
        }
        .reInfo-footer {
          margin: 0 auto;
          margin-top: 21px;
          width: 103px;
          height: 28px;
          color: #FFFFFF;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          border-radius: 5px;
          background: #FF6600;
          &.recharged {
            color: #3296FA;
            background: rgba($color: #3296FA, $alpha: 0.1);
          }
        }
      .left-around{
        position: absolute;
        left: -8px;
        top: 55px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #F5F5F5;
      }
      .right-around {
        position: absolute;
        right: -8px;
        top: 55px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #F5F5F5;
      }
    }
}

.headFixed {
    position: fixed;
    width: 100%;
    z-index: 2;
    // background: #373C48;
}

.scroll-list-wrap {
    padding-top: 99px;
    height: calc(100vh - 99px);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
}

header {
    position: relative;
    background: #FFFFFF;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #444444;
    // padding-bottom: 5px;
    font-weight: 500;
    .cubeic-back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
    }
}
.phoneRecord{
  background: #F5F5F5;
}

.gold-bnt-info{
  background: #ddd;
  text-align: left;
  padding: 0 14px;
  color: #000;
  font-size: 12px;
  overflow: hidden;
  transition: 0.2s;
  height: 0;
  position: relative;
  .backMoney{
    position: absolute;
    bottom: 10px;
    right: 12px;
    font-size: 14px;
  }
  p{
    line-height: 28px;
    &:first-of-type{
      margin-top: 8px;
    }
    &:last-child{
      margin-bottom: 8px;
    }
  }

  .total{
      position: absolute;
      bottom: 6px;
      right: 14px;
      font-size: 15px;
  }
}
.gold-bnt{
    background: #373C48;
    border-radius: 0 0 5px 5px;
    font-size: 15px;
    text-align: center;
    padding: 0;
    display: inherit;
    color: #fff;
    line-height: 44px;
    padding-top:5px;
}
.moreIcon{
    display: inline-block;
    transition: 0.1s;
    width: 20px;
    height:20px;
    background-image: url("../../../common/images/more.png");
    transform:rotate(180deg);
    transition: 0.2s;
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
