<template>
  <div class="record-wrapper">
    <header>
      <i class="cubeic-back back" @click="$route.query.go=='cocogc'?$router.back():$router.push({name:'memberCardC'})"></i>
      卡券兑换记录
    </header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :data="orderList" :options="options" @pulling-up="onPullingUp" v-if="orderList.length!=0">
          <ul class="item" v-for="(item,index) in orderList" :key="index" @click="toRecordDetail(item.id)">
            <li class="title">
              <div class="order-img" v-if="item.syncNum>0">
                <img v-lazy="require('../../../common/images/memberCard/logo_slices/'+item.syncNum +'.png')" alt="">
              </div>
              <div class="order-name">{{item.cardUser}}</div>
              <!-- <span class="status" v-if="item.status == 0">兑换中</span>
              <span class="status" v-else-if="item.status == 1">兑换成功</span>
              <span class="status" v-else>兑换失败</span> -->
            </li>
            <li class="dateW">
              <div class="date" >
                <img v-if="item.sendDate" src="@/common/images/memberCard/icon_time.png" alt="">
                <span class="exp" v-if="item.memo">有效期至：{{item.memo.split("|")[2]}}</span>
              </div>
            </li>
            <div class="icon_changing" v-if="item.status == 0">
              <img src="@/common/images/memberCard/img_duihuanzhong.png" alt="">
            </div>
            <div class="icon_success" v-if="item.status == 1">
              <img src="@/common/images/memberCard/img_duihuanchenggong.png" alt="">
            </div>
            <div class="icon_success" v-if="item.status == 2">
              <img src="@/common/images/memberCard/img_duihuanshibai.png" alt="">
            </div>
          </ul>
        </cube-scroll>
        <no-data :data="orderList"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import { vipOrderList } from 'api';
import { mapGetters } from 'vuex';
import clip from 'util/clipboard'
export default {
  data: () => ({
    orderList: [],
    pullUpLoad: true,
    pullUpLoadThreshold: 0,
    pullUpLoadMoreTxt: '上拉加载更多...',
    pullUpLoadNoMoreTxt: '已经到底了~',
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
    offset() {
      return (this.pageNum - 1) * this.pageSize + 1;
    },
    ...mapGetters({
      getToken: 'getToken',
    }),
  },
  methods: {
    async vipOrderList() {
      let data = await vipOrderList({ token: this.getToken, offset: this.offset, rows: this.pageSize });
      if (data.code != 1) { return this.$toast(data.message); }
      if (data.data.length >= 10){ this.tenFlag = true; }
      else { this.tenFlag = false; }
      this.orderList.push(...data.data);
    },
    onPullingUp() {
      if (this.tenFlag === true) {
        this.pageNum++;
        this.vipOrderList();
      }
      if (!this.tenFlag && this.orderList.length > 0) {
        this.$refs.scroll.forceUpdate();
      }
    },
     handleCopy(text, event) {
      clip(text, event)
    },
    toRecordDetail(id) {
      this.$router.push({name:'recordDetail',query:{id:id}})
    }
  },
  mounted() {
    this.vipOrderList()
  },
  components: {
    NoData: () => import('components/NoData')
  },
}
</script>

<style lang="scss" scoped>
.record-wrapper {
  background: #F5F5F5;
  min-height: 100%;
  header{
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    font-size: 18px;
    color: #1A1A1A;
    background: #fff;
    font-weight: bold;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.4rem;
      font-size: 18px;
    }
  }
  .content {
    padding: 0 16px;
    box-sizing: border-box;
    .item {
      border-radius: 10px;
      margin-top: 12px;
      background: #fff;
      position: relative;
      li {
        color: #4A4A4A;
        font-size: 12px;
        word-break: break-all;
        &.title {
          padding-left: 12px;
          height: 84px;
          display: flex;
          align-items: center;

          .order-img {
            width: 52px;
            height: 52px;
            img {
              border-radius: 50%;
            }
          }
          .order-name {
            flex: 1;
            margin-left: 12px;
            font-size: 20px;
            color: #1A1A1A;
            font-family: PingFangSC-Semibold;
          }

        }
        &.dateW {
          padding-left: 16px;
          padding-right: 16px;
          height: 36px;
          line-height: 36px;
          .date {
            display: flex;
            align-items: center;
            border-top: 1px dashed rgba($color: #979797, $alpha: 0.2);
            img {
              width: 18px;
              height: 18px;
            }
            .exp {
              margin-left: 6px;
              font-size: 14px;
              color: #B4B4B4;
            }
          }
        }
      }
      &::before {
            position: absolute;
            left: -8px;
            bottom: 27px;
            width: 16px;
            height: 16px;
            content: '';
            background: #F5F5F5;
            border-radius: 50%;
          }
      &::after {
        position: absolute;
        right: -8px;
        bottom: 27px;
        width: 16px;
        height: 16px;
        content: '';
        background: #F5F5F5;
        border-radius: 50%;
      }
    }
    .icon_success {
      position: absolute;
      right: 10px;
      bottom: -14px;
      width: 80px;
      height: 80px;
    }
    .icon_changing {
      position: absolute;
      right: 0px;
      top: 0px;
      width: 56px;
      height: 56px;
    }
  }
}

.scroll-list-wrap {
  height: calc(100vh - 44px);
  transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
  overflow: hidden
}
</style>
<style>
.cube-pullup-wrapper .before-trigger {
  color: #9C9C9C !important;
  font-size: 12px;
}
</style>

