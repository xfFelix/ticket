<template>
  <div class="dialog-container">
    <div class="dialog-conInner">
      <div class="arrow-top"></div>
      <div class="dialog-content">
        <a :href="getToken?(process+item.linkTo+'?token=' + getToken):(process+item.linkTo)" v-for="(item,index) in dialogList" :key="index">
          <div class="link">
            <img :src="item.icon" alt="">
            <!-- <span class="iconfont" :class="item.icon"></span> -->
            <span>{{item.name}}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    dialogList: [
      { name: '首页', icon: require('../common/images/icon_home.png'), linkTo: '/#/layout/home'},
      // { name: '商城', icon: 'icon-shangcheng', linkTo:'#/layout/shopMall'},
      { name: '分类', icon: require('../common/images/icon_sort.png'), linkTo:'/#/layout/classify' },
      { name: '购物车', icon: require('../common/images/icon_shopping.png'), linkTo:'/#/layout/shopCart'},
      { name: '我的', icon: require('../common/images/icon_personal.png'), linkTo:'/#/layout/account'},
    ],
    process:process.env.VUE_APP_BASE_HOME_URL
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken'
    })
  },
}
</script>

<style lang="scss" scoped>
.dialog-container {
  position: absolute;
  top: 26px;
  right: -11px;
  z-index: 102;
  .dialog-conInner {
    position: relative;
    .arrow-top {
      width: 10px;
      height: 10px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      background: #fff;
      display: inline-block;
      position: absolute;
      right: 14px;
      top: -5px;
    }
    .dialog-content {
      border-radius: 10px;
      box-shadow: 0px 2px 10px 0px rgba(220,220,220,0.6);
      .link {
        background: #fff;
        padding: 16px 16px;
        border-bottom: 1px solid #dfdfdf;
        width: 140px;
        display: flex; // justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #444444;
        box-sizing: border-box;
        img {
          width: 16px;
          height: 16px;
        }
        span {
          margin-left: 10px;
        }
      }
      a:first-of-type {
        .link {
          border-radius: 5px 5px 0 0;
          border-top: none;
        }
      }
      a:last-of-type {
        .link {
          margin-bottom: 0;
          border-bottom: none;
          border-radius: 0 0 5px 4px;
        }
      }
      .navGo {}
    }
  }
}
.goodsDetail{
    .dialog-container{
        top:54px;
        right: 7px;
    }
}
</style>

