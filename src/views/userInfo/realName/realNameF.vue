<template>
  <div class="realName">
      <Header class="navbar" :show-more="!yingqiudiShow">实名认证
        <i slot="icon" class="icon-gengduo-black"></i>
      </Header>

    <div class="name-info-wrap">
      <div class="name-info">
        <!-- <p class="real-name">张三</p>
        <p class="real-id">341356199002050156</p> -->
        <p class="real-name">{{userinfo.realName}}</p>
        <p class="real-id">{{userinfo.idnum}}</p>
      </div>
      <!-- <div class="edit" @click="$router.push({name: 'realName'})">
        <img class="name" src="@/common/images/realName/icon_name_edit.png" alt="">
        <span>修改实名认证</span>
        <img class="arrow" src="@/common/images/icon_go.png" alt="">
      </div> -->
    </div>

  </div>
</template>

<script>
import {cert ,certsms} from 'api';
import {mapGetters} from 'vuex';
import {isEmpty,IsMobile} from 'util/common'
import {IOSFocus ,vipCustom} from '@/mixins';
export default {
  mixins: [IOSFocus,vipCustom],
  data:()=>({
  }),
  computed:{
      ...mapGetters({
        getToken:'getToken',
        userinfo: 'getUserinfo'
      })
    },
  components: {
      Header: () => import('@/components/Header'),
    },
  }
</script>
<style lang="scss" scoped>
@import '~@/common/css/color.scss';
.realName{
  height: 100vh;
  position: relative;
  .navbar{
    // background: #313340;
    background: transparent;
    color: #1A1A1A;
    // position: fixed;
    width: 100%;
    .icon-gengduo-black {
        position: absolute;
        top: 9px;
        right: 16px;
        width: 24px;
        height: 24px;
        background-image: url('../../../common/images/header-more.png') !important;
        background-size: 100% 100%;
      }
  }

  .name-info-wrap{
    padding: 0 16px;
    padding-top: 16px;
    .name-info{
      width: 343px;
      height: 236px;
      background-image: url('../../../common/images/realName/realName.png');
      background-size: 100% 100%;
      .real-name {
        padding-top: 25px;
        padding-left: 92px;
        font-size: 18px;
        color: rgba($color: #fff, $alpha: 0.8)
      }
      .real-id {
        margin-top: 2px;
        padding-left: 92px;
        font-size: 16px;
        color: rgba($color: #fff, $alpha: 0.8)
      }
    }
    .edit {
      margin-top: 12px;
      padding: 16px;
      display: flex;
      background: #fff;
      border-radius: 10px;;
      .name {
        width: 20px;
        height: 20px;
      }
      span {
        margin-left: 10px;
        font-size: 16px;
        color: #1A1A1A;
      }
      .arrow {
        margin-left: auto;
        margin-right: 0;
        width: 20px;
        height: 20px;
      }
    }

  }
  .certBntW {
    width: 100%;
    position: absolute;
    bottom: 30px;
    padding: 0 16px;
    box-sizing: border-box;
    .certBnt{
      background: $theme;
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      height: 48px;
      border-radius: 10px;
      }
  }

}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .navbar, .realName{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
