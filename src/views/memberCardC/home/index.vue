<template>
  <div class="cardHome">
    <div class="header-topW">
      <Header class="navbar" :class="[viewTop>0?'blackBg':'']"  :show-more="!yingqiudiShow" >会员卡券
        <i slot="icon" class="icon-gengduo-white"></i>
      </Header>
      <div class="block" ref="blockW"></div>
      <div class="select-typeW" :class="[{'select-typeW-fixed':videoListFixed}]">
        <li class="select-item" v-for="(item,index) in memberList" :key="index" :class="[{'active':mId==index},{'shadow':(index==2||index==3)}]" @click="selectType(item.id)">
          <img v-if="mId==index" :src="require('../../../common/images/memberCard/'+item.imgIcon+'_active.png')" alt="">
          <img v-else :src="require('../../../common/images/memberCard/'+item.imgIcon+'.png')" alt="" >
          <p>{{item.name}}</p>
          <div class="shadowW">
            <img class="no-products" v-if="index==2||index==3" src="../../../common/images/memberCard/icon_lock.png" alt="">
          </div>

        </li>

      </div>
    </div>
    <div class="cardMainW">
      <div></div>
      <div class="select-videoW" v-if="mId==1 && videoTypeShow">
        <li v-for="item in videoList" :key="item.id" :class="[{'active':vId==item.id}]" @click="selectVideo(item.id,item.categoryId)">{{item.name}}</li>
      </div>
      <div class="productsW">

          <ul class="products-list">
            <li v-for="(item,index) in productList" :key="index" @click="toItemDetail(item.id)">
              <div class="product-img">
                <img v-lazy="require('../../../common/images/memberCard/home_icon/'+item.productId+'.png')" alt="">
              </div>
              <div class="product-info">
                <p class="title">{{item.categoryName}}{{item.memberName}}</p>
                <p class="priceW"><span class="current-price">{{item.sellingPrice|toPrice}}</span><span>积分</span><span class="passed-price">{{item.marketPrice|toPrice}}</span></p>
              </div>
            </li>
          </ul>

        <no-data :data="productList" v-if="productType==0 || productType==1"></no-data>
        <!-- <div class="no-products" v-if="productType==2 || productType==3">敬请期待</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {setPayType ,IOSFocus ,vipCustom} from '@/mixins'
import { getParam } from "util/common";
import { getVipList } from 'api';
import { mapGetters, mapActions } from 'vuex';
export default {
  mixins: [setPayType, IOSFocus ,vipCustom],
  data:()=>({
    memberList: [
      {id:0, name: '全部',imgIcon:'icon_all'},
      {id:1, name: '视频会员',imgIcon:'icon_video'},
      {id:2, name: '滴滴出行',imgIcon:'icon_didi'},
      {id:3, name: '其他',imgIcon:'icon_others'}
    ],
    viewTop: 0,
    mId:0,
    videoList: [
      {id:0, name:"腾讯视频", categoryId:3},
      {id:1, name:"爱奇艺", categoryId:2},
      // {id:2, name:"腾讯体育", categoryId:3},
      {id:3, name:"优酷", categoryId:1},
      {id:4, name:"芒果TV", categoryId:5},
      {id:5, name:"搜狐视频", categoryId:6},
      {id:6, name:"网易云音乐", categoryId:8},
      {id:7, name:"QQ音乐", categoryId:10},
    ],
    vId:0,
    categoryId: 0,
    productList:[],
    productType: 0,
    scrollHeight: 0,
    videoTypeShow: false,
    videoListFixed: false,
    noProducts: false
    // pullUpLoad: true,
    // pullUpLoadThreshold: 0,
    // pullUpLoadMoreTxt: '上拉加载更多...',
    // pullUpLoadNoMoreTxt: '没有更多数据了~~',
    // pageSize: 10,
    // tenFlag: true,
    // pageNum: 1
  }),
  components: {
    Header: () => import('@/components/Header'),
    NoData: () => import('components/NoData')
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    }),
  },
  methods: {
    ...mapActions({
        platform:'platform/setPlatform'
      }),
    selectType(id) {
      this.productType = id
      if(id==1) {
        this.noProducts = false
        this.mId = id
        this.productList = []
        this.videoTypeShow = true
        this.vId = 0
        this.vipVideoList(3)
      }else if(id==0) {
        this.noProducts = false
        this.mId = id
        this.productList = []
        this.videoTypeShow = false
        this.vipOrderList()
      }else {
        this.noProducts = true
        // this.videoTypeShow = false
        // this.vipOrderList()
      }
      // this.productList = []
      // this.vipOrderList()
    },
    selectVideo(id,categoryId) {
      this.vId = id
      this.categoryId = categoryId
      // this.videoTypeShow = false
      this.productList = []
      this.vipVideoList(categoryId)
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.viewTop = scrollTop
      if(scrollTop>this.scrollHeight) {
        this.videoListFixed = true
      }else {
        this.videoListFixed = false
      }
    },
    async vipOrderList() {
      let data = await getVipList({ type: this.productType });
      if (data.code != 1) { return this.$toast(data.message); }
      this.productList = data.data
    },
    async vipVideoList(id) {
      let data = await getVipList({ categoryId: id });
      if (data.code != 1) { return this.$toast(data.message); }
      this.productList = data.data
    },
    toItemDetail(id) {
      this.$router.push({name: 'memberDetail',query:{id:id}})
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, false)
    if(getParam().vendorId) {
      this.platform(1)
    }
    this.$nextTick(()=>{
      this.scrollHeight = this.$refs.blockW.clientHeight
    })
    this.vipOrderList()
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.handleScroll);
  }
}
</script>
<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.cardHome {
  position: relative;
  .header-topW {
    position: relative;
    height: 540px;
    background-image: url("../../../common/images/memberCard/header-bg.png");
    background-size: 100% 100%;
    .navbar{
      background: #18181D;
      color: #fff;
      position: fixed;
      width: 100%;
      .icon-gengduo-white {
        position: absolute;
        top: 9px;
        right: 16px;
        width: 24px;
        height: 24px;
        background-image: url('../../../common/images/header-moreW.png') !important;
        background-size: 100% 100%;
      }
    }
    .blackBg {
      background: #18181D;
    }
    .block {
      // height: 44px;
      height: 400px;
    }
    .select-typeW {
      width: 100%;
      padding: 0 16px;
      // margin-top: 356px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .select-item {
        position: relative;
        padding-top: 20px;
        width: 80px;
        height: 88px;
        color: #fff;
        background: linear-gradient(180deg, #00C17B 0%, #009766 100%);
        border-radius: 10px;
        text-align: center;
        box-sizing: border-box;
        img {
          margin: 0 auto;
          width: 28px;
          height: 28px;
        }
        p {
          font-size: 14px;
        }
      }
      .active {
        color: #BF8E3F;
        // font-size: 16px;
        background: linear-gradient(180deg, #FFEAC5 0%, #FFD670 100%);
        p{
          font-weight: bold;
        }
        &::after {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          border-width: 8px 8px 0;
          border-style: solid;
          left: 33px;
          bottom: -20px;
          border-color: #FFD673 transparent transparent ;
        }
      }
      .shadow {
        position: relative;
        .shadowW {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          background: rgba($color: #000000, $alpha: 0.6);
          border-radius: 10px;
        }
      }
    }
    .select-typeW-fixed {
      height: 118px;
      position: fixed;
      top: 44px;
      z-index: 9;
      background: #18181D;
    }
  }
  .cardMainW {
    min-width: 100%;
    position: absolute;
    top: 520px;
    padding: 0 16px;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-sizing: border-box;
    .select-videoW {
      padding-top: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid #EBEBEB;
      li {
        display: inline-block;
        width: 85px;
        height: 30px;
        line-height: 32px;
        background: #fff;
        border-radius: 15px;
        color: #7E7E7E;
        font-size: 14px;
        text-align: center;
        &:nth-of-type(n+5) {
          margin-top: 16px;
        }
      }
      .active {
        font-weight: bold;
        color: #1A1A1A;
        background: #EBEBEB;
      }
    }
    .productsW {
      margin-top: 24px;
      font-size: 0;
      .products-list {
        font-size: 0;
        li {
          display: inline-block;
          margin-bottom: 8px;
          width: 168px;
          height: 198px;
          border: 1px solid #EBEBEB;
          border-radius: 10px;
          box-sizing: border-box;
          font-size: 0;
          &:nth-of-type(2n+1) {
            margin-right: 7px;
          }
          .product-img {
            width: 166px;
            height: 120px;

            img {
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
            }
          }
          .product-title {
            height: 20px;
            font-size: 12px;
            color: #1A1A1A;
            text-align: center;
            background: linear-gradient(270deg, #F4CC82 0%, #F3DBAE 100%);
          }
          .product-info {
            padding-left: 12px;
            padding-right: 12px;
            padding-top: 12px;
            .title {
              height: 32px;
              line-height: 17px;
              font-size: 14px;
              font-weight: bold;
              color: #1A1A1A;
            }
            .priceW{
              margin-top: 3px;
              color: $theme;
              font-size: 12px;
              .current-price {
                font-weight: bold;
                font-family: DINPro-Bold;
                font-size: 16px;
                margin-right: 3px;
              }
              .passed-price {
                margin-left: 10px;
                font-size: 10px;
                color: #969696;
                text-decoration: line-through;
              }
            }
          }
        }
      }
      .no-products {
        height: 100px;
        color: #1A1A1A;
        font-size: 16px;
      }
    }
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px) {
  .navbar, .select-typeW-fixed{
    max-width: 384px; /*no*/
  }
}
</style>
