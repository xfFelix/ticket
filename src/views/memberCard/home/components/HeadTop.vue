<template>
  <div class="headTop">
    <div class="header">
      <i class="cubeic-back" @click="goHome"></i>
      会员卡券
      <div class="iconMoreW">
        <div class="iconMore">
          <span class="iconfont" @click="showDialog=!showDialog">&#xe80c;</span>
          <Head-tab v-if="showDialog"></Head-tab>
        </div>
      </div>
    </div>

    <div class="surRecW">
      <div class="surplus">
        <span>椰子分余额：</span>
         <span>{{userinfo.score | toPrice}} </span>
      </div>

      <div class="goRecode" @click="$router.push({name:'cardRecord'})">
        兑换记录
        <span class="iconfont">&#xe61e;</span>
      </div>
    </div>

    <bg-mask v-model="showDialog" color="transparent"></bg-mask>
  </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex';
import { getParam } from "util/common";
export default {
  data: () => ({
    showDialog: false
  }),
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo'
    })
  },
  methods: {
    ...mapActions({
        platform:'platform/setPlatform'
      }),
    goHome() {
      window.location.href = process.env.VUE_APP_BASE_HOME_URL;
    },
  },
  mounted(){
    if(getParam().vendorId) {
      this.platform(1)
    }
  },
  components: {
    HeadTab: () => import('@/components/HeadTab'),
    BgMask: () => import("@/components/BgMask"),
  }
}
</script>
<style lang="scss" scoped>
.headTop {
  background: #373C48;
  color: #fff;
  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 31px 0;
    font-size: 18px;
    .cubeic-back {
      position: absolute;
      left: 18px;
      top: 12px;
    }
    .iconMoreW {
      position: absolute;
      right: 18px;
      top: 12px;
      .iconMore {
        position: relative;
      }
    }
  }
  .surRecW {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 15px 20px;
    .surplus {
      span:last-of-type {
        color: #30CE84;
      }
    }
    .goRecode {
      span {
        transform: rotate(180deg);
        font-size: 6px;
        display: inline-block;
      }
      display: flex;
      justify-content: flex-end;

      align-items: center;
    }
  }
}
</style>
