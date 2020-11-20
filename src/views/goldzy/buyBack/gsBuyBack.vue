<template>
  <div class="goldBuyBack">
    <div class="BuyBackW">

        <div class="buyBack-top">
          <header>
            <i class="cubeic-back back" @click="$router.go(-1)"></i>
          </header>
          <div class="moreW">
            <span class="more" @click="show.profile=true"></span>
          </div>
          <div class="codeW">
            <!-- <p class="code-text">—  黄金提货码  —</p> -->
            <p class="code">{{backInfoList.code}}</p>
            <p class="code-gold">{{backInfoList.gType==3? '金条':'金砂'}}{{backInfoList.weight}}克</p>
          </div>
        </div>

     <ul class="goldbuy-back-list gbb-form">
        <div class="goldbuy-back-info">
          <p>提货方式</p>
        </div>
        <ul class="goldC-select">
          <li @click="selectBuyType(0)" :class="[gbtId==0? 'left': 'left-change']">黄金回购</li>
          <li @click="selectBuyType(1)" :class="[gbtId==0? 'right': 'right-change']">获取实物黄金</li>
        </ul>
        <div class="buyBackTypeW" v-if="gbtId==0">
          <div class="buyBackPriceW">
            <li><span>今日{{backInfoList.gType==3? '金条':'金砂'}}单价</span><span>{{backInfoList.goldPrice}}元/克</span></li>
            <li><span>回购价格</span><span>{{backInfoList.money}}元</span></li>
            <li><span>回购折损</span><span>{{backInfoList.damage}}元</span></li>
            <li><span style="color: #D5A96E">实际到账金额</span><span>{{backInfoList.buyMoney}}元</span></li>
          </div>
          <div class="buyBackPayT">
            <p class="pay-title">请选择回购方式</p>
            <div class="item">
              <li class="buyBackType buyBackType-gray" v-if="!isWithin">
                <img src="@/common/images/gold/alipay-gray.png" alt="">
                <p class="text">支付宝</p>
                <div class="titleW">
                  <p class="title" style="color:#D2D2D2">仅支持不超过{{aliLimit}}元</p>
                  <p class="sub-title" style="color:#D2D2D2">预计半个小时内</p>
                </div>
                <div class="select-icon select-icon-disabled"></div>
              </li>
              <li class="buyBackType" v-if="isWithin">
                <img src="@/common/images/gold/alipay.png" alt="">
                <p class="text">支付宝</p>
                <div class="titleW">
                  <p class="title">仅支持不超过{{aliLimit}}元</p>
                  <p class="sub-title">预计半个小时内</p>
                </div>
                <div class="select-icon" @click="selectType(1)" :class="[selected==1?'selected-icon':'']"></div>
              </li>
              <div class="detailW" v-if="isWithin && selected==1">
              <div class="main">
                 <div class="icon"><img src="@/common/images/gold/icon_phone.png" alt=""></div>
                  <li>
                    <div class="left">
                      手机号码
                    </div>
                    <div class="right">
                      <input type="tel" v-model="aliInfo.mobile" name="aliMobile" maxlength="12" placeholder="请输入手机号码" />
                    </div>
                  </li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_name.png" alt=""></div>
                <li>
                  <div class="left">
                    真实姓名
                  </div>
                  <div class="right">
                    <input type="text" v-model="aliInfo.name" name="nameName" maxlength="12" placeholder="请输入支付宝认证的姓名" />
                  </div>
                </li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_zhanghao.png" alt=""></div>
                <li>
                  <div class="left">
                    支付宝账号
                  </div>
                  <div class="right">
                    <input type="text" v-model="aliInfo.account" name="nameAccount" placeholder="请输入支付宝邮箱或手机号" />
                  </div>
                </li>
              </div>
            </div>
          </div>
          <div class="item">
            <li class="buyBackType">
              <img src="@/common/images/gold/unionpay.png" alt="">
              <p class="text">银行卡</p>
              <div class="titleW">
                <p class="title">金额不限</p>
                <p class="sub-title">预计2小时内到账</p>
              </div>
              <div class="select-icon" @click="selectType(0)" :class="[selected==0?'selected-icon':'']"></div>
            </li>
            <div class="detailW" v-if="selected==0">
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_phone.png" alt=""></div>
                <li><p class="left">联系电话</p><div class="right"><input type="tel" @click="itemClicked" name="mobile" maxlength="12" placeholder="请输入联系人电话" v-model="inpInfo.mobile"/></div></li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_name.png" alt=""></div>
                <li><p class="left">姓名</p><div class="right"><input type="text" @click="itemClicked"  name="name" maxlength="16" placeholder="请输入户主姓名" v-model="inpInfo.name" @blur="checkBank"/></div></li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_card.png" alt=""></div>
                <li><p class="left">银行卡号</p><div class="right"><input type="tel" @click="itemClicked()"  name="cardNum" maxlength="20" placeholder="请输入银行卡号" v-model="inpInfo.cardNum" @blur="checkBank"/></div></li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_bank.png" alt=""></div>
                <li><p class="left">开户行</p><div class="right"><input type="text" name="bank" maxlength="20" placeholder="请输入开卡银行" v-model="inpInfo.bank" disabled/></div></li>
              </div>
              <div class="main">
                <div class="icon"><img src="@/common/images/gold/icon_bank1.png" alt=""></div>
                <li><p class="left">开户支行</p><div class="right"><input type="text" @click="itemClicked" name="subBank" maxlength="20" placeholder="请输入开户支行" v-model="inpInfo.subBank" /></div></li>
              </div>

            </div>
          </div>
            <!-- <p class="pay-title">请填写联系方式</p>
            <div class="item">
              <input class="mobile-input" name="mobile" type="tel" placeholder="请输入手机号码（必填）">
            </div> -->
            <div class="backBnt-wrapper">
              <div class="agreement zy-agreement">
                <cube-checkbox class="with-click" v-model="checked" shape="circle">我已阅读并同意</cube-checkbox>
                <span style="color: #252D82" @click="show.file=true" class="file">《贵金属闲置回收协议》</span>
              </div>
              <div class="backBnt" @click="buyBnt()">提交</div>
            </div>
          </div>

        </div>

        <div class="buyBackGoldW" v-if="gbtId==1">
          <div class="buyBackGold">
            <div class="products-change-detail-wrapper">
              <div class="products-change-detail">
                <div class="top-title">
                  <p><span class="icon"></span>证书及包装费用</p>
                  <div class="order-number">01</div>
                </div>
                <p class="detail">兑换金条或金砂实物，证书与包装盒需额外付费购买，证书30元/件，包装盒50元/件。</p>
              </div>
            </div>
            <div class="products-change-detail-wrapper">
              <div class="products-change-detail">
                <div class="top-title">
                  <p><span class="icon"></span>本产品兑换实物周期</p>
                  <div class="order-number">02</div>
                </div>
                <p class="detail">实物制作周期在21天以内，邮费和保价由用户承担，请联系客服记录需求。</p>
              </div>
            </div>
            <div class="products-change-detail-wrapper">
              <div class="products-change-detail">
                <div class="top-title">
                  <p><span class="icon"></span>金条规格</p>
                  <div class="order-number">03</div>
                </div>
                <p class="detail">金条规格：10g-20g-50g-100g-200g-500g-1000g</p>
              </div>
            </div>
            <div class="products-change-detail-wrapper">
              <div class="products-change-detail">
                <div class="top-title">
                  <p><span class="icon"></span>金砂规格</p>
                  <div class="order-number">04</div>
                </div>
                <p class="detail">10克以下属定制，需额外收加工费；</br>
  1g-10g，按1克/粒加工为金砂，收50元/件加工费；</br>
  1g（含）以下，定制金箔，收100元/件加工费。</p>
              </div>
            </div>
            <div class="products-change-detail-wrapper">
              <div class="products-change-detail">
                <div class="top-title">
                  <p><span class="icon"></span>兑换及选择实物发送后可退换货吗？</p>
                  <div class="order-number">05</div>
                </div>
                <p class="detail">黄金属贵金属交易，无法退换货。</p>
              </div>
            </div>
          </div>



          <div class="detailW">
            <div><img src="@/common/images/gold-hd/shiwu_tips.png" alt=""></div>
            <div class="main">
                 <!-- <div class="icon"></div> -->
                  <li>
                    <div class="leftW">
                      <div class="left">
                        <img src="@/common/images/gold-hd/icon_name.png" alt="">
                        <span>申请人</span>
                      </div>

                    </div>
                    <div class="rightW">
                      <input type="text" v-model="goldInfo.name" name="aliMobile" maxlength="12" placeholder="请输入收货人姓名" />
                    </div>
                  </li>
              </div>
              <div class="main">
                  <li>
                    <div class="leftW">
                      <div class="left">
                        <img src="@/common/images/gold-hd/icon_phone.png" alt="">
                        <span>手机号码</span>
                      </div>

                    </div>
                    <div class="rightW">
                        <input type="tel" v-model="goldInfo.mobile" name="aliMobile" maxlength="12" placeholder="请输入收货人手机号码" />
                      </div>
                  </li>
              </div>
              <div class="main">
                  <li>
                    <div class="leftW">
                      <div class="left">
                        <img src="@/common/images/gold-hd/icon_map.png" alt="">
                        <span>收货地址</span>
                      </div>
                    </div>

                    <div class="rightW">
                      <van-field
                        v-model="goldInfo.address"
                        rows="1"
                        autosize
                        type="textarea"
                        placeholder="请输入收货人地址"
                      />
                    </div>
                  </li>
              </div>
              <div class="gold-btn" @click="goldBtn">提交</div>
          </div>
        </div>
      </ul>
      <div class="contactW">
        <p class="company">海南信达贵金科技有限公司</p>
        <p class="company">提供实物黄金物流、黄金检测、黄金回收、代付等服务</p>
        <p class="used">使用过程中有疑惑？</p>
        <div class="contact" @click="contact">联系客服</div>
      </div>

    </div>



    <succ-page :selectedType="selected" v-if="suceesShow" :successPrice="backPrice" @handle-success-page="closeSuccessPage"></succ-page>
    <sms-code :show.sync="show.code" v-if="show.code" :fail-text="failText" @handler-show-info="handlerShowInfo" @submit-order="submitOrder" @forget="setForget"></sms-code>
    <remindDialog :show="show.dialog" @handle-show-dialog="initShow" :link="link" :linkType="linkType">
        <p slot="title">为了您的账号安全，请联系客服进行重置支付密码</p>
        <div slot="btn">联系客服</div>
      </remindDialog>
    <transition name="fade">
      <bg-mask v-model="show.mask"></bg-mask>
    </transition>
    <!-- 设置支付密码dialog -->
    <set-password :show.sync="showSetPassword"></set-password>
    <gold-file :show="show.file" @handle-show-file="initShow" :fileType="fileType"></gold-file>
    <gold-conpany :show="show.profile" @handle-show-profile="initShow"></gold-conpany>


  </div>
</template>

<script>
import { goldbuyback, zygoldbuyback ,goldPrice, checkBankAndName, goldBankInfo, findGoldBuyBackPrice, getInfo} from 'api';
import { mapGetters ,mapActions } from 'vuex';
import { setPayType ,IOSFocus ,vipCustom} from '@/mixins';
import { IsMobile,isEmpty, luhnCheck, getParam } from "util/common";
import store from 'store';
import { Field } from 'vant'
export default {
  mixins: [setPayType, IOSFocus,vipCustom],
  data:()=>({
    checked:true,
    backPrice:undefined,
    aliInfo: {
      mobile:undefined,
      name:undefined,
      account:undefined,
    },
    inpInfo:{
      mobile:undefined,
      name:undefined,
      cardNum:undefined,
      bank:undefined,
      subBank:undefined
    },
    goldInfo: {
      mobile:undefined,
      name:undefined,
      address:undefined,
    },
    show:{
      mask:false,
      code:false,
      file:false,
      profile: false,
      dialog: false
    },
    failText:'',
    id: sessionStorage.getItem('GOLDID'),
    gtype: sessionStorage.getItem('gtype'),
    token: '',
    fileType: 3,
    selected: undefined,  // 0 银行卡 1 支付宝
    options: [
      {
        label: "",
        value: "0"
      },
      {
        label: "",
        value: "1"
      }
      ],
    isWithin: false,
    suceesShow: false,
    aliLimit: 0,
    gbtId: 0,
    link:'http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481',
    linkType: 'href',
    backInfoList: {},
    isBuyback: true
  }),
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
  computed:{
    ...mapGetters({
      getToken: 'getToken',
      goldConfig: 'gold/getConfig',
      backInfo: 'gold/getBackInfo',
      userinfo: 'getUserinfo'
    })
  },
  methods:{
    ...mapActions({
      checkPassword: 'checkPassword',
    }),
    setForget() {
        this.show = {mask:true,code:false,file:false,dialog:true,profile:false}
      },
    async getUserBankInfo () {
      let res= await goldBankInfo({
            token: this.getToken,
        })
        if(res.error_code != 0){
          this.$toast(res.message)
        }else {
          if(res.data != null){
            this.inpInfo.name = res.data.name
            this.inpInfo.bank = res.data.bank
            this.inpInfo.subBank = res.data.subBank
            this.inpInfo.cardNum = res.data.cardNum
          }
        }
    },
    async checkBank() {
      try {
        const { cardNum, name } = this.inpInfo
        if (!name || !cardNum) return
        const { data, error_code, message } = await checkBankAndName({token: this.getToken, realName: name, cardNum})
        if ([0, 500].includes(error_code)) {
          this.inpInfo.bank = data.bank
          if (error_code == 500) this.$toast(message)
        } else {
          this.inpInfo.bank = ''
          return this.$toast(message)
        }
      } catch (e) {

      }
    },
    async submitOrder(val){ //输入短信下单
        let currentId = this.gtype
        let currentCardId = this.id
        let currentAmount = this.amount
      if(this.isBuyback) {
          if(this.selected==0) {
            let res= await zygoldbuyback({
              buybackType: this.selected,
              token: this.getToken,
              amount: currentAmount,
              mobile: this.inpInfo.mobile,
              bank: this.inpInfo.bank,
              subBank: this.inpInfo.subBank,
              realName: this.inpInfo.name,
              cardNum: this.inpInfo.cardNum,
              id: currentId,  // 自营黄金
              cardId: currentCardId, // 自营黄金
              verify_code: val,
            })
              if(res.error_code != 0){
                return this.failText = res.message;
              }else{
                this.initShow();
                this.suceesShow=true
                // console.log("银行卡支付")
                // this.$dialog({content:"回购申请成功，请等候客服审核！09:00---23:00 二小时到账，其它时间兑换次日处理。"},()=>{
                //   this.$router.go(-1)
                //   })
              }
          }else {
            let res= await zygoldbuyback({
              buybackType: this.selected,
              token: this.getToken,
              amount: currentAmount,
              mobile: this.aliInfo.mobile,
              alipayName: this.aliInfo.name,
              alipayAccount: this.aliInfo.account,
              id: currentId,  // 自营黄金
              cardId: currentCardId, // 自营黄金
              verify_code: val,
            })
              if(res.error_code != 0){
                return this.failText = res.message;
              }else{
                this.initShow();
                this.suceesShow=true
                // console.log("支付宝支付")
                // this.$dialog({content:"回购申请成功，请等候客服审核！09:00---23:00 二小时到账，其它时间兑换次日处理。"},()=>{
                //   this.$router.go(-1)
                //   })
              }
          }
      }else {
        let res= await zygoldbuyback({
              buybackType: 0,
              token: this.getToken,
              mobile: this.goldInfo.mobile,
              realName: this.goldInfo.name,
              address: this.goldInfo.address,
              id: currentId,
              cardId: currentCardId, // 自营黄金
              verify_code: val,
              type: 1
            })
        if(res.error_code != 0){
                return this.failText = res.message;
          }else{
            this.initShow();
            // console.log("支付宝支付")
            // this.$dialog({content:"回购申请成功，请等候客服审核！09:00---23:00 二小时到账，其它时间兑换次日处理。"},()=>{
            //   this.$router.go(-1)
            //   })
            this.$toast("提交申请成功")
            this.$router.go(-1)
          }

      }


    },
    // async goldChange(val) {
    //   let res= await zygoldbuyback({
    //     token: this.getToken,
    //     mobile: this.goldInfo.mobile,
    //     name: this.goldInfo.name,
    //     address: this.goldInfo.address,
    //     cardId: currentCardId, // 自营黄金
    //     verify_code: val,
    //   })
    // },

    selectBuyType(index) {
      this.gbtId = index
    },
    async buyBnt(){
      if(this.selected==1) {
        if(!IsMobile(this.aliInfo.mobile)){
          return this.$toast('请输入有效的手机号码！');
        }
        if(isEmpty(this.aliInfo.name)){
          return this.$toast('请输入支付宝认证的姓名！');
        }
        if(isEmpty(this.aliInfo.account)){
          return this.$toast('请输入支付宝邮箱或手机号！');
        }
      }else if(this.selected==0) {
        const { cardNum, name } = this.inpInfo
        if (!name || !cardNum) return
        const { data, error_code, message } = await checkBankAndName({token: this.getToken, realName: name, cardNum})
        if ([0, 500].includes(error_code)) {
          this.inpInfo.bank = data.bank
          if (error_code == 500) this.$toast(message)
        } else {
          this.inpInfo.bank = ''
          return this.$toast(message)
        }
        if(!IsMobile(this.inpInfo.mobile)){
          return this.$toast('请输入有效的手机号码');
        }
        if(isEmpty(this.inpInfo.name)){
            return this.$toast('请输入真实姓名！');
        }
        if(isEmpty(this.inpInfo.cardNum)){
            return this.$toast('请输入有效的银行账号！');
        }
        if(isEmpty(this.inpInfo.bank)){
            return this.$toast('请正确输入银行卡号（仅支持借记卡）！');
        }
        if(isEmpty(this.inpInfo.subBank)){
            return this.$toast('请输入分行信息！');
        }
      }else {
        return this.$toast('请选择回购方式');
      }

      if(!this.checked){
          return this.$toast('请先阅读并同意《黄金回购协议》');
      }
      let res = await this.checkPassword();
      if (!res) return;
      this.isBuyback = true
      this.show={mask:true,code:true,file:false,dialog:false}
    },
    async goldBtn() {
      if(!IsMobile(this.goldInfo.mobile)){
        return this.$toast('请输入有效的手机号码！');
      }
      if(isEmpty(this.goldInfo.name)){
          return this.$toast('请输入收货人姓名！');
      }
      if(isEmpty(this.goldInfo.address)){
          return this.$toast('请输入收货人地址！');
      }

      let res = await this.checkPassword();
      if (!res) return;
      this.isBuyback = false
      this.show={mask:true,code:true,file:false,dialog:false}
    },


    handlerShowInfo(){
        this.initShow();
      },
    initShow(){
      this.show={mask:false,code:false,file:false,profile:false,dialog:false}
    },
    showDig(){
      this.$dialog({title:'回购说明',content: "<p style='margin-top:-12px;text-align: left;'>本服务由深圳市金宇阳光文化发展有限公司提供。</p><p style='text-align: left;margin: 8px 0 -13px 0;'>回购价格=基础金价-3元/克，基础金价为上海黄金交易所Au99.99当日开盘价。</p>"},() => {})
    },
    async getGoldBuyBackPrice() {
      let res = await findGoldBuyBackPrice({
        token: this.getToken,
        cardId: this.id
      })
      if(res.error_code != 0){
          return
      }else {
        this.backInfoList = res.data
        this.backPrice = res.data.buyMoney
        this.aliLimit = res.data.aliPayLimitAmount
        if(res.data.buyMoney>res.data.aliPayLimitAmount) {
          this.isWithin = false
          this.selected=0
        }else {
          this.isWithin = true
          this.selected=1
        }
      }
    },
    async getUserToken() {
      let res = await getInfo({
        token: this.getToken,
      })
      if(res.error_code != 0){
          return
      }else {
        store.dispatch('setUserinfo', res.data)
      }
    },
    contact() {
      window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
    },
    selectType(val) {
      this.selected = val
    },
    closeSuccessPage(val) {
      this.suceesShow = val
      this.$router.go(-1)
    },
    // inputChange() {
    //   let dom = document.getElementsByClassName('textarea')[0]

    // },
    itemClicked() {
      let dom = document.getElementsByClassName('goldBuyBack')[0]
      let height = document.body.clientHeight
      let clientHeight = dom.clientHeight
      let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      let ele = document.documentElement || document.body;
      if(scrollTop>0) {
        setTimeout(function(){
          //设置滚动条到最底部
          ele.scrollTop =  clientHeight
        },500);
      }
    }
  },
  mounted(){
    this.getUserBankInfo()
    // 自营黄金 回购价格从连接参数中获取
    if(getParam().id || sessionStorage.getItem('GOLDID')) {
      let id = getParam().id || sessionStorage.getItem('GOLDID')
      let gtype = getParam().gtype || sessionStorage.getItem('gtype')
      this.id = id
      sessionStorage.setItem('GOLDID',id)
      this.gtype = gtype
      sessionStorage.setItem('gtype',gtype)
      this.token = getParam().token
      this.getUserToken ()
      this.getGoldBuyBackPrice()
      this.fileType = 3
    }
    if(IsMobile(this.userinfo.userName)) {
      this.inpInfo.mobile = this.userinfo.userName;
    }
    this.inpInfo.name = this.userinfo.realName;

  },
  components:{
    SmsCode: ()=> import('@/components/SmsCode'),
    remindDialog: ()=> import('@/components/remindDialog'),
    BgMask: () => import('@/components/BgMask'),
    goldFile: () => import("./components/goldFile"),
    succPage: () => import("./components/succPage"),
    goldConpany: () => import("./components/goldConpany"),
    SetPassword: () => import(/* webpackPrefetch: true */ 'components/SetPassword'),
    [Field.name]: Field,
  }

}
</script>

<style lang="scss" scoped>
.goldBuyBack{
  min-height: 100%;
  background: #F5F5F5;
  header{
    text-align: center;
    // position: fixed;
    font-size: 0.48rem;
    color: #FEFEFE;
    background: transparent;
    line-height: 1.173333rem;
    height: 1.173333rem;
    width: 100%;
    top: 0;
    z-index: 2;
    .back{
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.4rem;
    }
  }
  .buyBack-top {
    width: 100%;
    height: 414px;
    background: #373C48;
    background-image: url('../../../common/images/gold-hd/buyBack-bg.png');
    background-size: 100% 100%;
    .moreW {
      padding-top: 133px;
      padding-right: 32px;
      text-align: right;
      .more {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-image: url('../../../common/images/gold-hd/icon_more.png');
        background-size: 100% 100%;
      }
    }
    .codeW {
      margin-top: 80px;
      margin-left: 32px;
      width: 221px;
      text-align: center;
      .code-text {
        font-size: 14px;
        font-weight: bold;
        color: #444444;
      }
      .code {
        margin-top: 8px;
        font-size: 20px;
        color: #D5A96E;
        font-weight: bold;
      }
      .code-gold {
        margin-top: 6px;
        font-size: 12px;
        color: #D5A96E;
      }
    }
  }
  .goldbuy-back-list{
    padding: 20px 16px 0 16px;
    color: #4A4A4A;
    font-size: 14px;
    .goldbuy-back-info{
      padding-bottom: 12px;
      text-align: left;
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #444444;
      display: flex;
      align-items: center;
      .square {
        width: 3px;
        height: 18px;
        background: #FE8B30;
        margin-right: 5px;
      }
    }
    .goldC-select {
        height: 50px;
        li {
          float: left;
          width: 185px;
          height: 50px;
          font-size: 16px;
          line-height: 50px;
          text-align: center;
          font-weight: 600;
          letter-spacing: 2px;
          background-size: 100% 100%;
          font-family: PingFangSC-Medium, PingFang SC;
          &.left {
            color:  #D5A96E;
            background-image: url('../../../common/images/gold-hd/huangjin_pressed.png');
          }
          &.right {
            color: #424448;
            background-image: url('../../../common/images/gold-hd/shiwu_normal.png');
            margin-left: -27px;
          }
          &.left-change {
            color:#424448;
            background-image: url('../../../common/images/gold-hd/huangjin_normal.png');
          }
          &.right-change {
            color: #D5A96E;
            background-image: url('../../../common/images/gold-hd/shiwu_pressed.png');
            margin-left: -27px;
          }
        }
      }
    .buyBackTypeW {
      position: relative;
      padding: 0 16px;
      padding-top: 16px;
      background: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      .buyBackPriceW {
        li {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #444444;
          padding-bottom: 18px;
          &:last-child {
            border-bottom: 1px solid #F5F5F5;
          }
        }
      }
      .buyBackPayT {
        .pay-title {
          margin: 26px 0 16px 0;
          font-size: 16px;
          font-weight: bold;
          color: #444444;
        }
        .item {
          margin: 12px 0;
          padding: 0px 16px;
          box-shadow: 0px 2px 10px 0px rgba(220,220,220,0.6);
          border-radius: 10px;
          // border-bottom: 1px solid #EBEBEB;
          .buyBackType {
            display: flex;
            align-items: center;
            height: 66px;
            // border-bottom: 1px solid #EBEBEB;
            img {
              width: 30px;
              height: 30px;
            }
            .text {
              margin-left: 8px;
              font-family: PingFangSC-Semibold;
              font-size: 18px;
            }
            .titleW {
              margin-left: 16px;
              .title {
                font-size: 14px;
                color: #444444;
              }
              .sub-title {
                margin-top: 2px;
                font-size: 12px;
                color: rgba($color: #000000, $alpha: 0.4)
              }
            }
            .select-icon {
              margin-left: auto;
              margin-right: 0px;
              width: 20px;
              height: 20px;
              background-image: url('../../../common/images/gold/circle-none.png');
              background-size: 100% 100%;
            }
            .selected-icon {
              background-image: url('../../../common/images/gold/choose.png');
            }
            .select-icon-disabled {
              background-image: url('../../../common/images/gold/choose-disabled.png');
            }
            .checkboxW {
              margin-left: auto;
              margin-right: 0px;
            }
          }
          .buyBackType-gray {
            color: #D2D2D2 !important;
          }
          .detailW {

          border-top: 1px solid #F5F5F5;
          .main {
            position: relative;
            .icon {
              position: absolute;
              top: 16px;
                img {
                  width: 18px;
                  height: 18px;
                  margin-right: 10px;
                }
              }
            li {
              display: flex;
              align-items: center;
              margin-left: 28px;
              height: 48px;
              font-size: 14px;
              border-bottom: 1px solid #F5F5F5;
              .left {
                width:90px;
                color: #444444;
                font-size: 14px;
              }
              .right {
                input {
                  width: 173px;
                  height: 18px;
                  margin:0px;
                  padding:0px;
                  color: #444444;
                  font-size: 14px;
                  &:disabled {
                    background-color: #ffffff;
                    color: #444444;
                  }
                  &::placeholder {
                    font-size: 14px;
                    color: rgba($color: #000000, $alpha: 0.4);
                  }
                }
              }
            }
          }



        }
          // .detailW {
          //   border-top: 1px solid #F5F5F5;
          //   .main {
          //     display: flex;
          //     justify-content: space-between;
          //     align-items: center;
          //     height: 66px;
          //     .left {
          //       li {
          //         &:first-child {
          //           width: 204px;
          //           font-size: 14px;
          //           color: #444444;
          //           overflow:hidden;
          //           white-space:nowrap;
          //           text-overflow:ellipsis;
          //         }
          //         &:last-child {
          //           font-size: 12px;
          //           color: rgba($color: #000000, $alpha: 0.4);
          //         }
          //         img {
          //           display: inline-block;
          //           vertical-align: middle;
          //           width: 92px;
          //           height: 28px;
          //         }
          //         span {
          //           display: inline-block;
          //           vertical-align: middle;
          //           margin-left: 16px;
          //           font-size: 16px;
          //           line-height: 66px;
          //         }
          //       }
          //     }
          //     .right {
          //       .recent {
          //         font-size: 10px;
          //         padding: 2px;
          //         color: rgba($color: #ffffff, $alpha: 0.8);
          //         background: #D5A96E;
          //         border-radius: 2px;
          //       }
          //       .arrow {
          //         margin-left: 7px;
          //       }
          //     }
          //   }



          // }
        }
        .mobile-input {
          height: 46px;
        }
        .backBnt-wrapper {
          margin-top: 26px;
          width: 100%;
          height: 98px;
          // position: fixed;
          // bottom: 0;
          background-color: #fff;
          // box-shadow: 0px -1px 10px 0px rgba(220,220,220,0.6);
          .agreement {
            display: flex;
            align-items: center;
            font-size: 12px;
            .cube-checkbox {
              padding: 0px;
            }
            .file {
              color: #252D82;
              margin-top: -2px;
            }
          }
          .backBnt {
            margin: 0 auto;
            height: 40px;
            line-height: 40px;
            border-radius: 5px;
            background: #252D82;
            text-align: center;
            color: #fff;
            font-size: 16px;
            z-index: 1;
            font-weight: bold;
          }
        }
      }


    }
    .buyBackGoldW {
      padding: 16px 0;
      background: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      .buyBackGold {
        padding: 0 16px;
        .products-change-detail-wrapper {
          // position: relative;
          margin-top: 12px;

          .products-change-detail {
            width: 311px;
            padding: 16px;
            box-sizing: border-box;
            background-color: #FFFFFF;
            border-radius: 10px;
            box-shadow: 0px -1px 10px 0px rgba(220,220,220,0.6);
            .top-title {
              display: flex;
              justify-content: space-between;
              p {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #444444;
                font-weight: bold;
                .icon {
                  display: inline-block;
                  margin-right: 5px;
                  width: 14px;
                  height: 14px;
                  background-image: url('../../../common/images/gold-hd/question.png');
                  background-size: 100% 100%;
                }
              }
              .order-number {
                margin-top: -5px;
                width: 50px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                font-size: 30px;
                font-family: DIN-Bold, DIN;
                font-weight: bold;
                color: rgba($color: #000000, $alpha: 0.04);
              }
            }
            .detail {
                margin-top: 14px;
                position: relative;
                width: 279px;
                line-height: 18px;
                padding: 10px;
                box-sizing: border-box;
                font-size: 12px;
                background-color: rgba($color: #B4B4B4, $alpha: 0.1);
                color: rgba($color: #444444, $alpha: 0.6);
                border-radius: 5px;
              }
            .detail::before {
              position: absolute;
              top: -12px;
              left: 22px;
              content: '';
              width: 0;
              height: 0;
              border-left: 12px solid transparent;
              border-right: 12px solid transparent;
              border-bottom: 12px solid rgba($color: #B4B4B4, $alpha: 0.1);
              // width: 12px;
              // height: 12px;
              // background-color: rgba($color: #B4B4B4, $alpha: 0.1);
              // transform: rotate(45deg);
            }
          }
          &:last-child {
            margin-bottom: 16px;
          }
        }
      }

      .detailW {
        padding-top: 32px;
        .main {
            position: relative;
            padding: 0 16px;
            li {
              display: flex;
              // align-items: center;
              // margin-left: 28px;
              // height: 48px;
              padding: 13px 0;
              font-size: 14px;
              border-bottom: 1px solid #F5F5F5;
              .leftW {
                .left {
                  display: flex;
                  align-items: center;
                  width: 110px;
                  color: #444444;
                  font-size: 16px;
                  img {
                    // display: inline-block;
                    width: 18px;
                    height: 18px;
                    margin-right: 14px;
                  }
                }
              }

              .rightW {
                margin-left: 10px;
                input {
                  width: 193px;
                  height: 18px;
                  margin:0px;
                  padding:0px;
                  color: #444444;
                  font-size: 16px;
                  &:disabled {
                    background-color: #ffffff;
                    color: #444444;
                  }
                  &::placeholder {
                    font-size: 16px;
                    color: rgba($color: #000000, $alpha: 0.4);
                  }
                }
                textarea {
                  width: 193px;
                  color: #444444;
                  font-size: 16px;
                  border: none;
                  &::placeholder {
                    font-size: 16px;
                    color: rgba($color: #000000, $alpha: 0.4) !important;
                  }
                }

              }
            }
          }
          .gold-btn {
            margin: 0 auto;
            margin-top: 32px;
            width: 311px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            background: #252D82;
            font-weight: bold;
          }
      }
    }

  }

  .arrivel-accound-day{
    padding: 10px 0 0 29px;
    font-size:12px;
    color: #999999;
    text-align: left;
    img {
      display: inline-block;
      vertical-align: middle;
      width: 13px;
      height: 13px;
      margin-right: 5px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .contactW {
    // padding-bottom: 128px;

    padding: 0 16px;
    padding-top: 16px;
    padding-bottom: 36px;
    text-align: center;
    .company {
      font-size: 12px;
      color: rgba($color: #000000, $alpha: 0.2);
    }
    .used {
      margin-top: 32px;
      font-size: 14px;
      color: #444444;
    }
    .contact {
      margin: 0 auto;
      margin-top: 10px;
      width: 180px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: rgba($color: #000000, $alpha: 0.4);
      font-size: 14px;
      border: 1px solid #979797;
      border-radius: 5px;
    }
  }



}

</style>
<style>
.cube-dialog-title-def{
  margin:20px 0 25px 0;
}
.zy-agreement .cube-checkbox_checked .cube-checkbox-ui i {
  color: #252D82;
}
.cube-dialog-btn_highlight {
  color: #252D82;
}
input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(0,0,0,0.4);
  font-size: 14px;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(0,0,0,0.4);
  font-size: 14px;
}
input::-moz-placeholder, textarea::-moz-placeholder{
  /* Mozilla Firefox 19+ */
  color: rgba(0,0,0,0.4);
  font-size: 14px;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder{
  /* Internet Explorer 10-11 */
  color: rgba(0,0,0,0.4);
  font-size: 14px;
}
.van-cell {
  padding: 0;
  font-size: 16px;
}
textarea::placeholder {
  color: rgba(0,0,0,0.4) !important;
}
@media screen and (min-width: 600px) {
  header,.backBnt-wrapper{
    max-width: 384px; /*no*/
  }
}
</style>

