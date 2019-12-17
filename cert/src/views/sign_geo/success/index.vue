<template>
  <div class="success-wrapper">
    <Header :show-back="false">{{$route.meta.title}}</Header>
    <div class="img-wrapper">
      <img src="~common/images/chenggong.png" alt=" ">
    </div>
    <p class="title">恭喜您，已经签约成功！</p>
    <div class="info">
      <h1>如下是您的电子兼职工牌:</h1>
      <div class="content">
        <img src="~common/images/zb.png" alt="" class="cocoImg">
        <div class="iconfont icon-LC_icon_user_fill_3"></div>
        <div class="item">
          <span class="label">姓名</span>
          <span class="value">{{name}}</span>
        </div>
        <div class="item">
          <span class="label">身份证</span>
          <span class="value">{{idNo}}</span>
        </div>
        <div class="item">
          <span class="label">部门</span>
          <span class="value">椰云众包{{region ? '' : '事业部'}}</span>
        </div>
        <div class="item">
          <span class="label">工号</span>
          <span class="value">{{jobNumber}}</span>
        </div>
        <div class="item" v-if="region">
          <span class="label">负责区域</span>
          <span class="value">{{region}}</span>
        </div>
        <div class="item" v-else>
          <span class="label">职位</span>
          <span class="value">兼职员工</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getArgs} from '@/util/common'
export default {
  data: () => ({
    jobNumber: '',
    idNo: '',
    name: '',
    region: ''
  }),
  created() {
    let obj = getArgs()
    this.name = obj.name
    this.idNo = obj.idNo
    this.jobNumber = obj.jobNumber
    this.region = obj.region
  },
}
</script>
<style scoped lang="scss">
.success-wrapper{
  font-family:PingFang SC;
  height: 100%;
  background: #eef1f6;
  .img-wrapper{
    img{
      display: block;
      width: 68px;
      height: 68px;
      border: none;
      margin: 20px auto 0;
    }
  }
  .title{
    margin-top: 30px;
    font-size:21px;
    font-weight:bold;
    color:rgba(78,78,78,1);
    text-align: center;
  }
  .info{
    margin: 30px 0 ;
    padding: 0 40px;
    .cocoImg{
      height: 80px;
      width: 210px;
    }
    h1{
      margin: 10px 0;
      font-size: 14px;
      font-weight: bold;
    }
    .content{
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      padding: 20px 0;
      .iconfont{
        font-size: 66px;
        font-weight: bolder;
        color: #cccccc;
      }
      .item{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;
        font-size: 14px;
        .label{
          font-weight: bold;
        }
      }
    }
  }
}
</style>
