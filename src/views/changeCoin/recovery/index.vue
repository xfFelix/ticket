<template>
  <div class="record-wrapper">
    <header>
      <i class="cubeic-back back" @click="$router.back()"></i>
      {{userinfo.coinAlisa ? userinfo.coinAlisa : '金币'}}兑换记录
    </header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :data="orderList" :options="options" @pulling-up="onPullingUp" v-if="orderList.length!=0">
          <ul class="item" v-for="(item,index) in orderList" :key="index">
            <li class="title">
              <span class="order-number">商品名称：{{item.memo|toDecimal2Fp}}{{userinfo.coinAlisa ? userinfo.coinAlisa : '金币'}}</span>
              <span class="status" v-if="item.status == 0">兑换中</span>
              <span class="status" v-else-if="item.status == 1">兑换成功</span>
              <span class="status" v-else>兑换失败</span>
            </li>
            <li>订单编号:&nbsp;{{item.idUrl}}</li>
            <li>时间：{{item.addDate}}</li>
            <li>兑换账号：{{item.mobile}}</li>
            <li>椰子分金额：{{item.repaymentAmount|toPrice}}</li>
            <li>服务费：{{item.serviceFee|toPrice}}</li>
            <li>
              <span class="tax_fee">税费：{{item.taxFee|toPrice}}</span>
              <span class="total">合计：{{item.totalAmount|toPrice}}</span>
            </li>
          </ul>
        </cube-scroll>
        <no-data :data="orderList"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import { coinList } from 'api';
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    orderList: [],
    pullUpLoad: true,
    pullUpLoadThreshold: 0,
    pullUpLoadMoreTxt: '上拉加载更多...',
    pullUpLoadNoMoreTxt: '没有更多数据了~~',
    pageSize: 10,
    tenFlag: true,
    pageNum: 1
  }),
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
      userinfo: 'getUserinfo'
    }),
  },
  methods: {
    async coinList() {
      let data = await coinList({ token: this.getToken, page: this.pageNum, size: this.pageSize });
      if (data.code != 1) { return this.$toast(data.message); }
      if (data.data.length == 10) { this.tenFlag = true; }
      else { this.tenFlag = false; }
      this.orderList.push(...data.data);
    },
    onPullingUp() {
      if (this.tenFlag === true) {
        this.pageNum++;
        this.coinList()
      }
      if (!this.tenFlag && this.orderList.length > 0) {
        this.$refs.scroll.forceUpdate();
      }
    },
  },
  mounted() {
    this.coinList()
  },
  components: {
    NoData: () => import('components/NoData')
  },
}
</script>

<style lang="scss" scoped>
.record-wrapper {
  background: #FFF;
  min-height: 100%;
  header {
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    background: #373C48;
    font-size: 18px;
    color: #fff;
    .back {
      position: absolute;
      left: 15px;
      font-size: 18px;
    }
  }
  .content {
    padding: 0 15px;
    box-sizing: border-box;
    .item {
      border: 1px solid rgba(222, 222, 222, 1);
      border-radius: 5px;
      margin-top: 25px;
      overflow: hidden;
      li {
        padding: 15px 15px 0;
        color: #4A4A4A;
        font-size: 12px;
        background: #F4F4F4;
        &.title {
          line-height: 43px;
          padding-top: 0;
          display: flex;
          justify-content: space-between;
          background: #fff;
          font-size: 13px;
        }
        &:last-of-type {
          padding-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 6px;
        }
        &:first-of-type{
          border-radius: 6px;
        }
        .total {
          font-size: 15px;
        }
      }
    }
  }
}

.scroll-list-wrap {
  height: calc(100vh - 44px);
  transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
  overflow: hidden
}
</style>
