<template>
  <div class="memberCard">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex';
import { getParam} from "util/common";
export default {
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
.memberCard{
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: #fff;
}
</style>
<style>
@media screen and (min-width: 600px) {
  .memberCard{
    max-width: 384px; /*no*/
  }
}
</style>
