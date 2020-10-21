<template>
  <div class="goldChange">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data:()=>({

  }),
}
</script>

<style lang="scss" scoped>
.goldChange{
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #FFF;
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
