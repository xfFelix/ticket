<template>
  <div class="jdCard">
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
.jdCard{
  width: 100%;
  min-height: 100%;
  position: absolute;
}
</style>
<style scoped>
@media screen and (min-width: 600px) {
  .jdCard{
    max-width: 384px; /*no*/
  }
}
</style>
