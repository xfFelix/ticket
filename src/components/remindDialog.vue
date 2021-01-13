<template>
<transition  enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="dialogW" v-if="show" >
      <div class="closeW" @click="close"><span class="close"></span></div>
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="sumit-btn" @click="toLink" :style="{'color':btnBgColor}">
        <slot name="btn"></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: ''
    },
    linkType: {
      type: String,
      default: ''
    },
    btnBgColor: {
      type: String,
    }
  },
  methods: {
    close() {
      this.$emit('handle-show-dialog')
    },
    toLink() {
      if(this.linkType=="href") {
        window.location.href = this.link
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.dialogW {
  position: fixed;
  background: #fff;
  left: 50%;
  top: 50%;
  width: 288px;
  // height: 224px;
  height: auto;
  box-sizing: border-box;
  border-radius: 10px;
  margin-left: -144px;
  margin-top: -107px;
  z-index: 12;
  .closeW {
    text-align: right;
    padding-right: 10px;
    padding-top: 10px;
    .close {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('../common/images/close.png');
      background-size: 100% 100%;
    }
  }

  .title {
    padding: 20px 12px;
    padding-top: 10px;
    text-align: center;
    font-size: 16px;
    color: #1A1A1A;
    border-bottom: 1px solid #E5E5E5;
  }
  .sumit-btn {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 18px;
    color: $theme;
  }
}
</style>
