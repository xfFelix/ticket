<template>
  <div class="no-data" v-if="open">
    <img src="~common/images/none-data.png" alt="">
    <slot><p style="margin-top:10px;font-size: 15px;color:rgba(0,0,0,0.4)">暂无数据</p></slot>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props:{
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    open () {
      if (this.data && this.data.length) {
        return false
      } else {
        return true
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.no-data{
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img{
    display: block;
    width: 90px;
    height: 90px;
  }
}
</style>
