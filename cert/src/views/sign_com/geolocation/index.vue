<template>
  <div class="geolocation">
    <Header class="navbar">选择城市</Header>
    <!-- <div class="search-wrapper">
      <div class="search">
        <img src="~common/images/search.png" alt="搜索" class="search-icon">
        <input type="text" placeholder="北京/beingjing/bj" class="search-input" v-model="searchCity" @input="handlerInput" @keyup.enter="getCities">
      </div>
      <div class="address">
        当前定位:
        <img src="~common/images/dizhi.png" alt="地址" class="address-icon">
        <span class="price-color">{{address}}</span>
      </div>
    </div> -->
    <!-- <div class="item" v-if="history">
      <h1 class="title">最近访问</h1>
      <ul class="content">
        <li v-for="(item, index) in history" :key="index" @click="redirectUnit(item)">{{item}}</li>
      </ul>
    </div> -->
    <div class="item" v-for="(item, index) in cityList" :key="index">
      <h1 class="title">{{index}}</h1>
      <ul class="content">
        <li v-for="i in item" :key="i.id" @click="redirectUnit(i.name)">{{i.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from 'components/Header'
import {getGeolocation} from 'api'
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    Header
  },
  data: () => ({
    address: '',
    cityList: [],
    searchCity: ''
  }),
  mounted() {
    this.getCities()
  },
  methods: {
    ...mapActions({
      setConfig: 'sign/setConfig'
    }),
    async getCities() {
      const { code, data } = await getGeolocation()
      this.cityList = data
    },
    redirectUnit(city) {
      this.setConfig({city})
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.geolocation{
  .navbar{
    background: #000;
    color: #fff;
  }
  .search-wrapper{
    height: 116px;
    padding: 25px 15px;
    box-sizing: border-box;
    background: #fff;
    .search{
      display: flex;
      align-items: center;
      border: 1px solid #DEDEDE;
      height: 45px;
      border-radius: 5px;
      .search-icon{
        width: 20px;
        height: 20px;
        margin: 0 10px 0 17px;
      }
      .search-input{
        height: 100%;
        width: 100%;
        font-size: 15px;
        &::input-placeholder{
          color: #999999;
        }
      }
    }
    .address{
      display: flex;
      align-items: flex-end;
      margin-top: 7px;
      color: #4A4A4A;
      font-size: 12px;
      .address-icon{
        width: 20px;
        height: 20px;
      }
    }
  }
  .item {
    .title{
      height: 50px;
      line-height: 50px;
      color: #4A4A4A;
      font-size: 15px;
      font-weight: bold;
      padding: 0 15px;
    }
    .content{
      background: #fff;
      padding-bottom: 15px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      li{
        margin: 15px 10px 0 ;
        padding: 12px 5px;
        text-align: center;
        border: 1px solid #dedede;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 12px;
        color: #4A4A4A;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
