<template>
  <div class="oil-type">
    <div class="select-type">
      <li class="item" v-for="(item,index) in typeList" :key="item.value" @click="handerShowInfo(index,item.value)" :class="[{'active':otype==index}]">
        {{item.label}}
      </li>
    </div>
    <div class="oil-card">
      <img v-if="otype==0" src="@/common/images/oil/zhongshihua.png" alt="">
      <img v-else src="@/common/images/oil/zhongshiyou.png" alt="">
    </div>
    <div class="oil-inputW">
      <div class="oil-input">
        <div class="item">
          <div class="left">
            <img src="@/common/images/oil/icon_phone.png" alt="">
          </div>
          <div class="right">
            <p class="oil-phone"><span class="phone">手机号</span><span class="record" @click="$router.push({name: 'oilRecordC'})">充值记录</span></p>
            <div class="phoneBill-inpW">
              <input type="tel" pattern="\d*" class="phoneBill-inp" :class="[isAndroid?'Android-phone':'']" @click="inputClick($event)" @blur="checkMobile" maxlength="11" placeholder="请输入手机号码" v-model="mobile"/>
              <div v-if="mobile" class="close" @click="mobile=''"></div>
            </div>
            <div class="tips">{{failtextP}}</div>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <img src="@/common/images/oil/icon_card.png" alt="">
          </div>
          <div class="right">
            <p class="oil-phone"><span class="phone">加油卡</span></p>
            <div class="phoneBill-inpW">
              <input v-if="otype==0" type="tel" pattern="\d*" class="phoneBill-inp" :class="[isAndroid?'Android-phone':'']" @blur="checkCardNum" @click="inputClick($event)" maxlength="19" placeholder="请输入以1开头的19位加油卡号" v-model="cardNum"/>
              <input v-else type="tel" pattern="\d*" class="phoneBill-inp" :class="[isAndroid?'Android-phone':'']" @blur="checkCardNum" @click="inputClick($event)" maxlength="16" placeholder="请输入以9开头的16位加油卡号" v-model="cardNum"/>
              <div v-if="cardNum" class="close" @click="cardNum=''"></div>
            </div>
            <div class="tips">{{failtextC}}</div>
            <div class="notice">请仔细核对卡号，避免造成不必要的损失</div>
          </div>
        </div>
      </div>
    </div>
    <div class="face-valueW">
      <div class="title">充值面额</div>
      <div class="face-value">
        <li v-for="(item,index) in ListInfo" :key="index" :class="[{'active': index==checkValue}]" @click="changeValue(item,index)">
          <p class="price">{{item.faceValue}}</p>
          <p class="score">需积分{{item.total | toPrice}}</p>
        </li>
      </div>
    </div>
    <explanation></explanation>
    <div class="contact" @click="contact">
      <img src="@/common/images/phone/service-icon.png">
      <p>联系我们</p>
    </div>
  </div>
</template>
<script>
import {getCostInfo} from 'api';
import { mapGetters } from 'vuex';
import { IsChinaMobile, IsZhongshihua, IsZhongshiyou,IsInteger,isEmpty } from "util/common";
export default {
  props: {
    // failtextP: {
    //   type: String,
    //   default: ""
    // },
    // failtextC:{
    //   type: String,
    //   default: ""
    // }
  },
  data: () => ({
    otype: 0,
    list: [
      {value: 100, sell: 101},
      {value: 200, sell: 201},
      {value: 500, sell: 501},
      {value: 1000, sell: 1001},
    ],
    checkValue: 0,
    mobile: "",
    cardNum: "",
    isAndroid: false,
    disabledM: false,
    disabledC: false,
    ListInfo: [],
    failtextP: "",
    failtextC: ""
  }),
  watch: {
    mobile(val){
      if(val) {
        this.disabledM = true
        if(this.disabledC) {
          this.$emit("handle-value",true)
        }
      }else {
        this.disabledM = false
        this.$emit("handle-value",false)
      }
    },
    cardNum(val) {
      if(val) {
        this.disabledC = true
        if(this.disabledM) {
          this.$emit("handle-value",true)
        }
      }else {
        this.disabledC = false
        this.$emit("handle-value",false)
      }
    }
  },
  computed: {
    ...mapGetters({
      typeList: 'oil/getTypeList',
      config: 'oil/getConfig',
      getToken: 'getToken',
    })
  },
  methods: {
    handerShowInfo(index,val) {
      this.failtextP = ""
      this.failtextC = ""
      this.cardNum = ""
      this.otype = index
      this.$store.dispatch('oil/setConfig', {type: val})
      this.getListInfo()
    },
    changeValue(item,index) {
      this.checkValue = index
      this.$store.dispatch('oil/setConfig', {faceValue: item.faceValue})
      this.getCostInfo()
    },
    inputClick(e) {
        e.target.focus();
    },
    cleanInput() {
      this.mobile = ''
    },
    contact () {
      window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
    },
    //
    sendValue() {
      this.checkMobile()
      this.checkCardNum()
      let obj = {}
      obj.mobile = this.mobile
      obj.cardNum = this.cardNum
      this.$emit("oil-input",obj)
    },
    async getCostInfo() {
      const {faceValue, type, rechargeType} = this.config
      let res = await getCostInfo({faceValue, type, token: this.getToken, rechargeType})
      if (res.code !== '1' && res.code !== '6' && res.code !== '4') return this.$toast(res.message)
      this.data = res.data[0]
      if (res.code === '4') {
        this.$store.dispatch('oil/setConfig', {total: this.data.total,monthTotal: this.data.monthTotal})
      }
      this.$store.dispatch('oil/setConfig', {total: this.data.total,monthTotal: this.data.monthTotal})
    },
    // 获取列表数据
    async getListInfo() {
      const {type, rechargeType} = this.config
      let faceValue = "100,200,500,1000"
      let res = await getCostInfo({faceValue: faceValue, type, token: this.getToken, rechargeType})
      if (res.code !== '1' && res.code !== '6' && res.code !== '4') return this.$toast(res.message)
      this.ListInfo = res.data
      if (res.code === '4') {
        this.$store.dispatch('oil/setConfig', {total: this.ListInfo[0].total,monthTotal: this.ListInfo[0].monthTotal})
      }
      this.$store.dispatch('oil/setConfig', {total: this.ListInfo[0].total,monthTotal: this.ListInfo[0].monthTotal})
    },
    checkMobile() {
      if(!IsChinaMobile(this.mobile)) {
        this.failtextP = "请输入正确的手机号"
        return false
      }else {
        this.failtextP = ""
      }
    },
    checkCardNum() {
      if(this.config.type == 1) {
        if(!IsZhongshihua(this.cardNum)) {
          this.failtextC = "请输入以1开头的19位加油卡号"
          return false
        }else {
          this.failtextC = ""
        }
      }else {
        if(!IsZhongshiyou(this.cardNum)) {
          this.failtextC = "请输入以9开头的16位加油卡号"
          return false
        }else {
          this.failtextC = ""
        }
      }
    }
  },
  components: {
    explanation: () => import (/* webpackPrefetch: true */ './explanation')
  },
  created() {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if(isAndroid) {
      this.isAndroid= true
    }
    this.getListInfo()
  }
}
</script>
<style lang="scss" scoped>
.oil-type {
  padding-top: 46px;
  .select-type {
    padding: 16px 60px 28px;
    display: flex;
    justify-content: space-between;
    .item {
      font-size: 20px;
      color: rgba($color: #1A1A1A, $alpha: 0.4);
    }
    .active {
      position: relative;
      font-weight: bold;
      color: #1A1A1A;
      &::after {
        position: absolute;
        top: 36px;
        left: 50%;
        margin-left: -12px;
        width: 24px;
        height: 4px;
        border-radius: 2px;
        background: #1DA1FF;
        content: "";
      }
    }
  }
  .oil-card {
    padding: 0 16px;
    img {
      width: 100%;
      height: 120px;
    }
  }
  .oil-inputW {
    margin-top: 12px;
    padding: 0 16px;
    .oil-input {
      padding: 20px 16px;
      background: #fff;
      border-radius: 10px;
      .item {
        display: flex;
        .left {
          width: 20px;
          padding-top: 2px;
          img {
            width: 20px;
            height: 20px;
          }
        }
        .right {
          margin-left: 6px;
          flex: 1;
          .oil-phone {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .phone {
              font-size: 16px;
              color: #1A1A1A;
            }
            .record {
              width: 68px;
              height: 22px;
              line-height: 24px;
              text-align: center;
              border: 1px solid #1DA1FF;
              border-radius: 12px;
              color: #1DA1FF;
            }
          }
          .phoneBill-inpW {
            position: relative;
            margin-top: 6px;
            height: 35px;
            font-size: 0;
            border-bottom: 1px solid #E5E5E5;
            .phoneBill-inp {
              width: 100%;
              color: #1A1A1A;
              font-size: 24px;
              font-weight: bold;
              font-family: PingFangSC-Semibold;
              letter-spacing: -2px;
            }
            .phoneBill-inp::placeholder {
              font-size: 18px;
              color: rgba($color: #000000, $alpha: 0.1);
            }
            .Android-phone {
              letter-spacing: -1px;
            }
            .close {
              position: absolute;
              top: 4px;
              right: 0;
              display: block;
              width: 20px;
              height: 20px;
              background-image: url(../../../../common/images/oil/icon_close.png);
              background-size: 100% 100%;
            }
          }
          .tips {
            // padding: 5px 0;
            height: 22px;
            min-height: 22px;
            line-height: 24px;
            font-size: 12px;
            color: #FF6600;
            box-sizing: border-box;
          }
          .notice {
            font-size: 12px;
            color: #21D398;
          }
        }
      }
    }
  }
  .face-valueW {
    margin-top: 36px;
    padding: 0 16px;
    .title {
      margin-bottom: 6px;
      font-size: 20px;
      color: #1A1A1A;
      font-weight: bold;
      font-family: PingFangSC-Semibold;
    }
    li {
      display: inline-block;
      margin-top: 8px;
      padding-left: 16px;
      padding-top: 10px;
      width: 168px;
      height: 72px;
      border: 1px solid #1DA1FF;
      border-radius: 10px;
      box-sizing: border-box;
      background: #fff;
      &:nth-child(2n+1) {
        margin-right: 7px;
      }
      .price {
        font-size: 24px;
        font-family: DINPro-Bold;
        color:#1A1A1A;
        font-weight: bold;
      }
      .score {
        margin-top: -4px;
        font-size: 14px;
        color: #646464;
        letter-spacing: 1px;
      }
      &.active {
        background: linear-gradient(270deg, #1E86FA 0%, #1DA1FF 100%);
        .price {
          color: #fff;
        }
        .score {
          color: #fff;
        }
      }
    }
  }
  .contact {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px 0;
    p {
      font-size:14px;
      color:#646464;
      text-align: center;
    }
    img {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
  }
}
</style>
