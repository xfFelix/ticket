<template>
  <div class="oil">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.oil{
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  position: absolute;
}
</style>
<style scoped>
@media screen and (min-width: 600px) {
  .oil{
    max-width: 384px; /*no*/
  }
}
</style>
