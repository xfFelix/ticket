<template>
  <header>
    <h1><slot></slot></h1>
    <i class="cubeic-back" v-if="showBack" @click="goBack"></i>
    <div class="gengduoW" v-if="showMore" @click="toggleFlag = !toggleFlag">
      <slot name="icon">
        <i class="icon-gengduo"></i>
      </slot>
    </div>
    <!-- <i class="icon-gengduo" v-if="showMore" @click="toggleFlag = !toggleFlag"></i> -->
    <HeadTab v-show="toggleFlag" class="header-tab"/>
  </header>
</template>

<script>
export default {
  components: {
    HeadTab: () => import(/* webpackPrefetch: true */ './HeadTab')
  },
  data: () => ({
    toggleFlag: false
  }),
  props:{
    showBack: {
      type: Boolean,
      default: true
    },
    showMore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      let route = this.$route
      if (route.path === '/order/list') {
        if(this.$route.query.go=='cocogc'){
          return this.$router.back()
        }
        return this.$router.push('/')
      } else if (route.path.includes('/life/home')) {
        return window.location.href = process.env.VUE_APP_BASE_HOME_URL
      } else if (route.path.includes('/life/record')) {
        if(this.$route.query.go=='cocogc'){
          return this.$router.back()
        }
        return this.$router.push('home')
      }
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
header{
  position: relative;
  height: 44px;
  line-height: 46px;
  text-align: center;
  background-color: #fff;
  // box-shadow: 0 1px 6px #ccc;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  color: #000;
  z-index: 5;
  h1{
    font-size: 16px;
    font-weight: 700;
  }
  .cubeic-back{
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    &::before{
      font-size: 18px;
    }
  }
  .icon-gengduo{
    position: absolute;
    top: 6px;
    right: 16px;
    // font-size: 28px;
    width: 24px;
    height: 24px;
    background-image: url('../common/images/header-moreW.png');
    background-size: 100% 100%;
  }
  .header-tab{
    line-height: 1;
    top: 44px;
    right: 8px;
  }
}
</style>
