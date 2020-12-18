<template>
  <div class="phone">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex';
import { getParam} from "util/common";
export default {
  data:()=>({

  }),
  methods:{
    ...mapActions({
        platform:'platform/setPlatform'
      }),
  },
  created(){
    if(getParam().vendorId) {
      this.platform(1)
    }
  },
}
</script>

<style lang="scss" scoped>
.phone{
  width: 100%;
  min-height: 100%;
  position: absolute;
  // padding-bottom: 16px;
  // background-color: #FFF;
  // background: linear-gradient(225deg, #1A63FC 0%, #3296FA 100%);
  // height: 100%;
}
</style>
<style scoped>
@media screen and (min-width: 600px) {
  .phone{
    max-width: 384px; /*no*/
  }
}
</style>
