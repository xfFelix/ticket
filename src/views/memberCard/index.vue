<template>
  <div class="memberCard">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.memberCard{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
<style>
@media screen and (min-width: 600px) {
  .memberCard{
    max-width: 384px; /*no*/
  }
}
</style>
