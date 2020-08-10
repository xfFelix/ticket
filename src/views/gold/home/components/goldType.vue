<template>
  <div class="gold-type" ref="detailTop" >

    <ul class="gold-select" :class="fixedTop==1?'fixedP':''">
      <li v-for="(item,index) in detail" :key="index" @click="detailClick(index)" :class="selectIndex==index?'active':''">{{item.name}}</li>
    </ul>
    <div class="liHight" v-if="fixedTop==1"></div>
    <ul v-show="goldType.type==3">
      <li v-show="selectIndex==0">
        <div class="products-intro">
          <table class="table" cellspacing="0" cellpadding="0">
            <tbody>
              <tr><td class="left">生产商家</td><td class="right">东莞市皇帝珠宝有限公司</td></tr>
              <tr><td class="left">交易品种</td><td class="right">黄金金条</td></tr>
              <tr><td class="left">合约代码</td><td class="right">Au99.99</td></tr>
              <tr><td class="left">交易方式</td><td class="right">积分兑换</td></tr>
              <tr><td class="left">交易单位</td><td class="right">10克/笔</td></tr>
              <tr><td class="left">报价单位</td><td class="right">椰子分/克</td></tr>
              <tr><td class="left">最小笔变动量</td><td class="right">10克</td></tr>
            </tbody>
          </table>
          <div class="tips">
            <p>特别说明：</p>
            <p>1、今日金价会随采购国际金价和上海黄金交易所综合报价有调整</p>
            <p>2、每笔黄金兑换业务提交后，即时向上海黄金交易所提交真实购买交易，无法撤销</p>
            <p>3、兑换黄金制品属贵金属投资，下单即视您同意兑换当时兑换价格</p>
          </div>
        </div>
        <img src="../../../../common/images/gold/bar-01-02.png" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-03.png" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-04.png" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-05.png" alt="金条" width="100%" />
      </li>
      <li v-show="selectIndex==1">
        <div class="buyBackNotice">
          <ul>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回购折损率</span></h2>
              <p>黄金回购手续费为1%，即回购黄金到账金额=本笔兑换黄金积分×1元/椰子分×（1-1%）</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回购折损说明</span></h2>
              <p>回购由东莞市皇帝珠宝有限公司提供统一服务，折损包括资金占用成本、回购业务让利的综合费用。</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回款时间</span></h2>
              <p>24小时内回款，为保证资金安全及时处理，每天10：30、16：30各处理一次。</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回款流程</span></h2>
              <p>兑换后点击“立即回购”，填写银行账户提交即可办理</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">兑换当时未回购的处理方式</span></h2>
              <p>您的本次兑换以订单方式存在“我的--黄金兑换”中，可打开选择订单继续操作流程</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">超过24小时未收到回款原因</span></h2>
              <p>约定时间内未收到回款，有可能是您的银行账户填写有误，请点击下方“联系我们”向我们反馈，我们将及时解决您的问题</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">兑换及回购后可退分吗？</span></h2>
              <p>黄金属贵金属交易，根据第三方服务承诺，无法退回</p>
            </li>
            <li>
              <h2><span class="circle"></span><span class="title">兑换后黄金供货服务提供方</span></h2>
              <p>东莞市皇帝珠宝有限公司提供服务</p>
            </li>
          </ul>
        </div>
        <!-- <img src="../../../../common/images/gold/bar-02.png" alt="金条" width="100%" /> -->
      </li>
      <li v-show="selectIndex==2">
        <div class="changeNotice">
          <ul>
            <li>
              <h2><span class="square">Q1</span><span class="title">这款产品的材质？</span></h2>
              <p>本产品材质为9999足金</p>
            </li>
            <li>
              <h2><span class="square">Q2</span><span class="title">本产品兑换说明</span></h2>
              <p>本产品由东莞市皇帝珠宝有限公司提供统一服务，兑换手续费包括提料费用、检测成本、人工处理等综合费用，按4%计取。</p>
            </li>
            <li>
              <h2><span class="square">Q3</span><span class="title">证书及包装费用</span></h2>
              <p>兑换金条或金砂实物，证书与包装盒需额外付费购买，证书30元/件，包装盒50元/件。</p>
            </li>
            <li>
              <h2><span class="square">Q4</span><span class="title">本产品兑换实物周期</span></h2>
              <p>实物制作周期在21天以内，邮费和保价由用户承担，请联系客服记录需求。</p>
            </li>
            <li>
              <h2><span class="square">Q5</span><span class="title">金条规格</span></h2>
              <p>金条规格：10g-20g-50g-100g-200g-500g-1000g</p>
            </li>
            <li>
              <h2><span class="square">Q6</span><span class="title">金砂规格</span></h2>
              <p>10克以下属定制，需额外加收工费：</p>
              <p>1g--10g，按1克/粒加工为金砂，收50元/件加工费；</p>
              <p>1g（含）以下，定制金箔，收100元/件工费；</p>
            </li>
            <li>
              <h2><span class="square">Q7</span><span class="title">兑换当时未回购的处理方式</span></h2>
              <p>您的本次兑换以订单方式存在“我的--黄金兑换”中，可打开选择订单继续操作流程</p>
            </li>
            <li>
              <h2><span class="square">Q8</span><span class="title">兑换及选择实物发送后可退换货吗？</span></h2>
              <p>黄金属贵金属交易，无法退换货</p>
            </li>
            <li>
              <h2><span class="square">Q9</span><span class="title">兑换后黄金供货服务提供方</span></h2>
              <p>东莞市皇帝珠宝有限公司提供服务</p>
            </li>
          </ul>
        </div>
        <!-- <img src="../../../../common/images/gold/bar-04.png" alt="金条" width="100%" /> -->
      </li>
    </ul>

   <ul v-show="goldType.type==4">
      <li v-show="selectIndex==0">
        <div class="products-intro">
          <table class="table" cellspacing="0" cellpadding="0">
            <tbody>
              <tr><td class="left">生产商家</td><td class="right">东莞市皇帝珠宝有限公司</td></tr>
              <tr><td class="left">交易品种</td><td class="right">黄金金砂</td></tr>
              <tr><td class="left">合约代码</td><td class="right">Au99.99</td></tr>
              <tr><td class="left">交易方式</td><td class="right">积分兑换</td></tr>
              <tr><td class="left">交易单位</td><td class="right">0.05克/笔</td></tr>
              <tr><td class="left">报价单位</td><td class="right">椰子分/克</td></tr>
              <tr><td class="left">最小笔变动量</td><td class="right">0.05克</td></tr>
            </tbody>
          </table>
          <div class="tips">
            <p>特别说明：</p>
            <p>1、今日金价会随采购国际金价和上海黄金交易所综合报价有调整</p>
            <p>2、每笔黄金兑换业务提交后，即时向上海黄金交易所提交真实购买交易，无法撤销</p>
            <p>3、兑换黄金制品属贵金属投资，下单即视您同意兑换当时兑换价格</p>
          </div>
        </div>
        <img src="../../../../common/images/gold/bar-01-02.png" alt="金砂" width="100%" />
        <img src="../../../../common/images/gold/bar-01-03.png" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-04.png" alt="金条" width="100%" />
        <img src="../../../../common/images/gold/bar-01-05.png" alt="金条" width="100%" />
      </li>
      <li v-show="selectIndex==1">
        <div class="buyBackNotice">
          <ul>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回购折损率</span></h2>
              <p>黄金回购手续费为1%，即回购黄金到账金额=本笔兑换黄金积分×1元/椰子分×（1-1%）</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回购折损说明</span></h2>
              <p>回购由东莞市皇帝珠宝有限公司提供统一服务，折损包括资金占用成本、回购业务让利的综合费用。</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回款时间</span></h2>
              <p>24小时内回款，为保证资金安全及时处理，每天10：30、16：30各处理一次。</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回款流程</span></h2>
              <p>兑换后点击“立即回购”，填写银行账户提交即可办理</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">兑换当时未回购的处理方式</span></h2>
              <p>您的本次兑换以订单方式存在“我的--黄金兑换”中，可打开选择订单继续操作流程</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">超过24小时未收到回款原因</span></h2>
              <p>约定时间内未收到回款，有可能是您的银行账户填写有误，请点击下方“联系我们”向我们反馈，我们将及时解决您的问题</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">兑换及回购后可退分吗？</span></h2>
              <p>黄金属贵金属交易，根据第三方服务承诺，无法退回</p>
            </li>
            <li>
              <h2><span class="circle"></span><span class="title">兑换后黄金供货服务提供方</span></h2>
              <p>东莞市皇帝珠宝有限公司提供服务</p>
            </li>
          </ul>
        </div>
        <!-- <img src="../../../../common/images/gold/bar-02.png" alt="金砂" width="100%" /> -->
      </li>
      <li v-show="selectIndex==2">
        <div class="changeNotice">
          <ul>
            <li>
              <h2><span class="square">Q1</span><span class="title">这款产品的材质？</span></h2>
              <p>本产品材质为9999足金</p>
            </li>
            <li>
              <h2><span class="square">Q2</span><span class="title">本产品兑换说明</span></h2>
              <p>本产品由东莞市皇帝珠宝有限公司提供统一服务，兑换手续费包括提料费用、检测成本、人工处理等综合费用，按4%计取。</p>
            </li>
            <li>
              <h2><span class="square">Q3</span><span class="title">证书及包装费用</span></h2>
              <p>兑换金条或金砂实物，证书与包装盒需额外付费购买，证书30元/件，包装盒50元/件。</p>
            </li>
            <li>
              <h2><span class="square">Q4</span><span class="title">本产品兑换实物周期</span></h2>
              <p>实物制作周期在21天以内，邮费和保价由用户承担，请联系客服记录需求。</p>
            </li>
            <li>
              <h2><span class="square">Q5</span><span class="title">金条规格</span></h2>
              <p>金条规格：10g-20g-50g-100g-200g-500g-1000g</p>
            </li>
            <li>
              <h2><span class="square">Q6</span><span class="title">金砂规格</span></h2>
              <p>10克以下属定制，需额外加收工费：</p>
              <p>1g--10g，按1克/粒加工为金砂，收50元/件加工费；</p>
              <p>1g（含）以下，定制金箔，收100元/件工费；</p>
            </li>
            <li>
              <h2><span class="square">Q7</span><span class="title">兑换当时未回购的处理方式</span></h2>
              <p>您的本次兑换以订单方式存在“我的--黄金兑换”中，可打开选择订单继续操作流程</p>
            </li>
            <li>
              <h2><span class="square">Q8</span><span class="title">兑换及选择实物发送后可退换货吗？</span></h2>
              <p>黄金属贵金属交易，无法退换货</p>
            </li>
            <li>
              <h2><span class="square">Q9</span><span class="title">兑换后黄金供货服务提供方</span></h2>
              <p>东莞市皇帝珠宝有限公司提供服务</p>
            </li>
          </ul>
        </div>
        <!-- <img src="../../../../common/images/gold/bar-04.png" alt="金砂" width="100%" /> -->
      </li>
    </ul>
    <!-- <div ref="headTop" class="headTop"></div> -->
    <div class="contact" @click="contact">
      <img src="../../../../common/images/gold/service-icon.png">
      <p>联系我们</p>
    </div>
  </div>
</template>
<script>
import { mapGetters} from 'vuex';
export default {
  props:{
    viewTopC:{
      type:Number,
    },
    viewBoxHeightC:{
      type:Number
    }
  },
  data: () => ({
    detail: [
      {
        name: "产品介绍"
      },
      {
        name: "回购须知"
      },
      {
        name: "兑换须知"
      }
    ],
    selectIndex:0,
    gtId:0,
    fixedTop:0,
    // viewBoxHeight:0
  }),
  watch:{
    viewTopC(val){
      if(val>this.viewBoxHeightC){
        this.fixedTop=1
      }else{
         this.fixedTop=0
      }
    }
  },
  computed: {
     ...mapGetters({
      goldType: 'gold/getConfig',
    })
  },
  methods:{
    detailClick(index){
      this.selectIndex = index;
    },
    contact () {
      window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
    }
    // handleScroll() {
    //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //   let detailTop = this.$refs.detailTop.offsetTop;
    //   let detailPosit = detailTop - scrollTop;
    //   let headTop = window.getComputedStyle(this.$refs.headTop).height.substring(0,2);
    //   if(detailPosit<headTop){
    //     this.fixedTop=1
    //   }else{
    //      this.fixedTop=0
    //   }
    // }
  },
  mounted(){
      // window.addEventListener('scroll', this.handleScroll);
      console.log(this.viewBoxHeightC)


  },
  beforeDestroy() {
        // window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>
<style lang="scss" scoped>
.headTop{
  height: 44px;
  background: #fff;
}
.gold-type {
  background: #f4f4f4;
  // position: relative;
  // margin-top: 15px;
  width: 100%;
  box-sizing: border-box;
  .gold-select{
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    box-sizing: border-box;
    li {
      line-height: 32px;
      color: #181A18;
      padding: 8px 0;
      font-size: 16px;
    }
  }
  .contact {
    padding: 14px 150px;
    background-color: #F7FAF8;
    display: flex;
    align-items: center;
    p {
      font-size:14px;
      color: #576B95;
      text-align: center;
    }
    img {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
  }
}
.active {
  border-bottom: 2px solid #66CA8A;
  color: #66CA8A !important;
}
.fixedP{
  top: 44px;
  z-index: 1;
  width: 100%;
  background: #F4F4F4;
  position: fixed;
}
.liHight{
  height: 44px;
}
.products-intro {
  padding: 24px 16px 16px 16px;
  background-color: #fff;
  .table {
    width: 100%;
    border: 1px solid #ddd;
    border-collapse: collapse;
    tbody {
      tr {
        td {
          padding: 9px 10px;
          padding-left: 14px;
          text-align: left;
          color: #999999;
          font-size: 12px;
          border: 1px solid #CCCCCC;
          border-collapse: collapse;
          &.left {
            width: 29.4%
          }
          &.right {
            width: 70.6%;
          }
        }
      }
    }
  }
  .tips {
    margin-top: 16px;
    padding: 6px 14px;
    background-color: #FAF5F5;
    p {
      line-height: 24px;
      font-size: 12px;
      color: #F23D3D;
    }
  }
}
.buyBackNotice {
  background-color: #fff;
  padding: 0 16px;
  padding-top: 11px;
  ul {
    li {
      padding: 16px 0 12px 0px;
      h2 {
        margin-bottom: 12px;
        .circle {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background:linear-gradient(180deg,rgba(43,198,143,1) 0%,rgba(83,224,153,1) 100%);
        }
        .title {
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: #181A18;
        }
      }
      p {
        line-height: 20px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
}
.changeNotice {
  background-color: #fff;
  padding: 0 16px;
  padding-top: 11px;
  ul {
    li {
      padding: 12px 0;
      h2 {
        margin-bottom: 12px;
        .square {
          display: inline-block;
          vertical-align: middle;
          margin-right: 12px;
          width: 28px;
          height: 16px;
          border: 1px solid #4FB359;
          border-radius: 8px 8px 0px 8px;
          color: #4FB359;
          font-size: 10px;
          text-align: center;
          line-height: 16px;
          font-family:Source Han Sans CN;
          // background:linear-gradient(180deg,rgba(43,198,143,1) 0%,rgba(83,224,153,1) 100%);
        }
        .title {
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: #181A18;
        }
      }
      p {
        line-height: 20px;
        font-size: 12px;
        color: #999999;
        padding-left: 41px;
      }
    }
  }
}
</style>
<style>
@media screen and (min-width: 600px) {
  .fixedP{
    max-width: 384px; /*no*/
  }
}
</style>
