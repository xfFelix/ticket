<template>
  <div class="gold-type" ref="detailTop" >

    <ul class="gold-select" :class="fixedTop==1?'fixedP':''">
      <li v-for="(item,index) in detail" :key="index" @click="detailClick(index)" :class="selectIndex==index?'active':''">{{item.name}}</li>
    </ul>
    <div class="liHight" v-if="fixedTop==1"></div>
    <ul v-show="goldType.type==3">
      <li v-show="selectIndex==0">
        <img src="../../../../common/images/gold/bar-01-01.png" alt="金条" width="100%" />
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
              <p>黄金回购手续费为5%，即回购黄金到账金额=本笔兑换黄金价格×（1-5%）</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回购折损说明</span></h2>
              <p>回购由东莞市皇帝珠宝有限公司提供统一服务，折损包括回购时的提料费用、检测成本、资金占用成本、寻找回购方让利、人工处理成本等综合费用。</p>
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
              <h2><span class="square">Q2</span><span class="title">本产品实物交割标准</span></h2>
              <p>本产品实物交割包含金条（金砂），产品证书、包装盒和擦试绒布。</p>
            </li>
            <li>
              <h2><span class="square">Q3</span><span class="title">本产品兑换实物费用</span></h2>
              <p>
                实物制作周期在21天以内，每件工费如下：</br>
                金条工费：10克及以上，加收15元/克工费；</br>
                规格：10克-20克-50克-100克-200克-500克-1000克</br>
                金砂工费：3克-10克，加收16元/克工费；</br>
                3克以下，加收50元/件工费；</br>
                另加收证书费30元/件，木盒45元/个</p>
            </li>
            <li>
              <h2><span class="square">Q4</span><span class="title">邮寄说明事项</span></h2>
              <p>本产品由东莞市皇帝珠宝有限公司供货，邮费和保价由用户承担，请联系客服记录需求；</p>
            </li>
            <li>
              <h2><span class="square">Q5</span><span class="title">兑换当时未回购的处理方式</span></h2>
              <p>您的本次兑换以订单方式存在“我的--黄金兑换”中，可打开选择订单继续操作流程</p>
            </li>
            <li>
              <h2><span class="square">Q6</span><span class="title">兑换及选择实物发送后可退换货吗？</span></h2>
              <p>黄金属贵金属交易，无法退换货</p>
            </li>
            <li>
              <h2><span class="square">Q7</span><span class="title">兑换后黄金供货服务提供方</span></h2>
              <p>东莞市皇帝珠宝有限公司提供服务</p>
            </li>
          </ul>
        </div>
        <!-- <img src="../../../../common/images/gold/bar-04.png" alt="金条" width="100%" /> -->
      </li>
    </ul>

   <ul v-show="goldType.type==4">
      <li v-show="selectIndex==0">
        <img src="../../../../common/images/gold/sand-01-01.png" alt="金砂" width="100%" />
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
              <p>黄金回购手续费为5%，即回购黄金到账金额=本笔兑换黄金价格×（1-5%）</p>
            </li>
            <li class="one-bottom-px">
              <h2><span class="circle"></span><span class="title">回购折损说明</span></h2>
              <p>回购由东莞市皇帝珠宝有限公司提供统一服务，折损包括回购时的提料费用、检测成本、资金占用成本、寻找回购方让利、人工处理成本等综合费用。</p>
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
              <h2><span class="square">Q2</span><span class="title">本产品实物交割标准</span></h2>
              <p>本产品实物交割包含金条（金砂），产品证书、包装盒和擦试绒布。</p>
            </li>
            <li>
              <h2><span class="square">Q3</span><span class="title">本产品兑换实物费用</span></h2>
              <p>
                实物制作周期在21天以内，每件工费如下：</br>
                金条工费：10克及以上，加收15元/克工费；</br>
                规格：10克-20克-50克-100克-200克-500克-1000克</br>
                金砂工费：3克-10克，加收16元/克工费；</br>
                3克以下，加收50元/件工费；</br>
                另加收证书费30元/件，木盒45元/个</p>
            </li>
            <li>
              <h2><span class="square">Q4</span><span class="title">邮寄说明事项</span></h2>
              <p>本产品由东莞市皇帝珠宝有限公司供货，邮费和保价由用户承担，请联系客服记录需求；</p>
            </li>
            <li>
              <h2><span class="square">Q5</span><span class="title">兑换当时未回购的处理方式</span></h2>
              <p>您的本次兑换以订单方式存在“我的--黄金兑换”中，可打开选择订单继续操作流程</p>
            </li>
            <li>
              <h2><span class="square">Q6</span><span class="title">兑换及选择实物发送后可退换货吗？</span></h2>
              <p>黄金属贵金属交易，无法退换货</p>
            </li>
            <li>
              <h2><span class="square">Q7</span><span class="title">兑换后黄金供货服务提供方</span></h2>
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
