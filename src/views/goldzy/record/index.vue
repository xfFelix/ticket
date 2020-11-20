<template>
    <div class="oilRecord">
        <div class="headFixed">
            <header class="navbar">
                <i class="cubeic-back" @click="$router.back()"></i>
                兑换记录
            </header>
            <div class="whoSelectW">
                <li v-for="(item,index) in list" :key="index" :class="typeFlag==item.index?'whoSelectLogo':''" @click="typeCharge(item.index)">
                  {{item.name}}
                </li>

            </div>
        </div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                            <span v-if="item.code" class="text-bold">提货码：
                              <span class="reCode">{{item.code.length>15?item.code.substring(item.code.length-15):item.code}}</span>
                              <em class="see" @click="dialogPwd(item.id)" >查看</em>
                            </span>
                            <span v-else class="text-bold">提货码：— —</span>

                            <div v-if="item.buyInfo" style="color:#D5A96E;font-weight:bold">
                                <span class="text-bold">兑换成功</span>
                                <!-- <span v-if="item.buyInfo.status==1">提货成功</span>
                                <span v-else-if="item.buyInfo.status==2">提货取消</span>
                                <span v-else>提货中</span> -->
                            </div>
                            <div v-else style="color:#D5A96E;font-weight:bold">
                                <span class="text-bold">兑换成功</span>
                                <!-- <span v-if="item.status==0">兑换中</span>
                                <span v-if="item.status==1">兑换成功</span>
                                <span v-if="item.status==2">兑换失败</span> -->
                            </div>
                        </div>
                        <div class="reInfoW">
                            <div class="reInfo">
                                <p>兑换时间：{{item.addDate}}</p>
                                <div class="reInfoDetail">
                                  <li class="top">
                                    <span>数量</span>
                                    <span>黄金价格</span>
                                    <span>平台服务费</span>
                                    <span>交易手续费</span>
                                    <span>税费</span>
                                  </li>
                                  <li class="bottom">
                                    <span>
                                      <span class="span-special">{{item.weight}}克,</span>
                                      <span class="span-special">{{(item.gtype==0 || item.gtype==3)?'金条':'金砂'}}</span>
                                    </span>
                                    <span>{{item.repaymentAmount|toPrice}}</span>
                                    <span>{{item.serviceFee|toPrice}}</span>
                                    <span>{{item.transactionFee|toPrice}}</span>
                                    <span>{{item.taxFee|toPrice}}</span>
                                  </li>
                                </div>
                                <div class="totalW">
                                  <p class="preferentialFee" v-if="item.preferentialFee">优惠费用：<span style="color:#FF6600">-{{item.preferentialFee|toPrice}}</span></p>
                                  <p class="total">合计：{{item.totalAmount|toPrice}}</p>
                                </div>

                            </div>
                            <div class="recover"  @click="recovery(item.price,item.id,item.gtype,item.code,item.weight)"
                              v-if="(item.code && (item.buyInfo == null))">
                                立即提货
                            </div>
                            <div v-if="(item.buyInfo != null && item.buyInfo && item.buyInfo.type==0)">
                              <div class="buyInfoW">
                                <div class="buyInfo-item"><span>提货折损：{{(item.buyInfo.orderNum)|toPrice}}</span><span class="buyInfo-tips" v-if="item.buyInfo.status !=1 && item.buyInfo.status !=2">回购中，预计2小时内到账</span></div>
                                <div class="buyInfo-item"><span>提货金额：{{(item.buyInfo.buyMoney)|toPrice}}元</span><div class="arrow" @click="transClick(item,index)"><span class="buyInfo-detail">提货详情</span><span :class="item.statusT?'top-arrow':'bottom-arrow'"></span></div></div>
                                <div class="buyInfo-icon" :class="[{'buyInfo-icon-s':item.buyInfo.status==1},{'buyInfo-icon-c':item.buyInfo.status==2}]">
                                </div>
                              </div>
                              <div class="gold-bnt-info"  :style="item.statusT?'display:block':'display:none'">
                                <p>提货时间：{{item.buyInfo.addDate}}</p>
                                <p v-if="item.buyInfo.buybackType==0">银行卡号：{{item.buyInfo.cardNum}}</p>
                                <p v-else>支付宝账号：{{item.buyInfo.alipayAccount}}</p>
                                <p v-if="item.buyInfo.buybackType==0">开户行：{{item.buyInfo.bank}}</p>
                                <p>姓名：{{item.buyInfo.buybackType==0?item.buyInfo.name:item.buyInfo.alipayName}}</p>
                              </div>

                            </div>
                            <!-- 黄金实物提取 -->
                            <div v-if="(item.buyInfo != null && item.buyInfo && item.buyInfo.type==1)">
                              <div class="buyInfoW">
                                <div class="buyInfo-item"><span>获取黄金：{{(item.buyInfo.weight)|toPrice}}克</span><span class="buyInfo-tips" v-if="item.buyInfo.status ==8">获取实物中</span></div>
                                <div class="buyInfo-item-gold" ><div class="arrow" @click="transClick(item,index)" style="text-align: right"><span class="buyInfo-detail">收货详情</span><span :class="item.statusT?'top-arrow':'bottom-arrow'"></span></div></div>
                                <div class="buyInfo-icon" :class="[{'buyInfo-icon-g':item.buyInfo.status==9}]"></div>
                              </div>
                              <div class="gold-bnt-info"  :style="item.statusT?'display:block':'display:none'">
                                <p>获取黄金申请时间：{{item.buyInfo.addDate}}</p>
                                <p>收货人：{{item.buyInfo.name}}</p>
                                <p>联系方式：{{item.buyInfo.mobile}}</p>
                                <p>收货地址：{{item.buyInfo.address}}</p>
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
import { goldLog,jygoldPrice } from 'api';
import { mapGetters ,mapActions } from 'vuex';
import { vipCustom } from '@/mixins';
import clip from 'util/clipboard';
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
        btnDisabledCode: false,
        time: 0,
        code: '',
        list: [
          {
            name: '全部',
            index: 0,
          },
          {
            name: '待提货',
            index: 1,
          },
          {
            name: '提货中',
            index: 2,
          },
          {
            name: '已完成',
            index: 3,
          },
        ],
        detailInfoShow: false
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
                    noMore: this.pullUpLoadNoMoreTxt
                }
            } : false
        },
        ...mapGetters({
            getToken: 'getToken',
            userinfo: 'getUserinfo',
            goldConfig: 'gold/getConfig',
        }),
    },
    methods: {
       ...mapActions({
          backInfo: 'gold/setBackInfo',
          initConfig:'gold/initConfig'
        }),
        transClick(item,index){
            this.recodeList[index].statusT = !item.statusT;
        },
        initData() {
          this.start=0;
          this.recodeList = [];
          this.tenFlag = true
        },
        typeCharge (index) {
          this.typeFlag = index;
          this.initData()
          this.getScenicList();
        },
        // directCharge() {
        //     this.typeFlag = 0;
        //     this.initData();
        //     this.getScenicList();
        //     this.getPrice()
        // },
        // cardCharge() {
        //     this.typeFlag = 1;
        //     this.initData();
        //     this.getScenicList();
        //     this.getPrice()
        // },
        async getPrice(gtype) {
          let res = await jygoldPrice({ id: gtype });
          if(res.error_code!=0) return this.$toast(res.message);
          this.goldPrice = res.data.goldPrice;
          if(gtype==0){
            this.backInfo({barPrice: this.goldPrice})
          }else{
            this.backInfo({sandPrice: this.goldPrice});
          }
        },
        async getScenicList() {
            let data = await goldLog({
              token: this.getToken,
              id: this.typeFlag,
              start: this.start,
            });
            if (data.error_code != 0) {
              return this.$toast(data.message);
            }
            data.data.forEach(item=> {    //提货信息显示
              item.statusT = false;
            })
            this.recodeList.push(...data.data);
            if (data.data.length < 10) {
                this.tenFlag = false;
            }
        },
        dialogPwd(id) {
          this.$createDialog({
            type: 'alert',
            confirmBtn: {
              text: '提交',
              active: true
            },
            onConfirm: () => { this.handerConfirm(id) },
            showClose: true,
            onClose: () => {}
          }, (h) => {
            if (this.userinfo.payValidType === 1) {
              return [
                h('div', { class: { 'title-wrapper': true }, slot: 'title' }, [h('p',{ class: { text: true }}, '请输入支付密码')]),
                h('div', { class: { 'content-wrapper': true }, slot: 'content' }, [h('cube-input', { class: { 'input-code': true }, attrs: {type: 'password', eye: {reverse: false, open : false} , autofocus: true, maxlength: 6, placeholder: '请输入支付密码' , pattern: '[0-9]*', value: this.code},
                  on: { input: (val) => { this.code = val.trim() }}
                })])
              ]
            } else {
              return [
                h('div', { class: { 'title-wrapper': true }, slot: 'title' }, [h('p',{ class: { text: true }}, '请输入验证码')]),
                h('div', { class: { 'content-wrapper': true }, slot: 'content' },
                [
                  h('cube-input', { class: { 'input-code': true }, attrs: {type: 'tel', autofocus: true, maxlength: 4, placeholder: '请输入验证码' , pattern: '[0-9]*', value: this.code},
                    on: { input: (val) => { this.code = val.trim() }}
                  }),
                  h('button', { class:{ 'sms-code': true }, on: { click: this.handlerSendCode }, attrs: { disabled: this.btnDisabledCode } }, this.time > 0? this.time + 's': '发送验证码')
                ])
              ]
            }
          }).show()
        },
        async handlerSendCode() {
          const { sendSmsCode } = await import(/* webpackPrefetch: true */ 'api')
          const { error_code, data, message } = await sendSmsCode({token: this.getToken})
          if (error_code) return this.$toast(message)
          this.$toast('验证码已发送')
          this.btnDisabledCode = true;
          this.time = 60;
          this.interval = window.setInterval(() => {
            if (this.time > 0) {
              this.time--
            } else {
              this.btnDisabledCode = false
              window.clearInterval(this.interval)
            }
          }, 1000)
        },
        async handerConfirm(id) {
          if (!this.code) return this.$toast('请输入数字')
          const { goldCode } = await import(/* webpackPrefetch: true */ 'api')
          const { error_code , data, message } = await goldCode({ token: this.getToken, verify_code: this.code, id: id})
          if (error_code != 0) return this.$toast(message)
          this.code = ''
          this.$dialog({type:'confirm',content: data,title:'您的黄金兑换码是：',confirmBtn:{text:'复制'}},($event) => {
              this.handleCopy(data,$event)
          })
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
        recovery(price,id,gtype,code,weight) {
          let vm = this
          if(gtype == 0) {
            this.getPrice(0)
            this.backInfo({cardId:id,cardCode:code,type:gtype,weight:weight})
          }
          if(gtype == 1) {
            this.getPrice(1)
            this.backInfo({cardId:id,cardCode:code,type:gtype,weight:weight})
          }
          if(gtype==0 || gtype==1) {
            this.$router.push({name:"goldJyBuyBack"})
          }else {
            let href = window.location.origin
            // this.$router.push({name:'goldGsBuyBack',query:{id:id,gtype:gtype,token:this.getToken}})
            if(href == 'https://tmall.cocogc.cn') {
              window.location.href = href+'/ticket/gold/buyBackGs?id='+id+'&gtype='+gtype+'&token='+this.getToken+'&fromType=cocogc'
            }else {
              window.location.href = 'https://t.xiyuma.net/ticket/gold/buyBackGs?id='+id+'&gtype='+gtype+'&token='+this.getToken+'&fromType=cocogc'
            }
          }
        },
        handleCopy(text, event) {
          clip(text, event)
        },
    },
    mounted() {
      // if(this.$route.query.cardId==3){
      //   this.typeFlag = 0;
      // }
      // if(this.$route.query.cardId==4){
      //   this.typeFlag = 1;
      // }
      this.getScenicList();
      // this.getPrice();
      this.initConfig();
    }
}
</script>

<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.whoSelectW {
    padding-left: 16px;
    height: 46px;
    line-height: 46px;
    background: #fff;
    li {
      display: inline-block;
      margin-right: 30px;
      font-size: 14px;
      color: rgba($color: #000000, $alpha: 0.4);
    }
    .whoSelectLogo {
      position: relative;
      color: #444444;
      font-weight: bold;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 8px;
        margin-left: -8px;
        width: 16px;
        height: 3px;
        border-radius: 3px;
        background: #444444;
      }
    }
    // p{
    //     width: 50%;
    //     text-align: center;
    //     color: #fff;
    //     height: 100%;
    //     font-size: 15px;
    //     display: inline-block;
    //     span{
    //         height: 34px;
    //         width: 110px;
    //         display: inline-block;
    //         text-align: center;
    //     }
    //     &:nth-of-type(2){
    //       &::before{
    //         color: #b1b1b1;
    //         font-size: 18px;
    //         content: '';
    //         display: inline-block;
    //         width: 1px;
    //         height: 22px;
    //         background: #fff;
    //         float: left;
    //       }
    //     }
    // }

}

.recordW {
    li {
        // border: 1px solid #DEDEDE;
        padding-bottom: 16px;
        padding-top: 5px;
        background: #fff;
        border-radius: 10px;
        margin: 12px 16px;
        font-size: 13px;
        box-sizing: border-box;
        .reName {
          background: transparent;
          line-height: 44px;
          color: rgb(74, 74, 74);
          padding: 0 16px;
          font-size: 15px;
          .text-bold {
            font-weight: bold;
          }
          .reCode {
            font-size: PingFangSC-Semibold;
            font-weight: bold;
          }
          .see{
              margin-left: 12px;
              padding: 2px 6px;
              color: #fff;
              font-size: 12px;
              background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
              border-radius: 11px;
          }
        }
        .reInfoW {
            // background: #F4F4F4;
            color: rgb(74, 74, 74);
            .reInfo {
              padding: 0 10px 20px 10px;
                p {
                    padding:0 6px;
                    font-size: 12px;
                    color: rgba($color: #000000, $alpha: 0.4);
                }
                .reInfoDetail {
                  margin-top: 10px;
                  li {
                    margin: 0;
                    height: 38px;
                    padding-bottom: 0;
                    border-left: 1px solid #DEDEDE;
                    border-right: 1px solid #DEDEDE;
                    display: flex;
                    align-items: center;
                    span {
                      display: inline-block;
                      height: 38px;
                      line-height: 38px;
                      width: 63px;
                      font-size: 12px;
                      color: rgba($color: #000000, $alpha: 0.6);
                      text-align: center;
                      border-right: 1px solid #DEDEDE;
                      // box-sizing: border-box;
                      &:last-child {
                        border-right: none;
                      }
                    }
                  }
                  .top {
                    background: #F5F5F5;
                    border-radius: 0px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    border-top: 1px solid #DEDEDE;
                    border-bottom: 1px solid #DEDEDE;
                    padding-top: 0 !important;
                  }
                  .bottom {
                    border-radius: 0px;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border-bottom: 1px solid #DEDEDE;
                    padding-top: 0 !important;
                    span {
                      .span-special {
                        display: block;
                        height: 19px;
                        line-height: 19px;
                      }
                    }
                  }
                }
                .totalW {
                  margin-top: 16px;
                  position: relative;
                  height: 20px;
                  // margin-left: auto;
                  // margin-right: 0;
                  // text-align: right;
                  .preferentialFee {
                    position: absolute;
                    right: 120px;
                  }
                  .total{
                    position: absolute;
                    right: 0;
                    display: inline-block;
                    font-family: PingFangSC-Semibold;
                    // text-align: right;
                    font-size: 14px;
                    color: #D5A96E;
                  }
                }

            }
            .recover{
              margin: 0 16px;
              // width: 100%;
              // background: #30CE84;
              color: #fff;
              text-align: center;
              line-height: 40px;
              background: linear-gradient(180deg, #EACCA2 0%, #D3A668 100%);
              border-radius: 5px;
              letter-spacing: 1px;
              font-weight: bold;
              font-size: 16px;
              // border-radius:0px 0px 5px 5px; /*no*/
              // font-size: 14px;
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
    box-shadow: 0px 2px 10px 0px rgba(220,220,220,0.6);
    .navbar {
      font-weight: bold !important;
      font-size: 16px;
      color: #000;
    }
}

.scroll-list-wrap {
    padding-top: 95px;
    height: calc(100vh - 95px);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
}

header {
    position: relative;
    background: #ffffff;
    line-height: 46px;
    text-align: center;
    font-size: 18px;
    color: #444444;
    // padding-bottom: 5px;
    .cubeic-back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
    }
}
.oilRecord{
  background: #F5F5F5;
}
.buyInfoW {
  position: relative;
  padding: 0 16px;
  margin-top: 10px;
  .buyInfo-icon {
    position: absolute;
    top: -30px;
    right: -16px;
    width: 60px;
    height: 60px;
    background-size: 100% 100%;
  }
  .buyInfo-icon-s {
    background-image: url('../../../common/images/gold-hd/goldback-1.png');
  }
  .buyInfo-icon-c {
    background-image: url('../../../common/images/gold-hd/goldback-2.png');
  }
  .buyInfo-icon-g {
    background-image: url('../../../common/images/gold-hd/shiwu-success.png');
  }
  .buyInfo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    font-size: 14px;
    color: #444444;
    .buyInfo-tips {
      font-size: 12px;
      color: #FF6600;
    }
    .arrow {
        margin-left: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .buyInfo-detail {
          margin-right: 16px;
          font-size: 12px;
          color: $theme;
        }
        span {
          display: inline-block;
        }
        .top-arrow {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 6px;
          height: 6px;
          border-top: 2px solid $theme;
          border-right: 2px solid $theme;
          transform: rotate(-45deg);
        }
        .bottom-arrow {
          position: absolute;
          top: 2px;
          right: 1px;
          width: 6px;
          height: 6px;
          border-top: 2px solid $theme;
          border-right: 2px solid $theme;
          transform: rotate(135deg);
        }
      }

  }
  .buyInfo-item-gold {
    margin-top: 6px;
    .arrow {
        position: relative;
        .buyInfo-detail {
          margin-right: 16px;
          font-size: 12px;
          color: $theme;
        }
        span {
          display: inline-block;
        }
        .top-arrow {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 6px;
          height: 6px;
          border-top: 2px solid $theme;
          border-right: 2px solid $theme;
          transform: rotate(-45deg);
        }
        .bottom-arrow {
          position: absolute;
          top: 2px;
          right: 1px;
          width: 6px;
          height: 6px;
          border-top: 2px solid $theme;
          border-right: 2px solid $theme;
          transform: rotate(135deg);
        }
      }
  }
}
.gold-bnt-info{
  background: #ffffff;
  text-align: left;
  padding: 0 14px;
  padding-top: 10px;
  color: rgba($color: #000000, $alpha: 0.4);
  font-size: 12px;
  overflow: hidden;
  transition: 0.2s;
  position: relative;
  .backMoney{
    position: absolute;
    bottom: 10px;
    right: 12px;
    font-size: 14px;
  }
  p{
    line-height: 22px;
    &:first-of-type{
      margin-top: 8px;
    }
    &:last-child{
      // margin-bottom: 8px;
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
