<template>
    <div class="oilRecord">
        <div class="headFixed">
            <header>
                <i class="cubeic-back" @click="$route.query.go=='cocogc'?$router.back():$router.push({name:'oilHome'})"></i>
                兑换记录
            </header>
            <div class="whoSelectW">
                <p :class="changeFlag?'whoSelectLogo':''" @click="directCharge()">
                    <span>直充</span>
                    <span></span>
                </p>
                <span class="divide">|</span>
                <p :class="changeFlag?'':'whoSelectLogo'">
                    <span @click="cardCharge()">充值卡</span>
                    <span></span>
                </p>
            </div>
        </div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                            <span>产品名称:{{item.cardUser}}</span>
                            <div>
                                <span v-if="item.status==0">{{changeFlag? '兑换中': '兑换成功'}}</span>
                                <span v-else-if="item.status==1">{{changeFlag? '兑换成功': '已回收'}}</span>
                                <span v-else-if="item.status==2">{{changeFlag? '兑换失败': '回收失败'}}</span>
                                <span v-else-if="item.status==3">回收中</span>
                                <span v-else-if="item.status==4">兑换失败</span>
                            </div>
                            <!-- <div v-else>
                                <span v-if="item.status==0">已售出</span>
                                <span v-else-if="item.status == 1">已回购</span>
                            </div> -->
                        </div>

                        <div class="reInfoW">
                            <div class="reInfo">
                                <p>
                                    <span>订单编号：</span>
                                    <span>{{item.idUrl}}</span>
                                </p>
                                <p>
                                    <span>时间：</span>
                                    <span>{{item.orderTime}}</span>
                                </p>
                                <p v-if="changeFlag">
                                    <span>充值账号：</span>
                                    <span>{{item.cardNum}}</span>
                                </p>
                                <p v-if="!changeFlag">
                                    <span>卡号：</span>
                                    <span>{{item.idBackUrl}}</span>
                                </p>
                                <p v-if="!changeFlag">
                                    <span>卡密：</span>
                                    <span>{{item.memo}} <em class="see" @click="dialogPwd(item.idUrl)">查看</em></span>
                                </p>
                                <!-- <p>
                                    <span>售价：</span>
                                    <span>{{item.orderNum|toPrice}}</span>
                                </p> -->
                                <p>
                                    <span>服务费：</span>
                                    <span>{{item.serviceFee|toPrice}}</span>
                                </p>
                                <p class="total">
                                    <span>合计：</span>
                                    <span>{{item.totalAmount|toPrice}}</span>
                                </p>
                                <p>
                                    <span>税费：</span>
                                    <span>{{item.taxFee|toPrice}}</span>
                                </p>
                                <p v-if="item.preferentialFee">
                                    <span>优惠费用：</span>
                                    <span style="color:#FF6600">-{{item.preferentialFee|toPrice}}</span>
                                </p>

                            </div>
                            <!-- 项目需求隐藏立即回收功能 -->
                            <!-- <div class="recover" v-if="!changeFlag" @click="recovery(item.id,item.status)" :class="item.status==0?'recoverCan':'recoverNo'">
                                立即回收
                            </div> -->
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
        pullUpLoadNoMoreTxt: '没有更多数据了~~',
        pageSize: 10,
        tenFlag: true,
        pageNum: 1,
        btnDisabledCode: false,
        time: 0,
        code: ''
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
        offset() {
            return (this.pageNum - 1) * this.pageSize + 1;
        },
        ...mapGetters({
            getToken: 'getToken',
            userinfo: 'getUserinfo'
        }),
    },
    methods: {
        initData() {
            this.pageNum = 1;
            this.recodeList = [];
            this.tenFlag = true
        },
        directCharge() {
            this.changeFlag = 1;
            this.typeFlag = 1
            this.initData();
            this.getScenicList();
        },
        cardCharge() {
            this.changeFlag = 0;
            this.typeFlag = 2;
            this.initData();
            this.getScenicList();
        },
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
            this.recodeList.push(...data.data);
            if (data.data.length < 10) {
                this.tenFlag = false;
            }
            this.pageNum++
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
                h('div', { class: { 'content-wrapper': true }, slot: 'content' }, [h('cube-input', { class: { 'input-code': true }, attrs: {type: 'password', eye: {open: true, reverse: true} , autofocus: true, maxlength: 6, placeholder: '请输入验证码' , pattern: '[0-9]*'},
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
          this.btnDisabledCode = true
          this.time = 60
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
          const { getPayPassword } = await import(/* webpackPrefetch: true */ 'api')
          const { code, data, message } = await getPayPassword({ token: this.getToken, code: this.code, orderNo: id})
          this.code = ''
          if (code !== '1') return this.$toast(message)
          this.$dialog({content: `卡密:${data}`},() => {})
        },
        onPullingUp() {
            if (this.tenFlag === true) {
                this.getScenicList();
            }

            if (!this.tenFlag && this.recodeList.length > 0) {
                this.$refs.scroll.forceUpdate();
            }
        },
        recovery(id, status) {
            if (status == 0) {
                this.$router.push({ path: '/oil/oilRecovery', query: { id: id } })
            }
        }
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

.whoSelectW {
    display: flex;
    justify-content: space-around;
    height: 30px;
    align-items: center;
    background: #373C48;
    P {
        width: 90px;
        text-align: center;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        font-size: 15px;
        span:first-of-type {
            margin-bottom: 5px;
        }
        span:last-of-type {
            width: 100%;
            height: 2px;
            display: block;
        }
    }
    .whoSelectLogo {
        color: #30CE84;
        span:last-of-type {
            background: #30CE84;
        }
    }
    .divide {
        color: #b1b1b1;
        font-size: 18px;
    }
}

.recordW {
    li {
        border: 1px solid #DEDEDE;
        background: #fff;
        border-radius: 5px;
        margin: 20px 15px;
        font-size: 13px;
        box-sizing: border-box;
        .reName {
          background: transparent;
          line-height: 44px;
          font-size: 15px;
          color: rgb(74, 74, 74);
          padding: 0 10px;
        }
        .reInfoW {
            background: #F4F4F4;
            color: rgb(74, 74, 74);
            .reInfo {
              padding: 0 10px;
              position: relative;
                p {
                    font-size: 12px;
                    padding-top: 15px;
                    &:last-of-type{
                      padding-bottom: 15px;
                    }
                    span{
                      &:last-of-type{
                        margin-left: 5px;
                      }
                      .see{
                        color: #30CE84;
                        text-decoration: underline;
                        margin-left: 10px;
                      }
                    }
                }
                .total{
                  position: absolute;
                  bottom: 15px;
                  right: 10px;
                  font-size: 15px;
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
    background: #373C48;
}

.scroll-list-wrap {
    padding-top: 80px;
    height: calc(100vh - 80px);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
}

header {
    position: relative;
    background: #373C48;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    padding-bottom: 5px;
    .cubeic-back {
        position: absolute;
        left: 18px;
    }
}
.oilRecord{
  background: #fff;
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
