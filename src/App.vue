<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<style lang="scss">
#app {
  font-family: 'PingFangSC-Regular, PingFang SC','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #F5F5F5;
}
#app{
  height: 100%;
}
</style>
