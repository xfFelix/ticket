<template>
  <div class="oilRecovery">
    <header>
      <i class="cubeic-back" @click="$router.back()"></i>
      回收申请
    </header>

    <!-- <div class="whoSelectW">
      <p :class="selfFlag?'whoSelectLogo':''" @click="self()">
        <span>本人</span>
        <span></span>
      </p>
      <span class="divide">|</span>
      <p :class="selfFlag?'':'whoSelectLogo'">
        <span @click="noSelf()">非本人</span>
        <span></span>
      </p>
    </div> -->

    <div class="recoveryInfoW">
      <p class="rMoneyTtiel">回收金额：</p>
      <p class="rMoney">{{selfa.disPrice|toPrice}}</p>
      <ul>
        <li>
          <div class="reFirst">卡号</div>
          <div class="reLast">{{selfa.idBackUrl}}</div>
        </li>
        <li>
          <div class="reFirst">卡密</div>
          <div class="reLast">{{selfa.cardMemo}}</div>
        </li>
        <li>
          <div class="reFirst">姓名</div>
          <!-- <div class="reLast" v-if="selfFlag">{{selfa.payeeName}}</div> -->
          <input type="text" placeholder="填写收款人姓名" v-if="selfFlag" v-model="selfa.payeeName">
          <input type="text" placeholder="填写收款人姓名" v-if="!selfFlag" v-model="noself.payeeName">
        </li>
        <li>
          <div class="reFirst">身份证号码</div>
          <!-- <div class="reLast" v-if="selfFlag">{{selfa.idNum}}</div> -->
          <input type="text" placeholder="填写收款人身份证号码" v-if="selfFlag" v-model="selfa.idNum">
          <input type="text" placeholder="填写收款人身份证号码" v-if="!selfFlag" v-model="noself.idNum">
        </li>
        <li>
          <div class="reFirst">银行卡号</div>
          <div>
            <input v-if="selfFlag" type="number" placeholder="请填写收款银行卡号码" v-model="selfa.bankNum">
            <input v-else type="number" placeholder="请填写收款银行卡号码" v-model="noself.bankNum">
          </div>
        </li>
        <li>
          <div class="reFirst">开户行</div>
          <div @click="showPicker">
            <input type="text" placeholder="请选择开户行" readonly="readonly" :value="selfFlag?selfa.openBank:noself.openBank">
            <span class="iconfont bankSelect">&#xe61e;</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="agreement">
      <!-- <cube-checkbox v-model="checked" position="left" shape="square" :hollow-style="true">
        <span>我已阅读并同意</span>
      </cube-checkbox> -->
      <div class="oil-agreeWrap" @click="checked=!checked">
          <div class="oil-agree">
            <span class="oil-agreeY" v-if="checked"></span>
          </div>
          <span>我已阅读并同意</span>
      </div>
      <span class="file" @click="show.file=true">《加油卡回收协议》</span>
    </div>
    <span class="hint">1个工作日内到账，请耐心等待</span>
    <div class="commitApply" @click="commitApply">提交</div>

    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>

    <!-- <recovery-Info :show="show.info" @handler-show-code="handlerShowCode" @go-back-init="goBackInit" :recoveryListC="recoveryListP" v-if="show.mask"></recovery-Info> -->
    <sms-code :show.sync="show.code" v-if="show.code" @handler-show-success="handlerShowSuccess" @go-back-info="goBackInfo" :recoveryListC="recoveryListP"  @go-back-init="goBackInit" @forget="setForget"></sms-code>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
        <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
        <div slot="btn">联系客服</div>
      </remindDialog>
    <success :show="show.success"></success>
    <agree-file :show="show.file" @handle-show-file="goBackInit"></agree-file>
  </div>
</template>
<script>
const bankList = [
  { text: "邮储银行 " },
  { text: "浦发银行 " },
  { text: "工商银行 " },
  { text: "农业银行 " },
  { text: "中国银行 " },
  { text: "建设银行 " },
  { text: "交通银行 " },
  { text: "中信银行 " },
  { text: "光大银行 " },
  { text: "华夏银行 " },
  { text: "民生银行 " },
  { text: "平安银行 " },
  { text: "招商银行 " },
  { text: "兴业银行 " },
  { text: "上海银行 " },
  { text: "北京银行 " }
];

import { IdentityCodeValid, luhnCheck, isEmpty } from "util/common";
import { toast } from "@/util/toast";
import { priceQuery, getOilOrderDetail } from "api";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    checked: true,
    selfFlag: 1,
    selfa: {
      idBackUrl: "",
      cardMemo: "",
      idNum: "",
      openBank: "",
      bankNum: "",
      payeeName: "",
      cardUser: "",
      orderId: "",
      disPrice: '',
      faceValue: ''
    },
    noself: {
      idBackUrl: "",
      cardMemo: "",
      idNum: "",
      payeeName: "",
      bankNum: "",
      openBank: "",
      cardUser: "",
      orderId: "",
      disPrice: '',
      faceValue: ''
    },
    show: {
      mask: false,
      code: false,
      info: false,
      file: false,
      success: false,
      dialog: false
    },
    recoveryListP: {},
    link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
      linkType: 'href'
  }),
  computed: {
    ...mapGetters({
      getToken: "getToken"
    })
  },
  watch: {
    'show.mask': {
      handler(val) {
        if (!val) {
          this.goBackInit()
        }
      },
      immediate: true
    }
  },
  components: {
    // RecoveryInfo: () => import("./components/RecoveryInfo"),
    BgMask: () => import("components/BgMask"),
    SmsCode: () => import("./components/SmsCode"),
    remindDialog: ()=> import('@/components/remindDialog'),
    AgreeFile: () => import("./components/AgreeFile"),
    Success: () => import(/* webpackPrefetch: true */ './components/Success')
  },
  methods: {
    setForget() {
        this.show = {mask:true,code:false,info: false, file: false, success: false,dialog:true}
      },
    handlerShowCode() {
      this.show = { mask: true, code: true, info: false, file: false, success: false,dialog:false }
    },
    goBackInfo() {
      this.show = { mask: true, code: false, info: true, file: false, success: false ,dialog:false}
    },
    goBackInit() {
      this.show = { mask: false, code: false, info: false, file: false, success: false ,dialog:false}
    },
    handlerShowSuccess() {
      this.show = { mask: true, code: false, info: false, file: false, success: true ,dialog:false}
    },
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "选择开户行",
          data: [bankList],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.picker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.selfFlag
        ? (this.selfa.openBank = selectedText)
        : (this.noself.openBank = selectedText);
    },
    self() {
      this.selfFlag = 1;
    },
    noSelf() {
      this.selfFlag = 0;
    },
    commitApply() {
      if (!this.selfFlag) {
        console.log("非本人");
        if (!this.noself.payeeName) {
          return toast("请输入收款人姓名");
        }
        if (!IdentityCodeValid(this.noself.idNum)) {
          return toast("请输入你的有效身份证号码");
        }
        if (!this.noself.openBank) {
          return toast("请选择开户行");
        }
        if (isEmpty(this.noself.bankNum)) {
          return toast("请输入有效的银行账号");
        }
      } else {
        if (!this.selfa.payeeName) {
          return toast("请输入收款人姓名");
        }
        if (!IdentityCodeValid(this.selfa.idNum)) {
          return toast("请输入你的有效身份证号码");
        }
        if (!this.selfa.openBank) {
          return toast("请选择开户行");
        }
        if (!this.selfa.bankNum) {
          return toast("请输入有效的银行账号");
        }
      }

      if (!this.checked) {
        return toast("您还未同意协议")
      }
      this.handlerShowCode();

      if (this.selfFlag) {
        this.recoveryListP = this.selfa;
      } else {
        this.recoveryListP = this.noself;
      }
    },

    async priceQuery(orderNum) {
      let data = await priceQuery({
        faceValue: orderNum
      });
      if (data.code != 1) {
        return toast(data.message);
      }
      this.selfa.disPrice = this.noself.disPrice = data.data.discount_price;
    },
    async getOilOrderDetail(id) {
      let data = await getOilOrderDetail({
        id: id,
        token: this.getToken
      });
      if (data.code != 1) {
        return toast(data.message);
      }
      this.selfa.idNum = data.data.idNum;
      this.selfa.payeeName = data.data.name;
      this.selfa.idBackUrl = this.noself.idBackUrl = data.data.idBackUrl;
      this.selfa.cardMemo = this.noself.cardMemo = data.data.memo;
      this.selfa.cardUser = this.noself.cardUser = data.data.cardUser;
      this.selfa.orderId = this.noself.orderId = data.data.idUrl;
      this.selfa.faceValue = this.noself.faceValue = data.data.orderNum;
      this.priceQuery(data.data.orderNum);
    }
  },
  mounted() {
    this.getOilOrderDetail(this.$route.query.id);
  }
};
</script>
<style lang="scss" scoped>
.whoSelectW {
  display: flex;
  justify-content: space-around;
  height: 30px;
  align-items: center;
  background: #fff;
  p {
    width: 90px;
    text-align: center;
    color: #000000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    span:first-of-type {
      margin-bottom: 5px;
    }
    span:last-of-type {
      width: 100%;
      height: 2px;
      background: #fff;
      display: block;
    }
  }
  .whoSelectLogo {
    color: #30ce84;
    span:last-of-type {
      background: #30ce84;
    }
  }
  .divide {
    color: #b1b1b1;
    font-size: 18px;
  }
}
.oilRecovery{
  min-height: 100%;
  background: #fff;
  padding-bottom: 44px;
}

.recoveryInfoW {
  padding: 0 18px;
  .rMoneyTtiel {
    text-align: left;
    font-size: 12px;
    color: #4A4A4A;
    margin: 20px 0 13px 0;
  }
  .rMoney {
    text-align: center;
    font-size: 36px;
    color: #30ce84;
    margin-bottom: 17px;
  }
  ul {
    li {
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dedede;
      padding: 0 12px;
      height: 53px;
      padding-top: 18px;
      box-sizing: border-box;
      input{
        background: transparent;
      }
      .reFirst {
        color: #000;
      }
      .reLast {
        color: #8b8b8b;
      }
      .bankSelect {
        transform: rotate(180deg);
        display: inline-block;
      }
    }
    input {
      background: #f3f4f6;
      text-align: right;
    }
  }
}

.cube-checkbox {
  margin-top: 4px;
}

.agreement {
  display: flex;
  align-items: center;
  padding:10px 0 50px 0;
  .oil-agreeWrap{
    display: flex;
    align-items: center;
  }
  .oil-agree{
     margin: 0 4px 0 18px;
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 3px;
    border: 1px solid #999999;
    .oil-agreeY {
      position: relative;
      width: 15px;
      height: 15px;
      display: inline-block;
    }
    .oil-agreeY::before {
        display: block;
        content: '√';
        color: #000;
        transform: rotate(15deg);
        font-size: 12px;
        margin-left: 1px;
    }
  }

  .file {
    color: #30ce84;
    margin-top: 1px;
  }
}




.hint{
  display: block;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.commitApply {
  height: 50px;
  background: #30ce84;
  text-align: center;
  color: #fff;
  font-size: 15px;
  line-height: 1.333333rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.cube-checkbox {
  padding: 0 0 0 18px;
}

header {
  position: relative;
  line-height: 44px;
  text-align: center;
  background: #373C48;
  font-size: 18px;
  color: #fff;
  .cubeic-back {
    position: absolute;
    left: 18px;
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .commitApply{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
