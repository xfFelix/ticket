<template>
  <div class="goldChange">
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
.goldChange{
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #F5F5F5;
  height: 100%;
}
</style>
<style>
@media screen and (min-width: 600px) {
  .goldChange{
    max-width: 384px; /*no*/
  }
}
</style>
