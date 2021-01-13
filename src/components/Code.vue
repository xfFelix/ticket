<template>
    <div class="code-wrapper" style="-webkit-user-select:text!important;">
        <label for="code" class="code-input-main">
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[0]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[1]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[2]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[3]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[4]}}</div>
          <div class="code-input-main-item" :class="{'text-security': userinfo.payValidType === 1}">{{code[5]}}</div>
        </label>
        <input class="code-input-input" id="code" autofocus="autofocus" :value="code" @input="$emit('input', $event.target.value.trim())" :maxlength="userinfo.payValidType === 1 ? 6 : 4" type="number" autocomplete="off" pattern="[0-9]*"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "CodeInput",
  model: {
    prop: 'code',
    event: 'input'
  },
  props: {
    code: ''
  },
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo'
    })
  },
  watch: {
    code (val) {
      if (this.userinfo.payValidType === 1) {
        if (val.length === 6) {
          this.$emit('confirm')
        }
      } else {
        if (val.length === 4) {
          this.$emit('confirm')
        }
      }
    },
  }
}
</script>
<style scoped>
.code-input-input {
  height: 40px;
  outline: none;
  color: transparent;
  text-shadow: 0 0 0 transparent;
  width: 90%;
  /* top: 0; */
  z-index: -1;
  /* caret-color: transparent; */
  opacity: 0;
  letter-spacing: 39px;
  /* margin-left: 15px; */
}
.code-input-main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  left: 0;
  right: 0;
  height: 50px;
}
.code-wrapper{
  position: relative;
  height: 40px;
}
.code-input-main-item {
  width: 43px;
  height: 45px;
  line-height: 40px;
  border-right: 1px solid rgb(230, 230, 230);
  border-top: solid #A9A6AA 1px;
  border-bottom: solid #A9A6AA 1px;
  /* border-radius: 3px; */
  /* margin: 0 .05rem; */
  text-align: center;
  padding-bottom: 0;
  font-size: 30px;
  color: #444444;
  box-sizing: border-box;
}
.code-input-main-item:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: solid #A9A6AA 1px;
}
.code-input-main-item:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: solid #A9A6AA 1px;
}
.text-security{
  -webkit-text-security: disc;
  text-security: disc;
}
</style>
