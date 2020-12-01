<template>
  <div class="cardHome">
    <head-top></head-top>
    <card-select></card-select>
  </div>
</template>
<script>
export default {
  components: {
    HeadTop: () => import('./components/HeadTop.vue'),
    CardSelect: () => import('./components/CardSelect'),

  },

}
</script>

<style lang="scss" scoped>
</style>
